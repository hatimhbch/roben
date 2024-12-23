export function Skele() {
  return (
    <div class="min-h-screen bg-white dark:bg-black">
      <main class="w-full mx-auto px-4 py-8">
        <article class="max-w-[920px] mx-auto px-4 py-8">
          {/* Header skeleton with exact dimensions */}
          <div class="flex mt-16 mx-auto items-center justify-center h-4 space-x-2">
            <div class="h-4 w-[120px] bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div class="h-4 w-[8px] bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div class="h-4 w-[80px] bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
          
          {/* Title skeleton with exact height */}
          <div class="h-[40px] w-[600px] mx-auto mt-6 mb-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
          
          {/* Description skeleton with exact width */}
          <div class="h-[48px] w-[75%] mx-auto mb-8 bg-neutral-200 dark:bg-neutral-800 rounded" />
          
          {/* Image skeleton with exact aspect ratio */}
          <div class="w-full h-0 pb-[52.5%] relative bg-neutral-200 dark:bg-neutral-800 rounded-xl">
            <div class="absolute inset-0" />
          </div>
          
          {/* Content skeleton with exact spacing */}
          <div class="mt-8 space-y-4 px-24 py-10 sm:px-0">
            <div class="h-6 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div class="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div class="h-4 w-[90%] bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div class="h-4 w-[85%] bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div class="h-6 w-[80%] bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div class="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div class="h-4 w-[95%] bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
        </article>
      </main>
    </div>
  );
}