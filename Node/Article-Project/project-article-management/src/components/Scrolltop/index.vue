<template>
<div v-show="isShowTop" class="gotop" @click.prevent="gotop">
    <span>回到顶部</span>
</div>
</template>

<script>
export default {
    data() {
        return {
            isShowTop: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {
            if (window.scrollY > 200) {
                this.isShowTop = true
            } else {
                this.isShowTop = false
            }
        },
        gotop() {
            window.requestAnimationFrame(function fn() {
                let oTop = document.body.scrollTop || document.documentElement.scrollTop;
                if (oTop > 0) {
                    window.scrollTo(0, oTop - 50);
                    window.requestAnimationFrame(fn);
                }
            });
        }
    }
}
</script>

<style scoped>
.gotop {
    position: fixed;
    right: 2%;
    bottom: 5px;
    width: 40px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    /* transition: all ease-in-out 1s; */
}
</style>
