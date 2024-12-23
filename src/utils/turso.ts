import { createClient } from '@libsql/client';

const turso = createClient({
  url: import.meta.env.TURSO_DATABASE_URL!,
  authToken: import.meta.env.TURSO_AUTH_TOKEN! 
});

export default turso;

export const fetchPostsFromTurso = async (page: number, limit: number) => {
    // Calculate the offset for pagination
    const offset = page * limit;
  
    try {
      // Query the Turso database
      const result = await turso.execute(
        'SELECT * FROM articles LIMIT ? OFFSET ?',
        [limit, offset]
      );
  
      // Return the rows from the result
      return result.rows ?? [];
    } catch (error: any) {
      throw new Error(error.message);
    }
  };