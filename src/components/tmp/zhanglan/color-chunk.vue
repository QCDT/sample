<template>
  <!-- 颜色块 -->
  <div class="color-chunk-box">
    <i class="color-chunk" :style="{borderColor:borderColor,
    backgroundColor:bgc
    }"></i>
    <span class="title">{{title}}</span>
  </div>
</template>
<script>
export default {
  props: {
    borderColor: { type: String, default: '#555' },
    bgc: { type: String, default: '#fff' },
    title: { type: String, default: '未传值' }
  },
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.color-chunk-box {
  display: flex;
  align-items: center;
}
.color-chunk {
  margin-right: 10px;
  width: 18px;
  height: 18px;
  display: inline-block;
  background-color: #999;
  border: 1px solid #333;
}
.title {
  display: inline-block;
  min-width: 3.5rem;
}
</style>
