import { createStore } from 'vuex'

export default createStore({
  state: {
    name: '',
    timer: '00:00:00',
    showResults: false,
    questions: [],
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    },
    setTimer(state, time) {
      state.timer = time;
    },
    setQuestions(state, questions) {
      state.questions = questions;
    },
    setShowResults(state, showResults) {
      state.showResults = showResults;
    }
  },
  actions: {
  },
  modules: {
  }
})
