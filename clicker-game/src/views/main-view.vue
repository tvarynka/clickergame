<template>
  <div class="main">
    <div class="bank">
      <div class="timer-wrapper">
        <TimerComponent
            v-if="timer > 0"
            :time="timer"
            :type="prizeType"
            :prize="prizeValue"
        />
      </div>
      <BankComponent />
      <MainClicker @click="updateBankOnClick" :click-value="clickIncrement" />
      <StatisticsView
        :total-clicks="totalClicks"
        :click-value="clickIncrement"
        :autoclick-value="autoClickIncrement"
      />
    </div>

    <AchievementsContainer
      :upgrades="upgrades"
    />

    <div class="upgrades">
      <template :key="upgrade.name" v-for="upgrade of upgrades">
        <BasicUpgrade
          :upgrade="upgrade"
          @click="updateUpgrade(upgrade.name)"
        />
      </template>
      
    </div>

    <RandomGift @click="prizeClickHandler" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import MainClicker from '@/components/main-clicker.vue';
import BankComponent from '@/components/bank-component.vue';
import BasicUpgrade from '@/components/basic-upgrade.vue';
import RandomGift from '@/components/random-gift.vue';
import AchievementsContainer from './achievements/achievements-container.vue';
import StatisticsView from './statistics-view.vue';
import TimerComponent from '@/components/timer-component.vue';
import { UPGRADES_LIST } from '@/data/upgrades';

import { useStore } from 'vuex'

const store = useStore();

const totalClicks = ref(0);
const upgrades = ref([]);
const autoclickBonusIncrement = ref(1);
const clickBonusIncrement = ref(1);
const timer = ref(0);
const prizeValue = ref(0);
const prizeType = ref('');

const clickIncrement = computed(() => {
  let increment = 1;

  for (let i = 0; i < upgrades.value.length; i++) {
    if (upgrades.value[i].type === 'manual') {
      increment += upgrades.value[i].amount * upgrades.value[i].multiplier;
    }
  }

  increment = increment * clickBonusIncrement.value;

  return Math.floor(increment);
});

const autoClickIncrement = computed(() => {
  let increment = 0;

  for (let i = 0; i < upgrades.value.length; i++) {
    if (upgrades.value[i].type === 'auto') {
      increment += upgrades.value[i].amount * upgrades.value[i].multiplier;
    }
  }

  increment = increment * autoclickBonusIncrement.value;

  return Math.floor(increment);
});

function updateBankOnClick() {
  store.dispatch('increaseBank', clickIncrement.value);
  totalClicks.value++;
}

function updateUpgrade(name) {
  const upgradeIndex = upgrades.value.findIndex(obj => obj.name === name);
  const upgrade = upgrades.value[upgradeIndex];

  if (upgrade.price > store.state.bank) {
    return;
  }

  store.dispatch('decreaseBank', upgrade.price);
  upgrade.amount++;
  upgrade.price = Math.ceil((upgrade.price + upgrade.amount) * 1.2896685);

  upgrades.value[upgradeIndex] = upgrade;
}

function prizeClickHandler(type, prize) {
  prizeValue.value =  prize;
  prizeType.value = type;
  if (type === 'money') {
    store.dispatch('increaseBank', prize);
  } else if (type === 'autoClickBonus') {
    autoclickBonusIncrement.value = prize;
    timer.value = 30;

    setTimeout(() => {
      autoclickBonusIncrement.value = 1;
      timer.value = 0;
    }, 30000);
  } if (type === 'clickBonus') {
    clickBonusIncrement.value = prize;
    timer.value = 30;

    setTimeout(() => {
      clickBonusIncrement.value = 1;
      timer.value = 0;
    }, 30000);
  }
}

onMounted(() => {
  upgrades.value = UPGRADES_LIST;

  setInterval(() => {
    store.dispatch('increaseBank', autoClickIncrement.value);
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

  .bank {
    width: 400px;
  }

  .upgrades {
    width: 350px;
  }

  .timer-wrapper {
    height: 100px;
    width: 400px;
    position: relative;
  }
</style>
