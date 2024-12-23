// src/routes/api/supabase.ts
import { json } from "@solidjs/router";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET({ params }) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', params.slug)
      .single();

    if (error) throw error;
    return json(data);
    
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}