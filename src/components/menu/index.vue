<template>
    <div class="page-nav">
        <div class="menu-content">
            <div class="logo-box" @click="toHome">
                <!-- <img src="../../assets/img/logo.png" alt=""> -->
            </div>
            <div class="menu-box">
                <div class="menu-item" v-for="m in menus">
                    <a :href="m.path" v-if="m.path" class="link">{{m.name}}</a>
                    <a v-else class="link">{{m.name}}</a>
                    <transition name="fade">
                        <ul class="sub-menu show-sub-menu" v-if="m.subMenu">
                            <li class="item" v-for="sm in m.subMenu" @click="clickHandler(sm)">
                                {{sm.name}}
                            </li>
                        </ul>
                    </transition>
                </div>
                <div class="menu-item login-box" @click="login(3)" v-if="isLogin">
                    <span class="op-button">退出</span>
                </div>
                <div class="menu-item login-box" v-else="isLogin">
                    <span class="op-button" @click="login(0)">登录</span>
                    /
                    <span class="op-button" @click="login(1)">注册</span>
                </div>
            </div>
        </div>
        <layer v-show="showLayer" @close="showLayer=false" :info="currentMenu"></layer>
    </div>
</template>

<style lang="less">
@import '../../assets/css/mixin';

.page-nav {
    left: 0px;
    position: absolute;
    width: 100%;
    height: 40px;
    top: 30px;
    .center();
    z-index: 1000;

    a {
        color: #fff;
        cursor: pointer;
    }

    .menu-content {
        width: 1198px;
        height: 40px;
        .flexbox();

        .logo-box {
            .flex(1);
            height: 100%;
            img {
                cursor: pointer;
            }
        }

        .menu-box {
            height: 100%;
            .flexbox();
            font-size: 16px;
            color: #ffffff;
            .flexjustify(flex-end);
            .menu-item {
                width: 140px;
                text-align: center;
                position: relative;
                letter-spacing: 1.07px;

                .show-sub-menu {
                    height: 0px;
                    overflow: hidden;
                    transition: all 0.3s;
                    opacity: 0;
                }

                .link {
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                }

                &:hover {
                    .link {
                        border-bottom: 2px solid #c6000d;
                    }

                    .show-sub-menu {
                        display: block;
                        height: 524px;
                        opacity: 1;
                    }
                }

                .sub-menu {
                    position: absolute;
                    padding: 10px 0;
                    top: 40px;
                    width: 140px;
                    background-color: rgba(0, 0, 0, 0.8);
                    font-size: 16px;

                    .memu-header {
                        height: 60px;
                        line-height: 60px;
                    }

                    .item {
                        padding: 0 14px;
                        height: 42px;
                        line-height: 42px;
                        cursor: pointer;
                        &:hover {
                            background-color: rgba(198, 0, 13, 0.8);
                        }
                    }
                }
            }
            .login-box {
                position: relative;
                cursor: pointer;
                margin-left: 10px;
                .op-button {
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                }
                &::before {
                    content: '';
                    position: absolute;
                    height: 17px;
                    top: 12px;
                    left: 0px;
                    width: 1px;
                    background: #fff;
                }

                &:hover {
                    background-color: transparent;
                }
            }
        }
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

<script>
import commonjs from '../../common';
import Layer from '../dialog/serviceDialog';

export default {
    name: 'page-menu',
    data() {
        return {
            isLogin: false,
            userInfo: {},
            showLayer: false,
            curl: window.location.pathname,
            currentMenu: {
                title: ''
            },
            menus: [
                {
                    name: '首页',
                    path: '/',
                    isActive: false
                },
                {
                    name: '体验中心',
                    path: '',
                    isActive: false,
                    subMenu: [
                        {
                            name: '鉴黄识别',
                            path: '/porn'
                        },
                        {
                            name: '暴恐违规',
                            path: '/terrorism'
                        },
                        {
                            name: '敏感人物',
                            path: '/sensitive'
                        },
                        {
                            name: '直播监控',
                            path: '/monitor'
                        },

                        {
                            name: '人脸识别'
                        },
                        {
                            name: '证件识别'
                        },
                        {
                            name: '反垃圾广告'
                        },
                        {
                            name: '定制训练'
                        },
                        {
                            name: '声音识别'
                        },
                        {
                            name: '文字过滤'
                        },
                        {
                            name: '自然场景识别'
                        },
                        {
                            name: '手势识别'
                        }
                    ]
                },
                {
                    name: '文档中心',
                    path: '/techapi',
                    isActive: false
                }
            ]
        };
    },
    mounted() {
        this.isLogin = this.loginStatus();
        this.initMenuStatus();
    },
    methods: {
        login(isRegister) {
            if (isRegister === 3) {
                window.location.href = '/logout?c=' + this.curl;
                return false;
            }
            if (isRegister) {
                window.location.href =
                    'https://passport.ksyun.com/register.html';
            } else {
                if (this.isLogin) {
                    window.location.href = '/logout?c=' + this.curl;
                } else {
                    window.location.href =
                        'https://passport.ksyun.com/?callback=' +
                        window.location.href;
                }
            }
        },
        toHome() {
            window.location.href = 'http://www.ksyun.com';
        },
        loginStatus() {
            const uid = commonjs.cookie.get('uid');
            return !!uid;
        },
        initMenuStatus() {
            let menus = this.menus;
            let path = window.location.pathname;
            menus.forEach(m => {
                if (m.path) {
                    m.path === path && (m.isActive = true);
                } else {
                    let subMenu = m.subMenu || [];
                    subMenu.forEach(sm => {
                        console.log(sm.path);
                        sm.path === path && (m.isActive = true);
                    });
                }
            });
        },
        clickHandler(m) {
            console.log('************');
            if (m.path) {
                window.location.href = m.path;
            } else {
                this.showLayer = true;
                this.currentMenu = {
                    title: m.name
                };
            }
        }
    },
    components: {
        Layer
    }
};
</script>
