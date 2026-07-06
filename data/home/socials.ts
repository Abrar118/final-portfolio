import type { IconType } from "react-icons/lib";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";
import { SiCodeforces } from "react-icons/si";

export type SocialLink = {
  id: number;
  label: string;
  img: IconType;
  link: string;
};

export const socialMedia: SocialLink[] = [
  {
    id: 1,
    label: "GitHub",
    img: FaGithub,
    link: "https://github.com/Abrar118",
  },
  {
    id: 2,
    label: "LinkedIn",
    img: FaLinkedinIn,
    link: "https://www.linkedin.com/in/abrar118/",
  },
  {
    id: 3,
    label: "Facebook",
    img: FaFacebookF,
    link: "https://www.facebook.com/abrar.mahir.esam/",
  },
  {
    id: 4,
    label: "Instagram",
    img: FaInstagram,
    link: "https://www.instagram.com/orion_abrar/",
  },
  {
    id: 5,
    label: "Codeforces",
    img: SiCodeforces,
    link: "https://codeforces.com/profile/Abrar_Mahir_Esam",
  },
];
