import Vue from "vue";
import Vuex from "vuex";
import firebase from "./firebaseConfig.js";

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
    getQuestions({ state, commit }) {
      let random = Math.round(Math.random() * 69999999);
      firebase
        .firestore()
        .collection("questions")
        .orderBy("random", "asc")
        .startAfter(random)
        .limit(4)
        .get()
        .then(function(querySnapshot) {
          let index = 0;
          querySnapshot.forEach(function(question) {
            let currentQuestion = {
              ...{ id: question.id },
              ...question.data()
            };
            console.log("index ", index);
            commit("setQuestion", { index: index, question: currentQuestion });
            index = index + 1;
          });
          commit("setLoading", false);
          console.log(state.questions);
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    sendQuestionToFirestore({ state, commit, dispatch }, question) {
      return firebase
        .firestore()
        .collection("questions")
        .add(question);
    }
  }
});
