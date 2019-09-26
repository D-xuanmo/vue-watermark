<template>
  <i :class="['m-iconfont', type]"></i>
</template>
<script>
export default {
  name: 'MIcon',
  props: {
    type: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {

    }
  }
}
</script>
