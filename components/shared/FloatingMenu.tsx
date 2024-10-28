import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconUser,
  IconHome2,
  IconColumns,
} from "@tabler/icons-react";
import { Sun } from "lucide-react";

export function FloatingMenu() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Profile",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/profile",
    },
    {
      title: "Skills",
      icon: (
        <IconColumns className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/skills",
    },
    {
      title: "Projects",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/projects",
    },
    {
      title: "Contact",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/contact",
    },

    {
      title: "Theme",
      icon: (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ),
      href: "#",
    },
  ];

  return (
    <div className="">
      <FloatingDock items={links} />
    </div>
  );
}
