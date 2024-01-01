"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/hooks/store";
import ModalProvider from "@/providers/modalProvider";
import { formatedPrice } from "@/utils";
import { Expand, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductsGrid = ({
  title,
  items,
}: {
  items: product[];
  title: string;
}) => {
  const {addProducts} = useCart()
  return (
    <div>
      <h2 className=" font-bold text-3xl my-6 ">{title} </h2>
      <div className=" grid grid-cols-1 gap-6   md:grid-cols-2 lg:grid-cols-3 ">
        {items.map((e) => (
          <Card className="w-[350px]">
            <CardContent className="h-[250px] group !p-6 rounded-xl overflow-hidden relative">
              <div
                className="absolute backdrop-blur-md 0 transition-all 
            duration-500
            opacity-0 h-full overflow-hidden gap-6 w-full top-0 flex items-end pb-7 justify-center left-0 rounded-xl group-hover:opacity-100"
              >
                <ModalProvider>
                  <Dialog>
                    <DialogTrigger>
                      {" "}
                      <div className="flexcenter delay-300 duration-500 transition-all ">
                        {" "}
                        <Expand className="bg-white active:scale-90 hover:rotate-180 hover:scale-125 transition-all rounded-full text-black p-2 h-10 w-10" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className=" max-md:w-[100dvw] p-6  md:w-[80dvw]   max-w-4xl">
                      <Carousel className="w-[90%] mx-auto">
                        <CarouselContent>
                          {e.images.map((el) => (
                            <CarouselItem key={el.id}>
                              <Image
                                alt={e.description}
                                className="object-cover max-h-[450px] rounded-xl !w-full "
                                src={el.url}
                                height={50}
                                width={100}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </DialogContent>
                  </Dialog>
                </ModalProvider>
                <div onClick={()=>{addProducts(e)}} className="flexcenter delay-300 duration-500 transition-all ">
                  {" "}
                  <ShoppingCartIcon className="bg-white active:scale-90  hover:scale-125 transition-all rounded-full text-black p-2 h-10 w-10" />
                </div>
              </div>
              <Image
                alt={e.description}
                className="object-cover rounded-xl !w-full !h-full"
                src={e.images[0].url}
                height={50}
                width={100}
              />
            </CardContent>{" "}
            <CardHeader>
              <CardTitle>{e.name}</CardTitle>
              <CardTitle className="!my-2">{formatedPrice(e.price)}</CardTitle>
              <CardDescription>{e.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Link href={`/product/${e.id}`}>
                {" "}
                <Button>Check it Out</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
