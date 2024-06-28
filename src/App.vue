<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'

const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div :class="['app', 'theme-'+theme]">
    <NavBar :theme="theme" @theme-clicked="toggleTheme" />
    <main>
      <RouterView/>
    </main>
  </div>
</template>

<style scoped>
nav {
  position: fixed;
  left: 0; top: 0;
  z-index: 10;
  height: 100vh;
  width: var(--navbar-width);
}

main {
  padding: var(--gutter) var(--gutter) var(--gutter) calc(var(--navbar-width) + var(--gutter));
}
</style>