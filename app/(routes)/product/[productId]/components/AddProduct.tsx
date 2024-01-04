"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/store";
import { ShoppingBag } from "lucide-react";
import { useEffect } from "react";

const AddProduct = ({ product }: { product: product }) => {
  const { addProducts, products, deleteProduct ,setSideBarOpen } = useCart();
  const isInCart = products.find((e) => e.product.id === product.id);
useEffect(() =>setSideBarOpen(false),[])
  return (
    <div className="flex max-md:flex-wrap gap-6 !w-full">
      <Button
        onClick={() => {
          addProducts(product);
        }}
        className="flexcenter w-full p-6 gap-6 
          whitespace-nowrap rounded-2xl text-xl"
      >
        <ShoppingBag />
        Add to Cart
      </Button>
      {isInCart && (
        <Button
          onClick={() => {
            deleteProduct(product);
          }}
          variant={"destructive"}
          className="flexcenter w-full  p-6 gap-6 
          whitespace-nowrap rounded-2xl text-xl"
        >
          <ShoppingBag />
          Remove from Cart
        </Button>
      )}
    </div>
  );
};

export default AddProduct;
