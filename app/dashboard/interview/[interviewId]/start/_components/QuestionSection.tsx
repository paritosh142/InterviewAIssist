import { Lightbulb, Volume2, VolumeX } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type MockInterviewQuestion = {
  question: string;
  answer: string;
};

type Props = {
  mockInterviewQue: MockInterviewQuestion[];
  activeQuestionState: number;
  setActiveQuestionState: (state: number) => void;
  interviewId: string;
};

const QuestionSection = ({
  mockInterviewQue,
  activeQuestionState,
  setActiveQuestionState,
  interviewId,
}: Props) => {
  const activeQuestion = mockInterviewQue[activeQuestionState];
  const [volume, setVolume] = useState(false);

  const textToSpeech = (text: string) => {
    const synth = window.speechSynthesis;
    if (volume) {
      synth.cancel();
      setVolume(false);
    } else {
      const utterThis = new SpeechSynthesisUtterance(text);
      synth.speak(utterThis);
      setVolume(true);
    }
  };

  return (
    <div className="p-5 mt-8 border border-purple-700 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {mockInterviewQue.map((item, index) => (
          <div key={index}>
            <h2
              className={`mb-2 rounded-full bg-secondary text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionState === index
                  ? "bg-purple-600  text-gray-200"
                  : ""
              }`}
            >
              Question #{index + 1}
            </h2>
          </div>
        ))}
      </div>

      {activeQuestion ? (
        <>
          <h2 className="mt-10 text-sm md:text-lg text-gray-200">
            {activeQuestion.question}
          </h2>
          {volume ? (
            <Volume2
              size={32}
              className="text-purple-400 cursor-pointer"
              onClick={() => textToSpeech(activeQuestion.question)}
            />
          ) : (
            <VolumeX
              size={32}
              className="text-purple-400 cursor-pointer"
              onClick={() => textToSpeech(activeQuestion.question)}
            />
          )}

          <div className="flex justify-end gap-6 mb-5   mt-10">
            {activeQuestionState > 0 && (
              <Button
                className="bg-purple-900"
                onClick={() => setActiveQuestionState(activeQuestionState - 1)}
              >
                Prev Question
              </Button>
            )}
            {activeQuestionState != mockInterviewQue?.length - 1 && (
              <Button
                className="bg-purple-900"
                onClick={() => setActiveQuestionState(activeQuestionState + 1)}
              >
                Next Question
              </Button>
            )}
            {activeQuestionState == mockInterviewQue?.length - 1 && (
              <div className="h-6">
                <Link href={`/dashboard/interview/${interviewId}/feedback`}>
                  <span className="relative inline-block float-right px-5 py-2 text-sm font-bold text-gray-200 transition-all duration-300 ease-in-out border-2 border-gray-200 hover:border-purple-400 cursor-pointer fancy group">
                    <span className="text text-base uppercase leading-snug pl-8 transition-all duration-300 ease-in-out text-white group-hover:text-purple-400 group-hover:pl-6">
                      End Interview
                    </span>
                    <span className="absolute top-[-2px] left-[0.625rem] h-0.5 w-6 bg-gray-900 transition-all duration-500 ease-out group-hover:left-[-2px] group-hover:w-0"></span>
                    <span className="absolute bottom-[-2px] right-[1.875rem] h-0.5 w-6 bg-gray-300 transition-all duration-500 ease-out group-hover:right-0 group-hover:w-0"></span>
                    <span className="absolute bottom-[-2px] right-[0.625rem] h-0.5 w-2.5 bg-gray-900 transition-all duration-500 ease-out group-hover:right-0 group-hover:w-0"></span>
                  </span>
                </Link>
              </div>
            )}
          </div>

          <div className="mt-24 border rounded-lg p-5 bg-purple-200">
            <h2 className="flex gap-2 items-center text-purple-400">
              <Lightbulb />
              <strong>Note:</strong>
            </h2>
            <h2 className="mt-2 text-xs md:text-sm">
              Click on Record Answer when you want to answer the question. At
              the end of the interview, we will give you feedback along with the
              correct answer for each question and your answer to compare it!!
            </h2>
          </div>
        </>
      ) : (
        <h2 className="mt-6 text-sm md:text-lg">No question selected.</h2>
      )}
    </div>
  );
};

export default QuestionSection;
