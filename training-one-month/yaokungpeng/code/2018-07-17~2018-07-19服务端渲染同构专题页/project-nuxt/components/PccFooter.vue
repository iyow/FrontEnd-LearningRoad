<template>
<footer>
    <div class="joinus">
        <pcc-title flag="0" title-content="直播配套服务"/>
        <p>(扫描二维码下载学而思网校)</p>
        <img src="~/static/ER-直播班配套服务.png" alt="">
        <p>报名成功后，自动加入班级APP群(打开学而思网校APP，点击"消息"即可看到)如有疑问可加群咨询314635455或拨打客服电话4008002211</p>
    </div>
</footer>
</template>

<script>
import PccTitle from "./utils/PccTitle"
export default {
    name:"PccFooter",
    components:{
        PccTitle
    }
}
</script>

<style>
.joinus {
    text-align: center;
    margin-top: 50px;
    padding: 40px 40px 80px 40px;
    color: white;
    background-color: red;
}

.joinus h2 .hollow-circle {
    border-color: white;
}

.joinus img {
    margin: 50px 0;
    width: 30%;
}
</style>
