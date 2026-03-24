"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

const Logo3D = dynamic(() => import("@/components/3d/Logo3d"), {
  ssr: false, // explicit — three.js can't run on server
  loading: () => <div className="h-60 w-full max-w-xs" />, // placeholder
});
const HeroLogo = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = useCallback(() => {
    // Ensure at least one frame renders at opacity-0 before fading in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsLoaded(true));
    });
  }, []);
  return (
    <div
      className={`h-60 md:h-80 w-full max-w-xs transition-opacity duration-[1000ms] ease-in-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Logo3D onLoaded={handleLoaded} />
    </div>
  );
};

export default HeroLogo;
