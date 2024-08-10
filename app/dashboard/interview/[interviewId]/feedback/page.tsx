//@ts-nocheck
"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Frown, Smile, PartyPopper } from "lucide-react";
import Image from "next/image";

type Props = { params: { interviewId: string } };

const Feedback = (props: Props) => {
  const [feedbackList, setFeedbackList] = useState<any>(null);
  const [totalScore, setTotalScore] = useState<number>(0);

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, props.params.interviewId))
      .orderBy(UserAnswer.id);
    console.log(result);

    // Calculate the total score
    const score = result.reduce(
      (acc: number, item: any) => acc + Number(item.rating),
      0
    );
    setTotalScore(score);
    setFeedbackList(result);
  };

  // Determine the feedback message based on the total score
  let feedbackMessage = "";
  if (totalScore >= 35) {
    feedbackMessage = (
      <span className="flex items-center justify-center">
        Excellent performance! You've likely cleared the interview.
        <PartyPopper className="ml-2 h-6 w-6 text-green-500" />{" "}
        {/* Party-popper icon added */}
      </span>
    );
  } else if (totalScore >= 15 && totalScore < 35) {
    feedbackMessage = (
      <span className="flex items-center justify-center">
        Good effort! You're on the right track, but there's room for
        improvement.
        <Smile className="ml-2 h-6 w-6 text-yellow-500" />{" "}
        {/* Smile icon added */}
      </span>
    );
  } else {
    feedbackMessage = (
      <span className="flex items-center justify-center">
        Poor performance. Unfortunately, you did not qualify.
        <Frown className="ml-2 h-6 w-6 text-red-500" /> {/* Frown icon added */}
      </span>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-3xl text-purple-500 text-center pt-10">
        Here is your interview feedback
      </h2>
      {feedbackList?.length == 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <Image
            src={"/Not-found.png"}
            alt="unavailable"
            width={300}
            height={300}
          />
          <h2 className="font-bold text-2xl text-gray-300 mt-5 text-center ">
            No Interview Feedback Record Found
          </h2>
        </div>
      ) : (
        <div className="text-center mt-5">
          <h2
            className={`text-3xl font-bold ${
              totalScore >= 35
                ? "text-green-300"
                : totalScore >= 15
                ? "text-yellow-300"
                : "text-red-300"
            }`}
          >
            {feedbackMessage}
          </h2>
          <h2 className="text-gray-300 text-lg my-3">
            Your Overall Interview Rating:{" "}
            <strong className="border-y-">{totalScore}/50</strong>
          </h2>
          <h2 className="mt-5 text-gray-300">
            Find below interview questions with correct answers, your answers,
            and feedback for improvement:
          </h2>
        </div>
      )}

      {feedbackList &&
        feedbackList.map((item: any, index: number) => (
          <Collapsible key={index}>
            <CollapsibleTrigger className="p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full">
              <span>
                Q{index + 1}. {item.question}
              </span>
              <span>
                <ChevronsUpDown className="h-10 w-10 text-gray-500" />
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2 className="text-red-500 p-2 border rounded-lg">
                  <strong>Rating:</strong> {item.rating}
                </h2>
                <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                  <strong>Your Answer: </strong>
                  {item.userAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                  <strong>Correct Answer: </strong>
                  {item.correctAnswer}
                </h2>
                <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                  <strong>Feedback: </strong>
                  {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
    </div>
  );
};

export default Feedback;
