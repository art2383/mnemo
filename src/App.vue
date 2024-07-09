<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'

const theme = ref('')

onMounted(() => {
  theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
})

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="app" :class="'theme-'+theme">
    <NavBar :theme="theme" @theme-clicked="toggleTheme" />
    <main>
      <RouterView/>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: var(--color-main-bg);
}

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