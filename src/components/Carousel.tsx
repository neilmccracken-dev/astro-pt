import { useEffect, useState, useRef } from 'react';
import type { GetImageResult } from 'astro';

// Extend Astro's native type definition to safely read our custom flag
interface ExtendedImageResult extends GetImageResult {
  isTall: boolean;
}

interface AutoCarouselProps {
  images: ExtendedImageResult[];
  sizes: string;
}

export default function AutoCarousel({ images, sizes }: AutoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollTo({
        left: currentIndex * carousel.clientWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const prevSlide = (): void => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = (): void => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Outer framing box stays completely solid and fluid to prevent Layout Shifts */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] w-full shadow-2xl rounded-xl overflow-hidden bg-black">
        <div
          ref={carouselRef}
          className="carousel w-full h-full overflow-x-hidden scroll-smooth"
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="carousel-item w-full h-full relative flex items-center justify-center overflow-hidden"
            >
              {/* Blur Engine: Only renders background blur layers if the image is tagged as tall */}
              {img.isTall && (
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110 opacity-40 blur-2xl pointer-events-none select-none"
                  style={{ backgroundImage: `url(${img.src})` }}
                  aria-hidden="true"
                />
              )}

              {/* Main Display Image */}
              <img
                src={img.src}
                {...img.attributes}
                sizes={sizes}
                // If tall, max height confines it cleanly inside our 16:9 shell with no extreme zoom
                className={`h-full object-cover relative z-10 ${img.isTall ? 'max-w-full object-contain mx-auto' : 'w-full'}`}
                alt={`Art-directed Unsplash slide ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between pointer-events-none z-20">
          <button
            onClick={prevSlide}
            className="btn btn-circle btn-sm bg-base-100/70 border-none backdrop-blur pointer-events-auto shadow-md"
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="btn btn-circle btn-sm bg-base-100/70 border-none backdrop-blur pointer-events-auto shadow-md"
            aria-label="Next slide"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Navigation Dot Indicators */}
      <div className="flex w-full justify-center gap-2 py-4">
        {images.map((_, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`btn btn-xs btn-circle transition-all duration-300 ${
              currentIndex === index
                ? 'btn-primary scale-110'
                : 'btn-neutral opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
