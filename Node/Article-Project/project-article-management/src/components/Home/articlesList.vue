<template>
<div class="article-list">
    <ul>
        <li class="article-item" v-for="(article,index) in articlesListResult" :key="index">
            <div class="article-info">
                <p class="item-top">
                    <span class="time">{{ article.publish_time}}</span>
                </p>
                <h4 class="item-title">
                    <router-link :to="'/article/'+article._id">{{article.title}}</router-link>
                </h4>
                <div class="item-footer">
                    <span>阅读 {{article.visit_count}}</span>
                    <span> · 评论 {{article.comment.length}}</span>
                    <span> · 喜欢 {{article.like_count}}</span>
                </div>
            </div>

            <div class="article-img">
                <router-link :to="'/article/'+article._id">
                    <img src="/static/avatar.jpg">
                </router-link>
            </div>

            <div class="article-control">
                <router-link :to="'/articlefix/'+article._id">修改</router-link>
                <a @click="deleteArticle(article._id)">删除</a>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import API from '../../api.config.js'

export default {
    name: 'articlesList',
    data: function () {
        return {
            articleList: [{
                publish_time: "2018-1-1",
                title: "docker 实践杂记",
                visit_count: "5",
                comment_count: "6",
                like_count: "111"
            }, {
                publish_time: "2018-1-1",
                title: "使用docker一键启动jackblog的所有版本",
                visit_count: "5",
                comment_count: "6",
                like_count: "111"
            }, {
                publish_time: "2018-1-1",
                title: "hello wolrd",
                visit_count: "5",
                comment_count: "6",
                like_count: "111"
            }, {
                publish_time: "2018-1-1",
                title: "hello wolrd",
                visit_count: "5",
                comment_count: "6",
                like_count: "111"
            }],
            articlesListResult: []
        }
    },
    methods: {
        deleteArticle(id) {

            this.axios.get(API + '/delete/' + id).then((res) => {
                if (res.data) {
                    this.articlesListResult.forEach((article, index) => {
                        if (article._id === id) {
                            this.articlesListResult.splice(index, 1);
                            alert("删除成功");
                        }
                    });
                }else{
                    alert("删除失败");
                }
            });
        }
    },
    created: function () {
        this.axios.get(API + '/getarticles').then((res) => {
            this.articlesListResult = res.data;
        });
    }
}
</script>

<style scoped>
.article-list {
    margin: 10px 0;
    padding: 20px 15px;
    background-color: #fff;
    color: #666;
}

.article-list .article-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 17px;
    margin-bottom: 17px;
    border-bottom-width: 1px;
    border-bottom-style: dashed;
    word-wrap: break-word;
    line-height: 1.5em;
}

.article-list .article-info {
    width: 100%;
    text-align: left;
}

.article-list .article-img a img {
    width: 100px;
    height: 100px;
}

.article-item .item-top {
    margin: 8px 0;
    font-size: 12px;
}

.article-item .item-title {
    margin: 10px;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.5;
}

.article-item .item-title a:hover {
    font-size: 20px;
    font-weight: 900;
}

.article-item .item-title a {
    color: #555;
}

.article-item .item-footer {
    font-size: 12px;
    line-height: 1.5;
}

.article-item .article-control {
    position: absolute;
    top: -17px;
    right: 110px;
    font-size: 13px;
}

.article-item .article-control a {
    margin: 0 5px;
}
</style>
