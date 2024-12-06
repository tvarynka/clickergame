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
import { useStore } from 'vuex';

const props = defineProps({
  upgrades: {
    type: Array
  }
});

const store = useStore();

const achievements = computed(() => [
  {
    name: 'Перший гріш',
    isAchieved: store.state.totalBank > 0,
    description: 'Зароблено першу монетку',
  },
  {
    name: 'Дзвенить у кишені',
    isAchieved: store.state.totalBank > 100,
    description: 'Маєш 100 монет в банку',
  },
  {
    name: 'Багач',
    isAchieved: store.state.totalBank > 10000,
    description: 'Сумарно зароблено 10000 монет',
  },
  {
    name: 'Мільйонер',
    isAchieved: store.state.totalBank > 1000000,
    description: 'Сумарно зароблено 1000000 монет',
  },
  {
    name: 'Мільярдер',
    isAchieved: store.state.totalBank > 1000000000,
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
  {
    name: 'Юліна тисяча',
    isAchieved: store.state.clickIncrement + store.state.clickBonus >= 1000,
    description: 'Досягти 1000 монет за клік'
  },
  {
    name: 'Тисяча Зеленського',
    isAchieved: store.state.clickIncrement >= 1000,
    description: 'Досягти 1000 монет за клік без врахування бонусів'
  }
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