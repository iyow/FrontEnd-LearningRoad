<template>
<div class="prenext">
    <div class="text-left prev">
        <router-link to="/article/0" class="link-title"><span>上一篇:xxx</span></router-link>
    </div>
    <div class="text-right next">
        <router-link to="/article/1" class="link-title"><span>下一篇:xxx</span></router-link>
    </div>
</div>
</template>

<script>
export default {}
</script>

<style scoped>
.prenext {
    margin: 10px 0;
    padding: 0 50px;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
}

.prenext .next,
.prenext .prev {
    display: inline-block;
    flex: 1 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.text-right {
    text-align: right;
}
.text-left {
    text-align: left;
}
</style>
