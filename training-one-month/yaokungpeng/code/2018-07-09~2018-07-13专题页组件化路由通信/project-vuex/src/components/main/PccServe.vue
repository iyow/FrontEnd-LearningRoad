<template>
<div class="course-serve">
    <pcc-title flag="0" title-content="直播配套服务" />
        <pcc-img-and-text :infos="infos"/>
</div>
</template>

<script>
import PccTitle from "./utils/PccTitle";
import PccImgAndText from "./utils/PccImgAndText"

export default {
  name: "PccServe",
  data:function () {
        return {
            infos:[
            {imgUrl:'/static/直播班配套服务1.png',content:'直播学习互动性强'},
            {imgUrl:'/static/直播班配套服务2.png',content:'作业一对一批改'},
            {imgUrl:'/static/直播班配套服务3.png',content:'APP群答疑'},
            {imgUrl:'/static/直播班配套服务4.png',content:'彩色电子版讲义'}
            ]
        }
    },
  components: {
    PccTitle,
    PccImgAndText
    
  }
};
</script>

<style>
.course-serve {
  padding: 20px 50px;
  margin: 50px 0;
}

.course-serve ul li {
  width: 21%;
}

.course-serve ul li:first-of-type span {
  width: 65px;
  margin: 10px auto;
}
</style>
