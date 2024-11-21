import { useEffect, useState } from "react";

const useOnline: () => boolean = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const handleOnline: () => void = () => {
      setIsOnline(true);
    };

    const handleOffline: () => void = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

export default useOnline;
