/// <reference types="vite/client" />

// Tell TS that any import from prism-react-renderer/themes/* is a valid module
// exporting a PrismTheme (so it stops complaining).
declare module 'prism-react-renderer/themes/*' {
  import type { PrismTheme } from 'prism-react-renderer';
  const theme: PrismTheme;
  export default theme;
}
