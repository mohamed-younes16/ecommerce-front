import Image from "next/image";
import { getAllProducts, getAllcategories, getBillBoards } from "@/actions";
import Heading from "@/components/Heading";
import ProductsGrid from "@/components/ProductsGrid";
import BillBoard from "@/components/BillBoard";
import { ShoppingCart } from "lucide-react";
import CatgoriesCarousel from "@/components/CatgoriesCarousel";
export const metadata = {
  title: "E-commerce Store",
  description: "Storeapp",
};
export default async function Home() {
  const billBoards: billBoard[] = await getBillBoards();
  const categories = await getAllcategories();
  const filteredBillboards = billBoards.filter((e) => e.categories.length > 0);
  const targetbillBoard: billBoard =
    filteredBillboards[Math.floor(Math.random() * filteredBillboards.length)];
  const products = await getAllProducts({ isFeatured: true });
  return (
    <div className="min-h-screen">
      {targetbillBoard && <BillBoard link={true} billboard={targetbillBoard} />}

      {categories && <CatgoriesCarousel categories={categories} />}
      <div className="min-h-screen max-w-7xl mx-auto  ">
        <Heading
          icon={<ShoppingCart />}
          color="#8c71db"
          className="mt-6"
          description="all products"
          title="Products"
        />
        {products && <ProductsGrid items={products} />}
      </div>
    </div>
  );
}
