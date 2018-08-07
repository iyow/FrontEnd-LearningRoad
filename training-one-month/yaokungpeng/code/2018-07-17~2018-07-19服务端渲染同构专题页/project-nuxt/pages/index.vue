<template>

</template>

<script>
    export default{
        created:function () {
            // 此处不可用箭头函数
            console.log(this);
            this.$router.push('/why');  //首先显示why页面
        }
    }
</script>

<style>
</style>
