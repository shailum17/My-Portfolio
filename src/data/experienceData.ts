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
    location: "Amity University Madhya Pradesh",
    skills: ["Graphic Design", "Social Media Graphic Design"],
    image: "/assets/Internship/amity_coding_club_logo.jpeg",
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
    image: "/assets/Internship/expose-trendze-logo.png",
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
    image: "/assets/Internship/prodigy_infotech_logo.jpeg",
  },
  {
    id: 4,
    title: "Student Ambassador",
    company: "LetsUpgrade",
    type: "Part-time",
    period: "Oct 2023 - Nov 2023 · 2 mos",
    location: "Remote",
    image: "/assets/Internship/letsupgrade.webp",
  },
];

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Zero Trust Cyber Associate (ZTCA)",
    issuer: "",
    date: "Feb 23rd, 2023",
  },
  {
    id: 2,
    title: "Fortinet Certified Fundamentals in Cybersecurity",
    issuer: "",
    date: "Oct 24th, 2023",
  },
  {
    id: 3,
    title: "Certificate of Participation – HackIITK Hackathon 2025, IIT Kanpur",
    issuer: "",
    date: "Feb 18th, 2025",
  },
];
