<template>
    <div class="but-button" 
        @click="onClick" 
        :class="['bgColor-' + this.bgColor, air, disabled === true ? 'disabled' : '']"
        :style="{height: height, width: width}"
        >
        <span><slot></slot></span>
    </div>
</template>

<script>
    import FlexBox from '../common/flexBox.vue';
    export default {
        name: 'upload-button',
        props: ['bgColor', 'disabled', 'height', 'width', 'air'],
        computed: {
        },
        data () {
            return {
            }
        },
        methods:{
            onClick(){
                if(this.disabled !== true){
                    this.$emit('click');
                }
            }
        },
        components: {
            FlexBox
        }
    };
</script>

<style lang="less" scoped>
    @import "../../assets/css/index";
    @import "../../assets/css/animation";
    .but-button{
        cursor:pointer;
        .size(180px,45px);
        background: #FFFFFF;
        color: #0A910D;
        display: inline-block;
        &:hover {
            .opacity(60);
        }
        span {
            width: 100%;
            height: 100%;
            .center();
        }
        &.bgColor-green{
            background: #7ED321;
            color: #FFF;
        }
        &.bgColor-red{
            background: #FF0000;
            color: #FFF;
            &.air {
                background: #FFF;
                color: #FF0000;
                border: 1px solid #FF0000;
            }
        }
        &.bgColor-yellow{
            background: #FFCC00;
            color: #FFF;
        }
        &.bgColor-gray{
            background: #515151;
            color: #FFF;
            &.air {
                background: #FFF;
                color: #515151;
                border: 1px solid #515151;
                &:hover {
                    background: #ececec;
                }
            }
        }
        &.bgColor-border{
            border: 1px solid #515151;
            color: #515151;
        }
        &.disabled {
            background: #CBCBCB !important;
            border: 1px solid #CBCBCB !important;
            color: #FFF !important;
        }
    }
</style>
