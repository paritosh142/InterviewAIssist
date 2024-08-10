import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_component/addnewinterview";
import InterviewList from "./_component/interviewList";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="p-10   ">
      <h2 className="font-bold text-3xl text-purple-700 ">DashBoard</h2>
      <h2 className="text-slate-600  mt-3">Create and Start your Interview</h2>

      <div className=" grid grid-cols-1 md:grid-cols-3 mt-2 ">
        <AddNewInterview />
      </div>
      <InterviewList />
    </div>
  );
};

export default Dashboard;
