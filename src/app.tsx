import { Route, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Component, createResource, lazy, Suspense } from "solid-js";
import "./app.css";
import Nav from "~/layout/Navbar";
import { Link, Meta, MetaProvider, Title } from '@solidjs/meta'
import { ThemeProvider } from "./contexts/useTheme";
import TopicSearch from "./components/TopicsSearch";
import TopicDetail from "./components/TopicPosts";
import Articles from "./components/Articles";
const BlogPost = lazy(() => import( "./components/BlogPost"));

export default function App() {

  function preloadPost({ params, fetchPost }) {
    const [post] = createResource(() => params.id, fetchPost);
    return post;
  }

  return (  
    <Router root={props => (
      <MetaProvider>
          <Link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans+SC:wght@100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
          <Link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
          <Link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
          <Meta name="google-site-verification" content="nNuai59cmnHM4IG2H1QGB-jZ7IPDPFLM8fATxUGdNK8" />
        <ThemeProvider>
          <Nav />
          <Suspense fallback={<div class="news-list-nav">Loading..d...</div>}>{props.children}</Suspense>
        </ThemeProvider>
      </MetaProvider>
    )}>
      <FileRoutes />
      <Route path='/topics' component={TopicSearch}/>
      <Route path='/topics/:topic' component={TopicDetail}/>
      <Route path='/categories' component={Articles}/>
      <Route path='/:slug' component={BlogPost} preload={preloadPost} />
    </Router>
  );
}