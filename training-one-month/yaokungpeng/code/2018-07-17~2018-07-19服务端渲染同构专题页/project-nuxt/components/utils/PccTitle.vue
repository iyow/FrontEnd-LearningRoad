<template>
    <h2 class="title">
        <span v-if="!parseInt(flag)" class="hollow-circle"></span>
        <!-- assets下的文件会被webpack压缩改名而vue操作在其之后所以需要将文件放在static目录 -->
        <img v-else :src="parseInt(flag)===1?'/问号.png':'/句号.png'" alt="">{{titleContent}}
    </h2>
</template>

<script>
export default {
  name: "PccTitle",
  props: ["flag", "titleContent"]
};
</script>

<style>
.title {
  font-size: 2rem;
  text-align: center;
}

.title img {
  width: 50px;
  padding-right: 10px;
}
</style>
