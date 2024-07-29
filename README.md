# Mnemo
    
### My demo project for Vue 3, Pinia, TS & Vitest

- Deployed on Vercel: [mnemo1.vercel.app](https://mnemo1.vercel.app)
- Source code at GitHub: [github.com/art2383/mnemo](https://github.com/art2383/mnemo)
    
### What the app does:
- Generates and analyzes cryptocurrency mnemonics (aka seed phrases)    
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

### Testing:
- For valid-checksum mnemonics use [Ian Coleman's BIP-39 online tool](https://iancoleman.io/bip39/)
- Popular wallet apps (MetaMask, Trust Wallet, etc) will do as well
- For invalid-checksum mnemonics use Electrum Wallet desktop app

### Disclaimer:
- NEVER USE mnemonics with real coins or tokens in this or any other online tool
