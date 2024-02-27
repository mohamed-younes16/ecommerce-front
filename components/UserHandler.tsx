import { useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCart } from "@/hooks/store";
import Image from "next/image";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import MenuItem from "./navbar/MenuItem";
import { Album, LucideLogOut, Menu, UserIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import SignOutButton from "./inputs/SignOutButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./ui/themeButton";
import ImageContainer from "./ImageContainer";
import CliComp from "@/providers/modalProvider";

const UserHandler = ({ userData }: { userData: UserFetched | null }) => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState<"login" | "register" | null>(
    searchParams.get("redirected") === "true" ? "login" : null
  );
  const [popopen, setpopopen] = useState(false);
  useEffect(() => {
    const redirected = searchParams.get("redirected") === "true";
    setpopopen(redirected && userData === null);
  }, [searchParams]);

  return (
    <Popover
      open={popopen}
      onOpenChange={(e) => {
        e && setpopopen(true);
        !e && setpopopen(false);
      }}
    >
      <PopoverTrigger asChild>
        <div
          className="flexcenter group/profile relative p-2 transition-all 
                  shadow-[inset_0px_3px_6px_0px_hsl(var(--foreground)_/_0.2)]
                  border-foreground/20 font-semibold border max-md:w-full  hover:shadow-[inset_0px_3px_6px_0px_hsl(var(--foreground)_/_0)] cursor-pointer  rounded-full py-2 gap-4"
        >
          <Menu className="h-6 transition-all  group-hover/profile:text-main" />

          {userData?.imageUrl ? (
            <div className=" relative overflow-hidden rounded-full max-h-[35px]  h-[35px] max-w-[35px] w-[35px] ">
              <ImageContainer
                alt=""
                src={userData?.imageUrl}
                className="object-cover"
              />
            </div>
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
          <CliComp>
            <LoginModal setOpen={setOpen} open={open} />
            <Separator className="my-2" />
            <RegisterModal setOpen={setOpen} open={open} />
          </CliComp>
        ) : (
          <>
            
            <MenuItem onclick={() => {}}>
              <Link className="w-full flex gap-2" href={"/profile"}>
                <UserIcon /> Profile
              </Link>
            </MenuItem>
          </>
        )}
        <Separator className={`my-2 md:hidden  ${!userData && "hidden"} `} />
        <MenuItem className="md:hidden">
          <div className="flex gap-2 items-center">
            <ModeToggle>
              <div className="ml-2 text-lg">Toggle Theme</div>
            </ModeToggle>
          </div>
        </MenuItem>
        <Separator className={`my-2 ${!userData && "hidden"}`} />

        {userData && (
          <>
            <MenuItem onclick={() => {}}>
              <Link className="w-full flex gap-2" href={"/orders"}>
                <Album /> Orders
              </Link>
            </MenuItem>
            <Separator className="my-2" />
            <MenuItem className=" flexcenter text-red-600" onclick={() => {}}>
              <SignOutButton>
                <div className="flex w-full h-full gap-1 items-center">
                  <LucideLogOut className="h-6 w-6 " /> Logout
                </div>
              </SignOutButton>
            </MenuItem>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default UserHandler;
