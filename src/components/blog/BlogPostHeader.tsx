import { Post } from "~/types";

interface BlogPostHeaderProps {
  post: Post;
  formattedPublishDate: (date: string) => string;
}

export default function BlogPostHeader({ post, formattedPublishDate }: BlogPostHeaderProps) {
  return (
    <>
      <div class="flex mt-16 mx-auto items-center justify-center">
        <p class="font-montserrat font-medium text-xs dark:text-neutral-400">
          {formattedPublishDate(post.publish_date)}
        </p>
        <p class="font-manrope font-light px-2 dark:text-neutral-400">|</p>
        <p class="font-montserrat font-medium text-xs dark:text-neutral-400">
          {post.type}
        </p>
      </div>
      <h1 class="text-4xl font-montserrat font-semibold text-center mt-3 mb-4 text-black dark:text-white">
        {post.title}
      </h1>
      <div class="text-base text-gray-700 text-center font-nunito mb-8 w-3/4 mx-auto dark:text-neutral-200">
        {post.description}
      </div>
      <picture>
        <source
          type="image/webp"
          srcset={`${post.coverimage}?format=webp&quality=80 1x, ${post.coverimage}?format=webp&quality=80&dpr=2 2x`}
        />
        <source
          type="image/jpeg"
          srcset={`${post.coverimage}?quality=80 1x, ${post.coverimage}?quality=80&dpr=2 2x`}
        />
        <img 
          class="w-full rounded-xl border border-solid border-neutral-200 dark:border-none" 
          style={{"z-index": '-10'}}
          src={`${post.coverimage}?quality=80`}
          alt={post.title} 
          width={1200} 
          height={630} 
          loading="eager" 
          decoding="async" 
          fetchpriority="high"
        />
      </picture>
    </>
  );
}
