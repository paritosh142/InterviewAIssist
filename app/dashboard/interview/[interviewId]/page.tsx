//@ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { InterviewAIssist } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

type Props = { params: { interviewId: string } };

const Interview = ({ params }: Props) => {
  const [interviewDetails, setInterviewDetails] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    const getInterviewDetails = async () => {
      const result = await db
        .select()
        .from(InterviewAIssist)
        .where(eq(InterviewAIssist.mockId, params.interviewId));
      // @ts-ignore
      setInterviewDetails(result[0]);
    };

    getInterviewDetails();
  }, [params.interviewId]);

  return (
    <div className="py-10 flex flex-col items-center justify-center">
      <h1 className="font-bold  text-gray-200 text-2xl">Let's Get Started</h1>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                width: 400,
                height: 400,
                objectFit: "cover",
                marginTop: 26,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-72 my-5 p-20 bg-purple-200 border rounded-3xl" />
              <Button
                variant="ghost"
                className="w-80 font-bold border border-purple-600 text-gray-300 "
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Webcam and Microphone
              </Button>
            </>
          )}
        </div>

        <div className="mt-10">
          <div className="flex flex-col p-5 border  border-purple-600 rounded-md gap-3">
            <h2 className="text-lg text-gray-400">
              <strong className="text-gray-300">Job Position/Job Role: </strong>

              {interviewDetails?.position}
            </h2>
            <h2 className="text-lg text-gray-400 ">
              <strong className="text-gray-300">Job Description: </strong>
              {interviewDetails?.description}
            </h2>
            <h2 className="text-lg text-gray-400">
              <strong className="text-gray-300">Experience: </strong>
              {interviewDetails?.experience} Years
            </h2>
          </div>
          <div className="mt-10 border rounded-lg p-5 bg-purple-200">
            <h2 className="flex gap-2 items-center text-purple-400">
              <Lightbulb />
              <strong>Information:</strong>
            </h2>
            <h2 className="mt-2 text-xs md:text-sm  ">
              Enable Web Cam and Microphone to start your AI generated
              Interview. It has 5 questions which you can answer and at last you
              will get the report in which it shows your rating and give you
              feedback based on your responses. NOTE: We never record your
              video, Web cam access can be disabled at any time.
            </h2>
          </div>
        </div>
      </div>
      <div className="mt-10  ">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className="bg-purple-900 hover:bg-gray-200 hover:text-gray-900">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
