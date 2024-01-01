"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/store";
import { Button } from "./ui/button";
import { Loader2, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatedPrice } from "@/utils";
import { useEffect, useState } from "react";
import Heading from "./Heading";
import axios from "axios";
import { apiLink } from "@/app/layout";
import {  useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { toast } from "sonner";

const ManageCart = () => {
  const {
    products,
    deleteProduct,
    SideBarOpen,
    setSideBarOpen,
    delteAllProducts,
  } = useCart();
  const searchParams = useSearchParams();

  const [fetching, setIsFetching] = useState(false);
  const router = useRouter();

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    setIsFetching(false);
    if (success === "true") {
      toast.success("Success purchase ✅", {
        duration: 10000,
        dismissible: true,
      });

      setTimeout(() => {
        delteAllProducts();
        setSideBarOpen(false);
      }, 500);

      const current = qs.parse(searchParams.toString());
      let query = {
        ...current,
        success: null,
      };

      const url = qs.stringifyUrl(
        {
          url: window.location.href,
          query,
        },
        { skipNull: true }
      );

      router.push(url, { scroll: false });
    }
    if (canceled === "true") {
      toast.error("Canceled purchase");
    }
  }, [searchParams]);

  const total = () => {
    let tot = 0;
    products &&
      products.forEach((e) => {
        tot += Number(e.price);
      });
    return tot;
  };

  return (
    <div>
      <Sheet open={SideBarOpen}>
        <SheetTrigger onClick={() => setSideBarOpen(!SideBarOpen)}>
          <Button className="flexcenter gap-6 text-xl">
            <ShoppingBag /> {products.length}
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="  !max-w-none w-[100dvw] z-[9999] xl:w-[80dvw]"
        >
          <SheetClose
            className="absolute top-4 right-4 z-30 "
            onClick={() => setSideBarOpen(false)}
          >
            <Button>
              <X />
            </Button>
          </SheetClose>
          <div className="mt-16 space-y-8">
            <Heading description="mange your cart" title="Cart Items" />
            <div className="flex gap-6 max-lg:flex-wrap">
              {products.length > 0 ? (
                 <div className="max-h-[80dvh]   space-y-8 w-full lg:basis-2/3 overflow-scroll">
                {products.map((e) => (
                  <Card className="w-full relative flex">
                    <Button
                      className="absolute top-2 py-0 px-4 right-2 z-30 "
                      onClick={() => deleteProduct(e)}
                    >
                      <X className="max-md:h-4 z-30 max-md:w-4 md-h-6 md:h-6" />
                    </Button>
                    <div className="h-[200px] group basis-1/3 w-[150px] max-md:min-w-[100px] 
                      rounded-xl  relative">
                      <Image
                        alt={e.description}
                        className="object-contain rounded-xl "
                        src={e.images[0].url}
                        fill
                      />
                    </div>{" "}
                    <CardHeader className="basis-2/3">
                      <CardTitle>{e.name}</CardTitle>
                      <CardTitle className="!my-2">
                        {formatedPrice(e.price)}
                      </CardTitle>
                      <CardDescription className="text-xl font-semibold desc max-md:text-sm">
                        {e.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              ):<p className=" text-2xl ">No Items Yet</p>}
             
              <div className="space-y-6 max-lg:space-y-2 max-lg:fixed max-lg:left-0 p-6 z-40 max-lg:bottom-0 max-lg:bg-background text-2xl font-bold max-lg:w-full  lg:basis-1/3">
                <h3>Order Sammuary</h3>
                <div className="flex items-center justify-between ">
                  Order Total Price <p>{formatedPrice(total() || 0)}</p>
                </div>
                <Button
                  disabled={fetching}
                  onClick={async () => {
                    setIsFetching(true);
                    const res = await axios.post(`${apiLink}/checkout`, {
                      productIds: products.map((e) => e.id),
                    });
                    window.location = res.data.url;
                  }}
                  className="!w-full  mx-auto max-lg:max-w-md  max-lg:text-lg max-lg:py-2  py-6 relative flexcenter   gap-4 text-2xl rounded-3xl "
                >
                  <Loader2
                    className={`animate-spin  transition-all left-[70px] !h-[20px] absolute  w-0  ${
                      fetching && "!w-[20px] "
                    } `}
                  />
                  Checkout
                </Button>
                {products.length > 0 && (
                  <Button
                    variant={"destructive"}
                    disabled={fetching}
                    onClick={() => {
                      delteAllProducts();
                    }}
                    className="!w-full mx-auto max-lg:max-w-md py-6 relative flexcenter max-lg:text-lg max-lg:py-2    gap-4 text-2xl rounded-3xl "
                  >
                    Delete All products
                  </Button>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ManageCart;
