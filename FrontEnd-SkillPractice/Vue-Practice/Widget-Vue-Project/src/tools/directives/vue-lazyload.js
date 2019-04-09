Vue.directive('lazyload', {
  inserted: el => {
    function loadImage() {
      const imageElement = Array.from(el.children).find(el => el.nodeName === 'IMG')
      if (imageElement) {
        imageElement.addEventListener('load', () => {
          setTimeout(() => el.classList.add('loaded'), 100)
        })
        imageElement.addEventListener('error', () => console.log('error'))
        imageElement.src = imageElement.dataset.url
      }
    }

    function handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return
        } else {
          loadImage()
          observer.unobserve(el)
        }
      })
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: '0'
      }
      const observer = new IntersectionObserver(handleIntersect, options)
      observer.observe(el)
    }
    if (!window['IntersectionObserver']) {
      loadImage()
    } else {
      createObserver()
    }
  }
})


// vue
{/* <template>
  <div id="app">
    <div class="box" v-lazyload v-for="(item, index) in imageSoures" :key="index">
      <div class="ripple">
        <div class="ripple__circle"></div>
        <div class="ripple__circle ripple__inner-circle"></div>
      </div>
      <img :data-url="item.url" :alt="item.title" />
    </div>
  </div>
</template> */}

// css
// .box {
//     border: 1px solid #cecece;
//     box-shadow: 1px 1px 2px rgba(0,0,0,.25);
//     border-radius: 4px;
//     min-height: 20vh;
//     padding: 10px;
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .box img {
//     max-width: 100%;
//     height: auto;
//   }
//   .ripple {
//     display: inline-block;
//     position: absolute;
//     width: 64px;
//     height: 64px;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }
//   .ripple__circle {
//       position: absolute;
//       border: 4px solid rgb(96, 208, 112);
//       opacity: 1;
//       border-radius: 50%;
//       animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
//   }
//   .ripple__inner-circle {
//       animation-delay: -0.5s;
//   }
//   .loaded .ripple {
//     display: none;
//   }
//   @keyframes ripple {
//     0% {
//       top: 28px;
//       left: 28px;
//       width: 0;
//       height: 0;
//       opacity: 1;
//     }
//     100% {
//       top: -1px;
//       left: -1px;
//       width: 58px;
//       height: 58px;
//       opacity: 0;
//     }
//   }