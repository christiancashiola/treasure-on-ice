/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {ReactNode} from 'react';

interface IInstruction {
  alt: string;
  children: ReactNode;
  imagePath: string;
}

export function Instruction({alt, children, imagePath}: IInstruction) {
  return (
    <div
      css={css`
        display: flex;
        padding: 0 10px;
        align-items: flex-start;
        justify-content: flex-start;

        :not(:last-child) {
          margin-bottom: 20px;
        }

        img {
          margin: 5px 10px 0 0;
        }
      `}
    >
      <img src={`/images/game/${imagePath}`} alt={alt} width={50} height={50} loading="lazy" />
      <span>{children}</span>
    </div>
  );
}
