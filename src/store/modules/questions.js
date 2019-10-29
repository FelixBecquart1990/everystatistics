import { find, save, random } from "./../../apis/algolia";

const state = {
    all: [],
}

const getters = {};

const mutations = {
    setQuestions(state, questions) {
        state.all = questions;
    },
};

const actions = {
    async find({ commit, state }, { value, limit }) {
        try {
            commit('setQuestions', await find('questions', { value, limit }));
        }
        catch (error) {
            console.log('[ERR]', error);
        }
    },

    async create({ commit, state }, { value }) {
        try {
            const result = await save('questions', { value });
            commit('setQuestions', result);
        }
        catch (error) {
            console.log('[ERR]', error);
        }
    },

    async random({ commit, state }, { value, limit }) {
        try {
            commit('setQuestions', await random('questions', { limit  }));
        }
        catch (error) {
            console.log('[ERR]', error);
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  }