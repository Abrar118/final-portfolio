"use client";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

// Also install this npm i --save-dev @types/react-lottie
import Lottie from "react-lottie";

import { cn } from "@/lib/utils";

import { BackgroundGradientAnimation } from "./background-gradient-animation";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/home/confetti.json";
import MagicButton from "./MagicButton";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  //   remove unecessary things here
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["NextJs", "SpringBoot", "Axum"];
  const rightLists = ["MongoDB", "PostgreSQL", "Hono"];

  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "abrarme118@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div
      className={cn(
        `row-span-1 relative overflow-hidden rounded-3xl border border-foreground/10 group/bento 
        hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4
        backdrop-filter backdrop-blur-lg dark:bg-none`,
        className
      )}
    >
      {/* add img divs */}
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              //   width={220}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>

        {id === 6 && (
          <BackgroundGradientAnimation>
            <div
              className={cn(
                titleClassName,
                "group-hover/bento:translate-x-2 transition duration-200 relative flex flex-col items-center px-5 p-5 lg:p-10 z-50"
              )}
            >
              <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-foreground z-10">
                {description}
              </div>

              <div
                className={
                  "font-sans text-lg lg:text-3xl max-w-[30rem] font-bold z-10"
                }
              >
                {title}
              </div>

              <div className="mt-5 relative">
                <div
                  className={`absolute -bottom-5 -right-20 ${
                    copied ? "block" : "block"
                  }`}
                >
                  {/* <img src="/confetti.gif" alt="confetti" /> */}
                  <Lottie options={defaultOptions} height={200} width={400} />
                </div>

                <MagicButton
                  title={copied ? "Email is Copied!" : "Copy my email address"}
                  icon={<IoCopyOutline />}
                  position="left"
                  handleClick={handleCopy}
                  otherClasses="!bg-[#161A31] text-white"
                />
              </div>
            </div>
          </BackgroundGradientAnimation>
        )}

        {/* add title div */}
        {id !== 6 && (
          <div
            className={cn(
              titleClassName,
              "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
            )}
          >
            <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-gray-200 z-10">
              {description}
            </div>

            <div
              className={
                "font-sans text-lg lg:text-3xl max-w-[30rem] font-bold z-10"
              }
            >
              {title}
            </div>

            {/* for the github 3d globe */}
            {id === 2 && <GridGlobe />}

            {/* Tech stack list div */}
            {id === 3 && (
              <div className="flex gap-1 lg:gap-5 w-fit absolute right-10 lg:right-20">
                {/* tech stack lists */}
                <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                  {leftLists.map((item, i) => (
                    <span
                      key={item}
                      className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E] text-white"
                    >
                      {item}
                    </span>
                  ))}
                  <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]" />
                </div>
                <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                  <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]" />
                  {rightLists.map((item, i) => (
                    <span
                      key={item}
                      className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E] text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
