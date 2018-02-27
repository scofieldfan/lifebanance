import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../pages/HelloWorld';
import Layout from '../pages/Layout';
import BFC from '../pages/BFC';
import DOCUMENTMARK from '../pages/document/app';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/Layout',
            name: 'Layout',
            component: Layout
        },
        {
            path: '/BFC',
            name: 'BFC',
            component: BFC
        },
        {
            path: '/document',
            name: 'document',
            component: DOCUMENTMARK
        }
    ]
});