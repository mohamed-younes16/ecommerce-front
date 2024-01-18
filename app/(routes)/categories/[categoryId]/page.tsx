import { getAllColors, getAllSizes, getCategory } from "@/actions";
import Filter from "@/components/Filter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProductsGrid from "@/components/ProductsGrid";
import React from "react";
import { Button } from "@/components/ui/button";

import { PlusCircle, SearchX, ShoppingBag } from "lucide-react";

import BillBoard from "@/components/BillBoard";
import Heading from "@/components/Heading";
interface Query {
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

export const metadata = {
  title: "E-commerce Store",
  description: "Storeapp",
};
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
    <div className=" space-y-8 mb-8">
      <BillBoard link={false} billboard={category.billboard} />

      <div className="flex flex-col items-center justify-center gap-10">
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
        {category.products.length > 0 && (
          <>
            <Heading
              title={"all prodcuts of this category"}
              icon={<ShoppingBag />}
              color="#96e072"
              description="check listed products"
            />
            <ProductsGrid items={category.products} />
          </>
        )}
      </div>
      {category.products.length === 0 && (
        <div className="flexcenter gap-8 text-foreground text-4xl my-14">
          No Result Found <SearchX className={`h-12 w-12`} />
        </div>
      )}
    </div>
  );
};

export default page;
