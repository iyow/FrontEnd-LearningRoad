// 指令生命周期
// bind,inserted,update,componentUpdated,unbind
export const dragDirectiveMixin = {
    directives: {
      drag: {
        bind (el, binding, vnode) {
          el.ondragleave = (e) => {
            e.preventDefault()
            el.classList.remove('blur')
          }
          el.ondragover = (e) => {
            // 不能使用节流 节流后无法触发drop
            e.preventDefault()
            if (!el.classList.contains('blur')) {
              el.classList.add('blur')
            }
          }
          el.ondrop = (e) => {
            e.preventDefault()
            el.classList.remove('blur')
            // 使用时 v-drag="{
            // ondrop:[Function]
            // }"
            // 传入的值，可在binding.value获取到
            binding.value.ondrop(e)
          }
        }
      }
    }
  }