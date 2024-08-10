import React, { ReactNode } from "react";
import Header from "./_component/header";
import { BackgroundBeams } from "@/components/ui/background-beams";

type Props = { children: ReactNode };

const DashboardLayout = (props: Props) => {
  return (
    <div className="relative  bg-slate-900 h-dvh">
      <Header />
      <div className="relative bg-slate-900   h-100%">
        {/* Add BackgroundBeams here */}
        <BackgroundBeams className="absolute inset-0 z-0" />
        <div className="mx-5 md:mx-20 lg:mx-26 relative z-10">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
