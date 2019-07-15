<template>
  <!-- 归还 -->
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
      <i class="icon icon-edit record" title="归还记录">
        <small>查看归还记录</small>
      </i>
    </div>
    <!-- 归还记录 -->
<masking :rgba=0>
    <record></record>
</masking>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import masking from '@/components/tmp/zhanglan/maskTran'
import record from '@/views/Scan-GiveBack/alert-record'
export default {
  props: {},
  components: { tmpButton, masking, record },
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
        position: relative;

        width: 1000px;
        margin: 50px auto 0;
        padding: 0 100px;
        // border: 1px solid #aaa;
    }
}

.row {
    display: flex;
    align-items: flex-end;

    margin-bottom: 10px;

    white-space: nowrap;

    span {
        margin-right: 1em;

        font-size: 17px;
    }
}

h1 {
    margin-right: 1em;
    margin-bottom: 7px;

    font-size: 17px;
    font-weight: 500;
}

.botBtn {
    display: flex;
    align-items: center;
    justify-content: center;

    padding-top: 50px;
}

.record {
    display: flex;
    align-items: flex-end;

    cursor: pointer;
    cursor: pointer;
    transition: color .1s;

    color: #000;

    font-size: 35px;

    small {
        color: #000;

        font-size: 17px;
    }

    &:hover {
        color: #3cd7ff;
    }
}

</style>
