<template>
    <div>
        <div class="container">
            <p>Sibling 1</p>
            <p>Sibling 2</p>
            <p>Sibling 3</p>
            <div class="newBFC">
                <p>Sibling 3</p>
            </div>
        </div>

        <div class="container2">
            <div>test1</div>
            <div>test2</div>
        </div>

        <!-- 为 建立BFC -->
        <div class="container3">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518261518144&di=ab40fa0753a2e4ecbc6afa7152364d45&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Decfe83b9042442a7ba03f5e5b83bc827%2F728da9773912b31bc2fe74138d18367adab4e17e.jpg">
            <p>tafa llesafas llllll dfasd fffff ffffff dfasd fffff fdfasd fffff fdfasd fffff fdfasd fffff f fffff fffffft3</p>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            a: 'test'
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
    overflow: hidden;
}
p {
    background-color: lightgreen;
    margin: 10px 0;
    word-break: break-all;
}
.newBFC {
    overflow: hidden;
}
.container2 {
    overflow: hidden;
}
.container2 div {
    float: left;
    background-color: lightgreen;
    margin: 10px;
}

.container3 {
    width: 200px;
    img {
        float: left;
        width: 80px;
        height: 80px;
    }
}
</style>
