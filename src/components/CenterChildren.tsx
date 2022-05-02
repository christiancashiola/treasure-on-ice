/** @jsxImportSource @emotion/react */
import {css, SerializedStyles} from '@emotion/react';
import { ReactNode } from 'react';
import {ABSOLUTE_ZERO, FLEX_CENTER} from '../constants/styleConstants';

interface ICenterChildren {
  children: ReactNode;
  extraCss?: SerializedStyles | null;
  isPositionAbsolute?: boolean;
}

export function CenterChildren({children, isPositionAbsolute = false, extraCss = null}: ICenterChildren) {
  return (
    <div
      css={css`
        ${FLEX_CENTER}
        ${isPositionAbsolute && ABSOLUTE_ZERO}
        flex-direction: column;
        ${extraCss}
      `}
    >
      {children}
    </div>
  );
}
