import { createStore } from 'vuex';

export default createStore({
  state: {
    totalBank: 0,
    bank: 0,
    clickBonus: 1,
    autoClickBonus: 1,
    clickIncrement: 1,
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
    changeClickIncrement(state, amount) {
      state.clickIncrement = amount;
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
    changeClickIncrementAction(context, amount) {
      context.commit('changeClickIncrement', amount);
    },
  },
});