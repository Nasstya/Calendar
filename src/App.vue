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
  export default {
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
  };
</script>

<style>
  
</style>