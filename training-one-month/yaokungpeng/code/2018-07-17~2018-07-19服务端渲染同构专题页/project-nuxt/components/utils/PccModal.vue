<template>
<div class="course-modal-mask">
    <div v-if="type === 3" class="course-modal">
        <h2>是否确认删除</h2>
        <div><button @click="deleteCourse">确认</button><button @click="modalHide">取消</button></div>
    </div>
    <div v-else class="course-modal">
        <h2>{{type === 1 ? "增加信息" : "修改信息"}}</h2>
        <table>
            <tr>
                <td>排期</td>
                <td>
                    <input v-model="selectedItem.period" type="text" autofocus>
                </td>
            </tr>
            <tr>
                <td>课程名称</td>
                <td>
                    <input v-model="selectedItem.name" type="text">
                </td>
            </tr>
            <tr>
                <td>时间</td>
                <td>
                    <input v-model="selectedItem.date" type="date">
                    <input v-model="selectedItem.timeFrom" type="time" max="22:00" min="07:00" required> To
                    <input v-model="selectedItem.timeTo" type="time" max="22:00" min="07:00" required>
                </td>
            </tr>
            <tr>
                <td>主讲人</td>
                <td>
                    <input v-model="selectedItem.teacher" type="text">
                </td>
            </tr>
        </table>
        <div><button @click="modalHide">取消</button><button @click="type===1?addCourse():fixCourse()">保存</button></div>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
export default {
    name: "course-modal",
    methods: {
        ...mapActions('course',['modalHide','deleteCourse','fixCourse','addCourse'])
    },
    computed: {
        ...mapGetters('course', {
            type: "getModalType",
            selectedItem: "getSelectedItem"
        })
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
    background-color: rgba(0, 0, 0, 0.6);
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
