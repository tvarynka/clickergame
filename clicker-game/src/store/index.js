import { createStore } from 'vuex';

export default createStore({
  state: {
    totalBank: 0,
    bank: 0,
    baseClickValue: 1,
    baseAutoclickBonus: 1,
    clickBonus: 1,
    autoClickBonus: 1,
    clickIncrement: 1,
    autoClickIncrement: 0,
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
    changeBaseClickValue(state, amount) {
      state.baseClickValue *= amount;
    },
    changeBaseAutoclickBonus(state, amount) {
      state.baseAutoclickBonus = amount;
    },
    changeAutoclickIncrement(state, amount) {
      state.autoClickIncrement = amount;
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
    changeAutoclickIncrementAction(context, amount) {
      context.commit('changeAutoclickIncrement', amount);
    },
    changeClickIncrementAction(context, amount) {
      context.commit('changeClickIncrement', amount);
    },
    changeBaseClickValueAction(context, amount) {
      context.commit('changeBaseClickValue', amount);
    },
    changeBaseAutoclickBonusAction(context, amount) {
      context.commit('changeBaseAutoclickBonus', amount);
    },
  },
});