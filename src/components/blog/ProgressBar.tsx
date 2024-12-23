interface ProgressBarProps {
  readingProgress: () => number;
}

export default function ProgressBar({ readingProgress }: ProgressBarProps) {
  return (
    <div 
      class="fixed top-0 left-0 w-full h-1 bg-neutral-100 dark:bg-neutral-800 z-50"
      style={{ "overflow": "hidden" }}
    >
      <div 
        class="h-full bg-orange-500 transition-all duration-150 ease-out"
        style={{ width: `${readingProgress()}%` }}
      />
    </div>
  );
}
