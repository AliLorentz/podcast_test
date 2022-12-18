import { useRoutes } from "react-router";
import Home from "../pages/Home";

export default function Router() {
  return useRoutes([
    { path: "/", element: <Home /> },
  ])
}