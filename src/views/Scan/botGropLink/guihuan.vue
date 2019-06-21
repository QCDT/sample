<template>
  <div class="guihuan-wrap">
    <div class="in">
      <div class="row">
        <span>归还人:</span>
        <i>
          <el-input v-model="ghName" placeholder="请输入内容" size="small"></el-input>
        </i>
      </div>
      <h1>备注:</h1>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="1000"
        show-word-limit
      ></el-input>
      <div class="row botBtn">
        <tmpButton @click="eGuiHuan" style="margin:0 10px">归还</tmpButton>
        <tmpButton @click="$router.go(-1)">返回</tmpButton>
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
      ghName: '',
      textarea: ''
    }
  },
  methods: {
    eGuiHuan () {
      console.log('111: ', 111)
      this.$notify.info({
        title: '消息',
        message: {
          '归还人:': this.ghName,
          '备注:': this.textarea
        }
      })
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.guihuan-wrap {
  position: fixed;
  z-index: 90;
  top: 87px;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: #eee;
  .in {
    width: 1000px;
    padding: 0 100px;

    // background-color: #fff;
    margin: 50px auto 0;
    // border: 1px solid #aaa;
  }
}
.row {
  display: flex;
  white-space: nowrap;
  align-items: flex-end;
  margin-bottom: 10px;
  span {
    font-size: 17px;
    margin-right: 1em;
  }
}
h1 {
  font-size: 17px;
  font-weight: 500;
  margin-right: 1em;
  margin-bottom: 7px;
}
.botBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
}
</style>
