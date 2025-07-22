import '@testing-library/jest-dom';

(async () => {
  const util = await import('node:util');

  globalThis.TextEncoder = util.TextEncoder as typeof globalThis.TextEncoder;
  globalThis.TextDecoder = util.TextDecoder as typeof globalThis.TextDecoder;
})();
