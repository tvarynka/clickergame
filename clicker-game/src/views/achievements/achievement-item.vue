<template>
  <div class="achievement">
    {{ achievement.name }}

    <div class="description">
      {{ achievement.description }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  achievement: {
    type: Object
  }
});
</script>

<style scoped>
  .achievement {
    height: 60px;
    margin: 3px 15px;
    border: 1px solid;
    position: relative;
    cursor: pointer;
    text-align: left;
    padding: 5px;
  }

  .achievement:hover .description {
    display: block;
  }

  /* .description {
    padding: 10px;
    background-color: white;
    position: absolute;
    left: 0;
    top: 62px;
    display: none;
    border: 1px solid;
  } */
</style>