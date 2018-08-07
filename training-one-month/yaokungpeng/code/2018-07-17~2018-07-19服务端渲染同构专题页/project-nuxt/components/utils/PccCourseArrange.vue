<template>
<div>
    <div class="nav">
        <div class="searchBox">
            <span>查询条件</span>
            <select name="searchRule" v-model="searchInfo.searchRule">
                <option disabled value="">请选择</option>
                <option value="1">排期/主讲人</option>
                <option value="2">课程名称/日期</option>
            </select>
        </div>
        <input v-model="searchInfo.searchText" type="text" placeholder="请输入查询内容">
        <a href="javascript:;" @click="modalShow({type:1})">增加</a>
    </div>
    <div class="outer-table-round">
        <table>
            <thead>
                <tr>
                    <th>排期</th>
                    <th>课程名称</th>
                    <th>时间</th>
                    <th>主讲人</th>
                    <th>点击购买</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(info,index) in courseResult">
                    <template v-for="(item, tIndex) in info.course">
                        <tr>
                            <td v-show="tIndex === 0" :rowspan="info.course.length">{{info.period}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.time}}</td>
                            <td v-show="tIndex === 0" :rowspan="info.course.length">{{info.teacher}}</td>
                            <td v-show="tIndex === 0" :rowspan="info.course.length">
                                <a href="javascript:;">点击购买</a>
                            </td>
                            <td>
                                <a href="javascript:;" @click="modalShow({type:2,whichPeriod:index,whichCourse:tIndex})">修改</a>
                                <a href="javascript:;" @click="modalShow({type:3,whichPeriod:index,whichCourse:tIndex})">删除</a>
                            </td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <pcc-modal v-show="modalFlag"/>
    </transition>
</div>
</template>

<script>
import PccModal from "./PccModal";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PccCourseArrange",
  components: {
    PccModal
  },
  methods: {
    ...mapActions("course", ["modalShow","deleteCourse"])
  },
  computed: {
    ...mapGetters("course", {
      modalFlag: "getModalFlag",
      courseInfos: "getCourseInfos",
      searchInfo: "getSearchInfo",
      courseResult: "getCourseInfoResult"
    })
  }
};
</script>

<style>
.outer-table-round {
  overflow: hidden;
  border: 1px solid red;
  border-radius: 10px;
  margin: 10px auto;
}

.searchBox {
  padding-top: 5px;
}
</style>
