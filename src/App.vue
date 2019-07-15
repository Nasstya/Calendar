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
        <div class="nameOfDays"><li v-for="days in nameOfDays">{{ days }}</li></div>
        <div v-for="(monthInCalendar, index) in getCalendar" :key = "index" class="month">
        {{ monthInCalendar }}</div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      currentPage: 0,
      namesOfMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      nameOfOneMonth: 'January',
      nameOfDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
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

    getLastDayOfMonth(year, month) { // нахождение числа последнего дня в месяце
      let dateDaysInMonth = new Date(year, month + 1, 0);
      return dateDaysInMonth.getDate();
    },
    getNumberOfFirstDayInMonth(month){ //нахождение номера первого дня в месяце
      let dateFirstDayInMonth = new Date(2019, month, 1);
      return dateFirstDayInMonth.getDay();
    },
    buildCalendar(){
      let massOfMonth = [];
      for (let months = 0; months < 12; months++){
        massOfMonth.push(months);
        massOfMonth[months] = [];
        for ( let daysInMonth = 1; daysInMonth <= this.getLastDayOfMonth(2019, months); daysInMonth++){
          massOfMonth[months].push(daysInMonth);
        }
        // Заполняем начало каждого месяца числами из прошлого месяца
        if(this.getNumberOfFirstDayInMonth(months) > 0){
          let t = this.getLastDayOfMonth(2019, months-1) + 1;
          for(let b = 0; b <= this.getNumberOfFirstDayInMonth(months) - 2; b++){
            t--;
            massOfMonth[months].unshift(t)
          }
        }else if(this.getNumberOfFirstDayInMonth(months) === 0){
          let u = this.getLastDayOfMonth(2019, months-1) + 1;
          for(let nulldays = 0; nulldays <= 5; nulldays++){
            u--;
            massOfMonth[months].unshift(u);
          }
        }
        //Заполняем конец каждого месяца числами из будущего месяца
        if(this.getNumberOfFirstDayInMonth(months + 1) >= 1){
          for(let e = 1; e < this.getNumberOfFirstDayInMonth(months + 1) - 1; e++){
            massOfMonth[months].push(e);
          }
        }else if(this.getNumberOfFirstDayInMonth(months + 1) === 0){
            let e = 1;
            massOfMonth[months].push(e);
        }
      }

      // разбиение большого массива месяц на 
      // меньшие массивы которые имеют по 7 элементов
      var longArray = massOfMonth[this.currentPage];
      var size = 7;
      
      var newArray = new Array(Math.ceil(longArray.length / size)).fill("")
          .map(function() { 
            return this.splice(0, size) 
          }, longArray.slice());
       //--------------------------------------------------   
        return newArray; // вывод самого календаря
    }
  }
};
</script>

<style>
  .month{
    list-style-type: none;
    width: 180px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
  }
  .pagination, .nameOfDays{
    display: flex;
  }
  .nameOfDays{
    width: 180px;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
  }
</style>




<!--         if(this.getNumberOfFirstDayInMonth(months) > 0){
          for(let nulldays = 0; nulldays <= this.getNumberOfFirstDayInMonth(months) - 2; nulldays++){
            massOfMonth[months].unshift('');
          }
        }else if(this.getNumberOfFirstDayInMonth(months) > 1 && this.getNumberOfFirstDayInMonth(months) < 1){
          let massOfLastDaysOfPastMonth = [];
          for(let b = this.getLastDayOfMonth(2019, months); b <= this.getNumberOfFirstDayInMonth(months); b--){
            massOfMonth[months].unshift(b);
          }
        }else{
          for(let nulldays = 0; nulldays <= 5; nulldays++){
            massOfMonth[months].unshift('');
          }
        } -->