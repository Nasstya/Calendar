<template>
	 <div class="overflow-div">
      <app-pagination></app-pagination>
      <app-eventsdays></app-eventsdays>
    </div>
</template>

<script>
  import appPagination from './Pagination.vue'
  import appEventsdays from './EventsDays.vue'
  export default {
    data(){
      return{
        
      }
    },
    components: {
      appPagination,
      appEventsdays
    }
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
  body{
    background-color: #FAFAFA;
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
  }
  .overflow-div{
    overflow: hidden;
    width: 100%;
    height: 720px;
    position: absolute;
  }
  
</style>