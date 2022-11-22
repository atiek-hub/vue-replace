import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ShoppingCart from "@/views/ShoppingCart";
import CreateUser from "@/views/CreateUser";
import ItemDetail from "@/components/ItemDetail.vue";
import LoginView from "@/views/LoginView.vue";
import ConfirmView from "@/views/ConfirmView.vue";
import Thankyou from "@/views/ThankyouView.vue"
// import { component } from "vue/types/umd";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/shopping-cart",
    name: "ShoppingCart",
    component: ShoppingCart,
  },
  {
    path: "/create-user",
    name: "CreateUser",
    component: CreateUser,
  },
  {
    path:"/login-view",
    name:"LoginView",
    component:LoginView
  },
  {
path:"/confirm-view",
name:"ConfirmView",
component:ConfirmView
  },
  {
    path:"/thankyou-view",
    name:"Thankyou",
    component:Thankyou
  },
  {
    path: "/:id",
    name: "Item",
    component: ItemDetail,
    props:route=>({
      id:Number(route.params.id),
      name:route.params.name,
      description:route.params.description,
      imagePath:route.params.imagePath,
      price:route.params.price,
    })
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
