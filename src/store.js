import Vue from "vue";
import Vuex from "vuex";
import { find } from "./apis/algolia";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    snackbar: { active: false, color: "", mode: "", timeout: 0, text: "" }
  },
  mutations: {
    setQuestion(state, val) {
      state.questions.splice(val.index, 1, val.question);
    },
    setQuestions(state, val) {
      state.questions = val;
    },
    setSnackbar(state, val) {
      state.snackbar = Object.assign({}, val, { active: true });
    },
  },
  getters: {
    questions: state => {
      return state.questions;
    }
  },
  actions: {
    async getQuestions({ state, commit, dispatch }) {
      try {
        const questions = await find('dev_questions');
        commit('setQuestions', questions);
      }
      catch (error) {
        console.log('[ERR]', error);
      }
    }
  }
});