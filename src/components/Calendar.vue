<template>
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
                v-bind:class="{   'currentDay': currentDayOnCalendar(i, day), }" >  
              <img  src="src/assets/plus.png" 
                  width="16px" 
                  height="16px"
                  v-show="addPlus(i, day)" 
                  v-on:click="openAddEvent(day)"> 
              <div class="day" 
                   v-bind:class="{  'grey': isAnotherMonth(i, day),
                                    'red': weekEndDayFunction(i, day) }">{{ day }}</div>
              <div  v-for="event in buildEvents(i, day)" 
                    class="event"
                    v-bind:class="{  'eventBrown': eventBrown(event), 
                                     'eventPurple': eventPurple(event),
                                     'eventOrange': eventOrange(event),
                                     'eventBlue': eventBlue(event) }"
                    v-on:click="openModalDetail(event)">{{ event }}
              <div class="event_div" v-if="showDelete(event)">
                <img  src="src/assets/delete1.png" 
                      width="15px" 
                      height="15px"
                      v-on:click="deleteEvent(event)">
              </div>
              </div>
            </li>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import json from './Calendar_data.json'
  import { mapState } from "vuex";
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
      options: [
        { text: 'Встреча', value: '8' },
        { text: 'День Рождения', value: '4' },
        { text: 'Праздник', value: '1' },
        { text: 'Другое', value: '16' }
      ],
    }
  },
  computed: {
    getCalendar(){
      return this.buildCalendar();
    },
    eventsData() {
	  return this.$store.state.eventData;
	},
	modalWindowAdd() {
      return this.$store.state.modalWindowAdd;
    },
    modalWindowDetail() {
      return this.$store.state.modalWindowDetail;
    },
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
      if(dayNumber < this.date.getDate() &&
        this.currentPage <= this.date.getMonth()){
        return false;
      }if(!this.isAnotherMonth(weekIndex, dayNumber)){
        return true;
      }
    },
    showDelete(eventText){
      let arrOfEvents = this.eventsData.events;
      for(let z = 0; z < arrOfEvents.length; z++){
        let memo = arrOfEvents[z].memo;
        if(memo === eventText){
          if((arrOfEvents[z].type > 1 && arrOfEvents[z].type < 3) || arrOfEvents[z].type > 3){
            return true;
          }
        }
      }
    },
    currentDayOnCalendar(weekindex, dayNumber){
      if(this.currentPage === this.date.getMonth() && 
        dayNumber === this.date.getDate() && 
        this.year === this.date.getFullYear() &&
        !this.isAnotherMonth(weekindex, dayNumber)){
        return true;
      }
      return false
    },   
    weekEndDayFunction(weekIndex, dayNumber){
      let dataOfWeekEnd = new Date(this.year, this.currentPage, dayNumber);
      if((dataOfWeekEnd.getDay() === 6 || dataOfWeekEnd.getDay() === 0) &&
        !this.isAnotherMonth(weekIndex, dayNumber)){
        return true;
      }
    },
    eventBrown(eventText){
      let arrOfEvents = this.eventsData.events;
      for(let z = 0; z < arrOfEvents.length; z++){
        let memo = arrOfEvents[z].memo;
        if(eventText === memo){
          if(arrOfEvents[z].type === 8 ||
            arrOfEvents[z].type === 16){
            return true;
          }
        }
      }
    },
    eventPurple(eventText){
      let arrOfEvents = this.eventsData.events;
      for(let z = 0; z < arrOfEvents.length; z++){
        let memo = arrOfEvents[z].memo;
        if(eventText === memo){
          if(arrOfEvents[z].type === 1 || 
             arrOfEvents[z].type === 4){
            return true;
          }
        }
      }
    },
    eventOrange(eventText){
      let arrOfEvents = this.eventsData.events;
      for(let z = 0; z < arrOfEvents.length; z++){
        let memo = arrOfEvents[z].memo;
        if(eventText === memo){
          if(arrOfEvents[z].type === 3){
            return true;
          }
        }
      }
    },
    eventBlue(eventText){
      let arrOfEvents = this.eventsData.events;
      for(let z = 0; z < arrOfEvents.length; z++){
        let memo = arrOfEvents[z].memo;
        if(eventText === memo){
          if(arrOfEvents[z].type === 18){
            return true;
          }
        }
      }
    },
    openAddEvent(dayNumber){
      this.$store.commit('changeModalWindowAdd', this.modalWindowAdd);
      this.$emit('sendDayWhenAddEvent', dayNumber);
      this.$emit('sendMonth', this.currentPage);
      this.$emit('sendYear', this.year);
    },
    deleteEvent(eventText){
      let arrOfEvents = this.eventsData.events;
      for(let z = 0; z < arrOfEvents.length; z++){
        let memo = arrOfEvents[z].memo;
        if(eventText === memo){
          arrOfEvents.splice(z, 1)
          this.$store.commit('changeModalWindowDetail', this.modalWindowDetail);
        }
      }
    },
    openModalDetail(text){
    	console.log('информация')
    	this.$store.commit('changeModalWindowDetail', this.modalWindowDetail);
    	this.$emit('sendTextEvent', text);
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
    buildEvents(weekIndex, dayNumber){
      let arrOfEvents = this.eventsData.events;
      const events = [];
       for(let z = 0; z < arrOfEvents.length; z++){
        let dataStartOfEvent = arrOfEvents[z].starts_at;
        let getStartDataOfEvent = new Date(dataStartOfEvent);
        let dataEndOfEvent = arrOfEvents[z].ends_at;
        let getEndDataOfEvent = new Date(dataEndOfEvent);
        let memo = arrOfEvents[z].memo;
        if(getStartDataOfEvent.getDate() == getEndDataOfEvent.getDate()){
          if(dayNumber == getStartDataOfEvent.getDate() &&
            this.currentPage == getStartDataOfEvent.getMonth() &&
            this.year == getStartDataOfEvent.getFullYear() &&
            !this.isAnotherMonth(weekIndex, dayNumber)){
              events.push(memo);
              continue;
          }
        }else if(getStartDataOfEvent.getDate() != getEndDataOfEvent.getDate() &&
            !this.isAnotherMonth(weekIndex, dayNumber)){
          for(let b = getStartDataOfEvent.getDate(); b <= this.getLastDayOfMonth(getStartDataOfEvent.getMonth()); b++){
            if(dayNumber === b &&
            this.currentPage == getStartDataOfEvent.getMonth() &&
            this.year == getStartDataOfEvent.getFullYear()){
              events.push(memo);
              continue;
            }
          }
          for(let b = 0; b <= getEndDataOfEvent.getDate(); b++){
            if(dayNumber === b &&
            this.currentPage == getEndDataOfEvent.getMonth() &&
            this.year == getEndDataOfEvent.getFullYear()){
              events.push(memo);
              continue;
            }
          }
        }
      }
      return events;
    },
    buildCalendar(){
      let massOfMonth = [];
      for (let months = 0; months < 12; months++){
        massOfMonth.push(months);
        massOfMonth[months] = [];
        for ( let daysInMonth = 0; daysInMonth < this.getLastDayOfMonth(months); daysInMonth++){
          massOfMonth[months].push(daysInMonth + 1)
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
  }
  .day{
    height: 20px;
    font-size: 20px;
    display: flex;
    margin: 0px auto 0px 80%;
  }
  .li_day:hover{
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
  .fade_wrapper{
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 700px;
    background-color: white;
  }
  .li_day{
    border: 1px solid #E0D0D0;
  }
  .li_day img{
    position: absolute;
  }
  .event{
    font-size: 13px;
    cursor: pointer;
    margin: 5px 3px 0px 3px;
    padding-left: 5px;
    padding-top: 2px;
    border-radius: 10px;
    color: white;
    display: flex;
    justify-content: space-between;
  }
  .event_div{
  	position: relative;
    padding-bottom: 20px;
    display: flex;
    width: 20px;
  }
  .eventBrown{
    background-color: #503D37;
  }
  .eventPurple{
    background-color: #922A5F;
  }
  .eventOrange{
    background-color: #ED5A4E;
  }
  .eventBlue{
    background-color: #2369A4;
  }
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
    /*justify-content: center;*/
    opacity: 2;
  }
  .modalWindow img{
    position: absolute;
    margin: 5px auto auto 93%;
  }
  .modalWindow_order{
    font-size: 15px;
    text-align: center;
    margin: 25px 10px 20px 0px;
  }
  .modalWindow-input_select{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .modalWindow-input_select input{
    width: 230px;
    margin-left: 3%;
  }
  select{
    height: 25px;
    margin-right: 10px;
  }
  .modalWindow button{
    width: 150px;
    height: 30px;
    margin: 0 auto;
  }
  .textOfError{
    color: red;
    font-size: 10px;
    margin: -10px auto 10px auto;
  }
  .errorWindow{
    display: flex;
  }
  .nameofModal{
    margin: 15px auto 10px auto;
  }
  .detailEvent{
    margin: 0px auto 3px 10px;
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