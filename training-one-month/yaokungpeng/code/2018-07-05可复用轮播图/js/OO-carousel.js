class Carousel {
    constructor(data) {
        this.currentPage = 0;
        this.carousel = data.id || '#carousel';
        this.imagesList = data.images || [];
        this.speed = this.speed || 3000;
        this.loopTimer;
        this.init();
    }

    // 初始化 图片 及指示器
    init() {
        this.initDom();
        this.eventBind();
        this.loopPlay();
        console.log('hello to mycarousel');
    }

    initDom() {
        let num = this.imagesList.length;
        let tempImages = '';
        let tempDots = '';
        for (let i = 0; i < num; i++) {
            if (i === 0) {
                tempDots = `<li class="active"></li>`;
                tempImages = `<div class="item active"><img src="./images/${this.imagesList[i]}" alt=""></div>`;
            } else {
                tempDots = tempDots + `<li></li>`;
                tempImages = tempImages + `<div class="item"><img src="./images/${this.imagesList[i]}" alt=""></div>`;
            }
        }
        document.querySelector('.carousel-inner').innerHTML = tempImages;
        document.querySelector('.carousel-dots').innerHTML = tempDots;
    }

    // 事件绑定
    eventBind() {
        function slide(e) {
            this.clearLoopTimer();
            e.target.className.indexOf('left') === -1 ? this.move("next") : this.move("pre");
        }
        // 监听左箭头
        document.querySelector('.carousel-left-ctrl').addEventListener('click', slide.bind(this));
        // 监听右箭头
        document.querySelector('.carousel-right-ctrl').addEventListener('click', slide.bind(this));
        // 鼠标进入轮播图清除循环播放
        document.querySelector('.carousel-container').addEventListener('mouseover', () => {
            this.clearLoopTimer();
        });
        document.querySelector('.carousel-container').addEventListener('mouseout', () => {
            this.loopPlay();
        });
    }

    // 循环播放
    loopPlay() {
        this.loopTimer = setInterval(() => {
            this.move("next");
        }, this.speed);
    }

    // 清除定时器
    clearLoopTimer() {
        clearInterval(this.loopTimer);
    }

    changeDots() {
        let dots = document.querySelectorAll('.carousel-dots li');
        // 指示器改变
        dots.forEach((value, index) => {
            value.classList.remove('active');
        });
        dots[this.currentPage].classList.add('active');

    }

    move(direction) {
        // 输入容错
        let imagesDomList = document.querySelectorAll('.item');
        (direction === 'next' || direction === 'pre') ? direction = direction: direction = 'next';
        let preCurrent = this.currentPage;

        if (direction === 'next') {
            if (++this.currentPage >= imagesDomList.length) {
                this.currentPage = 0;
                imagesDomList[this.currentPage].classList.add('right', 'max');
            } else {
                imagesDomList[this.currentPage].classList.add('right', 'next');
            }
        } else {
            --this.currentPage < 0 ? this.currentPage = imagesDomList.length - 1 : this.currentPage = this.currentPage;
            imagesDomList[this.currentPage].classList.add('left', 'pre');
        }

        this.changeDots();

        // 触发动画
        setTimeout(() => {
            imagesDomList[this.currentPage].style.left = 0;
        }, 10);

        // 动画结束
        imagesDomList[this.currentPage].addEventListener("transitionend", () => {
            if (direction === 'next') {
                imagesDomList[this.currentPage].classList.remove('right');
            } else {
                imagesDomList[this.currentPage].classList.replace('pre', 'next');
                imagesDomList[this.currentPage].classList.remove('left');
            }
            // 清除最后一张图片到第一张时添加的最大层级,本次过渡完成时修改，若在下次过渡时修改会有卡顿
            if (imagesDomList[this.currentPage].className.indexOf("max")) {
                imagesDomList[this.currentPage].classList.replace('max', 'next');
            }

            // 统一删除防止动作太快出现问题
            imagesDomList.forEach((value, index) => {
                if (index !== this.currentPage) {
                    value.classList.remove('next', 'max', 'pre');
                }
                value.classList.remove('active', 'left', 'right');
                value.style = '';
            });
        });
    }
}