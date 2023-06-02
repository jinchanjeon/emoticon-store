// 최초실행 js 파일
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import store from "./store"
import VueCookie from 'vue-cookie'
import io from 'socket.io-client'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate' // 새로고침시 vuex 라우터 변수 사라지지 않게하는 미들웨어

//서버로 socket connection 요청
const socket = io('http://localhost:8000')

Vue.use(VueAxios,axios)
Vue.use(VueCookie)
Vue.use(Vuex)


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() //이벤트 버스 사용
Vue.prototype.$socket = socket; // connection 완료시 전역으로 socket사용할 수 있게 만든 것

//vuex 사용
const store = new Vuex.Store({
  state:{
      iconId: null,
      amount: null,
      imgUrl:null,
      title:null,
    }  ,
    
  getters:{ //계산된 속성(computed properties)
    getFilteredProduct:(state) => (keyword) => {
      const filtered = state.products.filter((object) => object.title.toLowerCase().includes(keyword.toLowerCase()) );
      if (filtered) return filtered;
  },
  },
  
  //  저장할 변수
  plugins:[Persistedstate({
    paths:["iconId","amount","imgUrl","title"]
  })],
  // 동작
  mutations:{ //데이터 변경(sync)
    saveiconId(state,id){
      state.iconId=id;
    },
    saveAmount(state,amount){
      state.amount=amount;
    },
    savetitle(state,title){
      state.title=title;
    },
    saveImageUrl(state,imgUrl){
      state.imgUrl=imgUrl;
    },

  },
  actions:{ //메서드(methods, async)

  }
  
})



new Vue({
  store,  // 전역등록
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

