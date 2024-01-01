"use client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategorySchema } from "@/models/Schemas/Setup";
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
import { billBoard, category } from "@prisma/client";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import Heading from "../Heading";
import { useRouter } from "next/navigation";

const CategoryForm = ({
  category,
  storeId,
  billBoards,
}: {
  category: category;
  storeId: string;
  billBoards: billBoard[];
}) => {
  const title = category ? "Edit category" : "Create category";
  const description = category ? "Edit category" : "Create category";
  const action = category ? "update" : "create ";
  const router = useRouter();
  const [begain, setBegain] = useState(false);
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category?.name || "",
      billboardId: category?.billboardId || "",
    },
  });
useEffect(() => {
console.log(form.formState.isSubmitting)
}, [form.formState])

  async function onSubmit(values: z.infer<typeof CategorySchema>) {
    try {
      const data = {
        ...values,
      };

      const adding =
        action === "update"
          ? axios.patch(
              `/api/stores/${storeId}/categories/${category?.id}`,
              data
            )
          : axios.post(
              `/api/stores/${storeId}/categories/${category?.id}`,
              data
            );

      adding
        .then((e) => {
          toast.success(e.data.message, { invert: true });
          setTimeout(() => {
            window.location.assign(`/dashboard/${storeId}/categories`);
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
      <Heading title={title} description={description} />{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-8">
          <div className="flex flex-col gap-3 justify-start  w-full ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=" flex flex-col w-fit   ">
                  <FormLabel>Label</FormLabel>

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
              name="billboardId"
              render={({ field }) => (
                <FormItem className=" flex flex-col w-fit   ">
                  <FormLabel>choose a billboard</FormLabel>
                  <FormControl>
                    <Select onValueChange={(e) => field.onChange(e)}>
                      <SelectTrigger className="w-[180px] ring-0 !shadow-none">
                        <SelectValue placeholder="Select a billboard" />
                      </SelectTrigger>
                      <SelectContent className="!shadow-none">
                        <SelectGroup>
                          <SelectLabel>BillBoards List</SelectLabel>
                          {billBoards.map((e) => (
                            <SelectItem  key={e.id} value={e.id}> {e.label} </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {form.watch().name !== category?.name && (
            <div className="flex items-center gap-6 justify-start">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className={`${
                  form.formState.isSubmitting
                    ? " bg-foreground"
                    : ""
                } flexcenter w-[100px] gap-6`}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-6 w-6 animate-spin " />
                ) : (
                  "Submit"
                )}

              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
