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
    title: "Front End Web Development",
    company: "Edunet Foundation",
    type: "Internship",
    period: "August, 2025 - September, 2025",
    location: "Remote",
    skills: ["Web Development", "Landing Page Development", "HTML", "CSS", "JavaScript", "Responsive Design"],
    image: "/assets/Internship/Edunet-Foundation.png",
  },
  {
    id: 2,
    title: "Web Development Intern",
    company: "Vault of Code",
    type: "Internship",
    period: "August 2025 · 1 Months",
    location: "Remote",
    skills: ["Web Development", "Landing Page Development", "HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
    image: "/assets/Internship/vaultofcode.png",
  },
   {
    id: 3,
    title: "Graphic Designer",
    company: "Amity Coding Club",
    type: "Full-time",
    period: "Apr 2023 - Oct 2024 · 1 yr 7 mos",
    location: "Amity University Madhya Pradesh",
    skills: ["Graphic Design", "Social Media Graphic Design"],
    image: "/assets/Internship/amity_coding_club_logo.jpeg",
  },
  {
    id: 4,
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
    id: 5,
    title: "Intern",
    company: "Prodigy InfoTech",
    type: "Internship",
    period: "Jul 2024 - Jul 2024 · 1 mo",
    location: "Remote",
    skills: ["Python", "Cybersecurity Enthusiast"],
    link: "https://github.com/shailum17/Prodigy-Cyber-Security-Internahip",
    image: "/assets/Internship/prodigy_infotech_logo.jpeg",
  },
  {
    id: 6,
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
    "title": "Hack IITK",
    "issuer": "IIT Kanpur",
    "date": "February 2025",
    "image": "/assets/certificates/HACK-IITK-Certificate.svg"
  },
    {
      id: 2,
    "title": "Zscaler Cybersecurity Fundamentals Associate",
    "issuer": "Zscaler Academy",
    "date": "February 2024",
    "image": "/assets/certificates/Ascaler CyberSecurity Fundamentals Associates.svg"
  },
  {
    id: 3,
    "title": "Zscaler Zero Trust Associate (ZTCA)",
    "issuer": "Zscaler Academy",
    "date": "February 2024",
    "image": "/assets/certificates/Zero Trust Cyber Associate (ZTCA).svg"
  },
  {
    id: 4,
    "title": "Front End Web Development",
    "issuer": "EdunetFoundation",
    "date": "September 2025",
    "image": "/assets/certificates/AICTE_B3_PD_2001-3491-727.svg"
  }
];
