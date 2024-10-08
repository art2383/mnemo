const en = {
  common: {
    clear: 'Clear',
    copy: 'Copy',
    paste: 'Paste'
  },
  navBar: {
    home: 'Home',
    valid: 'Valid Mnemonic',
    invalid: 'Invalid Mnemonic',
    input: 'Input Mnemonic',
    word12: '12-th Word',
    theme: 'Switch Theme',
    lang: 'Switch Language',
    settings: 'Settings'
  },
  seed: {
    h1valid: 'Valid Mnemonic',
    h1invalid: 'Invalid Mnemonic',
    h1input: 'Input Mnemonic',
    generate: 'Generate',
    input: 'Input',
    aboutValid: 'BIP-39 standard: 11 random words + checksum word',
    aboutInvalid: 'BIP-39 dictionary: 12 random words',
    aboutInput: 'Your own mnemonic phrase',
    validity: 'Validity',
    aboutValidity: 'Checking length, dictionary and checksum',
    validationLength: 'Correct Length',
    validationDictionary: 'From Dictionary',
    validationBip39: 'Checksum Valid',
    passphrase: 'Passphrase, optional',
    passphraseAbout: 'To add a layer of security (also BIP-39)',
    passphrasePlaceholder: 'Your passphrase',
    wordsTable: 'Words Table',
    wordsTableAbout: 'Index in BIP-39 dictionary, dec and hex',
    word: 'Word',
    line: 'Line',
    hex: 'Hex',
    seed: 'Seed',
    seedAbout: 'Still BIP-39: binary seed displayed in hex',
    rootKeys: 'Root Keys',
    rootKeysAbout: 'BIP-32: root private and public keys derived from the seed',
    privateKey: 'Private Key',
    publicKey: 'Public Key',
    derivationAbout: 'BIP-32 derivation for {title} using BIP-44 path: {path}',
    privateKeys: 'Private Keys',
    publicKeys: 'Public Keys',
    addresses: 'Addresses'
  },
  word12: {
    h1: '12-th Word',
    comingSoon: 'Coming Soon'
  },
  settings: {
    h1: 'Settings',
    general: 'General',
    exposePrivateKeys: 'Expose Private Keys',
    qDerivations: 'Derivations Quantity',
    plenty: "Come on, 9 is plenty, it's CPU-intensive"
  },
  readme: {
    heading: 'Mnemo',
    myDemo: 'My demo project for Vue 3, Pinia, TS & Vitest',
    deployed: 'Deployed on Vercel',
    sourceCode: 'Source code at GitHub',
    appDoes: 'What the app does',
    does1: 'Generates and analyzes cryptocurrency mnemonics (aka seed phrases)',
    does2: 'Derives addresses for different blockchains',
    does3: 'Shows all steps of address derivation',
    does4: 'Exposes private keys',
    does5: 'Lets user edit the mnemonic and see the result in real time',
    does6: 'Implements a passphrase feature for advanced security',
    appHas: 'What the app has',
    has1: 'Vue 3 with Composition API & Pinia with Setup Stores',
    has2: 'Some TypeScript and Vitest',
    has3: 'Common hash functions and blockchain-specific logic instead of high-level libraries',
    has4: 'Adaptive CSS for mobile / desktop / 4k',
    has5: 'Two color themes, with the default being determined by the browser/OS',
    has6: 'I18n with two languages',
    has7: 'Saving of the language and theme',
    testing: 'Testing',
    test1: 'For valid-checksum mnemonics use {link}',
    colemanTool: "Ian Coleman's BIP-39 Online Tool",
    test2: 'Popular wallet apps (MetaMask, Trust Wallet, etc) will do as well',
    test3: 'For invalid-checksum mnemonics use Electrum Wallet desktop app',
    disclaimer: 'Disclaimer',
    dis1: 'NEVER USE mnemonics with real coins or tokens in this or any other online tool'
  }
}

export default en
