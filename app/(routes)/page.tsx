import Image from "next/image";
import { getAllProducts, getBillBoards } from "@/actions";
import Heading from "@/components/Heading";
import ProductsGrid from "@/components/ProductsGrid";
import Link from "next/link";
import BillBoard from "@/components/BillBoard";

export const metadata = {
  title: "E-commerce Store",
  description: "Storeapp",
};
export default async function Home() {
  const billBoards: billBoard[] = await getBillBoards();
  const filteredBillboards = billBoards.filter((e) => e.categories.length > 0);
  const targetbillBoard: billBoard =
    filteredBillboards[Math.floor(Math.random() * filteredBillboards.length)];
  const products = await getAllProducts({ isFeatured: true });

  return (
    <div className="min-h-screen">
      <BillBoard link={true} billboard={targetbillBoard} />
      <div className="min-h-screen max-w-7xl mx-auto  ">
        {" "}
        <Heading className="mt-6" description="all products" title="Products" />
        <ProductsGrid items={products} title="ProductsList" />
      </div>
    </div>
  );
}
