<template>
  <v-card :loading="loadingCard">
    <v-progress-linear
      style="margin-bottom:-4px; transform: rotate(180deg);border-radius:0px; z-index:2"
      v-if="timerActive"
      :value="timerValue"
      color="primary"
      height="4"
    ></v-progress-linear>

    <v-skeleton-loader
      :loading="loadingQuestion"
      transition="scale-transition"
      type="list-item-two-line"
      height="56"
    >
      <v-card-title>
        <div>
          <p style="word-break: normal;margin-bottom:0px">{{question.text}}</p>
        </div>
      </v-card-title>
    </v-skeleton-loader>

    <v-progress-linear
      v-if="timerValue !=100"
      background-color="#3A3BB7"
      color="#3FAED2"
      style="margin-top:10px"
      height="50"
      :value="yesNoRate"
    >
      <div class="ml-3 white--text" v-if="yesNoRate != 0">Oui ({{Math.round(yesNoRate)}}%)</div>
      <v-spacer></v-spacer>
      <div class="mr-3 white--text" v-if="yesNoRate != 100">Non ({{Math.round(100-yesNoRate)}}%)</div>
    </v-progress-linear>

    <v-btn
      v-if="timerValue == 100"
      :loading="loadingQuestion"
      rounded
      class="ma-3"
      color="#3FAED2"
      :class="{'white-text':yesActive}"
      :outlined="!yesActive"
      elevation="0"
      @click="sendAnswer(0)"
    >Oui</v-btn>
    <v-btn
      v-if="timerValue == 100"
      :loading="loadingQuestion"
      rounded
      class="ma-3 ml-0"
      color="#3A3BB7"
      :class="{'white-text':noActive}"
      :outlined="!noActive"
      elevation="0"
      @click="sendAnswer(1)"
    >Non</v-btn>
  </v-card>
</template>

<script>
import firebase from "./../../apis/firebase";

export default {
  props: ["question", "index"],
  data: () => ({
    loadingCard: false,
    loadingQuestion: false,
    noActive: false,
    yesActive: false,
    timerActive: false,
    timerValue: 100,
    timer: null,
    yesNoRate: 50
  }),
  methods: {
    getYesNoRate(answers) {
      let yes = 0;
      for (let i = 0; i < answers.length; i++) {
        answers[i].answer == 0 ? (yes += 1) : null;
      }
      return (this.yesNoRate = (yes / answers.length) * 100);
    },
    activateTimer() {
      this.timerActive = true;
      this.timer = setInterval(() => {
        if (this.timerValue === 0) {
          clearInterval(this.timer);
          this.timerActive = false;
          this.getNewQuestion();
          this.timerValue = 100;
          return;
        }
        this.timerValue -= 2;
      }, 100);
    },
    getNewQuestion() {
      this.loadingQuestion = true;
      let random = Math.round(Math.random() * 99999999);
      this.loadingCard = true;
      let self = this;
      firebase
        .firestore()
        .collection("questions")
        .orderBy("random", "asc")
        .startAfter(random)
        .limit(1)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(question) {
            let currentQuestion = {
              ...{ id: question.id },
              ...question.data()
            };
            self.$store.commit("setQuestion", {
              index: self.index,
              question: currentQuestion
            });
          });
          self.loadingCard = false;
          self.noActive = false;
          self.yesActive = false;
          self.loadingQuestion = false;
        });
    },
    sendAnswer(answer) {
      if (this.yesActive || this.noActive) return;
      if (answer == 0) this.yesActive = !this.yesActive;
      if (answer == 1) this.noActive = !this.noActive;

      let self = this;
      this.loadingCard = true;
      let currentAnswer = {
        answer: answer,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        question_id: this.question.id
      };
      firebase
        .firestore()
        .collection("answers")
        .add(currentAnswer)
        .then(function(result) {
          firebase
            .firestore()
            .collection("answers")
            .where("question_id", "==", self.question.id)
            .orderBy("created_at", "asc")
            .limit(10)
            .get()
            .then(function(querySnapshot) {
              let answers = [];
              querySnapshot.forEach(function(answer) {
                let currentAnswer = {
                  ...{ id: answer.id },
                  ...answer.data()
                };
                answers.push(currentAnswer);
              });
              self.question.answers = answers;
              self.$store.commit("setQuestion", {
                index: self.index,
                question: self.question
              });
              self.loadingCard = false;
              self.activateTimer();
              self.getYesNoRate(answers);
            })
            .catch(function(error) {
              console.log("Error getting documents: ", error);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated() {
    console.log('updated??', this.question);
  }
};
</script>

<style scoped>
.white-text {
  color: white !important;
}
/* * {
  border: solid 1px red;
} */
</style>
