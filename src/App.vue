<template>
  <div class="all">
    <app-calendar></app-calendar>
    <transition name="fade">
      <template>
        <app-add v-if="modalWindowAdd"
              :dataWhenAdd='dataInAdd'></app-add>
        <app-detail  v-if="modalWindowDetail" 
                  :eventText='text'></app-detail>
      </template>
    </transition>
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
        dataInAdd: Date,
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
      bus.$on('dataInAdd', data => {
        this.dataInAdd = data;
      });
    }
  };
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>