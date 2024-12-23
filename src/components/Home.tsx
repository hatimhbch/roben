import { A } from "@solidjs/router"

function Home() {
  return (
    <div class="block w-[89%] mx-auto">
      <div class="flex w-[100%] p-4 justify-between mx-auto">
      <p class="font-montserrat font-semibold text-sm text-neutral-800 dark:text-neutral-100">Popular</p>
      <A class="font-montserrat font-semibold text-sm text-neutral-800 bg-[#f0f0f0] dark:text-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full" href='/'>See All Posts</A></div>
      <div class="flex w-[100%] mx-auto bg-white dark:bg-black mt-2 justify-between rounded-xl sm:block">
        <div class="block w-[450px] p-9 pr-6 sm:w-full">
           <h4 class="text-neutral-500 font-nunito font-medium dark:text-neutral-100 sm:text-xs">Web Development</h4>
           <h1 class="py-3 font-manrope text-4xl font-semibold dark:text-neutral-200 sm:text-2xl">Nextjs vs Svelte</h1>
           <p class="font-nunito text-lg text-neutral-800 mt-2 sm:text-base dark:text-neutral-300 sm:mt-1">Nextjs is the best framework for seo, but you have a problem in speed. svelte solve this problem is fastest x5 as next.</p>
           <div class="flex mt-4 gap-x-3">
             <p class="text-sm text-neutral-600 font-montserrat font-medium bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-200 py-[6px] px-[10px] rounded-full">Nextjs</p>
             <p class="text-sm text-neutral-600 font-montserrat font-medium bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-200 py-[6px] px-[10px] rounded-full">Svelte</p>
             <p class="text-sm text-neutral-600 font-montserrat font-medium bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-200 py-[6px] px-[10px] rounded-full">Frontend</p>
           </div>
         </div>
         <img class="w-[700px] rounded-r-xl sm:rounded-b-xl" src="https://cloud.appwrite.io/v1/storage/buckets/66f73f9600222542072b/files/66f73fc2002e2e37684f/view?project=66f73f87002ec69d02a2&project=66f73f87002ec69d02a2&mode=admin" alt="img" />
      </div>
    </div>
  )
}

export default Home