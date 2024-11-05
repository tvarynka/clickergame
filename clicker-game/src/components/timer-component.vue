<template>
  <div class="wrapper">
    <div class="timer">
      <div ref="scale" class="scale"></div>
    </div>
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
const scale = ref('');

// eslint-disable-next-line
const message = computed(() => {
  if (props.type === 'autoClickBonus') {
    return `Заробіток за секунду збільшено в ${props.prize} раз на ${timer.value} секунд`;
  }

  return `Заробіток за клік збільшено на ${props.prize} на ${timer.value} секунд`;
});

watch(() => props.time, (time) => {
  timer.value = time;
  let timerInterval

  // eslint-disable-next-line 
  timerInterval = setInterval(() => {
    timer.value--;
    if (timer.value > 0) {
      scale.value.style.width = timer.value * 100 / time + '%';
    }
  }, 1000);

  setTimeout(() => clearInterval(timerInterval), time * 1000);
},
{ immediate: true });
</script>

<style scoped>
.timer {
  border: 1px solid;
  margin: 5px;
  padding: 2px;
  height: 10px;
}

.scale {
  background-color: green;
  height: 100%;
}

.wrapper {
  position: absolute;
  left: 0;
  top: 0;
}
</style>