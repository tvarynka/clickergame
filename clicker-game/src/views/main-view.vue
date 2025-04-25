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
      <MainClicker @clicked="updateBankOnClick" :click-value="clickValue" />
      <StatisticsView
        :total-clicks="totalClicks"
        :click-value="clickValue"
        :autoclick-value="autoclickValue"
      />
    </div>

    <tabsWrapper
      :achievementsProps="achievementsProps"
    />

    <RandomGift @input="(value) => activeGifts = value" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import MainClicker from '@/components/main-clicker.vue';
import BankComponent from '@/components/bank-component.vue';
import RandomGift from '@/components/random-gift.vue';
import StatisticsView from './statistics-view.vue';
import TimerComponent from '@/components/timer-component.vue';
import { UPGRADES_LIST } from '@/data/upgrades';
import { useStore } from 'vuex';
import tabsWrapper from '@/components/tabs-wrapper.vue';

const store = useStore();

const totalClicks = ref(0);
const activeGifts = ref([]);

const achievementsProps = computed(() => {
  return {
      clickValue: clickValue.value,
      autoclickValue: autoclickValue.value,
  }
});

const clickValue = computed(() => {
  let increment = 1;

  for (let i = 0; i < UPGRADES_LIST.length; i++) {
    if (UPGRADES_LIST[i].type === 'manual') {
      increment += store.state.userUpgrades.get(UPGRADES_LIST[i].name) * UPGRADES_LIST[i].multiplier;
    }
  }

  increment = increment * store.state.clickBonus;

  return Math.floor(increment);
});

const autoclickValue = computed(() => {
  let increment = 0;

  for (let i = 0; i < UPGRADES_LIST.length; i++) {
    if (UPGRADES_LIST[i].type === 'auto') {
      increment += store.state.userUpgrades.get(UPGRADES_LIST[i].name) * UPGRADES_LIST[i].multiplier;
    }
  }

  increment = increment * store.state.autoClickBonus;

  return Math.floor(increment);
});

function updateBankOnClick() {
  store.dispatch('increaseBank', clickValue.value);
  totalClicks.value++;
}

onMounted(async () => {
  // send here fetched from server values
  store.dispatch('setInitialUserUpgrades');

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
