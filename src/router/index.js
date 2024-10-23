import { createRouter, createWebHistory } from "vue-router";

import FirstHome from "@/components/FirstHome.vue";
import TheLogin from "@/components/TheLogin.vue";
import TheSetting from "@/components/TheSetting.vue";
import TheMain from "@/components/TheMain.vue";
import TheRegister from "@/components/TheRegister.vue";
import AdminPage from "@/components/AdminPage.vue";
import UserPage from "@/components/UserPage.vue";
import ManageProduct from "@/components/ManageProduct.vue";

const routes = [
  {
    name: "Main",
    path: "/",
    component: TheMain,
  },
  {
    name:"Home",
    path:"/homepage",
    component: FirstHome,
  },
  {
    name:"Login",
    path:"/login",
    component: TheLogin,
  },
  {
    name:"Register",
    path:"/register",
    component: TheRegister,
  },
  {
    name:"Setting",
    path:"/setting",
    component: TheSetting,
  },
  {
    name:"Admin",
    path:"/admin",
    component: AdminPage,
  },
  {
    name:"User",
    path:"/user",
    component: UserPage,
  },
  {
    name:'ManageProduct',
    path:"/manageproduct",
    component: ManageProduct
  }
  
];

const router = createRouter({
  history:createWebHistory(process.env.BASE_URL),
  routes
})
export default router  