"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { SetupSchema } from "@/models/Schemas/Setup";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input, InputProps } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";
import "@uploadthing/react/styles.css";
import { useRouter } from "next/navigation";
import axios from "axios";

import { X } from "lucide-react";

import { useEffect, useState } from "react";

const ProfileForm = ({ userData }: { userData: UserFetched | null }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof SetupSchema>>({
    resolver: zodResolver(SetupSchema),
    defaultValues: {
      bio: userData?.bio || "",
      imageUrl: userData?.imageUrl || "",
      name: userData?.name || "",
      username: userData?.username || "",
    },
  });
  const [isSubmitting, setIsSub] = useState(false);
  useEffect(() => {
    setIsSub(form.formState.isSubmitting);
  }, [form.formState]);
  async function onSubmit(values: z.infer<typeof SetupSchema>) {
    try {
      setIsSub(true);
      toast.loading("uploading.....", { dismissible: false });
      const adding = axios.post(`/api/authentication`, values);

      adding
        .then((e) => {
          toast.dismiss();
          toast.success(e.data.message);
        })
        .catch((e) => {
          toast.dismiss();
          toast.error(e.response.data.message);
        });
      router.refresh();
      toast.dismiss();
      setIsSub(false);
    } catch (error) {
      setIsSub(false);
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="imageUrl"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem className=" flex justify-center  gap-20 flex-wrap max-md:gap-10 ">
              {field.value ? (
                <FormLabel
                  className=" mr-8 relative 
             w-[250px] flex justify-center items-center max-md:h-36 max-md:w-36 m-0 h-[250px] 
            bg-zinc-900 rounded-full flexcenter "
                >
                  {field?.value ? (
                    <>
                      <X
                        onClick={() => field.onChange("")}
                        className="absolute cursor-pointer transition-all  
                      hover:scale-105 bg-red-500 top-2 max-md:top-0 max-md:right-0 right-2 
                      rounded-full p-2 h-10 w-10 z-50"
                      ></X>
                      <Image
                        src={field.value}
                        className="object-cover rounded-full"
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
                <UploadDropzone
                  endpoint="imageUploader"
                  appearance={{
                    container: ` max-md:!px-2 max-md:!py-6 transition-all hover:scale-105 dark:border-black
                    bg-white cursor-pointer dark:bg-zinc-300 `,
                    label: `text-xl `,
                  }}
                  onClientUploadComplete={(e) => field.onChange(e?.[0].url)}
                />
              )}

              {/* <FormControl className="account-form_image-input cursor-pointer
             border-white border-4 w-fit  h-24  flexcenter border-dashed ">
                <Input type="file"   accept="images/*" 
                onChange={e=>handleimage(e , field.onChange,setfiles)} />
            </FormControl> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem className=" flex flex-col   ">
              <FormLabel className="   ">Name</FormLabel>

              <FormControl className="">
                <Input className="account-form_input " type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem className=" flex flex-col   ">
              <FormLabel className="   ">Username</FormLabel>

              <FormControl className=" ">
                <Input className="account-form_input " type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem className=" flex flex-col   ">
              <FormLabel className="    ">Bio</FormLabel>

              <FormControl className="">
                <Input
                  className="account-form_input "
                  type="text"
                  {...(field as InputProps)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.isDirty && (
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting ? "  bg-zinc-500" : ""
            } flexcenter gap-2`}
          >
            Submit
            {isSubmitting && (
              <div
                className="w-4 h-4 border-2 border-white
     dark:border-black !border-t-transparent rounded-full animate-spin"
              />
            )}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ProfileForm;
