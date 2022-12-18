import { useRoutes } from "react-router";
import Home from "../pages/Home";
import Podcast from "../pages/PodCast";

export default function Router() {
  return useRoutes([
    { path: "/", element: <Home /> },
    {path:"/podcast/:podcastId", element:<Podcast/>}
  ])
}