import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Heading } from "@/app/(user)/profile/page";

const UserLoginAlert = () => {
  return (
    <>
      {" "}
      <div className="flexcenter h-full flex-col text-center">
        <Heading
          title="Not Logged In "
          description="try Logging in to  access content."
        />
        <ShieldAlert size={40} className=" mt-6" />
        <Button className="mt-8" variant={"outline"}>
          <Link href={"/?redirected=true"}>Go to Login</Link>
        </Button>
      </div>
    </>
  );
};

export default UserLoginAlert;
