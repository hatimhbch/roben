import { createSignal, onCleanup, Show, For, onMount } from "solid-js";
import type { Component } from 'solid-js';
import { supabase } from "~/utils/supabaseClient";
import search from "~/images/search.svg";
import { Post } from "~/types";

const Search: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [posts, setPosts] = createSignal<Post[]>([]);
  const [page, setPage] = createSignal(0);
  const [loading, setLoading] = createSignal(false);
  const [initialLoading, setInitialLoading] = createSignal(false);
  const [hasMore, setHasMore] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const LIMIT = 10;

  const fetchPosts = async (reset = false) => {
    if (loading() || (!hasMore() && !reset)) return;
    if (!searchQuery().trim()) return;

    setLoading(true);
    setError(null);

    try {
      const currentPage = reset ? 0 : page();
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .ilike('title', `%${searchQuery()}%`)
        .range(currentPage * LIMIT, (currentPage + 1) * LIMIT - 1)
        .order('publish_date', { ascending: false });

      if (error) throw error;

      if (data) {
        data.length < LIMIT && setHasMore(false);

        if (reset) {
          setPosts(data);
          setPage(1);
          setHasMore(true);
        } else {
          setPosts(prev => [...prev, ...data]);
          setPage(p => p + 1);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  let searchTimeout: number;
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    clearTimeout(searchTimeout);
    setInitialLoading(true);
    setPosts([]);
    setPage(0);
    setHasMore(true);
    
    searchTimeout = window.setTimeout(() => {
      fetchPosts(true);
    }, 300);
  };

  const handleScroll = (e: Event) => {
    const element = e.target as HTMLDivElement;
    if (
      element.scrollHeight - element.scrollTop <= element.clientHeight * 1.5 &&
      !loading() &&
      hasMore()
    ) {
      fetchPosts();
    }
  };

  let handleClickOutside: (e: MouseEvent) => void;

  onMount(() => {
    handleClickOutside = (e: MouseEvent) => {
      const searchCard = document.getElementById("search-card");
      const target = e.target as HTMLElement;
      if (searchCard && !searchCard.contains(target)) {
        setIsOpen(false);
        setPosts([]);
        setSearchQuery("");
        setPage(0);
        setHasMore(true);
      }
    };
  });

  const toggleSearch = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen());
    
    // Only add/remove listeners in browser environment
    if (typeof window !== 'undefined') {
      if (!isOpen()) {
        document.addEventListener("click", handleClickOutside);
      } else {
        document.removeEventListener("click", handleClickOutside);
      }
    }
  };

  onCleanup(() => {
    if (typeof window !== 'undefined') {
      document.removeEventListener("click", handleClickOutside);
      clearTimeout(searchTimeout);
    }
  });

  return (
    <>
      <button type="button" onClick={toggleSearch} class="relative z-50">
        <svg class="w-[26.4px] stroke-[#444] dark:stroke-white my-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="29.5" height="29.5" viewBox="0 0 29.5 29.5" stroke-width="1.5" stroke="#777" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14.5m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M23.8 22.8l-3 -3" /></svg>
      </button>
      <Show when={isOpen()}>
        <div class="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}>
          <div id="search-card" class="fixed top-20 left-1/2 p-9 transform -translate-x-1/2 w-[700px] bg-white dark:bg-black dark:border dark:border-solid dark:border-neutral-900 rounded-xl shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
            <div>
              <input type="text" value={searchQuery()} onInput={(e) => handleSearch(e.currentTarget.value)} placeholder="Search..." 
              class="w-full px-4 py-3 bg-[#f2f2f2] dark:bg-[#121212] dark:placeholder:text-neutral-400 dark:text-neutral-100 rounded-full" autofocus/>
            </div>
            <Show when={error()}><div class="p-4 text-red-500">Error: {error()}</div></Show>
            <div class="max-h-[400px] pb-10 overflow-y-auto" onScroll={handleScroll}>
              <Show when={!initialLoading()} fallback={<div class="p-4 text-center text-gray-500">{searchQuery().trim() ? "Searching..." : "Please enter a search query"}</div>}>
                <Show when={posts().length > 0} fallback={<div class="p-4 text-center text-gray-500">{searchQuery().trim() ? "No posts found" : "Please enter a search query"}</div>}>
                  <For each={posts()}>
                    {(post) => (
                      <div class="p-4 border-b hover:bg-neutral-50 dark:hover:bg-neutral-950">
                      <h3 class="text-lg text-neutral-900 dark:text-neutral-100 font-semibold">{post.title}</h3>
                      <p class="text-neutral-800 dark:text-neutral-300">{post.description}</p>
                      <p class="text-sm text-neutral-700 dark:text-neutral-400">{new Date(post.publish_date).toLocaleDateString()}</p>
                      </div>
                    )}
                  </For>
                </Show>
              </Show>
              <Show when={loading() && !initialLoading() && posts().length > 0}><div class="p-4 text-center text-gray-500">Loading more...</div></Show>
              <Show when={!hasMore() && posts().length > 0}><div class="p-4 text-center text-gray-500">No more posts</div></Show>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};

export default Search;