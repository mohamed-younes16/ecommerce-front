"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Image as ImagePlaceholder,
  ImagePlusIcon,
  Loader2,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import Image from "next/image";
const ImagesInput = ({
  images,
  onChange,
}: {
  images: string[];
  onChange: (v: string[]) => void;
}) => {
  const [start, setstart] = useState(0);
  const [begain, setBegain] = useState(false);
  return (
    <div>
      {images.length > 0 ? (
        <Carousel
          opts={{ startIndex: start }}
          className="w-full  rounded-lg
               md:max-w-2xl  max-md:max-w-lg mx-auto"
        >
          <CarouselContent className=" h-full rounded-lg">
            {images.map((image) => (
              <CarouselItem key={image}>
                <div
                  className="flex 
                           h-full hover:opacity-70 transition-all   max-md:h-[30dvh] rounded-lg md:h-[45dvh] relative  items-center justify-center p-6"
                >
                  <>
                    <Trash2
                      onClick={() => {
                        const filtered = images.filter((e) => e !== image);
                        onChange(filtered);
                      }}
                      className="absolute cursor-pointer transition-all  
                      hover:scale-105 active:scale-95 bg-red-500 top-1 right-1
                      rounded-md  p-2 h-10 w-10 text-white z-50"
                    />
                    <Image
                      src={image}
                      className="object-contain rounded-lg"
                      alt="image of you"
                      fill
                    />
                  </>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <ImagePlaceholder
          className="h-[30dvh] flexcenter w-full text-black opacity-60  "
          strokeWidth={1}
        />
      )}

      <div className="flex w-fit mx-auto mt-6">
        <UploadButton
          content={{
            button: (
              <div className="flexcenter whitespace-nowrap text-foreground gap-6">
                {!begain ? (
                  <>
                    <ImagePlusIcon className="" />
                    <p>Upload An Image</p>
                  </>
                ) : (
                  <Loader2 className="relative z-50 animate-spin" />
                )}
              </div>
            ),
          }}
          endpoint="imageUploader"
          className="items-start"
          appearance={{
            button: `bg-border w-52 p-2  text-primary-foreground `,
          }}
          onUploadBegin={() => setBegain(true)}
          onClientUploadComplete={(e) => {
            setBegain(false);
            const newImages = images.concat(e?.[0].url!);
            onChange(newImages);
            setstart(newImages.length - 1);
          }}
        />
      </div>
    </div>
  );
};

export default ImagesInput;
