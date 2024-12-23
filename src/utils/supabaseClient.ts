import { createClient } from '@supabase/supabase-js';
import { getRequestEvent } from 'solid-js/web';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl,supabaseKey);
const supabasee = createClient(supabaseUrl,supabaseKey);

export const fetchPostsFromSupabase = async (page: number, limit: number) => {
  const { data, error } = await supabase.from('posts').select('*').range(page * limit, (page + 1) * limit - 1);

  if (error) throw new Error(error.message);
  return data ?? [];
};
export default supabasee;