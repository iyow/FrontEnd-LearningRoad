import PictureViewer from './PictureViewer.vue'
export default {
  install (Vue, options) {
    // 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象
    // 创建构造器
    const MagicImgComponentConstructor = Vue.extend(PictureViewer)
    let magicImgInstance
    const initInstance = () => {
      magicImgInstance = new MagicImgComponentConstructor()
      // vm.$mount( [elementOrSelector] )：返回vm - 实例自身
      // 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。
      // 如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
      let Dom = magicImgInstance.$mount().$el
      document.body.appendChild(Dom)
    }
    Vue.prototype.$magicImg = {
      showMagicImg (options) {
        if (!magicImgInstance) {
          initInstance()
        }
        Object.assign(magicImgInstance, options)
        magicImgInstance.openMagic()
      }
    }
  }
}
