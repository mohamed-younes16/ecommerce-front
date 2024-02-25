"use client";

import CategorieBox from "./CategorieBox";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { categoriesList } from "./NavBar";

const Categories = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <Carousel
      opts={{ loop: true, duration: 10, dragFree: true }}
      className="max-w-[70dvw] mx-auto mt-7"
    >
      <CarouselContent className="">
        {categoriesList.map(({ description, icon, label }) => (
          <CarouselItem key={label} className="max-w-[100px]">
            <CategorieBox icon={icon} label={label} description={description} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ) : null;
};

export default Categories;
