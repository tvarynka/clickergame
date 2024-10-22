<template>
  <div
    ref="gift"
    class="gift"
    @click="clickHandler"
  >
    <img src="../assets/images/coin.svg" />
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

const emit = defineEmits(['click']);

const props = defineProps({
  currentBank: {
    type: Number,
    default: 10,
  }
});

onMounted(() => {
  setInterval(() => {
    const left = Math.random() * (document.documentElement.clientWidth - 200);
    const top = Math.random() * (document.documentElement.clientHeight - 200);

    gift.value.style.left = left + 'px';
    gift.value.style.top = top + 'px';
    gift.value.style.display = 'flex';
    prize.value = Math.floor(Math.random() * (props.currentBank < 10 ? 10 : props.currentBank) / 2);

    setTimeout(() => {
      gift.value.style.display = 'none';
    }, 10000);
  }, 50000);
});

function clickHandler(e) {
  gift.value.style.display = 'none';
  emit('click', prize.value);

  message.value = `Ви одержали +${prize.value}`;
  messageElement.value.style.left = e.pageX + 'px';
  messageElement.value.style.top = e.pageY + 'px';
  messageElement.value.style.display = 'block';

  setTimeout(() => {
      messageElement.value.style.display = 'none';
    }, 2000);
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
}

.message {
  display: none;
  position: absolute;
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 3px 45px -14px rgba(66, 68, 90, 1);
}
</style>