/**
 * Created by mac on 2016/12/8.
 */
<template>
  <h2 class="htitle">
      {{title}}
  </h2>
</template>

<script>
export default {
    name: 'flexBox',
    props: {
        title: {
            type: String
        }
    }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/index";
.htitle{
    font-size: 24px;
    padding: 0 10px;
    position: relative;
    color: @colorHead;
    line-height: 1;
    margin-bottom: 24px;
    margin-top: 60px;
    &:before{
        content: "";
        position: absolute;
        background: @colorLink;
        top:0;
        left:0;
        height: 24px;
        width: 2px;
    }
    &:first-child{
        margin-top: 0;
    }
}
@media screen and (max-width: @mobileWidth) {
    .htitle {
        font-size: 32px;
        margin-top: 40px;
    }
}
</style>
