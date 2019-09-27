import Vue from 'vue'
import App from './App.vue'
import XWatermark from '../src/components'

Vue.use(XWatermark)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
