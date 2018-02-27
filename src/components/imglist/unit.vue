<template>
    <div class="img-unit">
        <flex-box class="flexbox" :justify="justifyClass" wrap="wrap">
                <div
                    class="img-box" :style="{'margin-right': ((index + 1) % 7 === 0)? 0: '26px'}"
                    v-for="(item, index) in list"
                    :key="item.name"
                >
                    <div class="img-box-img">
                        <div class="img-none" v-if="!item.classiferResult.image_url">此张图片未识别，请确认地址是否正确。</div>
                        <div class="img-show" v-else>
                            <img class="updoad-img" :src="item.classiferResult.image_url" @error="errorHandler">
                        </div>
                        <div class="img-wrap" v-if="!item.isLoaded"></div>
                        <div class="img-type" :class="{'red': item.classiferResult.label==3,
                                                        'orange': item.classiferResult.label==2,
                                                        'green': item.classiferResult.label==1,
                                                        'illegal': item.classiferResult.label==4,
                                                        'violation': item.classiferResult.label==5,
                                                        'gather': item.classiferResult.label==6}">
                            {{item.classiferResult|toType}}
                        </div>
                        <div class="img-close" @click="onDelete(item)"></div>
                    </div>
                </div>
                <div class="img-box" v-if="!desc">
                    <upload class="img-box-upload" :isDrag="true" @getfile="onGetFile" @resError="resError"></upload>
                </div>
            
        </flex-box>
    </div>
</template>

<style lang="less" scoped>
    @import "../../assets/css/index";
    @import "../../assets/css/mixin";
    .img-unit{
        border-radius: 3px;
        .label-desc{
            font-size: 20px;
            color: #2B4342;
            margin: 25px 0 0 25px;
            text-align: left;
        }
        .img-box{
            .size(148px, 148px);
            margin-bottom: 26px;
            .img-box-img {
                width: 100%;
                height: 100%;
                border: 1px solid #DDDDDD;
                position: relative;

                .img-show {
                    width: 100%;
                    height: 100%;
                    .center();
                    overflow: hidden;
                    
                    .updoad-img {
                        width: 100%;
                    }
                }
            }
            .img-none{
                position: absolute;
                transform: translate(0,-50%);
                top: 50%;
                color: #444;
            }
            .img-wrap{
                .size(100%,100%);
                background:rgba(0,0,0,0.30) url("../../assets/img/loading.gif") no-repeat center ;
                background-size: 25px 25px;
                position: absolute;
                top: 0;
                left: 0;
            }
            .img-type{
                position: absolute;
                top: 0;
                right: 0;
                min-width: 80px;
                height: 24px;
                line-height: 24px;
                padding: 0 10px;
                color:#fff;
                text-shadow: 1px 1px 3px #000;
                &.green{
                    background: #1EC773;
                }
                &.red{
                    background: #FF0000;
                }
                &.orange{
                    background: #FF9000;
                }
                &.illegal {
                    background: #ffa500;
                }
                &.violation {
                    background: #f4d100;
                }
                &.gather {
                    background: #f9f91a;
                }
            }
            &:hover{
                .img-close{
                    display: block;
                }
            }
            .img-close{
                position: absolute;
                cursor: pointer;
                top: 0px;
                left: 0px;
                background-size: 44px 44px;
                display: none;
                border: 20px solid rgba(0, 0, 0, 0.65);
                border-bottom-color: transparent;
                border-right-color: transparent;
                
                &::before {
                    position: absolute;
                    content: '+';
                    top: -26px;
                    left: -15px;
                    transform: rotateZ(45deg);
                    font-size: 23px;
                    color: #fff;
                }
            }
        }
    }

</style>
<script>
    import FlexBox from '../common/flexBox.vue';
    import Upload from '../upload/default.vue';
    /*
        暴恐违规场景:
            1:正常
            2:暴恐
            3:血腥
            4:违法
            5:违规
            6:聚集
    */
    export default {
        name: "imgunit",
        props: ['list', 'desc'],
        computed: {
            isList(){
                return this.list.length == 0;
            },
            justifyClass(){
                if(this.isList){
                    return "center";
                }else{
                    return "left";
                }
            }
        },
        data () {
            return {
                colorYellow: ['#319cf1', '#67f167', '#f9f91a', '#ec5050'],
                colorTerror: ['#319cf1', '#67f167', '#ec5050', '#800080', '#ffa500', '#f4d100', '#f9f91a'],
                colorSensitive: ['#319cf1', '#67f167', '#ec5050', '#cccccc']
            };
        },
        filters:{
            toType(value){
                let label = value.label_desc || "";
                let rate = parseInt(value.rate * 10000)/100 || "";
                return label + ' ' + rate;
            }
        },
        methods:{
            onDelete(item){
                this.$emit('ondelete', item);
            },
            onGetFile(item, file){
                this.$emit('getfile', item, file);
            },
            resError(num){
                this.$emit('resError', num);
            },
            errorHandler(e) {
                let target = e.target;
                let src = target.src;
                if (src.indexOf('?') > -1) {
                    src = src + '&t=' + Date.now();
                } else {
                    src = src + '?t=' + Date.now();
                }
                if (!target.retry) {
                    target.src = src;
                    target.retry = 1;
                }
            }
        },
        components: {
            FlexBox,
            Upload
        }
    };
</script>

