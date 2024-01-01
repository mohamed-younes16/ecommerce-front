import Image from "next/image";
import { getAllProducts, getBillBoards } from "@/actions";
import Heading from "@/components/Heading";
import ProductsGrid from "@/components/ProductsGrid";

export const revalidate = 3600;

export default async function Home() {
  const billBoards: billBoard[] = await getBillBoards();

  const targetbillBoard: billBoard =
    billBoards[Math.floor(Math.random() * billBoards.length)];
  const products = await getAllProducts({ isFeatured: true });
  return (
    <div className="min-h-screen">
      <div className=" max-md:h-[200px] max-w-[95rem] overflow-hidden relative mx-auto rounded-xl h-[500px]">
        <div className="absolute z-10 w-full hover:backdrop-opacity-0 duration-500 transition-all backdrop-blur-md h-full flexcenter text-white -translate-y-1/2  top-1/2 max-md:text-2xl font-bold text-5xl">
          {targetbillBoard.label}{" "}
        </div>
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
