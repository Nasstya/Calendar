<!-- поменял год на гетфуллуеиар -->
<template>
  <div>
    <div class="pagination">
      <button @click="prevPage"
            :disabled="currentPage === 0"
            >Pref</button> 
      <p>{{ currentPage }} {{ nameOfOneMonth }} {{ year }}</p>
      <button @click="nextPage"
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
      nameOfDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      date: new Date(),
      year: ''
    }
  },
  computed: {
    getCalendar(){
      return this.buildCalendar();
    }
  },
  mounted(){
    this.year = this.date.getFullYear();
  },
  methods: {
    prevPage(){
      this.currentPage--;
      if(this.currentPage % 11 === 0){
        this.currentPage == 11;
        this.year--;
      }
      this.nameOfOneMonth = this.namesOfMonths[this.currentPage];
    },
    nextPage(){
      this.currentPage++;
      if(this.currentPage % 11 === 0){
        this.currentPage == 0;
        this.year++; 
      }
      this.nameOfOneMonth = this.namesOfMonths[this.currentPage];
    },
    getYear(){
      this.year = this.date.getFullYear();
    },
    getLastDayOfMonth(month) { // нахождение числа последнего дня в месяце
      let dateDaysInMonth = new Date(this.year, month + 1, 0);
      return dateDaysInMonth.getDate();
    },
    getNumberOfFirstDayInMonth(month){ //нахождение номера первого дня в месяце
      let dateFirstDayInMonth = new Date(this.year, month, 1);
      return dateFirstDayInMonth.getDay();
    },
    buildCalendar(){
      let massOfMonth = [];
      for (let months = 0; months < 12; months++){
        massOfMonth.push(months);
        massOfMonth[months] = [];
        for ( let daysInMonth = 1; daysInMonth <= this.getLastDayOfMonth(months); daysInMonth++){
          massOfMonth[months].push(daysInMonth);
        }
        // Заполняем начало каждого месяца числами из прошлого месяца
        if(this.getNumberOfFirstDayInMonth(months) > 0){
          let t = this.getLastDayOfMonth(months-1) + 1;
          for(let b = 0; b <= this.getNumberOfFirstDayInMonth(months) - 2; b++){
            t--;
            massOfMonth[months].unshift(t)
          }
        }else if(this.getNumberOfFirstDayInMonth(months) === 0){
          let u = this.getLastDayOfMonth(months-1) + 1;
          for(let nulldays = 0; nulldays <= 5; nulldays++){
            u--;
            massOfMonth[months].unshift(u);
          }
        }
        //Заполняем конец каждого месяца числами из будущего месяца
        if(this.getNumberOfFirstDayInMonth(months + 1) > 1){
          let i = 0;
          for(let q = this.getNumberOfFirstDayInMonth(months + 1); q <= 7; q++){
            i++;
            massOfMonth[months].push(i);
          }
        } else if(this.getNumberOfFirstDayInMonth(months + 1) === 0){
          massOfMonth[months].push(1);
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