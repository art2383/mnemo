<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMnemonicStore } from '@/stores/mnemonic.ts'
import { storeToRefs } from 'pinia'
import PadBox from '@/components/PadBox.vue'
import CopyIcon from '@/components/CopyIcon.vue'
import ShortenedText from '@/components/ShortenedText.vue'
import WordsTable from '@/components/WordsTable.vue'

type Validation = {
  fn: Function,
  title: string,
  icon: string
}

const route = useRoute()
const storeMnemonic = useMnemonicStore()
const {
  mnemonic,
  passphrase,
  isCorrectLength,
  isFromDictionary,
  isValidMnemonic,
  seed,
  rootKey,
  derivations
} = storeToRefs(storeMnemonic)

const { clear, generate, generateInvalid } = useMnemonicStore()

watch(() => route.params.type, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    clear()
  }
})

const validations = computed((): Validation[] => {
  return [
    { fn: isCorrectLength.value, title: 'Correct Length', icon: 'width' },
    { fn: isFromDictionary.value, title: 'From Dictionary', icon: 'dictionary' },
    { fn: isValidMnemonic.value, title: 'BIP-39 Valid', icon: 'license' }
  ]
})

const copy = (text: string) => {
  navigator.clipboard.writeText(text)
}

const paste = () => {
  navigator.clipboard.readText()
    .then(res => {
      mnemonic.value = res
    })
}
</script>

<template>
  <div class="generate-valid-view">
    <h1>{{ route.params.type }} Mnemonic</h1>

    <div class="pads-grid">
      <PadBox v-if="route.params.type === 'valid'">
        <template #drop-cap>1</template>
        <template #heading>Generate</template>
        <template #about>BIP-39 standard: 11 random words + checksum word</template>
        <template #body>
          <div v-if="mnemonic">
            {{ mnemonic }}&#32;<CopyIcon :text="mnemonic"/>
          </div>
        </template>
        <template #footer>
          <button v-show="mnemonic" class="secondary" @click="storeMnemonic.clear">Clear</button>
          <button @click="generate">Generate Valid</button>
        </template>
      </PadBox>

      <PadBox v-else-if="route.params.type === 'invalid'">
        <template #drop-cap>1</template>
        <template #heading>Generate</template>
        <template #about>BIP-39 dictionary: 12 random words</template>
        <template #body>
          <div v-if="mnemonic">
            {{ mnemonic }}&#32;<CopyIcon :text="mnemonic"/>
          </div>
        </template>
        <template #footer>
          <button v-show="mnemonic" class="secondary" @click="storeMnemonic.clear">Clear</button>
          <button @click="generateInvalid">Generate Invalid</button>
        </template>
      </PadBox>

      <PadBox v-else-if="route.params.type === 'input'">
        <template #drop-cap>1</template>
        <template #heading>Input</template>
        <template #about>Your own mnemonic phrase</template>
        <template #body>
          <textarea v-model="mnemonic">asd</textarea>
        </template>
        <template #footer>
          <button v-show="mnemonic" class="secondary" @click="storeMnemonic.clear">Clear</button>
          <button v-show="mnemonic" class="secondary" @click="copy(mnemonic)">Copy</button>
          <button @click="paste">Paste</button>
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
                <span class="nowrap">{{ validation.title }}</span>
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
          <WordsTable />
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
            BIP-32 derivation for {{ derivation.title }} using BIP-44 path: {{ derivation.path }}
          </template>
          <template #body>
            <h3>Public Keys</h3>
            <div class="mono break" v-for="publicKey in derivation.publicKeys" :key="publicKey.slice(0,6)">
              -
              <ShortenedText :text="publicKey"/>
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
h1 {
  text-transform: capitalize;
}

.pads-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--gutter);
  place-items: stretch;
}

textarea {
  width: 100%;
  height: 100px; /* to match the validity pad */
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

@media (max-width: 1200px) {
  .pads-grid {
    grid-template-columns: 1fr;
  }

  .pad4 {
    grid-column: 1/2;
  }
}
</style>