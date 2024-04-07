import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/Home.vue";
import AddPage from "../views/Add.vue";
import EditPage from "../views/Edit.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/add", component: AddPage },
  { path: "/edit/:id", component: EditPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
