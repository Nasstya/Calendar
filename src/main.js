import Vue from 'vue'
import App from './App.vue'
import store from './store/store.js'

export const bus = new Vue();
new Vue({
  el: '#app',
  render: h => h(App),
  store
})
