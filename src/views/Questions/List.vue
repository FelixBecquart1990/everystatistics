<template>
  <v-container>
    <InputSearch :onSearch="onSearch" :value="keyword"/>
    <QuestionList :questions="questions"/>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import InputSearch from "./../../components/Question/Input-search";
import QuestionList from "./../../components/Question/List";

export default {

  props: {
    keyword: {
      type: String,
      default: '',
    },
  },

  components: {
    InputSearch,
    QuestionList
  },

  computed: mapState({
    questions: state => state.questions.all
  }),

  created() {
    this.findQuestions();
  },
  
  watch: {
    '$route': 'findQuestions',
    'questions': 'createIfDoesNotExist',
  },

  methods: {

    createIfDoesNotExist() {
      if(this.questions.length === 0 && this.keyword !== '') {
        this.$store.dispatch('questions/create', { value: this.keyword })
      }
    },

    async onSearch(keyword = '') {
      if(keyword === '') {
        return this.$router.push({ name: 'questions' }); 
      }
      this.$router.push({ name: 'questions', query: { keyword } });
    },

    findQuestions() {
      if(this.keyword === '') {
        return this.$store.dispatch('questions/random', { limit: 4 });
      }

      this.$store.dispatch('questions/find', { value: this.keyword, limit: 20 });
    }
  }
};
</script>

