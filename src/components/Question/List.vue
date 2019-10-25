<template>
  <!-- <v-container fluid> -->
    <v-row no-gutters>
      <v-col v-for="(question, index) in questions" :key="'question-' + index" cols="12" v-bind:sm=columns>
        <v-skeleton-loader
          :loading="isLoading"
          transition="scale-transition"
          type="list-item-two-line"
          height="115"
          class="ma-3 white"
        >
          <QuestionItem :question="question" :index="index" />
        </v-skeleton-loader>
      </v-col>
    </v-row>
  <!-- </v-container> -->
</template>

<script>
  import QuestionItem from "./Item";

  export default {
    data: () => ({ isLoading: true }),
    props: {
      questions: {
        type: Array,
        default: [],
      }, 
      columns: {
        type: String,
        default: "6",
      }
    },
    components: { QuestionItem },
    methods: {},
    updated() {
      setTimeout(() => { this.isLoading = false; }, 200);
    },
  };
</script>


<style>
  .v-skeleton-loader__image {
    max-height: 150px;
  }
  .white-text {
    color: white !important;
  }
</style>
