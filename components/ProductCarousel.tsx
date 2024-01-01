"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

const ProductCarousel = ({ productImages }: { productImages: ImageType[] }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    console.log();
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="lg:basis-1/2  flex flex-col">
      <Carousel setApi={setApi} className="w-[80%] mx-auto">
        <CarouselContent className="h-[250px]">
          {productImages.map((el) => (
            <CarouselItem key={el.id}>
              <Image
                alt={el.createdAt}
                className="object-cover h-full rounded-xl !w-full "
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
            className={`rounded-xl  transition-all
             select-none selection:!bg-none  border-4 ${
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
