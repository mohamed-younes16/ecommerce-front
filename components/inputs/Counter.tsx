"use client";

import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

import { Button } from "../ui/button";

const Counter = ({
  onChange,
  title,
  description,
  counter,
  icon,
  max,
}: {
  onChange: (v: number) => void;
  description: string;
  title: string;
  counter: number;
  icon: ReactNode;
  max: number;
}) => {
  useEffect(() => {
    onChange(counter);
  }, []);
  return (
    <div className="flex items-center justify-between">
      <div className="flexcenter gap-2">
        <div>{icon}</div>
        <div>
          <h3 className=" text-xl max-md:text-lg max-sm:text-base basis-2/3  font-bold">
            {title}{" "}
          </h3>
          <p className="text-muted-foreground  max-md:text-sm text-lg">
            {description}{" "}
          </p>
        </div>
      </div>
      <div className="flexcenter max-sm:gap-1 gap-3">
        <Button
          disabled={counter === 1}
          onClick={() => onChange(Math.max(counter - 1, 1))}
          variant={"outline"}
          className="rounded-full active:scale-95 
           hover:scale-105 transition-all w-12  max-sm:!h-6 !p-0 max-sm:!w-6 h-12"
        >
          <MinusCircleIcon />
        </Button>
        <p className="text-2xl max-md:text-xl max-sm:text-base  max-sm:w-7  w-10 text-center">
          {counter}{" "}
        </p>
        <Button
          disabled={counter === max}
          onClick={() => onChange(Math.min(counter + 1, max))}
          variant={"outline"}
          className="rounded-full active:scale-95 
           hover:scale-105 transition-all  w-12  max-sm:!h-6 !p-0 max-sm:!w-6 h-12"
        >
          <PlusCircleIcon />
        </Button>
      </div>
    </div>
  );
};

export default Counter;
