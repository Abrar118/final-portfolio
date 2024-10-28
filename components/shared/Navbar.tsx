"use client";

import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiEnvelope,
} from "react-icons/hi2";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export const navMenu = [
  { name: "home", path: "/", icon: <HiHome /> },
  { name: "profile", path: "/profile", icon: <HiUser /> },
  { name: "skills", path: "/skills", icon: <HiRectangleGroup /> },
  { name: "projects", path: "/projects", icon: <HiViewColumns /> },
  {
    name: "contact",
    path: "/contact",
    icon: <HiEnvelope />,
  },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const [theme, setCurrentTheme] = useState("dark");

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav
      className=" flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 
    mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen"
    >
      <div
        className=" flex w-full xl:flex-col items-center justify-between xl:justify-center 
      gap-y-10 px-4 md:px-40 xl:px-0 h-[80px] xl:h-max py-8 bg-foreground/10 backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full"
      >
        {navMenu.map((item, index) => {
          return (
            <Link
              className={`${
                item.path === pathname && "text-chart5"
              } relative flex items-center group hover:text-chart5 transition-all duration-300`}
              key={item.path}
              href={item.path}
            >
              <div className=" absolute pr-14 right-0 hidden xl:group-hover:flex">
                <div className=" bg-card-foreground relative flex text-primary items-center p-[6px] rounded-[3px]">
                  <div className=" text-[12px] text-card leading-none font-semibold capitalize">
                    {item.name}
                  </div>

                  {/* triangle */}
                  <div
                    className=" border-solid border-l-card-foreground border-l-8 border-y-transparent 
                  border-y-[6px] border-r-0 absolute -right-2"
                  />
                </div>
              </div>
              {item.icon}
            </Link>
          );
        })}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
            setCurrentTheme(theme === "dark" ? "light" : "dark");
          }}
          className=""
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
