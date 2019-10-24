<template>
  <v-sheet class="d-flex justify-center transparent">
    <v-col cols="12" sm="6" md="6" lg="4">
      <v-text-field
        v-model="text"
        @keyup.enter="onKeyupEnter()"
        class="mt-5 pt-5 mx-3"
        label="Solo"
        placeholder="Ajoutez votre question"
        solo
        clearable
        :loading="loading"
      ></v-text-field>

      <QuestionList :questions="results" />
    </v-col>
  </v-sheet>
</template>

<script>
import firebase from "./../apis/firebase";
import { find } from './../apis/algolia';
import QuestionList from './question/list';

export default {

  data: () => ({
    text: "",
    loading: false,
    results: [],
  }),

  components: { QuestionList },

  methods: {
    /**
     * @name onKeyupEnter
     * @description Handle the main process on searching 
     *              an existing question
     */
    async onKeyupEnter() {
      if(this._isInputSearchEmpty()) {
        return this._resetResults();
      }

      try {
        const questions = await this._findExistingQuestions();
        this._displayExistingQuestions(questions);

        if(!this._questionAlreadyExists(questions)) {
          this._postQuestion(this.text);
        }
      } 
      catch (error) {
        console.log(error);
      }

    },

    /**
     * @name isInputSearchEmpty
     * @description Check if the input's value is empty
     */
    _isInputSearchEmpty() {
      return (this.text || "").trim() === '';
    },

    /**
     * @name resetResults
     * @description Result the current questions' result
     */
    _resetResults() {
      this.results = [];
    },

    /**
     * @name findExistingQuestions
     * @param {*} text The text to search into the questions
     */
    async _findExistingQuestions() {
      try {
        return await find('dev_questions', this.text);
      } 
      catch (error) {
        throw `[ERR] An error occured while searching questions: ${error}`;
      }
    },

    /**
     * @name displayExistingQuestions
     * @description Make existing question visible on the component
     * @param {*} questions An array of questions
     */
    _displayExistingQuestions(questions) {
      this.results = questions;
    },

    /**
     * @name questionAlreadyExists
     * @description Does the question already exist
     */
    _questionAlreadyExists() {
      return false;
    },

    /**
     * @name displayExistingQuestions
     * @description Make existing question visible on the component
     */
    _postQuestion(text) {
      const question = {
        id: "tASarZKXEZKafrSTKYra",
        objectID: "tASarZKXEZKafrSTKYra",
        random: 77764413,
        text: "ça fonctionne bien ?",
      };
      console.log('Please, post', question);
      this.question = question;
      this.questionAlreadyExists = true;
    },

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

