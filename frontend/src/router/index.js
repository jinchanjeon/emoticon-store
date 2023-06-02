import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Join from '../views/Join'
import Payments from '../views/Payments'
import AdminIcon from '../views/AdminIcon'
import AdminPayments from '../views/AdminPayments'
import SearchPage from '../views/SearchPage'

import AdminChat from '../views/AdminChat'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Home',
    components:{
      Home:Home
    }
  },
  /*
  {
    path: '/search/:keyword?',
    name: 'SearchPage',
    component: SearchPage,
    params: {
      keyword: this.keyword,
    },
  },
 */

  {
    path:'/SearchPage',
    name:'SearchPage',
    components:{
      SearchPage:SearchPage
    },

  },

  {
    path:'/AdminChat',
    name:'AdminChat',
    components:{
      AdminChat:AdminChat
    },
  
    
   
  },

  {
    path:'/Login',
    name:'Login',
    components:{
      Login:Login
    }
  },
  {
    path:'/Join',
    name:'Join',
    components:{
      Join:Join 
    }
  },
  {
    path:'/Payments',
    name:'Payments',
    components:{
      Payments:Payments 
    }
  },
  {
    path:'/AdminPayments',
    name:'AdminPayments',
    components:{
      AdminPayments:AdminPayments
    }
  },
  {
    path:'/AdminIcon',
    name:'AdminIcon',
    components:{
      AdminIcon:AdminIcon
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
