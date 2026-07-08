// src/components/ServiceCard.tsx
import { useEffect, useState } from 'react';
import { getCalApi } from '@calcom/embed-react';

interface ServiceCardProps {
  name: string;
  duration: number | string;
  description: string;
  pricing: string | number;
  calLink: string;
  optimizedImageSrc?: string; // Passed from Astro's getImage() engine
}

export default function ServiceCard({
  name,
  duration,
  description,
  pricing,
  calLink,
  optimizedImageSrc,
}: ServiceCardProps) {
  const [isCalReady, setIsCalReady] = useState<boolean>(false);

  useEffect(() => {
    async function initCal(): Promise<void> {
      try {
        const cal = await getCalApi();
        if (cal) {
          cal('ui', { theme: 'light' });
          setIsCalReady(true);
        }
      } catch (error) {
        console.error(`Failed to load Cal.com for ${name}:`, error);
      }
    }
    void initCal();
  }, [name]);

  // 🦴 Skeleton matches your responsive horizontal layout exactly
  if (!isCalReady) {
    return (
      <div className="card md:card-side bg-base-100 shadow-xl overflow-hidden animate-pulse border border-base-200">
        {/* Skeleton Left Image Container */}
        <div className="h-48 md:h-auto md:w-2/5 min-w-[200px] shrink-0 bg-base-300 min-h-[192px]" />

        {/* Skeleton Right Text Container */}
        <div className="card-body p-6 flex flex-col justify-between w-full">
          <div>
            <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
              <div className="h-7 bg-base-300 rounded w-1/2" />
              <div className="h-6 bg-base-200 rounded w-16" />
            </div>
            <div className="h-4 bg-base-200 rounded w-full mb-2" />
            <div className="h-4 bg-base-200 rounded w-5/6" />
          </div>
          <div className="card-actions justify-between items-center mt-6 border-t border-base-200 pt-4">
            <div className="h-8 bg-base-300 rounded w-20" />
            <div className="h-10 bg-base-300 rounded-lg w-28" />
          </div>
        </div>
      </div>
    );
  }

  // ✨ Real Interactive DaisyUI Component Render
  return (
    <div className="card md:card-side bg-base-100 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* 📸 Left Side Image Container */}
      <figure className="relative h-48 md:h-auto md:w-2/5 min-w-[200px] shrink-0">
        {optimizedImageSrc ? (
          <img
            src={optimizedImageSrc}
            alt={name}
            width={600}
            height={400}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral to-base-300 flex items-center justify-center min-h-[192px]">
            <span className="text-4xl">✨</span>
          </div>
        )}
      </figure>

      {/* 📋 Right Side Text Layout Content */}
      <div className="card-body p-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <h2 className="card-title text-2xl font-bold text-base-content">
              {name}
            </h2>
            <span className="badge badge-neutral whitespace-nowrap">
              ⏱ {duration} min
            </span>
          </div>
          <p className="text-neutral-500 leading-relaxed">{description}</p>
        </div>

        {/* Action / Pricing Row at Bottom */}
        <div className="card-actions justify-between items-center mt-6 border-t border-base-200 pt-4">
          <div className="text-3xl font-black text-base-content">
            ${pricing}
          </div>
          {/* Cal booking triggers natively using data properties */}
          <button data-cal-link={calLink} className="btn btn-primary">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
