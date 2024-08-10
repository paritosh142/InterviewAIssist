"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const Header = (props: Props) => {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  });

  return (
    <div className="bg-gray-800 flex items-center p-2 justify-between ">
      <Link href={"/"}>
        <Image src="/logo.png" alt="logo" width={80} height={80} />
      </Link>
      <ul className="hidden md:flex ml-4 space-x-4 text-slate-300   ">
        <li
          className={`hover:text-purple-400 hover:font-bold transition-all cursor-pointer " 
          ${path == "/dashboard" && "text-purple-400 font-bold"} `}
        >
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li
          className={`hover:text-purple-400 hover:font-bold transition-all cursor-pointer " 
          ${path == "/dashboard/questions" && "text-purple-400 font-bold"} `}
        >
          Questions
        </li>
        <li
          className={`hover:text-purple-400 hover:font-bold transition-all cursor-pointer " 
          ${path == "/dashboard/upgrade" && "text-purple-400 font-bold"} `}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-purple-400 hover:font-bold transition-all cursor-pointer " 
          ${path == "/dashboard/how" && "text-purple-400 font-bold"} `}
        >
          How it Works?
        </li>
      </ul>

      <div>
        <div className="inline-flex items-center border border-slate-300 rounded-full p-1">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
