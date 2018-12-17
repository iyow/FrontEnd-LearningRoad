<template>
  <div class="photo-wall-container">
    <div class="app">
        <header class="header">
            <div class="header__left" @click="launchFullScreen(docuemntDom)">
            <span>Digital Walls</span>
            </div>
            <div class="header__right">
            <p>Thu, 14 Jun | 16:20</p>
            </div>
        </header>
  
        <nav class="nav">
            <ul class="nav__menu">
            <li class="nav__item">
                <a href="#vienna" class="nav__link" data-scroll-to>
                <div class="media">
                    <img src="https://lonelyplanetimages.imgix.net/mastheads/stock-photo-st-stephens-church-112868985.jpg?sharp=10&vib=20&w=2000" alt="" class="media__img">
                    <p class="media__content">
                    <strong>Vienna</strong><br />
                    Austria
                    </p>
                </div>
                </a>
            </li>
            <li class="nav__item">
                <a href="#lisbon" class="nav__link" data-scroll-to>
                <div class="media">
                    <img src="https://lonelyplanetimages.imgix.net/mastheads/54989636.jpg?sharp=10&vib=20&w=2000" alt="" class="media__img">
                    <p class="media__content">
                    <strong>Lisbon</strong><br />
                    Portugal
                    </p>
                </div>
                </a>
            </li>
            <li class="nav__item">
                <a href="#newyork" class="nav__link" data-scroll-to>
                <div class="media">
                    <img src="https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=2000" alt="" class="media__img">
                    <p class="media__content">
                    <strong>New York</strong><br />
                    USA
                    </p>
                </div>
                </a>
            </li>
            </ul>
        </nav>
  
        <main class="main">
            <article class="section" id="vienna" data-section>
            <header class="section__header" style="background-image: url('https://lonelyplanetimages.imgix.net/mastheads/stock-photo-st-stephens-church-112868985.jpg?sharp=10&w=2000');">
                <h1 class="section__title">Vienna</h1>
                <p class="section__subtitle">48.21°N, 16.36°E</p>
                <div class="section__controls">
                <button class="btn btn--prev" title="Previous">
                    <span class="arrow arrow--left"></span>
                </button>
                <button class="btn btn--next" title="Next">
                    <span class="arrow arrow--right"></span>
                </button>
                <div class="user">
                    <img src="https://source.unsplash.com/200x200/?people" class="user__img" alt="" />
                    <span class="user__name">Jamie</span>
                </div>
                </div>
            </header>
            <div class="section__content">
                <ul class="boxgrid">
                <li class="boxgrid__item">
                    <a href="#" class="box box--weather">
                    <p><span class="text--large">27°C</span><br />Cloudy</p>
                    </a>
                </li>
                <li class="boxgrid__item boxgrid__item--wide">
                    <a href="#" class="box box--image">
                    <img src="https://source.unsplash.com/600x400/?nature" class="box__img" alt="" />
                    </a>
                </li>
                <li class="boxgrid__item boxgrid__item--push">
                    <a href="#" class="box box--image">
                    <img src="https://source.unsplash.com/300x300/?people" class="box__img" alt="" />
                    </a>
                </li>
                <li class="boxgrid__item">
                    <a href="#" class="box box--cost">
                    <p><span class="text--large">120€</span><br />Daily cost</p>
                    </a>
                </li>
                <li class="boxgrid__item boxgrid__item--push">
                    <a href="#" class="box box--video">
                    <img src="https://source.unsplash.com/300x300/?art" class="box__img" alt="" />
                    </a>
                </li>
                <li class="boxgrid__item">
                    <a href="#" class="box box--locations">
                    <p><span class="text--large">189</span><br />Locations</p>
                    </a>
                </li>
                </ul>
            </div>
            </article>

            <article class="section" id="lisbon" data-section>
            <header class="section__header" style="background-image: url('https://lonelyplanetimages.imgix.net/mastheads/54989636.jpg?sharp=10&w=2000');">
                <h1 class="section__title">Lisbon</h1>
                <p class="section__subtitle">38.44°N, 09.82°W</p>
                <div class="section__controls">
                <button class="btn btn--prev" title="Previous">
                    <span class="arrow arrow--left"></span>
                </button>
                <button class="btn btn--next" title="Next">
                    <span class="arrow arrow--right"></span>
                </button>
                <div class="user">
                    <img src="https://source.unsplash.com/200x200/?people" class="user__img" alt="" />
                    <span class="user__name">Jamie</span>
                </div>
                </div>
            </header>
            <div class="section__content">
                <ul class="boxgrid">
                <li class="boxgrid__item">
                    <a href="#" class="box box--weather">
                    <p><span class="text--large">22°C</span><br />Rain</p>
                    </a>
                </li>
                <li class="boxgrid__item">
                    <a href="#" class="box box--image">
                    <img src="https://source.unsplash.com/300x300/?nature" class="box__img" alt="" />
                    </a>
                </li>
                <li class="boxgrid__item boxgrid__item--push">
                    <a href="#" class="box box--video">
                    <img src="https://source.unsplash.com/300x300/?art" class="box__img" alt="" />
                    </a>
                </li>
                <li class="boxgrid__item boxgrid__item--wide">
                    <a href="#" class="box box--image">
                    <img src="https://source.unsplash.com/600x400/?technology" class="box__img" alt="" />
                    </a>
                </li>
                <li class="boxgrid__item boxgrid__item--push">
                    <a href="#" class="box box--locations">
                    <p><span class="text--large">272</span><br />Locations</p>
                    </a>
                </li>
                <li class="boxgrid__item">
                    <a href="#" class="box box--cost">
                    <p><span class="text--large">80€</span><br />Daily cost</p>
                    </a>
                </li>
                
                </ul>
            </div>
            </article>

            <article class="section" id="newyork" data-section>
            <header class="section__header" style="background-image: url('https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=2000');">
                <h1 class="section__title">New York</h1>
                <p class="section__subtitle">40.42°N, 74.02°W</p>
                <div class="section__controls">
                <button class="btn btn--prev" title="Previous">
                    <span class="arrow arrow--left"></span>
                </button>
                <button class="btn btn--next" title="Next">
                    <span class="arrow arrow--right"></span>
                </button>
                <div class="user">
                    <img src="https://source.unsplash.com/200x200/?nature" class="user__img" alt="" />
                    <span class="user__name">Jamie</span>
                </div>
                </div>
            </header>
            <div class="section__content">
                <ul class="boxgrid">
                <li class="boxgrid__item boxgrid__item--wide">
                    <a href="#" class="box box--image">
                    <img src="https://source.unsplash.com/600x400/?art" class="box__img" alt="" />
                    </a>
                </li>
                <li class="boxgrid__item">
                    <a href="#" class="box box--weather">
                    <p><span class="text--large">30°C</span><br />Sunny</p>
                    </a>
                </li>
                <li class="boxgrid__item boxgrid__item--push">
                    <a href="#" class="box box--video">
                    <img src="https://source.unsplash.com/300x300/?art" class="box__img" alt="" />
                    </a>
                </li>
                <li class="boxgrid__item boxgrid__item--push">
                    <a href="#" class="box box--image">
                    <img src="https://source.unsplash.com/300x300/?people" class="box__img" alt="" />
                    </a>
                </li>
                <li class="boxgrid__item boxgrid__item--push">
                    <a href="#" class="box box--locations">
                    <p><span class="text--large">1.366</span><br />Locations</p>
                    </a>
                </li>
                <li class="boxgrid__item">
                    <a href="#" class="box box--cost">
                    <p><span class="text--large">150$</span><br />Daily cost</p>
                    </a>
                </li>
                <li class="boxgrid__item">
                    <a href="#" class="box box--image">
                    <img src="https://source.unsplash.com/300x300/?technology" class="box__img" alt="" />
                    </a>
                </li>
                </ul>
            </div>
            </article>
        </main>
    
        <button class="scrollctrl scrollctrl--prev" data-scroll-dir="prev">
            <span class="arrow arrow--large arrow--up"></span>
        </button>
        <button class="scrollctrl scrollctrl--next" data-scroll-dir="next">
            <span class="arrow arrow--large arrow--down"></span>
        </button>
    
        <footer class="footer">
            <p>a pen by <a href="https://twitter.com/mxbck">@mxbck</a></p>
            <p>design by <a href="https://dribbble.com/shots/2652364-Digital-Walls">Cosmin Capitanu</a></p>
            
            <p class="footer__more">
            <a href="https://codepen.io/mxbck/pen/81020404c9d5fd873a717c4612c914dd?editors=1000" target="_blank" rel="noopener noreferrer">View Source</a>
            &nbsp;&middot;&nbsp;
            <a href="https://mxb.at/blog/layouts-of-tomorrow/">Read More</a>
            </p>
        </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoWall",
  data(){
    return{
      docuemntDom:document.documentElement
    }
  },
  methods:{
    // 启用全屏 
    // 全屏API requestFullscreen方法在一些老的浏览器里面依然使用带前缀形式的方法名,因此可能需要进行检测判断:(带前缀,意思就是各个浏览器内核不通用.)
    // 将需要全屏显示的DOM元素作为参数,调用此方法即可让window进入全屏状态,有时候可能需要用户同意(浏览器自己和用户交互),假若用户拒绝,则可能出现各种不完全的全屏.
    // 如果用户同意进入全屏,那么工具栏以及其他浏览器组件会隐藏起来,使document框架的宽度和高度横跨整个屏幕.
    // 找到支持的方法, 使用需要全屏的 element 调用
    // 在支持全屏的浏览器中启动全屏  需要用户触发不可以直接触发
    // 整个页面
    // launchFullScreen(document.documentElement);
    // 某个元素
    // launchFullScreen(document.getElementById("videoElement"));
    launchFullScreen(element) {
      if (element.requestFullscreen) {
          element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
      }
    },
    // 退出全屏
    // 使用 exitFullscreen 方法可以使浏览器退出全屏,返回原先的布局. 该方法在一些老的浏览器上也是支持前缀方法.
    // 请注意: exitFullscreen 只能通过 document 对象调用 —— 而不是使用普通的 DOM element.

    // 退出 fullscreen
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozExitFullScreen) {
            document.mozExitFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
  },
  mounted() {
    const SELECTORS = {
      section: "[data-section]",
      scrollTo: "[data-scroll-to]",
      scrollDir: "[data-scroll-dir]"
    };
    const sectionsArray = Array.from(
      document.querySelectorAll(SELECTORS.section)
    );
    const scrollToElements = document.querySelectorAll(SELECTORS.scrollTo);
    const scrollDirElements = document.querySelectorAll(SELECTORS.scrollDir);

    let currentSectionIndex = 0;

    const getScrollTarget = dir => {
      if (dir === "prev" && currentSectionIndex > 0) {
        currentSectionIndex--;
        return sectionsArray[currentSectionIndex];
      }
      if (dir === "next" && currentSectionIndex < sectionsArray.length - 1) {
        currentSectionIndex++;
        return sectionsArray[currentSectionIndex];
      }
      return false;
    };

    scrollDirElements.forEach(el => {
      el.addEventListener("click", () => {
        const direction = el.dataset.scrollDir;
        const target = getScrollTarget(direction);

        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    scrollToElements.forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        const targetId = el.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
          sectionsArray.forEach((section, index) => {
            if (section.id === targetId.replace("#", "")) {
              currentSectionIndex = index;
            }
          });
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }
};
</script>

<style lang="less">
@header-height: 4rem;
@section-height: 500px;
@nav-width: 20%;
@footer-height: 4rem;
@border-radius: 0.5rem;
@default-spacing: 2rem;

@gray-dark: #121519;
@gray: #a0a0a0;
@gray-light: #f3f3f3;

@indigo: #6c73dc;
@teal: #89cdce;
@lightblue: #66aee5;

// ============= GENERAL CSS ==============

.photo-wall-container {
  min-height: 100vh;
  height: 100%;
  overflow: hidden;
  color: #fff;
  background-color: @gray-dark;
  font-family: "Montserrat", "Roboto", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

p {
  margin: 1rem 0;
}

// ============= MAIN LAYOUT ==============

.app {
  display: grid;
  grid-template-rows: @header-height 1fr @footer-height;
  grid-template-columns: @nav-width 1fr;
  height: 100vh;
}

.header,
.footer {
  font-size: 0.75rem;
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: @gray;
}

.header {
  display: flex;
  justify-content: space-between;
  grid-column: ~"1 / -1";
  padding: 0 @default-spacing;
  border-bottom: 1px solid rgba(#fff, 0.1);

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }
}

.main {
  grid-column: ~"1 / -1";
  padding: @default-spacing;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  perspective: 1px;

  scroll-snap-type: block proximity;
  scroll-snap-destination: 0% 100%;
  scroll-snap-points-y: repeat(100%);

  @media screen and (min-width: 1024px) {
    grid-column: ~"2 / -1";
  }
}

.footer {
  display: flex;
  align-items: center;
  grid-column: ~"1 / -1";
  padding: 0 @default-spacing;
  border-top: 1px solid rgba(#fff, 0.1);

  p {
    margin-right: 1rem;
  }

  a {
    color: #fff;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  &__more {
    display: none;
    margin-left: auto;
    margin-right: 0;

    @media screen and (min-width: 768px) {
      display: block;
    }
  }
}

// ============= NAVIGATION ==============

.nav {
  display: none;
  border-right: 1px solid rgba(#fff, 0.1);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &__item:not(:last-child) {
    border-bottom: 1px solid rgba(#fff, 0.1);
  }

  &__link {
    display: block;
    color: #fff;
    font-weight: 200;

    &:hover,
    &:focus {
      background-color: rgba(#fff, 0.035);
    }
  }

  @media screen and (min-width: 1024px) {
    display: block;
    grid-column: ~"1 / 2";
  }
}

// ============= PAGE SECTIONS ==============

.section {
  min-height: @section-height;
  min-height: calc(~"100vh - @{header-height} - @{footer-height}");
  padding-top: (@section-height / 2) + 50;
  margin-bottom: @section-height / 2;
  position: relative;
  transform-style: preserve-3d;
  scroll-snap-align: start;

  &__header {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    height: 500px;
    padding: @default-spacing;
    border-radius: @border-radius;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.25);

    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
    }
  }
  &__title {
    font-size: 3.5rem;
    font-weight: 200;
    margin-bottom: 0.5rem;
    line-height: 1;
  }
  &__subtitle {
    font-size: 1.5rem;
  }
  &__controls {
    display: flex;
    align-items: center;
    position: absolute;
    padding: 0 @default-spacing;
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(-50%);
  }
  &__content {
    position: relative;
    z-index: 1;
    padding: 0 @default-spacing / 2;
  }

  @media screen and (min-width: 1024px) {
    margin-bottom: @section-height * 1.5;

    &__header {
      transform: translateZ(-1px) scale(1.9);
    }
    &__content {
      padding: 0;
      transform: translateZ(0);
    }
  }
}

// ============= CONTENT BOX GRID ==============

.boxgrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 2rem 0.5rem;

  &__item {
    display: flex;

    &--wide {
      grid-column: span 2;
    }
    &--push {
      @media screen and (min-width: 1280px) {
        grid-column: span 2;
        padding-left: 50%;
      }
    }
  }
}

// ============= CONTENT BOX ==============

.box {
  display: flex;
  flex: 1 0 0;
  position: relative;
  padding: @default-spacing;
  border-radius: @border-radius;
  font-size: 0.875rem;
  color: #fff;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  transform: scale(1);
  transition: all 0.25s ease;
  filter: brightness(100%);

  &:hover,
  &:focus {
    transform: scale(1.07);
    filter: brightness(110%);
    z-index: 10;
  }

  &--weather {
    background-color: @teal;
  }
  &--cost {
    background-color: @lightblue;
  }
  &--locations {
    background-color: @indigo;
  }
  &--image,
  &--video {
    padding: 0;
  }
  &--video {
    // fake a video play button
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 10;
      transform: translate(-50%, -50%);
    }
    &::before {
      width: 50px;
      height: 50px;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 0 38px rgba(0, 0, 0, 0.3);
    }
    &::after {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 0 10px 15px;
      border-color: transparent transparent transparent @gray-dark;
      margin-left: 2px;
    }
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    object-position: center;
    border-radius: @border-radius;
  }
}

// ============= TOP/BOTTOM SCROLL CONTROLS ==============

.scrollctrl {
  display: none;
  justify-content: center;
  width: 50vw;
  height: 50vw;
  padding: 0;
  position: fixed;
  border-radius: 50%;
  border: 1px solid rgba(#fff, 0.1);
  color: rgba(#fff, 0.7);
  background-color: transparent;
  left: 50%;
  margin-left: -25%;

  &:hover,
  &:focus {
    background-color: rgba(#fff, 0.035);
  }

  &--prev {
    top: 0;
    padding-top: 44%;
    align-items: flex-end;
    transform: translateY(-42vw);
  }
  &--next {
    bottom: 0;
    padding-bottom: 44%;
    transform: translateY(42vw);
  }

  @media screen and (min-width: 1024px) {
    display: flex;
  }
}

// ============= MISC UTILITIES ==============

.text--large {
  font-size: 2rem;
  font-weight: 200;
}

.arrow {
  display: inline-block;
  padding: 3px;
  border-style: solid;
  border-width: 0 2px 2px 0;

  &--large {
    padding: 8px;
    border-width: 0 1px 1px 0;
  }
  &--right {
    transform: rotate(-45deg);
  }

  &--left {
    transform: rotate(135deg);
  }

  &--up {
    transform: rotate(-135deg);
  }

  &--down {
    transform: rotate(45deg);
  }
}

.media {
  display: flex;
  align-items: center;
  padding: @default-spacing;

  &__img {
    width: 60px;
    height: 60px;
    margin-right: @default-spacing / 2;
    border-radius: @border-radius / 2;
    object-position: center center;
    object-fit: cover;
  }
  &__content {
    margin: 0;
  }
}

.user {
  margin-left: auto;
  text-align: center;
  padding-top: 2rem;

  &__name {
    display: block;
    font-size: 1.5rem;
    font-weight: 200;
  }

  &__img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 0.5rem;
    box-shadow: 0 0 38px rgba(0, 0, 0, 0.3);
  }
}

.btn {
  display: flex;
  flex: 0 0 50px;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 0;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 50%;
  background-color: #fff;
  margin: 0 0.5rem;
}

button:focus {
  outline: 0;
  border-color: @lightblue;
  box-shadow: 0 0 0 1px @lightblue;
}
</style>