"use client";
import Link from "next/link";

import React, { useEffect, useState } from "react";

const MainNav = ({ categories }: { categories: category[] }) => {
  const [index, setindex] = useState<number | null>(null);


  return (
    <div className=" flex gap-[10px] relative">
      {index !== null && (
        <div
          style={{ translate: `${80 * index + index * 10}px 0` }}
          className={`absolute origin-left duration-150
          bottom-0 left-0 z-10 h-[4px] w-[80px]
            bg-cyan-400  `}
        />
      )}

      {categories.map((e, i) => (
        <div
          onClick={() => setindex(i)}
          key={e.name}
          className="relative w-[80px] font-semibold  flexcenter group py-1  overflow-x-hidden "
        >
          <Link href={`/categories/${e.id}`}> {e.name} </Link>
          <div
            className={`absolute origin-left duration-75 group-hover:scale-x-100 bottom-0 left-0 scale-x-0 h-[4px] w-full
            bg-[#b7b7b772] z-20`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default MainNav;
