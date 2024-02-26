"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CleanUp = ({ cleanUp }: { cleanUp: () => Promise<void> }) => {
    const router = useRouter()
  return (
    <Button
      onClick={async () => {
        toast.loading("cleaning");
        await cleanUp();
        toast.dismiss()
        router.refresh();
      }}
      variant={"destructive"}
    >
      Clean Orders
    </Button>
  );
};

export default CleanUp;
