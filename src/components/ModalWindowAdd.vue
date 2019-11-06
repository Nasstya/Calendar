<template> 
  <div>
    <modal-window>
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
     <transition name="fade"><div v-if="textOfError" class="textOfError">Вы обязательно должны указать событие и тип события</div></transition>
      <button v-on:click="addEvent(inputInAddEvent)" class="modalWindow_button">Добавить событие</button>
    </modal-window>
  </div>
</template>

<script>
import { mapState } from "vuex";  
import { bus } from './../main.js'
import ModalWindow from './ModalWindow.vue'
export default {
  props: ['dataWhenAdd'],
  components: {
    ModalWindow
  },
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
      textOfError: false
    }
  },
  created(){
    console.log(this.dataWhenAdd)
  },
  computed: {
    eventsData() {
      return this.$store.state.eventData;
    }
  },
  methods: {
    addEvent(text){
      if(this.selected == '' || text == ''){
        this.textOfError = true;
      }else if(text != ''){
        this.modalWindowAdd = false;
        bus.$emit('changeModalWindowAdd', this.modalWindowAdd)
        let arrOfEvents = this.eventsData.events;
        let data = this.dataWhenAdd
        let eventObj = {
          "id": Date.now(),
          "starts_at": new Date(data.getFullYear(), data.getMonth(), data.getDate()),
          "ends_at": new Date(data.getFullYear(), data.getMonth(), data.getDate()),
          "memo": text,
          "type": +this.selected
        };
        arrOfEvents.push(eventObj);
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
  .modalWindow_button{
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