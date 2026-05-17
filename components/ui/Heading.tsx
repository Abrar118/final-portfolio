import type React from "react";
import { twMerge } from "tailwind-merge";

export const Heading = ({
  className,
  children,
  as: Tag = "h1",
}: {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}) => {
  return (
    <Tag
      className={twMerge(
        "font-heading text-base md:text-xl lg:text-4xl font-semibold text-foreground",
        className
      )}
    >
      {children}
    </Tag>
  );
};
