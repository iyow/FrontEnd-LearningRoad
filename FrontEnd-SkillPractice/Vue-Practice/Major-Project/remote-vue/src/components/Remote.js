let template = `
<div class="remote">
// 阿斯顿撒
<!-- 阿萨德 -->
<el-button @click="click(1)">1111=====---======{{a}}</el-button>
<el-button @click="click(2)">2222=====---======{{a}}</el-button>
<div>{{msg}}</div>
<hello-world/>
<el-button @click="click(3)">3333=====---======{{a}}</el-button>
</div>
`
let data = function () {
  return {
    a: 0 //技术及
  }
}
let methods = {
  // 点击
  click(i) {
    this.a += i
    console.log("hahahhahha", this.msg);
  }
}
export default {
  name: "Remote",
  template,
  props: ['msg'],
  data,
  methods
}