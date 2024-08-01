import fs from 'fs'
import path from 'path'
import en from './src/common/langs/en.js'

const t = en.readme

const content = `# ${t.heading}

### ${t.myDemo}

- ${t.deployed}: [mnemo1.vercel.app](https://mnemo1.vercel.app)
- ${t.sourceCode}: [github.com/art2383/mnemo](https://github.com/art2383/mnemo)

### ${t.appDoes}:

- ${t.does1}
- ${t.does2}
- ${t.does3}
- ${t.does4}
- ${t.does5}
- ${t.does6}

### ${t.appHas}:

- ${t.has1}
- ${t.has2}
- ${t.has3}
- ${t.has4}
- ${t.has5}
- ${t.has6}
- ${t.has7}

### ${t.testing}:

- ${t.test1.replace('{link}', `[Ian Coleman's BIP-39 online tool](https://iancoleman.io/bip39/)`)}
- ${t.test2}
- ${t.test3}

### ${t.disclaimer}:

- ${t.dis1}
`

fs.writeFileSync(path.join('./', 'README.md'), content, 'utf8')
