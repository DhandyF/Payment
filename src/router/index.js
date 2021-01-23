import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Delivery',
      component: () => import('../views/Delivery.vue'),
    },
    {
      path: '/payment',
      name: 'Payment',
      component: () => import('../views/Payment.vue'),
    },
    {
      path: '/finish',
      name: 'Finish',
      component: () => import('../views/Finish.vue')
    }
  ]
})
