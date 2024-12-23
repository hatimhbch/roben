import { Component } from 'solid-js';

interface SaveButtonProps {
  postId: number;
  toggleSavePost: (postId: number) => void;
  isPostSaved: (postId: number) => boolean;
}

const SaveButton: Component<SaveButtonProps> = ({ postId, toggleSavePost, isPostSaved}) => {
  return (
    <button type="button" onClick={() => toggleSavePost(postId)} class={`${isPostSaved(postId) ? 'saved' : ''} h-[18px]`} aria-label="Save this article">
      <svg class={`h-[17px] ${
    isPostSaved(postId) ? "stroke-[#0692f0] dark:stroke-[#0692f0]" : "stroke-[#000] dark:stroke-[#fff]"}`} stroke-width="3.3" fill={isPostSaved(postId) ? '#0692f0' : 'none'} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M51,55.4,32.18,39A1,1,0,0,0,31,39L13,55.34a1,1,0,0,1-1.6-.8V9.41a1,1,0,0,1,1-1H51.56a1,1,0,0,1,1,1V54.58A1,1,0,0,1,51,55.4Z" stroke-linecap="round"></path></svg>
    </button>
  );
};

export default SaveButton;