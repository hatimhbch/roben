import { For, Show } from "solid-js";
import { Heading } from "~/types";

interface TableOfContentsProps {
  showTOC: () => boolean;
  isVisible: () => boolean;
  setIsVisible: (value: boolean) => void;
  headings: () => Heading[];
  activeHeading: () => string | null;
  scrollToHeading: (id: string) => void;
}

export default function TableOfContents({ 
  showTOC, 
  isVisible, 
  setIsVisible, 
  headings, 
  activeHeading, 
  scrollToHeading 
}: TableOfContentsProps) {
  return (
    <Show when={showTOC()}>
      <button 
        onClick={() => setIsVisible(!isVisible())} 
        class="fixed w-10 h-10 hidden sm:block bottom-4 right-4 px-[10px] py-[10px] bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors duration-200"
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
      <nav class={`${isVisible() ? 'sm:block' : 'block sm:hidden'} fixed top-12 left-2 w-64 p-4 sm:top-auto sm:left-auto sm:bottom-16 sm:right-[-50px] sm:translate-x-[-50%] sm:bg-neutral-50 sm:dark:bg-neutral-950 rounded-md overflow-hidden`}>
        <ul class="space-y-1">
          <For each={headings()}>{(heading) => (
            <li>
              <button 
                onClick={() => scrollToHeading(heading.id)} 
                class={`text-left text-[13px] font-inter font-normal w-full transition-colors leading-4 tracking-wide ${
                  activeHeading() === heading.id 
                    ? 'text-neutral-950 dark:text-white' 
                    : 'text-neutral-500 dark:text-[#828282]'
                }`}
              >
                {heading.text}
              </button>
            </li>
          )}</For>
        </ul>
      </nav>
    </Show>
  );
}
