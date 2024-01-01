"use client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BillBoardSchema } from "@/models/Schemas/Setup";
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
import { billBoard } from "@prisma/client";
import { ImagePlusIcon, Loader2, Trash2, } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import Heading from "../Heading";
import { useRouter } from "next/navigation";

const BillboardForm = ({
  billboard,
  storeId,
}: {
  billboard: billBoard;
  storeId: string;
}) => {
  const title = billboard ? "Edit BillBoard" : "Create BillBoard";
  const description = billboard ? "Edit BillBoard" : "Create BillBoard";
  const action = billboard ? "update" : "create ";
  const router = useRouter()
  const [begain, setBegain] = useState(false);
  const form = useForm<z.infer<typeof BillBoardSchema>>({
    resolver: zodResolver(BillBoardSchema),
    defaultValues: {
      label: billboard?.label || "",
      imageUrl: billboard?.imageUrl || "",
    },
  });

  async function onSubmit(values: z.infer<typeof BillBoardSchema>) {
    try {
      const data = {
        ...values,
      };

      const adding =
        action === "update"
          ? axios.patch(
              `/api/stores/${storeId}/billboards/${billboard?.id}`,
              data
            )
          : axios.post(
              `/api/stores/${storeId}/billboards/${billboard?.id}`,
              data
            );

      adding
        .then((e) => {
          toast.success(e.data.message, { invert: true });
          setTimeout(() => {
            window.location.assign(`/dashboard/${storeId}/billboards`)
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
              name="label"
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem className=" flex flex-col justify-start flex-wrap ">
                  <FormLabel>image</FormLabel>
                  {field.value ? (
                    <FormLabel
                      className=" mr-8 relative 
             w-full max-w-[700px]  m-0 !h-[500px] 
            bg-zinc-900 rounded-xl  flexcenter "
                    >
                      {field?.value ? (
                        <>
                          <Trash2
                            onClick={() => field.onChange("")}
                            className="absolute cursor-pointer transition-all  
                      hover:scale-105 bg-red-500 top-0 right-0
                      rounded-md  p-2 h-10 w-10 text-white z-50"
                          />
                          <Image
                            src={field.value}
                            className="object-cover rounded-lg"
                            alt="image of you"
                            fill
                          />
                        </>
                      ) : (
                        <Image
                          src="/assets/profile.svg"
                          className=" object-contain"
                          alt="image"
                          height={70}
                          width={70}
                        />
                      )}
                    </FormLabel>
                  ) : (
                    <div className="flex items-s gap-6">
                      <UploadButton
                        content={{
                          button: (
                            <div className="flexcenter whitespace-nowrap text-foreground gap-6">
                              {!begain ? (
                                <>
                                  {" "}
                                  <ImagePlusIcon className="" />
                                  <p>Upload An Image</p>
                                </>
                              ) : (
                                <Loader2 className="relative z-50 animate-spin" />
                              )}
                            </div>
                          ),
                        }}
                        endpoint="imageUploader"
                        className="items-start"
                        appearance={{
                          button: `bg-border w-52 p-2  text-primary-foreground `,
                        }}
                        onUploadBegin={() => setBegain(true)}
                        onClientUploadComplete={(e) => {
                          setBegain(false);
                          field.onChange(e?.[0].url);
                        }}
                      />
                    </div>
                  )}

            
                </FormItem>
              )}
            />
          </div>
          {form.watch().label !== billboard?.label && (
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
          )}
        </form>
      </Form>
    </>
  );
};

export default BillboardForm;
