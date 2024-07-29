<script setup lang="ts">

</script>

<template>
  <div class="home-view">
    <div class="readme">
      <h1>{{$t('readme.heading')}}</h1>

      <h2>{{$t('readme.myDemo')}}</h2>
      <ul>
        <li>{{$t('readme.deployed')}}: <a href="https://mnemo1.vercel.app" target="_blank">mnemo1.vercel.app</a></li>
        <li>{{$t('readme.sourceCode')}}: <a href="https://github.com/art2383/mnemo" target="_blank">github.com/art2383/mnemo</a></li>
      </ul>

      <h2>{{$t('readme.appDoes')}}</h2>
      <ul>
        <li>{{$t('readme.does1')}}</li>
        <li>{{$t('readme.does2')}}</li>
        <li>{{$t('readme.does3')}}</li>
        <li>{{$t('readme.does4')}}</li>
        <li>{{$t('readme.does5')}}</li>
        <li>{{$t('readme.does6')}}</li>
      </ul>

      <h2>{{$t('readme.appHas')}}</h2>
      <ul>
        <li>{{$t('readme.has1')}}</li>
        <li>{{$t('readme.has2')}}</li>
        <li>{{$t('readme.has3')}}</li>
        <li>{{$t('readme.has4')}}</li>
        <li>{{$t('readme.has5')}}</li>
        <li>{{$t('readme.has6')}}</li>
        <li>{{$t('readme.has7')}}</li>
      </ul>

      <h2>{{$t('readme.testing')}}</h2>
      <ul>
        <li v-html="$t('readme.test1', {link: `<a href='https://iancoleman.io/bip39' target='_blank'>Ian Coleman's BIP-39 online tool</a>`})"></li>
        <li>{{$t('readme.test2')}}</li>
        <li>{{$t('readme.test3')}}</li>
      </ul>

      <h2>{{$t('readme.disclaimer')}}</h2>
      <ul>
        <li>{{$t('readme.dis1')}}</li>
      </ul>

    </div>
  </div>
</template>

<style scoped>
.readme h2 {
  margin-bottom: calc(0.5 * var(--gutter));
}

.readme ul {
  margin-bottom: calc(1 * var(--gutter));
  padding-left: calc(2 * var(--gutter));
  line-height: 180%;
}
</style>