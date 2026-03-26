export interface Award {
  lucideIcon: string;
  iconColor: string;
  borderColor: string;
  title: string;
  subtitle: string;
}

export const awards: Award[] = [
  {
    lucideIcon: "medal",
    iconColor: "#f97316",
    borderColor: "rgba(249,115,22,0.25)",
    title: "2x 19th Place ICPC",
    subtitle: "International Programming Contest '17 & '18",
  },
  {
    lucideIcon: "award",
    iconColor: "#14b8a6",
    borderColor: "rgba(20,184,166,0.25)",
    title: "2x 3rd Prize MCPC",
    subtitle: "Myanmar Collegiate Programming Contest '18 & '19",
  },
  {
    lucideIcon: "smartphone",
    iconColor: "#3b82f6",
    borderColor: "rgba(59,130,246,0.25)",
    title: "2nd Place Qualifier",
    subtitle: "Samsung Tech Institute: Mobile App Training 2017",
  },
  {
    lucideIcon: "globe",
    iconColor: "#eab308",
    borderColor: "rgba(234,179,8,0.25)",
    title: "Participant, TFSCALE",
    subtitle: "Specialists' Exchange Singapore & Myanmar 2019",
  },
];
