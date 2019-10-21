import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
// import firebase from "./firebaseConfig.js";

Vue.config.productionTip = false;
store.dispatch("getQuestions");

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
