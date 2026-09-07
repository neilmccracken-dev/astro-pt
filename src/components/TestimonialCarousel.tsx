import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Export the interface so Astro can reuse it for typing
export interface Testimonial {
  review: string;
  name: string;
  relationship: string;
  headline?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps): React.JSX.Element | null {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Return null or a fallback message if Keystatic returns an empty collection
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(timer);
  }, [currentIndex, testimonials.length]);

  const handlePrev = (): void => {
    console.log(currentIndex);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleNext = (): void => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center md:min-h-72">
      <div className="relative w-full text-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="
        absolute z-10
        hidden md:flex
        left-1 top-1/2 -translate-y-1/2
        w-10 h-10
        items-center justify-center
        rounded-full border border-deep-teal
        text-deep-teal
        hover:border-deeper-teal hover:bg-gray-50
        transition-all cursor-pointer
      "
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Testimonial */}
        <div
          key={currentIndex}
          className="
        min-h-80 md:min-h-40
        flex flex-col justify-center
        px-5 md:px-14
        animate-fade-in
      "
        >
          <div
            className="
        flex flex-col justify-center
        w-full
        md:max-w-2xl
        lg:max-w-6xl
        mx-auto
      "
          >
            <p
              className="
          text-sm md:text-lg
          italic leading-7 md:leading-8
          text-stone-900
          mb-4
        "
            >
              "{current.review}"
            </p>

            <h4 className="font-bold text-gray-900">{current.name}</h4>

            <span className="text-sm text-gray-500">
              {current.relationship}
            </span>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="
        absolute
        hidden md:flex
        right-1 top-1/2 -translate-y-1/2
        w-10 h-10
        items-center justify-center
        rounded-full border border-deep-teal
        text-deep-teal
        hover:border-deeper-teal hover:bg-gray-50
        transition-all cursor-pointer
      "
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Mobile Navigation */}
        <div className="flex justify-center gap-4 mt-4 md:hidden">
          <button
            onClick={handlePrev}
            className="
          flex w-10 h-10
          items-center justify-center
          rounded-full border border-deep-teal
          text-deep-teal
        "
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="
          flex w-10 h-10
          items-center justify-center
          rounded-full border border-deep-teal
          text-deep-teal
        "
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
