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
      <MainClicker @click="updateBankOnClick" :click-value="clickValue" />
      <StatisticsView
        :total-clicks="totalClicks"
        :click-value="clickValue"
        :autoclick-value="autoclickValue"
      />
    </div>

    <AchievementsContainer
      :upgrades="userUpgrades"
      :click-value="clickValue"
      :autoclick-value="autoclickValue"
    />

    <div class="upgrades">
      <template :key="upgrade.name" v-for="upgrade of UPGRADES_LIST">
        <BasicUpgrade
          :upgrade="upgrade"
          :amount="getUpgradeAmount(upgrade.name)"
          @update="updateUpgrade"
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
const userUpgrades = ref(new Map());
const activeGifts = ref([]);

const clickValue = computed(() => {
  let increment = 1;

  for (let i = 0; i < UPGRADES_LIST.length; i++) {
    if (UPGRADES_LIST[i].type === 'manual') {
      increment += userUpgrades.value.get(UPGRADES_LIST[i].name) * UPGRADES_LIST[i].multiplier;
    }
  }

  increment = increment * store.state.clickBonus;

  return Math.floor(increment);
});

const autoclickValue = computed(() => {
  let increment = 0;

  for (let i = 0; i < UPGRADES_LIST.length; i++) {
    if (UPGRADES_LIST[i].type === 'auto') {
      increment += userUpgrades.value.get(UPGRADES_LIST[i].name) * UPGRADES_LIST[i].multiplier;
    }
  }

  increment = increment * store.state.autoClickBonus;

  return Math.floor(increment);
});

function updateBankOnClick() {
  store.dispatch('increaseBank', clickValue.value);
  totalClicks.value++;
}

function updateUpgrade(name) {
  userUpgrades.value.set(name, userUpgrades.value.get(name) + 1);
}

function getUpgradeAmount(name) {
  return userUpgrades.value.get(name);
}

onMounted(() => {
  for (let upgrade of UPGRADES_LIST) {
    userUpgrades.value.set(upgrade.name, 0);
  }

  setInterval(() => {
    store.dispatch('increaseBank', autoclickValue.value);
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
    overflow: hidden;
  }

  .bank {
    width: 400px;
    position: relative;
    padding-top: 30px;
  }

  .upgrades {
    width: 350px;
    max-height: 100vh;
    overflow: auto;
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
