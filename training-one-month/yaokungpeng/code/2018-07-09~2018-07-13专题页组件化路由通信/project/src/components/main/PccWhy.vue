<template>
<div class="why-classic-chinese">
    <pcc-title flag="1" title-content="为什么小学要学文言文"/>
    <div class="answer-classic-chinese">
        <div class="left-answer">
            <img src="/static/为什么小学要学文言文.png" alt="">
        </div>
        <div class="right-answer">
            <ol>
                <li><img src="/static/1.jpg" alt=""> <span>文言文是小升初语文的必考点，也是高考必考点的一部分</span></li>
                <li><img src="/static/2.jpg" alt=""> <span>文言文是阅读古文经典的重要工具</span></li>
                <li><img src="/static/3.jpg" alt=""> <span>文言文需要大量的积累，良好的文言基础，有助于语文学习</span> </li>
                <li><img src="/static/4.jpg" alt=""> <span>趣味文言培养孩子对语文学习的兴趣</span></li>

                <!-- <pcc-img-and-text :infos="infos"/> 难搞 -->
            </ol>
        </div>
    </div>
</div>
</template>

<script>
import PccTitle from "./utils/PccTitle"
import PccImgAndText from "./utils/PccImgAndText"
export default {
    name: 'PccWhy',
    data:function () {
        return {
            infos:[
            {imgUrl:'/static/1.jpg',content:'文言文是小升初语文的必考点，也是高考必考点的一部分'},
            {imgUrl:'/static/2.jpg',content:'文言文是阅读古文经典的重要工具'},
            {imgUrl:'/static/3.jpg',content:'文言文需要大量的积累，良好的文言基础，有助于语文学习'},
            {imgUrl:'/static/4.jpg',content:'趣味文言培养孩子对语文学习的兴趣'}
            ]
        }
    },
    components:{
        PccTitle,
        PccImgAndText
    }
};
</script>

<style>
.why-classic-chinese,
.course-features {
    margin-top: 50px;
}

.answer-classic-chinese {
    margin-top: 20px;
    padding: 10px;
    display: flex;
}

.left-answer {
    width: 65%;
}

.left-answer img {
    width: 100%;
    height: 100%;
}

.right-answer ol {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin-left: 20px;
}

.right-answer li {
    display: flex;
    text-align: left;
    line-height: 17px;
    padding: 7px 15px 5px 10px;
    background-color: #fdc6c2;
    /* height: 20%; */
    margin-bottom: 10px;
}

.right-answer li:last-of-type {
    margin-bottom: 0;
}

.right-answer li img {
    margin-right: 10px;
    width: 20px;
    height: 30px;
}
</style>
