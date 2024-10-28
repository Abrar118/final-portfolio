"use client";
import React from "react";
import { motion } from "framer-motion";
import Avatar from "./Avatar";
import Avatar2 from "./Avatar2";
import { fadeIn } from "../shared/Transition";

const AvatarSection = () => {
  return (
    <>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        animate="show"
        exit={"hidden"}
        transition={{ duration: 1, ease: "easeInOut" }}
        className=" w-full h-full max-w-[737px] max-h-[678px] absolute 
        -bottom-32 lg:bottom-0 lg:right-[8%]"
      >
        <Avatar />
        <Avatar2 />
      </motion.div>
    </>
  );
};

export default AvatarSection;
