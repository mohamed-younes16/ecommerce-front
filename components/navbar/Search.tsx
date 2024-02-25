"use client";
import {
  Album,
  Bath,
  Crown,
  LucideLogOut,
  Menu,
  PlaneTakeoff,
  SearchIcon,
  User as UserIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "../ui/themeButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MenuItem from "./MenuItem";
import Link from "next/link";
import Image from "next/image";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import RentModal from "../modals/RentModal";
import { useStore } from "@/hooks/store";
import CliComponent from "../CliComponent";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "../ui/separator";
import { FaAirbnb, FaPersonCircleQuestion } from "react-icons/fa6";
import Counter from "../inputs/Counter";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { FetchedUser, continentsType } from "@/index";
import ImageContainer from "../ImageContainer";
import Heading from "../Heading";
import SignOutButton from "../inputs/SignOutButton";

export const NavigationMenuDemo = ({
  continents,
}: {
  continents: continentsType[];
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const currentGuests = +(params?.get("guests") || "1") || 1;
  const currentBaths = +(params?.get("baths") || "1") || 1;
  const currentContinent = params?.get("continent") || "";
  const [value, setValue] = useState("");
  const [guestsCount, setGuests] = useState(currentGuests || 1);
  const [bathsCount, setBaths] = useState(currentBaths || 1);
  const [continent, setContinent] = useState(currentContinent || "");
  const onSearch = () => {
    const query = queryString.parse(params.toString());
    const newquery: any = {
      ...query,
      guests: guestsCount || 1,
      baths: bathsCount || 1,
      continent: continent || null,
    };

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: newquery,
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <NavigationMenu
      className=" "
      value={value}
      onValueChange={(e) => e.length > 0 && setValue(e)}
    >
      <NavigationMenuList
        className="flexcenter max-lg:text-sm w-fit whitespace-nowrap 
          px-4 border-foreground/20 font-semibold border py-2 max-sm:py-1 shadow-md
           transition-all hover:shadow-md cursor-pointer  rounded-full"
      >
        <NavigationMenuItem value="st" onClick={() => setValue("st")}>
          <NavigationMenuTrigger className="!p-0 ">
            {" "}
            <div className=" transition-all hover:text-main ">Add guests</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent
            className="md:p-6 p-2"
            onPointerDownOutside={(e) =>
              e.type == "dismissableLayer.pointerDownOutside" && setValue("")
            }
          >
            <ul className=" py-8 px-6 rounded-3xl gap-6 flex flex-col max-sm:!pt-0 w-[70dvw] max-md:w-[60dvw] max-sm:w-[80dvw]  md:max-w-xl ">
              <Heading
                title="Guests and baths count"
                description="find the best place that fits you"
              />

              <Counter
                counter={guestsCount}
                title="Guests count"
                description="how many guests can the place  handle ?"
                icon={<FaPersonCircleQuestion size={25} />}
                max={30}
                onChange={(v) => setGuests(v)}
              />
              <Counter
                counter={bathsCount}
                title="Baths count"
                description="how many baths you want in your place ?"
                icon={<Bath size={25} />}
                max={30}
                onChange={(v) => setBaths(v)}
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="nd" onClick={() => setValue("nd")}>
          <NavigationMenuTrigger className="!p-0">
            {" "}
            <div className=" mx-3 transition-all hover:text-main ">
              Anywhere
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent
            className="md:p-6 p-2"
            onPointerDownOutside={(e) =>
              e.type == "dismissableLayer.pointerDownOutside" && setValue("")
            }
          >
            <Heading
              title="Search by region"
              description="find the best place that fits you"
            />
            <Separator className="my-4" />
            <ul
              className={`flex max-md:justify-center max-sm:!pt-0 w-[70dvw] max-md:w-[60dvw] max-sm:w-[80dvw]  md:max-w-xl
          flex-wrap gap-3 p-6 `}
            >
              {continents.map((e) => (
                <div
                  key={e.image}
                  className={`max-md:!min-w-[120px] max-md:!max-w-[120px]
                     md:min-w-[150px] md:max-w-[150px] h-[8rem]  group
            p-2 cursor-pointer transition-all gap-3  `}
                >
                  <div
                    onClick={() =>
                      setContinent(e.continent.toLocaleLowerCase())
                    }
                    className={`
                    rounded-xl   transition-all 
                  ${
                    continent.toLocaleLowerCase() ===
                      e.continent.toLocaleLowerCase() && "border-foreground"
                  }  group-hover:scale-105 mb-2  group-active:scale-95
                  group-hover:border-foreground border-2 
                  h-[90%]
                  `}
                  >
                    <ImageContainer
                      className={"object-contain"}
                      src={`/assets${e.image}`}
                    />
                  </div>

                  <p className="text-xl max-md:text-base capitalize">
                    {e.continent}
                  </p>
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <div
          onClick={() => onSearch()}
          className={`rounded-full p-2  overflow-hidden  
          transition-all flexcenter text-sm
           text-white hover:scale-105 active:scale-95
            ml-6 flexcenter bg-main
           ${value && "gap-1 max-sm:px-1"}`}
        >
          <SearchIcon
            strokeWidth={3}
            className="h-6 max-sm:w-4 max-sm:h-4 w-6"
          />
          {
            <p
              className={` transition-all overflow-hidden ${
                value ? "w-[60px] " : " w-0 h-0 "
              }`}
            >
              Search
            </p>
          }
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const Search = ({
  userData,
  continents,
}: {
  userData?: FetchedUser;
  continents: continentsType[];
}) => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState<"login" | "register" | "">(
    searchParams.get("redirected") === "true" ? "login" : ""
  );
  const [popopen, setpopopen] = useState(false);
  const { setisRentModalOpen, setisLoginModalOpen } = useStore();

  useEffect(() => {
    const redirected = searchParams.get("redirected") === "true";
    setisRentModalOpen(false);
    setpopopen(redirected && userData === null);
  }, [searchParams]);

  return (
    <>
      <div className="flexcenter lg:flex-1   gap-6">
        <div className="w-full flex items-center justify-center">
          <NavigationMenuDemo continents={continents} />
        </div>
      </div>
      <div className="flexcenter lg:flex-1 gap-4 md:min-w-[180px]">
        <div className="md:flex-1">
          <CliComponent>
            <RentModal />
          </CliComponent>
        </div>

        <div className="max-md:hidden">
          {" "}
          <ModeToggle />
        </div>
        <div
          className=" max-sm:fixed backdrop-blur-sm  max-sm:bg-background/20 
          max-sm:shadow-[inset_0px_3px_6px_0px_hsl(var(--foreground)_/_0.2)]
           bottom-0 flexcenter
          
             max-sm:py-2 left-0 max-sm:w-full"
        >
          <Popover
            open={popopen}
            onOpenChange={(e) => {
              e && setpopopen(true);
              !e && setpopopen(false);
            }}
          >
            <PopoverTrigger>
              <div
                className="flexcenter group/profile relative p-2 transition-all 
                shadow-[inset_0px_3px_6px_0px_hsl(var(--foreground)_/_0.2)]
                border-foreground/20 font-semibold border  hover:shadow-[inset_0px_3px_6px_0px_hsl(var(--foreground)_/_0)] cursor-pointer  rounded-full py-2 gap-4"
              >
                <Menu className="h-6 transition-all  group-hover/profile:text-main" />

                {userData?.imageUrl ? (
                  <Image
                    alt=""
                    src={userData?.imageUrl}
                    className="rounded-full  min-h-[30px] min-w-[30px]  "
                    height={30}
                    width={30}
                  />
                ) : (
                  <Image
                    alt=""
                    src={"/assets/placeholder.jpg"}
                    className="rounded-full  min-h-[30px] min-w-[30px]  "
                    height={30}
                    width={30}
                  />
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="-translate-x-4  p-2">
              {!userData ? (
                <>
                  <LoginModal setOpen={setOpen} open={open} />
                  <RegisterModal setOpen={setOpen} open={open} />
                </>
              ) : (
                <>
                  <MenuItem onclick={() => {}}>
                    <Link className="w-full flex gap-2" href={"/profile"}>
                      <UserIcon /> Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onclick={() => setisRentModalOpen(true)}>
                    <div className="w-full items-center flex gap-2">
                      <FaAirbnb size={25} /> AirBnb your Home
                    </div>
                  </MenuItem>
                  <MenuItem onclick={() => {}}>
                    <Link className="w-full flex gap-2" href={"/trips"}>
                      <PlaneTakeoff /> Trips
                    </Link>
                  </MenuItem>
                  <MenuItem onclick={() => {}}>
                    <Link className="w-full flex gap-2" href={"/reservations"}>
                      <Album /> Reservations
                    </Link>
                  </MenuItem>
                  <MenuItem onclick={() => {}}>
                    <Link className="w-full flex gap-2" href={"/favourites"}>
                      <Crown /> favourites
                    </Link>
                  </MenuItem>
                </>
              )}
              <Separator className={`my-4 ${!userData && "hidden"}`} />
              <MenuItem className="md:hidden">
                <div className="flex gap-2 items-center">
                  <ModeToggle>Theme</ModeToggle>
                </div>
              </MenuItem>
              {userData && (
                <MenuItem
                  className=" flexcenter text-red-600"
                  onclick={() => {}}
                >
                  <SignOutButton>
                    <div className="flex w-full h-full gap-1 items-center">
                      <LucideLogOut className="h-6 w-6 " /> Logout
                    </div>
                  </SignOutButton>
                </MenuItem>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Search;
