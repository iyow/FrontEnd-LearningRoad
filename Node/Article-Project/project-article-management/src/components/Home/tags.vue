<template>
<div class="tags-container">
    <ul class="sort-tags">
        <li v-for="(tag,index) in tagList" :key="index">
            <a :class="{'active':(index == selectedIndex)}" @click.prevent="changeTag(index)" href="javascript:;">{{tag}}</a>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            selectedIndex: 0,
            tagList: ['All','nodejs', 'javascript', 'html', 'css', 'mongo', 'python']
        }
    },
    methods: {
        changeTag(tagId) {
            this.selectedIndex = tagId;
        }
    }
}
</script>

<style scoped>
.sort-tags {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
}

ul.sort-tags li {
    margin: 10px 20px 10px 0;
}

ul.sort-tags li a {
    padding: 6px 15px;
    border: 1px solid rgb(182, 179, 179);
    color: white;
    border-radius: 14px;
    font-size: 12px;
}

ul.sort-tags li a:hover:not(.active) {
    font-size: 16px;
    color: #f49484;
}
</style>
