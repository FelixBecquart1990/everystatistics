<template>
  <v-sheet class="d-flex justify-center transparent">
    <v-col cols="12" sm="6" md="6" lg="4">
      <v-text-field
        v-model="text"
        @keyup.enter="onEnter()"
        class="mt-5 pt-5 mx-3"
        label="Solo"
        placeholder="Ajoutez votre question"
        solo
        clearable
        :loading="loading"
      ></v-text-field>
    </v-col>
  </v-sheet>
</template>

<script>
import firebase from "../firebaseConfig.js";

export default {
  data: () => ({
    text: "",
    loading: false,
    question: {}
  }),
  methods: {
    onEnter() {
      if (this.isValid()) {
        this.sendQuestion();
      }
    },
    isValid() {
      return !this.loading && !this.text == "";
    },
    sendQuestion() {
      this.prepareData();
      this.addQuestionToFirestore();
    },
    prepareData() {
      let random = Math.round(Math.random() * 99999999);
      this.question = {
        random,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        text: this.text
      };
      this.text = "";
    },
    async addQuestionToFirestore() {
      this.loading = true;
      try {
        const newDocument = await this.$store.dispatch(
          "sendQuestionToFirestore",
          this.question
        );
        this.updateQuestionInStore(newDocument);
        this.triggerSnackbar();
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    updateQuestionInStore(newDocument) {
      let newQuestion = Object.assign({}, this.question, {
        id: newDocument.id
      });
      this.$store.commit("setQuestion", {
        index: Math.floor(Math.random() * 4),
        question: newQuestion
      });
    },
    triggerSnackbar() {
      this.$store.commit("setSnackbar", {
        color: "primary",
        timeout: 3000,
        text: "Question ajoutée"
      });
    }
  }
};
</script>

