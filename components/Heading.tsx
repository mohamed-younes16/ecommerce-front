import React, { ReactNode } from "react";

const Heading = ({
  title,
  description,
  className,
  color,
  icon,
}: {
  title: string;
  description: string;
  className?: string;
  color: string;
  icon: ReactNode;
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex mb-3 items-center gap-2" style={{ color:color }}>
        <div className="group relative p-2 rounded-full ">
          <div className="absolute  z-[2] inset-0 rounded-full   transition-all  " style={{backgroundColor:color}}></div>
          <div className="relative z-10  text-white transition-all group-hover:text-white">
            {icon}
          </div>
        </div>
        <h2 className=" text-3xl max-md:text-2xl font-bold">{title} </h2>
      </div>
      <p className="text-muted-foreground max-md:text-base text-xl">
        {description}{" "}
      </p>
    </div>
  );
};

export default Heading;
