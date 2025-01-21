<template>
  <div class="container">
    <h4>Досягнуто: {{ achieved }} з {{ achievements.length }}</h4>
    <div class="achievements">
      <template :key="achievement"
        v-for="achievement of achievements"
      >
        <AchievementItem
          v-if="achievementIsAchieved(achievement.name)"
          :achievement="achievement"
        >
        </AchievementItem>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, watch, ref, onMounted } from 'vue';
import AchievementItem from './achievement-item.vue';
import { useStore } from 'vuex';

const props = defineProps({
  upgrades: {
    type: Object
  },
  clickValue: {
    type: Number,
  },
  autoclickValue: {
    type: Number,
  }
});

const store = useStore();
const userAchievements = ref(new Map());

const achievements = ref([
  {
    name: 'Перший гріш',
    requirement: () => store.state.totalBank > 0,
    description: 'Зароблено першу монетку.',
  },
  {
    name: 'Дзвенить у кишені',
    requirement: () => store.state.bank > 100,
    description: 'Маєш 100 монет в банку. Нагорода: +100 монет в банк',
    bonus: () => store.dispatch('increaseBank', 100),
  },
  {
    name: 'Багач',
    requirement: () => store.state.totalBank > 10000,
    description: 'Сумарно зароблено 10000 монет',
  },
  {
    name: 'Мільйонер',
    requirement: () => store.state.totalBank > 1000000,
    description: 'Сумарно зароблено 1000000 монет',
  },
  {
    name: 'Мільярдер',
    requirement: () => store.state.totalBank > 1000000000,
    description: 'Сумарно зароблено 1000000000 монет',
  },
  {
    name: 'Набожний',
    requirement: () => getUpgradeAmountByName('Церква') > 100,
    description: 'Маєш 100 церков. Нагорода: автоклік збільшено в 40 разів',
    bonus: () => store.dispatch('changeAutoclickBonusAction', 40),
  },
  {
    name: 'Better Call Мольфар',
    requirement: () => getUpgradeAmountByName('Мольфар') > 1,
    description: 'В селі тепер є мольфар. Нагорода: автоклік збільшено в 20 разів',
    bonus: () => store.dispatch('changeAutoclickBonusAction', 20),
  },
  {
    name: 'Панич',
    requirement: () => allAmountsAreBiggerThen(1),
    description: 'Є по 1 кожного покращення. Нагорода: автоклік збільшено в 10 разів',
    bonus: () => store.dispatch('changeAutoclickBonusAction', 10),
  },
  {
    name: 'Пан',
    requirement: () => allAmountsAreBiggerThen(10),
    description: 'Є по 10 кожного покращення. Нагорода: автоклік збільшено в 25 разів',
    bonus: () => store.dispatch('changeAutoclickBonusAction', 25),
  },
  {
    name: 'Лорд',
    requirement: () => allAmountsAreBiggerThen(100),
    description: 'Є по 100 кожного покращення. Нагорода: автоклік збільшено в 50 разів',
    bonus: () => store.dispatch('changeAutoclickBonusAction', 50),
  },
  {
    name: 'Юліна тисяча',
    requirement: () => props.clickValue * store.state.clickBonus >= 1000,
    description: 'Досягти 1000 монет за клік. Нагорода: 100000 монет',
    bonus: () => store.dispatch('increaseBank', 100000),
  },
  {
    name: 'Тисяча від лорда',
    requirement: () => props.autoclickValue * store.state.autoClickBonus >= 1000,
    description: 'Досягти 1000 монет за секунду з врахуванням бонусів. Нагорода: базова вартість автокліку збільшена в 10 разів',
    bonus: () => store.dispatch('changeAutoclickBonusAction', 10),
  },
  {
    name: 'Тисяча від Імператора',
    requirement: () => props.clickValue >= 1000,
    description: 'Досягти 1000 монет за секунду без врахування бонусів. Нагорода: базова вартість автокліку збільшена в 50 разів',
    bonus: () => store.dispatch('changeAutoclickBonusAction', 50),
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
  return props.upgrades.get(upgradeName);
}

function allAmountsAreBiggerThen(amount) {
  for (let upgrade of props.upgrades) {
    if (upgrade[1] < amount) {
      return false;
    }
  }

  return true;
}

function checkAchievements() {
  for (let i = 0; i < achievements.value.length; i++) {
    if (!userAchievements.value.get(achievements.value[i].name)) {
      if (achievements.value[i].requirement()) {
        userAchievements.value.set(achievements.value[i].name, true);

        if (achievements.value[i].bonus) {
          achievements.value[i].bonus();
        }
      }
    }
  }
}

function achievementIsAchieved(name) {
  return userAchievements.value.get(name)
}

onMounted(() => {
  for (let achievement of achievements.value) {
    userAchievements.value.set(achievement.name, false);
  }
});
</script>

<style scoped>
.container {
  width: calc(100vw - 750px);
}
</style>