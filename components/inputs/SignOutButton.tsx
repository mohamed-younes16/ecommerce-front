"use client";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

const SignOutButton = ({ children }: { children: ReactNode }) => {
  return (
    <button className="w-full" onClick={() => signOut({ redirect: true ,})}>
      {children}{" "}
    </button>
  );
};

export default SignOutButton;
