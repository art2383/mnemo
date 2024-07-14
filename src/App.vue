<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import NavBar from '@/components/NavBar.vue'
import { useGeneralStore } from '@/stores/general.ts'

const generalStore = useGeneralStore()
const { theme} = storeToRefs(generalStore )
const { appInit } = generalStore
const menuShown = ref(false)

onMounted(() => {
  appInit()
})
</script>

<template>
  <div class="app" :class="'theme-'+theme">
    <div class="top-bar">
      <div class="logo">
        <router-link to="/"><img src="@/assets/images/seed2.png" alt="logo"></router-link>
      </div>
      <h2>Mnemo</h2>
      <span class="material-symbols-rounded hamburger" @click="menuShown = true">menu</span>
    </div>

    <main>
      <RouterView/>
    </main>

    <NavBar :class="{visible: menuShown}" @x-clicked="menuShown = false" @menu-item-clicked="menuShown = false"/>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: var(--color-main-bg);
}

.top-bar {
  display: none;
}

.hamburger {
  cursor: pointer;
}

main {
  padding: var(--gutter) var(--gutter) var(--gutter) calc(var(--navbar-width) + var(--gutter));
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100vh;
  width: var(--navbar-width);
  border-radius: 0 var(--radius) var(--radius) 0;
}

@media (max-width: 1200px) {
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-nav-2);
    padding: 10px var(--gutter);
  }

  .top-bar .logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-main-bg);
    display: grid;
    place-items: center;
    cursor: pointer;
  }

  .top-bar .logo img {
    width: 20px;
  }

  main {
    padding: var(--gutter);
  }

  nav {
    left: unset;
    right: 0;
    border-radius: var(--radius) 0 0 var(--radius);
    transform: translateX(100%);
    transition: all 100ms ease-in-out;
  }

  nav.visible {
    transform: translateX(0%);
  }
}

@media (min-width: 2000px) {
  main {
    width: 2500px;
  }
}
</style>