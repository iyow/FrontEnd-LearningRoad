

<template>
    <transition name="fade" mode="out-in">
        <!-- <div class="right-context-menu" v-show="showMadal"  :style="{left:posXY.x+'px',top:posXY.y+'px'}"> -->
        <div class="right-context-menu" v-show="show"  :style="{left:posXY.x+'px',top:posXY.y+'px'}">
            <!-- <span @click="collectMsg">复制</span> -->
            <span @click="collectMsg">收藏</span>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
// 父组件调用      <context-menu :show.sync="rightMenuShow" :msgItem="currMsg" :posXY="posXY"></context-menu>
    // 触发右键菜单
    // triggerRightMenu (item, e) {
    //   let nodePath = e.path || (e.composedPath && e.composedPath())
    //   let msgPathArr = nodePath.slice(0, nodePath.findIndex(ele => ele.classList.contains('chat-info')))
    //   for (const ele of msgPathArr) {
    //     if (ele.classList.contains('chat-msg')) {
    //       this.currMsg = item
    //       this.posXY.x = e.clientX
    //       this.posXY.y = e.clientY
    //       this.rightMenuShow = !this.rightMenuShow  *****
    //       break
    //     }
    //   }
    // },
export default {
  name: 'ContextMenu',
  props: {
    show: Boolean,
    msgItem: Object,
    posXY: Object
  },
  // computed: {
  //   showMadal: {
  //     get () {
  //       console.log('--=-=--=-=', this.show)
  //       if (this.show) {
  //         this.bindHideEvents()
  //       } else {
  //         this.unbindHideEvents()
  //       }
  //       return this.show
  //     },
  //     set (val) {
  //       return this.$emit('update:show', val)
  //     }
  //   }
  // },
  watch: {
    show (show) {
      if (show) {
        this.bindHideEvents()
      } else {
        this.unbindHideEvents()
      }
    }
  },
  methods: {
    collectMsg () {
      console.log(this.msgItem)
    },
    bindHideEvents () {
      document.addEventListener('mousedown', this.globalHideMenu)
      document.addEventListener('wheel', this.globalHideMenu)
    },
    unbindHideEvents () {
      document.removeEventListener('mousedown', this.globalHideMenu)
      document.removeEventListener('wheel', this.globalHideMenu)
    },
    globalHideMenu (e) {
      e.stopPropagation()
      e.preventDefault()
      !(e instanceof WheelEvent) && this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="less">
.right-context-menu{
    position: fixed;
    width: 80px;
    font-size: 14px;
    background-color: #fff;
    border: 1px solid #eee;
    box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1);
    border-radius: 1px;
    z-index: 9999;
}
.right-context-menu span{
    display: block;
    width: 100%;
    height: 28px;
    line-height: 28px;
    text-align: center;
    color: #1a1a1a;
    cursor: pointer;
    &:hover{
        background-color: #2d8cf0;
    }
}
</style>
