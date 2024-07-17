<script setup lang="ts">
import { ref, computed } from 'vue'

type Props = {
  text: string,
  radius?: number
}
const props = withDefaults(defineProps<Props>(), {
  radius: 10
})

const shortened = computed(() => {
  if (props.text.length <= props.radius * 2) {
    return props.text
  } else {
    return props.text.slice(0, props.radius) + '...' + props.text.slice(-1 * props.radius) + ` (${props.text.length} ch.)`
  }
})

const shorten = ref(true)

const result = computed(() => {
  return shorten.value
    ? shortened.value
    : props.text
})

const toggle = () => {
  shorten.value = !shorten.value
}
</script>

<template>
  <span class="shortened-text" @click="toggle">{{ result }}</span>
</template>

<style scoped>
  .shortened-text {
    cursor: pointer;
  }
</style>