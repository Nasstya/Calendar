<template>
  <div class="all">
   <app-calendar @sendDayWhenAddEvent="dayWhenAddEvent = $event"
                 @sendMonth="month = $event"
                 @sendYear="year = $event"
                 @sendTextEvent="text = $event"></app-calendar>
   <app-add v-if="modalWindowAdd"
            :dayWhenAddEvent="dayWhenAddEvent"
            :monthWhenAddEvent="month"
            :yearWhenAddEvent="year"></app-add>
   <app-detail  v-if="modalWindowDetail"
                :eventText="text"></app-detail>
                <!-- <button v-on:click="ght" class="ght">jrtq</button> -->
  </div> 
</template>

<script>
  import appCalendar from './components/Calendar.vue'
  import appAdd from './components/ModalWindowAdd.vue'
  import appDetail from './components/ModalWindowDetail.vue'
  export default {
    data(){
      return{
        dayWhenAddEvent: Number,
        month: Number,
        year: Number,
        text: String
      }
    },
    components: {
      appCalendar,
      appAdd,
      appDetail
    },
    computed: {
      modalWindowAdd() {
        return this.$store.state.modalWindowAdd;
      },
      modalWindowDetail() {
        return this.$store.state.modalWindowDetail;
      },
    },
    // methods: {
    //   ght(){
    //     console.log(this.text)
    //     this.$store.commit('changeModalWindowDetail', this.modalWindowDetail);
    //   }
    // }
  };
</script>

<style>
  /*.ght{
    position: absolute;
  }*/
</style>