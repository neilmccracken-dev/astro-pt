import {
  Star,
  Flag,
  Brain,
  Dumbbell,
  CircleParking,
  type LucideIcon,
} from "lucide-react";
import type { ImageMetadata } from "astro";
import DryNeedling from "@assets/images/certifications/dry-needling.svg";
export interface Certification {
  short: string;
  slug: string;
  name: string;
  icon?: LucideIcon;
  image?: ImageMetadata;
  description: string;
}

export const certifications: Certification[] = [
  {
    short: "OCS",
    slug: "ocs",
    name: "Orthopedic Clinical Specialist",
    icon: Star,
    description:
      "The highest certification level for orthopedic physical therapy",
  },
  {
    short: "TPI 3",
    slug: "tpi",
    name: "Titleist Performance Institute Medical Level 3",
    icon: Flag,
    description:
      "The highest level of training from the Titleist Performance Institute",
  },
  {
    short: "TPS",
    slug: "tps",
    name: "Therapeutic Pain Specialist",
    icon: Brain,
    description:
      "Specialized training in pain neuroscience and evidence-based pain management",
  },
  {
    short: "CSCS",
    slug: "cscs",
    name: "Certified Strength and Conditioning Specialist",
    icon: Dumbbell,
    description: "Expertise in exercise prescription and programming ",
  },
  {
    short: "Barre",
    name: "Pure Barre Instructor",
    slug: "barre",
    icon: CircleParking,
    description: `Trained in barre-based movement, alignment, and exercise
     techniques with an emphasis on safe, effective movement`,
  },
  {
    short: "DN",
    name: "Dry Needling Certification",
    slug: "dn",
    image: DryNeedling,
    description: `A manual therapy technique to reset the nervous system and
     address muscle tension, trigger points, and movement limitations`,
  },
];
