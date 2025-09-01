// src/components/shared/FontPreload.tsx
import { Helmet } from '@dr.pogodin/react-helmet';

export default function FontPreload() {
  return (
    <Helmet>
      <link
        rel='preload'
        as='font'
        href='/fonts/SpaceGrotesk-[wght].woff2' // or SpaceGrotesk[wght].woff2
        type='font/woff2'
        crossOrigin='anonymous'
      />
    </Helmet>
  );
}
