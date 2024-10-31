import { createRouter, createWebHistory } from "vue-router";

import FirstHome from "@/components/FirstHome.vue";
import TheLogin from "@/components/TheLogin.vue";
import TheSetting from "@/components/TheSetting.vue";
import TheMain from "@/components/TheMain.vue";
import TheRegister from "@/components/TheRegister.vue";
import AdminPage from "@/components/AdminPage.vue";
import ManageProduct from "@/components/ManageProduct.vue";
import EditPage from "@/components/EditPage.vue";
import EditImg from "@/components/EditImg.vue";
import ShowFoods from "@/components/ShowFoods.vue";
import ShowDrink from "@/components/ShowDrink.vue";
import CartDetail from "@/components/CartDetail.vue";
import CartShow from "@/components/CartShow.vue";
import MainHome from "@/components/MainHome.vue";
import PopularMenu from "@/components/PopularMenu.vue";

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
    meta: { requiresAuth: true, role: 'admin'}
  },
  {
    name:'ManageProduct',
    path:"/manageproduct",
    component: ManageProduct,
    meta: { requiresAuth: true, role: 'admin'}
  },
  {
    name:"Edit",
    path:"/edit/:id",
    component: EditPage,
  },
  {
    name:"EditImg",
    path:"/edit/:id/img",
    component: EditImg,
  },
  {
    name:"ShowFoods",
    path:"/showfoods",
    component: ShowFoods,
  },
  {
    name:"ShowDrink",
    path:"/showdrink",
    component: ShowDrink,
  },
  {
    name:"CartDetail",
    path:"/cartdetail",
    component: CartDetail,
  },
  {
    path:'/CartShow/:cartId',
    name:'CartShow',
    component:CartShow
  },
  {
    path:'/main',
    name:'MainHome',
    component:MainHome
  },
  {
    path: '/popular-menu',
    name: 'PopularMenu',
    component: PopularMenu
}
];

const router = createRouter({
  history:createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  const isAuthenticated = !!sessionStorage.getItem('userRole')
  const userRole = sessionStorage.getItem('userRole')

  if(to.meta.requiresAuth && !isAuthenticated){
    next({ path: '/login'})
  }else if (to.meta.role && userRole !== to.meta.role){
    next({ path: '/homepage'})
  }else{
    next();
  }
})

export default router  