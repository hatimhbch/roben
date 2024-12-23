import { createEffect, createSignal } from 'solid-js';

export const useShareAndCopy = () => {
  const [showBtn, setShowBtn] = createSignal<number | null>(null);
  const [copyWarning, setCopyWarning] = createSignal<string | null>(null);

  const handleShareClick = (postId: number) => {
    setShowBtn((prev) => (prev === postId ? null : postId));
    setCopyWarning(null);
  }

  const handleCopySlug = (slug: string) => {
    const url = `https://localhost:3000/${slug}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopyWarning('Copied!');
        setShowBtn(null);
        setTimeout(() => {
          setCopyWarning(null);
        }, 2000);
      })
      .catch((error) => {
        console.error('Failed to copy URL: ', error);
      });
  }

  createEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const btnElement = document.querySelector('.btn');
      if (btnElement && !btnElement.contains(event.target as Node)) {
        setShowBtn(null);
      }
    };

    if (showBtn !== null) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showBtn]);

  return { showBtn, copyWarning, handleShareClick, handleCopySlug };
};