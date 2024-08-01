<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '@/stores/general'
import { VueToggles } from 'vue-toggles'
import { type VueTogglesProps } from 'vue-toggles'
import PadBox from '@/components/PadBox.vue'

const generalStore = useGeneralStore()
const { exposePrivateKeys, qDerivations } = storeToRefs(generalStore)
const { setExposePrivateKeys, setQDerivations } = generalStore

const toggleExposePrivateKeys = () => {
  setExposePrivateKeys(!exposePrivateKeys.value)
}

const showLabel = ref(false)

const changeQDerivations = (newVal: string) => {
  let newNumber: number = Number(newVal)
  if (newNumber > 10) {
    showLabel.value = true
    newNumber = 9
    setTimeout(() => {
      showLabel.value = false
    }, 4000)
  } else {
    showLabel.value = false
  }
  setQDerivations(newNumber)
}
</script>

<template>
  <div class="settings-view">
    <h1>{{ $t('settings.h1') }}</h1>

    <PadBox class="settings">
      <template #drop-cap><span class="material-symbols-rounded">settings</span></template>
      <template #heading>{{ $t('settings.general') }}</template>
      <template #body>
        <div class="setting">
          <span>{{ $t('settings.exposePrivateKeys') }}</span>
          <VueToggles :value="exposePrivateKeys" @click="toggleExposePrivateKeys" :width="50" />
        </div>

        <div class="setting">
          <span>{{ $t('settings.qDerivations') }}</span>
          <div class="input-group">
            <span><input :value="qDerivations" @input="changeQDerivations($event.target.value)" /></span>
            <small v-show="showLabel">{{ $t('settings.plenty') }}</small>
          </div>
        </div>
      </template>
    </PadBox>
  </div>
</template>

<style scoped>
.settings-view {
  width: 500px;
}

.setting {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting .input-group {
  position: relative;
}

.setting .input-group input {
  width: 50px;
  text-align: right;
}

.setting .input-group small {
  position: absolute;
  top: 40px;
  right: 0;
  white-space: nowrap;
}

@media (max-width: 1200px) {
  .settings-view {
    width: 100%;
  }
}
</style>
