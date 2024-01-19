"use client";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { BarChart3 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const MainNav = ({ categories }: { categories: category[] }) => {
  const [index, setindex] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <div className=" flex gap-[10px] relative">
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild className="max-lg:w-[56px] ">
            <Button>
              {" "}
              <BarChart3 className={`rotate-[270deg]`} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-3  flex flex-col items-start  ">
            <SheetHeader>
              <SheetTitle>Check Some Categories</SheetTitle>
              <SheetDescription>
                List Of Categories In The Store
              </SheetDescription>
            </SheetHeader>
            <Link href="/">
              <h2 className="font-bold text-3xl"> Store</h2>
            </Link>
            {categories.map((e, i) => (
              <div
                key={e.name}
                className="relative  font-semibold  flexcenter group py-1  overflow-x-hidden "
              >
                <Link href={`/categories/${e.id}`}> {e.name} </Link>
                <div
                  className={`absolute origin-left duration-75 group-hover:scale-x-100 bottom-0 left-0 scale-x-0 h-[4px] w-full
            bg-[#b7b7b772] z-20 ${
              pathname == `/categories/${e.id}` && "max-lg:!bg-cyan-400 !scale-100"
            }`}
                />
              </div>
            ))}
          </SheetContent>
        </Sheet>
      </div>

    
      <div className="flex max-lg:hidden">
        {categories.map((e, i) => (
          <div
            onClick={() => setindex(i)}
            key={e.name}
            className={`relative w-[80px] font-semibold  flexcenter group py-1  overflow-x-hidden  ${
              pathname == `/categories/${e.id}` && "dark:text-cyan-400 text-cyan-600 "
            }`}
          >
            <Link href={`/categories/${e.id}`}> {e.name} </Link>
            <div
              className={`absolute origin-left duration-75 group-hover:scale-x-100 bottom-0 left-0 scale-x-0 h-[4px] w-full
            bg-[#b7b7b772] z-20`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainNav;
