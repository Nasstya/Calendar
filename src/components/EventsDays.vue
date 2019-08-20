<template>
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
                    >
                    <span v-on:click="openModalDetail(event)">{{ event }}</span>
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
</template>

<script>
  import { bus } from './../main.js'
export default {
  data(){
    return{
      date: new Date(),
      isActive: true,
      options: [
        { text: 'Встреча', value: '8' },
        { text: 'День Рождения', value: '4' },
        { text: 'Праздник', value: '1' },
        { text: 'Другое', value: '16' }
      ],
      year: Number,
      currentPage: Number,
      nameOfClass: '',
      modalWindowAdd: false,
      addEvent: Boolean,
      getDetail: Boolean,
    }
  },
  created(){
    this.year = this.date.getFullYear();
    this.currentPage = this.date.getMonth();
    bus.$on('sendYear', data => {
      this.year = data
    });
    bus.$on('sendMonth', data => {
      this.currentPage = data
    });
    bus.$on('sendNameOfClass', data => {
      this.nameOfClass = data
    });
  },
  computed: {
    getCalendar(){
      return this.buildCalendar();
    },
    eventsData() {
    return this.$store.state.eventData;
  }
  },
  methods: {
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
      }if(dayNumber >= this.date.getDate() &&
        this.currentPage >= this.date.getMonth()){
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
    openAddEvent(dayNumber){
      this.modalWindowDetail = true;
      this.addEvent = true;
      bus.$emit('changeModalWindowDetail', this.modalWindowDetail);
      bus.$emit('addEvent', this.addEvent);
      bus.$emit('DayWhenAddEvent', dayNumber);
      bus.$emit('Year', this.year);
      bus.$emit('Month', this.currentPage);
    },
    openModalDetail(text){
      this.modalWindowDetail = true;
      this.getDetail = true;
      bus.$emit('changeModalWindowDetail', this.modalWindowDetail);
      bus.$emit('sendTextEvent', text);
      bus.$emit('getDetail', this.getDetail);
    },
    deleteEvent(eventText){
      let arrOfEvents = this.eventsData.events;
      for(let z = 0; z < arrOfEvents.length; z++){
        let memo = arrOfEvents[z].memo;
        if(eventText === memo){
          arrOfEvents.splice(z, 1)
          this.modalWindowDetail = false;
          bus.$emit('changeModalWindowDetail', this.modalWindowDetail);
        }
      }
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
  .event span{
    width: 100%;
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