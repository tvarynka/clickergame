<template>
  <template
    v-for="giftItem of giftItems"
    :key="giftItem"
  >
    <div
      class="gift"
      :style="`display: flex; left: ${giftItem.left}px; top: ${giftItem.top}px`"
      @click="clickHandler(giftItem)"
    >
    </div>
  </template>

  <template
    v-for="message of messages"
    :key="message"
  >
    <div
      class="message"
      :style="`display: flex; left: ${message.left}px; top: ${message.top}px`"
    >
      {{ message.text }}
    </div>
  </template>
</template>

<script setup>
import { onMounted, ref, watch, computed, defineEmits } from 'vue';
import { RANDOM_GIFTS } from '@/data/random-gifts';
import { useStore } from 'vuex';

const store = useStore();

const giftItems = ref([]);
const messages = ref([]);
const activeGifts = ref([]);
const gift = ref({});

const emit = defineEmits(['input']);

onMounted(() => {
  setInterval(() => {
    const left = Math.random() * (document.documentElement.clientWidth - 400);
    const top = Math.random() * (document.documentElement.clientHeight - 40);

    const newGiftItem = {
      left,
      top,
    };

    giftItems.value.push(newGiftItem);

    setTimeout(() => {
      removeGiftElement(newGiftItem);
    }, 10000);
  }, 60000);
});

const autoClickBonus = computed(() => {
  let bonus = 1;

  for (let i = 0; i < activeGifts.value.length; i++) {
    if (activeGifts.value[i].type === 'autoClickBonus') {
      bonus = bonus * activeGifts.value[i].value;
    }
  }

  return bonus;
});

const clickBonus = computed(() => {
  let bonus = 1;

  for (let i = 0; i < activeGifts.value.length; i++) {
    if (activeGifts.value[i].type === 'clickBonus') {
      bonus = bonus * activeGifts.value[i].value;
    }
  }

  return bonus;
});

watch(autoClickBonus, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    store.dispatch('changeAutoclickBonusAction', newValue);
  }
});

watch(clickBonus, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    store.dispatch('changeClickBonusAction', newValue);
  }
});

function clickHandler(giftItem) {
  generatePrize();
  removeGiftElement(giftItem);

  displayMessage(giftItem);
  processGiftValue(giftItem);

  emit('input', activeGifts.value);
}

function generatePrize() {
  if (activeGifts.value.length >= 5) {
    do {
      gift.value = RANDOM_GIFTS[Math.round(Math.random() * (RANDOM_GIFTS.length - 1))];
    } while (gift.value.type !== 'money')
  } else {
    gift.value = RANDOM_GIFTS[Math.round(Math.random() * (RANDOM_GIFTS.length - 1))];
  }
}

function displayMessage(giftItem) {
  let message = {
    left: giftItem.left,
    top: giftItem.top,
  };

  if (gift.value.type === 'money') {
    message.text = `Ви одержали +${Math.max(Math.round(store.state.bank * gift.value.value / 100), 100)} в банк`;
  } else if (gift.value.type=== 'autoClickBonus') {
    message.text = `Ви одержали x${gift.value.value} до автокліку на ${gift.value.time} секунд`;
  } if (gift.value.type === 'clickBonus') {
    message.text = `Ви одержали x${gift.value.value} до кліку на ${gift.value.time} секунд`;
  } if (gift.value.type === 'giftFrequency') {
    message.text = `Подарунки з'являються x${gift.value.value} раз частіше наступні ${gift.value.time} секунд`;
  }

  messages.value.push(message);

  setTimeout(() => {
    messages.value = messages.value.filter((item) => !isSameItem(item, message));
  }, 2000);
}

function processGiftValue(giftItem) {
  const currentGift = {...giftItem, ...gift.value};

  if (currentGift.type === 'money') {
    store.dispatch('increaseBank', Math.max(Math.round(store.state.bank * currentGift.value / 100), 100));
    return;
  }

  activeGifts.value.push(currentGift);

  setTimeout(() => {
    activeGifts.value = activeGifts.value.filter((item) => !isSameItem(item, currentGift));
    emit('input', activeGifts.value);
  }, currentGift.time * 1000);
}

function isSameItem(object1, object2) {
  return object1.top === object2.top && object1.left === object2.left;
}

function removeGiftElement(itemToRemove) {
  giftItems.value = giftItems.value.filter((giftItem) =>  !isSameItem(giftItem, itemToRemove));
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