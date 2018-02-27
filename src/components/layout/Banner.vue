<template>
<!--
  <div class="app-banner">
      <flex-box class="banner-bd" dir="column" align="flex-start">
        <h1>
          金睛系统
        </h1>
        <h2>
        应用人工智能深度学习技术，做到实时视频流监测鉴黄+图片截帧监测鉴黄，涉黄内容自动警告
        </h2>
      </flex-box>

  </div>
-->
  <div class="app-banner" __vuec__ :class='basicdata.containerClass'>
        <div class="slider-wrapper"
             :style="styleobj"
             @touchmove="swipeMove"
             @touchstart="swipeStart"
             @touchend="swipeEnd"
             @webkit-transition-end="onTransitionEnd"
             @transitionend="onTransitionEnd"
        >
            <template v-if="!sliderinit.loop">
                <template v-for="item in newPages">
                    <div class="slider-item" :style="item.style" style="background-size: 100% 100%;">
                        <div class="item-title">
                            <div class="border-left"></div>
                            {{item.title}}
                            <div class="border-right"></div>
                        </div>
                        <div class="item-content">
                            {{item.content}}
                        </div>
                    </div>
                </template>
                <div v-if="newPages.length==0 && !isFirst" class="slider-item def">
                </div>
            </template>


            <template v-if="sliderinit.loop">
                <template v-if="sliderinit.infinite" v-for="(item, index) in newPages" >
                    <div v-if="index+sliderinit.infinite-newPages.length>=0" class="slider-item" :style=" item.style">
                        <div class="item-title">
                        <div class="border-left"></div>
                        {{item.title}}
                            <div class="border-right"></div>
                    </div>
                        <div class="item-content">
                            {{item.content}}
                        </div></div>
                </template>
                <template v-if="!sliderinit.infinite">
                    <div class="slider-item" :style="newPages[newPages.length-1].style">

                     <div class="item-title">
                        <div class="border-left"></div>
                        {{newPages[newPages.length-1].title}}
                            <div class="border-right"></div>
                    </div>
                        <div class="item-content">
                            {{newPages[newPages.length-1].content}}
                        </div>

                </div>
                </template>
                <!-- 无缝滚动copy最后项 -->
                <template v-for="item in newPages">
                    <div class="slider-item" :style="item.style">
                        <div class="item-title">
                        <div class="border-left"></div>
                        {{item.title}}
                            <div class="border-right"></div>
                    </div>
                        <div class="item-content">
                            {{item.content}}
                        </div></div>
                </template>
                <!-- 无缝滚动copy第一项 -->
                <template v-if="sliderinit.infinite" v-for="(item, index) in newPages" >
                    <div v-if="index-sliderinit.infinite<0" class="slider-item" :style=" item.style">
                        <div class="item-title">
                            <div class="border-left"></div>
                            {{item.title}}
                            <div class="border-right"></div>
                        </div>
                        <div class="item-content">
                            {{item.content}}
                        </div>

                 </div>
                </template>
                <template v-if="!sliderinit.infinite">
                    <div class="slider-item" :style="newPages[0].style">
                     <div class="item-title">
                        <div class="border-left"></div>
                        {{newPages[0].title}}
                            <div class="border-right"></div>
                    </div>
                        <div class="item-content">
                            {{newPages[0].content}}
                        </div>s


                    </div>
                </template>
            </template>




        </div>
        <div class="slider-pagination slider-pagination-bullets">
            <template v-for="n in pagenums">
                    <span @click='slide(n-1)' class="slider-pagination-bullet"
                          :class="n-1 === sliderinit.currentPage? 'slider-pagination-bullet-active':''"></span>
            </template>
        </div>


    </div>
</template>
<style lang="less">
@import "../../assets/css/index";
.app-banner{
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        top: calc( @navbarHeight - 1);
        height: @bannerHeight;
        margin: 0 auto;
        width: 100%;
        white-space: nowrap;

        .slider-center-center {
            margin: auto;
            z-index: 1;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .slider-wrapper {
            box-sizing: content-box;
            display: flex;
            display: -webkit-flex;
            height: 100%;
            position: relative;
            transition-property: transform;
            -webkit-transition-property: transform;
            width: 200vw;
            transform-style: preserve-3d;
            -webkit-transform-style: preserve-3d;
            background: #fff;
        }

        .slider-item {
            flex-shrink: 0;
            height: 100%;
            position: relative;
            width: 100vw;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            background-size: 100% 100%;
            &.def{
                background: red center center no-repeat;
            }
            .item-title{
                display: inline-block;
                position: relative;
                left: 160px;
                top: 36px;
                padding: 8px;
                line-height: 1;
                &>div{
                    position: absolute;
                    width: 16px;
                    height: 16px;
                }
                .border-left{
                    border-top: 2px solid #7ED321;
                    border-left: 2px solid #7ED321;
                    top: 0;
                    left: 0;
                }
                .border-right{
                    border-bottom: 2px solid #7ED321;
                    border-right: 2px solid #7ED321;
                    bottom: 0;
                    right: 0;
                }
            }
            .item-content{
                font-size: 20px;
                width: 720px;
                top: 109px;
                left: 170px;
                position: absolute;
                white-space: initial;
            }
        }

        .slider-item {
            font-size: 40px;
            color: #fff;
            /*
            align-items: center;
            background: #fff none repeat scroll 0 0;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            text-align: center;
            */
        }

        .slider-item {
            background-position: center center !important;
            // background-size: cover !important;
        }

        .slider-pagination {
            position: absolute;
            text-align: center;
            transform: translate3d(0px, 0px, 0px);
            -webkit-transform: translate3d(0px, 0px, 0px);
            /*transition: all 350ms ease 0s;*/
            z-index: 10;
        }

        .slider-pagination-bullets {
            bottom: 10px;
            left: 0;
            width: 100%;
        }

        .slider-pagination-bullet {
            background: #000 none repeat scroll 0 0;
            border-radius: 100%;
            display: inline-block;
            height: 6px;
            opacity: 0.2;
            width: 6px;
            cursor: pointer;
            margin: 0 5px;
            .box-shadow(0px 0px 1px 1px #fff);
        }

        .slider-pagination-bullet-active {
            background: #fff none repeat scroll 0 0;
            opacity: 1;
        }

        .slider-button-next, .slider-button-prev {
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 27px 44px;
            cursor: pointer;
            height: 44px;
            margin-top: -22px;
            position: absolute;
            top: 50%;
            width: 27px;
            z-index: 10;
        }

        .slider-button-prev {
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z\'%20fill%3D\'%23ffffff\'%2F%3E%3C%2Fsvg%3E");
            left: 10px;
            right: auto;
        }

        .slider-button-next {
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z\'%20fill%3D\'%23ffffff\'%2F%3E%3C%2Fsvg%3E");
            left: auto;
            right: 10px;
        }

        /*移动端优化*/
        @media screen and (max-width: 414px) {
            .slider-container {
                height: 200px;
                margin: 0 auto;
                width: 90%;
            }
        }
}
@media screen and (max-width: @mobileWidth) {
    .app-banner{
        height: @bannerHeightMobile;
        top: 0;
        .banner-bd{
            padding: 0 30px;
        }
        h2{
            font-size: 24px;
        }
        .slider-item {
            .item-title{
                left: 75px;
                top: 36px;
            }
            .item-content{
                width: 70%;
                top: 109px;
                left: 75px;
                text-shadow: rgba(0, 0, 0, 0.33) 0 1px 0;
            }
        }
    }
}
</style>
<script>
    export default{
        name: "banner",
        props: {
            'pages': {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        watch:{
            pages(val, oldVal){
                this.isFirst = false;
            }
        },
        data(){
            return {
                sliderinit: {
                    currentPage: 0,
                    thresholdTime: 10000, // 滑动时间阈值判定距离
                    thresholdDistance: 100, // 滑动距离阈值
                    // slideSpeed:1000, // 滑动速度
                    loop:true, // 无限循环
                    infinite:true,
                    autoplay:3000 // 自动播放:时间[ms]
                },
                basicdata: {
                    poswidth: '0',
                    posheight: '0',
                    start: {},
                    end: {},
                    tracking: false,
                    animation: false,
                    containerClass: {
                        'swiper-container-vertical': false
                    },
                    setIntervalid: '',
                    prefixes: {
                        transition: 'webkitTransition'
                    }
                },
                transitionEnding: false,
                isFirst: true
            }
        },
        computed: {
            styleobj: function () {
                let style = {};
                style['transform'] = 'translate3D(' + this.basicdata.poswidth + ',' + this.basicdata.posheight + ',0)';
                style['webkitTransform'] = 'translate3D(' + this.basicdata.poswidth + ',' + this.basicdata.posheight + ',0)';
                style['transitionTimingFunction'] = 'ease';
                style['webkitTransitionTimingFunction'] = 'ease';
                style['transitionDuration'] = (this.basicdata.animation ? this.sliderinit.slideSpeed || 300 : 0) + 'ms';
                style['webkitTransitionDuration'] = (this.basicdata.animation ? this.sliderinit.slideSpeed || 300 : 0) + 'ms';
                return style;
            },
            // pagenum滑动数
            pagenums: function () {
                let list=this.pages;
                let leg=0;
                if(list){
                    for(let item of list){
                        if(item && item.url.trim()!=""){
                            leg++;
                        }
                    }
                }
                return leg;
            },
            // 组件的核心，计算当前父级需要进行的偏移,每次要遍历节点
            currentWidth: {
                get: function () {
                    let $slider;
                    let lastPage = this.sliderinit.currentPage;

                    if (this.sliderinit.loop) {
                        if (this.sliderinit.infinite) {
                            lastPage = this.sliderinit.currentPage + (this.sliderinit.infinite <= this.pages.length ? this.sliderinit.infinite : this.pages.length)
                        } else {
                            lastPage = this.sliderinit.currentPage + 1
                        }
                    }


                    // 获取slideritem子集
                    for (let item in this.$el.children) {
                        if (/slider-wrapper/ig.test(this.$el.children[item].className)) {
                            $slider = this.$el.children[item];
                        }
                    }
                    // 遍历子集
                    let $sliderChildren = $slider.children;
                    let offsetLeft =  $sliderChildren[lastPage] ? $sliderChildren[lastPage].offsetLeft : 0;

                    return offsetLeft
                },
                set: function (value) {
                    return value
                }
            },
            currentHeight: function () {
                let posheight = 0
                let $slider;
                let lastPage = this.sliderinit.currentPage - 1;

                if (this.sliderinit.loop) {
                    if (this.sliderinit.infinite) {
                        lastPage = this.sliderinit.currentPage + (this.sliderinit.infinite <= this.pages.length ? this.sliderinit.infinite : this.pages.length) - 1
                    } else {
                        lastPage = this.sliderinit.currentPage + 1
                    }
                }


                // 获取slideritem子集
                for (let item in this.$el.children) {
                    if (/slider-wrapper/ig.test(this.$el.children[item].className)) {
                        $slider = this.$el.children[item]
                    }
                }
                // 遍历子集
                let $sliderChildren = $slider.children
                for (let item in $sliderChildren) {
                    if (item <= lastPage) {
                        // 找到实际宽度clientWidth+外边距
                        posheight += $sliderChildren[item].offsetHeight
                        posheight += parseInt($sliderChildren[item].style.marginTop || 0)
                        posheight += parseInt($sliderChildren[item].style.marginBottom || 0)
                    }
                }
                return posheight
            },
            newPages(){
                let list = this.pages;
                let newlist = [];
                for(let item of list){
                    if(item && item.url.trim() != "") {
                        let param={
                            style: {'background': 'url("' + item.url + '") no-repeat center / 100% 100%','background-size': '100% 100%'},
                            title: item.title,
                            content: item.content
                        };
                        newlist.push(param);
                    }
                }
                return newlist;
            }

        },
        mounted() {
            let that = this
            // 起始跳到指定页 无样式
            that.slide(this.sliderinit.currentPage, 'animationnone');
            // 定制事件
            that.$on('slideTo', (num) => {
                this.slide(num)
            })
            that.$on('slideNext', () => {
                this.next()
            })
            that.$on('slidePre', () => {
                this.pre()
            })
            that.clock().begin(that);

        },
        methods: {
            swipeStart (e) {
                console.log('swipeStart....');
                let that = this;
                if (this.basicdata.transitionEnding) {
                    return
                }
                this.basicdata.animation = false
                // 暂停自动滚动
                if (this.sliderinit.autoplay) {
                    let that = this
                    this.clock().stop(that)
                }
                this.basicdata.animation = false;
                // 阻止页面滚动
                document.addEventListener('touchmove', that.preventDefault(e));
                if (e.type === 'touchstart') {
                    if (e.touches.length > 1) {
                        this.basicdata.tracking = false;
                        return;
                    } else {
                        this.basicdata.tracking = true;
                        /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
                        this.basicdata.start.t = new Date().getTime();
                        this.basicdata.start.x = e.targetTouches[0].clientX;
                        this.basicdata.start.y = e.targetTouches[0].clientY
                        this.basicdata.end.x = e.targetTouches[0].clientX
                        this.basicdata.end.y = e.targetTouches[0].clientY
                    }
                } else {
                    this.basicdata.tracking = true
                    /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
                    this.basicdata.start.t = new Date().getTime()
                    this.basicdata.start.x = e.clientX
                    this.basicdata.start.y = e.clientY
                    this.basicdata.end.x = e.clientX
                    this.basicdata.end.y = e.clientY
                }
            },
            swipeMove (e) {
                console.log('swipeMove....');
                if (this.basicdata.tracking) {
                    if (e.type === 'touchmove') {
                        e.preventDefault()
                        this.basicdata.end.x = e.targetTouches[0].clientX
                        this.basicdata.end.y = e.targetTouches[0].clientY
                    } else {
                        e.preventDefault()
                        this.basicdata.end.x = e.clientX
                        this.basicdata.end.y = e.clientY
                    }
                    if (this.sliderinit.direction === 'vertical') {
                        this.basicdata.posheight = -(this.currentHeight) + this.basicdata.end.y - this.basicdata.start.y + 'px'
                        return
                    }
                    this.basicdata.poswidth = -(this.currentWidth) + this.basicdata.end.x - this.basicdata.start.x + 'px'
                }
            },
            swipeEnd (e) {
                console.log('swipeEnd.....');
                this.basicdata.tracking = false;
                let now = new Date().getTime();
                let deltaTime = now - this.basicdata.start.t;
                let deltaX = this.basicdata.end.x - this.basicdata.start.x;
                let deltaY = this.basicdata.end.y - this.basicdata.start.y;

                if (this.sliderinit.autoplay) {
                    let that = this
                    setTimeout(function () {
                        that.clock().begin(that)
                    }, this.sliderinit.autoplay)
                }
                // 解除阻止
                document.removeEventListener('touchmove', this.preventDefault(e))
                /* work out what the movement was */
                console.log(deltaTime);
                if (deltaTime > this.sliderinit.thresholdTime) {
                    this.slide(this.sliderinit.currentPage);
                    console.log("slide.......");
                    /* gesture too slow */
                    return
                } else {
                    if ((deltaX > this.sliderinit.thresholdDistance) && (Math.abs(deltaY) < this.sliderinit.thresholdDistance)) {
                        // swipe right
                        this.pre();
                        return;
                    } else if ((-deltaX > this.sliderinit.thresholdDistance) && (Math.abs(deltaY) < this.sliderinit.thresholdDistance)) {
                        // swipe left
                        this.next()
                        return;
                    } else {
                        this.slide(this.sliderinit.currentPage)
                        return;
                    }
                }
                console.log('end...........');
            },
            pre () {
                if (this.sliderinit.currentPage >= 1) {
                    this.sliderinit.currentPage -= this.sliderinit.slidesToScroll || 1
                    this.slide()
                } else if (this.sliderinit.loop && this.sliderinit.currentPage === 0) {
                    this.sliderinit.currentPage -= this.sliderinit.slidesToScroll || 1
                    this.basicdata.transitionEnding = true
                    this.slide()
                } else {
                    this.slide()
                }
                console.log('pre...........');
            },
            next () {
                if (this.sliderinit.currentPage < this.pagenums - 1) {
                    this.sliderinit.currentPage += this.sliderinit.slidesToScroll || 1
                    this.slide()
                } else if (this.sliderinit.loop && this.sliderinit.currentPage === this.pagenums - 1) {
                    this.sliderinit.currentPage += this.sliderinit.slidesToScroll || 1
                    this.basicdata.transitionEnding = true
                    this.slide()
                } else {
                    this.slide()
                }
                console.log('next...........');
            },
            slide (pagenum, type) {
                let that = this;
                // 执行动画
                that.basicdata.animation = true;
                // 无样式滚动
                if (type === 'animationnone') {
                    that.basicdata.animation = false;
                }
                if (pagenum || pagenum === 0) {
                    that.sliderinit.currentPage = pagenum;
                }
                that.basicdata.poswidth = -that.currentWidth + 'px';
                /*
                 */
                 // 广播事件
                 if (that.sliderinit.currentPage < 0 || that.sliderinit.currentPage >= that.pagenums) {
                 return
                 }
                 that.$emit('slide', that.sliderinit.currentPage);
            },
            clock: function () {
                // 暂时这么写，写了自调用，但是vue不支持，欢迎小伙伴提供新的思路
                return {
                    begin: function (that) {
                        if (that.sliderinit.autoplay) {
                            if (that.basicdata.setIntervalid) {
                                return
                            }
                            that.basicdata.setIntervalid = setInterval(function () {
                                that.next()
                                if (that.sliderinit.currentPage === that.pagenums - 1 && !that.sliderinit.loop) {
                                    clearInterval(that.basicdata.setIntervalid)
                                    that.basicdata.setIntervalid = 0
                                }
                            }, that.sliderinit.autoplay)
                        }
                    },
                    stop: function (that) {
                        clearInterval(that.basicdata.setIntervalid)
                        that.basicdata.setIntervalid = 0
                    }
                }
            },
            // 阻止页面滚动
            preventDefault (e) {
                e.preventDefault()
            },
            // 无限循环中transitionEnd
            onTransitionEnd () {
                if (this.sliderinit.loop) {
                    this.basicdata.transitionEnding = false
                    if (this.sliderinit.currentPage < 0) {
                        this.slide(this.pagenums + this.sliderinit.currentPage, 'animationnone')
                    } else if (this.sliderinit.currentPage >= this.pagenums) {
                        this.slide(0 + this.sliderinit.currentPage - this.pagenums, 'animationnone')
                    }
                }

            }
        }
    }
</script>
