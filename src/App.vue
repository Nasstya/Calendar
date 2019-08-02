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
                 v-bind:class="{ 'grey': isAnotherMonth(i, day), 'currentDay': currentDayOnCalendar(day), 'red': weekEndDayFunction(day) }" 
                 v-html="[].concat(day).join('<br>')"></div>
              </li>
            </div>
          </div>
        </transition>
    </div>
  </div> 
</template>

<script>
  import json from './Calendar_data.json'
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
      nameOfClass: '',
      eventsData: json
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
      if(this.currentPage === this.date.getMonth() && 
        dayNumber[0] === this.date.getDate() && 
        this.year === this.date.getFullYear()){
        return true
      }
      return false
    },    
    weekEndDayFunction(dayNumber){
      let dataOfWeekEnd;
      dataOfWeekEnd = new Date(this.year, this.currentPage, dayNumber[0]);
      if(dataOfWeekEnd.getDay() === 6 || dataOfWeekEnd.getDay() === 0){
        return true;
      }
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
      let arrOfEvents = this.eventsData.events;
      let massOfMonth = [];
      for (let months = 0; months < 12; months++){
        massOfMonth.push(months);
        massOfMonth[months] = [];
        for ( let daysInMonth = 0; daysInMonth < this.getLastDayOfMonth(months); daysInMonth++){
          massOfMonth[months][daysInMonth] = [];
          massOfMonth[months][daysInMonth].push(daysInMonth + 1)
          for(let z = 0; z < arrOfEvents.length; z++){
            let dataStartOfEvent = arrOfEvents[z].starts_at;
            let getStartDataOfEvent = new Date(dataStartOfEvent);
            let dataEndOfEvent = arrOfEvents[z].ends_at;
            let getEndDataOfEvent = new Date(dataEndOfEvent);
            let memo = arrOfEvents[z].memo;
              if(getStartDataOfEvent.getDate() == getEndDataOfEvent.getDate()){
                if(daysInMonth == getStartDataOfEvent.getDate() &&
                  this.currentPage == getStartDataOfEvent.getMonth() &&
                  this.year == getStartDataOfEvent.getFullYear()){
                  massOfMonth[months][daysInMonth - 1].push(memo)
                }
              }else if(getStartDataOfEvent.getDate() != getEndDataOfEvent.getDate()){
                for(let b = getStartDataOfEvent.getDate() - 1; b <= this.getLastDayOfMonth(getStartDataOfEvent.getMonth()); b++){
                  if(daysInMonth === b &&
                  this.currentPage == getStartDataOfEvent.getMonth() &&
                  this.year == getStartDataOfEvent.getFullYear()){
                    massOfMonth[months][daysInMonth].push(memo);
                  }
                }
                for(let b = 0; b < getEndDataOfEvent.getDate(); b++){
                  if(daysInMonth === b &&
                  this.currentPage == getEndDataOfEvent.getMonth() &&
                  this.year == getEndDataOfEvent.getFullYear()){
                     massOfMonth[months][daysInMonth].push(memo);
                  }
                }
              }
          }
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
        if((this.getNumberOfFirstDayInMonth(months) === 0 || 
          this.getNumberOfFirstDayInMonth(months) === 6) &&
          (this.getNumberOfFirstDayInMonth(months + 1) > 1 &&
          this.getNumberOfFirstDayInMonth(months + 1) < 3)){
          let t = 0;
          for(let q = this.getNumberOfFirstDayInMonth(months + 1); q <= 7; q++){
            t++;
            massOfMonth[months].push(t);
          }
        } else{
          let t = 0;
          for(let q = this.getNumberOfFirstDayInMonth(months + 1); q <= 14; q++){
            t++;
            massOfMonth[months].push(t);
          }
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
    margin: 0;
    padding: 0;
  }
  .overflow-div{
    overflow: hidden;
    width: 100%;
    height: 690px;
    position: absolute;
    /*margin: 5% auto auto 5%;*/
  }
  .pagination{
    display: grid;
    height: 80px;
    grid-template-columns: 1fr 4fr 1fr;
    background-color: white;
  }
  .btn-left, .btn-right{
    padding-top: 20px;
    font-weight: bold;
    font-size: 40px;
    text-align: center;
    height: 60px;
  }
  .btn-left:hover, .btn-right:hover{
    background-color: #9D9D9D;
    color: white;
    cursor: pointer;
  }
  .pagination p{
    text-align: center;
    font-size: 40px;
    margin-top: 10px;
    font-weight: bold;
  }
  .d_nameOfDays{
    display: grid;
    height: 70px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    background-color: #DEDEDE;;
    list-style-type: none;
    text-align: center;
    padding-top: 15px;
    font-size: 40px;
  }
  .d_day{
    display: grid;
    height: 81px;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    background-color: white;
    list-style-type: none;
    text-align: center;
    padding-top: 3px;
  }
  .day{
    border: 1px solid white;
    padding-top: 20px;
    height: 60px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
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
  .red{
    color: red;
  }
  .fade_wrapper{
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 700px;
    background-color: white;
  }
  .test{
    position: relative;
    top: 600px;
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