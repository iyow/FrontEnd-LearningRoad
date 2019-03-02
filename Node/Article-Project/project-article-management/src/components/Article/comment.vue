<template>
<div class="comment-container">
    <div class="comment-head">
        <span>{{ commentResult.length || 0 }}条评论</span>
        <a href="javascript:;" @click.prevent="goComment">添加新评论</a>
    </div>
    <div id="comment_list">
        <div class="comment-item" v-for="(comment,i) in commentResult" :key="i">
            <div class="content">
                <div class="meta-top">
                    <a class="avatar"><img :src="comment.avatar" alt="avatar"></a>
                    <span class="author-name">{{comment.nickname}}</span>
                    <span class="reply-time">{{comment.created_time}}</span>
                </div>
                <p class="comment-content">{{comment.content}}</p>
                <div class="comment-footer text-right">
                    <a class="reply" href="javascript:;">回复</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import API from '../../api.config.js'

export default {
    name: "comment",
    data: function () {
        return {
            commentList: [{
                    user_id: {
                        avatar: "",
                        nickname: "ykp",

                    },
                    created: "2018.2.2",
                    content: "asdsdaas"
                },
                {
                    user_id: {
                        avatar: "",
                        nickname: "ykp",

                    },
                    created: "2018.2.2",
                    content: "asdsdaas"
                },
                {
                    user_id: {
                        avatar: "",
                        nickname: "ykp",
                    },
                    created: "2018.2.2",
                    content: "asdsdaas"
                }
            ],
            commentResult:[]
        }
    },
    created(){
        this.axios.get(API+'/article/'+this.$route.params.aid).then((res)=>{
            this.commentResult = res.data[0].comment;
        });
    }
}
</script>

<style scoped>
.comment-container {
    background-color: #fff;
    color: #666;
    margin-bottom: 30px;
    padding: 20px;
    font-size: 13px;
    text-align: left;
    user-select: none;
}

.comment-container .comment-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    padding: 0 20px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: #d9d9d9;
    line-height: 50px;
}

.comment-item {
    margin-bottom: 20px;
    padding: 0 20px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: #d9d9d9;
    font-size: 16px;
    line-height: 1.5;
}

.comment-item .meta-top {
    padding-top: 10px;
    margin: 0 0 10px;
}

.comment-item .meta-top .avatar {
    width: 35px;
    height: 35px;
    float: left;
    margin-right: 20px;
    line-height: 1%;
    cursor: pointer;
}

.comment-item .meta-top .author-name {
    display: block;
    line-height: 1.1;
    font-size: 14px;
}

.comment-item .meta-top .reply-time {
    font-size: 12px;
}

.comment-item .comment-content {
    word-break: break-all;
    word-wrap: break-word;
    margin-bottom: 10px;
    user-select: text;
}

.comment-item .comment-footer {
    text-align: right;
    margin-bottom: 10px;
}
</style>
