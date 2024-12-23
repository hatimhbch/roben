import supabase from "./supabaseClient";

export const fetchSearchResults = async (query: string, page: number, limit: number) => {
  'use server'
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .ilike('title', `%${query}%`)
    .range(page * limit, (page + 1) * limit - 1)
    .order('publish_date', { ascending: false });

  if (error) throw error;
  return data || [];
};