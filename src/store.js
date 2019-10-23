import Vue from "vue";
import Vuex from "vuex";
import { findAll } from "./apis/algolia";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: ["0", "1", "3", "4"],
    loading: true,
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
    setLoading(state, val) {
      state.loading = val;
    }
  },
  getters: {
    questions: state => {
      return state.questions;
    }
  },
  actions: {
    async getQuestions({ state, commit, dispatch }) {
      try {
        const questions = await findAll('dev_questions');
        commit('setQuestions', questions);
        commit("setLoading", false);
      }
      catch (error) {
        console.log('[ERR]', error);
      }
    }
  }
});