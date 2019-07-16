<template>
  <div class="all">
    <div class="allсalendar">
      <div class="pagination">
        <div @click="prevPage"
              ><</div> 
        <p>{{ nameOfOneMonth }} {{ year }}</p>
        <div @click="nextPage"
              >></div> 
      </div>

      <div class="calendar">
        <div class="d_nameOfDays">
          <li v-for="day in nameOfDays" class="nameOfDays">{{ day }}</li>
        </div>

        <div v-for="week in getCalendar" class="d_day">
          <div v-for="day in week" class="day">{{ day }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      currentPage: 0,
      namesOfMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      nameOfOneMonth: '',
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
    this.currentPage = this.date.getMonth();
    this.nameOfOneMonth = this.namesOfMonths[this.currentPage];
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
  body{
    background-color: #FAFAFA;
  }
  .allсalendar{
    background-color: white;
    margin-left: 30px;
    margin-right: 1208px
  }
  .pagination{
    justify-content: space-between;
  }
  .pagination, .nameOfDays{
    display: flex;
  }
  .nameOfDays{
    font-size: 20px;
  }
  .pagination div{
    width: 30px;
    height: 30px;
    padding-top: 8px;
    margin-bottom: -5px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  .pagination div:active{
    color: #9D9D9D;
  }
  .pagination div:hover{
    color: white;
    background-color: #DEDEDE;
  }
  .pagination p{
    margin: 10px auto 5px auto;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }
  .d_nameOfDays{
    margin: 5px auto 5px auto;
    padding-left: 10px;
    background-color: #DEDEDE;
    
  }
  .nameOfDays, .day{
    list-style-type: none;
    text-align: center;
    cursor: pointer;
  }
  .d_day, .d_nameOfDays{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  .day{
    font-size: 18px;
  }
  .day:hover {
    background: #16B9DE;
    color: white;
    border-radius: 10%;

  }
</style>