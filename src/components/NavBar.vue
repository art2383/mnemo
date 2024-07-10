<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

type Props = {
  theme: string
}

const emit = defineEmits(['menu-item-clicked', 'x-clicked'])

const props = withDefaults(defineProps<Props>(), {
  theme: 'light'
})

const router = useRouter()
const route = useRoute()

const menu: object = { // not wrapped in ref, because it doesn't seem necessary, it is a constant, not something reactive
  home: 'Home',
  generateValid: 'Generate Valid',
  generateInvalid: 'Generate Invalid'
}

const goTo = (routeName: string): void => {
  if (route.name === routeName) {
    return
  }
  emit('menu-item-clicked')
  router.push({ name: routeName })
}
</script>

<template>
  <nav>
    <div class="close" @click="$emit('x-clicked')">
      <span class="material-symbols-rounded">close</span>
    </div>

    <div class="top">
      <div class="logo">
        <img src="@/assets/images/seed2.png" alt="logo">
      </div>
      <h2>Mnemo</h2>
      <div v-for="(menuItem, key) in menu" :key="key"
           @click="goTo(key)"
           :class="['menu-item', {active: $route['name'] === key}]"
      >
        {{ menuItem }}
      </div>
    </div>

    <footer @click="$emit('theme-clicked')">
      <span class="material-symbols-rounded" title="Switch Theme">
        {{ props.theme === 'light' ? 'light' : 'dark' }}_mode
      </span>
    </footer>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  background: linear-gradient(to bottom, var(--color-nav-1) 0%, var(--color-nav-2) 100%);
  padding: var(--gutter);
  flex-direction: column;
  justify-content: space-between;
}

nav * {
  color: var(--color-nav-font);
}

.close {
  display: none;
}

.logo {
  margin: 0 auto var(--gutter) auto;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: var(--color-main-bg);
  display: grid;
  place-items: center;
}

img {
  width: 100px;
}

h2 {
  margin-bottom: var(--gutter);
  text-align: center;
}

.menu-item {
  margin-bottom: 10px;
  padding: 3px 20px;
  border-radius: var(--radius);
  cursor: pointer;
}

.menu-item:hover {
  background: var(--color-nav-1);
}

.menu-item.active {
  background: var(--color-main-bg);
  color: var(--color-font)
}

footer {
  margin: 0 auto;
}

footer > * {
  cursor: pointer;
}

@media(max-width: 1200px) {
  .close {
    position: fixed;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    padding: var(--gutter) var(--gutter) 0 0;
    display: grid;
    place-items: start end;
    cursor: pointer;
    /*border: 1px solid pink;*/
  }
}
</style>