import '@testing-library/jest-dom';

// Workaround for ESM module environments
(async () => {
  const util = await import('node:util');

  // @ts-expect-error TS doesn't know this is safe in Node + Jest
  globalThis.TextEncoder = util.TextEncoder;

  // @ts-expect-error
  globalThis.TextDecoder = util.TextDecoder;
})();
