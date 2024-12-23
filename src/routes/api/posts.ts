// src/routes/api/elysia-posts.[...params].ts

import { Elysia, t } from 'elysia';
import { createClient } from '@supabase/supabase-js';
import { APIEvent } from '@solidjs/start/server';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Create your Elysia app instance
const elysiaApp = new Elysia().get(
  '/api/posts',
  async ({ query, set }) => {
    const { slug, type, currentSlug } = query;

    if (slug) {
      // Get single post
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        set.status = 400;
        return { error: error.message };
      }

      return data;
    }

    if (type && currentSlug) {
      // Get related posts
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('type', type)
        .neq('slug', currentSlug)
        .limit(4);

      if (error) {
        set.status = 400;
        return { error: error.message };
      }

      return data;
    }

    set.status = 400;
    return { error: 'Invalid request' };
  },
  {
    query: t.Partial(
      t.Object({
        slug: t.String(),
        type: t.String(),
        currentSlug: t.String(),
      })
    ),
  }
);

// SolidStart API route handler
export const GET = async ({ request }: APIEvent) => {
  return await elysiaApp.handle(request);
};