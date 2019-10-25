<template>
  <v-container>
    <InputSearch :onSearch="onSearch" :value="search"/>
    <QuestionList :questions="questions"/>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import InputSearch from "./../../components/Question/Input-search";
import QuestionList from "./../../components/Question/List";

export default {

  props: {
    search: {
      type: String,
      default: '',
    }
  },

  components: {
    InputSearch,
    QuestionList
  },

  computed: {
    ...mapGetters(['questions'])
  },

  created() {
    this._updateStore(this.$route.params.search);
  },

  methods: {
    /**
     * @name onSearch
     * @description Execute this callback on InputSearch is searching
     * @param questions The questions' array returned by InputSearch
     */
    async onSearch(search = '') {
        this._updateStore(search);
        this._updateLocation(search);
    },

    /**
     * @name _isInputSearchEmpty
     * @description Check if the input's value is empty
     */
    _isInputSearchEmpty(text) {
      return (text || "").trim() === '';
    },

    /**
     * @name _updateLocation
     * @description Navigate ith the query param
     * @param {*} text
     */
    _updateLocation(search = '') {
      if(search === '') {
        return this.$router.push({ name: 'questions' })
      }
      this.$router.push({ name: 'questions.search', params: { search } })
    },

    /**
     * @name _updateStore
     * @description Populate the store with random questions
     */
    _updateStore(search = '') {
      this.$store.dispatch('findQuestions', search);
    },
  }
};
</script>

