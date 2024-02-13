import { getProduct } from "@/actions";
import ProductCarousel from "@/components/ProductCarousel";

import { formatedPrice } from "@/utils";

import React from "react";
import AddProduct from "./components/AddProduct";

export const metadata = {
  title: 'E-commerce Store',
  description: 'Storeapp',
 
}
const page = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const product: product = await getProduct(productId);

  return (
    <div className=" my-16">
      <div className="flex gap-10 max-lg:flex-wrap  max-lg:justify-center">
        <ProductCarousel productImages={product.images} />
        <div className=" space-y-7 max-w-lg">
          <h2 className="text-4xl font-bold">{product.name} </h2>
          <p className="text-xl text-foreground">{product.description} </p>
          <div className="flex text-xl items-center gap-4">
            Color{" "}
            <div className="rounded-full h-4 w-4" style={{ backgroundColor:product.color.value }}></div>
          </div>
          <h2 className="text-2xl font-bold">
            {formatedPrice(product.price)}{" "}
          </h2>
        <AddProduct product={product}/>
        </div>
      </div>
    </div>
  );
};

export default page;
