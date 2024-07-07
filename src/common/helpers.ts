import { createHash } from 'crypto-browserify'
import bs58 from 'bs58'
import { bech32 } from 'bech32'

export const uint8ArrayToHex = (u: Uint8Array): string => {
  return Array.from(u)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

const sha256 = (buffer: Buffer): Buffer => {
  return createHash('sha256').update(buffer).digest();
}

const ripemd160 = (buffer: Buffer): Buffer => {
  return createHash('ripemd160').update(buffer).digest();
}

export const publicKeyToBitcoinAddress = (publicKey: Buffer): string => {
  const sha256Hash = sha256(publicKey)
  const ripemd160Hash = ripemd160(sha256Hash)
  const versionedPayload = Buffer.concat([Buffer.from([0x00]), ripemd160Hash])
  const checksum = sha256(sha256(versionedPayload)).slice(0, 4)
  const binaryAddress = Buffer.concat([versionedPayload, checksum])
  const bitcoinAddress = bs58.encode(binaryAddress)
  return bitcoinAddress
}

export const publicKeyToBitcoinSegWitAddress = (publicKey: Buffer): string => {
  const sha256Hash = sha256(publicKey)
  const ripemd160Hash = ripemd160(sha256Hash)
  const witnessVersion = 0x00
  const words = [witnessVersion, ...bech32.toWords(ripemd160Hash)]
  const segwitAddress = bech32.encode('bc', words)
  return segwitAddress
}