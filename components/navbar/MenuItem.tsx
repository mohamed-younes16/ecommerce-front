import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface MenuItemProps {
  onclick?: () => void;
  label?: string;
  children?: ReactNode;
  className?: string;
}
const MenuItem: React.FC<MenuItemProps> = ({
  onclick,
  label,
  children,
  className,
}) => {
  return (
    <div
      onClick={onclick}
      className={cn(
        `cursor-pointer transition-all
      hover:bg-accent rounded-md w-full font-semibold px-3 py-2 `,
        className
      )}
    >
      {label} {children}
    </div>
  );
};

export default MenuItem;
