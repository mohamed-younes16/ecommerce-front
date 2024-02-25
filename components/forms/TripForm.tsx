"use client";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { reviewSchema } from "@/models/Schemas/Setup";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import axios from "axios";
import { Loader2, Star } from "lucide-react";
import { useState } from "react";
import _ from "lodash";
import { Review } from "@prisma/client";
import ImageContainer from "../ImageContainer";
import { useRouter } from "next/navigation";

const TripForm = ({
  tripId,
  review,
  userData,
}: {
  tripId: string;
  review: Review | null;
  userData: { username: string; imageUrl: string };
}) => {
  const [stars, setstars] = useState(review?.stars || 5);
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { stars: review?.stars || 5, message: review?.message },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function onSubmit(values: z.infer<typeof reviewSchema>) {
    try {
      const adding = axios.post(`/api/reservation/review`, {
        ...values,
        reservationId: tripId,
      });

      adding
        .then((e) => {
          toast.dismiss();
          toast.success(e.data.message, { invert: true });
          window.location.reload();
        })
        .catch((e) => {
          toast.dismiss();
          toast.error(e.response.data.message || "Error Happend");
          console.log(e);
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 space-y-8
          backdrop-blur-md rounded-xl max-w-6xl mx-auto  border-accent border-[1px] p-8 max-sm:p-4 "
        >
          <div className=" gap-6justify-start w-full ">
            <div className="flex max-sm:flex-col items-center  justify-between mb-9">
              <div className="flex items-center gap-4">
                <div className="relative rounded-full h-14 w-14 min-w-14 overflow-hidden">
                  <ImageContainer alt="your image" src={userData.imageUrl} />
                </div>
                <p className="font-bold text-nowrap capitalize text-2xl">
                  {userData.username}
                </p>
              </div>
              <FormField
                control={form.control}
                name="stars"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="flex ">
                        {Array.from({ length: 5 }).map((e, i) => (
                          <div
                            onClick={() => {
                              setstars(i + 1);
                              form.setValue("stars", i + 1, {
                                shouldDirty: true,
                              });
                            }}
                            className=" transition-all max-sm:mt-4 hover:scale-110 active:scale-95 cursor-pointer"
                          >
                            <Star
                              className={`${
                                i + 1 <= stars && "fill-yellow-400"
                              } h-8 w-8`}
                            />
                          </div>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>{" "}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className=" flex flex-col w-full   ">
                  <FormLabel>Review of Place</FormLabel>
                  <div className="grid w-full gap-2"></div>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type your message here."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.formState.isDirty && (
            <div className="flex items-center gap-6 justify-start">
              <Button
                onClick={() => setIsLoading(true)}
                type="submit"
                className={`${
                  isLoading ? " bg-foreground" : ""
                } flexcenter w-full gap-6`}
              >
                {isLoading ||
                  (form.formState.isSubmitting && (
                    <Loader2 className="h-6 w-6 animate-spin " />
                  ))}
                {isLoading || form.formState.isSubmitting ? (
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

export default TripForm;
