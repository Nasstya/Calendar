<template>
  <div>
    <div class="pagination">
        <div @click="prevPage" class="btn-left"><</div> 
        <p>{{ nameOfOneMonth }} {{ year }}</p>
        <div @click="nextPage" class="btn-right">></div> 
      </div>

        <div class="d_nameOfDays">
          <li v-for="day in nameOfDays" class="nameOfDays">{{ day }}</li>
        </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      currentPageForVUEX: 0,
      namesOfMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      nameOfOneMonth: '',
      nameOfDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      date: new Date(),
      yearForVUEX: '',
      nameOfClass: '',
    }
  },
  created(){
    this.yearForVUEX = this.date.getFullYear();
    this.currentPageForVUEX = this.date.getMonth();
    this.$store.commit('SET_YEAR', this.yearForVUEX);
    this.$store.commit('SET_CURRENTPAGE', this.currentPageForVUEX);
    this.nameOfOneMonth = this.namesOfMonths[this.currentPage];
  },
  computed: {
    year() {
      return this.$store.state.year;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
  },
  methods: {
    prevPage(){
      if (this.currentPage === 0) {
        this.$store.commit('currentPageTwelve');
        this.$store.commit('decrementYear');
        console.log('Месяц: ' + this.currentPage);
      console.log('Год: ' + this.year)
      }
      this.nameOfClass = 'prev';
      this.$store.commit('decrementPage');
      this.nameOfOneMonth = this.namesOfMonths[this.currentPage];
      this.$store.commit('changeNameClass', 'prev');
    },
    nextPage(){
      if (this.currentPage === 11) {
        this.$store.commit('currentPageMinusOne');
        this.$store.commit('incrementYear');
        console.log('Месяц: ' + this.currentPage);
      console.log('Год: ' + this.year)
      }
      this.nameOfClass = 'next';
      this.$store.commit('incrementPage');
      this.nameOfOneMonth = this.namesOfMonths[this.currentPage];
      this.$store.commit('changeNameClass', 'next');
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
  /*_______________________________*/
</style>