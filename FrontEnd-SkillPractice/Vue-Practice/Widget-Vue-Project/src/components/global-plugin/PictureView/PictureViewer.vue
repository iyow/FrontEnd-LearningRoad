<template>
  <div v-if="showMagic" class="magicImg">
    <div
      @mousemove="mousemove"
      @mouseup.self="forChrom"
      @mouseleave="mouseup(true)"
     class="magic">
      <div class="toolbar" @click.stop="nothing" @mouseup="mouseup">
        <div class="toolbar-container">
          <div class="img-name">图片名字图片名字图片名字图片名字</div>
          <div class="toolbar-op" @click.stop="nothing">
            <div class="operate-btn" @click="rotate"><i class="el-icon-rank"></i><span>旋转</span></div>
            <div class="operate-btn" @click="zoom('magnify')"><i class="el-icon-zoom-in"></i><span>放大</span></div>
            <div class="scale-ratio">100%</div>
            <div class="operate-btn" @click="zoom('shrink')"><i class="el-icon-zoom-out"></i><span>缩小</span></div>
            <div class="operate-btn" @click="restore"><i class="el-icon-refresh"></i><span>还原</span></div>
            <div class="operate-btn magicClose"><i @click="openMagic" class="el-icon-close"></i></div>
          </div>
        </div>
      </div>
      <img draggable="false"
      ondragstart="return false"
      @mousedown="mousedown"
      @mouseup="mouseup"
      @mouseleave="nothing"
      @click.stop="nothing"
      class="draggable"
      ref="magicImg" :src="src" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PictureViewer',
  // 后续修改为传入数组，显示为轮播效果
  props: ['src'],
  data () {
    return {
      // 放大图片是否显示
      showMagic: false,
      // 是否按下鼠标
      isdown: false,
      magicImg: '',
      // 图片原始位置
      originPosition: {
        x: 0,
        y: 0
      },
      // 记录鼠标位置
      oldPosition: {
        x: 0,
        y: 0
      },
      // 图片新位置
      newPosition: {
        x: 0,
        y: 0
      },
      // 图片百分比
      size: 100,
      angle: 0,
      rotateTime: true,
      originWidth: 0
    }
  },
  created () {
    // 防止意外导致的页面无法滚动
    this.showMagic = false
  },
  methods: {
    initPosition () {
      // let that = this
      let magicImg = this.$refs.magicImg
      this.originPosition.x = magicImg.offsetLeft
      this.originPosition.y = 150
      // 第一次放大动画效果--标签属性没有width
      if (magicImg.width > 600) {
        this.originWidth = 600
        magicImg.width = 600
      } else {
        this.originWidth = magicImg.width
      }
    },
    openMagic (index) {
      if (index === 2 && this.isdown) {
        this.isdown = false
        return false
      }
      this.showMagic = !this.showMagic
      if (this.showMagic) {
        // this.stop()
        this.$nextTick(() => {
          this.initPosition()
        })
      } else {
        this.angle = 0
        this.rotateTime = true
        this.size = 100
        // this.move()
      }
    },
    rotate () {
      this.changePosition(this.originPosition)
      let angle = this.angle % 360 / 90
      if (angle === 1 && angle === 3) {
        this.$refs.magicImg.style.top = this.originPosition.x + 'px'
        this.$refs.magicImg.style.left = this.originPosition.y + 'px'
      } else {
        this.$refs.magicImg.style.top = this.originPosition.y + 'px'
        this.$refs.magicImg.style.left = this.originPosition.x + 'px'
      }
      this.changeSize(100)
      this.changeAngle()
      this.initPosition()
    },
    zoom (equation) {
      let size

      if (equation === 'magnify') {
        size = this.size * 1.1
      } else {
        size = this.size * 0.9
      }
      this.changeSize(size)
    },
    changeSize (size) {
      // let size = this.size
      // if ()
      if (size < 50 || size > 300) {
        size = size > 300 ? 300 : 50
        // return false
      }
      this.size = size
      this.$nextTick(() => {
        this.$refs.magicImg.width = this.originWidth * this.size / 100
      })
    },
    changePosition (position) {
      this.$refs.magicImg.style.top = position.y + 'px'
      this.$refs.magicImg.style.left = position.x + 'px'
    },
    changeAngle () {
      if (this.rotateTime) {
        this.rotateTime = false
        setTimeout(() => {
          this.rotateTime = true
        }, 200)
      } else {
        return false
      }
      this.angle += 90
      this.$refs.magicImg.style.transform = 'translate(-50%, 0%) rotate(' + this.angle + 'deg)'
    },
    restore () {
      // this.angle = -90
      switch (this.angle % 360 / 90) {
        case 0: this.angle -= 90
          break
        case 1: this.angle -= 180
          break
        case 2: this.angle -= 270
          break
        case 3:
          break
      }
      this.rotate()
    },
    // 拖拽
    mousedown (e) {
      // console.log('down')
      this.isdown = true
      switch (this.angle % 360 / 90) {
        case 0:
          this.oldPosition.x = e.offsetX
          this.oldPosition.y = e.offsetY
          break
        case 1:
          this.oldPosition.y = e.offsetX
          this.oldPosition.x = this.$refs.magicImg.height - e.offsetY
          break
        case 2:
          this.oldPosition.y = this.$refs.magicImg.height - e.offsetY
          this.oldPosition.x = this.$refs.magicImg.width - e.offsetX
          break
        case 3:
          this.oldPosition.y = this.$refs.magicImg.width - e.offsetX
          this.oldPosition.x = e.offsetY
          break
      }
      // console.log('x:' + this.oldPosition.x)
      // console.log('y:' + this.oldPosition.y)
    },
    mousemove (e) {
      // console.log(e)
      if (this.isdown) {
        switch (this.angle % 360 / 90) {
          case 0:
          case 2:
            this.newPosition.x = e.clientX - this.oldPosition.x + this.$refs.magicImg.width / 2
            // this.newPosition.y = e.clientY - this.oldPosition.y + this.$refs.magicImg.height / 2
            this.newPosition.y = e.clientY - this.oldPosition.y
            break
          case 1:
          case 3:
            this.newPosition.x = e.clientX - this.oldPosition.x + this.$refs.magicImg.height / 2
            this.newPosition.y = e.clientY - this.oldPosition.y + (this.$refs.magicImg.width - this.$refs.magicImg.height) / 2
            break
        }
        this.changePosition(this.newPosition)
      }
    },
    mouseup (leave) {
      if (!leave) {
        this.size = 100
      }
      this.isdown = false
    },
    forChrom () {
      // console.log(this.isdown)
      if (!this.isdown) {
        this.openMagic()
      }
      this.isdown = false
    },
    // 禁止页面滚动
    stop () {
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', this.beDefalut, false)
    },
    // 允许页面滚动
    move () {
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', this.beDefalut, false)
    },
    beDefalut (e) {
      e.preventDefault()
    },
    nothing () {
      // do nothing
      // console.log('nothing happend')
    }
  },
  watch: {
    'showMagic': function (newStatus) {
      if (newStatus) {
        this.stop()
      } else {
        this.move()
        this.isdown = false
      }
    }
  }
}
</script>

<style lang="less">
  .magicImg {
    min-width: 900px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(51,51,51,0.6);
    z-index: 99998;
    overflow: auto;
    .magic {
      position: relative;
      height: 100%;
    }
    .toolbar {
      position: absolute;
      bottom: 0;
      height: 105px;
      margin-bottom: 30px;
      width: 100%;
      color: #fff;
      z-index: 99999;
    }
    .toolbar-container{
      padding: 12px 20px;
      margin: 0 auto;
      overflow: hidden;
      width: 284px;
      height: 100%;
      background: #333;
      .img-name{
        font-size: 16px;
        width: 100%;
        overflow: hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
        text-align: center;
        padding-bottom: 12px;
        margin-bottom: 12px;
        border-bottom: 1px solid #5E5E5E;
        color: pink;
      }
      .toolbar-op {
        display: flex;
        justify-content: space-evenly;
      }
    }
    .scale-ratio{
      font-size: 12px;
    }
    .operate-btn {
      display: flex;
      flex-direction: column;
      line-height: 20px;
      font-size: 20px;
      cursor: pointer;
      span{
        font-size: 12px;
      }
      &.magicClose{
        position: fixed;
        top: 0;
        right: 0;
        margin: 30px;
        width: 36px;
        height: 36px;
        i{
          line-height: 36px;
          text-align: center;
          border-radius: 50%;
          background: #333;
          cursor: pointer;
        }
      }
    }
    .draggable {
      max-width: 888px;
      max-height: 580px;
      position: absolute;
      top: 150px;
      left: 50%;
      transform: translate(-50%, 0%);
      transition-property: width,height,transform;
      transition-duration: .2s;
      border-radius: 10px;
      cursor: pointer;
    }
  }
</style>
