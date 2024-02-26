"use client";
import MainNav from "./MainNav";
import Link from "next/link";
import { getAllcategories } from "../actions";
import { ModeToggle } from "./ui/themeButton";
import ManageCart from "./ManageCart";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import CliComp from "@/providers/modalProvider";

import { useMediaQuery } from "usehooks-ts";
import UserHandler from "./UserHandler";
import Image from "next/image";

const NavBar = ({ userData }: { userData: UserFetched | null }) => {
  const matches: boolean = useMediaQuery("(min-width: 768px)") || false;
  const [categories, setCtagories] = useState(null);
  useEffect(() => {
    (async () => {
      const cates = await getAllcategories();
      setCtagories(cates);
    })();
  }, []);

  return (
    <>
      <div
        className="z-50 overflow-x- overflow-y-visible fixed
        h-[80px] shadow-2xl dark:bg-zinc-700 !bg-opacity-50
        bg-zinc-200
        hover:shadow-[#898989c3] transition-all    w-[94%]  mx-auto left-[3%] rounded-lg !top-[10px] p-4  sm:hidden
    backdrop-blur-md  "
      >
        <div className="flex w-full max-sm:hidden h-full justify-between items-center">
          {" "}
          <Link className="basis-1/3 " href="/">
            <h2 className="font-bold text-3xl"> Store</h2>
          </Link>{" "}
          <Link className="h-[45px] w-[45px] relative " href="/">
            <Image
              loading="eager"
              alt="logo"
              className=" object-contain"
              fill
              src={"/assets/logo.png"}
            />
          </Link>
        </div>
      </div>
      <div
        className="z-50 overflow-x- overflow-y-visible max-sm:bottom-0 !fixed
        h-[100px] shadow-2xl dark:bg-zinc-700 !bg-opacity-50
        bg-zinc-200
        hover:shadow-[#898989c3] transition-all w-full max-sm:shadow-inner   sm:w-[94%] left-0 mx-auto sm:left-[3%] rounded-lg sm:top-[10px] p-4 
    backdrop-blur-md  "
      >
        <div className="flex h-full  max-sm:!justify-center  justify-between items-center">
          <Link className="h-[50px] w-[50px] relative " href="/">
            <Image
              loading="eager"
              alt="logo"
              className=" object-contain"
              fill
              src={"/assets/logo.png"}
            />
          </Link>
          <div className="flex gap-[1.25rem]  max-sm:!justify-center  max-lg:flex-row-reverse max-lg:justify-start items-center w-full lg:justify-between">
            <div className="flexcenter  max-md:justify-end  max-md:w-[56px] gap-6 ">
              {!matches && (
                <MainNav categories={categories} userData={userData} />
              )}
            </div>
            <div className="flexcenter gap-3 md:min-w-[250px]">
              <CliComp>
                <ManageCart userData={userData} />
              </CliComp>
              <div className="md:min-w-[90px] max-md:hidden">
                {matches && <UserHandler userData={userData} />}
              </div>

              <Button className="max-md:hidden">
                <ModeToggle />
              </Button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default NavBar;
