import Image from "next/image";
import { getAllProducts, getBillBoards } from "@/actions";
import Heading from "@/components/Heading";
import ProductsGrid from "@/components/ProductsGrid";
import Link from "next/link";

export const metadata = {
  title: 'E-commerce Store',
  description: 'Storeapp',
 
}
export default async function Home() {
  const billBoards: billBoard[] = await getBillBoards();
  const filteredBillboards = billBoards.filter((e) => e.categories.length > 0);
  const targetbillBoard: billBoard =
    filteredBillboards[Math.floor(Math.random() * filteredBillboards.length)];
  const products = await getAllProducts({ isFeatured: true });

  return (
    <div className="min-h-screen">

      <div className=" max-md:h-[200px] !bg-opacity-40 dark:bg-zinc-600 bg-zinc-300 max-w-[95rem] overflow-hidden relative mx-auto rounded-xl h-[500px]">
        <Link
        style={{color:targetbillBoard.labelColor}}
          href={`/categories/${targetbillBoard.categories[0].id}`}
          className="absolute z-20  w-full hover:backdrop-blur-0 
        duration-500 transition-all backdrop-blur-sm h-full flexcenter  -translate-y-1/2  top-1/2 max-md:text-2xl font-bold text-5xl"
        >
       {targetbillBoard.label}
        
        </Link>
        <Image
          alt=""
          fill
          src={targetbillBoard.imageUrl}
          className=" z-10 object-cover"
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
