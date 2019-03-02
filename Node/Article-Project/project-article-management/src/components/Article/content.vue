<template>
<div class="article-container">
    <a class="article-save" v-show="flag">保存</a>
    <h1 class="title" :contenteditable="flag">{{ articleDetailResult.title }}</h1>
    <div class="counts">
        <span class="views-count">阅读{{articleDetailResult.visit_count}}</span>
        <span class="comments-count">评论{{articleDetailResult.comment.length}}</span>
        <span class="likes-count">喜欢{{articleDetailResult.like_count}}</span>
    </div>
    <div class="markdown-content" v-html="articleDetailResult.content" :contenteditable="flag"></div>
</div>
</template>

<script>
import API from '../../api.config.js'

export default {
    data: function () {
        return {
            flag:false,
            articleDetail: {
                title: "哈哈哈哈哈哈哈",
                visit_count: "2",
                comment_count: "2",
                like_count: "1",
                content: "hello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello world"
            },
            articleDetailResult:{comment:[]}
        }
    },
    created(){
        if (this.$route.name.indexOf("Fix") !== -1) {
            this.flag = true;
        }else{
            this.flag = false;
        }
        this.axios.get(API+'/article/'+this.$route.params.aid).then((res)=>{
            this.articleDetailResult = res.data[0];
        });
    }
}
</script>

<style scoped>
.article-container {
    position: relative;
    color: #666;
    background-color: #fff;
    padding: 20px 50px;
    height: 1000px;
    text-align: left;
}
.article-save{
    position: absolute;
    top: 15px;
    right: 25px;
}

.article-container .title {
    margin-top: 20px;
    margin-bottom: 10px;
    word-break: break-all;
    font-size: 2.2em;
    font-weight: bold;
    line-height: 1.5;
}

.article-container .counts {
    margin: 20px 0;
}

.counts span {
    margin-right: 10px;
    font-size: 12px;
}
</style>
