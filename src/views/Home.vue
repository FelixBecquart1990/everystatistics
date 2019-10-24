<template>
  <v-container>
    <InputSearch />
    <QuestionList :questions="questions"/>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import InputSearch from "../components/input-search";
import QuestionList from "../components/question/list";

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

