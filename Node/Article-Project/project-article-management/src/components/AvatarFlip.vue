<template>
<div class="flip-container">
    <div class="flipper">
        <div class="front">
        </div>
        <div class="back">
        </div>
    </div>
</div>
</template>

<style scoped>
.flip-container {
    perspective: 1000px;
}

.flip-container:hover .flipper {
    transform: rotateY(-180deg);
}

.flip-container,
.front,
.back {
    width: 50px;
    height: 50px;
}

.flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
}

.front {
    background-image: url(/static/avatar.jpg);
}

.back {
    background-image: url(/static/smile.jpg);
    transform: rotateY(180deg);
}

.front,
.back {
    position: absolute;
    border-radius: 50%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>
