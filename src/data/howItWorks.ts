import type { ComponentType, SVGProps } from "react";

import {
  CalendarDays,
  Car,
  ClipboardList,
  ChartNoAxesCombined,
} from "lucide-react";

type Step = {
  id: string;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const howItWorksSteps: Step[] = [
  {
    id: "1",
    title: "Book Your Visit",
    description: "Choose a time and location that work for you.",
    Icon: CalendarDays,
  },
  {
    id: "2",
    title: "We Come to You",
    description: "Receive one-on-one care wherever it's most convenient.",
    Icon: Car,
  },
  {
    id: "3",
    title: "Get Your Plan",
    description:
      "We'll assess what's going on and create a plan around your goals.",
    Icon: ClipboardList,
  },
  {
    id: "4",
    title: "Keep Moving Forward",
    description:
      "Your care evolves as you progress toward the activities you love.",
    Icon: ChartNoAxesCombined,
  },
];
