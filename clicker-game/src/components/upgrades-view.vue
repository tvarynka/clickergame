<template>
  <div class="upgrades">
      <template :key="upgrade.name" v-for="upgrade of UPGRADES_LIST">
        <BasicUpgrade
          :upgrade="upgrade"
          :amount="getUpgradeAmount(upgrade.name)"
          @update="updateUpgrade"
        />
      </template>
    </div>
</template>

<script setup>
import BasicUpgrade from './basic-upgrade.vue';
import { UPGRADES_LIST } from '@/data/upgrades';
import { useStore } from 'vuex';

const store = useStore();

function updateUpgrade(name) {
  store.dispatch('updateUserUpgrade', name);
}

function getUpgradeAmount(name) {
  return store.state.userUpgrades.get(name);
}
</script>

<style scoped>
.upgrades {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>