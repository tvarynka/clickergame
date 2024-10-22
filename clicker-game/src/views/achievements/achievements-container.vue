<template>
  <div class="container">
    <h4>Досягнуто: {{ achieved }} з {{ achievements.length }}</h4>
    <div class="achievements">
      <template :key="achievement"
        v-for="achievement of achievements"
      >
        <AchievementItem
          v-if="achievement.isAchieved"
        >
          {{ achievement.name }}
        </AchievementItem>
      </template>
    </div>
  </div>
</template>

<script setup>
// за перший клік
// 100 кліків
// 10000 кліків
// 100 монет в банку
// 1000 монет в банку
// 1000000 монет в банку
// купити по 100 кожного покращення

import { defineProps, computed } from 'vue';
import AchievementItem from './achievement-item.vue';

const props = defineProps({
  bank: {
    type: Number
  },
  totalBank: {
    type: Number
  }
});

const achievements = computed(() => [
  {
    name: 'Перший гріш',
    isAchieved: props.totalBank > 0,
  },
  {
    name: 'Багач',
    isAchieved: props.totalBank > 100,
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

</script>

<style scoped>
.container {
  border: 3px solid;
  width: calc(100vw - 750px);
}

.achievements {
  display: flex;
}
</style>