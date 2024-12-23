import { A } from '@solidjs/router';
import { createSignal, onCleanup, Component } from 'solid-js';

interface DropdownProps {
  slug: string;
  title: string;
}

const ShareButton: Component<DropdownProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [showWarning, setShowWarning] = createSignal(false);
  let dropdownRef: HTMLDivElement | undefined;
  let buttonRef: HTMLButtonElement | undefined;

  const handleClick = (e: MouseEvent) => {
    if (!dropdownRef || !buttonRef) return;
    
    if (!dropdownRef.contains(e.target as Node) && 
        !buttonRef.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen());
  };

  const handleCopy = async () => {
    try {
      const url = `localhost:3000/${props.slug}`;
      await navigator.clipboard.writeText(url);
      setShowWarning(true);
      setIsOpen(false);
      
      setTimeout(() => {
        setShowWarning(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  document.addEventListener('click', handleClick);

  onCleanup(() => {
    document.removeEventListener('click', handleClick);
  });

  return (
    <>
      <div class="relative inline-block h-7">
        <button ref={buttonRef} onClick={toggleDropdown} type="button" class='w-[17px] h-[17px] p-[1px] items-center' aria-label="Share this article">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" class='stroke-neutral-900 dark:stroke-neutral-50' stroke-width="1.6" stroke-linecap="round" stroke-linejoin="miter"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><polyline points="22 14 22 22 2 22 2 14"></polyline><polyline points="7 7 12 2 17 7"></polyline><line x1="12" y1="2" x2="12" y2="14"></line></g></svg>
        </button>
        <div ref={dropdownRef} class="btn absolute top-8 left-1 bg-white w-56 rounded-md px-3 py-4 z-10" style={{ display: isOpen() ? 'block' : 'none' }}>
        <button type='button' class='flex px-2 py-2 text-sm gap-4 opacity-75' onClick={handleCopy}><svg class='w-4 opacity-75' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><title>hyperlink</title><path d="M60.54,34.07A7.65,7.65,0,0,1,49.72,23.25l13-12.95a35.38,35.38,0,0,1,49.91,0l.07.08a35.37,35.37,0,0,1-.07,49.83l-13,12.95A7.65,7.65,0,0,1,88.81,62.34l13-13a20.08,20.08,0,0,0,0-28.23l-.11-.11a20.08,20.08,0,0,0-28.2.07l-12.95,13Zm14,3.16A7.65,7.65,0,0,1,85.31,48.05L48.05,85.31A7.65,7.65,0,0,1,37.23,74.5L74.5,37.23ZM62.1,89.05A7.65,7.65,0,0,1,72.91,99.87l-12.7,12.71a35.37,35.37,0,0,1-49.76.14l-.28-.27a35.38,35.38,0,0,1,.13-49.78L23,50A7.65,7.65,0,1,1,33.83,60.78L21.12,73.49a20.09,20.09,0,0,0,0,28.25l0,0a20.07,20.07,0,0,0,28.27,0L62.1,89.05Z"/></svg>Copy</button>
          <A href={`https://x.com/intent/post?text=${props.title} https://localhost:3000/${props.slug}`} target="_blank" rel="noopener noreferrer" class='flex px-2 py-1 text-sm gap-3 opacity-75'><svg class='w-4 opacity-75' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 462.799"><path d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"/></svg>Share on X</A>
          <A href='#' class='flex px-2 py-3 text-sm gap-3 opacity-75'><svg class='w-4 opacity-75' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 509 509"><g><path d="M509 254.5C509 113.94 395.06 0 254.5 0S0 113.94 0 254.5C0 373.86 82.17 474 193.02 501.51V332.27h-52.48V254.5h52.48v-33.51c0-86.63 39.2-126.78 124.24-126.78 16.13 0 43.95 3.17 55.33 6.33v70.5c-6.01-.63-16.44-.95-29.4-.95-41.73 0-57.86 15.81-57.86 56.91v27.5h83.13l-14.28 77.77h-68.85v174.87C411.35 491.92 509 384.62 509 254.5z"/><path fill="#fff" d="M354.18 332.27l14.28-77.77h-83.13V227c0-41.1 16.13-56.91 57.86-56.91 12.96 0 23.39.32 29.4.95v-70.5c-11.38-3.16-39.2-6.33-55.33-6.33-85.04 0-124.24 40.16-124.24 126.78v33.51h-52.48v77.77h52.48v169.24c19.69 4.88 40.28 7.49 61.48 7.49 10.44 0 20.72-.64 30.83-1.86V332.27h68.85z"/></g></svg>Share on Facebook</A>
          <A href='#' class='flex px-2 py-1 text-sm gap-3 opacity-75'><svg class='w-4 opacity-75' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 509.64"><rect width="512" height="509.64" rx="115.61" ry="115.61"/><path fill="#fff" d="M204.97 197.54h64.69v33.16h.94c9.01-16.16 31.04-33.16 63.89-33.16 68.31 0 80.94 42.51 80.94 97.81v116.92h-67.46l-.01-104.13c0-23.81-.49-54.45-35.08-54.45-35.12 0-40.51 25.91-40.51 52.72v105.86h-67.4V197.54zm-38.23-65.09c0 19.36-15.72 35.08-35.08 35.08-19.37 0-35.09-15.72-35.09-35.08 0-19.37 15.72-35.08 35.09-35.08 19.36 0 35.08 15.71 35.08 35.08zm-70.17 65.09h70.17v214.73H96.57V197.54z"/></svg>Share on LinkedIn</A>
        </div>
      </div>

      {showWarning() && (
        <div class="fixed bottom-5 right-5 p-3 bg-green-500 text-white rounded-md z-50">
          Copied to clipboard!
        </div>
      )}
    </>
  );
};

export default ShareButton;