<template>
  <div
    ref="gift"
    class="gift"
    @click="clickHandler"
  >
  </div>

  <div ref="messageElement" class="message">
    {{ message }}
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits, defineProps } from 'vue';

const gift = ref(null);
const prize = ref(0);
const message = ref('');
const messageElement = ref(null);
const type = ref('');

const emit = defineEmits(['click']);

const props = defineProps({
  currentBank: {
    type: Number,
    default: 10,
  }
});

const types = ['money', 'autoClickBonus', 'clickBonus'];

onMounted(() => {
  setInterval(() => {
    const left = Math.random() * (document.documentElement.clientWidth - 400);
    const top = Math.random() * (document.documentElement.clientHeight - 400);

    gift.value.style.display = 'flex';
    gift.value.style.left = left + 'px';
    gift.value.style.top = top + 'px';

    generatePrize();

    setTimeout(() => {
      if (gift.value) {
        gift.value.style.display = 'none';
      }
    }, 10000);
  }, 60000);
});

function clickHandler(e) {
  gift.value.style.display = 'none';
  emit('click', type.value, prize.value);

  messageElement.value.style.left = e.pageX + 'px';
  messageElement.value.style.top = e.pageY + 'px';
  messageElement.value.style.display = 'block';

  setTimeout(() => {
    messageElement.value.style.display = 'none';
  }, 2000);
}

function generatePrize() {
  type.value = types[Math.round(Math.random() * (types.length - 1))];

  if (type.value === 'money') {
    prize.value = Math.ceil(Math.random() * (props.currentBank < 10 ? 10 : props.currentBank) / 2);
    message.value = `Ви одержали +${prize.value} в банк`;
  } else if (type.value === 'autoClickBonus') {
    prize.value = Math.max(Math.floor(Math.random() * 3), 1.2);
    message.value = `Ви одержали x${prize.value} до автокліку на 30 секунд`;
  } if (type.value === 'clickBonus') {
    prize.value = Math.max(Math.floor(Math.random() * 10), 1.2);
    message.value = `Ви одержали x${prize.value} до кліку на 30 секунд`;
  }
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
}
</style>