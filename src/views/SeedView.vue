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
    { fn: isCorrectLength.value, title: 'validationLength', icon: 'width' },
    { fn: isFromDictionary.value, title: 'validationDictionary', icon: 'dictionary' },
    { fn: isValidMnemonic.value, title: 'validationBip39', icon: 'license' }
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
    <h1>{{ $t(`seed.h1${route.params.type}`) }}</h1>

    <div class="pads-grid">
      <PadBox v-if="route.params.type === 'valid'">
        <template #drop-cap>1</template>
        <template #heading>{{ $t('seed.generate') }}</template>
        <template #about>{{ $t('seed.aboutValid') }}</template>
        <template #body>
          <div v-if="mnemonic">
            {{ mnemonic }}&#32;<CopyIcon :text="mnemonic"/>
          </div>
        </template>
        <template #footer>
          <button v-show="mnemonic" class="secondary" @click="storeMnemonic.clear">{{ $t('common.clear') }}</button>
          <button @click="generate">{{ $t('seed.generate') }}</button>
        </template>
      </PadBox>

      <PadBox v-else-if="route.params.type === 'invalid'">
        <template #drop-cap>1</template>
        <template #heading>{{ $t('seed.generate') }}</template>
        <template #about>{{ $t('seed.aboutInvalid') }}</template>
        <template #body>
          <div v-if="mnemonic">
            {{ mnemonic }}&#32;<CopyIcon :text="mnemonic"/>
          </div>
        </template>
        <template #footer>
          <button v-show="mnemonic" class="secondary" @click="storeMnemonic.clear">{{ $t('common.clear') }}</button>
          <button @click="generateInvalid">{{ $t('seed.generate') }}</button>
        </template>
      </PadBox>

      <PadBox v-else-if="route.params.type === 'input'">
        <template #drop-cap>1</template>
        <template #heading>{{ $t('seed.input') }}</template>
        <template #about>{{ $t('seed.aboutInput') }}</template>
        <template #body>
          <textarea v-model="mnemonic"></textarea>
        </template>
        <template #footer>
          <button v-show="mnemonic" class="secondary" @click="storeMnemonic.clear">{{ $t('common.clear') }}</button>
          <button v-show="mnemonic" class="secondary" @click="copy(mnemonic)">{{ $t('common.copy') }}</button>
          <button @click="paste">{{ $t('common.paste') }}</button>
        </template>
      </PadBox>

      <PadBox v-if="mnemonic">
        <template #drop-cap>2</template>
        <template #heading>{{ $t('seed.validity') }}</template>
        <template #about>{{ $t('seed.aboutValidity') }}</template>
        <template #body>
          <div class="validity">
            <figure v-for="(validation, i) in validations" :key="i" :class="{invalid: !validation.fn}">
              <div class="icon">
                <span class="material-symbols-rounded">{{ validation.icon }}</span>
              </div>
              <figcaption>
                <span class="material-symbols-rounded" v-if="validation.fn" >check</span>
                <span class="material-symbols-rounded" v-else >close</span>
                <span class="small">{{ $t(`seed.${validation.title}`) }}</span>
              </figcaption>
            </figure>
          </div>
        </template>
        <template #footer></template>
      </PadBox>

      <PadBox v-if="mnemonic" class="passphrase">
        <template #drop-cap>3</template>
        <template #heading>{{ $t('seed.passphrase') }}</template>
        <template #about>{{ $t('seed.passphraseAbout') }}</template>
        <template #body>
          <input type="text" v-model="passphrase" :placeholder="$t('seed.passphrasePlaceholder')">
        </template>
        <template #footer></template>
      </PadBox>

      <PadBox class="pad4" v-if="mnemonic">
        <template #drop-cap>4</template>
        <template #heading>{{ $t('seed.wordsTable') }}</template>
        <template #about>{{ $t('seed.wordsTableAbout') }}</template>
        <template #body>
          <WordsTable/>
        </template>
        <template #footer></template>
      </PadBox>

      <PadBox v-if="mnemonic">
        <template #drop-cap>5</template>
        <template #heading>{{ $t('seed.seed') }}</template>
        <template #about>{{ $t('seed.seedAbout') }}</template>
        <template #body>
          <div class="mono break">
            {{ seed.seedString }}
          </div>
        </template>
        <template #footer></template>
      </PadBox>

      <PadBox v-if="mnemonic">
        <template #drop-cap>6</template>
        <template #heading>{{ $t('seed.rootKeys') }}</template>
        <template #about>{{ $t('seed.rootKeysAbout') }}</template>
        <template #body>
          <h3>{{ $t('seed.privateKey') }}</h3>
          <div class="mono break">
            {{ rootKey.toJSON().xpriv }}
          </div>
          <h3>{{ $t('seed.publicKey') }}</h3>
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
            {{ $t('seed.derivationAbout', {title: derivation.title, path: derivation.path}) }}
          </template>
          <template #body>
            <h3>{{ $t('seed.privateKeys') }}</h3>
            <div class="mono break" v-for="privateKeyReadable in derivation.privateKeysReadable" :key="privateKeyReadable.slice(0,6)">
              - <ShortenedText :text="privateKeyReadable"/>
            </div>
            <h3>{{ $t('seed.publicKeys') }}</h3>
            <div class="mono break" v-for="publicKeyReadable in derivation.publicKeysReadable" :key="publicKeyReadable.slice(0,6)">
              - <ShortenedText :text="publicKeyReadable"/>
            </div>
            <h3>{{ $t('seed.addresses') }}</h3>
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