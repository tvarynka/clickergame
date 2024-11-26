<template>
  <div>
    Монет в казні:
  </div>
  <div class="counter">
    {{ store.state.bank }}
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();
</script>

<style scoped>
.counter {
  font-size: 40px;
  color: goldenrod;
  margin: 30px 0;
}
</style>