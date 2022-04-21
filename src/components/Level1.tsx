/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAnimation } from "../hooks/useAnimation";

const W = Symbol("WALL");
const _ = Symbol("EMPTY");

export const LEVEL_1 = [
  [W, W, W, W, W, W, W, W, W, W],
  [W, _, _, _, _, _, _, W, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, _, _, W, _, _, _, _, _, W],
  [W, _, _, W, _, _, _, _, _, W],
  [W, _, _, _, _, _, W, _, _, W],
  [W, _, _, _, _, _, _, _, _, W],
  [W, W, W, W, W, W, W, W, W, W],
];

export function Level1(): JSX.Element {
  useAnimation();
  const [playerPos, setPlayerPos] = useState({x: 1, y: 1});
  const level = useRef([
    [W, W, W, W, W, W, W, W, W, W],
    [W, _, _, _, _, _, _, W, _, W],
    [W, _, _, _, _, _, _, _, _, W],
    [W, _, _, _, _, _, _, _, _, W],
    [W, _, _, _, _, _, _, _, _, W],
    [W, _, _, W, _, _, _, _, _, W],
    [W, _, _, W, _, _, _, _, _, W],
    [W, _, _, _, _, _, W, _, _, W],
    [W, _, _, _, _, _, _, _, _, W],
    [W, W, W, W, W, W, W, W, W, W],
  ]);

  // todos
  // 1. encapsulate components
  // 2. bind controls
  // 3. some css
  // 4. collisions

  useEffect(() => {
    const updateX = async () => {
      if (playerPos.x === 1) {
        await new Promise((r) => setTimeout(r, 1000));
      }
      await new Promise((r) => setTimeout(r,10));
      if (playerPos.x < 6) {
        setPlayerPos((prevPos) => ({x: prevPos.x + 1, y: prevPos.y}))
      }
    }
    updateX();
  }, [playerPos.x])
  
  return (
    <div
      css={css`
        width: ${LEVEL_1[0].length * 50}px;
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {level.current.map((row, y) =>
        row.map((gamePiece, x) => {
          let color: string;

          if (gamePiece === W) color = '#333';
          else if (x === playerPos.x && y === playerPos.y) color = 'blue';
          else color = 'green';
          
          return (
            <div
              key={`${x}${y}`}
              css={css`
                width: 50px;
                height: 50px;
                background: ${color};
              `}
            />
          );
        })
      )}
    </div>
  );
}
