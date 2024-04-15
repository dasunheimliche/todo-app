import { useEffect, useState } from "react";

export default function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.innerWidth < 640
  );

  console.log("IS SMALL SCREEN", isSmallScreen);

  useEffect(() => {
    function updateState() {
      setIsSmallScreen(window.innerWidth < 640);
    }

    window.addEventListener("resize", updateState);

    return () => {
      window.removeEventListener("resize", updateState);
    };
  }, []);

  return isSmallScreen;
}
