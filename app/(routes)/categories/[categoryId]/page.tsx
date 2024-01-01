import { getAllColors, getAllSizes, getCategory } from "@/actions";
import Filter from "@/components/Filter";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ProductsGrid from "@/components/ProductsGrid";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { PlusCircle } from "lucide-react";
interface Query {
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}
const page = async ({
  params: { categoryId },
  searchParams,
}: {
  params: { categoryId: string };
  searchParams: Query;
}) => {
  const { colorId, sizeId, isFeatured } = searchParams;
  const category: category = await getCategory({
    categoryId,
    colorId,
    sizeId,
    isFeatured,
  });
  const colors = await getAllColors();
  const sizes = await getAllSizes();

  return (
    <div className=" space-y-8">
      <div className=" max-md:h-[200px] max-w-7xl overflow-hidden relative mx-auto rounded-xl h-[500px]">
        <div className="absolute z-10 w-full hover:backdrop-opacity-0 duration-500 transition-all backdrop-blur-md h-full flexcenter text-white -translate-y-1/2  top-1/2 max-md:text-2xl font-bold text-5xl">
          {category.billboard.label}{" "}
        </div>
        <Image
          alt=""
          fill
          src={category.billboard.imageUrl}
          className=" object-cover"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        <div className=" hidden xl:flex gap-6">
          <Filter data={colors} name="colors" valueKey="colorId" />
          <Filter data={sizes} name="sizes" valueKey="sizeId" />
        </div>
        <Sheet>
          <SheetTrigger asChild className="max-xl:flex hidden">
            <Button className="font-bold  text-2xl flexcenter gap-4 ">
              <PlusCircle />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            {" "}
            <Filter data={colors} name="colors" valueKey="colorId" />
            <Filter data={sizes} name="sizes" valueKey="sizeId" />
          </SheetContent>
        </Sheet>
        <ProductsGrid
          items={category.products}
          title="all prodcuts odf this category"
        />
      </div>
    </div>
  );
};

export default page;
