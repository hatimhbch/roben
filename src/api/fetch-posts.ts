import { createClient } from '@supabase/supabase-js';
import type { APIEvent } from 'solid-start';

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export const get: APIEvent = async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 0);
    const limit = Number(url.searchParams.get('limit') || 10);

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('publish_date', { ascending: false })
        .range(page * limit, (page + 1) * limit - 1);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
};
