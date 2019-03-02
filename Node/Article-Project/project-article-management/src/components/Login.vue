<template>
<div class="login-container">
    <div class="login-wrap" v-show="showLogin">
        <h3>登录</h3>
        <p v-show="showHint">{{hint}}</p>
        <input type="text" placeholder="请输入用户名" v-model="username">
        <input type="password" placeholder="请输入密码" v-model="password">
        <button @click="login">登录</button>
        <span @click="ToRegister">没有账号？马上注册</span>
    </div>

    <div class="login-wrap" v-show="showRegister">
        <h3>注册</h3>
        <p v-show="showHint">{{hint}}</p>
        <input type="text" placeholder="请输入用户名" v-model="newUsername">
        <input type="password" placeholder="请输入密码" v-model="newPassword">
        <button @click="register">注册</button>
        <span @click="ToLogin">已有账号？马上登录</span>
    </div>
</div>
</template>

<script>
export default {
    name: "Login",
    data: function () {
        return {
            showLogin: true,
            showRegister: false,
            showHint: false,
            hint: '',
            username: '',
            password: '',
            newUsername: '',
            newPassword: ''
        }
    },
    methods: {
        login() {
            if (!(this.username && this.password)) {
                this.showHint = true;
                this.hint = "请输入用户名及密码";
            } else {
                this.showHint = false;
                this.hint = "";
                this.username = "";
                this.password = "";
            }
        },
        ToRegister() {
            this.showLogin = false;
            this.showRegister = true;
            this.showHint = false;
        },
        register() {
            if (!(this.newUsername && this.newPassword)) {
                this.showHint = true;
                this.hint = "请输入用户名及密码";
            } else {
                this.showHint = false;
                this.hint = "";
                this.newUsername = "";
                this.newPassword = "";
            }
        },
        ToLogin() {
            this.showRegister = false;
            this.showLogin = true;
            this.showHint = false;
        }
    }
}
</script>

<style scoped>
.login-container {
    margin-top: 250px;
}

.login-wrap {
    text-align: center;
}

.login-wrap h3 {
    margin: 10px;
}

.login-wrap input {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #888;
    padding: 10px;
    box-sizing: border-box;
}

.login-wrap p {
    margin: 10px;
    color: red;
}

.login-wrap button {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    border: none;
    background-color: #41b883;
    color: #fff;
    font-size: 16px;
    margin-bottom: 5px;
}

.login-wrap span {
    cursor: pointer;
}

.login-wrap span:hover {
    color: #41b883;
}
</style>
