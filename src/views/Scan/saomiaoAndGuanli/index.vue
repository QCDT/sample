<template>
  <div>
    <div class="sample-tmp" v-show="!switchSaoMiao">
      <div class="pic">
        <img src="@/assets/img/sample.gif" alt>
      </div>
      <h1>扫描样本</h1>
      <span>请将样本放置在读写器上，然后点击上方按钮开始扫描</span>
    </div>
    <div class="sample-tmp"  v-show="switchSaoMiao">
      <div class="pic">
        <img src="@/assets/img/saomiao_scanbox.gif" alt>
      </div>
      <h1>扫描样本盒</h1>
      <span>请将样本盒放置在读写器上，然后点击上方按钮开始扫描</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
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
.sample-tmp {
  display: flex;

  // justify-content:center;
  align-items: center;
  flex-direction: column;

  width: 1366px;

  color: #00c9ff;
  .pic {
    margin-bottom: 12px;

    > img {
      width: 105px;
      height: 105px;
    }
  }

  h1 {
    margin-bottom: 7px;

    font-size: 1.25rem;
    font-weight: 500;
  }
}
</style>
