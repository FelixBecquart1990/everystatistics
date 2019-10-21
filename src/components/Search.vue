<template>
  <v-sheet class="d-flex justify-center transparent">
    <v-col cols="12" sm="6" md="6" lg="4">
      <v-text-field
        v-model="text"
        @keyup.enter="sendQuestion()"
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
    loading: false
  }),
  methods: {
    sendQuestion() {
      if (this.loading || this.text == "") return;
      this.loading = true;
      let random = Math.round(Math.random() * 99999999);
      let question = {
        random: random,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        text: this.text
      };
      this.text = "";
      let self = this;
      firebase
        .firestore()
        .collection("questions")
        .add(question)
        .then(function(newDocument) {
          let newQuestion = Object.assign({}, question, { id: newDocument.id });
          self.$store.commit("setQuestion", {
            index: Math.floor(Math.random() * 4),
            question: newQuestion
          });
          self.loading = false;
          self.$store.commit("setSnackbar", {
            color: "primary",
            timeout: 3000,
            text: "Question ajoutée"
          });
        })
        .catch(err => {
          self.loading = false;
          console.log(err);
        });
    }
  }
};
</script>

