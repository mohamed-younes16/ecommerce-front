import Image from "next/image";
import Search from "./Search";
import Categories from "./Categories";
import Link from "next/link";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { continentsType } from "@/index";
import getCurrentUser from "@/actions/getCurrentUser";
import { Suspense } from "react";
export const categoriesList = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];
export const regions: continentsType[] = [
  {
    continent: "World",
    image: "/world.svg",
  },
  {
    continent: "America",
    image: "/america.svg",
  },
  {
    continent: "Oceania",
    image: "/oceania.svg",
  },
  {
    continent: "Europe",
    image: "/europe.svg",
  },
  {
    continent: "Africa",
    image: "/africa.svg",
  },
  {
    continent: "Asia",
    image: "/asia.svg",
  },
];
const NavBar = async () => {
  const currentUserData = await getCurrentUser();

  return (
    <>
      <div
        className=" pt-2   sticky 
        transition-all w-full left-0    z-20  rounded-b-md top-0 mb-6 dark:bg-zinc-800 bg-white px-4 
    "
      >
        <div className="h-full">
          <div className="flex justify-between max-sm:justify-center items-center">
            <Link href={"/"} className="flex lg:flex-1 items-center gap-6 ">
              <Image
                alt=""
                height={30}
                className="w-[120px]  bg-cover  max-lg:hidden "
                width={100}
                src={"/assets/logo.png"}
              />
              <Image
                alt=""
                height={30}
                className="min-w-[40px] h-[40px] bg-cover lg:hidden"
                width={100}
                src={"/assets/icon.svg"}
              />
            </Link>
            <Suspense>
                <Search continents={regions} userData={currentUserData!} />
            </Suspense>
          
          </div>
          <div className="min-h-[50px]">
            {" "}
            <Categories />{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
