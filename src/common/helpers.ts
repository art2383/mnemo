export const uint8ArrayToHex = (u: Uint8Array) => {
  return Array.from(u)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}