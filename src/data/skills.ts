export interface Skill {
  name: string;
  icon: string;          // simple-icons name, or empty for fallback
  color: string;         // brand hex color (dark mode)
  lightColor?: string;   // override for light mode
  fallbackLetter?: string;
  fallbackBg?: string;   // background for fallback letter badge
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    skills: [
      { name: "React.js",     icon: "react",       color: "#61dafb" },
      { name: "Next.js",      icon: "nextdotjs",   color: "#ffffff", lightColor: "#000000" },
      { name: "Astro.js",     icon: "astro",       color: "#ff5d01" },
      { name: "Tailwind CSS", icon: "tailwindcss", color: "#06b6d4" },
      { name: "ShadcnUI",     icon: "",            color: "#ffffff", fallbackLetter: "S", fallbackBg: "#18181b" },
      { name: "Pencil",       icon: "",            color: "#7c3aed", fallbackLetter: "P", fallbackBg: "#7c3aed" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js",    icon: "nodedotjs",  color: "#5fa04e" },
      { name: "Express.js", icon: "express",    color: "#ffffff", lightColor: "#000000" },
      { name: "Nest.js",    icon: "nestjs",     color: "#e0234e" },
      { name: "PHP",      icon: "php",       color: "#777bb4" },
      { name: "Laravel",  icon: "laravel",   color: "#ff2d20" },
      { name: "Python",   icon: "python",    color: "#3776ab" },
    ],
  },
  {
    label: "Cloud & Infrastructure",
    skills: [
      { name: "AWS",          icon: "amazonwebservices", color: "#ff9900" },
      { name: "DigitalOcean", icon: "digitalocean",      color: "#0080ff" },
      { name: "Google Cloud", icon: "googlecloud",       color: "#4285f4" },
    ],
  },
];
