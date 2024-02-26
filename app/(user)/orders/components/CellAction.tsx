"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  ClipboardEdit,
  CopyIcon,
  GripVertical,
  LucideTrash2,
} from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { orderColumn } from "./columns";

const CellAction = ({ data }: { data: orderColumn }) => {
  const { storeId } = useParams();
  const router = useRouter();

  const copy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Copied");
  };
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="shadow-none " asChild>
          <Button variant="ghost" className="p-2 rounded-full">
            <GripVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 font-bold">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              router.push(`/orders/${data.id}`)
            }
            className="flex items-center gap-3"
          >
            <ClipboardEdit /> Details
          </DropdownMenuItem> */}

          <DropdownMenuItem
            onClick={() => copy()}
            className="flex items-center gap-3"
          >
            <CopyIcon /> Copy Id
          </DropdownMenuItem>

          {/* <AlertDialogTrigger asChild>
            <DropdownMenuItem className="flex text-red-600 items-center gap-3">
              <LucideTrash2 /> Delete
            </DropdownMenuItem>
          </AlertDialogTrigger> */}
        </DropdownMenuContent>
      </DropdownMenu>{" "}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Label and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              console.log(`/api/stores/${storeId}/products/${data.id}`);
              const operation = axios.delete(
                `/api/stores/${storeId}/products/${data.id}`
              );

              operation
                .then((e) => {
                  toast.success(e.data.message, { invert: true });
                  setTimeout(() => {
                    router.refresh();
                  }, 500);
                })
                .catch((e) => {
                  toast.error(e.response.data.message || "Error Happend", {
                    invert: true,
                  });
                });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CellAction;
