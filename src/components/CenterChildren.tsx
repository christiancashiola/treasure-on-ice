/** @jsxImportSource @emotion/react */
import {css, SerializedStyles} from '@emotion/react';
import { ReactNode } from 'react';
import {ABSOLUTE_ZERO, FLEX_CENTER} from '../constants/styleConstants';

interface ICenterChildren {
  children: ReactNode;
  extraCss?: SerializedStyles | null;
}

export function CenterChildren({children, extraCss = null}: ICenterChildren) {
  return (
    <div
      css={css`
        ${FLEX_CENTER}
        ${ABSOLUTE_ZERO}
        ${extraCss}
        flex-direction: column;
      `}
    >
      {children}
    </div>
  );
}
