"use client";
import MainNav from "./MainNav";
import Link from "next/link";
import { getAllcategories } from "../actions";
import { ModeToggle } from "./ui/themeButton";
import ManageCart from "./ManageCart";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [categories, setCtagories] = useState(null);
  useEffect(() => {
    (async () => {
      const cates = await getAllcategories();
      setCtagories(cates);
    })();
  }, []);

  return (
    <div
      className="z-50 overflow-auto !fixed
        h-[100px] shadow-2xl dark:bg-zinc-700 !bg-opacity-50
        bg-zinc-200
        hover:shadow-[#898989c3] transition-all   w-[94%] mx-auto left-[3%] rounded-lg top-[10px] p-4 
    backdrop-blur-md  "
    >
      <div className="flex h-full justify-between items-center">
        <Link href="/">
          <h2 className="font-bold text-3xl"> Store</h2>
        </Link>
        <div className="flex items-center gap-6 ">
          {categories && <MainNav categories={categories} />}
        </div>{" "}
        <div className="flexcenter gap-4 min-w-[150px]">
          <ManageCart />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
