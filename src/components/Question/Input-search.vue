<template>
  <v-sheet class="d-flex justify-center transparent">
    <v-col cols="12" sm="6" md="6" lg="4">
      <v-text-field
        v-model="text"
        @keyup.enter="onEnter()"
        @keyup.escape="onEscape()"
        @click:clear="onEscape()"
        class="mt-5 pt-5 mx-3"
        label="Solo"
        placeholder="Ajoutez votre question"
        solo
        clearable
        :loading="loading"
      ></v-text-field>

      <QuestionList :questions="results" columns="12" />
    </v-col>
  </v-sheet>
</template>

<script>
import QuestionList from './List';

export default {

  props: {
    onSearch: {
      type: Function,
      default: () => {},
    },
    value: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    text: '',
    loading: false,
    results: [],
  }),

  components: { QuestionList },

  created() {
    this.text = this.value;
  },

  methods: {

    onEnter() {
      this.onSearch(this.text);
    },

    onEscape() {
      this.search = '';
      this.text = '';
      this.onSearch(this.search);
    },
  }
};
</script>

