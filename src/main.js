import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import VueRouter from 'vue-router'
import AxiosPlugin from './plugins/Axios'
import routes from './routes'
import Vuex from 'vuex'


Vue.use(VueRouter)
Vue.use(AxiosPlugin)
Vue.use(Vuex)

Vue.config.productionTip = false
const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})

const store = new Vuex.Store({
  state: {
    editorContent: '',
    userData: {
      isSignin: false,
      userId: 0,
      userName: ''
    }
  },
  mutations: {
    changeContent(state, text) {
      state.editorContent = text
    },
    userSignin(state, params) {
      console.log('store')
      console.log(params.token)
      state.userData.isSignin = true
      state.userData.userId = params.userId
      state.userData.userName = params.userName
      localStorage.token = params.token
      localStorage.userId = state.userData.userId
      localStorage.userName = state.userData.userName
    },
    userSignout(state) {
      state.userData.isSignin = false
      state.userData.userId = 0
      state.userData.userName = ''
      localStorage.token = ''
      localStorage.userId = 0
      localStorage.userName = ''
    },
    updateUserData(state) {
      state.userData.isSignin = true
      state.userData.userId = localStorage.userId
      state.userData.userName = localStorage.userName
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
