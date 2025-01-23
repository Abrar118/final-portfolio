"use client";
import React from "react";

const Footer = () => {
  return (
    <div className="p-4 text-center justify-center text-xs text-neutral-500">
      <span className="font-semibold">{new Date().getFullYear()} </span>
      &#8212; Built by <span className="text-chart2">Abrar Mahir Esam</span>
    </div>
  );
};

export default Footer;
