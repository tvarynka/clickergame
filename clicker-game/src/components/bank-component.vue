<template>
  <div class="counter">
    {{ count }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  count: Number
})
</script>

<style scoped>
.counter {
  font-size: 40px;
  color: blue;
  margin: 30px 0;
}
</style>