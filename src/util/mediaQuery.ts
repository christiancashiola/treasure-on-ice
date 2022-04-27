import {css} from '@emotion/react';

export enum ScreenSize {
  SmallPhone = '320px',
  Phone = '400px',
  Phablet = '550px',
  Tablet = '750px',
  Desktop = '1024px',
}

export function mediaQuery(size: ScreenSize, styles: string) {
  return css`
    @media (min-width: ${size}) {
      ${styles}
    }
  `;
}
