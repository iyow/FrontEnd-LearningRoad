<template>
<div class="course-arrange">
    <pcc-title flag="0" title-content="课程安排" />
    <pcc-course-arrange/>
    <!-- <pcc-course-arrange :courseInfos="courseInfos" /> -->
</div>
</template>

<script>
import PccTitle from "./utils/PccTitle";
import PccCourseArrange from "./utils/PccCourseArrange";
export default {
    name: "PccClass",
    data() {
        return {
            courseInfos: [{
                    schedule: "一期",
                    courseName: ["从寓言故事读文言文", "从神话故事读文言文", "从历史故事读文言文"],
                    courseTime: [
                        "7月1日 18:30-21:00",
                        "7月2日 18:30-21:00",
                        "7月3日 18:30-21:00"
                    ],
                    courseTeacher: "于晴"
                },
                {
                    schedule: "二期",
                    courseName: ["从寓言故事读文言文", "从神话故事读文言文", "从历史故事读文言文"],
                    courseTime: [
                        "7月4日 18:30-21:00",
                        "7月5日 18:30-21:00",
                        "7月6日 18:30-21:00"
                    ],
                    courseTeacher: "杨蕴天"
                }
            ]
        }
    },
    components: {
        PccTitle,
        PccCourseArrange
    }
};
</script>

<style>
.course-arrange {
    margin-top: 50px;
}

.course-arrange table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}

.course-arrange table tr th {
    color: white;
    background-color: red;
    height: 70px;
}

.course-arrange table tr td {
    border-top: 1px solid red;
    border-left: 1px solid red;
    padding: 10px;
}

.course-arrange table tr td:nth-of-type(1) {
    border-left: 0;
}

.course-arrange table tr td a {
    color: red;
}

.course-arrange table tr td:nth-of-type(5) {
    background-color: #ffc80d;
}
</style>
