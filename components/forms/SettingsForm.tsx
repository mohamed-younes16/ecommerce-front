"use client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StoreSchema } from "@/models/Schemas/Setup";
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
import { Store } from "@prisma/client";
import { Loader2 } from "lucide-react";
import ApiAlert from "../ApiAlert";
import { useOrigin } from "@/hooks/store";

const SettingsForm = ({ currentStore }: { currentStore: Store }) => {
  const origin = useOrigin();
  const form = useForm<z.infer<typeof StoreSchema>>({
    resolver: zodResolver(StoreSchema),
    defaultValues: {
      name: currentStore.name,
    },
  });

  async function onSubmit(values: z.infer<typeof StoreSchema>) {
    try {
      const data = {
        ...values,
      };

      const adding = axios.patch(`/api/stores/${currentStore.id}`, data);

      adding
        .then((e) => {
          toast.success(e.data.message, { invert: true });
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((e) => {
          console.log(e);
          toast.error(e.response.data.message || "Error Happend", {
            invert: true,
          });
        });

      toast.dismiss();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid  grid-cols-3 gap-3 items-center w-full ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=" flex flex-col   ">
                  <FormLabel>Name</FormLabel>

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
            {/* <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=" flex flex-col   ">
                  <FormLabel>Name</FormLabel>

                  <FormControl className="">
                    <Input
                      className="account-form_input "
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}
          </div>
          {form.watch().name !== currentStore.name && (
            <div className="flex items-center gap-6 justify-end">
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
      {origin && (
        <ApiAlert badge="public" description={`${origin}/api/stores/${currentStore.id}`} title="Test" />
      )}
    </>
  );
};

export default SettingsForm;
