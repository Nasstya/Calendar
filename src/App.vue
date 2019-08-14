<template>
  <div class="all">
   <app-calendar></app-calendar>
   <app-add v-if="modalWindowAdd"></app-add>
   <app-detail  v-if="modalWindowDetail"></app-detail>
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
      }
    },
    created(){
      bus.$on('changeModalWindowAdd', data => {
        this.modalWindowAdd = data;
      })
    }
  };
</script>

<style>
  
</style>