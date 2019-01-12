<template>
<!-- QQ表情面板-点击输出相应[表情]文字 使用iview tab组件美化 可删除 -->
    <div class="face-panel">
        <Tabs>
            <TabPane label="QQ表情">
                <div class="qqface-panel">
                    <span class="qqface-item" :class="'qq-face'+index" v-for="(item,index) in QQFaceList" :key="index" :title="item" @click.stop="add($event)"></span>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
  name: 'FacePanel',
  data () {
    return {
      QQFaceList: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '愉快', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '悠闲', '奋斗', '咒骂', '疑问', '嘘', '晕', '疯了', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '嘴唇', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '投降', '激动', '乱舞', '献吻', '左太极', '右太极', '嘿哈', '捂脸', '奸笑', '机智', '皱眉', '耶', '鸡', '红包']
    }
  },
  methods: {
    add (e) {
      this.$emit('addqqface', e)
    }
  }
}
</script>

<style lang="less">
// background-size 只设置宽度 等比缩放
// 使用 函数 和 loop生成各表情 背景定位
@itemsize:25px;  //表情框大小
.face-panel{
    position: relative;
    z-index: 99;
    width: unit(@itemsize*15,px);
    .ivu-tabs-bar{
        margin-bottom: 0;
    }
    .qqface-panel{
        display: flex;
        flex-wrap: wrap;
        height: 200px;
        overflow-y: auto;
    }
}
.qqface-item{
    width: @itemsize;
    height: @itemsize;
    border-bottom: 1px solid #f0f0f0;
    border-right: 1px solid #f0f0f0;
    background: url(http://res.wx.qq.com/a/wx_fed/webwx/res/static/img/3shEflO.png) no-repeat;
    background-size: 434px;
    overflow: hidden;
    cursor: pointer;
}
@listlength:112;   // 表情列表长度QQFaceList
@columnlength:15;  // 一行放多少个表情(即总共多少列)
@qqfaceoffset:-29; // 背景图片偏移量
.generate-qqface(@listlength,@columnlength,@qqfaceoffset,@index:0) when (@index <= @listlength){
    .qq-face@{index} {
        background-position: unit((@qqfaceoffset*mod(@index,@columnlength)),px) unit((@qqfaceoffset*floor(@index/@columnlength)),px);
    }
    .generate-qqface(@listlength,@columnlength,@qqfaceoffset,(@index+1))
}
.generate-qqface(@listlength,@columnlength,@qqfaceoffset);
</style>
