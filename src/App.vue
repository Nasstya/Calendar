<template>
  <div>
    <div></div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      x: [],
    }
  },
  mounted(){
    function getLastDayOfMonth(year, month) {
      var date = new Date(year, month + 1, 0);
      return date.getDate();
    }
    for (var i = 0; i < 12; i++){
      this.x.push(i);
      this.x[i] = [];
      for ( var j = 1; j <= getLastDayOfMonth(2019, i); j++){
        this.x[i].push(j);
      }
      document.write(this.x[i] + '<br />');
    }
  }
};
</script>

