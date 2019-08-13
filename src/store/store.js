import vuex from 'vuex'
import Vue from 'vue';
import json from '../components/Calendar_data.json'

Vue.use(vuex);

export default new vuex.Store({
  state: {
    eventData: json,
    modalWindowAdd: false,
    modalWindowDetail: false,
    year: Number,
    currentPage: Number,
    nameOfClass: '',
    dayWhenAddEvent: Number,
    sendTextEvent: String
  },
  actions: {
    
  },
  mutations: {
    changeModalWindowAdd(state, payload){
    	state.modalWindowAdd = !payload
    },
    changeModalWindowDetail(state, payload){
    	state.modalWindowDetail = !payload
    },
    changeModalWindowDetail(state, payload){
      state.modalWindowDetail = !payload
    },
    changeModalWindowDetail(state, payload){
      state.modalWindowDetail = !payload
    },
    SET_YEAR: (state, payload) => {
      state.year = payload;
    },
    SET_CURRENTPAGE: (state, payload) => {
      state.currentPage = payload;
    },
    incrementPage(state) {
      state.currentPage++;
    },
    decrementPage(state) {
      state.currentPage--;
    },
    incrementYear(state) {
      state.year++;
    },
    decrementYear(state) {
      state.year--;
    },
    currentPageMinusOne(state){
      state.currentPage = -1;
    },
    currentPageTwelve(state){
      state.currentPage = 12;
    },
    changeNameClass(state, payload){
      state.nameOfClass = payload;
    },
    sendDayWhenAddEvent(state, payload){
      state.dayWhenAddEvent = payload;
    },
    sendTextEvent(state,payload){
      state.sendTextEvent = payload;
    }
  },
})
