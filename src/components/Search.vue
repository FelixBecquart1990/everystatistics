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
import { find, save } from './../apis/algolia';
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
          await this._postQuestion(this.text);
        }
      } 
      catch (error) {
        console.log(error);
      }
    },

    /**
     * @name _isInputSearchEmpty
     * @description Check if the input's value is empty
     */
    _isInputSearchEmpty() {
      return (this.text || "").trim() === '';
    },

    /**
     * @name _resetResults
     * @description Result the current questions' result
     */
    _resetResults() {
      this.results = [];
    },

    /**
     * @name _findExistingQuestions
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
     * @name _displayExistingQuestions
     * @description Make existing question visible on the component
     * @param {*} questions An array of questions
     */
    _displayExistingQuestions(questions) {
      this.results = questions;
    },

    /**
     * @name _questionAlreadyExists
     * @description Does the question already exist
     * @param {*} existingQuestions
     */
    _questionAlreadyExists(existingQuestions = []) {
      return existingQuestions.length > 0;
    },

    /**
     * @name _postQuestion
     * @description Send to the API the new question
     */
    async _postQuestion(text) {
      try {
        const savedQuestion = await save('dev_questions', this.text);
      }
      catch (error) {
        throw `[ERR] An error occured while searching questions: ${error}`;
      }
    },
  }
};
</script>

