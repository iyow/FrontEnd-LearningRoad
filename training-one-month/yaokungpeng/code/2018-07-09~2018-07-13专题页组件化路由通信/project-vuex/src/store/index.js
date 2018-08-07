import Vue from 'vue'
import Vuex from 'vuex'
import course from './modules/course'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  course}
})
