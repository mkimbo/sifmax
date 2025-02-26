"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";

interface VideoParallaxProps {
  src: string;
  className?: string;
  speed?: number;
  children?: React.ReactNode;
  overlayColor?: string;
  videoOpacity?: number;
}

export function VideoParallax({
  src,
  className,
  speed = 0.5,
  children,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  videoOpacity = 0.8,
}: VideoParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !isVisible) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const sectionTop = scrolled + rect.top;
      const relativeScroll = (scrolled - sectionTop) * speed;
      setOffset(relativeScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, isVisible]);

  return (
    <div
      id="about"
      ref={containerRef}
      className={cn(
        "relative min-h-[100vh] w-full overflow-hidden bg-background",
        className
      )}
    >
      {/* Video Container */}
      <div
        className="absolute inset-0 h-[120%] w-full"
        style={{
          transform: `translateY(${offset}px)`,
          top: "-10%", // Add extra space for parallax movement
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: videoOpacity }}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor }}
        />
      </div>

      {/* Content */}
      <div className="relative flex min-h-[100vh] items-center justify-center text-white">
        <div className="container">{children}</div>
      </div>
    </div>
  );
}

function AboutSifmax() {
  const t = useTranslation();
  return (
    <VideoParallax
      src="https://sifmax.vercel.app/sifmax.mp4"
      speed={0.8} // Reduced speed for smoother effect
    >
      <div className="text-center">
        {/* <h1 className="mb-4 text-lg font-bold md:text-xl dancing-script">
          {t("Karibu Sana")}
        </h1> */}
        <h1 className="mb-4 text-4xl text-[#f5c870] md:text-6xl montserrat">
          {t("SIFMAX BEAUTY PARLOUR")}
        </h1>
        <div className="w-full items-center decorative-line mx-auto" />
        <p className="section-description text-gray-300 max-w-4xl">
          {t("about.description")}
        </p>
      </div>
    </VideoParallax>
  );
}

export default AboutSifmax;
