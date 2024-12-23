import { A, createAsync, useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal, For, onMount, Show, Suspense } from "solid-js";
import { Post } from "~/types";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import "~/assets/github.css";
import { Skele } from "~/components/Skele";
import { MetaProvider } from "@solidjs/meta";

// Register only the languages we need
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);

type Heading = {
  id: string;
  text: string;
  element: HTMLHeadingElement;
};

export default function BlogPost() {
  const params = useParams();
  const [showTOC, setShowTOC] = createSignal(false);
  const [isVisible, setIsVisible] = createSignal(false);
  const [readingProgress, setReadingProgress] = createSignal(0);
  const [activeHeading, setActiveHeading] = createSignal<string | null>(null);
  const [headings, setHeadings] = createSignal<Heading[]>([]);
  const [relatedPosts, setRelatedPosts] = createSignal<Post[] | undefined>();
  let articleRef: HTMLElement;

  const [post] = createResource(async () => {
    const response = await fetch(`http://localhost:3000/api/posts?slug=${params.slug}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json() as Promise<Post>;
  });

  // Update the related posts fetch
  createEffect(() => {
    if (post()) {
      fetch(`/api/posts?type=${post()?.type}&currentSlug=${post()?.slug}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch related posts');
          return response.json();
        })
        .then(data => {
          setRelatedPosts(data as Post[]);
        })
        .catch(error => {
          console.error("Error fetching related posts:", error);
        });
    }
  });

  // Preload images
  createEffect(() => {
    if (post()) {
      const img = new Image();
      img.src = `${post()?.coverimage}?quality=80`;
    }
  });

  createEffect(() => {
    if (post()) {
      setTimeout(() => {
        const h3Elements = articleRef.getElementsByTagName('h3');
        const headingsList: Heading[] = Array.from(h3Elements).map((element, index) => {
          const id = `heading-${index}`;
          element.id = id;
          return {
            id,
            text: element.textContent || '',
            element
          };
        });
        setHeadings(headingsList);
      }, 100);
    }
  });

  // Handle scroll behavior
  onMount(() => {
    const handleScroll = () => {
      if (headings().length === 0) return;

      const scrollPosition = window.scrollY + 100;
      const articleTop = articleRef.offsetTop;
      const articleBottom = articleTop + articleRef.offsetHeight;

      // Calculate reading progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));

      setShowTOC(
        scrollPosition >= headings()[0].element.offsetTop &&
        scrollPosition <= articleBottom
      );

      for (let i = headings().length - 1; i >= 0; i--) {
        if (scrollPosition >= headings()[i].element.offsetTop) {
          setActiveHeading(headings()[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  createEffect(() => {
    if (post()) {
      queueMicrotask(() => {
        document.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightElement(block);
        });
      });
    }
  });

  const formattedPublishDate = (date: string) => new Date(date).toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
    <MetaProvider>
      <title>{post()?.title}</title>
      <meta name="description" content={post()?.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" id="elevenaiDesktopViewport" />
      <meta name="theme-color" content="#308D46"/>
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={`https://robenhod.com/${post()?.slug}`} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post()?.title} />
      <meta property="og:description" content={post()?.description} />
      <meta property="og:url" content={`https://robenhod.com/${post()?.slug}`} />
      <meta property="og:site_name" content="Roben Hod" />
      <meta property="article:publisher" content="https://www.facebook.com/robenhodsoc/" />
      <meta property="article:published_time" content="2023-09-27T08:34:49+00:00" />
      <meta property="article:modified_time" content="2024-09-17T11:17:22+00:00" />
      <meta name="author" content="Hatim Habch" />
      <meta property="og:image" content={post()?.coverimage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={post()?.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={post()?.description} />
      <meta name="twitter:creator" content="@hatim_habch"/>
      <meta name="twitter:site" content="@robenhodsoc" />
      {/* <script type="application/ld+json" 
      class="yoast-schema-graph">{
        "@context":"https://schema.org",
        "@graph":[{
          "@type":"Article",
          "@id":"https://ahrefs.com/blog/blogging-tips/#article",
          "isPartOf":{"@id":"https://ahrefs.com/blog/blogging-tips/"},
          "author":[{"@id":"https://ahrefs.com/blog/#/schema/person/e09e43a1a939a6723fb3c1ebd243f2e7"}],
          "headline":"23 Beginner Blogging Tips to Get Better at Blogging (Fast)",
          "datePublished":"2023-09-27T08:34:49+00:00",
          "dateModified":"2024-09-17T11:17:22+00:00",
          "mainEntityOfPage":{"@id":"https://ahrefs.com/blog/blogging-tips/"},
          "wordCount":3339,
          "publisher":{"@id":"https://ahrefs.com/blog/#organization"},
          "image":{"@id":"https://ahrefs.com/blog/blogging-tips/#primaryimage"},
          "thumbnailUrl":"https://ahrefs.com/blog/wp-content/uploads/2023/09/23-beginner-blogging-tips-to-get-by-si-quan-ong-general-seo.jpg",
          "articleSection":["Content Marketing","General SEO"],
          "inLanguage":"en-US"},
          {"@type":"WebPage",
          "@id":"https://ahrefs.com/blog/blogging-tips/",
          "url":"https://ahrefs.com/blog/blogging-tips/",
          "name":"23 Beginner Blogging Tips to Get Better at Blogging (Fast)",
          "isPartOf":{"@id":"https://ahrefs.com/blog/#website"},
          "primaryImageOfPage":{"@id":"https://ahrefs.com/blog/blogging-tips/#primaryimage"},
          "image":{"@id":"https://ahrefs.com/blog/blogging-tips/#primaryimage"},
          "thumbnailUrl":"https://ahrefs.com/blog/wp-content/uploads/2023/09/how-to-find-a-good-blog-niche.png",
          "datePublished":"2023-09-27T08:34:49+00:00",
          "dateModified":"2024-09-17T11:17:22+00:00",
          "description":"These tried and tested blogging tips will help you become a better blogger fast – even if you're a complete beginner.",
          "inLanguage":"en-US",
          "potentialAction":[{"@type":"ReadAction","target":["https://ahrefs.com/blog/blogging-tips/"]}]},
          {"@type":"ImageObject",
          "inLanguage":"en-US",
          "@id":"https://ahrefs.com/blog/blogging-tips/#primaryimage",
          "url":"https://ahrefs.com/blog/wp-content/uploads/2023/09/how-to-find-a-good-blog-niche.png",
          "contentUrl":"https://ahrefs.com/blog/wp-content/uploads/2023/09/how-to-find-a-good-blog-niche.png",
          "width":1600,
          "height":1546,
          "caption":"How to find a good blog niche"},
          {"@type":"WebSite",
          "@id":"https://ahrefs.com/blog/#website",
          "url":"https://ahrefs.com/blog/",
          "name":"SEO Blog by Ahrefs",
          "description":"Link Building Strategies &amp; SEO Tips","publisher":{
            "@id":"https://ahrefs.com/blog/#organization"},
          "potentialAction":[{
            "@type":"SearchAction",
            "target":{"@type":"EntryPoint","urlTemplate":"https://ahrefs.com/blog/?s={search_term_string}"},
            "query-input":{
              "@type":"PropertyValueSpecification",
              "valueRequired":true,
              "valueName":"search_term_string"
            }}],
            "inLanguage":"en-US"
            },
            {
              "@type":"Organization",
              "@id":"https://ahrefs.com/blog/#organization",
              "name":"Ahrefs","url":"https://ahrefs.com/blog/",
              "logo":{
                "@type":"ImageObject",
                "inLanguage":"en-US",
                "@id":"https://ahrefs.com/blog/#/schema/logo/image/",
                "url":"https://ahrefs.com/blog/wp-content/uploads/2023/06/ahrefs-logo.png",
                "contentUrl":"https://ahrefs.com/blog/wp-content/uploads/2023/06/ahrefs-logo.png",
                "width":2048,
                "height":768,
                "caption":"Ahrefs"
              },
              "image":{
                "@id":"https://ahrefs.com/blog/#/schema/logo/image/"},
                "sameAs":["https://www.facebook.com/Ahrefs/",
                "https://x.com/ahrefs",
                "https://www.linkedin.com/company/ahrefs/",
                "https://www.youtube.com/c/ahrefscom"]},
                {
                  "@type":"Person",
                  "@id":"https://ahrefs.com/blog/#/schema/person/e09e43a1a939a6723fb3c1ebd243f2e7",
                  "name":"Si Quan Ong",
                  "image":{
                    "@type":"ImageObject",
                    "inLanguage":"en-US",
                    "@id":"https://ahrefs.com/blog/#/schema/person/image/a792b2ebf044ff0f390a6e1c76bf4a0e",
                    "url":"https://ahrefs.com/blog/wp-content/uploads/2023/08/SiQuanOng_2x.jpg",
                    "contentUrl":"https://ahrefs.com/blog/wp-content/uploads/2023/08/SiQuanOng_2x.jpg",
                    "caption":"Si Quan Ong"
                  },
                  "description":"Content marketer @ Ahrefs. I've been in digital marketing for the past 6 years and have spoken at some of the industry’s largest conferences in Asia (TIECon and Digital Marketing Skill Share.) I also write about my curiosities on my Substack.","sameAs":["https://www.siquanong.com/","si-quan-ong","https://x.com/siquanong"],
                  "url":"https://ahrefs.com/blog/author/si-quan-ong/"
                }]}
              </script> */}
    </MetaProvider>
    <Suspense fallback={<Skele />}>
      <div class="min-h-screen bg-white dark:bg-black">
        <Show when={post()}>
          <div 
            class="fixed top-0 left-0 w-full h-1 bg-neutral-100 dark:bg-neutral-800 z-50"
            style={{ "overflow": "hidden" }}
          >
            <div 
              class="h-full bg-orange-500 transition-all duration-150 ease-out"
              style={{ width: `${readingProgress()}%` }}
            />
          </div>
        </Show>
        <main class="w-full mx-auto px-4 py-8">
          <Show when={showTOC()}>
            <button 
              onClick={() => setIsVisible(!isVisible())} 
              class="fixed w-10 h-10 hidden sm:block bottom-4 right-4 px-[10px] py-[10px] bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors duration-200"
              style={{ "transform": "translateZ(0)" }}
            >
              <svg fill="#fff" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"><title>ionicons-v5-h</title>
                  <path d="M104,160a56,56,0,1,1,56-56A56.06,56.06,0,0,1,104,160Z"></path>
                  <path d="M256,160a56,56,0,1,1,56-56A56.06,56.06,0,0,1,256,160Z"></path>
                  <path d="M408,160a56,56,0,1,1,56-56A56.06,56.06,0,0,1,408,160Z"></path>
                  <path d="M104,312a56,56,0,1,1,56-56A56.06,56.06,0,0,1,104,312Z"></path>
                  <path d="M256,312a56,56,0,1,1,56-56A56.06,56.06,0,0,1,256,312Z"></path>
                  <path d="M408,312a56,56,0,1,1,56-56A56.06,56.06,0,0,1,408,312Z"></path>
                  <path d="M104,464a56,56,0,1,1,56-56A56.06,56.06,0,0,1,104,464Z"></path>
                  <path d="M256,464a56,56,0,1,1,56-56A56.06,56.06,0,0,1,256,464Z"></path>
                  <path d="M408,464a56,56,0,1,1,56-56A56.06,56.06,0,0,1,408,464Z"></path>
                </g>
              </svg>
            </button>
            <nav 
              class={`${isVisible() ? 'sm:block' : 'block sm:hidden'} fixed top-12 left-2 w-64 p-4 sm:top-auto sm:left-auto sm:bottom-16 sm:right-4 sm:translate-x-0 sm:bg-neutral-50 sm:dark:bg-neutral-950 rounded-md overflow-hidden shadow-lg transition-transform duration-200 ease-in-out`}
              style={{ 
                "transform": "translateZ(0)",
                "backface-visibility": "hidden"
              }}
            >
              <div class="relative w-full">
                <div class="absolute -top-2 right-2 w-3 h-3 bg-neutral-50 dark:bg-neutral-950 transform rotate-45 sm:block hidden" />
              </div>
              <ul class="space-y-1">
                <For each={headings()}>{(heading) => (
                  <li>
                    <button 
                      onClick={() => scrollToHeading(heading.id)} 
                      class={`text-left text-[13px] font-inter font-normal w-full transition-colors leading-4 tracking-wide px-2 py-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-900 ${
                        activeHeading() === heading.id 
                          ? 'text-neutral-950 dark:text-white bg-neutral-100 dark:bg-neutral-900' 
                          : 'text-neutral-500 dark:text-[#828282]'
                      }`}
                      style={{ "transform": "translateZ(0)" }}
                    >
                      {heading.text}
                    </button>
                  </li>
                )}</For>
              </ul>
            </nav>
          </Show>
          <Show when={post()} fallback={<div class="text-center">Loading...</div>}>
            <article class="max-w-[920px] mx-auto px-4 py-8" ref={articleRef}>
              <div class="flex mt-16 mx-auto items-center justify-center h-4">
                <p class="font-montserrat font-medium text-xs text-center dark:text-neutral-400">
                  {formattedPublishDate(post()?.publish_date)}
                </p>
                <p class="font-manrope font-light px-2 text-center dark:text-neutral-400">|</p>
                <p class="font-montserrat font-medium text-xs text-center dark:text-neutral-400">
                  {post()?.type}
                </p>
              </div>
              <h1 class="text-4xl font-montserrat font-semibold text-center mt-3 mb-4 text-black dark:text-white h-[40px] mx-auto">
                {post()?.title}
              </h1>
              <div class="text-base text-gray-700 text-center font-nunito mb-8 w-[75%] h-[48px] mx-auto dark:text-neutral-200">
                {post()?.description}
              </div>
              <div class="w-full h-0 pb-[52.5%] relative">
                <picture class="absolute inset-0">
                  <source
                    type="image/webp"
                    srcset={`https://cdn.jsdelivr.net/gh/hatimhbch/blog@master/images/${post()?.slug}.webp?format=webp&quality=80&width=1200 1x, https://cdn.jsdelivr.net/gh/hatimhbch/blog@master/images/${post()?.slug}.webp?format=webp&quality=80&width=1200&dpr=2 2x`}
                  />
                  <source
                    type="image/jpeg"
                    srcset={`https://cdn.jsdelivr.net/gh/hatimhbch/blog@master/images/${post()?.slug}.webp?quality=80&width=1200 1x, https://cdn.jsdelivr.net/gh/hatimhbch/blog@master/images/${post()?.slug}.webp?quality=80&width=1200&dpr=2 2x`}
                  />
                  <img 
                    class="w-full h-full object-cover rounded-xl border border-solid border-neutral-200 dark:border-none" 
                    style={{ 
                      "z-index": '-10',
                      "transform": "translateZ(0)",
                      "will-change": "transform"
                    }}
                    src={`https://cdn.jsdelivr.net/gh/hatimhbch/blog@master/images/${post()?.slug}.webp?quality=80&width=1200`}
                    alt={post()?.title} 
                    width={1200} 
                    height={630} 
                    sizes="100vw"
                    loading="eager" 
                    decoding="async" 
                    fetchpriority="high"
                  />
                </picture>
              </div>
              <div 
                class="content prose prose-lg mt-8 space-y-4 px-24 py-10 sm:px-0 z-10 prose-headings:text-black prose-p:text-gray-800 dark:prose-headings:text-white dark:prose-p:text-gray-200" 
                innerHTML={post()?.content}
                style={{ "transform": "translateZ(0)" }}
              />
            </article>
          </Show>
        </main>
      </div>
      <Show when={post()}>
            <div class="mt-12">
              <h2 class="text-2xl font-bold mb-4">Related Posts</h2>
              <Show when={relatedPosts() && relatedPosts()?.length > 0} fallback={<p>No related posts found.</p>}>
                <ul class="flex flex-wrap">
                  <For each={relatedPosts()}>{(relatedPost) => (
                    <li class="mb-2 w-1/5">
                      <img src={`https://cdn.jsdelivr.net/gh/hatimhbch/blog@master/images/${relatedPost?.slug}.webp?format=webp&quality=80&width=1200 1x, https://cdn.jsdelivr.net/gh/hatimhbch/blog@master/images/${relatedPost.slug}.webp?format=webp&quality=80&width=1200&dpr=2 2x`} alt="" />
                      <A href={`/blog/${relatedPost.slug}`}>
                        <a class="text-lg hover:underline">{relatedPost.title}</a>
                      </A>
                    </li>
                  )}</For>
                </ul>
              </Show>
            </div>
          </Show>
    </Suspense>
  </>
  );
}