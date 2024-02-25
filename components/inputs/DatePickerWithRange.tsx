"use client";
import React, { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, DollarSign, Loader2 } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ReservationType } from "@/index";


interface DatePickerWithRangeProps {
  className?: string;
  price: number;
  listingId: string;
  fromDate?: Date;
}

export function DatePickerWithRange({
  className,
  price,
  fromDate,
  listingId,
}: DatePickerWithRangeProps) {
  const router = useRouter();
  const [date, setDate] = useState<DateRange | undefined>({
    from: fromDate || new Date(),
    to: addDays(fromDate || new Date(), 1),
  });
  const [days, setDays] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const today = new Date();

  const disabledDays = [{ before: fromDate || today }];
  useEffect(() => {
    setDays(
      Math.max(
        Math.ceil(
          ((date?.to?.getTime() || 0) - (date?.from?.getTime() || 0)) /
            (1000 * 3600 * 24)
        ),
        1
      )
    );
  }, [date]);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const reservation = date &&
        date.from &&
        date.to && {
          endDate: addDays(date.to, 1),
          startDate: date.from,
          listingId,
          totalPrice: price * days,
          totalDays: days,
        };

      const adding = axios.post(`/api/reservation`, reservation);

      adding
        .then(
          ({
            data: { message, reservation },
          }: {
            data: { message: string; reservation: ReservationType };
          }) => {
            toast.dismiss();

            toast.success(message);
            router.push(`/trips/${reservation.id}`);
          }
        )
        .catch((e) => {
          toast.dismiss();
          toast.error(e?.response?.data?.message || "Error Happend");
        })
        .finally(() => {
          setIsLoading(false);
          router.refresh();
        });

      toast.dismiss();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={cn("grid gap-2 rounded-lg bg-background p-3 py-6 ", className)}
    >
      <Button
        id="date"
        variant={"outline"}
        className={cn(
          "w-[300px] justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date?.from ? (
          date.to ? (
            <>
              {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
            </>
          ) : (
            format(date.from, "LLL dd, y")
          )
        ) : (
          <span>Pick a date</span>
        )}
      </Button>

      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={setDate}
        numberOfMonths={1}
        disabled={disabledDays}
      />
      <Button
        onClick={() => {
          handleClick();
        }}
        disabled={!date || !date.from || !date.to}
        className="bg-main w-full"
      >
        {isLoading ? (
          <Loader2 className=" w-6 h-6 animate-spin text-foreground" />
        ) : (
          "Reserve It"
        )}
      </Button>
      <div className="flex font-semibold mt-6 items-center justify-between">
        <p>Total Price</p>
        <div className="flexcenter gap-2">
          <DollarSign className="w-4 h-4" />
          <p>{price * days}</p>
        </div>
      </div>
    </div>
  );
}
