<template>
<div class="nav">
    <router-link to="/why">为什么要学文言文</router-link>
    <router-link to="/difficult">文言文难点</router-link>
    <router-link to="/class">课程安排</router-link>
    <router-link to="/serve">配套服务</router-link>
    <router-link to="/contact">联系我们</router-link>
</div>
</template>

<script>
export default {
    name: "NavBars"
};
</script>

<style>
.nav{
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 10px;
}
.nav a{
    flex-grow: 1;
    text-align: center;
    color: white;
    background-color: rgb(241, 117, 113);
    margin: 5px;
}
.nav input{
    margin: 5px;
}
.nav a:hover{
    background-color: skyblue;
}
</style>

