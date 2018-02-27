<template>
    <div class="homepage-icon">
        <flex-box dir="column">
            <div 
                :class="['img', info.size]" 
                :style="{background: 'url(' + info.url + ') no-repeat center' }">
            </div>
            <div :class="['title', info.size]" :style="{color: info.isHover ? '#C6000D' : ''}">{{info.title}}</div>
            <div v-if="info.detail" class="detail">{{info.detail}}</div>
        </flex-box>
    </div>
</template>
<style lang="less">
@import '../../assets/css/mixin.less';
    .homepage-icon {
        .img {
            transition: all 0.3s;
            background-size: 100%;
            &.large {
                width: 120px;
                height: 120px;
            }
            &.small {
                width: 110px;
                height: 110px;
                cursor: pointer;
            }
        }
        .title {
            font-size: 26px;
            &.large {
                color: #515151;
                font-weight: bolder;
                margin-top: 42px;
            }
            &.small {
                color: #fff;
                margin-top: 20px;
            }
        }
        .detail {
            margin-top: 16px;
            font-size: 16px;
            color: #a5a5a5;
        }
        &:hover {
            .img {
                &.small {
                    .transform(scale(1.1));
                }
            }
        }
    }   
</style>
<script>
    export default {
        data () {
            return {

            }
        },
        props: ['info'],
        mounted () {
        
        }    
    }
</script>