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
import { Separator } from "./ui/separator";
import UserHandler from "./UserHandler";

const MainNav = ({
  categories,
  userData,
}: {
  categories?: category[] | null;
  userData: UserFetched | null;
}) => {
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
          <SheetContent className="p-3 justify-between   flex flex-col items-start  ">
            <Link href="/">
              <h2 className="font-bold text-3xl mb-3"> Store</h2>
            </Link>
            <div className=" flex-1">
              <SheetHeader className="mb-4">
                <SheetTitle>Check Some Categories</SheetTitle>
                <SheetDescription>
                  List Of Categories In The Store
                </SheetDescription>
              </SheetHeader>

              {categories?.map((e, i) => (
                <div
                  key={e.name}
                  className="relative  font-semibold  flexcenter group py-1  overflow-x-hidden "
                >
                  <Link href={`/categories/${e.id}`}> {e.name} </Link>
                  <div
                    className={`absolute origin-left duration-75 group-hover:scale-x-100 bottom-0 left-0 scale-x-0 h-[4px] w-full
            bg-[#b7b7b772] z-20 ${
              pathname == `/categories/${e.id}` &&
              "max-lg:!bg-cyan-400 !scale-100"
            }`}
                  />
                </div>
              ))}
            </div>

            <Separator />
            <UserHandler userData={userData} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex max-lg:!hidden">
        {categories?.map((e, i) => (
          <div
            key={e.name}
            className={`relative w-[80px] font-semibold  flexcenter group py-1  overflow-x-hidden  ${
              pathname == `/categories/${e.id}` &&
              "dark:text-cyan-400 text-cyan-600 "
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
