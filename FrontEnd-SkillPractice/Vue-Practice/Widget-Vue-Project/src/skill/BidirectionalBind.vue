<template>
<!-- 双向绑定组件封装方法 -->
<!-- <bidirectional-bind :input1.sync="input1" :input2.sync="input2" :input3.sync="input3" :input4.sync="input4" :input5.sync="input5"></bidirectional-bind> -->
<!-- 如果子组件层级更深 使用 v-bing="$attr" v-on="$listener" 透传props及事件监听-->
  <div class="input-group">
    <el-input placeholder="请输入内容" v-model="myInput1"></el-input>
    <el-input placeholder="请输入内容" :value="input2" @input="input22"></el-input>
    <el-select v-model="myInput33" placeholder="请选择">
      <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
    </el-select>
    <el-select :value="input4" @change="input44" placeholder="请选择">
      <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
    </el-select>
    <el-radio-group v-model="myInput55">
      <el-radio :label="1">备选项123</el-radio>
      <el-radio :label="2">备选项456</el-radio>
      <el-radio :label="3">备选项789</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'BiidirectionalBind',
  props: ['input1', 'input2', 'input3', 'input4', 'input5'],
  computed: {
    myInput1: {
      get () {
        return this.input1
      },
      set (val) {
        this.$emit('update:input1', val)
      }
    },
    myInput33: {
      get () {
        return this.input3
      },
      set (val) {
        this.$emit('update:input3', val)
      }
    },
    myInput55: {
      get () {
        return this.input4
      },
      set (val) {
        this.$emit('update:input5', val)
      }
    }
  },
  methods: {
    input22 (val) {
      this.$emit('update:input2', val)
    },
    input44 (val) {
      this.$emit('update:input4', val)
    }
  }
}
</script>

<style >
</style>
