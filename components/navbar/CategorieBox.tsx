"use client";
import React from "react";
import { IconType } from "react-icons";
import TooltipComp from "../ui/TooltipComp";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
const CategorieBox = ({
  label,
  description,
  icon: Icon,
}: {
  label: string;
  description: string;
  icon: IconType;
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const currentCategorie = params?.get("category");
  const handleclick = () => {
    const query = qs.parse(params.toString());
    const newquery: any = {
      ...query,
      category: label,
    };
    currentCategorie == label && delete newquery.category;
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: newquery,
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <div>
      <TooltipComp hoverText={description}>
        <div
          onClick={handleclick}
          className={`flexcenter flex-col group relative  ${
            currentCategorie == label && "text-main "
          }  overflow-x-hidden text-sm  hover:opacity-90 pb-2 hover:text-main transition  gap-1`}
        >
          <Icon size={20} />
          <p>{label}</p>
          <div
            className={`absolute  transition-all bg-main bottom-0 -translate-x-full w-full h-1 ${
              currentCategorie == label && "!translate-x-0 "
            }`}
          ></div>
        </div>
      </TooltipComp>
    </div>
  );
};

export default CategorieBox;
