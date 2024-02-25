import "@uploadthing/react/styles.css";

import { HomeIcon, LucideLogOut, ShieldAlert } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ProfileForm from "@/components/forms/ProfileForm";
import TooltipComp from "@/components/ui/TooltipComp";

import SignOutButton from "@/components/inputs/SignOutButton";
import getCurrentUser from "@/actions/getCurrentUser";

import { Button } from "@/components/ui/button";
import CliComp from "@/providers/modalProvider";



const Heading = ({
  title="",
  description="",
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full">
      <h2 className=" text-3xl max-md:text-2xl max-sm:text-xl font-bold">{title} </h2>
      <p className="text-muted-foreground max-md:text-base text-lg">{description} </p>
    </div>
  );
};


const Page = async () => {
  const CurrentUserData = await getCurrentUser();

  return (
    <>
      {CurrentUserData ? (
        <div
          className="fixed inset-0  flexcenter left-0 top-0  text-black  
    dark:text-white
    min-h-screen dark:bg-[url(/assets/magicdark.svg)] transition-all 
    bg-cover"
        >
          <div className=" w-[80dvw]  p-4 rounded-2xl  mt-6 border-neutral-600 border backdrop-blur-md ">
            <div className="flex items-center  gap-6">
              <div className=" flexcenter  gap-4 ">
                <TooltipComp hoverText="Log-out">
                  <SignOutButton>
                    <LucideLogOut className="h-10 w-10 " />
                  </SignOutButton>
                </TooltipComp>
              </div>

              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger>
                    <Link href={"/"} aria-label="redirect to profile page ">
                      <HomeIcon className="h-10 w-10 " />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Main Page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="min-h-[60dvh]">
              <CliComp>
                <ProfileForm userData={CurrentUserData} />
              </CliComp>{" "}
            </div>
          </div>
        </div>
      ) : (
        <div className="flexcenter h-[50dvh] flex-col text-center">
          <Heading
            title="Not Logged In "
            description="try Logging in to  access content."
          />
          <ShieldAlert size={40} className=" mt-6" />
          <Button className="mt-8" variant={"outline"}>
            <Link href={"/?redirected=true"}>Go to Login</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default Page;
