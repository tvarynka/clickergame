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
import { defineProps, computed, watch, ref } from 'vue';
import AchievementItem from './achievement-item.vue';
import { useStore } from 'vuex';

const props = defineProps({
  upgrades: {
    type: Array
  }
});

const store = useStore();

const achievements = ref([
  {
    name: 'Перший гріш',
    requirement: () => store.state.totalBank > 0,
    isAchieved: false,
    description: 'Зароблено першу монетку.',
  },
  {
    name: 'Дзвенить у кишені',
    requirement: () => store.state.bank > 100,
    isAchieved: false,
    description: 'Маєш 100 монет в банку. Нагорода: +100 монет в банк',
    bonus: () => store.dispatch('increaseBank', 100),
  },
  {
    name: 'Багач',
    requirement: () => store.state.totalBank > 10000,
    isAchieved: false,
    description: 'Сумарно зароблено 10000 монет',
  },
  {
    name: 'Мільйонер',
    requirement: () => store.state.totalBank > 1000000,
    isAchieved: false,
    description: 'Сумарно зароблено 1000000 монет',
  },
  {
    name: 'Мільярдер',
    requirement: () => store.state.totalBank > 1000000000,
    isAchieved: false,
    description: 'Сумарно зароблено 1000000000 монет',
  },
  {
    name: 'Набожний',
    requirement: () => getUpgradeAmountByName('Церква') > 100,
    isAchieved: false,
    description: 'Маєш 100 церков. Нагорода: автоклік збільшено в 40 разів',
    bonus: () => store.dispatch('changeBaseAutoclickBonusAction', 40),
  },
  {
    name: 'Better Call Мольфар',
    requirement: () => getUpgradeAmountByName('Мольфар') > 1,
    isAchieved: false,
    description: 'В селі тепер є мольфар. Нагорода: автоклік збільшено в 20 разів',
    bonus: () => store.dispatch('changeBaseAutoclickBonusAction', 20),
  },
  {
    name: 'Панич',
    requirement: () => allAmountsAreBiggerThen(1),
    isAchieved: false,
    description: 'Є по 1 кожного покращення. Нагорода: автоклік збільшено в 10 разів',
    bonus: () => store.dispatch('changeBaseAutoclickBonusAction', 10),
  },
  {
    name: 'Пан',
    requirement: () => allAmountsAreBiggerThen(10),
    isAchieved: false,
    description: 'Є по 10 кожного покращення. Нагорода: автоклік збільшено в 25 разів',
    bonus: () => store.dispatch('changeBaseAutoclickBonusAction', 25),
  },
  {
    name: 'Лорд',
    requirement: () => allAmountsAreBiggerThen(100),
    isAchieved: false,
    description: 'Є по 100 кожного покращення. Нагорода: автоклік збільшено в 50 разів',
    bonus: () => store.dispatch('changeBaseAutoclickBonusAction', 50),
  },
  {
    name: 'Юліна тисяча',
    requirement: () => store.state.clickIncrement * store.state.clickBonus >= 1000,
    isAchieved: false,
    description: 'Досягти 1000 монет за клік. Нагорода: базова вартість кліку збільшена в 10 разів',
    bonus: () => store.dispatch('changeBaseClickValueAction', 10),
  },
  {
    name: 'Тисяча від лорда',
    requirement: () => store.state.autoClickIncrement * store.state.autoClickBonus >= 1000,
    isAchieved: false,
    description: 'Досягти 1000 монет за секунду з врахуванням бонусів. Нагорода: базова вартість автокліку збільшена в 10 разів',
    bonus: () => store.dispatch('changeBaseAutoclickBonusAction', 10),
  },
  {
    name: 'Тисяча від Імператора',
    requirement: () => store.state.autoClickIncrement >= 1000,
    isAchieved: false,
    description: 'Досягти 1000 монет за секунду без врахування бонусів. Нагорода: базова вартість автокліку збільшена в 50 разів',
    bonus: () => store.dispatch('changeBaseAutoclickBonusAction', 50),
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

watch(store.state, checkAchievements);
watch(props, checkAchievements);

function getUpgradeAmountByName(upgradeName) {
  const upgrade = props.upgrades.find((item) => item.name === upgradeName);

  return upgrade ? upgrade.amount : 0;
}

function allAmountsAreBiggerThen(value) {
  return props.upgrades.every(item => item.amount >= value);
}

function checkAchievements() {
  for (let i = 0; i < achievements.value.length; i++) {
    if (!achievements.value[i].isAchieved) {
      achievements.value[i].isAchieved = achievements.value[i].requirement();

      if (achievements.value[i].isAchieved && achievements.value[i].bonus) {
        achievements.value[i].bonus();
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: calc(100vw - 750px);
}
</style>