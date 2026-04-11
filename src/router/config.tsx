import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import PropertiesPage from "../pages/properties/page";
import PropertyDetailPage from "../pages/properties-detail/page";
import RoomsPage from "../pages/rooms/page";
import GalleryPage from "../pages/gallery/page";
import AboutPage from "../pages/about/page";
import ContactPage from "../pages/contact/page";
import BlogPage from "../pages/blog/page";
import BlogDetailPage from "../pages/blog/detail/page";
import AdminLoginPage from "../pages/admin/login/page";
import AdminDashboard from "../pages/admin/dashboard/page";
import AdminHotelsPage from "../pages/admin/hotels/page";
import AdminRoomsPage from "../pages/admin/rooms/page";
import AdminGalleryPage from "../pages/admin/gallery/page";
import AdminSettingsPage from "../pages/admin/settings/page";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/properties", element: <PropertiesPage /> },
  { path: "/properties/:id", element: <PropertyDetailPage /> },
  { path: "/rooms", element: <RoomsPage /> },
  { path: "/gallery", element: <GalleryPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/blog", element: <BlogPage /> },
  { path: "/blog/:slug", element: <BlogDetailPage /> },
  { path: "/admin", element: <AdminLoginPage /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/hotels", element: <AdminHotelsPage /> },
  { path: "/admin/rooms", element: <AdminRoomsPage /> },
  { path: "/admin/gallery", element: <AdminGalleryPage /> },
  { path: "/admin/settings", element: <AdminSettingsPage /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
