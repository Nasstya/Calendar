<template>
  <div class="all">
   <app-calendar></app-calendar>
   <app-add v-if="modalWindowAdd"
            :dayWhenAddEvent='dayNumber'
            :currentPage='currentPage'
            :year='year'></app-add>
   <app-detail  v-if="modalWindowDetail"
                :eventText='text'></app-detail>
  </div> 
</template>

<script>
  import appCalendar from './components/Calendar.vue'
  import appAdd from './components/ModalWindowAdd.vue'
  import appDetail from './components/ModalWindowDetail.vue'
  import { bus } from './main.js'
  export default {
    components: {
      appCalendar,
      appAdd,
      appDetail
    },
    data(){
      return{
        modalWindowAdd: false,
        modalWindowDetail: false,
        dayNumber: Number,
        year: Number,
        currentPage: Number,
        text: String
      }
    },
    created(){
      bus.$on('changeModalWindowAdd', data => {
        this.modalWindowAdd = data;
      });
      bus.$on('changeModalWindowDetail', data => {
        this.modalWindowDetail = data;
      });
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
      })
    }
  };
</script>

<style>
  
</style>