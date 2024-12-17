<template>
  <div class="main">
    <div class="bank">
      <div class="timer-wrapper">
        <template
          v-for="activeGift in activeGifts"
          :key="activeGift"
        >
          <TimerComponent
            v-if="activeGift.type !== 'money'"
            :gift="activeGift"
          />
        </template>
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

    <RandomGift @input="(value) => activeGifts = value" />
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

import { useStore } from 'vuex';

const store = useStore();

const totalClicks = ref(0);
const upgrades = ref([]);
const activeGifts = ref([]);

const clickIncrement = computed(() => {
  let increment = store.state.baseClickValue;

  for (let i = 0; i < upgrades.value.length; i++) {
    if (upgrades.value[i].type === 'manual') {
      increment += upgrades.value[i].amount * upgrades.value[i].multiplier;
    }
  }

  store.dispatch('changeClickIncrementAction', increment);
  increment = increment * store.state.clickBonus;

  return Math.floor(increment);
});

const autoClickIncrement = computed(() => {
  let increment = 0;

  for (let i = 0; i < upgrades.value.length; i++) {
    if (upgrades.value[i].type === 'auto') {
      increment += upgrades.value[i].amount * upgrades.value[i].multiplier;
    }
  }

  store.dispatch('changeAutoclickIncrementAction', increment * store.state.baseAutoclickBonus);
  increment = increment * store.state.autoClickBonus * store.state.baseAutoclickBonus;

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
    position: relative;
    padding-top: 30px;
  }

  .upgrades {
    width: 350px;
  }

  .timer-wrapper {
    height: 325px;
    width: 120px;
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-end;
  }
</style>
