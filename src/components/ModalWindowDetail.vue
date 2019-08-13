<template>
	<div class="underModalWindow">
      <div class="modalWindow">
        <img src="src/assets/x.png" width="20px" height="20px" v-on:click="closeModal">
        <div class="nameofModal">Вся детальная информация о событии</div>
        <div v-for="(key, name) in eventDetail" class="detailEvent">{{ name }}: {{ key }}</div>
        <button v-on:click="closeModal">Окей</button>
        <!-- <button v-on:click="getText">Окейjhgf</button> -->
      </div>
    </div>
</template>

<script>
	import { eventBus } from './../main.js'
export default {
  props: ['eventText'],
  data(){
    return{
      options: [
        { text: 'Встреча', value: '8' },
        { text: 'День Рождения', value: '4' },
        { text: 'Праздник', value: '1' },
        { text: 'Другое', value: '16' }
      ],
      eventDetail: Object,
    }
  },
  computed: {
    eventsData() {
	  return this.$store.state.eventData;
	},
	modalWindowDetail() {
      return this.$store.state.modalWindowDetail;
    },
  },
  created: function(){
  	this.getDetailInformation();
  },
  methods: {
  	getDetailInformation(){
      let arrOfEvents = this.eventsData.events;
      for(let z = 0; z < arrOfEvents.length; z++){
        let memo = arrOfEvents[z].memo;
        if(memo == this.eventText){
          let dataStartOfEvent = arrOfEvents[z].starts_at;
          let getStartDataOfEvent = new Date(dataStartOfEvent);
          let dataEndOfEvent = arrOfEvents[z].ends_at;
          let getEndDataOfEvent = new Date(dataEndOfEvent);
          if((getStartDataOfEvent.getHours() - 3) > 0){
          	// this.$store.commit('changeModalWindowDetail', this.modalWindowDetail);
          	console.log('привет')
            this.eventDetail = {
              'Событие': this.eventText,
              'Начало события': getStartDataOfEvent.toLocaleTimeString(),
              'Конец события': getEndDataOfEvent.toLocaleTimeString(),
              'Тип события': this.getType(arrOfEvents[z].type)
            }
            console.log(this.eventDetail)
          }else if(getStartDataOfEvent.getDate() != getEndDataOfEvent.getDate()){
          	// this.$store.commit('changeModalWindowDetail', this.modalWindowDetail);
          	console.log('здрасте')

            this.eventDetail = {
              'Событие': this.eventText,
              'Начало события': getStartDataOfEvent.toLocaleDateString(),
              'Конец события': getEndDataOfEvent.toLocaleDateString(),
              'Тип События': this.getType(arrOfEvents[z].type)
            }
          }else{
          	this.$store.commit('changeModalWindowDetail', this.modalWindowDetail);
          }
        }
      }
      return this.eventDetail;
    },
    closeModal(){
    	this.$store.commit('changeModalWindowDetail', this.modalWindowDetail);
    },
    // getText(){
    // 	console.log(this.eventText)
    // },
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
    getText(){
    	console.log(this.eventText)
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
</style>