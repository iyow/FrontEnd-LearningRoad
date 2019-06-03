<template>
  <div class="face-tool">
    <a class="tool-emoji" href="javascript:;">
    <slot>
      <mxicon name="mx-emoji-default" width="24px" height="24px" :original="true"></mxicon>
    </slot>
      <div class="face-panel">
        <div class="qqface-panel">
          <!-- qq表情 -->
          <span
            class="qqface-item"
            :class="'qq-face'+index"
            v-for="(item,index) in QQFaceList"
            :key="index"
            :title="item"
            :data-facetext="`[${item}]`"
            :data-faceclass="`qqface-item qq-face${index}`"
            @click.stop="add($event,'qqface')"
          ></span>
          <!-- unicode字符表情 -->
          <span
            class="emojiface-item"
            :class="'emoji-face'+index"
            v-for="(item,index) in EmojiList"
            :key="QQFaceList.length+index"
            :title="item"
            :data-facetext="getEmojiFaceText(item)"
            :data-faceclass="`emojiface-item emoji-face${index}`"
            @click.stop="add($event,'emoji')"
          >{{getEmojiFaceText(item)}}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import {
  QQFaceMap,
  QQFaceList,
  EmojiList
} from './faceData'
export default {
  name: 'ToolFace',
  data () {
    return {
      QQFaceList: QQFaceList, // qq表情名字(存key到相应Map中找value)列表
      EmojiList: EmojiList // emoji表情名字(存key到相应Map中找value)列表
    }
  },
  methods: {
    add (e, type) {
      this.$emit('addface', e.target.dataset, type)
    },
    getEmojiFaceText (key) {
      let codeKey = QQFaceMap[`<${key}>`]
      let emojiChar = String.fromCodePoint('0x' + codeKey)
      return emojiChar
    }
  }
}
</script>

<style lang="less">
// @panelHeight: 200px;
@panelHeight: 150px;

@offsetHeight: -@panelHeight - 10px;
.face-tool {
  .tool-emoji {
    position: relative;
    font-weight: 700;
    color: #666;
  }
  .tool-emoji:focus {
    font-weight: bold;
    .face-panel {
      display: block;
    }
  }
  .face-panel {
    overflow: hidden; // 谷歌设置了滚动条会占位置表情面板去除滚动条
    display: none;
    position: absolute;
    width: 210px;
    top: @offsetHeight;
    left: 0;
    z-index: 99;
    background: rgba(255,255,255,1);
    box-shadow: 0px 1px 4px 0px rgba(137,158,204,0.8);
    border-radius: 2px;
    .qqface-panel {
      width: 103%;   // 谷歌设置了滚动条会占位置表情面板去除滚动条
      display: flex;
      flex-wrap: wrap;
      height: @panelHeight;
      overflow-x: hidden;
      overflow-y: auto;
      overflow-y: overlay;
      padding: 15px;
    }
    .qqface-item,.emojiface-item{
      margin: 5px;
    }
  }
  .face-panel::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: #F5F5F5;
    display: none;
  }
}
</style>
