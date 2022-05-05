import { useEffect, useRef } from "react";

// assumes user has already interacted with the Document
export function useSound(fileName: string, volume: number, soundPreference: boolean) {
  const audioRef = useRef(new Audio(`/sounds/${fileName}`));
  
  useEffect(() => {
    if (soundPreference) {
      audioRef.current.volume = volume
      audioRef.current.play?.();
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current.pause();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
