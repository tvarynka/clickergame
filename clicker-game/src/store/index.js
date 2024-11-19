import { createStore } from 'vuex';

export default createStore({
  state: {
    totalBank: 0,
    bank: 0,
  },
  getters: {
    bank(state) {
      return state.bank;
    },
    totalBank(state) {
      return state.totalBank;
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
  },
  actions: {
    increaseBank(context, amount) {
      context.commit('addToBank', amount);
      context.commit('addToTotalBank', amount);
    },
    decreaseBank(context, amount) {
      context.commit('removeFromBank', amount);
    }
  },
});