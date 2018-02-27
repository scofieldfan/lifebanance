<template>
    <div class="layout">
        <div class="nav-left"> </div>
        <div class="main"> </div>
    </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.layout {
  height: 500px;
  background: #eee;
  position: relative;
  .nav-left {
    position: absolute;
    width: 100px;
    height: 100%;
    background: #f00;
  }
  .main {
    height: 100%;
    margin-left: 100px;
    background: #00f;
  }
}
</style>
