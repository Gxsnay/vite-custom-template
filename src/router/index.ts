import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "首页",
      keepAlive: true,
      // requireAuth: true,
      isPublic: true,
    },
    component: () => import("v@/home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
