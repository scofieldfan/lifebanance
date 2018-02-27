<template>
    <div class="imglist">

        <unit v-if="!sort"></unit>
        <unit v-if="!sort"></unit>
        <unit v-if="!sort"></unit>
        
    </div>
</template>

<script>
    import unit from './unit.vue';

    export default {
        name: "imglist",
        props: ['sort','list'],
        computed: {

        },
        data () {
            return {
                
            };
        },
        methods:{
            
        },
        components: {
            unit
        }
    };
</script>

<style lang="less" scoped>
    @import "../../assets/css/mixin";
    .imglist{
        
    }
</style>
