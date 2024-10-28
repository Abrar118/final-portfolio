import React from "react";
import { BentoGridItem, BentoGrid } from "../ui/bento-grid";

export const gridItems = [
  {
    id: 1,
    title: "I prioritize clean code and user experience for ensuing a seamless interface.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh] text-white",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.jpg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with across time zones",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2 bg-custom-gradient-chart1",
    imgClassName: "",
    titleClassName: "justify-start text-white",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2 bg-custom-gradient-chart2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Specialist on Codeforces and well verse in Problem Solving",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1 bg-custom-gradient-chart3",
    imgClassName: "",
    titleClassName: "justify-start text-white",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title: "Currently building a File Explorer in Rust an .Net",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2 bg-custom-gradient-chart4",
    imgClassName: "absolute right-0 bottom-0",
    titleClassName: "justify-center md:justify-start lg:justify-center max-w-72 text-white",
    img: "/rust-bg1.jpg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center text-white",
    img: "",
    spareImg: "",
  },
];

const GridLayout = () => {
  return (
    <section id="about">
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={item.id}
            title={item.title}
            description={item.description}
            // remove icon prop
            // remove original classname condition
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default GridLayout;
