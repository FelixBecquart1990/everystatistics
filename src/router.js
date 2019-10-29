import Vue from "vue";
import Router from "vue-router";
import QuestionsList from "./views/Questions/List.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "questions",
      path: "/",
      component: QuestionsList,
      props: route => ({
        keyword: route.query.keyword,
      }),
    },
    {
      path: "*",
      redirect: "/"
    },
  ]
});
