<template>
  <v-card
    class="tabs-wrapper"
    variant="tonal"
  >
    <v-tabs v-model="tab">
      <v-tooltip
        v-for="tab of tabs"
        :key="tab.name"
        :text="tab.description"
        location="bottom"
      >
        <template v-slot:activator="{ props }">
          <v-tab
            v-bind="props"
            >
              <v-icon
                :icon="tab.icon"
              >
              </v-icon>
          </v-tab>
        </template>
      </v-tooltip>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item
        v-for="tab of tabs"
        :key="tab.name"
        :value="tab.name"
      >
        <component
          :is="tab.component"
          v-bind="tab.props"
        ></component>
      </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import achievementsContainer from '@/views/achievements/achievements-container.vue';
//import userMain from './user/user-main.vue';
import upgradesView from './upgrades-view';

const props = defineProps({
  achievementsProps: {
    type: Object,
  },
});

const tabs = [
  {
    name: 'upgrades',
    component: upgradesView,
    icon: 'mdi-castle',
    isActive: false,
    description: 'Місто',
  },
  {
    name: 'achievements',
    component: achievementsContainer,
    icon: 'mdi-trophy-variant-outline',
    isActive: true,
    props: props.achievementsProps,
    description: 'Досягнення',
  },
  // {
  //   name: 'user',
  //   component: userMain,
  //   icon: 'mdi-account-circle',
  //   isActive: false,
  //   description: 'Профіль',
  // },
];

const tab = ref(null);
</script>

<style scoped>
.tabs-wrapper {
  margin-top: -2px;
  height: calc(100% - 60px);
  width: calc(100vw - 400px);
  margin-right: 10px;
}
</style>