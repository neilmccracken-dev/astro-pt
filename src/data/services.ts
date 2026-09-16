import Evaluation from "@assets/images/services/evaluation.jpg";
import FollowUpVisit from "@assets/images/services/follow-up-visit.jpg";
import OnlineCoaching from "@assets/images/services/online-coaching.jpg";
import TennisImage from "@assets/images/services/tennis.jpg";
import GolfImage from "@assets/images/we-treat/golf-swing.jpg";
import { ClipboardList, UserRound, Monitor } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import GolfSwing from "../components/GolfSwing.tsx";
import TennisSwing from "../components/svgs/TennisSwing.tsx";

export type ServiceIcon = ComponentType<SVGProps<SVGSVGElement>>;

type Service = {
  name: string;
  description: string;
  image: ImageMetadata;
  position: string;
  duration: string;
  icon: ServiceIcon;
  iconProps?: SVGProps<SVGSVGElement>;
};
export const services: Service[] = [
  {
    name: "Evaluation",
    description: `
      A comprehensive one-on-one assessment to understand your goals, identify what's 
      limiting your movement, and create a personalized plan to help you move and feel
      your best.
    `,
    image: Evaluation,
    position: "object-[40%_50%]",
    duration: "60 minutes",
    icon: ClipboardList,
  },
  {
    name: "Follow-Up Visit",
    description: `
      Personalized one-on-one treatment focused on progressing your recovery, building
      strength and mobility, and helping you return confidently to the activities you love.
    `,
    image: FollowUpVisit,
    position: "object-[50%_50%]",
    duration: "60 minutes",
    icon: UserRound,
  },
  {
    name: "Virtual Follow Up Visit",
    description: `
      Convenient one-on-one care from wherever you are, with individualized exercise
      progression, movement coaching, and guidance to keep your progress on track.
    `,
    image: OnlineCoaching,
    position: "object-[50%_50%]",
    duration: "60 minutes",
    icon: Monitor,
  },
  {
    name: "Golf Assessment",
    description: `
      A golf-specific movement and performance assessment designed to identify
      physical limitations that may be affecting your swing, performance, or 
      ability to play comfortably
    `,
    image: GolfImage,
    position: "object-[20%_50%]",
    duration: "60 minutes",
    icon: GolfSwing,
    iconProps: {
      width: 72,
      height: 72,
    },
  },
  {
    name: "Tennis Assessment",
    description: `A movement based assessment focused on identifying physical limitations
       and movement patterns that may be afecting your tennis performance, comfort,
        or durability`,
    image: TennisImage,
    position: "object-[30%_5%]",
    duration: "60 minutes",
    icon: TennisSwing,
    iconProps: {
      width: 64,
      height: 64,
    },
  },
];
