// RelatedPosts.tsx
import { A } from "@solidjs/router";
import { For } from "solid-js";
import { Post } from "~/types";

interface RelatedPostsProps {
  posts: Post[] | undefined;
}

// Placeholder image (replace with your actual placeholder)
const placeholderImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export default function RelatedPosts(props: RelatedPostsProps) {
  return (
    <ul class="flex flex-wrap">
      <For each={props.posts}>
        {(relatedPost) => (
          <li class="mb-2 w-1/5">
            <img
              class="w-full aspect-video object-cover"
              src={placeholderImage}
              data-src={`https://cdn.jsdelivr.net/gh/hatimhbch/blog@master/images/${relatedPost?.slug}.webp?format=webp&quality=80&width=600`}
              alt={relatedPost.title}
              loading="lazy"
            />
            <A href={`/blog/${relatedPost.slug}`}>
              <a class="text-lg hover:underline mt-2 block">{relatedPost.title}</a>
            </A>
          </li>
        )}
      </For>
    </ul>
  );
}