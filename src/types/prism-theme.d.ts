// src/types/prism-themes.d.ts
import type { PrismTheme } from 'prism-react-renderer';

declare module 'prism-react-renderer/themes/*' {
  const theme: PrismTheme;
  export default theme;
}
