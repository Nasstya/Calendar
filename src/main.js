import Vue from 'vue'
import App from './App.vue'
import store from './store/store.js'

export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
