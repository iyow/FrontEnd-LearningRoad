<template>
<div class="outer">
        <div class="container">
            <PccHeader/>
            <NavBar/>
            <!-- <PccMain/> -->
            <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
                <nuxt/>
            </transition>
            <PccFooter/>
        </div>
  </div>
</template>

<script>
import PccHeader from "~/components/PccHeader";
import PccFooter from "~/components/PccFooter";
import NavBar from "~/components/NavBar";

export default {
    name: "App",
    components: {
        PccHeader,
        NavBar,
        PccFooter
    }
};
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

li {
    list-style: none;
}

img {
    vertical-align: top;
    border: none;
}

a {
    text-decoration: none;
    color: black;
}

.outer {
    width: 100%;
    padding: 0 25%;
}

.container {
    width: 100%;
    padding: 0 20px;
    padding-top: 50px;
}

.hollow-circle {
    transform: translateX(-10px) translateY(-5px);
    border: 2px solid red;
    border-radius: 50%;
    display: inline-block;
    width: 22px;
    height: 22px;
}

.animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

@keyframes zoomInLeft {
    from {
        opacity: 0;
        -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
        transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
        -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    60% {
        opacity: 1;
        -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
        transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
        -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    }
}

.zoomInLeft {
    -webkit-animation-name: zoomInLeft;
    animation-name: zoomInLeft;
}

@keyframes zoomOutRight {
    40% {
        opacity: 1;
        -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);
        transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);
    }
    to {
        opacity: 0;
        -webkit-transform: scale(0.1) translate3d(2000px, 0, 0);
        transform: scale(0.1) translate3d(2000px, 0, 0);
        -webkit-transform-origin: right center;
        transform-origin: right center;
    }
}

.zoomOutRight {
    -webkit-animation-name: zoomOutRight;
    animation-name: zoomOutRight;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.fadeOut {
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
}
</style>
