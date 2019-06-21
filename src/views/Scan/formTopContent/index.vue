<template>
  <div class="selection-box">
    <div class="sum">
      <span>扫描总数:</span>
      <span>{{count}}</span>
    </div>
    <div class="right">
      <div class="item">
        <span>开始扫描样本盒:</span>
        <slot name="saomiao"></slot>
      </div>
      <div class="item" :class="{hidden:switchSaoMiao}">
        <span>批量管理模式:</span>
        <slot name="guanli"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    count: Number,
    switchSaoMiao: Boolean
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
.selection-box {
  display: flex;
  justify-content: space-between;

  //   扫描总数...那一排的

  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  span {
    font-size: 16px;
  }

  span:nth-child(2) {
    padding-left: 0.5em;

    background-color: #fff;
  }

  .right {
    display: flex;

    .item {
      margin-left: 20px;

      > span {
        padding-right: 7px;
      }
    }
  }
}
.hidden {
//   visibility: hidden;
transition: opacity .2s;
opacity: 0;
}
</style>
