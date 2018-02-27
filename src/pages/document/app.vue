<template>
    <div class="document">
        <div class="box">
            <page-menu class="fixed"></page-menu>
            <div class="menu"></div>
            <side-bar :info="info"></side-bar>
            <div class="container" id="scrollContainer" ref="scrollContainer" @scroll="scrollContainer">
                <app-main></app-main>
                <div ref="tab"></div>
            </div>
        </div>
        <page-footer v-if="isShow" class="page-footer"></page-footer>
    </div>
</template>

<style lang="less" scoped>
@import '../../assets/css/index';
.document {
    .box {
        position: relative;
        width: 100vw;
        height: 100vh;
        .fixed {
            position: fixed;
        }
        .menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100px;
            background-color: #000;
            z-index: 2;
        }
        .container {
            position: absolute;
            top: 100px;
            bottom: 0;
            right: 0;
            left: 250px;
            background: #fff;
            overflow: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
    .page-footer {
        position: absolute;
        margin-top: 0;
        z-index: 1;
        bottom: 0;
    }
}
</style>


<script>
import PageMenu from '../../components/menu/index.vue';
import SideBar from '../../components/sidebar/index.vue';
import appMain from './appMain.vue';
import pageFooter from '../../components/footer/index.vue';
const TWEEN = require('@tweenjs/tween.js');

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
}
// 每次hash变化时，页面跳到相应的内容
function toPosition() {
    const id = window.location.hash.replace(/\#([a-zA-Z]+)[0-9]+/, '$1');
    const initScrollTop = document.getElementById('scrollContainer').scrollTop;
    const target = document.getElementById(id);
    const tween = new TWEEN.Tween({ scrollTop: initScrollTop });
    tween
        .to({ scrollTop: target.offsetTop }, 300)
        .onUpdate(function(data) {
            document.getElementById('scrollContainer').scrollTop =
                data.scrollTop;
        })
        .start();
    animate();
}

window.onhashchange = function() {
    toPosition();
};

export default {
    components: {
        PageMenu,
        SideBar,
        appMain,
        pageFooter
    },
    data() {
        return {
            info: {
                id: '',
                idList: [
                    'porn',
                    'terrorism',
                    'sensitive',
                    'monitor',
                    'antiSpamAdvertising',
                    'faceRecognition',
                    'naturalSceneRecognition',
                    'imageBeautification',
                    'imageSearch',
                    'documentRecognition',
                    'gestureRecognition',
                    'deepCustomization'
                ]
            },
            disabled: true,
            isShow: false
        };
    },
    methods: {
        fetchRange(id) {
            const target = document.getElementById(id);
            const start = target.offsetTop;
            const end = start + target.offsetHeight;
            return { start: start, end: end, id: id };
        },
        scrollContainer() {
            const t = this;
            const bottom =
                t.$refs.tab.offsetTop - t.$refs.scrollContainer.offsetHeight;
            this.isShow = t.$refs.scrollContainer.scrollTop >= bottom;
            if (this.disabled) {
                setTimeout(function() {
                    t.disabled = true;
                    const rangeList = [];
                    t.info.idList.forEach(val => {
                        rangeList.push(t.fetchRange(val));
                    });
                    const top = t.$refs.scrollContainer.scrollTop;
                    rangeList.forEach(val => {
                        if (val.start <= top && top < val.end) {
                            t.info.id = val.id;
                        }
                    });
                    if (
                        rangeList[0].start > top ||
                        rangeList[rangeList.length - 1] < top
                    ) {
                        t.info.id = '';
                    }
                }, 100);
            }
            t.disabled = false;
        }
    },
    mounted() {}
};
</script>