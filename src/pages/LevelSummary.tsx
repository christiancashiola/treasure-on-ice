/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { useLocation } from 'react-router-dom';
import {ABSOLUTE_ZERO, FLEX_CENTER} from '../constants/styleConstants';

export function LevelSummary() {
  const location = useLocation();
  console.log(location.state)
  return (
    <div
      css={css`
        ${ABSOLUTE_ZERO}
        ${FLEX_CENTER}
        flex-direction: column;
      `}
    >
      SUMMARY
    </div>
  );
}
