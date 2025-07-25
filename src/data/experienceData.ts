export interface Internship {
  id: number;
  title: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description?: string;
  skills?: string[];
  link?: string;
  image?: string;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  link?: string;
  image?: string;
}

export const internships: Internship[] = [
  {
    id: 1,
    title: "Graphic Designer",
    company: "Amity Coding Club",
    type: "Full-time",
    period: "Apr 2023 - Oct 2024 · 1 yr 7 mos",
    location: "Remote",
    skills: ["Graphic Design", "Social Media Graphic Design"],
    image: "/assets/internships/amity-coding-club.png",
  },
  {
    id: 2,
    title: "Graphic Design Intern",
    company: "EXPOSE TRENDZE Manufacturer of Leather Footwear",
    type: "Internship",
    period: "Apr 2024 - Sep 2024 · 6 mos",
    location: "Gwalior, Madhya Pradesh, India · Remote",
    skills: ["Social Media Graphic Design", "Information Graphics"],
    link: "https://drive.google.com/drive/folders/creative-design-work",
    image: "/assets/internships/expose-trendze.png",
  },
  {
    id: 3,
    title: "Intern",
    company: "Prodigy InfoTech",
    type: "Internship",
    period: "Jul 2024 - Jul 2024 · 1 mo",
    location: "Remote",
    skills: ["Python", "Cybersecurity"],
    link: "https://github.com/shailum17/Prodigy-Cyber-Security-Internahip",
    image: "/assets/internships/prodigy-infotech.png",
  },
  {
    id: 4,
    title: "Student Ambassador",
    company: "LetsUpgrade",
    type: "Part-time",
    period: "Oct 2023 - Nov 2023 · 2 mos",
    location: "Remote",
    image: "/assets/internships/letsupgrade.png",
  },
];

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "2023",
    link: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
    image: "/assets/certifications/ceh.png",
  },
  {
    id: 2,
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    date: "2024",
    link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    image: "/assets/certifications/aws.png",
  },
];
