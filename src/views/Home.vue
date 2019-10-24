<template>
  <v-container>
    <Search />
    <QuestionList />
  </v-container>
</template>
<script>
import Search from "../components/Search";
import QuestionList from "../components/question/list";

export default {
  components: {
    Search,
    QuestionList
  }
};
</script>

