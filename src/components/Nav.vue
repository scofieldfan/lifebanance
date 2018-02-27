<template>
    <nav class="nav-bar">
      nav bar...
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {};
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nav-bar {
    position: fixed;
    padding-left: 80px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    width: 100%;
    top: 0;
    margin-bottom: 50px;
}
</style>
