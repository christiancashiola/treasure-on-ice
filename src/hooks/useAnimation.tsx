import { useEffect, useRef, useState } from "react";

export function useAnimation() {
  const forceUpdate: () => void = useState<{}>()[1].bind(null, {})
  const animationReq = useRef(0);

  const animate = (time: number) => {
    forceUpdate();
    animationReq.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationReq.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}