<template>
  <div class="underModalWindow">
      <div class="modalWindow">
        <img src="src/assets/x.png" width="20px" height="20px" v-on:click="closeWindow">

        <slot v-if='getDetails'>
          <div class="nameofModal">Вся детальная информация о событии</div>
          <div v-for="(key, name) in eventDetail" class="detailEvent">{{ name }}: {{ key }}</div>
          <button v-on:click="closeWindow">Окей</button>
        </slot>

        <slot v-if='addEventToLists'>
          <div class="modalWindow_order">Укажите событие которое хотите добавить на выбраную вами дату.</div>
          <div class="modalWindow-input_select">
            <input type="text" placeholder="Место для вашего события" v-model="inputInAddEvent">
            <div>
              <select v-model="selected">
                <option disabled value="">Тип события</option>
                <option v-for="option in options" v-bind:value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
          <div v-if="textOfError" class="textOfError">Вы обязательно должны указать событие и тип события</div>
          <button v-on:click="addEvent(inputInAddEvent)">Добавить событие</button>
        </slot>

      </div>
    </div>
</template>

<script>
import { bus } from './../main.js'
export default {
  props: ['eventText', 'dayWhenAddEvent', 'year', 'currentPage', 'getDetail', 'addEventToList'],
  data(){
    return{
      options: [
        { text: 'Встреча', value: '8' },
        { text: 'День Рождения', value: '4' },
        { text: 'Праздник', value: '1' },
        { text: 'Другое', value: '16' }
      ],
      eventDetail: Object,
      modalWindowDetail: Boolean,
      date: new Date(),
      inputInAddEvent: '',
      selected: '',
      textOfError: false,
      addEventToLists: this.addEventToList,
      getDetails: this.getDetail
    }
  },
  computed: {
    eventsData() {
      return this.$store.state.eventData;
    },
  },
  created(){
    bus.$emit('getDetailInformation', this.getDetailInformation())
    console.log(this.addEventToLists)
    console.log(this.getDetails)
  },
  methods: {
    getDetailInformation(){
      let arrOfEvents = this.eventsData.events;
      for(let z = 0; z < arrOfEvents.length; z++){
        let memo = arrOfEvents[z].memo;
        if(memo === this.eventText){
          let dataStartOfEvent = arrOfEvents[z].starts_at;
          let getStartDataOfEvent = new Date(dataStartOfEvent);
          let dataEndOfEvent = arrOfEvents[z].ends_at;
          let getEndDataOfEvent = new Date(dataEndOfEvent);
          if((getStartDataOfEvent.getHours() - 3) > 0){
            this.eventDetail = {
              'Событие': this.eventText,
              'Начало события': getStartDataOfEvent.toLocaleTimeString(),
              'Конец события': getEndDataOfEvent.toLocaleTimeString(),
              'Тип события': this.getType(arrOfEvents[z].type)
            }
          }else if(getStartDataOfEvent.getDate() != getEndDataOfEvent.getDate()){
            this.eventDetail = {
              'Событие': this.eventText,
              'Начало события': getStartDataOfEvent.toLocaleDateString(),
              'Конец события': getEndDataOfEvent.toLocaleDateString(),
              'Тип События': this.getType(arrOfEvents[z].type)
            }
          }else{
            this.modalWindowDetail = false;
            bus.$emit('changeModalWindowDetail', this.modalWindowDetail)
          }
        }
      }
    },
    getType(numberOfType){
      let optionsInFunc = this.options;
      for(let n = 0; n < optionsInFunc.length; n++){
        if(numberOfType === +optionsInFunc[n].value){
          return optionsInFunc[n].text;
        }else if(numberOfType === 18){
          return optionsInFunc[3].text;
        }
      }
    },
    closeWindow(){
      this.modalWindowDetail = false;
      bus.$emit('changeModalWindowDetail', this.modalWindowDetail)
    },
    addEvent(text){
      // console.log(this.addEventToLists)
      if(this.selected == '' || text == ''){
        this.textOfError = true;
      }else if(text != ''){
        this.modalWindowDetail = false;
        bus.$emit('changeModalWindowDetail', this.modalWindowDetail)
        let arrOfEvents = this.eventsData.events;
        let eventObj = {
          "id": Date.now(),
          "starts_at": new Date(this.year, this.currentPage, this.dayWhenAddEvent),
          "ends_at": new Date(this.year, this.currentPage, this.dayWhenAddEvent),
          "memo": text,
          "type": +this.selected
        };
        arrOfEvents.push(eventObj);
        this.inputInAddEvent = '';
      }
    }
  }
};
</script>

<style>
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
  .nameofModal{
    margin: 15px auto 10px auto;
  }
  .detailEvent{
    margin: 0px auto 3px 10px;
  }
  .modalWindow_order{
    font-size: 15px;
    text-align: center;
    margin: 25px 10px 20px 0px;
  }
  .textOfError{
    color: red;
    font-size: 10px;
    margin: -10px auto 10px auto;
  }
  .errorWindow{
    display: flex;
  }
</style>