<template>
<div class="article-box">
    <article-content/>
    <prenext/>
    <comment :comment="info.comment" />
    <scrolltop/>
</div>
</template>

<script>
import ArticleContent from "./content"
import Comment from './comment'
import Prenext from './prenext'
import Scrolltop from '../Scrolltop'

export default {
    name: 'Article',
    data() {
        return {
            info: []
        }
    },
    components: {
        ArticleContent,
        Comment,
        Prenext,
        Scrolltop
    },
    created: function () {
        window.scrollTo(0, 0);

    }
}
</script>

<style scoped>
.article-box {
    width: 80%;
    margin: 0 auto;
    padding-top: 50px;
    min-height: 400px;
}
</style>
