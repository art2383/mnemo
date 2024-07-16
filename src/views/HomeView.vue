<script setup lang="ts">

</script>

<template>
  <div class="home-view">
    <div class="intro">
      <h1>{{ $t('home.h1') }}</h1>
      <h2>{{ $t('home.things') }}:</h2>
      <p>- {{ $t('home.valid') }}</p>
      <p>- {{ $t('home.invalid') }}</p>
      <p>- {{ $t('home.input') }}</p>
      <p>- {{ $t('home.differentChains') }}</p>
      <p>- {{ $t('home.word12') }}</p>
    </div>
  </div>
</template>

<style scoped>
.intro {
  margin: 0 0 50px 0;
}
</style>