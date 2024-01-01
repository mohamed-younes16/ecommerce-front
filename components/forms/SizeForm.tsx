"use client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sizeSchema } from "@/models/Schemas/Setup";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import "@uploadthing/react/styles.css";
import axios from "axios";
import { size } from "@prisma/client";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SizeForm = ({ size, storeId }: { size: size; storeId: string }) => {

  const title = size ? "Edit size" : "Create size";
  const description = size ? "Edit size" : "Create size";
  const action = size ? "update" : "create ";

  const sizesTypes = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const form = useForm<z.infer<typeof sizeSchema>>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      value: size?.value || "",
      name: size?.name || "",
    },
  });

  async function onSubmit(values: z.infer<typeof sizeSchema>) {
    try {
      const data = {
        ...values,
      };

      const adding =
        action === "update"
          ? axios.patch(`/api/stores/${storeId}/sizes/${size?.id}`, data)
          : axios.post(`/api/stores/${storeId}/sizes/${size?.id}`, data);

      adding
        .then((e) => {
          toast.success(e.data.message, { invert: true });
          setTimeout(() => {
            window.location.assign(`/dashboard/${storeId}/sizes`);
          }, 500);
        })
        .catch((e) => {
          console.log(e);
          toast.error(e.response.data.message || "Error Happend", {
            invert: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Heading title={title }  description={description} />{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-8">
          <div className="flex flex-col gap-3 justify-start  w-full ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=" flex flex-col w-fit   ">
                  <FormLabel>name</FormLabel>

                  <FormControl className="">
                    <Input
                      className="account-form_input "
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className=" flex flex-col w-fit   ">
                  <FormLabel>choose a billboard</FormLabel>
                  <FormControl>
                    <Select onValueChange={(e) => field.onChange(e)}>
                      <SelectTrigger className="w-[180px] ring-0 !shadow-none">
                        <SelectValue placeholder="Select A size" />
                      </SelectTrigger>
                      <SelectContent className="!shadow-none">
                        <SelectGroup>
                          <SelectLabel>BillBoards List</SelectLabel>
                          {sizesTypes.map((e) => (
                            <SelectItem key={e} value={e.toLocaleUpperCase()}>
                              {e.toLocaleLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {(form.watch().name !== size?.name ||
            form.watch().value !== size?.value) && (
            <div className="flex items-center gap-6 justify-start">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className={`${
                  form.formState.isSubmitting
                    ? " animate-bounce bg-zinc-500"
                    : ""
                } flexcenter gap-6`}
              >
                Submit
                {form.formState.isSubmitting && (
                  <div
                    className="w-8 h-8 border-4 border-white
                      dark:border-black !border-t-transparent rounded-full animate-spin"
                  />
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
