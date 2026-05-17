"use client";

import React from "react";
import Link from "next/link";
import { socialMedia } from "@/data/home/socials";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 pb-24">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {new Date().getFullYear()} — Built by{" "}
          <span className="text-accent font-medium">Abrar Mahir Esam</span>
        </p>

        <div className="flex items-center gap-3">
          {socialMedia.map((info) => (
            <Link
              href={info.link}
              target="_blank"
              key={info.id}
              className="text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              {typeof info.img === "string" ? (
                <img src={info.img} alt="icon" width={16} height={16} />
              ) : (
                <info.img size={16} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
