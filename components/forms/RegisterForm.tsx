"use client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema, Loginschema } from "@/models/Schemas/Setup";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import "@uploadthing/react/styles.css";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import LoginButton from "../navbar/LoginButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const RegisterForm = ({ type }: { type: "login" | "register" }) => {
  const router = useRouter();
  const defaultValues =
    type == "register"
      ? {
          name: "",
          confirm: "",
          email: "",
          password: "",
        }
      : {
          email: "",
          password: "",
        };
  const form = useForm<
    z.infer<typeof RegisterSchema> | z.infer<typeof Loginschema>
  >({
    resolver: zodResolver(type == "login" ? Loginschema : RegisterSchema),
    reValidateMode: "onChange",
    mode: "all",
    defaultValues,
  });
  const filedsNumber = Object.entries(form.getValues()).length;
  const filedsKeys: any = Object.keys(form.getValues());
  const [cleared, setCleared] = useState(0);
  const {
    formState: { errors },
    getFieldState,
  } = form;
  useEffect(() => {
    let cleared = filedsNumber;
    filedsKeys.forEach((e) => {
      const { invalid, isTouched, error } = getFieldState(e);
      if (error) return cleared--;
      if (invalid && isTouched) return cleared--;
      else if (!invalid && !isTouched) return cleared--;
    });

    const count = (cleared / filedsNumber) * 100;

    if (count === 0 && !form.formState.isValid) return setCleared(0);
    else setCleared(count >= 0 ? count : 0);
  }, [form.formState, form.watch()]);

  async function onSubmit(
    values: z.infer<typeof RegisterSchema> | z.infer<typeof Loginschema>
  ) {
    try {
      const data = {
        ...values,
      };

      if (type == "register") {
        const adding = axios.post(`/api/register`, { ...data });
        adding
          .then((e) => {
            toast.success(e.data.message);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          })
          .catch((e) => {
            console.log(e);
            toast.error("Error Happend");
          });
      } else if (type === "login") {
        signIn("credentials", { redirect: false, ...data })
          .then((e) => {
            console.log(e);
            if (e?.ok) {
              toast.success("logged In successfully ");
              window.location.reload();
            } else toast.error("error happend , try again .");
          })
          .catch((e) => {
            console.log(e);
            toast.error(e.response.data.message || "Error Happend", {
              invert: true,
            });
          });
      }
      router.refresh();
      toast.dismiss();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
          <div
            className="h-2 bg-accent relative w-full rounded-full 
          overflow-hidden mb-2 "
          >
            <div
              style={{ width: `${cleared}%` }}
              className={`absolute bg-main h-full transition-all top-0 left-0 ${
                cleared == 100
                  ? "!bg-green-500"
                  : cleared >= 50
                  ? "!bg-yellow-400"
                  : ""
              }`}
            ></div>
          </div>
          <div className=" gap-3 space-y-4 mb-10 items-center w-full ">
            {type === "register" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className=" peer flex flex-col   ">
                    <FormLabel>Name</FormLabel>

                    <FormControl className="">
                      <Input
                        className={`${errors[field.name] && "border-red-500"}`}
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=" peer flex flex-col   ">
                  <FormLabel>Email</FormLabel>

                  <FormControl className="">
                    <Input
                      className={`${errors[field.name] && "border-red-500"}`}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className=" peer flex flex-col   ">
                  <FormLabel>Password</FormLabel>

                  <FormControl className="">
                    <Input
                      className={`${errors[field.name] && "border-red-500"}`}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {type === "register" && (
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem className=" peer flex flex-col   ">
                    <FormLabel>Confirm Password</FormLabel>

                    <FormControl className="">
                      <Input
                        className={`${errors[field.name] && "border-red-500"}`}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          {
            <div className="flex items-center gap-6 justify-end">
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                className={`${
                  form.formState.isSubmitting
                    ? " animate-bounce bg-zinc-500"
                    : ""
                } flexcenter w-full bg-main hover:bg-main/80 gap-6`}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-6 w-6 animate-spin " />
                ) : (
                  "Submit"
                )}
                {form.formState.isSubmitting && (
                  <div
                    className="w-8 h-8 border-4 border-white
                      dark:border-black !border-t-transparent rounded-full animate-spin"
                  />
                )}
              </Button>
            </div>
          }
        </form>
      </Form>
      <div className="space-y-4 mt-6">
        <LoginButton
          onClick={async () => {
            signIn("google");
          }}
          icon={<FcGoogle className="h-10 w-8" />}
          label="continue with google"
        />
        <LoginButton
          onClick={async () => {
            signIn("github");
          }}
          icon={<FaGithub className="h-10 w-8" />}
          label="continue with Github"
        />
      </div>
    </>
  );
};

export default RegisterForm;
