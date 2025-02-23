import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { openai, supabase } from '@/lib/config';
import { promises as fs } from 'fs';
import path from 'path';


/* Split movies.txt into text chunks.
Return LangChain's "output" – the array of Document objects. */
async function splitDocument(documentPath: string) {
  try {
    const text = await fs.readFile(path.join(process.cwd(), documentPath), 'utf-8');
    const splitter = new RecursiveCharacterTextSplitter({
      separators: ["\n\n"],
      chunkSize: 2000,  // Increased to ensure each movie entry stays together
      chunkOverlap: 0,  // No overlap needed since we're splitting by complete entries
    });
    const output = await splitter.createDocuments([text]);
    return output;
  } catch (e) {
    console.error('There was an issue with splitting text');
    throw e;
  }
}

async function createAndStoreEmbeddings() {
  try {
    const chunkData = await splitDocument('movies.txt');
    const data = await Promise.all(
      chunkData.map(async (chunk) => {
        const embeddingResponse = await openai.embeddings.create({
          model: 'text-embedding-ada-002',
          input: chunk.pageContent,
        });
        return {
          content: chunk.pageContent,
          embedding: embeddingResponse.data[0].embedding,
        };
      }),
    );

    const { error } = await supabase.from('movies').insert(data);
    if (error) {
      throw new Error('Issue inserting data into the database.');
    }
    console.log('SUCCESS!');
  } catch (e) {
    console.error('ERROR: ' + e);
  }
}

createAndStoreEmbeddings();
