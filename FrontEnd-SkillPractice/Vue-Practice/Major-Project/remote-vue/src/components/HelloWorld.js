export default {
    name: 'HelloWorld',
    template: `
  <div>
    <h1>--Helloween--子组件-----</h1>
    <p v-show="flag">{{msg}}</p>
    <el-button @click="flag=!flag">{{flag?'show':'hide'}}</el-button>
  </div>
  `,
    data() {
        return {
            flag: true,
            msg: '咳咳'
        }
    }
}