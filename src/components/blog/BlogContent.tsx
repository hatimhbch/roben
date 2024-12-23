import { onMount } from "solid-js";
import { Post } from "~/types";

interface BlogContentProps {
  post: Post;
}

export default function BlogContent({ post }: BlogContentProps) {
  let contentRef: HTMLDivElement;

  onMount(() => {
    // Add loading="lazy" to all images in the content
    if (contentRef) {
      const images = contentRef.getElementsByTagName('img');
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        img.loading = 'lazy';
        img.decoding = 'async';
        // Set default dimensions to prevent layout shifts
        if (!img.width) img.width = 800;
        if (!img.height) img.height = 450;
      }
    }
  });

  return (
    <div 
      ref={contentRef!}
      class="content prose prose-lg mt-4 px-24 py-10 sm:px-0 z-10 prose-headings:text-black prose-p:text-gray-800 dark:prose-headings:text-white dark:prose-p:text-gray-200" 
      innerHTML={post.content}
    />
  );
}
