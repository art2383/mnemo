<script setup>
import { ref, watch } from 'vue'
import { useStoreMnemonic } from '@/stores/mnemonic.ts'
import { storeToRefs } from 'pinia'
import { mnemonicToSeed } from 'bip39'

const storeMnemonic = useStoreMnemonic()
const { mnemonic, mnemonicWords, isValid } = storeToRefs(storeMnemonic)

const seed = ref('')

watch(mnemonic, (newVal) => {
  // this would have been better implemented without watcher,
  // by using mnemonicToSeedSync (synchronous analogue to mnemonicToSeed),
  // but I didn't know that at the time;
  // practiced the watcher though, which is good.
  if (!newVal) {
    return
  }

  mnemonicToSeed(newVal)
    .then((res) => { // result is of type Buffer
      seed.value = res.toString('hex')
    })
})

const copy = (text) => {
  navigator.clipboard.writeText(text)
  console.log('copied!')
}
</script>

<template>
  <div class="generate-valid-view">
    <h1>Generate Valid Mnemonic</h1>

    <div class="buttons">
      <button @click="storeMnemonic.generate">Generate</button>
      <button class="secondary" v-show="mnemonic" @click="storeMnemonic.clear">Clear</button>
    </div>

    <template v-if="mnemonic">
      <h3>Mnemonic</h3>
      <div class="mnemonic">
        {{ mnemonic }} <button @click="copy(mnemonic)">Copy</button>
      </div>

      <h3>Validity</h3>
      <div class="validity" :class="{invalid: !isValid}">
        Mnemonic is <span v-if="!isValid">NOT</span> valid
      </div>

      <h3>Words Table</h3>
      <div class="mnemonic-table mnemonic-table--ver">
        <div class="th">#</div>
        <div v-for="n in 12" :key="n">{{ n }}</div>
        <div class="th">Word</div>
        <div class="word" v-for="(mnemonicWord, i) in mnemonicWords" :key="i">{{ mnemonicWord.word }}</div>
        <div class="th">Line</div>
        <div class="word" v-for="(mnemonicWord, i) in mnemonicWords" :key="i">{{ mnemonicWord.line }}</div>
        <div class="th">Hex</div>
        <div class="word" v-for="(mnemonicWord, i) in mnemonicWords" :key="i">{{ mnemonicWord.hex }}</div>
      </div>

      <h3>Seed</h3>
      <div class="seed">
        {{ seed }}
      </div>
    </template>
  </div>
</template>

<style scoped>
h3 {
  margin-top: var(--gutter);
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
  grid-template-columns: repeat(13, 100px);
  grid-template-rows: repeat(4, min-content);
  grid-auto-flow: row;
}

.mnemonic-table div {
  margin: 1px;
  padding: 0 10px;
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