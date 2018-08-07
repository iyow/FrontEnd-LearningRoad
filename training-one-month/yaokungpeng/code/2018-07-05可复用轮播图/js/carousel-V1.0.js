(function() {
    let currentPage = 0
    let carouselInner = document.querySelector('.carousel-inner');
    let left = document.querySelector('#carousel-left');
    let right = document.querySelector('#carousel-right');
    let images = document.querySelectorAll('.item');
    let carouselDot = document.querySelector('.carousel-dots');

    images[0].classList.add('active');
    initDots();

    let loopTimer;

    // 监听左箭头
    left.addEventListener('click', slide);
    // 监听右箭头
    right.addEventListener('click', slide);
    // 鼠标进入轮播图清除循环播放
    carouselInner.addEventListener('mouseover', () => {
        clearInterval(loopTimer);
    });
    carouselInner.addEventListener('mouseout', () => {
        loopPlay();
    });


    // 初始化指示器
    function initDots() {
        let num = images.length;
        let temp = '';

        for (let i = 0; i < num; i++) {
            if (i === 0) {
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
            move("next");
        }, 3000);
    }
    loopPlay();


    function slide(e) {
        clearInterval(loopTimer);
        e.target.className.indexOf('left') === -1 ? move("next") : move("pre");
    }


    function move(direction) {
        // 输入容错
        (direction === 'next' || direction === 'pre') ? direction = direction: direction = 'next';
        let preCurrent = currentPage;

        if (direction === 'next') {
            if (++currentPage >= images.length) {
                currentPage = 0;
                images[currentPage].classList.add('right', 'max');
            } else {
                images[currentPage].classList.add('right', 'next');
            }
        } else {
            --currentPage < 0 ? currentPage = images.length - 1 : currentPage = currentPage;
            images[currentPage].classList.add('left', 'pre');
        }

        changeDots();

        // 触发动画
        setTimeout(() => {
            images[currentPage].style.left = 0;
        }, 10);

        // 动画结束
        images[currentPage].addEventListener("transitionend", () => {
            if (direction === 'next') {
                images[currentPage].classList.remove('right');
            } else {
                images[currentPage].classList.replace('pre', 'next');
                images[currentPage].classList.remove('left');
            }
            // 清除最后一张图片到第一张时添加的最大层级,本次过渡完成时修改，若在下次过渡时修改会有卡顿
            if (images[currentPage].className.indexOf("max")) {
                images[currentPage].classList.replace('max', 'next');
            }

            images.forEach((value, index) => {
                if (index !== currentPage) {
                    value.classList.remove('next', 'max', 'pre');
                }
                value.classList.remove('active');
            });
            images[currentPage].style = '';
        });
    }

    // 指示器动画
    function changeDots() {
        let dots = document.querySelectorAll('.carousel-dots li');
        // 指示器改变
        dots.forEach((value, index) => {
            value.classList.remove('active');
        });
        dots[currentPage].classList.add('active');
    }
})();