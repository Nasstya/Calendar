<template>
  <div>
    <div class="pagination">
      <button @click="prevPage"
            :disabled="currentPage === 0"
            >Pref</button> 
      <p>{{ nameOfOneMonth }}</p>
      <button @click="nextPage"
            :disabled="currentPage === 11"
            >Next</button> 
    </div>
    <div class="calendar">
      <ul>
        <div v-for="(monthInCalendar, index) in getCalendar" :key = "index" class="month">{{ monthInCalendar }}</div>
      </ul> 
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      currentPage: 0,
      namesOfMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      nameOfOneMonth: 'January'
    }
  },
  computed: {
    getCalendar(){
      return this.buildCalendar();
    }
    },
  methods: {
    prevPage(){
      this.currentPage--;
      this.nameOfOneMonth = this.namesOfMonths[this.currentPage];
    },
    nextPage(){
      this.currentPage++;
      this.nameOfOneMonth = this.namesOfMonths[this.currentPage];
    },

    getLastDayOfMonth(year, month) {
      let date = new Date(year, month + 1, 0);
      return date.getDate();
    },
    buildCalendar(){
      let massOfMonth = [];
      for (let months = 0; months < 12; months++){
        massOfMonth.push(months);
        massOfMonth[months] = [];
        for ( let daysInMonth = 1; daysInMonth <= this.getLastDayOfMonth(2019, months); daysInMonth++){
          massOfMonth[months].push(daysInMonth);
        }
      }
      return massOfMonth[this.currentPage]; 
    }
  }
};
</script>

<style>
  .month{
    list-style-type: none;
    
  }
</style>



