<template>
  <h3>
    Монет в казні:
  </h3>
  <h1 class="counter">
    {{ bank }}
  </h1>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import * as ADNotations from "@antimatter-dimensions/notations";

const scientific = new ADNotations.MixedScientificNotation();

const store = useStore();

const bank = computed(() => {
  return scientific.format(store.state.bank, 2, 0);
});
</script>

<style scoped>
.counter {
  font-size: 40px;
  color: goldenrod;
  margin: 30px 0;
}
</style>