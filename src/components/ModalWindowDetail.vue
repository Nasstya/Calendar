<template>
  <modal-window>
    <div class="nameofModal">Вся детальная информация о событии</div>
    <div v-for="(key, name) in eventDetail" class="detailEvent">{{ name }}: {{ key }}</div>
    <button v-on:click="closeWindow" class="modalWindow_button">Окей</button>
  </modal-window>
</template>

<script>
import { bus } from './../main.js'
import ModalWindow from './ModalWindow.vue'
export default {
  props: ['eventText'],
  components: {
    ModalWindow
  },
  data(){
    return{
      options: [
        { text: 'Встреча', value: '8' },
        { text: 'День Рождения', value: '4' },
        { text: 'Праздник', value: '1' },
        { text: 'Другое', value: '16' }
      ],
      eventDetail: Object,
      modalWindowDetail: Boolean
    }
  },
  computed: {
    eventsData() {
      return this.$store.state.eventData;
    },
  },
  created(){
    bus.$emit('getDetailInformation', this.getDetailInformation())
  },
  methods: {
    getDetailInformation(){
      let arrOfEvents = this.eventsData.events;
      for(let z = 0; z < arrOfEvents.length; z++){
        let memo = arrOfEvents[z].memo;
        // console.log(this.memo)
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
    }
  }
};
</script>

<style>
  .modalWindow_button{
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
</style>