/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";

interface IButton {
children: ReactNode;
}

export function Button({ children }: IButton) {
return (
  <button
    type="button"
    css={css`
      margin: 0 auto;
      display: block;
      cursor: pointer;
      margin-top: 20px;
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px;
      font-size: 18px;
      font-family: inherit;
      padding: 0 15px;
      height: 50px;
      min-width: 300px;
      border: 1px solid cyan;
      position: relative;
      transition: all 0.2s cubic-bezier(0.64, 0.57, 0.67, 1.53);
      background-color: #000;
      color: cyan;
      border-color: cyan;
      background: #03cffc;
      background: linear-gradient(
          135deg,
          #03cffc 0%,
          #80e8ff 10%,
          #03cffc 20%,
          #80e8ff 30%,
          #03cffc 40%,
          #80e8ff 50%,
          #03cffc 60%,
          #80e8ff 70%,
          #03cffc 80%,
          #80e8ff 90%,
          #03cffc 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; 
        
        :hover {
          color: #000;
          -webkit-background-clip: auto;
        -webkit-text-fill-color: #000;
        border: #005366;
        background: #03cffc;
        background: linear-gradient(
          135deg,
          #03cffc 0%,
          #80e8ff 10%,
          #03cffc 20%,
          #80e8ff 30%,
          #03cffc 40%,
          #80e8ff 50%,
          #03cffc 60%,
          #80e8ff 70%,
          #03cffc 80%,
          #80e8ff 90%,
          #03cffc 100%
        );
      }

      :active {
        box-shadow: inset -1px -1px #445, inset 1px 1px #445;
      }
    `}
  >
    {children}
  </button>
);
}
