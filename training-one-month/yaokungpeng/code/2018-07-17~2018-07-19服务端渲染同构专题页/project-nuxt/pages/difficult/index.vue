<template>
<div class="course-features">
    <div class="course-problem">
        <pcc-title flag="1" title-content="文言文学习有难点？" />
        <pcc-img-and-text :infos="infosProblem" />
    </div>
    <div class="course-answer">
        <pcc-title flag="2" title-content="趣味学习，打破文言文难点" />
        <pcc-img-and-text :infos="infosAnswer" />
    </div>
</div>
</template>

<script>
import PccTitle from "~/components/utils/PccTitle"
import PccImgAndText from "~/components/utils/PccImgAndText"

export default {
    name: "PccDifficult",
    head:{
        title:'Difficult'
    },
    data: function () {
        return {
            infosProblem: [{
                    imgUrl: '/文言文学习有何难点1.png',
                    content: ''
                },
                {
                    imgUrl: '/文言文学习有何难点2.png',
                    content: ''
                },
                {
                    imgUrl: '/文言文学习有何难点3.png',
                    content: ''
                },
            ],
            infosAnswer: [{
                    imgUrl: '/打破文言文难点1.png',
                    content: '从寓言故事学文言搞定语言词语'
                },
                {
                    imgUrl: '/打破文言文难点2.png',
                    content: '从神话故事读文言解决翻译大难题'
                },
                {
                    imgUrl: '/打破文言文难点3.png',
                    content: '从历史故事品文言玩转文言句式'
                },
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
.course-features {
    background-image: url(/纹理.png);
    padding: 40px 15px;
}

.course-features .title img {
    vertical-align: middle;
}

.course-features ul li {
    width: 31%;
}

.course-answer .title {
    margin: 50px 0;
}

.course-answer .img-row span {
    width: 67%;
    margin: 10px auto;
}
</style>
