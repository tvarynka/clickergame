<template>
  <div class="wrapper">
    <div class="badge">
      <img
        class="image"
        src="@/assets/images/gifts/coin.svg"
      >
    </div>
    <div class="timer">
      <div ref="scale" class="scale"></div>
    </div>
    <div class="message">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, watch } from 'vue';

const props = defineProps({
  gift: {
    type: Object,
  },
});
const timer = ref('');
const scale = ref('');

// eslint-disable-next-line
const message = computed(() => {
  if (props.type === 'autoClickBonus') {
    return `Заробіток за секунду збільшено в ${props.gift.value} раз на ${props.gift.time} секунд. \n Залишилось: ${timer.value}с`;
  }

  return `Заробіток за клік збільшено на ${props.gift.value} на ${props.gift.time} секунд. \n Залишилось: ${timer.value}с`;
});

watch(() => props.gift, (gift) => {
  timer.value = gift.time;
  let timerInterval;

  // eslint-disable-next-line 
  timerInterval = setInterval(() => {
    timer.value--;
    if (timer.value > 0) {
      scale.value.style.width = timer.value * 100 / gift.time + '%';
    }
  }, 1000);

  setTimeout(() => clearInterval(timerInterval), gift.time * 1000);
},
{ immediate: true });
</script>

<style scoped>
.wrapper {
  width: 50px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.timer {
  border: 1px solid;
  margin: 5px;
  padding: 1px;
  height: 5px;
  width: 100%;
}

.scale {
  background-color: green;
  height: 3px;
}

.badge {
  width: 45px;
  height: 45px;
}

.image {
  width: 45px;
  height: 45px;
  object-fit: contain;
}

.message {
  display: none;
  position: absolute;
  left: 50px;
  top: 10px;
  width: 120px;
  font-size: 12px;
  padding: 5px;
  background-color: white;
  box-shadow: 1px 3px 45px -14px rgba(66, 68, 90, 1);
  z-index: 1;
}

.wrapper:hover .message {
  display: block;
}
</style>