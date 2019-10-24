<template>
  <v-container>
    <InputSearch />
    <QuestionList />
  </v-container>
</template>

<script>
import InputSearch from "../components/input-search";
import QuestionList from "../components/question/list";

export default {
  components: {
    InputSearch,
    QuestionList
  }
};
</script>

