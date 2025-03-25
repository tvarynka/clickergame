<template>
  <div class="tabs">
    <div class="headers">
      <template
        v-for="tab of tabs"
        :key="tab"
      >
        <div
          class="header"
          :class="{ active: tab.isActive }"
          @click="toggleTab(tab)"
        >
          <component
            :is="tab.icon"
            :color="'#422800'"
            :size="28"
          ></component>
        </div>
      </template>
    </div>

    <div class="tabs-wrapper">
      <template
        v-for="tab of tabs"
        :key="tab"
      >
        <div
          class="tab"
          :class="{ active: tab.isActive }"
        >
          <h3>
            {{ tab.description }}
          </h3>
          <component
            :is="tab.component"
            v-bind="tab.props"
          ></component>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import achievementsContainer from '@/views/achievements/achievements-container.vue';
import { Trophy, CircleUserRound } from 'lucide-vue-next';
import userMain from './user/user-main.vue';

const props = defineProps({
  achievementsProps: {
    type: Object,
  },
});

const tabs = ref([
  {
    name: 'achievements',
    component: achievementsContainer,
    icon: Trophy,
    isActive: true,
    props: props.achievementsProps,
    description: 'Досягнення',
  },
  {
    name: 'user',
    component: userMain,
    icon: CircleUserRound,
    isActive: false,
    description: 'Профіль',
  },
]);

function toggleTab(tabToToggle) {
  if (!tabToToggle.isActive) {
    for (let i = 0; i < tabs.value.length; i++) {
      tabs.value[i].isActive = tabs.value[i].name === tabToToggle.name;
    }
  }
}
</script>

<style scoped>
.tabs {
  padding: 10px;
}

.tabs-wrapper {
  margin-top: -2px;
  height: calc(100% - 60px);
  width: calc(100vw - 750px);
}

.tab {
  display: none;
  border: 2px solid #000000;
  height: 100%;
}

.tab.active {
  display: block;
}

.headers {
  display: flex;
}

.header {
  height: 50px;
  width: 50px;
  border: 2px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header.active {
  border-bottom: 2px solid #dfd9d3;
}
</style>