import { useRoutes } from "react-router";
import Episode from "../pages/Episode";
import Home from "../pages/Home";
import Podcast from "../pages/PodCast";

export default function Router() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/podcast/:podcastId", element: <Podcast /> },
    { path: '/podcast/:podcastId/episode/:episodeId', element: <Episode /> }
  ])
}