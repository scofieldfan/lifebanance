<template>
  <div class="menu">
      <div class="menu-item">
         <div class="title">基金</div>
      <ul class="body">
         <li> <a href="//www.baidu.com">晨星基金</a> </li>
         <li> <a href="//www.baidu.com">天天基金</a> </li>
         <li> <a href="//www.baidu.com">支付宝</a> </li>
      </ul>
      </div>
      <div class="menu-item"></div>
      <div class="menu-item"></div>
      <div class="menu-item"></div>
      <div class="menu-item"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  box-sizing: border-box;
}
.menu {
  margin-top: 80px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  // background-color: #eee;
  .menu-item {
    flex: 0 1 22%;
    margin: 5px 1.5%;
    height: 300px;
    padding: 10px;
    transition: box-shadow 0.3s;
    background-color: #fff;
    .title {
      text-align: center;
    }
    .body {
      list-style: none;
      color: #00f;
    }
  }
  .menu-item:hover {
    box-shadow: 0 0 18px 0px rgba(50, 50, 50, 0.5);
  }
}
</style>
