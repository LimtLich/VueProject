<template>
<div>
  <img class='home-bac-img' src='/static/Images/IceCode.jpg' />
  <div class="home-shadow"></div>
  <div class="home-topic">
    <p>Ming's Live View</p>
    <p>{{DateObj.Year}}</p>
    <p>{{DateObj.Month}}</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      DateObj: {
        Year: 2017,
        Month: 'June',
        MonthTrans: [{
          data: 0,
          name: 'January '
        }, {
          data: 1,
          name: 'February '
        }, {
          data: 2,
          name: 'March '
        }, {
          data: 3,
          name: 'April '
        }, {
          data: 4,
          name: 'May  '
        }, {
          data: 5,
          name: 'June  '
        }, {
          data: 6,
          name: 'July '
        }, {
          data: 7,
          name: 'August  '
        }, {
          data: 8,
          name: 'September  '
        }, {
          data: 9,
          name: 'October  '
        }, {
          data: 10,
          name: 'November '
        }, {
          data: 11,
          name: 'December '
        }]
      },
    }
  },
  methods: {

  },
  created() {
    this.DateObj.Year = new Date().getFullYear()
    this.DateObj.Month = this.DateObj.MonthTrans.filter(e => e.data == new Date().getMonth())[0].name
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
  margin: 0;
  padding: 0;
}

.home-bac-img {
  position: fixed;
  left: 0;
}

.home-shadow {
  width: 100%;
  height: 100%;
  background: #000;
  position: absolute;
  opacity: 0.3;
  /*background:-webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#000))*/
}

.home-topic {
  position: absolute;
  top: 5%;
  left: 5%;
  font-weight: bold;
  font-style: italic;
  text-align: left;
}

.home-topic p {
  margin-top: 20px;
  font-size: 35px;
}

.home-topic p:nth-child(1) {
  font-size: 12px;
  color: #fff;
}

.home-topic p:nth-child(2) {
  color: #000;
}

.home-topic p:nth-child(3) {
  color: #fff;
  padding-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
</style>
