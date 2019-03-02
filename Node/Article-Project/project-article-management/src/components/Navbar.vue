<template>
<div class="navbar-box navbar-skin">
    <div class="navbar-menu">
        <router-link :to="{ path: '/' }" class="navbar-item">
            <avatar-flip/>
        </router-link>
        <router-link :to="{ path: '/ykp',activeClass: 'active'}" class="navbar-item" active-class="active">i.yow</router-link>
    </div>
    <div class="navbar-expanded">
        <router-link :to="{ path: '/write',activeClass: 'active'}" class="navbar-item" active-class="active">Write</router-link>
        <a href="" class="navbar-item">Dark</a>
        <router-link :to="{ path: '/login',activeClass: 'active'}" class="navbar-item" active-class="active">Login</router-link>
    </div>
</div>
</template>

<script>
import AvatarFlip from '@/components/AvatarFlip'
export default {
    name: "Navbar",
    components: {
        AvatarFlip
    }
};
</script>

<style scoped>
.navbar-box {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 50px;
    opacity: 0.8;
}
.navbar-box:hover{
    opacity: 1;
}

.navbar-box .navbar-expanded {
    position: absolute;
    right: 0;
    margin-right: 5px;
}

@media (min-width: 768px) {
    .navbar-skin {
        background: #2a2a2a;
        box-shadow: none;
    }
    .navbar-box {
        width: 50px;
        height: 100%;
    }
    .navbar-box .navbar-expanded {
        position: absolute;
        bottom: 0;
        width: 100%;
        margin: 0;
        margin-bottom: 5px;
    }
    .navbar-item {
        border-radius: 50%;
        margin: 5px auto;
        color: white;
    }
}

@media (max-width: 767px) {
    .navbar-skin {
        background-color: white;
        box-shadow: 0 1px 4px #eee;
        padding: 5px 0;
    }
}

.navbar-item {
    float: left;
    width: 50px;
    height: 50px;
    line-height: 50px;
}
.navbar-item:hover:not(.active){
    color: #f49484;
}

.navbar-menu img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
}
</style>
