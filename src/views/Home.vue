<template>
  <v-container>
    <InputSearch />
    <QuestionList :questions="questions"/>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import InputSearch from "../components/Input-search";
import QuestionList from "../components/Question/List";

export default {
  components: {
    InputSearch,
    QuestionList
  },
  computed: {
    ...mapState(["questions"])
  },
};
</script>

