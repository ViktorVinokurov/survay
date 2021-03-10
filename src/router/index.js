import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "@/router/router";
import datePicker from "@/components/datePicker";
Vue.use(VueRouter)
Vue.component('date-picker', datePicker)


const router = new VueRouter({
  routes
})

export default router
