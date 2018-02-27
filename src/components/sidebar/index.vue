<template>
    <div class="sidebar" id="sidebar">
        <div class="sidebar-container" >  
            <a href="./techapi" class="title" id="techapi">{{techapi.title}}</a>
            <div class="section" v-for="(item,index) in techapi.section" :class="{'selected-section': info.id === item.id }"  @click="toPositon(techapi.name,item.id)">
                {{item.name}}
                <span :class="{'selected-icon': info.id === item.id }"></span>
            </div>
            <a href="./document" class="title" id="business">{{business.title}}</a>
            <div class="section" v-for="(item,index) in business.section" :class="{'selected-section': info.id === item.id }"  @click="toPositon(business.name,item.id)">
                {{item.name}}
                <span :class="{'selected-icon': info.id === item.id }"></span>
            </div>
        </div>    
    </div>
</template>

<style lang="less">
    @import '../../assets/css/index';
    .sidebar {
        position: absolute;
        top: 100px;
        bottom: 0;
        left: 0;
        width: 250px;
        background-color: #F8F8F8;
        .sidebar-container {
            position: absolute;
            right: 0;
            bottom: 0;
            top: 0;
            width: 130px;
            overflow: auto;
            &::-webkit-scrollbar {
                display: none;
            }
            .title {
                display: block;
                padding: 36px 0 15px;
                font-size: 18px;
                color: #515151;
            }
            .section {
                position: relative;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                color: #212121;
                cursor: pointer;
                &.selected-section {
                    color: #C6000D;
                }
                .selected-icon {
                    position: absolute;
                    top: 50%;
                    right: 15px;
                    width: 5px;
                    height: 8px;
                    .transform(translateY(-50%));
                    background: url(../../assets/img/home/arrow-selected.png) no-repeat center;
                    background-size: cover;      
                }
            }
        }
    }
</style>
<script>
const TWEEN = require('@tweenjs/tween.js');
    function animate () {
        requestAnimationFrame(animate);
        TWEEN.update();
    }
    export default {
        name: 'sidebar',
        props: ['info'],
        data () {
            return {
                business: {
                    title: '业务文档',
                    name: 'document',
                    section: [
                        {
                            name: '鉴黄识别',
                            id: 'porn'
                        },
                        {
                            name: '暴恐违规识别',
                            id: 'terrorism'
                        },
                        {
                            name: '敏感人物识别',
                            id: 'sensitive'
                        },
                        {
                            name: '直播实时监控',
                            id: 'monitor'
                        },
                        {
                            name: '反垃圾广告',
                            id: 'antiSpamAdvertising'
                        },
                        {
                            name: '人脸识别',
                            id: 'faceRecognition'
                        },
                        {
                            name: '自然场景识别',
                            id: 'naturalSceneRecognition'
                        },
                        {
                            name: '图像美化',
                            id: 'imageBeautification'
                        },
                        {
                            name: '图像搜索',
                            id: 'imageSearch'
                        },
                        {
                            name: '证件识别',
                            id: 'documentRecognition'
                        },
                        {
                            name: '手势识别',
                            id: 'gestureRecognition'
                        },
                        {
                            name: '深度定制',
                            id: 'deepCustomization'
                        }
                    ]
                },
                techapi: {
                    title: '技术文档',
                    name: 'techapi',
                    section:[
                        {
                            name: '调用方式',
                            id: 'instruction'
                        },
                        {
                            name: '鉴黄识别',
                            id: 'pornApi'
                        },
                        {
                            name: '暴恐违规识别',
                            id: 'terrorismApi'
                        },
                        {
                            name: '敏感人物识别',
                            id: 'sensitiveApi'
                        },
                        {
                            name: '视频图片序列识别',
                            id: 'classifyVideoImageApi'
                        }
                    ] 
                }
            }
        },
        methods: {
            toPositon (name,id) {    
                const targetPathName = '/' + name;
                if (window.location.pathname === targetPathName ) {
                    window.location.href = targetPathName + '#' + id + new Date().getTime();     
                } else {
                    window.location.href = targetPathName + '#' + id;
                }
            }
        } 
    }
</script>