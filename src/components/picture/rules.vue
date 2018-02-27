<template>
    <div class="picture-desc">
        <div class="pic-desc">
            <div class="desc-content">
                <div class="title">{{decscription.title}}</div>
                <div class="next-icon"></div>
            </div>
        </div>
        <div class="pic-rules">
            <div class="rule-item" v-for="rule in decscription.rules">
                <div class="img-box img1" :style="{'background-image': 'url(' + rule.img + ')'}">
                    <div class="title">
                        <div :style="{width: (rule.title.length%2) === 0 ? '50px' : ''}">{{rule.title}}</div>
                    </div>
                </div>
                <div class="desc">
                    {{rule.desc}}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    @import '../../assets/css/animation';
    @import '../../assets/css/mixin';

    .picture-desc {
        position:relative;
        z-index: 1;
        height: 100vh;
        min-height: 620px;
        max-height: 720px;
        padding-bottom: 20px;
        .center();
        .flexbox(column);
        .pic-desc {
            width: 100%;
            background: url('../../assets/img/picture/bg.jpg') no-repeat center scroll;
            background-size: cover;
            .flex(1);
            min-height: 320px;
            font-size: 40px;
            .center();
            .desc-content {
                position: relative;
                width: 100%;
                padding: 5%;
                .center();
                .title {
                    color: #FFF;
                }
            }
            
        }

        .pic-rules {
            position: relative;
            margin-top: -110px;
            z-index: 2;
            width: 1198px;
            .flexbox();
            .flexjustify(space-between);
            .rule-item {
                .img-box {
                    background-position: center center;
                    background-size: contain;
                    background-repeat: no-repeat;
                    width: 360px;
                    height: 220px;
                    .flexbox();
                    .center();
                    background-size: 360px 220px;
                    .title {
                        width: 86px;
                        height: 86px;
                        border-radius: 50%;
                        font-size: 18px;
                        
                        border: 1px solid #fff;
                        .flexbox();
                        .center();
                        color: #fff;
                        div {
                            text-align: center;
                            word-wrap: break-word;
                            width: 60px;
                        }
                    }
                    &:hover {
                        background-size: 110% 110%;
                        .animation(hover .3s linear);
                    }

                    .keyframes(hover);
                    .-frames(@-...) {
                        0% {
                            background-size: 100% 100%;
                        }

                        100% {
                            background-size: 110% 110%;
                        }
                    }

                }
                .desc {
                    width: 360px;
                    margin-top: 37px;
                    color: #515151;
                    font-size: 15px;
                    word-wrap: break-word;
                }
            }
        }

        .next-icon {
            position: absolute;
            left: 50%;
            .transform(translateX(-50%));
            width: 18px;
            height: 20px;
            background: url(../../assets/img/home/arrow.png) no-repeat center;
            background-size: 100%;
            .animation(arrow 1.5s linear infinite);


            .keyframes(arrow);
            .-frames(@-...) {
                0% {
                    bottom: 10px;
                }

                50% {
                    bottom: 25px;
                }

                100% {
                    bottom: 10px;
                }
            }
        }
    }

</style>

<script>
    export default {
        props: {
            decscription: {
                type: Object,
                default: {
                    title: '',
                    rules: []
                }
            }
        }
    }
</script>