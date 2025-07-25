import { Metadata } from "next";
import ProductsPage from "./ProductsPage";

export const metadata: Metadata = {
  title: "Products",
};

const page = () => {
  return <ProductsPage />;
};

export default page;
