<template>
  <div
    ref="giftElement"
    class="gift"
    @click="clickHandler"
  >
  </div>

  <div ref="messageElement" class="message">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits, Ref } from 'vue';
import { RANDOM_GIFTS } from '@/data/random-gifts';

const giftElement = ref(null);
const message = ref('');
const messageElement = ref(null);
const emit = defineEmits(['click']);

interface Gift {
  type: String,
  time: Number,
  value: Number,
};

const gift: Ref<Gift | null> = ref(null);

onMounted(() => {
  setInterval(() => {
    const left = Math.random() * (document.documentElement.clientWidth - 400);
    const top = Math.random() * (document.documentElement.clientHeight - 400);

    giftElement.value.style.display = 'flex';
    giftElement.value.style.left = left + 'px';
    giftElement.value.style.top = top + 'px';

    generatePrize();

    setTimeout(() => {
      if (giftElement.value) {
        giftElement.value.style.display = 'none';
      }
    }, 10000);
  }, 60000);
});

function clickHandler(e) {
  giftElement.value.style.display = 'none';
  emit('click', gift.value);

  messageElement.value.style.left = e.pageX + 'px';
  messageElement.value.style.top = e.pageY + 'px';
  messageElement.value.style.display = 'block';

  setTimeout(() => {
    messageElement.value.style.display = 'none';
  }, 2000);
}

function generatePrize() {
  const gift = RANDOM_GIFTS[Math.round(Math.random() * (RANDOM_GIFTS.length - 1))];

  // if (type.value === 'money') {
  //   message.value = `Ви одержали +${prize.value} в банк`;
  // } else if (type.value === 'autoClickBonus') {
  //   message.value = `Ви одержали x${prize.value} до автокліку на 30 секунд`;
  // } if (type.value === 'clickBonus') {
  //   message.value = `Ви одержали x${prize.value} до кліку на 30 секунд`;
  // }
}
</script>

<style scoped>
.gift {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  display: none;
  z-index: 2;
  background-image: url('../assets/images/coin.svg');
  background-size: auto;
}

.message {
  display: none;
  position: absolute;
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 3px 45px -14px rgba(66, 68, 90, 1);
  background-color: white;
  z-index: 1;
}
</style>