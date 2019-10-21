<template>
  <v-container>
    <Search />
    <List />
  </v-container>
</template>
<script>
import Search from "../components/Search";
import List from "../components/List";

export default {
  components: {
    Search,
    List
  }
};
</script>

