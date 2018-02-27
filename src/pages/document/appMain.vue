<template>
    <div ref="businessMd" class="document-container markdown-body">
        <div v-html="item.md" :id="item.name" v-for="item in info"></div>
    </div>
</template>
<style lang="less">
@import '../../assets/css/index';
.hljs {
    background: #fff;
}
.document-container {
    padding: 20px 55px 100vh;
    color: #515151;
    font-size: 14px;
    line-height: 1.8;
    .title {
        padding: 10px 0 20px;
        font-size: 20px;
        color: #c6000d;
        font-weight: bolder;
    }
    .content {
        padding-left: 25px;
        .abstract {
            padding-bottom: 15px;
        }
        ul {
            list-style-type: disc;
            padding-left: 18px;
            li {
                padding-bottom: 15px;
            }
        }
    }
}
.markdown-body {
    img {
        width: 700px;
    }
}
</style>
<script>
import head from './markdown/head.md';
import porn from './markdown/porn.md';
import terrorism from './markdown/terrorism.md';
import sensitive from './markdown/sensitive.md';
import monitor from './markdown/monitor.md';
import antiSpamAdvertising from './markdown/antiSpamAdvertising.md';
import faceRecognition from './markdown/faceRecognition.md';
import naturalSceneRecognition from './markdown/naturalSceneRecognition.md';
import imageBeautification from './markdown/imageBeautification.md';
import imageSearch from './markdown/imageSearch.md';
import documentRecognition from './markdown/documentRecognition.md';
import gestureRecognition from './markdown/gestureRecognition.md';
import deepCustomization from './markdown/deepCustomization.md';
import 'github-markdown-css';

export default {
    name: 'documentContainer',
    data() {
        return {
            info: [
                {
                    md: head,
                    name: 'head'
                },
                {
                    md: porn,
                    name: 'porn'
                },
                {
                    md: terrorism,
                    name: 'terrorism'
                },
                {
                    md: sensitive,
                    name: 'sensitive'
                },
                {
                    md: monitor,
                    name: 'monitor'
                },
                {
                    md: antiSpamAdvertising,
                    name: 'antiSpamAdvertising'
                },
                {
                    md: faceRecognition,
                    name: 'faceRecognition'
                },
                {
                    md: naturalSceneRecognition,
                    name: 'naturalSceneRecognition'
                },
                {
                    md: imageBeautification,
                    name: 'imageBeautification'
                },
                {
                    md: imageSearch,
                    name: 'imageSearch'
                },
                {
                    md: documentRecognition,
                    name: 'documentRecognition'
                },
                {
                    md: gestureRecognition,
                    name: 'gestureRecognition'
                },
                {
                    md: deepCustomization,
                    name: 'deepCustomization'
                }
            ]
        };
    },
    mounted() {
        require.ensure(
            [],
            require => {
                const hljs = require('highlight.js');
                hljs.highlightBlock(this.$refs.businessMd);
            },
            'b'
        );
    }
};
</script>