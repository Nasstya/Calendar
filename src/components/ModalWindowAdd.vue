<template>
  <div class="underModalWindow">
      <div class="modalWindow">
        <img src="src/assets/x.png" width="20px" height="20px" @click="closeModalAdd">
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
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";  
import { bus } from './../main.js'
export default {
  data(){
    return{
      date: new Date(),
      inputInAddEvent: '',
      options: [
        { text: 'Встреча', value: '8' },
        { text: 'День Рождения', value: '4' },
        { text: 'Праздник', value: '1' },
        { text: 'Другое', value: '16' }
      ],
      selected: '',
      textOfError: false,
      dayWhenAddEvent: Number,
      year: Number,
      currentPage: Number
    }
  },
  computed: {
    eventsData() {
      return this.$store.state.eventData;
    }
  },
  methods: {
    addEvent(text){
      bus.$on('sendDayWhenAddEvent', data => {
        this.dayWhenAddEvent = data;
      });
      bus.$on('sendYear', data => {
        this.year = data
      });
      bus.$on('sendMonth', data => {
        this.currentPage = data
      });
      console.log(this.dayWhenAddEvent)
      console.log(this.year)
      console.log(this.currentPage)
      if(this.selected == '' || text == ''){
        this.textOfError = true;
      }else if(text != ''){
        this.modalWindowAdd = false;
        bus.$emit('changeModalWindowAdd', this.modalWindowAdd)
        let arrOfEvents = this.eventsData.events;
        let eventObj = {
          "id": Date.now(),
          "starts_at": new Date(this.year, this.currentPage, this.dayWhenAddEvent),
          "ends_at": new Date(this.year, this.currentPage, this.dayWhenAddEvent),
          "memo": text,
          "type": +this.selected
        };
        arrOfEvents.push(eventObj);
        console.log(arrOfEvents[9].ends_at) // дата добавления последнего события
        this.inputInAddEvent = '';
      }
    },
    closeModalAdd(){
      this.modalWindowAdd = false;
      bus.$emit('changeModalWindowAdd', this.modalWindowAdd)
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
    left: 40%;
    display: flex;
    flex-direction: column;
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
</style>