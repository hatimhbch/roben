import Home from "~/components/Home";
import { lazy } from "solid-js"

const Articles = lazy(() => import("~/components/Articles"));


const InfiniteScroll = () => {

  return (<div class="bg-neutral-50 dark:bg-[#0e0e0e] pt-9">
      <div class="w-full mx-auto"><Home /></div>
      <Articles />
    </div>
  );
};

export default InfiniteScroll;