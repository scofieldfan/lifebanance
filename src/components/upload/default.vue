<template>
    <div class="upload"
        @dragenter.prevent="upDragenter" 
        @dragover.prevent="upDragover" 
        @drop.prevent="upDrop" 
        @dragleave.prevent="upDragleave" 
        :class="{'dragenter':states==1}">
        <div class="upload-add" v-if="isDrag" @click="onUpload">
            +
        </div>
        <flex-box v-else class="flexbox upload-box">
            <flex-box class="upload-con">
                <input type="text" name="" v-model="url" placeholder="请输入图片URL">
            </flex-box>

            <flex-box class="upload-but" @click.native="onUpload">
                <span>+添加图片</span>
            </flex-box>
        </flex-box>
        <input class="upload-file" type="file" @change="onStorage" ref="fileupload"  multiple="multiple" >
        
    </div>
</template>

<script>
    import FlexBox from '../common/flexBox.vue';
    export default {
        name: "upload",
        props: ['isDrag'],
        computed: {
            
        },
        data () {
            return {
                //拖拽样式
                states:0,
                url:""
            };
        },
        methods:{
            onUpload(){
                if(this.url){
                    this.getFile(this.url);
                    this.url = "";
                }else{
                    this.$refs.fileupload.click();
                    console.log('onUpload');
                }
            },
            onStorage(){
                let files=this.$refs.fileupload.files;
                this.setFileReader(files);
                this.$refs.fileupload.value = "";
            },

            upDragenter(){
                console.log('upDragenter');
                this.states = 1;
            },

            upDragover(){
                this.states = 1;
            },

            upDragleave(){
                this.states = 0;
            },
            
            upDrop(item){
                this.states = 0;
                let files = item.dataTransfer.files;  
                this.setFileReader(files);
                console.log(files);
            },
            //加载图片
            setFileReader(files){
                let t = this;
                let num = 0;
                for(let item of files){
                    if(/\.(gif|jpg|jpeg|png|bmp|webp|GIF|JPG|PNG|BMP|WEBP)$/.test(item.name)){
                        var reader = new FileReader();
                        reader.readAsDataURL(item);

                        ((reader,file)=>{
                            reader.addEventListener("load", (e) => {
                                //t.getFile(reader.result, file);
                                t.toBase64(reader.result, file);
                            }, false);
                        })(reader,item);

                    }else{
                        num ++;
                    }
                }
                if (num > 0) {
                    t.resError(num);
                }
            },

            getFile(item, file){
                console.log(file);
                this.$emit('getfile', item, file);
            },

            //Response
            resError(num){
                this.$emit('resError', num);
            },

            //压缩
            toBase64(url, agofile){
                let t = this;
                let fileType = agofile.type;
                let Cnv = document.createElement('canvas');
                let Cntx = Cnv.getContext('2d');//获取2d编辑容器
                let agoimg = new Image();
                agoimg.src = url;

                agoimg.onload = function(){ 
        
                    Cnv.width = 240 * agoimg.width / agoimg.height;
                    Cntx.drawImage(agoimg, 0, 0, Cnv.width, Cnv.height);

                    let Pic = Pic = Cnv.toDataURL(fileType);
                    let file = {};
                    if (agofile.sizev > 1048576) {
                        try 
                        { 
                            file = t.toFile(Pic, fileType);
                        } 
                        catch (e) 
                        {
                            file = agofile;
                        }
                    } else {
                        file = agofile;
                    }
                    //提交压缩后 文件
                    t.getFile(Pic, file);
                }
            },
            /**
             * 转换blob 
             * filetype：文件类型
             * data：
            **/
            toFile(baseData,fileType){
                var bytes=atob(baseData.split(',')[1]);
                //处理异常,将ascii码小于0的转换为大于0  
                var ab = new ArrayBuffer(bytes.length);  
                var ia = new Uint8Array(ab);  
                for (var i = 0; i < bytes.length; i++) {  
                    ia[i] = bytes.charCodeAt(i);  
                }
                return new Blob( [ab] , {type : fileType});  
            },

            

        },
        components: {
            FlexBox
        }
    };
</script>

<style lang="less" scoped>
    @import "../../assets/css/mixin";
    @import "../../assets/css/animation";
                
    .upload{
        &.dragenter{
            border: 2px dashed #777;
        }
        display: inline-block;
        .upload-file{
            display: none;
        }
        .upload-add{
            .center();
            width: 148px;
            height: 148px;
            background: #EEEEEE;
            border: 1px solid #DDDDDD;
            color:#fff;
            border-radius: 2px;
            font-size: 5em;
            cursor: pointer;
            position: relative;
            &:hover {
                .opacity(80);
            }
        }

        .upload-box{
            background: #FFFFFF;
            border-radius: 3px;
            .upload-con{
                .flex(1);
                padding: 24px 0 21px 26px;
                background: #F9F9F9;
                border: 1px solid #CBCBCB;
                input{
                    width: 100%;
                    border: none;
                }
            }
            .upload-but{
                height: 60px;
                width: 180px;
                background: #C6000D;
                font-size: 16px;
                color: #FFFFFF;
                cursor:pointer;
                position: relative;
                span{
                    text-align: center;
                    width: 100%;
                }
                &:hover {
                    .opacity(60);
                }
            }
        }
    }
</style>
