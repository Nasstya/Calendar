import vuex from 'vuex'
import Vue from 'vue';
import json from '../components/Calendar_data.json'

Vue.use(vuex);

export default new vuex.Store({
  state: {
    eventData: json,
    modalWindowAdd: false,
    modalWindowDetail: false,
  },
  actions: {
    
  },
  mutations: {
    changeModalWindowAdd(state, payload){
    	state.modalWindowAdd = !payload
    },
    changeModalWindowDetail(state, payload){
    	state.modalWindowDetail = !payload
    }
  },
})
