"use client";

import {
  FacebookIcon,
  InstagramIcon,
  Linkedin,
  MailOpenIcon,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion as m } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const servicesData = [
    {
      title: "Fast & Secure Delivery",
      desc: "Tell about your service.",
      icon: "/assets/service1.png",
    },

    {
      title: "Money Back Guarantee",
      desc: "Within 10 days.",
      icon: "/assets/service2.png",
    },

    {
      title: "24 Hour Return Policy",
      desc: "No question ask.",
      icon: "/assets/service3.png",
    },
    {
      title: "Pro Quality Support",
      desc: "24/7 Live support.",
      icon: "/assets/service4.png",
    },
  ];
  const socialLinks = [
    {
      name: "facebook",
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/profile.php?id=100070339100609",
    },
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      link: "https://www.instagram.com/younesmohamed_77",
    },
    {
      name: "Twitter",
      icon: <TwitterIcon />,
      link: "https://twitter.com/younesmed_77",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      link: "https://twitter.com/younesmed_77",
    },
  ];

  return (
    <div className="max-w-7xl space-y-10  mt-8 mx-auto">
      <div className="relative p-32 mb-14 max-md:p-6 !text-white  w-full rounded-2xl ">
        <Image
          alt=""
          fill
          src={"/assets/settler.jpg"}
          className=" rounded-2xl object-cover "
        />
        <div className="z-10 relative">
          <div className="relative space-y-4  mb-16 ">
            <div className="flex text-blue-600 items-center gap-5">
              <div className="h-10 w-10 flexcenter rounded-full bg-blue-600">
                <MailOpenIcon className="h-6 w-6  !text-white " />
              </div>

              <div className="font-bold text-xl">News Letter</div>
            </div>
            <div className="font-bold text-5xl max-sm:text-3xl">
              Get monthly Updates
            </div>
          </div>
          <div className="flexcenter max-sm:justify-start max-sm:flex-wrap  max-w-2xl  gap-6">
            <div className="w-full gap-4 h-full pl-8 rounded-xl bg-background  flexcenter">
              <Image
                className=" h-[25px] w-[25px] object-cover"
                alt=""
                src={"/assets/send-mail.png"}
                height={20}
                width={20}
              />
              <Input
                placeholder="example@domain.com"
                type="text"
                className="  !border-none text-foreground !outline-none h-[60px]  !ring-0 !shadow-none"
              />
            </div>
            <Button className="h-[60px] shadow-xl rounded-xl px-8 hover:scale-110 max-md:text-lg active:scale-95 !bg-opacity-100 transition-all text-2xl">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-4">
        {servicesData.map((e, i) => (
          <m.div
            key={i}
            initial={{ scale: 0, rotateZ: 30 }}
            whileInView={{ rotateZ: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,

              delay: i * 0.3,
            }}
            viewport={{ once: true }}
            className="flex items-center py-7 cursor-pointer rounded-2xl backdrop-blur-md 
            hover:translate-x-1 duration-75 hover:-translate-y-1 hover:shadow-2xl gap-4"
          >
            <Image
              src={e.icon}
              className=" object-contain  h-[60px] w-[60px]"
              height={50}
              width={50}
              alt={e.desc}
            />
            <div>
              <h2 className=" font-bold mb-1 text-xl">{e.title}</h2>
              <p>{e.desc}</p>
            </div>
          </m.div>
        ))}
      </div>
      <div className="mt-6 flexcenter max-lg:space-y-4 pb-4 max-lg:flex-col">
        <div className="flex-1 flexcenter gap-4 py-4">
          {socialLinks.map((e, i) => (
            <Link
              href={e.link}
              key={i}
              aria-label={`link to my ${e.name}`}
              className="group relative p-2 rounded-full "
            >
              <div className="absolute  z-[2] inset-0 rounded-full bg-cyan-500 scale-0 transition-all group-hover:scale-100 "></div>
              <div className="relative z-10  transition-all group-hover:text-white">
                {e.icon}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex-1 py4 text-foreground ">
          {" "}
          © 2024. All rights reserved .{" "}
        </div>
        <div className="flex-1 flex gap-4 py4">
          <p>Accept </p>
          <Image
            alt=""
            src={"/assets/cart-1.png"}
            height={40}
            width={40}
            className=" h-[30px] w-[30px] object-contain"
          />
          <Image
            alt=""
            src={"/assets/cart-2.png"}
            height={40}
            width={40}
            className=" h-[30px] w-[30px]  object-contain"
          />
          <Image
            alt=""
            src={"/assets/cart-5.png"}
            height={40}
            width={40}
            className=" h-[30px] w-[30px]  object-contain"
          />
          <Image
            alt=""
            src={"/assets/cart-4.ico"}
            height={40}
            width={40}
            className=" h-[30px] w-[30px]  object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
