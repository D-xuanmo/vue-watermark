<template>
  <div ref="wrapper" class="x-watermark" :style="style">
    <canvas
      v-if="!img"
      ref="canvas"
      class="x-watermark__inner"
      style="width: 100%; height: 100%"
    ></canvas>
    <img v-else :src="img" width="100%" height="100%">
  </div>
</template>

<script>
export default {
  name: 'XWatermark',
  props: {
    rotate: {
      type: Number,
      default: -30
    },
    text: {
      type: String,
      default: '水印内容'
    },
    fontStyle: {
      type: Object,
      default: () => ({
        size: 18,
        family: 'SimHei',
        color: '#000'
      })
    },
    opacity: {
      type: Number,
      default: 0.1
    }
  },
  data () {
    return {
      devicePxRatio: (window.devicePixelRatio || 2),
      img: '',
      style: {}
    }
  },
  created () {
    this.style = Object.assign({}, this.style, {
      opacity: this.opacity,
      width: '100%',
      height: '100%',
      'pointer-events': 'none'
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      const parentWidth = this.$refs.wrapper.offsetWidth
      const parentHeight = this.$refs.wrapper.offsetHeight
      canvas.width = parentWidth * this.devicePxRatio
      canvas.height = parentHeight * this.devicePxRatio

      // 重复绘制,详细说明：https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createPattern
      const pattern = ctx.createPattern(this.createSmallMark(), 'repeat')
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, parentWidth * this.devicePxRatio, parentHeight * this.devicePxRatio)
      this.img = canvas.toDataURL('image/png', 1)
    },

    // 创建水印小图
    createSmallMark () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      ctx.font = `${this.fontStyle.size}px ${this.fontStyle.family}`

      // 获取文字宽度用于计算canvas宽高
      const { width: textWidth } = ctx.measureText(this.text)

      // 宽度 = 文字宽度 * 设备像素比，防止模糊
      canvas.width = textWidth * this.devicePxRatio

      // 高度同宽度计算一样
      canvas.height = textWidth * this.devicePxRatio

      // 设置canvas style
      canvas.style = `width: ${textWidth}px; height: ${textWidth}px`

      ctx.translate(canvas.width / 2, canvas.height / 2 - this.fontStyle.size / 2)

      // 文字x轴对齐方式
      ctx.textAlign = 'left'

      // 文字y轴对齐方式
      ctx.textBaseline = 'bottom'

      ctx.font = `${this.fontStyle.size * 2}px ${this.fontStyle.family}`
      ctx.fillStyle = this.fontStyle.color
      ctx.rotate(this.rotate * Math.PI / 180)
      ctx.fillText(this.text, canvas.width / -2, -this.rotate)
      return canvas
    }
  }
}
</script>
