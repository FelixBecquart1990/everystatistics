import Vue from "vue";
import Vuex from "vuex";
import firebase from "./apis/firebase";

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
        const questions = indexify(deserialize(await requestFirebase('questions')));
        commit('setQuestions', questions);
        commit("setLoading", false);
      }
      catch (error) {
        console.log('[ERR]', error);
      }
    }
  }
});


/**
 * @name requestAlgolia
 * @description Request data from Algolia
 * @param {*} collection 
 */
async function requestAlgolia(collection) {

}


/**
 * @name requestFirebase
 * @description Request data from Firebase
 * @param {*} collection The collection's name
 */
async function requestFirebase(collection) {
  let results;
  try {
    results = await firebase.firestore()
      .collection(collection)
      .orderBy("random", "asc")
      .startAfter(Math.round(Math.random() * 69999999))
      .limit(4)
      .get();
    return results.docs;
  }

  catch(error) {
    throw `An error occured while requesting the collection '${collection}' from Firebase: ${error}`;
  }
}


/**
 * @name deserialize
 * @description Deserilize data from API into the store
 * @param {*} data
 */
function deserialize(data) {
  if(Array.isArray(data)) {
    return data.map(d => deserialize(d));
  }

  return { ...{ id: data.id }, ...data.data() };
}


/**
 * @name indexify
 * @description Assign an index to an array's items
 * @param {*} data The object of object's array to assign an index 
 * @param {*} index The index to assign to data's items
 */
function indexify(data, index) {
  if(Array.isArray(data)) {
    return data.map((d, i) => indexify(d, i));
  }

  return Object.assign({ index }, data);
}