<template>
  <div class="main">
    <div>
      <CounterComponent :count="counter" />
      <MainClicker @click="updateCounter" :click-value="clickIncrement" />
    </div>

    <div>
      <template :key="upgrade.name" v-for="upgrade of upgrades">
        <BasicUpgrade
          :name="upgrade.name"
          :amount="upgrade.amount"
          :price="upgrade.price"
          :description="upgrade.description"
          :available="counter >= upgrade.price"
          @click="updateUpgrade(upgrade.name)"
        />
      </template>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import MainClicker from '../components/main-clicker.vue';
import CounterComponent from '../components/counter-component.vue';
import BasicUpgrade from '@/components/basic-upgrade.vue';

const counter = ref(0);
const upgrades = ref([
  {
    name: 'Клік +1',
    type: 'manual',
    price: 1,
    description: 'Додає +1 до вартості кліка',
    amount: 0,
    priceIncreaseMultiplier: 1.1,
  },
  {
    name: 'Автоклік',
    type: 'auto',
    price: 10,
    description: 'Автоматично клікає раз на секунду',
    amount: 0,
    priceIncreaseMultiplier: 1.2,
    multiplier: 1,
  },
  {
    name: 'Людина, що клікає',
    type: 'auto',
    price: 100,
    description: 'Людина, що клікає замість тебе. Вдвічі швидша за автоклік.',
    amount: 0,
    priceIncreaseMultiplier: 1.2,
    multiplier: 2,
  }
]);

const clickIncrement = computed(() => {
  let increment = 1;

  for (let i = 0; i < upgrades.value.length; i++) {
    if (upgrades.value[i].type === 'manual') {
      increment += upgrades.value[i].amount;
    }
  }

  return increment;
});

const autoClickIncrement = computed(() => {
  let increment = 0;

  for (let i = 0; i < upgrades.value.length; i++) {
    if (upgrades.value[i].type === 'auto') {
      increment += upgrades.value[i].amount * upgrades.value[i].multiplier;
    }
  }

  return increment;
});

function updateCounter() {
  counter.value += clickIncrement.value;
}

function updateUpgrade(name) {
  const upgradeIndex = upgrades.value.findIndex(obj => obj.name === name);
  const upgrade = upgrades.value[upgradeIndex];

  if (upgrade.price > counter.value) {
    return;
  }

  counter.value -= upgrade.price;
  upgrade.amount++;
  upgrade.price += Math.floor(upgrade.amount * upgrade.priceIncreaseMultiplier);

  upgrades.value[upgradeIndex] = upgrade;
}

onMounted(() => {
  setInterval(() => {
    counter.value += autoClickIncrement.value;
  }, 1000);
});
</script>

<style scoped>
  .main {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
</style>
