<template>
    <div class="experience-app" id="experience-box">
        <div class="app-title">
             <div>产品体验</div>
            <div class="border"></div>
        </div>
        <div class="but-box">
            <upload class="but-upload" :isDrag="false" @getfile="onGetFile" @resError="resError"></upload>
            <!-- <hawk-button class="but-upload-random" @click="setFile">+随机添加图片</hawk-button> -->
        </div>
        <div class="imglist" v-if="!isType">
            <unit :list="imgs" @ondelete="onDelete" @getfile="onGetFile"  @resError="resError"></unit>
            <flex-box class="upload-ti" justify="center" v-if="imgs.length==0">将图片拖至此处开始鉴别</flex-box>
            <flex-box justify="center" class="upload-con">
                可同时上传多个以下格式的文件：.png, .jpg, .jpeg, .bmp, .webp。(.webp 只支持静态图片，部分浏览器无法正常显示)
            </flex-box>
        </div>

        <div class="imglist" v-else>
            <unit v-if="pornList.length > 0" :list="pornList" @ondelete="onDelete" desc="type"></unit>
            <unit v-if="vulgarList.length > 0" :list="vulgarList" @ondelete="onDelete" desc="type"></unit>
            <unit v-if="normalList.length > 0" :list="normalList" @ondelete="onDelete" desc="type"></unit>
            <flex-box justify="center" class="upload-con">
                可同时上传多个以下格式的文件：.png, .jpg, .jpeg, .bmp, .webp。(.webp 只支持静态图片，部分浏览器无法正常显示)
            </flex-box>
        </div>

        <flex-box justify="center" class="foot-but">
            <hawk-button class="foot-but-left" @click="onType" bgColor="gray">分类展示</hawk-button>
            <hawk-button class="foot-but-right" @click="onClear" bgColor="border">清空</hawk-button>
        </flex-box>
    </div>
</template>
<style lang="less">
    @import "../../assets/css/mixin";
    .experience-app {
        width: 100%;
        padding-bottom: 25px;
        .app-title {
            padding: 66px 0 0;
            font-size: 32px;
            color: #515151;
            .center();
            .flexbox(column);
            .border {
                height: 2px;
                margin-top: 10px;
                background: #C6000D;
                width: 65px;
            }
        }
        .but-box{
            margin-top: 60px;
            display:flex;
            .but-upload{
                .flex(1);
            }
            .but-upload-random {
                margin-left:16px;
            }
        }
        font-size: 14px;
        color: #999999;
        .imglist{
            border-radius: 3px;
            padding: 60px 0px 24px;
            text-align: center;
            .upload-ti{
                margin:11px 0 24px;
            }
        }
        .foot-but{
            margin: 22px 0;
            .foot-but-left {
                margin-right:28px;
            }
        }
    }
</style>
<script>
import { mapActions, mapMutations } from 'vuex';
import Upload from '../../components/upload/default.vue';
import FlexBox from '../../components/common/flexBox.vue';
import HawkButton from '../../components/button/default.vue';
import Unit from '../../components/imglist/unit.vue';

export default{
    props: {
        storeType: {
            stype: String,
            default: 'porn'
        }
    },
    data () {
        return {
            isType: false,
            maxFileNum: 70
        };
    },
    computed: {
        imgs() {
            return this.$store.state.picture[this.storeType].imgs; 
        },
        pornList(){
            return this.imgs.filter(item=>{
                return item.classiferResult.label == 3;
            });
        },
        vulgarList(){
            return this.imgs.filter(item=>{
                return item.classiferResult.label == 2;
            });
        },
        normalList(){
            return this.imgs.filter(item=>{
                return item.classiferResult.label == 1;
            });
        }
    },
    mounted () {
    },
    methods:{
        ...mapMutations({
            deleteImg: "picture/deleteImg",
            clearImg: "picture/clearImg",
            setToastState: "setToastState"
        }),
        ...mapActions({
            uploadClassiferPorn: "picture/uploadClassiferPorn",
            classifierPorn:"picture/classifierPorn",
            getSample:"picture/getSample"
            
        }),
        setFile(){
            this.getSample({ type: this.storeType });
        },
        onGetFile(item, file){
            let t = this;
            if (this.imgs.length >= this.maxFileNum) {
                this.setToastState('上传数量超过' + this.maxFileNum + '张请清空后，重新上传。');
                return false;
            }
            if(file){
                t.uploadClassiferPorn({ type: this.storeType, base64Img:item, file:file})
                .catch((error)=>{
                    const msg = error && error.toString().replace('Error:', '');
                    t.setToastState(msg);
                });
            }else{
                t.classifierPorn({ type: this.storeType, imgUrl: item})
                .catch((error)=>{
                    t.setToastState(error);
                });
            }
        },
        onDelete(item){
            this.deleteImg({ type: this.storeType, img:item });
        },
        onType () {
            if(this.imgs.length==0){
                this.isType = false;
            }else{
                this.isType = !this.isType;
            }
        },
        onClear(){
            this.clearImg({ type: this.storeType});
            this.isType = false;
        },

        resError(num){
            this.setToastState('您有'+num+"个非图片文件未能识别!");
        }
    },
    components: {
        Upload,
        HawkButton,
        Unit,
        FlexBox
    }
};
</script>
