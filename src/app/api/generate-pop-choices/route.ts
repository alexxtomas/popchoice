import { NextRequest, NextResponse } from 'next/server';
import { openai, supabase } from '@/lib/config';

// Function to search with multiple embeddings using existing match_movies
export type MultipleMatches = {
  content: string, 
  id: number,
  similarity: number
}[]
async function searchWithMultipleEmbeddings(embeddings: number[][], threshold = 0.50, matchCount = 4): Promise<MultipleMatches> {
  // Make parallel calls for each embedding
  const results = await Promise.all(
    embeddings.map(embedding => 
      supabase.rpc('match_movies', {
        query_embedding: embedding,
        match_threshold: threshold,
        match_count: matchCount
      })
    )
  );

  // Combine and deduplicate results
  const allMatches = results
    .flatMap(result => result.data || [])
    .sort((a, b) => b.similarity - a.similarity);

  // Remove duplicates based on id while keeping the highest similarity
  const uniqueMatches = Array.from(
    allMatches.reduce((map, item) => {
      if (!map.has(item.id) || map.get(item.id).similarity < item.similarity) {
        map.set(item.id, item);
      }
      return map;
    }, new Map()).values()
  );

  return uniqueMatches as MultipleMatches
}

export async function POST(req: NextRequest) {
  try {
    const { textsToEmbed } = await req.json();

    if (!textsToEmbed.length) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: textsToEmbed,
    });

    const embeddings = embeddingResponse.data.map((e) => e.embedding)
    const results = await searchWithMultipleEmbeddings(embeddings);

    const completions = await Promise.all(results.map(async (result) => {
      const res = await openai.chat.completions.create({
        model: 'gpt-4o-2024-11-20',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant in application that helps users find the best movies for them. I will give you a move that is the best for the users preferences. I also will give you the users preferences. You need to return a brief description of the movie in a catchy way, and why based on the all users preferences that you have received why this movie is the best recommendation for them. Be concise and to the point. No more than 100 words'
          },
          {
            role: 'user',
            content: `
              Movie: ${result.content}
              Users preferences: ${textsToEmbed}
            `
          }
        ]
      })

      return res.choices[0].message.content
    }))

    return NextResponse.json({ completions });

  } catch (error) {
    console.error('Error generating embedding:', error);
    return NextResponse.json(
      { error: 'Failed to generate embedding' },
      { status: 500 }
    );
  }
}
