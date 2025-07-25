export interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: number;
  date: string;
  link?: string;
  image?: string;
  tags?: string[];
  description?: string;
}

export const publicationsData: Publication[] = [
  {
    id: 1,
    title: "Mobile Security – Light on Security Threats",
    authors: "Shailendra Mourya",
    venue: "IJETAE (International Journal of Emerging Technology and Advanced Engineering)",
    year: 2024,
    date: "Jun, 2nd 2024",
    link: "https://www.ijetae.com/files/Volume14Issue2/IJETAE_0224_04.pdf",
    image: "/assets/publication/mobile security.jpeg",
    tags: ["Security", "Mobile", "Survey"],
    description: `The smartphone has evolved into a little computer that can perform all of our daily tasks, including social media use, email correspondence, and banking. The use of smartphones is also increasing quickly. Because there are more and more connected biases in the network field every day, cyberattacks are also increasing. All connected device linked to the Internet has become the target of cyberattacks as new types of network attacks have emerged. Consequently, network data security cannot be disregarded. Not only is operating system and device usage directly related to mobile security, but internet and communication with stoners, data encryption, and the sequestration consciousness of drug users are also important factors. the primary donation and the study's conclusionare to collect information about mobile security, Mobile hazards and network security in the present and future. research in this area on mobile vulnerabilities, attack types, and malware. Every mobile device has a number of vulnerabilities due to different features and terrain. Cybersecurity has become crucial for the service, associations, and specific computer users. Since the advent of the internet, security has become a top priority, and the development of safety technology is informed by security history. Positive safety pitfalls are made possible by the net shape itself. But only if the Internet's design is altered. will decrease the potential attacks that could be made across the network.`
  },
  {
    id: 2,
    title: "Rose Plant Disease Detection Using Image Processing and Machine Learning",
    authors: "Shailendra Mourya",
    venue: "Springer",
    year: 2023,
    date: "Nov, 23rd 2023",
    link: "https://link.springer.com/chapter/10.1007/978-3-031-58953-9_6",
    image: "/assets/publication/rose plant.svg",
    tags: ["Image Processing", "Machine Learning", "Agriculture"],
    description: `The first step in preventing reductions in agricultural product output and quantity is to identify plant diseases. The research on plant diseases refers to examinations of patterns on the plant that may be observed with the naked eye. A vital component of sustainable agriculture is the observation of plant health and the identification of disease. The manual monitoring of plant diseases is highly challenging. It necessitates a huge amount of work, knowledge of plant diseases, and lengthy processing times. So, by taking photos of the leaves and comparing them to data sets, image processing is utilized to find plant illnesses. It is incredibly challenging to physically screen plant sicknesses. It requires a colossal measure of work, information on plant illnesses, and extended handling times. In this research, the diagnosis of rose plant diseases is critical for preventing yield and quantity losses in agricultural products. Plant disease identification is crucial for long-lasting agriculture. It requires a significant amount of work, a specialist understanding of plant diseases, and more than enough processing time. As a result, digital image processing is utilized to detect rose plant illnesses. Image acquisition, image pre-processing, picture segmentation, feature extraction, and classification are phases of disease detection. This research will look into how to save the rose plant from various diseases.`
  }
];
