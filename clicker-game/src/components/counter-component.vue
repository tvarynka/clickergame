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
  width: 200px;
  font-size: 40px;
  color: blue;
  margin: 30px 0;
}
</style>