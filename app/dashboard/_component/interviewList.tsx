"use client";

import { db } from "@/utils/db";
import { InterviewAIssist } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItem from "./interviewItem";

type Props = {};

const InterviewList = (props: Props) => {
  const { user } = useUser();

  const [interviewList, setInterviewList] = useState<any>(null);

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    const result = await db
      .select()
      .from(InterviewAIssist)
      .where(
        eq(InterviewAIssist.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(InterviewAIssist.id));

    console.log(result);

    setInterviewList(result);
  };

  return (
    <div>
      <h2 className="text-2xl text-gray-200  mt-8">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {interviewList &&
          interviewList.map((item: any, index: number) => (
            <InterviewItem interview={item} key={index} />
          ))}
      </div>
    </div>
  );
};

export default InterviewList;
