"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

const ProductCarousel = ({ productImages }: { productImages: ImageType[] }) => {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);


  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="lg:basis-1/2 max-lg:mx-auto max-w-md  flex flex-col">
      <Carousel setApi={setApi} className="w-[80%] mx-auto">
        <CarouselContent className="h-[300px]">
          {productImages.map((el) => (
            <CarouselItem key={el.id}>
              <Image
                alt={el.createdAt}
                className="object-contain h-full rounded-xl !w-full "
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
      <div className="flex p-6 select-none cursor-pointer overflow-auto gap-6 max-w-2xl">
        {productImages.map((e, i) => (
          <Image
            key={i}
            className={`rounded-xl object-contain  transition-all
             select-none h-   () selection:!bg-none  border-4 ${
               current == i + 1 && "border-cyan-400"
             }`}
            alt=""
            onClick={() => api?.scrollTo(i)}
            height={40}
            width={100}
            src={e.url}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
