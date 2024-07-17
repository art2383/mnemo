import {
  privateKeyToCompressedWif,
  privateKeyToHex,

  publicKeyToBitcoinAddress,
  publicKeyToBitcoinSegWitAddress,
  publicKeyToEthereumAddress
} from '@/common/helpers.ts'

export const derivationConfig = { // append index after each path
  bitcoin: {
    title: 'Bitcoin',
    path: `m/44'/0'/0'/0/`,
    getPrivateKeyReadable: privateKeyToCompressedWif,
    getAddress: publicKeyToBitcoinAddress
  },
  bitcoinSegWit: {
    title: 'Bitcoin Seg Wit',
    path: `m/84'/0'/0'/0/`,
    getPrivateKeyReadable: privateKeyToCompressedWif,
    getAddress: publicKeyToBitcoinSegWitAddress
  },
  ethereum: {
    title: 'Ethereum',
    path: `m/44'/60'/0'/0/`,
    getPrivateKeyReadable: privateKeyToHex,
    getAddress: publicKeyToEthereumAddress
  }
}