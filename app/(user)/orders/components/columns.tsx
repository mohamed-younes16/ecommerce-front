"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import CellAction from "./CellAction";
import ImageContainer from "@/components/ImageContainer";

export type orderColumn = {
  id: string;
  isPaid: boolean;
  createdAt: string;
  phone: string;
  address: string;
  totalPrice: number;
  products: string;
  imageUrl: string;
};

export const columns: ColumnDef<orderColumn>[] = [
  {
    accessorKey: "products",
    header: "products",
  },
  {
    accessorKey: "totalPrice",
    header: "image",
    cell: ({ row }) => {
      return (
        <div className="h-[150px] max-md:w-[100px] max-md:h-[100px] w-[150px] rounded-xl overflow-hidden">
          <ImageContainer
            className="object-contain"
            src={row.original.imageUrl}
          />
          ;
        </div>
      );
    },
  },

  {
    accessorKey: "address",
    header: "address",
  },
  {
    accessorKey: "phone",
    header: "phone",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          order Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-bold whitespace-nowrap">
          {row.original.createdAt}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          total Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-bold">{formatted}</div>;
    },
  },

  {
    accessorKey: "isPaid",
    header: "is paid",
  },
  {
    id: "action",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
