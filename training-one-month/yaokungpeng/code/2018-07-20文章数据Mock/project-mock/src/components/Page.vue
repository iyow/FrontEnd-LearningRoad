<template>
<div>
    <h2>Page List</h2>
    <div class="page-all-list">
        <div v-for="(value,index) in userPages[userID]" class="page-item" :key="index">
            <span><router-link :to="'/blog/'+userID+'/'+index" >{{value.title}}</router-link></span>
            <br>
            <span>作者：{{value.author}}</span>
            <span>时间：{{value.date}}</span>
        </div>
    </div>
    <h2>Page Content</h2>
    <div class="page-content">
        <h1><img :src="userPages[userID][pageID].avatar" alt=""><span>{{ userPages[userID][pageID].title }}</span></h1>
        <div>
            <p>作者：{{ userPages[userID][pageID].author }}</p>
            <p>{{ userPages[userID][pageID].date}}</p>
        </div>
        <p>{{ userPages[userID][pageID].content}}</p>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapActions
} from "vuex";
export default {
    name: "Page",
    computed: {
        userID(){
            return this.$route.params.userid;
        },
        pageID(){
            return this.$route.params.pageid;
        },
        ...mapState({
            userPages: 'allPages'
        })
    },
    methods: {
        ...mapActions({
            getAllPages: 'reqAllPages'
        })
    },
    created: function () {
        console.log(this.$router);
        console.log(this.$route);
        
        console.log(this.userID);
        console.log(this.pageID);

        console.log(this.$route.params.userid);
        console.log(this.$route.params.pageid);
        console.log(this.$route.params);
        // VUE的methods里面的函数不能使用箭头函数
        // VUE的methods对象里面如果函数使用箭头函数会导致this指向的不是vue实例$vm,
        // 而是一个xxxx.a的一个类，尽量不要再VUE所定义的字段里面使用箭头函数
        this.getAllPages();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

img {
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.page-all-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.page-item {
    width: 18%;
    border: 1px solid aquamarine;
    margin: 10px;
    /* flex-grow: 1; */
}
</style>
