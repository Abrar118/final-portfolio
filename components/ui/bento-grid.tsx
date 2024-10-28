"use client";
import { useState } from "react";

// Also install this npm i --save-dev @types/react-lottie

import { cn } from "@/lib/utils";

import GridGlobe from "./GridGlobe";
import animationData from "@/data/home/confetti.json";

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
  const leftLists = [
    "NextJs/ Hono",
    "SpringBoot",
    "Axum/ Rust",
    "C/ C++",
    "Golang",
  ];
  const rightLists = ["MongoDB", "PostgreSQL", "Python", "Laravel", "Flutter"];

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
      <div className={"h-full"}>
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
          className={`absolute top-0 left-0 ${
            id === 5 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              //   width={220}
              className="object-cover object-center w-full"
            />
          )}
        </div>

        {/* add title div */}
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
            className={`font-sans text-lg lg:text-3xl max-w-[30rem] font-bold z-10 
              ${id === 1 && "backdrop-filter backdrop-blur-sm rounded-lg p-4"}`}
          >
            {title}
          </div>

          {/* for the github 3d globe */}
          {id === 2 && <GridGlobe />}

          {/* Tech stack list div */}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute right-10 lg:right-20 h-full">
              {/* tech stack lists */}
              <div className="flex flex-col flex-nowrap gap-3 md:gap-3 lg:gap-8 animate-scroll">
                {[...leftLists, ...leftLists].map((item, i) => (
                  <span
                    key={item}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#fff] text-black"
                  >
                    {item}
                  </span>
                ))}
                {/* <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#d1d1d1]" /> */}
              </div>

              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8 animate-scroll-reverse">
                {/* <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#d1d1d1]" /> */}
                {[...rightLists, ...rightLists].map((item, i) => (
                  <span
                    key={item}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#fff] text-black"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
