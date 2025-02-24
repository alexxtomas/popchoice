import { NextRequest, NextResponse } from 'next/server';
import { openai, supabase } from '@/lib/config';

const BASE_URL = 'https://api.themoviedb.org'

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
      const systemPrompt = `You are a helpful assistant and you're an expert in movies. I will give you a movie that is the best for a specific users preferences. I also will give you the users preferences. You need to return a brief description of the movie in a catchy way, and why based on the all users preferences that you have received why this movie is the best recommendation for them. Be concise and to the point. No more than 100 words.

      You must respond ONLY with a JSON object in the following format, with no additional text or explanation:
      {
        "whyThisMovie": "your explanation here",
        "title": "movie title here"
      }`;

      const res = await openai.chat.completions.create({
        model: 'gpt-4o-2024-11-20',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `
              Movie: ${result.content}
              Users preferences: ${textsToEmbed}
            `
          }
        ]
      });

      // Ensure content is not null before parsing
      const content = res.choices[0].message.content;
      if (!content) {
        throw new Error('No content in response');
      }

      // Parse the response to ensure it's valid JSON
      const jsonResponse = JSON.parse(content);
      return jsonResponse;
    }))


    const movies = await Promise.all(completions.map(async (completion) => {
      const {title} = completion;


      const response = await fetch(`${BASE_URL}/3/search/movie?query=${title}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.MOVIES_API_TOKEN}`
        }
      })

      if(!response.ok) {
        throw new Error('Failed to fetch movie');
      }
      const data = await response.json();
      const movie = data.results[0];
      const posterPath = movie.poster_path;

      const imageResponse = await fetch(`https://image.tmdb.org/t/p/w500/${posterPath}`)

      console.log(imageResponse)

      const imageBuffer = await imageResponse.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString('base64');

      const imageUrl = `data:image/webp;base64,${base64Image}`;

      return {
        ...completion,
        title,
        imageUrl
      }
    }))

    return NextResponse.json({ data: movies ?? [] });

  } catch (error) {
    console.error('Error generating or parsing response:', error);
    return NextResponse.json(
      { error: 'Failed to generate or parse response', data: [] },
      { status: 500 }
    );
  }
}
