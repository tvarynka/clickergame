import { createStore } from 'vuex';
import { UPGRADES_LIST } from '@/data/upgrades';

export default createStore({
  state: {
    totalBank: 0,
    bank: 0,
    clickBonus: 1,
    autoClickBonus: 1,
    userUpgrades: new Map(),
  },
  getters: {
    bank(state) {
      return state.bank;
    },
    totalBank(state) {
      return state.totalBank;
    },
    clickBonus(state) {
      return state.clickBonus;
    },
    autoClickBonus(state) {
      return state.autoClickBonus;
    },
    userUpgrades(state) {
      return state.userUpgrades;
    },
  },
  mutations: {
    addToBank(state, amount) {
      state.bank += amount;
    },
    removeFromBank(state, amount) {
      state.bank -= amount;
    },
    addToTotalBank(state, amount) {
      state.totalBank += amount;
    },
    changeClickBonus(state, amount) {
      state.clickBonus = amount;
    },
    changeAutoclickBonus(state, amount) {
      state.autoClickBonus = amount;
    },
    changeUserUpgrades(state, userUpgrades) {
      state.userUpgrades = userUpgrades;
    },
  },
  actions: {
    increaseBank(context, amount) {
      context.commit('addToBank', amount);
      context.commit('addToTotalBank', amount);
    },
    decreaseBank(context, amount) {
      context.commit('removeFromBank', amount);
    },
    changeClickBonusAction(context, amount) {
      context.commit('changeClickBonus', amount);
    },
    changeAutoclickBonusAction(context, amount) {
      context.commit('changeAutoclickBonus', amount);
    },
    updateUserUpgrade({ commit, state }, name) {
      let userUpgrades = state.userUpgrades;
      userUpgrades.set(name, userUpgrades.get(name) + 1);
      commit('changeUserUpgrades', userUpgrades);
    },
    setInitialUserUpgrades({ commit }) {
      let userUpgrades = new Map();

      // change to value fetched from server
      for (let upgrade of UPGRADES_LIST) {
        userUpgrades.set(upgrade.name, 0);
      }

      commit('changeUserUpgrades', userUpgrades);
    },
  },
});
