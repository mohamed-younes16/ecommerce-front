"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const ApiAlert = ({
  title,
  description,
  badge = "public",
}: {
  description: string;
  title: string;
  badge: "public" | "admin";
}) => {
  const copy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Copied Link");
  };
  return (
    <div>
      <Alert>
        <Server className="h-4 w-4" />
        <AlertTitle className="font-bold gap-4 flex items-center">
          {title}{" "}
          <Badge variant={badge === "public" ? "secondary" : "destructive"}>
            {badge}{" "}
          </Badge>
        </AlertTitle>
        <AlertDescription>
          
              <div className="flex overflow-scroll max-lg:h-20 gap-6 font-bold px-6 font-mono items-center justify-between">
            {description}{" "}
            <Button variant={"outline"} onClick={() => copy()}>
              <Copy className="h-4 w-4" />{" "}
            </Button>
          </div>
         
        
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ApiAlert;
