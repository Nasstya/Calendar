<template>
  <div class="all">
      <div class="pagination">
        <div @click="prevPage" class="btn-left"><</div> 
        <p>{{ nameOfOneMonth }} {{ year }}</p>
        <div @click="nextPage" class="btn-right">></div> 
      </div>

        <div class="d_nameOfDays">
          <li v-for="day in nameOfDays" class="nameOfDays">{{ day }}</li>
        </div>
        <transition-group name="fade" >
          <div v-for="(week, i) in getCalendar" class="d_day" :key = "i">
            <li v-for="(day, h) in week" class="li_day" :key = "h">
            <div class="day" 
               v-bind:class="{ 'grey': isAnotherMonth(i, day), 'currentDay': currentDayOnCalendar(day) }"
               >{{ day }}</div>
          </li>
        </div>
        </transition-group>
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
      isActive: true,
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
    isAnotherMonth(weekIndex, dayNumber) {
      if(weekIndex === 0 && dayNumber > 15) {
        // первая неделе и номер дня > 15
        return true
      }
      if (weekIndex === 4 && dayNumber < 15) {
        // последняя неделя и номер дня < 15
        return true
      }
      // день принадлежит текущему месяцу
      return false
    },
    currentDayOnCalendar(dayNumber){
      if(this.currentPage === this.date.getMonth() && dayNumber === this.date.getDate()){
        return true
      }
      return false
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
          let t = this.getLastDayOfMonth(months-1) + 1;
          for(let nulldays = 0; nulldays <= 5; nulldays++){
            t--;
            massOfMonth[months].unshift(t);
          }
        }
        //Заполняем конец каждого месяца числами из будущего месяца
        if(this.getNumberOfFirstDayInMonth(months + 1) > 1){
          let t = 0;
          for(let q = this.getNumberOfFirstDayInMonth(months + 1); q <= 7; q++){
            t++;
            massOfMonth[months].push(t);
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
  .pagination{
    display: grid;
    height: 40px;
    grid-template-columns: 1fr 4fr 1fr;
    margin: 20px 80% auto 5%;
    background-color: white;
  }
  .btn-left, .btn-right{
    padding: 10px 10px;
    height: 20px;
    font-weight: bold;
    font-size: 18px;
  }
  .btn-left:hover, .btn-right:hover{
    background-color: #9D9D9D;
    color: white;
    cursor: pointer;
  }
  .pagination p{
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
    font-weight: bold;
  }
  .d_nameOfDays{
    display: grid;
    height: 25px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    margin: 0 80% auto 5%;
    background-color: #DEDEDE;;
    list-style-type: none;
    text-align: center;
    padding-top: 5px;
  }
  .d_day{
    display: grid;
    height: 23px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    margin: 0 80% auto 5%;
    background-color: white;
    list-style-type: none;
    text-align: center;
    padding-top: 3px;
  }
  .day{
    border: 1px solid white;
  }
  .day:hover{
    cursor: pointer;
    border-radius: 10%;
    border: 1px solid #BAAAAA;
  }
  .grey{
    color: #BAAAAA;
  }
  .currentDay{
    background: #16B9DE; 
    border-radius: 10%;
  }


  /*.allсalendar{
    background-color: white;
    margin-left: 30px;
    margin-right: 80%
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
    transition: 1s.
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
    margin-top: 2px;
    border: 0.5px solid white;
  }
  .day:hover {
    /*background: #16B9DE;
    /*color: white;*/
    /*border-radius: 10%;
    border: 0.5px solid #BAAAAA;
  }
  .grey{
    color: #BAAAAA;
  }
  .currentDay{
    background: #16B9DE; 
    border-radius: 10%;
  }*/
</style>