<script setup lang="ts">
import { useStoreMnemonic } from '@/stores/mnemonic.ts'
import { storeToRefs } from 'pinia'
import PadBox from '@/components/PadBox.vue'

const storeMnemonic = useStoreMnemonic()
const {
  mnemonic,
  mnemonicWords,
  isMnemonic,
  isValidMnemonic,
  seed,
  rootKey,
  derivations
} = storeToRefs(storeMnemonic)

const copy = (text: string): void => {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('copied!')
    })
}
</script>

<template>
  <div class="generate-valid-view">
    <h1>Generate Valid Mnemonic</h1>

    <div class="pads-grid">
      <PadBox>
        <template #drop-cap>1</template>
        <template #heading>Generate Mnemonic</template>
        <template #about>Via BIP-39 standard generation method</template>
        <template #body>
          <template v-if="mnemonic">{{ mnemonic }}</template>
          <template v-else>Start with generating the mnemonic phrase</template>
        </template>
        <template #footer>
          <button v-show=mnemonic @click="copy(mnemonic)">Copy</button>
          <button v-show="mnemonic" class="secondary" @click="storeMnemonic.clear">Clear</button>
          <button @click="storeMnemonic.generate">Generate</button>
        </template>
      </PadBox>

      <PadBox v-if="mnemonic">
        <template #drop-cap>2</template>
        <template #heading>Validity</template>
        <template #about>Checking length, dictionary and BIP-39 validity</template>
        <template #body>
          <div class="validity" :class="{invalid: !isValidMnemonic}">
            <span v-if="isMnemonic">Is mnemonic</span>, <span v-if="isValidMnemonic">Is valid</span>
          </div>
        </template>
        <template #footer></template>
      </PadBox>

      <PadBox class="pad3" v-if="mnemonic">
        <template #drop-cap>3</template>
        <template #heading>Words Table</template>
        <template #about>Index in BIP-39 dictionary with dec and hex representation</template>
        <template #body>
          <div class="mnemonic-table">
            <div class="th">#</div>
            <div v-for="n in 12" :key="n">{{ n }}</div>
            <div class="th">Word</div>
            <div class="word" v-for="(mnemonicWord, i) in mnemonicWords" :key="i">{{ mnemonicWord.word }}</div>
            <div class="th">Line</div>
            <div class="word" v-for="(mnemonicWord, i) in mnemonicWords" :key="i">{{ mnemonicWord.line }}</div>
            <div class="th">Hex</div>
            <div class="word" v-for="(mnemonicWord, i) in mnemonicWords" :key="i">{{ mnemonicWord.hex }}</div>
          </div>
        </template>
        <template #footer></template>
      </PadBox>

      <PadBox v-if="mnemonic">
        <template #drop-cap>4</template>
        <template #heading>Seed</template>
        <template #about>Still BIP-39, a binary representation of a mnemonic, displayed in hex</template>
        <template #body>
          <div class="mono break">
            {{ seed.seedString }}
          </div>
        </template>
        <template #footer></template>
      </PadBox>

      <PadBox v-if="mnemonic">
        <template #drop-cap>5</template>
        <template #heading>Root Keys</template>
        <template #about>Root public and private keys derived from the seed according to BIP-32</template>
        <template #body>
          <h3>Private Key</h3>
          <div class="mono break">
            {{ rootKey.toJSON().xpriv }}
          </div>
          <h3>Public Key</h3>
          <div class="mono break">
            {{ rootKey.toJSON().xpub }}
          </div>
        </template>
      </PadBox>

      <template v-if="mnemonic">
        <PadBox v-for="(derivation, i) in derivations" :key="derivation.title">
          <template #drop-cap>{{ i+6 }}</template>
          <template #heading>{{ derivation.title }}</template>
          <template #about>BIP-32 derivation for {{ derivation.title }} using BIP-44 path: {{ derivation.path }} </template>
          <template #body>
            <h3>Public Keys</h3>
            <div class="mono break" v-for="publicKey in derivation.publicKeys" :key="publicKey.slice(0,6)">
              - {{ publicKey }}
            </div>
            <h3>Addresses</h3>
            <div class="mono break" v-for="address in derivation.addresses" :key="address.slice(0,6)">
              - {{ address }}
            </div>
          </template>
        </PadBox>
      </template>
    </div>
  </div>
</template>

<style scoped>
.pads-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gutter);
  place-items: stretch;
}

.pad3 {
  grid-column: 1/3;
}

.buttons button {
  margin-right: var(--gutter);
}

.validity {
  color: green;
  font-weight: 600;
}

.validity.invalid {
  color: red;
}

.validity span {
  font-weight: inherit;
  color: inherit;
}

.mnemonic-table {
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  grid-template-rows: repeat(4, min-content);
  grid-auto-flow: row;
  gap: 0;
}

.mnemonic-table div {
  margin: 1px;
  padding: 0 5px;
  border: 1px solid lightblue;
}

.mnemonic-table div.th {
  font-weight: 600;
}


/* modifiers */
.mnemonic-table--ver {
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(13, min-content);
  grid-auto-flow: column;
}
</style>