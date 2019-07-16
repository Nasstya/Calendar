<template>
  <div>
    <div class="pagination">
      <button @click="prevPage"
            ><</button> 
      <p>{{ nameOfOneMonth }} {{ year }}</p>
      <button @click="nextPage"
            >></button> 
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
      if (this.currentPage === 0) {
        this.currentPage = 12;
        this.year--;
      }
      this.currentPage--;
      this.nameOfOneMonth = this.namesOfMonths[this.currentPage];
    },
    nextPage(){
      if (this.currentPage === 11) {
        this.currentPage = -1;
        this.year++;
      }
      this.currentPage++;
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
    margin-left: 30px;
  }
  .pagination{
    margin: 10px auto -15px 23px;
  }
  .pagination, .nameOfDays{
    display: flex;
  }
  .pagination button{
    width: 30px;
    height: 20px;
    margin: 14px 5px auto 5px;
  }
  .pagination p{
    width: 115px;
    text-align: center;
  }
  .nameOfDays{
    width: 180px;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    margin-left: 30px;

  }
</style>