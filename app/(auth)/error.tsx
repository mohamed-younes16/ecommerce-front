"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const Error = ({ err }: { err: any }) => {
  const router = useRouter();
  useEffect(() => {
    console.error(err);
  }, []);
  return (
    <div
      className="
bg-white dark:bg-[url(/assets/dark-bg.svg)]

z-50 bg-cover

w-screen h-screen fixed inset-0 flex flex-col gap-4 justify-center items-center"
    >
      <p className="text-3xl   animate-pulse text-primary-purple font-bold">
        Check your connection{" "}
      </p>

      <div className="flex  text-xl gap-4">
        <Button className="text-xl" onClick={() => router.push("/")}>
          try Again{" "}
        </Button>
        <Button className="text-xl" onClick={() => router.push("/")}>
          {" "}
          Home{" "}
        </Button>
      </div>
    </div>
  );
};

export default Error;
