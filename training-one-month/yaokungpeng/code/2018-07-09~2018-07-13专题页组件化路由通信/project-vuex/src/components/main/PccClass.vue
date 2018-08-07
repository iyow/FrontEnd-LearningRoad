<template>
<div class="course-arrange">
    <pcc-title flag="0" title-content="课程安排" />
    <pcc-course-arrange/>
</div>
</template>

<script>
import PccTitle from "./utils/PccTitle";
import PccCourseArrange from "./utils/PccCourseArrange";
export default {
    name: "PccClass",
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
