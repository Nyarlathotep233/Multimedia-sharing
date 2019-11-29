import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Video from '../views/Video.vue'
import Music from '../views/Music.vue'
import BBS from '../views/BBS.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/video',
    component: Video
  },
  {
    path: '/music',
    component: Music
  },
  {
    path: '/bbs',
    component: BBS
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // console.log(next)
  if (router.app.$store.state.routerposition[to.path] < router.app.$store.state.routerposition[from.path]) {
    router.app.$store.commit("updatetransname", "left")
  } else {
    router.app.$store.commit("updatetransname", "right")
  }
  next()
})

export default router