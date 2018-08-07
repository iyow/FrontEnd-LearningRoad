<template>
<div class="course-modal-mask">
    <div v-if="type === 3" class="course-modal">
        <h2>是否确认删除</h2>
        <div><button @click="$emit('course-delete');">确认</button><button @click="modalHide">取消</button></div>
    </div>
    <div v-else class="course-modal">
        <h2>{{type === 1 ? "增加信息" : "修改信息"}}</h2>
        <table>
            <tr>
                <td>排期</td>
                <td>
                    <input v-if="type === 1" v-model="schedule" type="text" autofocus>
                    <input v-else v-model="fixinfo.schedule" type="text" autofocus>
                </td>
            </tr>
            <tr>
                <td>课程名称</td>
                <td>
                    <input v-if="type === 1" v-model="courseName" type="text">
                    <input v-else v-model="fixinfo.courseName" type="text">
                </td>
            </tr>
            <tr>
                <td>时间</td>
                <td v-if="type === 1">
                    <input v-model="courseD" type="date">
                    <input v-model="courseTF" type="time" max="22:00" min="07:00" required> To
                    <input v-model="courseTT" type="time" max="22:00" min="07:00" required>
                </td>
                <td v-else>
                    <input v-model="fixinfo.courseD" type="date">
                    <input v-model="fixinfo.courseTF" type="time" max="22:00" min="07:00" required> To
                    <input v-model="fixinfo.courseTT" type="time" max="22:00" min="07:00" required>
                </td>
            </tr>
            <tr>
                <td>主讲人</td>
                <td>
                    <input v-if="type === 1" v-model="courseTeacher" type="text">
                    <input v-else v-model="fixinfo.courseTeacher" type="text">
                </td>
            </tr>
        </table>
        <div><button @click="modalHide">取消</button><button @click="type===1?courseInfoSave():courseInfoFix()">保存</button></div>
    </div>
</div>
</template>

<script>
export default {
    name: "course-modal",
    props: ['type', 'fixinfo'],
    data() {
        return {
            schedule: "",
            courseName: "",
            courseD: "",
            courseTF: "",
            courseTT: "",
            courseTime: "",
            courseTeacher: ""
        }
    },
    methods: {
        modalHide() {
            this.$emit("modal-hide");
        },
        courseInfoSave() {
            if (!(this.schedule && this.courseName && this.courseD && this.courseTF && this.courseTT && this.courseTeacher)) {
                alert("请输入完整信息");
                return false;
            }
            console.log(this.courseD);
            this.courseTime = this.timeFormate(this.courseD,this.courseTF,this.courseTT);
            this.$emit("course-add", {
                schedule: this.schedule,
                courseName: [this.courseName],
                courseTime: [this.courseTime],
                courseTeacher: this.courseTeacher
            })
        },
        courseInfoFix() {
            console.log(this.fixinfo);
            this.$emit("course-fix", {
                schedule: this.fixinfo.schedule,
                courseName: this.fixinfo.courseName,
                courseTime: this.timeFormate(this.fixinfo.courseD,this.fixinfo.courseTF,this.fixinfo.courseTT),
                courseTeacher: this.fixinfo.courseTeacher
            });
        },
        timeFormate(date,timeFrom,timeTo) {
            let dateTemp = date.split('-');
            let fTime = timeFrom.split(':');
            let tTime = timeTo.split(':');
            return `${parseInt(dateTemp[1])}月${parseInt(dateTemp[2])}日 ${parseInt(fTime[0])}:${fTime[1]}-${parseInt(tTime[0])}:${tTime[1]}`;
        }
    }
};
</script>

<style scoped>
.course-modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    z-index: 999;
}

.course-modal {
    position: absolute;
    width: 570px;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    padding: 20px;
    background-color: rgb(241, 117, 113);
    color: white;
    border-radius: 20px;
}

.course-modal div,
.course-modal h2 {
    text-align: center;
}

.course-modal table {
    border: 1px solid white;
}

.course-modal table td {
    border: 1px solid white;
}

.course-modal table td:last-of-type {
    display: flex;
    justify-content: space-between;
}

.course-modal table input {
    margin: 0 20px;
    flex-grow: 1;
}

.course-modal button {
    width: 50px;
    background-color: skyblue;
    margin: 5px;
}
</style>
