<template>
    <div class="dialog" @click.stop="onClose">

        <div class="dialog-box" @click.stop>

            <div class="dialog-title">
                {{title}}
                <i class="dialog-close el-icon-close"  @click.stop="onClose"></i>
            </div>
            <div class="dialog-content">
                <slot></slot>
            </div>
            <flex-box class="dialog-foot" v-if="isConfirm">
                <div class="foot-but" @click.stop="onDefine">确认</div>
                <div class="foot-but" @click.stop="onClose">取消</div>
            </flex-box>
        </div>

    </div>
</template>

<script>
    export default {
        name: "dialog",
        props: {
            'isConfirm':{
                type: Boolean,
                default: true
            },
            'title': {
                type: String,
                default: function () {
                    return "确认信息";
                }
            }
        },
        computed: {
            
        },
        data () {
            return {
            };
        },
        methods:{
            onClose () {
                this.$emit('close', false);
            },
            onDefine () {
                this.$emit('define');
            }
        },
        components: {
        }
    };
</script>

<style lang="less" scoped>
    @import "../../assets/css/index";
    .dialog{
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: fixed;
        overflow: auto;
        margin: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1999;
        color: #5E6460;

        .dialog-box{
            position: absolute;
            width: 720px;
            left: 50%;
            top: 15%;
            transform: translateX(-50%);
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            .dialog-title{
                .size(100%,54px);
                .center();
                border-bottom: 1px solid #ECECEC;
                .dialog-close{
                    position: absolute;
                    .size(20px,20px);
                    background: url('../../assets/img/monitor/close.png') no-repeat center 0px 0px;
                    background-size: 100%;
                    top: 14px;
                    right: 18px;
                    cursor:pointer;
                }
            }
            .dialog-content{
                padding: 30px;
                overflow-y: auto;
                max-height: 100%;
            }
            .dialog-foot{
                height: 54px;
                width: 100%;
                border-top: 1px solid #ECECEC;
                background: #fff;
                .foot-but{
                    flex: 1;
                    .center();
                    height: 100%;
                    font-size: 14px;
                    color: #1EC773;
                    &:last-child{
                        border-left: 1px solid #ECECEC;
                    }
                    &:hover{
                        cursor:pointer;
                        background: #ddd;
                    }
                }
            }
        }
    }

</style>
