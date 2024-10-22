<template>
  <div class="timer">
    {{ message }}
  </div>
</template>

<script setup>
import { defineProps, ref, computed, watch } from 'vue';

const props = defineProps({
  time: {
    type: Number,
  },
  type: {
    type: String,
  },
  prize: {
    type: Number,
  }
});

const timer = ref('');

const message = computed(() => {
  if (props.type === 'autoClickBonus') {
    return `Заробіток за секунду збільшено в ${props.prize} раз на ${timer.value} секунд`;
  }

  return `Заробіток за клік збільшено на ${props.prize} раз на ${timer.value} секунд`;
});

watch(() => props.time, () => {
  timer.value = props.time;

  setInterval(() => {
    timer.value--;
  }, 1000);
  // release interval!!
},
{ immediate: true });
</script>