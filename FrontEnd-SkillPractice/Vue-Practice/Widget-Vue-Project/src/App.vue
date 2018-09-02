<template>
<div id="app">
    <router-view/>
</div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
// reset styles
body, div,fieldset,legend, span, header, footer, nav, section, aside, article, ul,li, dl, dt, dd, li, a, p, h1, h2, h3, h4,h5, h6, i, b,  figure, figcaption,p {
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    border: 0;
    box-sizing: border-box;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    &:focus {
        outline: none;
    }
}
textarea, button, input, select{
    &:focus {
        outline: none;
    }
}
</style>
