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
import React, { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import UserHandler from "./UserHandler";
import { useCart } from "@/hooks/store";
import Image from "next/image";

const MainNav = ({
  categories,
  userData,
}: {
  categories?: category[] | null;
  userData: UserFetched | null;
}) => {
  const { isSheetOpen, setIsSheetOpen } = useCart();
  const pathname = usePathname();
  useEffect(() => setIsSheetOpen(false), [pathname]);

  return (
    <div className=" flex gap-[10px] relative">
      <div className="lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="max-lg:w-[56px] ">
            <Button>
              {" "}
              <BarChart3 className={`rotate-[270deg]`} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-3 justify-between   flex flex-col items-start  ">
            <Link className="h-[45px] w-[45px] relative " href="/">
              <Image
                loading="eager"
                alt="logo"
                className=" object-contain"
                fill
                src={"/assets/logo.png"}
              />
            </Link>
            <div className=" flex-1 w-full">
              <SheetHeader className="mb-4">
                <SheetTitle>Check Some Categories</SheetTitle>
                <SheetDescription>
                  List Of Categories In The Store
                </SheetDescription>
              </SheetHeader>

              {categories?.map((e, i) => (
                <>
                  <div
                    key={e.name}
                    className={`relative  ${
                      pathname == `/categories/${e.id}` &&
                      "max-lg:!text-cyan-400 "
                    } font-semibold   group py-1  overflow-x-hidden `}
                  >
                    <Link href={`/categories/${e.id}`}> {e.name} </Link>
                    {/* <div
                    className={`absolute origin-left duration-75 group-hover:scale-x-100 bottom-0 left-0 scale-x-0 h-[4px] w-full
            bg-[#b7b7b772] z-20 ${
              pathname == `/categories/${e.id}` &&
              "max-lg:!bg-cyan-400 !scale-100"
            }`}
                  /> */}
                  </div>
                  <Separator className="my-2 w-full" />
                </>
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
