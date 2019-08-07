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
            <li v-for="day in week" 
                class="li_day"
                v-bind:class="{   'currentDay': currentDayOnCalendar(day), 
                                  'longEvent': longEvent(day) }" >
            <img  src="src/assets/question.png" 
                  width="14px" 
                  height="14px" 
                  v-show="addButtonToDay(day)"
                  v-on:click="detailEvent(day)">  
            <img  src="src/assets/plus.png" 
                  width="16px" 
                  height="16px"
                  v-show="addPlus(i, day)" 
                  v-on:click="openAddEvent(day)">    
            <div class="day" 
                 v-bind:class="{  'grey': isAnotherMonth(i, day), 
                                  'currentDay': currentDayOnCalendar(day), 
                                  'red': weekEndDayFunction(day), 
                                  'longEvent': longEvent(day) }" 
                 v-html="[].concat(day).join('<br>')"></div>
            <img  src="src/assets/delete.png" 
                  v-show="addButtonToDay(day)" 
                  width="15px" 
                  height="15px"
                  v-on:click="deleteEvent(day)">
            </li>
          </div>
        </div>
      </transition>
    </div>
    <div v-show="detailInformationOfEvent" class="underModalWindow">
      <div class="modalWindow">
          <img src="src/assets/x.png" width="20px" height="20px" v-on:click="detailInformationOfEvents.splice(0, detailInformationOfEvents.length)">
          <div v-for="(key, name) in detailInformationOfEvent">{{ name }}: {{ key }}</div>
          <button  v-on:click="detailInformationOfEvents.shift()" 
                  v-if="detailInformationOfEvents.length > 1">Следующее событие</button>
          <button  v-on:click="detailInformationOfEvents.shift()" 
                   v-else>Okey</button>
      </div>
    </div>
    <div v-show="modalWindowAdd" class="underModalWindow">
      <div class="modalWindow modalWindowAdd">
        <img src="src/assets/x.png" width="20px" height="20px" v-on:click="modalWindowAdd = false">
        <div class="modalWindow_order">Укажите событие которое хотите добавить на выбраную вами дату.</div>
        <input type="text" placeholder="Место для вашего события" v-model="inputInAddEvent">
        <button v-on:click="addEvent(inputInAddEvent)">Добавить</button>
      </div>
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
      eventsData: json,
      // modalWindowDetail: false,
      modalWindowAdd: false,
      memo: '',
      dayWhenAddEvent: Number,
      inputInAddEvent: '',
      detailInformationOfEvents: []
    }
  },
  computed: {
    getCalendar(){
      return this.buildCalendar();
    },
    detailInformationOfEvent(){
      return this.detailInformationOfEvents[0];
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
    addPlus(weekIndex, dayNumber) {
      if(weekIndex === 0 && dayNumber > 15) {
        // первая неделе и номер дня > 15
        return false
      }
      if (weekIndex === 4 && dayNumber < 15) {
        // последняя неделя и номер дня < 15
        return false
      }
      if (weekIndex === 5 && dayNumber < 15) {
        // последняя неделя и номер дня < 15
        return false
      }if(this.currentPage > this.date.getMonth()){
        return true;
      }if(dayNumber[0] >= this.date.getDate() &&
        this.currentPage >= this.date.getMonth()){
        return true;
      }

      // день принадлежит текущему месяцу
      // return true
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
      let dataOfWeekEnd = new Date(this.year, this.currentPage, dayNumber[0]);
      if(dataOfWeekEnd.getDay() === 6 || dataOfWeekEnd.getDay() === 0){
        return true;
      }
    },
    longEvent(dayNumber){
      let arrOfEvents = this.eventsData.events;
      for(let z = 0; z < arrOfEvents.length; z++){
        let dataStartOfEvent = arrOfEvents[z].starts_at;
        let getStartDataOfEvent = new Date(dataStartOfEvent);
        let dataEndOfEvent = arrOfEvents[z].ends_at;
        let getEndDataOfEvent = new Date(dataEndOfEvent);
        if(getStartDataOfEvent.getMonth() != getEndDataOfEvent.getMonth()){
          if((dayNumber[0] >= getStartDataOfEvent.getDate() && dayNumber[0] <= this.getLastDayOfMonth(getStartDataOfEvent.getMonth())) &&
            this.currentPage === getStartDataOfEvent.getMonth() &&
            this.year === getStartDataOfEvent.getFullYear()){
            return true;
          }else if(dayNumber[0] >= 1 && dayNumber[0] <= getEndDataOfEvent.getDate() &&
            this.currentPage === getEndDataOfEvent.getMonth() &&
            this.year === getEndDataOfEvent.getFullYear()){
            return true;
          }
        }else if(getStartDataOfEvent.getMonth() === getEndDataOfEvent.getMonth() && 
          getStartDataOfEvent.getDate() != getEndDataOfEvent.getDate()){
          if(dayNumber[0] >= getStartDataOfEvent.getDate() && dayNumber[0] <= getEndDataOfEvent.getDate()){
            return true;
          }
        }
      }
    },
    addButtonToDay(dayNumber){
      let arrOfEvents = this.eventsData.events;
      for(let z = 0; z < arrOfEvents.length; z++){
        let dataStartOfEvent = arrOfEvents[z].starts_at;
        let getStartDataOfEvent = new Date(dataStartOfEvent);
        let dataEndOfEvent = arrOfEvents[z].ends_at;
        let getEndDataOfEvent = new Date(dataEndOfEvent);
        if(getStartDataOfEvent.getMonth() != getEndDataOfEvent.getMonth()){
          if((dayNumber[0] >= getStartDataOfEvent.getDate() && dayNumber[0] <= this.getLastDayOfMonth(getStartDataOfEvent.getMonth())) &&
            this.currentPage === getStartDataOfEvent.getMonth() &&
            this.year === getStartDataOfEvent.getFullYear()){
            return true;
          }else if(dayNumber[0] >= 1 && dayNumber[0] <= getEndDataOfEvent.getDate() &&
            this.currentPage === getEndDataOfEvent.getMonth() &&
            this.year === getEndDataOfEvent.getFullYear()){
            return true;
          }
        }else if(getStartDataOfEvent.getMonth() === getEndDataOfEvent.getMonth() && 
          getStartDataOfEvent.getDate() != getEndDataOfEvent.getDate()){
          if(dayNumber[0] >= getStartDataOfEvent.getDate() && dayNumber[0] <= getEndDataOfEvent.getDate()){
            return true;
          }
        }else if(getStartDataOfEvent.getMonth() === getEndDataOfEvent.getMonth() && 
          getStartDataOfEvent.getDate() === getEndDataOfEvent.getDate()){
          if((dayNumber[0] === getStartDataOfEvent.getDate() && dayNumber[0] === getEndDataOfEvent.getDate()) &&
            (this.currentPage === getStartDataOfEvent.getMonth() && this.currentPage === getEndDataOfEvent.getMonth())){
            return true;
          }
        }
      }
    },
    deleteEvent(dayNumber){
      let arrOfEvents = this.eventsData.events;
      let definiteEvent = new Date(this.year, this.currentPage, dayNumber[0]);
      for(let z = 0; z < arrOfEvents.length; z++){
        let dataStartOfEvent = arrOfEvents[z].starts_at;
        let getStartDataOfEvent = new Date(dataStartOfEvent);
        let dataEndOfEvent = arrOfEvents[z].ends_at;
        let getEndDataOfEvent = new Date(dataEndOfEvent);
        if(definiteEvent.setHours(0) >= getStartDataOfEvent.setHours(0) && 
            definiteEvent.setHours(0) <= getEndDataOfEvent.setHours(0)){
          arrOfEvents.splice(z, 1);
        }else if(definiteEvent.getDate() >= getStartDataOfEvent.getDate() && 
                definiteEvent.getDate() <= getEndDataOfEvent.getDate()){
          arrOfEvents.splice(z, 1);
        }
     }
    },
    detailEvent(dayNumber){
      for(let q = 1; q <= dayNumber.length; q++){
        this.memo = dayNumber[q];
        let arrOfEvents = this.eventsData.events;
        for(let z = 0; z < arrOfEvents.length; z++){
          let memoInJSON = arrOfEvents[z].memo;
          let dataStartOfEvent = arrOfEvents[z].starts_at;
          let getStartDataOfEvent = new Date(dataStartOfEvent);
          let dataEndOfEvent = arrOfEvents[z].ends_at;
          let getEndDataOfEvent = new Date(dataEndOfEvent);
          if(this.memo === memoInJSON){
            this.detailInformationOfEvents.push({
              'Cобытие': this.memo,
              'Начало события': getStartDataOfEvent.getFullYear() +'-'+ getStartDataOfEvent.getMonth()+'-'+ getStartDataOfEvent.getDate(),
              'Конец события': getEndDataOfEvent.getFullYear() +'-'+ getEndDataOfEvent.getMonth()+'-'+ getEndDataOfEvent.getDate()
            });
          }
        }
      }
    },
    openAddEvent(dayNumber){
      this.modalWindowAdd = true;
      this.dayWhenAddEvent = dayNumber;
    },
    addEvent(text){
      this.modalWindowAdd = false;
      if(text != ''){
        let arrOfEvents = this.eventsData.events;
        let eventInformAdd = {
          "id": Date.now(),
          "starts_at": new Date(this.year, this.currentPage, this.dayWhenAddEvent[0]),
          "ends_at": new Date(this.year, this.currentPage, this.dayWhenAddEvent[0]),
          "memo": text
        }
        arrOfEvents.push(eventInformAdd);
        this.dayWhenAddEvent.push(text);
      }
      this.inputInAddEvent = '';
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
    height: 720px;
    position: absolute;
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
    height: 93.5px;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    background-color: white;
    list-style-type: none;
    text-align: center;
  }
  .day{
    height: 93px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0px auto 0px auto;
  }
  .li_day:hover{
    cursor: pointer;
    border: 1px solid #BAAAAA;
  }
  .grey{
    color: #BAAAAA;
  }
  .currentDay{
    background: #16B9DE; 
  }
  .red{
    color: red;
  }
  .longEvent{
    background-color: #FFDD4A;
  }
  .fade_wrapper{
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 700px;
    background-color: white;
  }
  .li_day{
    display: flex;
    justify-content: space-between;
    border: 1px solid #E0D0D0;
  }
  /*______ModalWindow*/
  .underModalWindow{
    width: 100%;
    height: 720px;
    background: rgba(0,0,0, 0.5);
    position: relative;
  }
  .modalWindow{
    position: relative;
    background-color: white;
    width: 400px;
    height: 200px;
    top: 200px;
    left: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 2;
  }
  .modalWindow img{
    margin-top: 0px;  
    margin-left: 90%;  
  }
  .modalWindow div{
    width: 60%;
    margin: 0px auto;
    height: 30px;
    text-align: center;  
  }
  .modalWindow button{
    width: 150px;
    margin: 0 auto 20px;
    height: 30px;
  }
  .modalWindowAdd{
    display: flex;
    flex-direction: column;
  }
  .modalWindowAdd div{
    margin-bottom: 20px;
  }
  .modalWindowAdd input{
    margin: 0px auto 20px auto;
    width: 300px;
    text-align: center;
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