<script setup lang="ts">

</script>

<template>
  <div class="pad-box">
    <header>
      <div class="drop-cap"><slot name="drop-cap"></slot></div>
      <div class="heading"><slot name="heading"></slot></div>
      <small><slot name="about"></slot></small>
    </header>
    <div class="body">
      <slot name="body"></slot>
    </div>
    <footer v-if="this.$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.pad-box {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr max-content;
  background: var(--color-pad-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: 0 10px 15px -15px rgba(0,0,0,0.5);
  padding: var(--gutter);
}

header {
  margin: 0 0 var(--gutter) 0;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: max-content;
  column-gap: 10px;
  place-items: start;
}

header .drop-cap {
  grid-column: 1/2;
  grid-row: 1/3;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: var(--color-main-bg);
  font-size: 2.2rem;
  font-weight: 800;
  display: grid;
  place-items: center;
}

header .heading {
  font-size: 1.2rem;
  font-weight: 600;
}

footer {
  margin: var(--gutter) 0 0 0;
  display: flex;
  justify-content: flex-end;
}

:deep(button:not(:first-child)) { /* most of the time the html passed into this component via slot from a parent will contain buttons */
  margin-left: var(--gutter);
}

:deep(h3:not(:first-child)) {
  margin-top: var(--gutter);
}
</style>