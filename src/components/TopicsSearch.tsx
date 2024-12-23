// src/components/TopicSearch.tsx
import { createSignal, createEffect, For, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { supabase } from '~/utils/supabaseClient';

const TopicSearch = () => {
  const [searchInput, setSearchInput] = createSignal('');
  const [suggestions, setSuggestions] = createSignal([]);
  const navigate = useNavigate();

  createEffect(async () => {
    if (searchInput().length < 2) {
      setSuggestions([]);
      return;
    }

    // Simplified query
    const { data, error } = await supabase.from('posts').select('topics');

    if (error) {
      console.error('Error fetching suggestions:', error);
      return;
    }

    console.log('Raw data:', data); // Debug log

    // Extract and filter topics
    const allTopics = data.flatMap(post => post.topics || []);
    const uniqueTopics = [...new Set(allTopics)]
      .filter(topic => 
        topic.toLowerCase().includes(searchInput().toLowerCase())
      )
      .slice(0, 4);

    console.log('Filtered topics:', uniqueTopics); // Debug log
    setSuggestions(uniqueTopics);
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchInput().length >= 2) {
      navigate(`/topics/${encodeURIComponent(searchInput())}`);
    }
  };

  const handleSuggestionClick = (topic) => {
    navigate(`/topics/${encodeURIComponent(topic)}`);
  };

  return (
    <div class="relative max-w-md mx-auto">
      <input
        type="text"
        value={searchInput()}
        onInput={(e) => setSearchInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search topics..."
        class="w-full px-4 py-2 border rounded-lg"
      />
      
      <Show when={suggestions().length > 0}>
        <div class="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
          <For each={suggestions()}>
            {(topic) => (
              <div
                class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(topic)}
              >
                {topic}
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default TopicSearch;