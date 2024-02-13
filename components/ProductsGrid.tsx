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
import { motion as m } from "framer-motion";
import CliComp from "@/providers/modalProvider";

const ProductsGrid = ({ items }: { items: product[] }) => {
  const { addProducts } = useCart();
  return (
    <div className=" w-full">
      <div className=" grid max-md:w-fit max-md:mx-auto mt-6 gap-6 grid-cols-[repeat(auto-fill_,_minmax(350px_,1fr))] ">
        {items.map((e, i) => (
          <m.div
            key={e.id}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            initial={{ opacity: 0, y: 50 }}
          >
            <Card className="w-[350px] overflow-hidden">
              <CardContent className="h-[250px] group !p-6 rounded-xl overflow-hidden relative">
                <div
                  className="absolute backdrop-blur-sm 0 transition-all 
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
                              <CarouselItem
                                className="h-full  flexcenter  max-md:w-[80%] max-md:min-h-[45dvh] min-h-[70dvh]"
                                key={el.id}
                              >
                                <Image
                                  alt={e.id}
                                  className="object-contain  rounded-xl  h-full w-full "
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
                  <div
                    onClick={() => {
                      addProducts(e);
                    }}
                    className="flexcenter delay-300 duration-500 transition-all "
                  >
                    {" "}
                    <ShoppingCartIcon className="bg-white active:scale-90  hover:scale-125 transition-all rounded-full text-black p-2 h-10 w-10" />
                  </div>
                </div>
                <Image
                  alt={e.id}
                  className="object-contain rounded-xl !w-full !h-full"
                  src={e.images[0].url}
                  height={50}
                  width={100}
                />
              </CardContent>
              <CliComp>
                <Link href={`/product/${e.id}`}>
                  {" "}
                  <CardHeader>
                    <CardTitle>
                      <m.div
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.3 + 0.3,
                          duration: 0.6,
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        initial={{ opacity: 0, x: 100 }}
                      >
                        {" "}
                        {e.name}
                      </m.div>
                    </CardTitle>
                    <CardTitle className="!my-2">
                      <m.div
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.3 + 0.3,
                          duration: 0.6,
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        initial={{ opacity: 0, x: -100 }}
                      >
                        {formatedPrice(e.price)}{" "}
                      </m.div>
                    </CardTitle>
                    <CardDescription>
                      <m.span
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.3 + 0.3,
                          duration: 0.6,
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        initial={{ opacity: 0, x: 100 }}
                        className="desc"
                      >
                        {e.description}
                      </m.span>
                    </CardDescription>
                  </CardHeader>
                </Link>
              </CliComp>

              <CardFooter className="flex justify-between">
                <Link href={`/product/${e.id}`}>
                  {" "}
                  <Button>Check it Out</Button>
                </Link>
              </CardFooter>
            </Card>
          </m.div>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
