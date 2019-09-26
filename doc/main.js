import Vue from 'vue'
import App from './App.vue'
import MVUI from '../src/components'
import '../src/style/index.scss'

Vue.use(MVUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
