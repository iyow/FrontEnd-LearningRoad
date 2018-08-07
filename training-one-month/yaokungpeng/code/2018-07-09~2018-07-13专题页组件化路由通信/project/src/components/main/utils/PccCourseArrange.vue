<template>
<div>
    <div class="nav">
        <div class="searchBox">
            <span>查询条件</span>
            <select name="searchRule" v-model="searchRule">
                <option disabled value="">请选择</option>
                <option value="1">排期/主讲人</option>
                <option value="2">课程名称/日期</option>
            </select>
        </div>
        <input v-model="searchText" type="text" placeholder="请输入查询内容">
        <a href="javascript:;" @click="modalToggle(1)">增加</a>
    </div>
    <div class="outer-table-round">
        <table>
            <tr>
                <th>排期</th>
                <th>课程名称</th>
                <th>时间</th>
                <th>主讲人</th>
                <th>点击购买</th>
                <th>操作</th>
            </tr>
            <template v-for="(info,index) in courseResult">
                <template v-for="(time, tIndex) in info.courseTime">
                    <tr>
                        <td v-show="tIndex === 0" :rowspan="info.courseTime.length">{{info.schedule}}</td>
                        <td>{{info.courseName[tIndex]}}</td>
                        <td>{{info.courseTime[tIndex]}}</td>
                        <td v-show="tIndex === 0" :rowspan="info.courseTime.length">{{info.courseTeacher}}</td>
                        <td v-show="tIndex === 0" :rowspan="info.courseTime.length">
                            <a href="javascript:;">点击购买</a>
                        </td>
                        <td>
                            <a href="javascript:;" @click="modalToggle(2,index,tIndex)">修改</a>
                            <a href="javascript:;" @click="modalToggle(3,index,tIndex)">删除</a>
                        </td>
                    </tr>
                </template>
            </template>
        </table>
    </div>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <pcc-modal v-show="modalFlag" :type="type" :fixinfo="fixInfo" @modal-hide="modalToggle" @course-add="courseAdd" @course-fix="courseFix" @course-delete="courseDelete" />
    </transition>
</div>
</template>

<script>
import PccModal from "./PccModal";
export default {
    name: "PccCourseArrange",
    props: ["courseInfos"],
    components: {
        PccModal
    },
    data: function () {
        return {
            modalFlag: 0,
            whichSchedule: 0,
            whichLine: 0,
            type: 0,
            searchRule: "",
            searchText: "",
            fixInfo: {
                schedule: "",
                courseName: "",
                courseD: "",
                courseTF: "",
                courseTT: "",
                courseTime: "",
                courseTeacher: ""
            },
            infos: [{
                    schedule: "一期",
                    courseName: [
                        "从寓言故事读文言文",
                        "从神话故事读文言文",
                        "从历史故事读文言文"
                    ],
                    courseTime: [
                        "7月1日 18:30-21:00",
                        "7月2日 18:30-21:00",
                        "7月3日 18:30-21:00"
                    ],
                    courseTeacher: "于晴"
                },
                {
                    schedule: "二期",
                    courseName: [
                        "从寓言故事读文言文",
                        "从神话故事读文言文",
                        "从历史故事读文言文"
                    ],
                    courseTime: [
                        "7月4日 18:30-21:00",
                        "7月5日 18:30-21:00",
                        "7月6日 18:30-21:00"
                    ],
                    courseTeacher: "杨蕴天"
                },
                {
                    schedule: "三期",
                    courseName: [
                        "从寓言故事读文言文",
                        "从神话故事读文言文",
                        "从历史故事读文言文"
                    ],
                    courseTime: [
                        "7月7日 18:30-21:00",
                        "7月8日 18:30-21:00",
                        "7月9日 18:30-21:00"
                    ],
                    courseTeacher: "潘欢欢"
                },
                {
                    schedule: "四期",
                    courseName: [
                        "从寓言故事读文言文",
                        "从神话故事读文言文",
                        "从历史故事读文言文"
                    ],
                    courseTime: [
                        "7月10日 18:30-21:00",
                        "7月11日 18:30-21:00",
                        "7月12日 18:30-21:00"
                    ],
                    courseTeacher: "刘梦瑶"
                }
            ]
        };
    },
    methods: {
        modalToggle(myType, whichSchedule, whichLine) {
            this.modalFlag = !this.modalFlag;
            this.type = myType || this.type;
            if (myType === 2 || myType === 3) {
                this.whichSchedule = whichSchedule;
                this.whichLine = whichLine;
                if (
                    myType === 2 &&
                    !(whichSchedule === undefined) &&
                    !(whichLine === undefined)
                ) {
                    this.fixInfo.schedule = this.infos[whichSchedule].schedule || "";
                    let dateTemp = this.infos[whichSchedule].courseTime[whichLine].split(
                        " "
                    );
                    let timeTemp = dateTemp[1].split("-");
                    let regExp = /(\d+)月(\d+)日/g;
                    let fromTo = regExp.exec(dateTemp[0]);
                    this.fixInfo.courseName =
                        this.infos[whichSchedule].courseName[whichLine] || "";
                    this.fixInfo.courseD = `${new Date().getFullYear()}-${
            fromTo[1].length > 1 ? fromTo[1] : "0" + fromTo[1]
          }-${fromTo[2].length > 1 ? fromTo[2] : "0" + fromTo[2]}`;
                    this.fixInfo.courseTF = timeTemp[0] || "";
                    this.fixInfo.courseTT = timeTemp[1] || "";
                    this.fixInfo.courseTeacher =
                        this.infos[whichSchedule].courseTeacher || "";
                    console.log(this.fixInfo);
                }
            }
        },
        courseAdd(classInfo) {
            this.modalFlag = !this.modalFlag;
            console.log(classInfo);
            if (!classInfo) {
                return;
            }
            console.log(classInfo);
            for (let index = 0; index < this.infos.length; index++) {
                if (this.infos[index].schedule === classInfo.schedule) {
                    this.infos[index].courseName.push(...classInfo.courseName);
                    this.infos[index].courseTime.push(...classInfo.courseTime);
                    break;
                }
                if (index === this.infos.length - 1) {
                    this.infos.push(classInfo);
                    break;
                }
            }
        },
        courseDelete() {
            this.modalFlag = !this.modalFlag;
            console.log("delete " + this.whichSchedule);
            console.log("delete " + this.whichLine);
            this.infos[this.whichSchedule].courseTime.splice(this.whichLine, 1);
            this.infos[this.whichSchedule].courseName.splice(this.whichLine, 1);
        },
        courseFix(classInfo) {
            console.log(classInfo);
            this.modalFlag = !this.modalFlag;
            this.infos[this.whichSchedule].schedule = classInfo.schedule;
            this.infos[this.whichSchedule].courseName[this.whichLine] =
                classInfo.courseName;
            this.infos[this.whichSchedule].courseTime[this.whichLine] =
                classInfo.courseTime;
            this.infos[this.whichSchedule].courseTeacher = classInfo.courseTeacher;
        }
    },
    computed: {
        courseResult() {
            if (this.searchText && this.searchRule) {
                console.log(this.searchText);
                let result;
                let _obj = this.infos;
                let objTemp = JSON.stringify(this.infos);
                result = JSON.parse(objTemp);
                if (parseInt(this.searchRule) === 1) {
                    result = this.infos.filter((info, index) => {
                        return (
                            info.schedule.indexOf(this.searchText) !== -1 ||
                            info.courseTeacher.indexOf(this.searchText) !== -1
                        );
                    });
                } else {
                    // 删除数组时动态改变index以防删除时会出现错误
                    for (
                        let scheduleIndex = 0; scheduleIndex < result.length; scheduleIndex++
                    ) {
                        for (
                            let lineIndex = 0; lineIndex < result[scheduleIndex].courseTime.length; lineIndex++
                        ) {
                            // 同时没有匹配就删除该项
                            if (!(
                                    result[scheduleIndex].courseName[lineIndex].indexOf(
                                        this.searchText
                                    ) !== -1 ||
                                    result[scheduleIndex].courseTime[lineIndex].indexOf(
                                        this.searchText
                                    ) !== -1
                                )) {
                                result[scheduleIndex].courseName.splice(lineIndex, 1);
                                result[scheduleIndex].courseTime.splice(lineIndex, 1);
                                lineIndex--;
                            }
                        }
                    }
                    return result;
                }
                return result;
            }
            return this.infos;
        }
    },
    mounted() {
        this.infos = this.courseInfos || this.infos;
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
