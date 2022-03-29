import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./../views/Dashboard')
  },{
    path: '/Produto',
    name: 'Produto',
    component: () => import('../views/Produto.vue')
  }
  ,{
    path: '/Documentacao',
    name: 'Documentacao',
    component: () => import('../views/Documentacao.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
