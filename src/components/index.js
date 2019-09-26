import MIcon from './Icon'

const components = [
  MIcon
]

// 注册组件
const install = function (Vue) {
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  MIcon
}
