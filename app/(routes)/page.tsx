import Image from "next/image";
import { getAllProducts, getBillBoards } from "@/actions";
import Heading from "@/components/Heading";
import ProductsGrid from "@/components/ProductsGrid";
import Link from "next/link";

export const revalidate = 3600;

export default async function Home() {
  const billBoards: billBoard[] = await getBillBoards();
 const filteredBillboards = billBoards.filter(e=>e.categories.length > 0)
  const targetbillBoard: billBoard =
  filteredBillboards[Math.floor(Math.random() * filteredBillboards.length)];
  const products = await getAllProducts({ isFeatured: true });
  return (
    <div className="min-h-screen">
      <div className=" max-md:h-[200px] max-w-[95rem] overflow-hidden relative mx-auto rounded-xl h-[500px]">
        <Link href={`/categories/${targetbillBoard.categories[0].id}`} className="absolute z-10 w-full hover:backdrop-blur-0 
        duration-500 transition-all backdrop-blur-sm h-full flexcenter text-white -translate-y-1/2  top-1/2 max-md:text-2xl font-bold text-5xl">
          {targetbillBoard.label}{" "}

        </Link>
        <Image
          alt=""
          fill
          src={targetbillBoard.imageUrl}
          className=" object-cover"
        />
      </div>
      <div className="min-h-screen max-w-7xl mx-auto  ">
        {" "}
        <Heading className="mt-6" description="all products" title="Products" />
        <ProductsGrid items={products} title="ProductsList" />
      </div>
    </div>
  );
}
