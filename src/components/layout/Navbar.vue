<template>
  <section class="app-navbar animated slideInDown">
    <nprogress></nprogress>        
    <slot></slot>
  </section>
</template>

<style lang="less" scoped>
@import "../../assets/css/index";
.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: @maxZindex;
  background: @colorHead;
  height: @navbarHeight;

  .flexbox();
  .flexjustify(space-between);
}
@media screen and (max-width: @mobileWidth) {
  .app-navbar {
    position: relative;
  }
}
</style>

<script>
import Nprogress from './Nprogress';
export default {
    components: {
        Nprogress
    }
};
</script>
