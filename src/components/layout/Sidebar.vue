<template>
    <aside class="app-sidebar animated" :class="{ slideInLeft: show, slideOutLeft: !show, showBanner: layout.showBanner }">
        <!-- <flex-box class="sidebar-hd menu-label" justify="space-between">
            <label>菜单项</label>
            <i class="fa fa-bars" aria-hidden="true"></i>
        </flex-box> -->
        <ul class="sidebar-bd">
            <li class="first-li" v-for="(item, index) in menuItems" v-bind:key="index" >

                <router-link :to="item.path" :exact="true"  v-if="item.path" @click.native="toggle(index, item)" class="nav-link click-but">
                    <span class='item-text'>
                        <span class="icon icon-title"><i :class="['fa', item.meta.icon]"></i></span>
                        {{ item.meta.label || item.name }}
                        <span class="icon icon-expand" v-if="item.children && item.children.length">
                            <i class="fa fa-angle-down"></i>
                        </span>
                    </span>
                </router-link>

                <a  v-else @click="toggle(index, item)" class="has-child nav-link">
                    <span class="icon icon-title"><i :class="['fa', item.meta.icon]"></i></span>
                    {{ item.meta.label || item.name }}
                    <span class="icon icon-expand" v-if="item.children && item.children.length">
                        <i class="fa fa-angle-down"></i>
                    </span>
                </a>

                <transition @beforeEnter="beforeEnter"
                            @afterEnter="afterEnter"
                            @beforeLeave="beforeLeave"
                            @afterLeave="afterLeave">
                <ul class="item-child" v-show="item.meta.expanded" v-if="item.children && item.children.length">
                    <li v-for="(subItem, index) in item.children" v-bind:key="index">
                        <router-link :to="generatePath(item, subItem)">
                            {{ subItem.meta && subItem.meta.label || subItem.name }}
                        </router-link>
                    </li>
                </ul>
                </transition>
            </li>
        </ul>
    </aside>
</template>

<style lang="less">
@import "../../assets/css/index";
.app-sidebar {
    position: fixed;
    top: @navbarHeight;
    left: 0;
    bottom: 0;
    width: @sidebarWidth;
    z-index: @maxZindex - 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding-top:58px;
    &.showBanner{
        position: absolute;
        top: @navbarHeight + @bannerHeight;
    }
    .sidebar-hd {
        padding: 0 15px;
    }
    .sidebar-bd{
        padding: 0 12px 0 73px;
        .collapse {
            display: none;
            &.in {
                display: block;
            }
        }
        .collapsing {
            position: relative;
            height: 0;
            overflow: hidden;
            transition: height .377s ease;
        }
        .icon{
            display: none;
            .fa{
                font-size: 14px;
            }
            &.icon-title .fa{
                font-size: 12px;
            }
            &.icon-expand{
                position: absolute;
                right: 15px;
            }
        }
        ul{
            opacity: 1;
        }
        li{
            position: relative;
            margin-bottom:15px;
        }
        a{
            display: block;
            font-size: 16px;
            color: @colorCommon;
            &.is-active{
                background-color: #EEEEEE;
                color: #2B4342;
            }
            &.has-child{
                font-size: 16px;
            }

            &.nav-link {
                color: #2B4342;
                font-size: 16px;
            }
        }
        .item-child{
            padding-left: 15px;
            margin-top: 8px;
            li{
                &:last-child{
                    margin-bottom: 0;
                }
            }
        }
    }
}
@media screen and (max-width: @mobileWidth) {
    .app-sidebar {
        position: relative;
        padding-top: 0;
        top: 0px;
        width: 100%;
        &.showBanner{
            position: relative;
            top: 0px;
        }
        .sidebar-bd {
            .first-li:nth-child(3) {
                display: none;
            }
            li {
                display: inline-block;
                margin: 20px 0 40px 0;
                a {
                    padding: 0 30px;
                }
            }
            .has-child {
                display: none;
            }
            .item-child {
                padding-left: 0;
                margin-top: 0;
                li {
                    margin: 0;
                }
            }
        }
        .item-text {
            padding: 5px 0px;
        }
        .is-active {
            .item-text {
                border-bottom: 2px solid;
                padding: 5px 0px;
            }
        }
        .sidebar-bd a {
            font-size: 24px;
            padding: 0;
            text-align: center;
        }
    }
}
@media screen and (max-width: 640px) {
    .app-sidebar {
        .sidebar-bd a {
            font-size: 24px;
        }
    }
}
@media (min-width: 641px) and (max-width: 700px) {
    .app-sidebar {
        .sidebar-bd a {
            font-size: 30px;
        }
    }
}
@media (min-width: 700px) and (max-width: 750px) {
    .app-sidebar {
        .sidebar-bd a {
            font-size: 30px;
        }
    }
}
@media (min-width: 751px) and (max-width:@mobileWidth) {
    .app-sidebar {
        .sidebar-bd a {
            font-size: 32px;
        }
    }
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
    },
    props: {
        show: Boolean
    },
    data () {
        return {
            isReady: false
        };
    },
    computed: {
        ...mapGetters([
            'layout',
            'menuItems'
        ])
    },
    mounted () {
    },
    methods: {
        ...mapActions([
            'expandMenu'
        ]),
        beforeEnter (el) {
            el.classList.remove('collapse');
            el.style.display = 'block';
            el.classList.add('collapsing');
            el.style.height = `${el.scrollHeight}px`;
        },
        afterEnter (el) {
            el.classList.remove('collapsing');
            el.classList.add('collapse', 'in');
        },
        beforeLeave (el) {
            el.classList.add('collapsing');
            el.classList.remove('collapse', 'in');
            el.style.height = 0;
        },
        afterLeave (el) {
            el.classList.remove('collapsing');
            el.classList.add('collapse');
            el.style.display = 'none';
        },
        isExpanded (item) {
            return item.meta.expanded;
        },
        toggle (index, item) {
            this.expandMenu(item);
        },

        generatePath (item, subItem) {
            return `${item.component ? item.path + '/' : ''}${subItem.path}`;
        }
    },

    watch: {
    }
};
</script>
