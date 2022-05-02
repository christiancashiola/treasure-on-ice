import {EmotionJSX} from '@emotion/react/types/jsx-namespace';
import {LazyExoticComponent, Suspense} from 'react';

// the page loads so fast that seeing a flickering fallback is disorienting
export function withNullSuspense<T>(
  LazyComponent: LazyExoticComponent<() => EmotionJSX.Element | null>,
) {
  return (props: T) => (
    <Suspense fallback={null}>
      <LazyComponent {...props} />
    </Suspense>
  );
}
