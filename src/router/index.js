import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

import Sign from '@/layouts/sign'
import Dashboard from '@/layouts/dashboard'
import Web from '@/layouts/web'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/',
    component: Web,
    children: [
      {
        name: 'IndexWeb',
        path: '',
        component: () => import('@/views/web/index')
      }
    ]
  },
  {
    path: '/signin',
    component: Sign,
    children: [
      {
        name: 'SignIn',
        path: '',
        component: () => import('@/views/sign/signin')
      }
    ]
  },
  {
    path: '/dashboard/',
    component: Dashboard,
    meta: {
      requires_auth: true
    },
    children: [
      {
        name: 'OfferIndex',
        path: '',
        component: () => import('@/views/dashboard/offers/index')
      },
      {
        name: 'OfferNew',
        path: 'new',
        component: () => import('@/views/dashboard/offers/create')
      },
      {
        name: 'OfferEdit',
        path: 'edit/:id',
        component: () => import('@/views/dashboard/offers/edit')
      }
    ]
  }/*,
  { path: '*',
    redirect: '/dashboard'
  }*/
]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.BASE_URL,
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  const is_require_auth = to.matched.some(record => record.meta.requires_auth)
  const jwt = store.getters['auth/jwt']

  if (is_require_auth) {
    if (jwt == null) {
      next({
        path: '/signin'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
