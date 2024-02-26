"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardTitle } from "./ui/card";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import { EmblaOptionsType } from "embla-carousel";
const CatgoriesCarousel = ({ categories }: { categories: category[] }) => {
  const plugin = useRef(Autoplay({ delay: 2000 }));
  const OPTIONS: EmblaOptionsType = {
    loop: true,
    skipSnaps: true,
    duration: 20,
  };
  return (
    <Carousel
      opts={OPTIONS}
      plugins={[plugin.current]}
      className="w-fit max-w-[65dvw] mx-auto   max-h-[150px] my-12"
    >
      <CarouselContent>
        {categories
          .concat(categories)

          .map((e, index) => (
            <CarouselItem
              key={index}
              className="  max-w-[110px] max-md:pl-1 max-md:max-w-[80px] md:min-w-[110px]   "
            >
              <Link href={`/categories/${e.id}`}>
                <Card className=" h-[110px] flexcenter  max-md:max-w-[80px] flex-col gap-2 p-2  relative">
                  <Image
                    height={50}
                    width={50}
                    className="object-contain"
                    src={e.logo}
                    alt={`${e.name} logo`}
                  />
                  <CardTitle className="text-sm">{e.name} </CardTitle>
                </Card>
              </Link>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CatgoriesCarousel;
