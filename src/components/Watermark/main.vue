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
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '100%'
    }
  },
  data () {
    return {
      devicePxRatio: (window.devicePixelRatio || 2),
      img: '',
      style: {}
    }
  },
  watch: {
    height (height) {
      this.style.height = height
      this.init()
    }
  },
  created () {
    this.style = Object.assign({}, this.style, {
      opacity: this.opacity,
      width: this.width,
      height: this.height,
      'pointer-events': 'none'
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.img = ''
      this.$nextTick(() => {
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
      })
    },

    // 创建水印小图
    createSmallMark () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      ctx.font = `${this.fontStyle.size}px ${this.fontStyle.family}`

      // 获取文字宽度用于计算canvas宽高
      const { width: textWidth } = ctx.measureText(this.text)

      const maxWidth = Math.sqrt(textWidth ** 2 + this.fontStyle.size ** 2)

      // 宽度 = 文字宽度 * 设备像素比，防止模糊
      canvas.width = maxWidth * this.devicePxRatio

      // 高度同宽度计算一样
      canvas.height = maxWidth * this.devicePxRatio

      // 设置canvas style
      canvas.style = `width: ${maxWidth}px; height: ${maxWidth}px`

      ctx.font = `${this.fontStyle.size * 2}px ${this.fontStyle.family}`

      ctx.fillStyle = this.fontStyle.color

      ctx.rotate(this.rotate * Math.PI / 180)

      if (this.rotate > 0) {
        ctx.translate(this.rotate / 2, 0)

        // 文字x轴对齐方式
        ctx.textAlign = 'left'

        // 文字y轴对齐方式
        ctx.textBaseline = 'top'
        ctx.fillText(this.text, 0, 0)
      } else {
        ctx.translate(this.rotate * 2, 0)

        // 文字x轴对齐方式
        ctx.textAlign = 'left'

        // 文字y轴对齐方式
        ctx.textBaseline = 'bottom'
        ctx.fillText(this.text, 0, canvas.height)
      }
      return canvas
    }
  }
}
</script>
