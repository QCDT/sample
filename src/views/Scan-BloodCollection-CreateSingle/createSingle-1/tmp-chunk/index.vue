<template>
  <!-- 添加患者信息 -->
  <div class="add-patient-info-box">
    <div class="in-chunk">
      <div class="card-box">
        <div class="title">
          <slot name="title"></slot>
          <i class="el-icon-close close" @click="$emit('close')"></i>
        </div>
        <div class="tmp-content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
export default {
  props: {},
  components: { tmpButton },
  data () {
    return {
      input: '',
      showPrint: false
    }
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.add-patient-info-box {
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 87vh;

}

.in-chunk {
    overflow: hidden;

    width: 450px;
    height: 380px;

    border-radius: 10px;
}

.card-box {
    height: 100%;

    background-color: #fff;
}

.close {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 2px;

    cursor: pointer;

    color: #999;
    border-radius: 50%;
    background-color: #eee;

    &:hover {
        color: #fff;
        background-color: #999;
    }
}

.title {
    position: relative;

    display: flex;
    justify-content: space-between;

    padding: 7px;

    color: #fff;
    background-color: #eee;
    background-color: #3cd7ff;

    font-size: 15px;
}

.tmp-content {
    padding: 10px;
}

</style>
