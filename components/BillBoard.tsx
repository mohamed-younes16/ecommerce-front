"use client";
import { motion as m } from "framer-motion";

import Link from "next/link";

const BillBoard = ({
  billboard,
  link,
}: {
  billboard: billBoard;
  link: boolean;
}) => {
  const labelWords: string[] = billboard?.label?.split("");
  return (
    <div className=" max-md:h-[200px] bg-cover bg-[#fdf6f2]  max-w-[95rem] overflow-hidden relative mx-auto rounded-xl h-[500px]">
      {link ? (
        <Link
          style={{ color: billboard.labelColor }}
          href={`/categories/${billboard?.categories[0]?.id}`}
          className="absolute z-20  w-full
    duration-500 transition-all h-full flexcenter  -translate-y-1/2  top-1/2 max-md:text-2xl font-bold text-5xl"
        >
          {billboard.label}
        </Link>
      ) : (
        <div
          style={{ color: billboard.labelColor }}
          className="absolute z-20  w-full 
  duration-500 transition-all  gap-1 h-full flexcenter  -translate-y-1/2  top-1/2 max-md:text-2xl font-bold text-5xl"
        >
          {labelWords.map((e, i) => (
            <m.p
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 * i,
                duration: 0.6,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              initial={{ opacity: 0, y: 100 }}
            >
              {e}
            </m.p>
          ))}
        </div>
      )}

      <m.img
        viewport={{ once: true }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.5,
          duration: 1,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        initial={{ opacity: 0, x: -20 }}
        alt=""
        src={billboard.imageUrl}
        className="absolute inset-0 h-full w-full  z-[15] object-contain"
      />
      <m.img
        viewport={{ once: true ,}}
        whileInView={{ opacity: 1, translateY: "0%" }}
        transition={{
          delay: 0.5,
          duration: 1,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        initial={{ opacity: 0, translateY: "50%" }}
        alt=""
        height={600}
        width={500}
        src={"/assets/shape-2.png"}
        className=" absolute right-0 top-1/4 w-fit !h-full z-10 object-contain"
      />

      <m.img
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 1,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        initial={{ opacity: 0, y: "-50%" }}
        alt=""
        height={600}
        width={500}
        src={"/assets/shape-1.png"}
        className=" absolute left-0 w-fit  top-1/4 !h-full  ma]   z-10 object-contain"
      />
    </div>
  );
};

export default BillBoard;
