import Vue from 'vue'
import Router from 'vue-router'
import Test from './views/Test.vue'
import HomeNav from './views/HomeNav.vue'

import Login from './views/Login.vue'
import Register from './views/Register.vue'
import ArticleList from './views/ArticleList'
import ArticleEdit from './views/ArticleEdit'
import ArticleManage from './views/ArticleManage'
import Article from './views/Article'
import UserInfo from './views/UserInfo'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: '/',

  routes: [{
      path: '/',
      // name: 'home',
      component: HomeNav,
      meta: {
        title: "ホーム"
      },
      children: [{
          path: '/',
          name: 'article-list',
          component: ArticleList
        },
        {
          path: '/write-article',
          name: 'writeArticle',
          component: ArticleEdit
        },
        {
          path: '/write-article/:id',
          name: 'updateArticle',
          component: ArticleEdit,
          props: true
        },
        {
          path: '/manage-articles',
          name: 'manage-article',
          component: ArticleManage
        },
        {
          path: '/article/:id',
          name: 'article',
          component: Article,
          props: true
        }, {
          path: '/user/:id',
          name: 'userinfo',
          component: UserInfo,
          props: true
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: "ログイン",
        isPublic: true
      }
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: "新規登録",
        isPublic: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    Vue.prototype.$message({
      type: 'error',
      message: 'Please Log In'
    })
    return next('/login')
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }else{
    document.title = "MY BLOG "
  }
  next()
})

export default router
