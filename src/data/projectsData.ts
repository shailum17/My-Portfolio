export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  categories: string[];
  period: string;
  highlights: string[];
  links?: {
    github?: string;
    live?: string;
  };
  image?: string; // Added image field
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Blockchain-Based Voting System",
    description: "Secure voting platform with biometric authentication and real-time dashboard",
    technologies: ["React", "Solidity", "MongoDB", "JWT", "Hardhat"],
    categories: ["blockchain", "web"],
    period: "May - June 2025",
    highlights: [
      "Biometric authentication",
      "Role-based access control",
      "On-chain vote tracking",
      "Real-time dashboard"
    ],
    links: {
      github: "https://github.com/shailum17/BlockChain-Based-Voting-System-with-Biometric-Auth",
      live: "https://block-chain-based-voting-system-wit-rho.vercel.app/"
    },
    image: "/assets/projects/blockchain.svg"
  },
  {
    id: 2,
    title: "TravelQuest AI Planner",
    description: "AI-powered travel planning website with personalized itineraries. This is a collaborative project.",
    technologies: ["Node.js", "Express", "Google Maps API", "OpenWeather API"],
    categories: ["ai", "web"],
    period: "Oct - Dec 2024",
    highlights: [
      "AI-driven route optimization",
      "Real-time API integrations",
      "Personalized travel predictions",
      "AI chatbot assistance"
    ],
    links: {
      github: "https://github.com/AshishBytes/TravelQuest",
      live: "https://ashishbytes.github.io/TravelQuest/"
    },
    image: "/assets/projects/travel.svg"
  },
  {
    id: 3,
    title: "imageOmania Gallery",
    description: "Pinterest-style creative design gallery and search engine",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    categories: ["design", "web"],
    period: "Feb - July 2025",
    highlights: [
      "Responsive web gallery",
      "Advanced search functionality",
      "Animated UI elements",
      "Image upload feature"
    ],
    links: {
      github: "https://github.com/shailum17/Image-O-Mania",
      live: "https://imageomania-flame-five.vercel.app/"
    },
    image: "/assets/projects/imageOmania.svg"
  }
];
