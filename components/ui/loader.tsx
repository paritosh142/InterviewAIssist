import React from "react";

const Loader: React.FC = () => {
  return (
    <svg
      className="w-32 h-48"
      viewBox="0 0 100 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        strokeDasharray: 600,
        strokeDashoffset: 600,
        animation: "draw 1.5s linear infinite, move 2s linear infinite",
      }}
    >
      <path
        d="M50 10 L40 40 L60 40 L50 10 Z M50 40 L35 75 L35 110 L50 130 L65 110 L65 75 L50 40 Z"
        stroke="white"
        strokeWidth="4"
        fill="none"
      />
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes move {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </svg>
  );
};

export default Loader;
