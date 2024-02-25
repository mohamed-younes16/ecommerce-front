"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
const ImageContainer = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) => {
  const [isLoaded, setIsloaded] = useState(false);
  return (
    <div className=" w-full relative h-full">
      {!isLoaded && (
        <div
          className={`absolute  animate-pulse inset-0  transition-all bg-accent-foreground/40 ${
            isLoaded && "opacity-0"
          } `}
        />
      )}

      <Image
        onLoad={() => setIsloaded(true)}
        height={100}
        width={100}
        className={cn(
          `object-cover transition-all  duration-1000 h-full w-full ${
            !isLoaded && "opacity-0"
          }`,
          className
        )}
        src={src}
        alt={alt || ""}
      />
    </div>
  );
};

export default ImageContainer;
