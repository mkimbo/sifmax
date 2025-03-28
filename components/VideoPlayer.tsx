import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

// Custom hook to detect mobile screens (using 640px as the breakpoint)
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < breakpoint);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);
  return isMobile;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleVideoClick = () => {
    if (isMobile) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {/* Inline Video */}
      <div className="w-full" onClick={handleVideoClick}>
        <video src={src} poster={poster} controls className="w-full" />
      </div>

      {/* Modal for Mobile */}
      {isMobile && isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative w-full aspect-video">
              <video
                src={src}
                poster={poster}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
