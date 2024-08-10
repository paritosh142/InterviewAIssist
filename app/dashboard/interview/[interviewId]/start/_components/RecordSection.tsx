import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/utils/gemini";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

type ResultType = {
  transcript: string;
  timestamp: number;
};

type InterviewData = {
  id: number;
  mockId: string;
  MockRes: string;
  position: string;
  description: string;
  experience: string;
  createdBy: string;
  createdAt: string;
};

type MockInterviewQuestion = {
  question: string;
  answer: string;
};

type Props = {
  mockInterviewQue: MockInterviewQuestion[];
  activeQuestionState: number;
  interviewData: InterviewData;
};

const RecordSection = (props: Props) => {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const activeQuestion = props.mockInterviewQue[props.activeQuestionState];
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const latestTranscript = results
        .map((result) => result.transcript)
        .join(" ");
      setUserAnswer(latestTranscript);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAns();
    }
  }, [userAnswer, isRecording]);

  const saveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateUserAns = async () => {
    setLoading(true);
    const feedbackPrompt =
      `Question: ${activeQuestion.question} Answer: ${userAnswer} ` +
      `Please provide a rating (out of 10) and feedback as areas of improvement (if any) in JSON format. ` +
      `Keep the response under 8 lines and include only the JSON part.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = await result.response.text();
      const mockJsonRes = responseText
        .replace("```json", "")
        .replace("```", "");
      const feedbackData = JSON.parse(mockJsonRes);

      await db.insert(UserAnswer).values({
        mockIdRef: props.interviewData.mockId,
        question: activeQuestion.question,
        correctAnswer: activeQuestion.answer,
        userAns: userAnswer,
        feedback: feedbackData.feedback,
        rating: feedbackData.rating,
        email: user?.primaryEmailAddress?.emailAddress ?? "unknown",
        createdAt: moment().format("DD-MM-YYYY"),
      });

      toast("Your answer is recorded successfully");
      setUserAnswer("");
    } catch (error) {
      toast("Error while saving answer, please try again");
    } finally {
      setResults([]);
      setLoading(false);
    }
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="flex flex-col my-8 justify-center items-center">
      <div className="p-7 bg-purple-300 rounded-lg">
        {isRecording ? (
          <Webcam
            audio={true}
            mirrored={true}
            style={{ height: 400, width: "100%", zIndex: 10 }}
          />
        ) : (
          <Image src={"/webcam1.webp"} alt="WebCam" width={300} height={300} />
        )}
      </div>
      <Button
        disabled={loading}
        onClick={saveUserAnswer}
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg"
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
    </div>
  );
};

export default RecordSection;
