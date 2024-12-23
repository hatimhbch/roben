import supabase from '~/utils/supabaseClient';
import { Post } from '~/types';
import { A } from '@solidjs/router';
import { Component, createSignal, For, onMount } from 'solid-js';

const countTopicFrequency = (posts: Post[]) => {
  const topicCount: { [key: string]: number } = {};

  posts.forEach(post => {
    post.topics.forEach(topic => {
      if (topicCount[topic]) {
        topicCount[topic] += 1;
      } else {
        topicCount[topic] = 1;
      }
    });
  });

  return topicCount;
};

const TopTopics: Component = () => {
  const [topics, setTopics] = createSignal<{ name: string; count: number }[]>([]);

  onMount(() => {
    const fetchPosts = async () => {
      const { data: posts, error } = await supabase.from('posts').select('topics');

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      if (posts) {
        // Count frequency of each topic
        const topicCount = countTopicFrequency(posts as Post[]);
        // Convert object to array and sort by frequency, then by name
        const sortedTopics = Object.entries(topicCount)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => {
            if (b.count === a.count) {
              return a.name.localeCompare(b.name); // Sort alphabetically if frequency is the same
            }
            return b.count - a.count; // Sort by frequency
          })
          .slice(0, 20); // Get top 20

        setTopics(sortedTopics);
      }
    };

    fetchPosts();
  });

  const topicss = ['Nextjs','Reactjs', 'Ai', 'Frontend', 'Backend', 'Web', 'Javascript', 'NLP', 'Python', 'Java', 'Docker', 'Svelte', 'PHP', 'Supabase', 'Aws', 'Postgresql']
  const types = ['Web development','App developement', 'Ai', 'Creative']
  return (
    <div class='fixed right-20 top-14 w-[28%] my-auto items-center border-l border-solid pt-4 pl-10 border-neutral-100 dark:border-neutral-800 sm:hidden'>
      <h2 class='font-montserrat mt-2 text-neutral-600 dark:text-neutral-200 font-semibold text-[14px]'>Popular Articles in this week</h2>
      <ul class='border border-solid border-neutral-100 dark:border-neutral-900 mt-3 px-4 py-3 bg-neutral-50 dark:bg-neutral-950'>
        <li class='py-1'><A class='font-montserrat text-sm font-semibold text-neutral-950 dark:text-neutral-100' href="#">Nextjs vs Svelte</A><p class='text-sm text-neutral-600 dark:text-neutral-400'>Nextjs is the solid framework vs the fast framework Sve...</p></li>
        <li class='py-1'><A class='font-montserrat text-sm font-semibold text-neutral-950 dark:text-neutral-100' href="#">Solid Start 2 is here</A><p class='text-sm text-neutral-600 dark:text-neutral-400'>Solid start is framework builded of solidjs that is fas...</p></li>
      </ul>
      <h2 class='font-montserrat mt-3 text-neutral-600 dark:text-neutral-200 font-semibold text-[14px]'>Recommended topics</h2>
      <ul class='flex flex-wrap mt-6 w-full gap-x-2 gap-y-3'>
        <For each={topicss}>
          {(topic) =><li class='font-nunito text-neutral-800 dark:text-neutral-200 text-[13px] py-[6px] px-4 bg-neutral-50 dark:bg-[#121212] rounded-full'>
            {topic}
          </li>}
        </For>
      </ul>
      <h2 class='font-montserrat mt-9 text-neutral-600 dark:text-neutral-200 font-semibold text-[14px]'>Recommended categories</h2>
      <ul class='flex flex-wrap mt-6 w-full gap-x-2 gap-y-3'>
        <For each={types}>
        {(type) => 
          <li class='flex py-[6px] text-neutral-800 dark:text-neutral-50 bg-neutral-50 dark:bg-[#121212] px-4 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" class='opacity-95 my-auto items-center' width="14" height="14" fill="none" viewBox="0 0 64 64"><path fill="#FFC017" d="m39.637 40.831-5.771 15.871a1.99 1.99 0 0 1-3.732 0l-5.771-15.87a2.02 2.02 0 0 0-1.194-1.195L7.298 33.866a1.99 1.99 0 0 1 0-3.732l15.87-5.771a2.02 2.02 0 0 0 1.195-1.194l5.771-15.871a1.99 1.99 0 0 1 3.732 0l5.771 15.87a2.02 2.02 0 0 0 1.194 1.195l15.871 5.771a1.99 1.99 0 0 1 0 3.732l-15.87 5.771a2.02 2.02 0 0 0-1.195 1.194"></path></svg>
              <p class='font-nunito text-[13px] text-neutral-800 dark:text-neutral-200 pl-1'>{type}</p>
            </li>
        }
        </For>
      </ul>
    </div>
  );
};

export default TopTopics;