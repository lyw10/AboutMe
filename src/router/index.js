import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import About from "@/components/About";
import Project from "@/components/Project";

Vue.use(Router);

let badRoute = Vue.component("bad-route", {
  template:
    '<div id="bad_route"><h1>Page Not Found</h1><p>Sorry, but the page you were trying to view does not exist.</p></div>'
});

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/about"
    },
    {
      path: "/about",
      component: About,
      name: "ABOUT"
    },
    {
      path: "/project/:id",
      component: Project,
      //   props:true,
      name: "PROJECT"
    },
    {
      path: "*", // should be last, otherwise matches everything
      component: badRoute,
      name: "NOT FOUND"
    }
  ]
});
