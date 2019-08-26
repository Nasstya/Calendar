import vuex from 'vuex'
import Vue from 'vue';
import json from '../components/Calendar_data.json'

Vue.use(vuex); 

export default new vuex.Store({
  state: {
    eventData: json
  }
})
