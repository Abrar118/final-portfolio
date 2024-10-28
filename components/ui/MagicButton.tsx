"use client";
import type React from "react";
const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
  callResume,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
  callResume?: boolean;
}) => {
  return (
    <button
      className="relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] focus:outline-none"
      onClick={() => {
        if (callResume) {
          window.open(
            "https://drive.google.com/file/d/12_1_g9lBGwI7m-vyNcnTlfdknHULLFJn/view?usp=sharing"
          );
        } else {
          handleClick?.();
        }
      }}
      type="button"
    >
      <span
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
       bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
      />

      {/* remove px-3 py-1, add px-5 gap-2 */}
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
             bg-background px-7 text-sm font-medium text-foreground backdrop-blur-3xl gap-2 ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;