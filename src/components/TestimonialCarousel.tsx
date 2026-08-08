import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleNext = (): void => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative  mx-auto px-14 py-6   text-center">
      {/* Left Arrow Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-deep-teal text-deep-teal hover:deeper-teal hover:border-deeper-teal hover:bg-gray-50 transition-all cursor-pointer "
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <div
        key={currentIndex}
        className="min-h-80 md:min-h-40 flex flex-col justify-center px-4 animate-fade-in"
      >
        {/* Testimonial Content */}
        <div className="flex flex-col justify-center max-w-7xl mx-auto">
          <p className="md:text-lg italic text-gray-700 mb-4">
            "{current.review}"
          </p>
          <h4 className="font-bold text-gray-900">{current.name}</h4>
          <span className="text-sm text-gray-500">{current.relationship}</span>
        </div>
      </div>

      {/* Right Arrow Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-deep-teal text-deep-teal hover:deeper-teal hover:border-deeper-teal cursor-pointer hover:bg-gray-50 transition-all"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
