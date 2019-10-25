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
    // [COMMENT] What is this magic trick??? Which part the code execute this action??
    async getQuestions({ commit }) {
      try {
        const questions = await find('dev_questions');
        commit('setQuestions', questions);
      }
      catch (error) {
        console.log('[ERR]', error);
      }
    },

    /**
     * @name findQuestions
     * @description Retrieve and populate the the store with 
     *              questions based on a search text
     */
    async findQuestions({ commit }, text = '') {
      try {
        const questions = await find('dev_questions', text);
        commit('setQuestions', questions);
      }
      catch (error) {
        console.log('[ERR]', error);
      }
    },
    
    /**
     * @name findRandomQuestions
     * @description Retrieve and populate the the store with 
     *              random questions
     */
    async findRandomQuestions({ commit }) {
      try {
        const questions = await find('dev_questions');
        commit('setQuestions', questions);
      }
      catch (error) {
        console.log('[ERR]', error);
      }
    },
  }
});