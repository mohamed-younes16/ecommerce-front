"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MenuItem from "../navbar/MenuItem";
import RegisterForm from "../forms/RegisterForm";

const RegisterModal = ({ open, setOpen }: AuthenticationModalType) => {
  return (
    <Dialog
      open={open === "register"}
      onOpenChange={(e) => {
        e && setOpen("register");
        !e && setOpen(null);
      }}
    >
      <DialogTrigger className=" text-start w-full">
        <MenuItem label="register" onclick={() => {}} />
      </DialogTrigger>
      <DialogContent>
        <div className="flexcenter mb-6 font-semibold text-xl">Register</div>
        <h1 className="text-3xl max-md:text-xl font-bold">Register to Store</h1>
        <div className="text-foreground/80">Create an Account</div>

        <RegisterForm type="register" />
        <div className="flex gap-2">
          <p>Already have an account?</p>
          <div
            className="text-main cursor-pointer "
            onClick={() => setOpen("login")}
          >
            Login
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
