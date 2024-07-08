<script setup lang="ts">
import PadBox from '@/components/PadBox.vue'
</script>

<template>
  <div class="home-view">
    <div class="intro">
      <h1>Home</h1>
      <h2>Things you can do here:</h2>
      <p>- Create valid BIP-39 mnemonic</p>
      <p>- Create alternative (invalid) mnemonic</p>
      <p>- Input mnemonic and check it</p>
      <p>- Generate addresses on different blockchains!</p>
    </div>

    <PadBox>
      <template #drop-cap>1</template>
      <template #heading>Mnemonic Phrase</template>
      <template #about>Generated with BIP-39 specs</template>
      <template #body>
        <h3>Lorem</h3>
        <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Duration  3.31s (transform 370ms, setup 2ms, collect 1.10s, tests 180ms, environment 4.15s, prepare 522ms)</p>
        <h3>Ipsum</h3>
        <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Duration  3.31s (transform 370ms, setup 2ms, collect 1.10s, tests 180ms, environment 4.15s, prepare 522ms)</p>
      </template>
      <template #footer>
        <button class="secondary">Cancel</button>
        <button>Save</button>
      </template>
    </PadBox>
  </div>
</template>

<style scoped>
.intro {
  margin: 0 0 50px 0;
}

.pad-box {
  width: 50%;
}
</style>