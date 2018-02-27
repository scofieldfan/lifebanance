<template>
    <section class="titlebar">
        <h2 :style="{color: fontcolor}"><slot></slot></h2>
        <div class="border"></div>
    </section>
</template>

<style lang="less" scoped>
@import "../../assets/css/index";
.titlebar {
    .flexbox();
    .center();
    .flexdirection(column);
    h2 {
        margin-bottom: 0;
        font-size: 32px;
        color: #515151;
    }
    .border {
        width: 62px;
        height: 2px;
        margin-top: 10px;
        background-color: #C6000D;
    }
}
</style>

<script>
export default {
    props: {
        fontcolor: {
            type: String,
            default: '#515151'
        }
    }
};
</script>
