"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { InterviewAIssist } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionSection from "./_components/QuestionSection";
import RecordSection from "./_components/RecordSection";

type Props = { params: { interviewId: string } };

type MockInterviewQuestion = {
  question: string;
  answer: string;
};

const StartInterview = (props: Props) => {
  const [interviewData, setInterviewData] = useState<any>(null);
  const [mockInterviewQue, setMockInterviewQue] = useState<
    MockInterviewQuestion[]
  >([]);
  const [activeQuestionState, setActiveQuestionState] = useState<number>(0);

  useEffect(() => {
    const getInterviewDetails = async () => {
      const result = await db
        .select()
        .from(InterviewAIssist)
        .where(eq(InterviewAIssist.mockId, props.params.interviewId));

      const getJsonMockResponse = JSON.parse(result[0].MockRes);
      setMockInterviewQue(getJsonMockResponse);
      setInterviewData(result[0]);
    };

    getInterviewDetails();
  }, [props.params.interviewId]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Questions */}
        <QuestionSection
          mockInterviewQue={mockInterviewQue}
          activeQuestionState={activeQuestionState}
          setActiveQuestionState={setActiveQuestionState}
          interviewId={props.params.interviewId}
        />
        {/* Audio and Video recording */}
        <RecordSection
          mockInterviewQue={mockInterviewQue}
          activeQuestionState={activeQuestionState}
          interviewData={interviewData}
        />
      </div>
    </div>
  );
};

export default StartInterview;
