import { createHash } from 'crypto-browserify'
import bs58 from 'bs58'
import { bech32 } from 'bech32'
import createKeccakHash from 'keccak'
import * as secp from '@noble/secp256k1'

const sha256 = (buffer: Buffer): Buffer => {
  return createHash('sha256').update(buffer).digest()
}

const ripemd160 = (buffer: Buffer): Buffer => {
  return createHash('ripemd160').update(buffer).digest()
}

export const publicKeyToBitcoinAddress = (publicKey: Buffer): string => {
  const sha256Hash: Buffer = sha256(publicKey)
  const ripemd160Hash: Buffer = ripemd160(sha256Hash)
  const versionedPayload: Buffer = Buffer.concat([Buffer.from([0x00]), ripemd160Hash])
  const checksum: Buffer = sha256(sha256(versionedPayload)).slice(0, 4)
  const binaryAddress: Buffer = Buffer.concat([versionedPayload, checksum])
  const bitcoinAddress: string = bs58.encode(binaryAddress)
  return bitcoinAddress
}

export const publicKeyToBitcoinSegWitAddress = (publicKey: Buffer): string => {
  const sha256Hash: Buffer = sha256(publicKey)
  const ripemd160Hash: Buffer = ripemd160(sha256Hash)
  const witnessVersion = 0x00
  const words = [String(witnessVersion), ...bech32.toWords(ripemd160Hash)]
  const segwitAddress: string = bech32.encode('bc', words)
  return segwitAddress
}
// export const privateKeyToEthereumAddress = (privateKey: Buffer): string => {
//   const wallet: Wallet = new ethers.Wallet(privateKey.toString('hex'))
//   const address: string = wallet.address
//   // const publicKey: string = wallet.publicKey
//
//   return address
// }

export const publicKeyToEthereumAddress = (publicKey: Buffer): string => {
  const uncompressedPublicKey = secp.ProjectivePoint.fromHex(publicKey.toString('hex')).toRawBytes(false)
  const publicKeyWithoutPrefix: Buffer = Buffer.from(uncompressedPublicKey).subarray(1)
  const hash: Buffer = createKeccakHash('keccak256').update(publicKeyWithoutPrefix).digest()
  const addressBuffer: Buffer = hash.subarray(-20)
  const address: string = '0x' + addressBuffer.toString('hex')
  return address
}