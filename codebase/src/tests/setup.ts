import '@testing-library/jest-dom/vitest'

if (!globalThis.crypto) {
  globalThis.crypto = {
    randomUUID: () => 'test-uuid',
  } as Crypto
}

if (!globalThis.crypto.randomUUID) {
  globalThis.crypto.randomUUID = () => 'test-uuid'
}
