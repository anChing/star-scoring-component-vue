import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect : '/Index'
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
  ]
})
