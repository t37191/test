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
      userId: 1,
      userName: ''
    }
  },
  mutations: {
    changeContent(state, text) {
      state.editorContent = text
    },
    userSignin(state, userId, userName) {
      state.userData.isSignin = true
      state.userData.userId = userId
      state.userData.userName = userName
    },
    userSignout(state) {
      state.userData.isSignin = false
      state.userData.userId = 0
      state.userData.userName = ''
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
