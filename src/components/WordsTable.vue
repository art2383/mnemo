<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMnemonicStore } from '@/stores/mnemonic'

const storeMnemonic = useMnemonicStore()

const { mnemonicWords } = storeToRefs(storeMnemonic)
</script>

<template>
  <div class="mnemonic-table">
    <div class="th">#</div>
    <div v-for="n in 12" :key="n">{{ n }}</div>
    <div class="th">{{ $t('seed.word') }}</div>
    <div class="word" v-for="(mnemonicWord, i) in mnemonicWords" :key="i">{{ mnemonicWord.word }}</div>
    <div class="th">{{ $t('seed.line') }}</div>
    <div class="word" v-for="(mnemonicWord, i) in mnemonicWords" :key="i">{{ mnemonicWord.line }}</div>
    <div class="th">{{ $t('seed.hex') }}</div>
    <div class="word" v-for="(mnemonicWord, i) in mnemonicWords" :key="i">{{ mnemonicWord.hex }}</div>
  </div>
</template>

<style scoped>
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

@media (max-width: 1200px) {
  .mnemonic-table {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(13, min-content);
    grid-auto-flow: column;
  }
}
</style>
