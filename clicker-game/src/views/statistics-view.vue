<template>
  <div class="statistics-container">
    <div class="stat">
      Усього зароблено за весь час: {{ scientific.format(store.state.totalBank, 2, 0) }}
    </div>
    <div class="stat">
      Усього кліків за весь час: {{ scientific.format(totalClicks, 2, 0) }}
    </div>
    <div class="stat">
      Монет за клік: {{ scientific.format(clickValue, 2, 0) }}
    </div>
    <div class="stat">
      Монет за секунду: {{ scientific.format(autoclickValue, 2, 0) }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import * as ADNotations from "@antimatter-dimensions/notations";

const scientific = new ADNotations.MixedScientificNotation();

const store = useStore();

defineProps({
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
.stat {
  text-align: left;
  margin: 5px 15px;
}
</style>