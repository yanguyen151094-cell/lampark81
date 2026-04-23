import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import SearchPage from "../pages/search/page";
import GalleryPage from "../pages/gallery/page";
import ReviewsPage from "../pages/reviews/page";
import AdminPage from "../pages/admin/page";
import ChatReelsPage from "../pages/chat/page";
import BlogPage from "../pages/blog/page";
import BlogDetailPage from "../pages/blog/detail/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/gallery",
    element: <GalleryPage />,
  },
  {
    path: "/reviews",
    element: <ReviewsPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/chat",
    element: <ChatReelsPage />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/blog/:slug",
    element: <BlogDetailPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
