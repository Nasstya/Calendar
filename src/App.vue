<template>
  <div class="all">
   <app-calendar></app-calendar>
   <app-modal  v-if="modalWindowDetail"
                :eventText='text'
                :dayWhenAddEvent='dayNumber'
                :currentPage='currentPage'
                :year='year'
                :getDetail='getDetail'
                :addEventToList='addEvent'></app-modal>
  </div> 
</template>

<script>
  import appCalendar from './components/Calendar.vue'
  import appModal from './components/ModalWindowDetail.vue'
  import { bus } from './main.js'
  export default {
    components: {
      appCalendar,
      appModal
    },
    data(){
      return{
        modalWindowDetail: false,
        dayNumber: Number,
        year: Number,
        currentPage: Number,
        text: String,
        getDetail: false,
        addEvent: false
      }
    },
    created(){
      bus.$on('sendTextEvent', data => {
        this.text = data;
      });
      bus.$on('DayWhenAddEvent', data => {
        this.dayNumber = data;
      });
      bus.$on('Year', data => {
        this.year = data;
      });
      bus.$on('Month', data => {
        this.currentPage = data;
      });
      bus.$on('getDetail', data => {
        this.getDetail = data;
      });
      bus.$on('addEvent', data => {
        this.addEvent = data;
      });
      bus.$on('changeModalWindowDetail', data => {
        this.modalWindowDetail = data;
      })
    }
  };
</script>

<style>
  
</style>