<template>
<ul class="img-row">
    <li v-for="(info,index) in infos" :key="index">
        <img :src="info.imgUrl" alt="">
        <span v-show="info.content">{{info.content}}</span>
    </li>
</ul>
</template>

<script>
export default {
    name: "PccImgAndText",
    props: ["infos"],

};
</script>

<style>
.img-row {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
}

.img-row img {
    width: 100%;
}

.img-row span {
    display: block;
    text-align: center;
    margin-top: 10px;
}
</style>
