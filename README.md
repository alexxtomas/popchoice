# Seeding Your Supabase Database via the SQL Editor

This guide explains how to seed your remote Supabase database using the SQL Editor in the Supabase Dashboard. It also covers how to enable the vector extension (pgvector) so that your database can store vector data.

## Steps to Seed Your Database

1. **Log in to Supabase:**

   - Visit the [Supabase Dashboard](https://app.supabase.com) and sign in with your credentials.

2. **Open the SQL Editor:**

   - From the left sidebar, click on **SQL Editor**.

3. **Enable the Vector Extension:**

   - Before creating tables with vector columns, you must activate the pgvector extension. In the SQL Editor, run the following command:
     ```sql
     CREATE EXTENSION IF NOT EXISTS vector;
     ```
   - This command ensures that the extension is enabled, allowing you to use the `vector` type in your tables.

4. **Seed Your Database:**
   - Copy and paste the SQL code below (which creates a table and a function) into the SQL Editor.
   - Click **RUN** to execute the code on your remote Supabase database.

## SQL Code and Its Explanation

```sql
-- Enable pgvector extension to support vector columns
CREATE EXTENSION IF NOT EXISTS vector;

-- Create a table to store your documents (e.g., movie data)
CREATE TABLE movies (
  id BIGSERIAL PRIMARY KEY,    -- Automatically generates a unique ID for each record
  content TEXT,                -- Stores a text chunk (such as a description)
  embedding VECTOR(1536)       -- Stores a 1536-dimensional vector (e.g., an embedding from OpenAI)
);

-- Create or replace a function to match movies based on vector similarity
CREATE OR REPLACE FUNCTION match_movies (
  query_embedding VECTOR(1536), -- The vector to compare against stored embeddings
  match_threshold FLOAT,        -- A threshold for filtering similar records
  match_count INT               -- The maximum number of records to return
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    movies.id,
    movies.content,
    1 - (movies.embedding <=> query_embedding) AS similarity
  FROM movies
  WHERE 1 - (movies.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
```
