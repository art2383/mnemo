# Mnemo

My demo project for Vue 3, Pinia, TS & Vitest.

Deployed on Vercel: [mnemo1.vercel.app](https://mnemo1.vercel.app) 

### What the app does:
- Analyzes cryptocurrency mnemonics (aka seed phrases)
- Derives addresses for different blockchains
- Shows all steps of address derivation
- Exposes private keys
- Lets user edit the mnemonic and see the result in real time
- Implements a passphrase feature for advanced security  

### What the app has:
- Vue 3 with Composition API & Pinia with Setup Stores
- Some TypeScript and Vitest
- Common hash functions and blockchain-specific logic instead of high-level libraries
- Adaptive CSS for mobile / desktop / 4k
- Two color themes, with the default being determined by the browser/OS
- I18n with two languages
- Saving of the language and theme

### Test Vectors:
- For valid-checksum mnemonics use [Ian Coleman's BIP-39 online tool](https://iancoleman.io/bip39/) or any wallet app (MetaMask, Trust Wallet, etc)
- For invalid-checksum mnemonics use Electrum Wallet desktop app
- NEVER USE mnemonics with real coins and tokens in this or any other online tool