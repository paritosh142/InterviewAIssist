import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = { interview: any };

const InterviewItem = (props: Props) => {
  return (
    <div className="border shadow-sm rounded-lg p-3 mt-3">
      <h2 className="font-bold text-purple-500">{props.interview?.position}</h2>
      <h2 className="text-sm text-gray-300">
        {props.interview?.experience} years of Experience
      </h2>
      <h2 className="text-xs text-gray-500 ">
        Created:{props.interview?.createdAt}
      </h2>

      <div className=" flex justify-between mt-2 ">
        <Link
          href={"/dashboard/interview/" + props.interview?.mockId + "/feedback"}
        >
          <Button variant="ghost" className="border bg-white text-gray-900 ">
            Feedback
          </Button>
        </Link>
        <Link href={"/dashboard/interview/" + props.interview?.mockId}>
          <Button className="bg-purple-400 text-gray-950 hover:text-slate-50 ">
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewItem;
