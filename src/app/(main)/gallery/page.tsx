import { Metadata } from "next";
import GalleryPage from "./GalleryPage";

export const metadata: Metadata = {
  title: "Gallery",
};

const page = () => {
  return <GalleryPage />;
};

export default page;
