"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/gemini";
import { LoaderPinwheel } from "lucide-react";
import { db } from "@/utils/db";
import { InterviewAIssist } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

type Props = {};

const AddNewInterview = (props: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const InputPrompt =
      "As a recruiter, given the following job details: Job Position: " +
      jobPosition +
      " ; Job Description/Tech Stack: " +
      description +
      " ; Experience (in years): " +
      experience +
      ", please generate 5 interview questions along with their answers in JSON format.NOTE: Please make sure the questions are relevant to the job position and the tech stack mentioned and make it look like the relevant questions are asked in a real interview. Also make sure apart from the json part there is nothing more like the explanation of the questions, any note anything I just want the json part only not anything else!!";

    const result = await chatSession.sendMessage(InputPrompt);

    const JsonInterviewResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log(JSON.parse(JsonInterviewResponse));
    setJsonResponse(JsonInterviewResponse);

    if (JsonInterviewResponse) {
      const InterviewResponse = await db
        .insert(InterviewAIssist)
        .values({
          mockId: uuidv4(),
          MockRes: JsonInterviewResponse,
          position: jobPosition,
          description: description,
          experience: experience,
          createdAt: moment().format("DD-MM-YYYY"),
          createdBy: user?.primaryEmailAddress?.emailAddress ?? "unknown",
        })
        .returning({ MockId: InterviewAIssist.mockId });

      if (InterviewResponse) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + InterviewResponse[0]?.MockId);
      }
    } else {
      console.log("No response");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-purple-200 hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  {/* Role */}
                  <div className="mt-6">
                    <label className="font-bold">Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Data Engineer"
                      required
                      className="mt-2"
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <label className="font-bold">
                      Job Description/Tech Stack
                    </label>
                    <Textarea
                      placeholder="Ex. NodeJs, MongoDB, ExpressJs ..."
                      className="mt-2"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  {/* Experience */}
                  <div className="mt-6">
                    <label className="font-bold">Experience (Years)</label>
                    <Input
                      placeholder="Ex. 2 (Years)"
                      type="number"
                      className="mt-2"
                      max="40"
                      required
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-3">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-300 hover:text-slate-200 text-slate-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <LoaderPinwheel className="mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
