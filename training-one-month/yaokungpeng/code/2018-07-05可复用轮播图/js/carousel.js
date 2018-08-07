var i = 0
var carouselInner = document.querySelector('.carousel-inner');
var left = document.querySelector('#carousel-left');
var right = document.querySelector('#carousel-right');
var images = document.querySelectorAll('.item');
var carouselDot = document.querySelector('.carousel-dots');

images[0].classList.add('active');
initDots();

var animateStartTimer;
var animateEndTimer;
var loopTimer;


// 监听左箭头
left.addEventListener('click', preMove);
// 监听右箭头
right.addEventListener('click', nextMove);
// 鼠标进入轮播图清除循环播放
carouselInner.addEventListener('mouseover', () => {
    clearInterval(loopTimer);
});



// 初始化指示器
function initDots() {
    let num = images.length;
    let temp = '';

    for (let t = 0; t < num; t++) {
        if (t === 0) {
            temp = `<li class="active"></li>`;
        } else {
            temp = temp + `<li></li>`;
        }
    }
    carouselDot.innerHTML = temp;
}

// 循环播放
function loopPlay() {
    loopTimer = setInterval(() => {
        nextMove();
    }, 3000);
}
loopPlay();


// 控制向右滑动
function nextMove(e) {
    clearTimeout(animateStartTimer);
    clearInterval(animateStartTimer);
    let preCurrent = i;

    // 清除最后一张图片到第一张时添加的最大层级
    if (images[preCurrent].className.indexOf("max")) {
        images[preCurrent].classList.replace('max', 'next');
    }

    if (++i >= images.length) {
        i = 0;
        images[i].classList.add('right');
        images[i].classList.add('max');
    } else {
        images[i].classList.add('right');
        images[i].classList.add('next');
    }

    changeDots();
    // 触发动画
    animateStartTimer = setTimeout(() => {
        images[i].style.left = 0;
    }, 10);

    // 动画结束
    animateEndTimer = setTimeout(() => {
        images[preCurrent].classList.remove('next');
        images.forEach((value, index) => {
            value.classList.remove('active');
        });
        images[i].classList.remove('right');
        images[i].style = '';
    }, 1000);
}

// 控制向左滑动
function preMove(e) {
    clearTimeout(animateStartTimer);
    clearInterval(animateStartTimer);
    let preCurrent = i;

    if (images[preCurrent].className.indexOf("max")) {
        images[preCurrent].classList.replace('max', 'next');
    }

    --i < 0 ? i = images.length - 1 : i = i;
    images[i].classList.add('left');
    images[i].classList.add('pre');

    changeDots();
    // 触发动画
    setTimeout(() => {
        images[i].style.left = 0;
    }, 10);

    // 动画结束
    setTimeout(() => {
        images[preCurrent].classList.remove('next', 'max');
        images[i].classList.replace('pre', 'next');
        images.forEach((value, index) => {
            value.classList.remove('active');
        });
        images[i].classList.remove('left');
        images[i].style = '';

    }, 1000);
}

// 指示器动画
function changeDots() {
    let dots = document.querySelectorAll('.carousel-dots li');
    // 指示器改变
    dots.forEach((value, index) => {
        value.classList.remove('active');
    });
    dots[i].classList.add('active');
}