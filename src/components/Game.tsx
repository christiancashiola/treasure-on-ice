/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

interface IGame {
  children?: ReactNode;
}

export function Game({children}: IGame): JSX.Element {
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

  return <>{children}</>;
}
