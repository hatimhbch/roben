// src/pages/TopicDetail.tsx
import { createSignal, createEffect, For, Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import { supabase } from '~/utils/supabaseClient';

interface Post {
  id: number;
  publish_date: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  coverimage: string;
  topics: string[];
  type: string;
}

const TopicDetail = () => {
  const params = useParams();
  const [posts, setPosts] = createSignal<Post[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from('posts').select('*').contains('topics', [params.topic]).order('publish_date', { ascending: false });
      if (error) throw error;
      setPosts(data as Post[]);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {setLoading(true);setError(null);setPosts([]);fetchPosts();});

  return (
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">
        Posts about {decodeURIComponent(params.topic)}
      </h1>

      <Show 
        when={!loading()} 
        fallback={<div class="text-center py-8">Loading posts...</div>}
      >
        <Show when={!error()} fallback={
          <div class="text-red-600 text-center py-4">
            Error loading posts: {error()}
          </div>
        }>
          <Show 
            when={posts().length > 0} 
            fallback={<div class="text-center py-4">No posts found for this topic.</div>}
          >
            <div class="space-y-8">
              <For each={posts()}>
                {(post) => (
                  <article class="border rounded-lg shadow-sm overflow-hidden">
                    <Show when={post.coverimage}>
                      <img 
                        src={post.coverimage} 
                        alt={post.title}
                        class="w-full h-48 object-cover"
                      />
                    </Show>
                    <div class="p-6">
                      <h2 class="text-2xl font-bold mb-2">{post.title}</h2>
                      <p class="text-gray-600 mb-4">{post.description}</p>
                      <div class="flex flex-wrap gap-2">
                        {post.topics.map(topic => (
                          <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div class="mt-4 text-sm text-gray-500">
                        Published on: {new Date(post.publish_date).toLocaleDateString()}
                      </div>
                    </div>
                  </article>
                )}
              </For>
            </div>
          </Show>
        </Show>
      </Show>
    </div>
  );
};

export default TopicDetail;