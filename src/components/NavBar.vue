<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useGeneralStore } from '@/stores/general.ts'

const generalStore = useGeneralStore()
const { theme } = storeToRefs(generalStore)
const { switchLang, toggleTheme } = generalStore

const emit = defineEmits(['menu-item-clicked', 'x-clicked'])

const router = useRouter()
const route = useRoute()

const menu = [
  {
    title: 'Home',
    routeObject: {
      name: 'home',
      params: {} // for checking if menu is active
    }
  },
  {
    title: 'Valid Mnemonic',
    routeObject: {
      name: 'seed',
      params: {
        type: 'valid'
      }
    }
  },
  {
    title: 'Invalid Mnemonic',
    routeObject: {
      name: 'seed',
      params: {
        type: 'invalid'
      }
    }
  },
  {
    title: 'Input Mnemonic',
    routeObject: {
      name: 'seed',
      params: {
        type: 'input'
      }
    }
  }
]

const isMenuItemActive = (menuItem): boolean => {
  const stringOfMenuItem = JSON.stringify(menuItem.routeObject)
  const stringOfCurrentRoute = JSON.stringify({ name: route.name, params: route.params })
  return stringOfMenuItem === stringOfCurrentRoute
}

const goTo = (routeObject: object): void => {
  emit('menu-item-clicked')
  router.push(routeObject)
}
</script>

<template>
  <nav>
    <div class="close" @click="$emit('x-clicked')">
      <span class="material-symbols-rounded">close</span>
    </div>

    <div class="top">
      <div class="logo">
        <router-link to="/"><img src="@/assets/images/seed2.png" alt="logo"></router-link>
      </div>
      <h2>Mnemo</h2>
      <h3 v-for="(menuItem, i) in menu" :key="i"
          @click="goTo(menuItem.routeObject)"
          class="menu-item"
          :class="{active: isMenuItemActive(menuItem)}"
      >
        {{ menuItem.title }}
      </h3>
    </div>

    <footer>
      <span class="material-symbols-rounded" title="Switch Theme" @click="toggleTheme">
        {{ theme === 'light' ? 'light' : 'dark' }}_mode
      </span>
      <span class="lang" title="Switch Language" @click="switchLang">{{ $i18n.locale.toUpperCase() }}</span>
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
  cursor: pointer;
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
  display: flex;
  align-items: center;
}

footer > * {
  cursor: pointer;
}

footer .lang {
  margin-left: var(--gutter);
  font-weight: 600;
}

@media (max-width: 1200px) {
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