<template>
  <div>
    Монет в казні:
  </div>
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
  color: goldenrod;
  margin: 30px 0;
}
</style>