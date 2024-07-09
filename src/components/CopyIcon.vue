<script setup lang="ts">
import { ref } from 'vue'

type Props = {
  text: string
}

const props = defineProps<Props>()

const showCopy = ref(true)

const copy = (text: string): void => {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Copied!')
      showCopy.value = false
      setTimeout(() => {
        showCopy.value = true
      }, 900)
    })
}
</script>

<template>
  <span class="material-symbols-rounded copy" v-if="showCopy" @click="copy(props.text)">content_copy</span>
  <span class="material-symbols-rounded check" v-else>check</span>
</template>

<style scoped>
span {
  vertical-align: middle;
}

span.copy {
  cursor: pointer;
}

span.check {
  color: grey;
}
</style>