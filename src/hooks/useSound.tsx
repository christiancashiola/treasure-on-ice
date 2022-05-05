import { useEffect, useRef } from "react";

// assumes user has already interacted with the Document
export function useSound(fileName: string) {
  const audioRef = useRef(new Audio(`/sounds/${fileName}`));
  
  useEffect(() => {
    audioRef.current.play?.();
  }, []);
}
