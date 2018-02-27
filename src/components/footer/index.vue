<template>
    <div class="footer">
        <!-- <Titlebar :fontcolor="'#fff'">联系我们</Titlebar>
        <FlexBox class="info">
            <div><i class="ico-qq"></i>12345678910</div>
            <div class="info-item"><i  class="ico-email"></i>jinshanyun@kingsoft.com</div>
            <div><i class="ico-phone"></i>400-3453-6666</div>
        </FlexBox> -->
        <FlexBox class="bottom">
            Copyright © 2017 北京金山云信息科技有限公司   地址：北京市海淀区小营西路33号金山软件大厦  京ICP备466464027号
        </FlexBox>
    </div>
</template>

<style lang="less" scoped>
    @import '../../assets/css/mixin';
    .footer {
        background: #2D2D2D;
        // padding-top: 51px;
        margin-top: 250px;
        width: 100%;
        .info {
            margin-top: 67px;
            margin-bottom: 93px;
            font-size: 18px;
            color: #DBDBDB;
            letter-spacing: 0.77px;
            .info-item {
                margin: 0 147px;
            }
            i{
                display: inline-block;
                width: 23px;
                height: 23px;
                vertical-align: text-top;
                margin-right: 10px;
            }
            .ico-qq {
                background: url('../../assets/img/qq.png') no-repeat center;
                background-size: 100%;
            }
            .ico-phone {
                background: url('../../assets/img/phone.png') no-repeat center;
                background-size: 100%;
            }
            .ico-email {
                background: url('../../assets/img/email.png') no-repeat center;
                background-size: 100%;
            }
        }
        .bottom {
            background: #1E1E1E;
            height: 45px;
            font-size: 12px;
            color: #FDFDFD;
        }
    }
</style>

<script>
    import FlexBox from '../common/flexBox.vue';
    import Titlebar from '../layout/Titlebar.vue';
    export default {
        name: 'aifooter',
        data() {
            return {
            }
        },
        mounted(){ },
        methods: { },
        components: {
            FlexBox,
            Titlebar
        }
    }
</script>


