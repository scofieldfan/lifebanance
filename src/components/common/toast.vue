<template>
<div class="toast" __vuec__  :class="{hide: !state.isShow}">
    <span class="text">
        {{state.text}}
    </span>
</div>
</template>
<style lang="less" scoped>
@import "../../assets/css/index";
.toast[__vuec__]{
    left: 0;
    right: 0;
    text-align: center;
    -webkit-transition: opacity .3s ease;
    top: 55%;
    z-index: 100000;
    pointer-events: none;
    position: fixed;
    margin: auto;
    .text{
        background: rgba(0,0,0, .6);
        font-size: 14px;
        color: #fff;
        padding: 7px 25px 8px;
        border-radius: 2px;
        display: inline-block;
    }
    &.toast.hide{
        opacity: 0;
    }
}
 @media screen and (max-width: @mobileWidth) {
    .toast[__vuec__]{
        .text{
            font-size: 28px;
        }
    }
 }
</style>
<script>
    export default{
        name: "toast",
        props: [
            'state'
        ],
        data(){
            return{
            }
        },

        watch:{
            "state.isShow": function(){
                var t = this;
                if(this.state.isShow){
                    setTimeout(()=>{
                      //t.state.isShow = false;
                      this.$emit('setShow', false);
                    }, t.state.duration||1500);
                }
            }
        },

        mounted() {

        },

        methods:{

        }
    }
</script>
