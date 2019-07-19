<template>
  <div class="all">
    <div class="overflow-div">
      <div class="pagination">
        <div @click="prevPage" class="btn-left"><</div> 
        <p>{{ nameOfOneMonth }} {{ year }}</p>
        <div @click="nextPage" class="btn-right">></div> 
      </div>

        <div class="d_nameOfDays">
          <li v-for="day in nameOfDays" class="nameOfDays">{{ day }}</li>
        </div>
        <transition :name="nameOfClass" >
          <div :key="currentPage" class="fade_wrapper">
            <div v-for="(week, i) in getCalendar" class="d_day">
            <li v-for="day in week" class="li_day">
            <div class="day" 
               v-bind:class="{ 'grey': isAnotherMonth(i, day), 'currentDay': currentDayOnCalendar(day) }"
               >{{ day }}</div>
              </li>
            </div>
          </div>
        </transition>
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
      isActive: true,
      year: '',
      nameOfClass: ''
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
    // idForSecondLi(id){
    //   return id = Date.now()++; 
    // },
    prevPage(){
      if (this.currentPage === 0) {
        this.currentPage = 12;
        this.year--;
      }
      this.nameOfClass = 'prev';
      this.currentPage--;
      this.nameOfOneMonth = this.namesOfMonths[this.currentPage];
    },
    nextPage(){
      if (this.currentPage === 11) {
        this.currentPage = -1;
        this.year++;
      }
      this.nameOfClass = 'next';
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
      if (weekIndex === 5 && dayNumber < 15) {
        // последняя неделя и номер дня < 15
        return true
      }
      // день принадлежит текущему месяцу
      return false
    },
    currentDayOnCalendar(dayNumber){
      if(this.currentPage === this.date.getMonth() && dayNumber === this.date.getDate() && this.year === this.date.getFullYear()){
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
  .overflow-div{
    overflow: hidden;
    width: 250px;
    height: 230px;
    position: absolute;
    margin: 5% auto auto 5%;

  }
  .pagination{
    display: grid;
    height: 40px;
    grid-template-columns: 1fr 4fr 1fr;
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
    background-color: #DEDEDE;;
    list-style-type: none;
    text-align: center;
    padding-top: 5px;
  }
  .d_day{
    display: grid;
    height: 23px;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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
  .fade_wrapper{
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 156px;
    background-color: white;
  }


  /*_____ANIMATION______*/
  /*________НАЗАД__________*/
  .prev-enter-active, .prev-leave-active {
    transition: transform 0.5s ease-in-out;
  }
  
  .prev-enter{
    transform: translateX(-100%);
  }
  .prev-leave-to {
    transform: translateX(100%);
  }
  
  .prev-enter-to, .prev-leave {
    transform: translateX(0);
  }
 /*______________________________*/

 /*________Вперед________*/

.next-enter-active, .next-leave-active {
    transition: transform 0.5s ease-in-out;
  }
  
  .next-enter{
    transform: translateX(100%);
  }
  .next-leave-to {
    transform: translateX(-100%);
  }
  
  .next-enter-to, .next-leave {
    transform: translateX(0);
  }
  /*_______________________________*/

</style>