<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

type Props = {
  theme: string
}

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
  router.push({name: routeName})
}
</script>

<template>
  <nav>
    <div class="top">
      <div class="logo">
        <img src="@/assets/images/seed2.png" alt="logo">
      </div>
      <h3>Mnemonic</h3>
      <div v-for="(menuItem, key) in menu" :key="key"
           @click="goTo(key)"
           :class="['menu-item', {active: $route['name'] === key}]"
      >
        {{ menuItem }}
      </div>
    </div>

    <div class="bottom" @click="$emit('theme-clicked')">
      Theme: {{ props.theme }}
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: var(--gutter);
}

.logo {
  margin: 0 auto var(--gutter) auto;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

img {
  width: 100px;
}

h3 {
  margin-bottom: var(--gutter);
  text-align: center;
}

.menu-item {
  margin-bottom: 10px;
  padding: 3px 20px;
  border-radius: var(--radius);
  cursor: pointer;
}

.bottom {
  margin: 0 auto;
}
</style>