<template>
<div id="app">
    <Navbar></Navbar>
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <router-view></router-view>
    </transition>
</div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
    name: 'App',
    components: {
        Navbar
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    height: 100%;
    width: 100%;
    padding-left: 25px;
    box-sizing: border-box;
}

html,
body {
    height: 100%;
}

body {
    background-image: url(/static/1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    overflow-x: hidden;
}

* {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
}

img {
    border: 0;
    vertical-align: middle;
}

button {
    cursor: pointer;
}

a {
    text-decoration: none;
    color: #666;
    cursor: pointer;
}

a:hover:not(.active) {
    color: #f49484;
}

.active {
    background-color: #f49484;
}

.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

.fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
}

@keyframes fadeOutDown {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
}

.fadeOutDown {
    -webkit-animation-name: fadeOutDown;
    animation-name: fadeOutDown;
}

::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
}
</style>
