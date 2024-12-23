import { createSignal, onMount, onCleanup, Component, Show, createResource } from 'solid-js';
import { isServer } from 'solid-js/web';
import { fetchPostsFromSupabase } from '~/utils/supabaseClient';
import { formatDate, cutDesc } from '~/utils/cutter';
import { Post } from '~/types';
import { useSavedPosts } from '~/hooks/useSave';
import ShareButton from '~/tools/ShareButton';
import SaveButton from '~/tools/SaveButton';
import { A } from '@solidjs/router';

interface PostListProps {
  posts: Post[];
  postId: number;
  slug: string;
  title: string;
  toggleSavePost: (postId: number) => void;
  isPostSaved: (postId: number) => boolean;
  showBtn: number | null;
}

// Cache implementation
const createCache = <T,>(ttl: number = 60000) => {
  let cache: { data: T | null; timestamp: number } = {
    data: null,
    timestamp: 0,
  };

  return {
    get: () => {
      if (!cache.data) return null;
      const now = Date.now();
      if (now - cache.timestamp > ttl) {
        cache.data = null;
        return null;
      }
      return cache.data;
    },
    set: (data: T) => {
      cache.data = data;
      cache.timestamp = Date.now();
    },
  };
};

const postsCache = createCache<Post[]>();

const fetchWithCache = async (page: number, limit: number) => {
  if (page === 0) {
    const cachedData = postsCache.get();
    if (cachedData) return cachedData;
  }

  const data = await fetchPostsFromSupabase(page, limit);
  if (page === 0) {
    postsCache.set(data);
  }
  return data;
};

const CatPosts: Component<PostListProps> = () => {
  const [posts, setPosts] = createSignal<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = createSignal<Post[]>([]);
  const [page, setPage] = createSignal(0);
  const [loading, setLoading] = createSignal(false);
  const [initialLoading, setInitialLoading] = createSignal(true);
  const [hasMore, setHasMore] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const [activeFilter, setActiveFilter] = createSignal('All');
  const { savePost, removeFromSavedPosts, isPostSaved } = useSavedPosts();
  const LIMIT = 10;

  const filters = ['All', 'Web Development', 'App Development', 'Ai'];

  // Create a resource for automatic cache updates
  const [_cachedPosts] = createResource(() => {
    const interval = setInterval(async () => {
      if (page() === 0) {
        await fetchPosts();
      }
    }, 60000); // Update cache every minute

    onCleanup(() => clearInterval(interval));
    return null;
  });

  const fetchPosts = async () => {
    if (loading() || !hasMore()) return;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWithCache(page(), LIMIT);
      data.length < LIMIT && setHasMore(false);
      setPosts(prev => [...prev, ...data]);
      filterPosts(activeFilter(), [...posts(), ...data]);
      setPage(p => p + 1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const filterPosts = (filter: string, postsToFilter = posts()) => {
    if (filter === 'All') {
      setFilteredPosts(postsToFilter);
    } else {
      setFilteredPosts(postsToFilter.filter(post => post.type === filter));
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setPage(0);
    setHasMore(true);
    setPosts([]);
    setFilteredPosts([]);
    fetchPosts();
  };

  const toggleSavePost = (postId: number) => 
    isPostSaved(postId) ? removeFromSavedPosts(postId) : savePost(postId);

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    scrollHeight - scrollTop <= clientHeight * 1.5 && fetchPosts();
  };

  onMount(() => {
    if (!isServer) {
      fetchPosts();
      window.addEventListener('scroll', handleScroll);
    }
  });

  onCleanup(() => !isServer && window.removeEventListener('scroll', handleScroll));

  return (
    <div class="w-full mt-20 sm:w-[100%] p-14 sm:p-0 bg-white dark:bg-black">
      <div class="flex gap-x-3 p-5">
        {filters.map(filter => (
          <button
            class={`px-3 py-1 text-neutral-800 font-montserrat font-semibold text-sm sm:text-xs sm:py-3 rounded-lg dark:text-white ${
              activeFilter() === filter
                ? 'bg-neutral-100 dark:bg-neutral-800'
                : 'bg-none'
            }`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {error() && <div class="error">Error: {error()}</div>}
      <div class="posts-grid flex flex-wrap gap-x-3 sm:block">
        {initialLoading() ? (
          <div>Loading initial posts...</div>
        ) : filteredPosts().length === 0 ? (
          <div>No posts found</div>
        ) : (
          filteredPosts().map(({ id, title, description, slug, type, publish_date, coverimage }) => (
            <div class="block w-72 p-5 bord-b border-solid border-neutral-100 dark:border-neutral-900
            sm:w-full sm:p-0">
              <img class='w-full h-auto mx-auto my-auto' src={coverimage}  alt={title} loading="lazy" />
              <div class="w-full my-auto items-center py-5 sm:w-11/12 sm:mx-auto">
                <A href={`/${slug}`} class='text-neutral-800 dark:text-neutral-50 font-manrope text-lg font-semibold sm:text-base'>
                  {title}
                </A>
                <div class="flex w-full py-3 justify-between">
                  <div class="flex items-center">
                    <p class='text-[13px] text-neutral-400 dark:text-[#888] font-nunito pr-1 sm:text-xs'>{formatDate(publish_date)}</p>
                    <p class='text-sm text-neutral-400 dark:text-neutral-500 mt-[-3px] font-montserrat px-1'>|</p>
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class='mt-[-2px] px-1' width="22" height="22" fill="none" viewBox="0 0 64 64">
                        <path fill="#FFC017" d="m39.637 40.831-5.771 15.871a1.99 1.99 0 0 1-3.732 0l-5.771-15.87a2.02 2.02 0 0 0-1.194-1.195L7.298 33.866a1.99 1.99 0 0 1 0-3.732l15.87-5.771a2.02 2.02 0 0 0 1.195-1.194l5.771-15.871a1.99 1.99 0 0 1 3.732 0l5.771 15.87a2.02 2.02 0 0 0 1.194 1.195l15.871 5.771a1.99 1.99 0 0 1 0 3.732l-15.87 5.771a2.02 2.02 0 0 0-1.195 1.194"></path>
                      </svg>
                      <p class='text-[13px] text-neutral-400 dark:text-[#888] font-nunito sm:text-xs'>{type}</p>
                    </div>
                  </div>
                  <div class="flex w-[47px] justify-between">
                    <ShareButton slug={slug} title={title} />
                    <SaveButton postId={id} toggleSavePost={toggleSavePost} isPostSaved={isPostSaved}/>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {loading() && !initialLoading() && filteredPosts().length > 0 && <div>Loading more...</div>}
      <Show when={!hasMore() && !initialLoading()}><div>No more posts</div></Show>
    </div>
  );
};

export default CatPosts;