<template>
  <div class="underModalWindow">
      <div class="modalWindow">
        <img src="src/assets/x.png" width="20px" height="20px" @click="closeModalAdd">
        <slot></slot>
      </div>
    </div>
</template>

<script>
import { bus } from './../main.js'
export default {
  data(){
    return{ 
      modalWindowAdd: Boolean,
      modalWindowDetail: Boolean
    }
  },
  methods: {
    closeModalAdd(){
      this.modalWindowAdd = false;
      this.modalWindowDetail = false;
      bus.$emit('changeModalWindowAdd', this.modalWindowAdd)
      bus.$emit('changeModalWindowDetail', this.modalWindowDetail)
    }
  }
};
</script>

<style>
  .underModalWindow{
    width: 100%;
    height: 720px;
    background: rgba(0,0,0, 0.5);
    position: absolute;
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
</style>