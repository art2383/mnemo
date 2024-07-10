<script setup lang="ts">
import { computed } from 'vue'
import { useStoreMnemonic } from '@/stores/mnemonic.ts'
import { storeToRefs } from 'pinia'
import PadBox from '@/components/PadBox.vue'
import CopyIcon from '@/components/CopyIcon.vue'
import ShortenedText from '@/components/ShortenedText.vue'

type Validation = {
  fn: Function,
  title: string,
  icon: string
}

const storeMnemonic = useStoreMnemonic()
const {
  mnemonic,
  passphrase,
  mnemonicWords,
  isCorrectLength,
  isFromDictionary,
  isValidMnemonic,
  seed,
  rootKey,
  derivations
} = storeToRefs(storeMnemonic)

const validations = computed((): Validation[] => {
  return [
    { fn: isCorrectLength.value, title: 'Correct Length', icon: 'width' },
    { fn: isFromDictionary.value, title: 'From Dictionary', icon: 'dictionary' },
    { fn: isValidMnemonic.value, title: 'BIP-39 Valid', icon: 'license' }
  ]
})
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
          <div class="mnemonic" v-if="mnemonic">{{ mnemonic }}&#32;<CopyIcon :text="mnemonic" />
          </div>
          <div v-else>BIP-39 valid mnemonic will be accepted in all wallets, but the last word is not random but is a checksum</div>
        </template>
        <template #footer>
          <button v-show="mnemonic" class="secondary" @click="storeMnemonic.clear">Clear</button>
          <button @click="storeMnemonic.generate">Generate</button>
        </template>
      </PadBox>

      <PadBox v-if="mnemonic">
        <template #drop-cap>2</template>
        <template #heading>Validity</template>
        <template #about>Checking length, dictionary and BIP-39 validity</template>
        <template #body>
          <div class="validity">
            <figure v-for="(validation, i) in validations" :key="i" :class="{invalid: !validation.fn}">
              <div class="icon">
                <span class="material-symbols-rounded">{{ validation.icon }}</span>
              </div>
              <figcaption>
                <span v-if="validation.fn" class="material-symbols-rounded">check</span>
                <span v-else class="material-symbols-rounded">close</span>
                <span>{{ validation.title }}</span>
              </figcaption>
            </figure>
          </div>
        </template>
        <template #footer></template>
      </PadBox>

      <PadBox v-if="mnemonic" class="passphrase">
        <template #drop-cap>3</template>
        <template #heading>Passphrase, optional</template>
        <template #about>To add a layer of security (also BIP-39)</template>
        <template #body>
          <input type="text" v-model="passphrase" placeholder="Your passphrase">
        </template>
        <template #footer></template>
      </PadBox>

      <PadBox class="pad4" v-if="mnemonic">
        <template #drop-cap>4</template>
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
        <template #drop-cap>5</template>
        <template #heading>Seed</template>
        <template #about>Still BIP-39: binary seed displayed in hex</template>
        <template #body>
          <div class="mono break">
            {{ seed.seedString }}
          </div>
        </template>
        <template #footer></template>
      </PadBox>

      <PadBox v-if="mnemonic">
        <template #drop-cap>6</template>
        <template #heading>Root Keys</template>
        <template #about>BIP-32: root private and public keys derived from the seed</template>
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
          <template #drop-cap>{{ i + 7 }}</template>
          <template #heading>{{ derivation.title }}</template>
          <template #about>
            BIP-32 derivation for {{ derivation.title }} using BIP-44 path: {{ derivation.path}}
          </template>
          <template #body>
            <h3>Public Keys</h3>
            <div class="mono break" v-for="publicKey in derivation.publicKeys" :key="publicKey.slice(0,6)">
              - <ShortenedText :text="publicKey" />
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
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--gutter);
  place-items: stretch;
}

.buttons button {
  margin-right: var(--gutter);
}

.validity {
  display: flex;
  justify-content: space-evenly;
}

.validity figure {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.validity figure.invalid * {
  color: var(--color-danger);
}

.validity figure .icon {
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--color-main-bg);
  display: grid;
  place-items: center;
}

.validity figure .icon * {
  font-size: 3rem;
}

.validity figcaption {
  display: flex;
  justify-content: start;
  align-items: center;
}

.passphrase input {
  width: 100%;
}

.pad4 {
  grid-column: 1/4;
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
  border: 1px solid var(--color-border);
}

.mnemonic-table div.th {
  font-weight: 600;
}

/* modifiers */
/*.mnemonic-table--ver {*/
/*  grid-template-columns: repeat(4, 100px);*/
/*  grid-template-rows: repeat(13, min-content);*/
/*  grid-auto-flow: column;*/
/*}*/

@media(max-width: 1200px) {
  .pads-grid {
    grid-template-columns: 1fr;
  }

  .pad4 {
    grid-column: 1/2;
  }

  .mnemonic-table {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(13, min-content);
    grid-auto-flow: column;
  }
}
</style>