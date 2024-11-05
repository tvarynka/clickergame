<template>
  <div class="container">
    <h4>Досягнуто: {{ achieved }} з {{ achievements.length }}</h4>
    <div class="achievements">
      <template :key="achievement"
        v-for="achievement of achievements"
      >
        <AchievementItem
          v-if="achievement.isAchieved"
          :achievement="achievement"
        >
        </AchievementItem>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import AchievementItem from './achievement-item.vue';

const props = defineProps({
  bank: {
    type: Number
  },
  totalBank: {
    type: Number
  },
  upgrades: {
    type: Array
  }
});

const achievements = computed(() => [
  {
    name: 'Перший гріш',
    isAchieved: props.totalBank > 0,
    description: 'Зароблено першу монетку',
  },
  {
    name: 'Дзвенить у кишені',
    isAchieved: props.bank > 100,
    description: 'Маєш одночасно 100 монет в банку',
  },
  {
    name: 'Багач',
    isAchieved: props.totalBank > 10000,
    description: 'Сумарно зароблено 10000 монет',
  },
  {
    name: 'Мільйонер',
    isAchieved: props.totalBank > 1000000,
    description: 'Сумарно зароблено 1000000 монет',
  },
  {
    name: 'Мільярдер',
    isAchieved: props.totalBank > 1000000000,
    description: 'Сумарно зароблено 1000000000 монет',
  },
  {
    name: 'Набожний',
    isAchieved: getUpgradeAmountByName('Церква') > 100,
    description: 'Маєш 100 церков',
  },
  {
    name: 'Better Call Мольфар',
    isAchieved: getUpgradeAmountByName('Мольфар') > 1,
    description: 'В селі тепер є мольфар',
  },
  {
    name: 'Пан',
    isAchieved: allAmountsAreBiggerThen(10),
    description: 'Є по 10 кожного покращення',
  },
  {
    name: 'Лорд',
    isAchieved: allAmountsAreBiggerThen(100),
    description: 'Є по 100 кожного покращення',
  },
]);

const achieved = computed(() => {
  let counter = 0;

  for (let i = 0; i < achievements.value.length; i++) {
    if (achievements.value[i].isAchieved) {
      counter++;
    }
  }

  return counter;
});

function getUpgradeAmountByName(upgradeName) {
  const upgrade = props.upgrades.find((item) => item.name === upgradeName);

  return upgrade ? upgrade.amount : 0;
}

function allAmountsAreBiggerThen(value) {
  return props.upgrades.every(item => item.amount >= value);
}

</script>

<style scoped>
.container {
  width: calc(100vw - 750px);
}
</style>