<template>
  <div class="statistics-container">
    <div class="stat">
      Усього зароблено за весь час: {{ totalBank }}
    </div>
    <div class="stat">
      Усього кліків за весь час: {{ totalClicks }}
    </div>
    <div class="stat">
      Монет за клік: {{ clickValue }}
    </div>
    <div class="stat">
      Монет за секунду: {{ autoclickValue }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  totalBank: {
    type: Number,
  },
  totalClicks: {
    type: Number,
  },
  clickValue: {
    type: Number,
  },
  autoclickValue: {
    type: Number,
  }
})
</script>

<style scoped>
.statistics-container {
  border: 1px solid;
  height: 400px;
}

.stat {
  text-align: left;
  margin: 5px;
}
</style>