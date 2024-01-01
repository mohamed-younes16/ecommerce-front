"use client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { colorSchema } from "@/models/Schemas/Setup";
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
import { color } from "@prisma/client";
import Heading from "../Heading";
import { ChromePicker } from "react-color";
import { useState } from "react";

const colorForm = ({ color, storeId }: { color: color; storeId: string }) => {

  const title = color ? "Edit color" : "Create color";
  const description = color ? "Edit color" : "Create color";
  const action = color ? "update" : "create ";
  const [colorchoosed, setcolor] = useState("#fff");
  const [showpicker, setshowpicker] = useState(false);
  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      value: color?.value || "",
      name: color?.name || "",
    },
  });

  async function onSubmit(values: z.infer<typeof colorSchema>) {
    try {
      const data = {
        ...values,
      };

      const adding =
        action === "update"
          ? axios.patch(`/api/stores/${storeId}/colors/${color?.id}`, data)
          : axios.post(`/api/stores/${storeId}/colors/${color?.id}`, data);

      adding
        .then((e) => {
          toast.success(e.data.message, { invert: true });
          setTimeout(() => {
            window.location.assign(`/dashboard/${storeId}/colors`);
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
                <FormItem className=" flex flex-col w-fit  relative z-50  ">
                  <FormLabel>choose a color</FormLabel>

                  <ChromePicker
                    color={colorchoosed}
                    onChangeComplete={(e) =>{setcolor(e.hex);field.onChange(e.hex)}}
                  />
                </FormItem>
              )}
            />
          </div>
          {(form.watch().name !== color?.name ||
            form.watch().value !== color?.value) && (
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

export default colorForm;
