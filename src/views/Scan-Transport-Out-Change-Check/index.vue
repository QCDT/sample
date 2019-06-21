<template>
  <!-- 盘点 -->
  <div class="check-index">
    <!-- 1 -->
    <tmpChunk>
      <span slot="title">样本应用情况</span>
      <div slot="content">
        <div class="color-chunk-row">
          <colorChunk title="错误" bgc="#FF8784" bordercolor="#FF8784"></colorChunk>
          <colorChunk title="已使用" bgc="#C5C8C7" bordercolor="#C5C8C7"></colorChunk>
          <colorChunk title="未使用" bgc="#fff" bordercolor="#979797"></colorChunk>
        </div>
        <div class="table">
          <table>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </tmpChunk>
    <!-- 2 -->
    <tmpChunk>
      <span slot="title">盘点信息</span>
      <div slot="content" class="check-info">
        <h1>样本盒名称: TRGL期检测管样本盒6</h1>
        <h1>
          样本盒位置：
          <span>未选择</span>
        </h1>
        <div class="gif">
          <img src="@/assets/img/loadinging.gif" alt>
        </div>
        <h5>核验中</h5>
        <h6>
          <i class="icon icon-jinggao" style="color:#f56c6c"></i>
          <span>错误范围可能在标记为红色的区域内，请及时处理</span>
        </h6>
        <tmpButton>开始盘点</tmpButton>
      </div>
    </tmpChunk>
    <!-- 3 -->
    <tmpChunk>
      <span slot="title">盘点状态</span>
      <div slot="content">
        <div class="color-chunk-row">
          <colorChunk title="错误" bgc="#FF8784" bordercolor="#FF8784"></colorChunk>
          <colorChunk title="已使用" bgc="#C5C8C7" bordercolor="#C5C8C7"></colorChunk>
          <colorChunk title="未使用" bgc="#fff" bordercolor="#979797"></colorChunk>
        </div>
        <div class="table">
          <table>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </tmpChunk>
    <goBack></goBack>
  </div>
</template>
<script>
import tmpChunk from "./tmp-chunk";
import colorChunk from "@/components/tmp/zhanglan/color-chunk";
import goBack from "@/components/tmp/zhanglan/go-1";
import tmpButton from "@/components/tmp/zhanglan/tmpButton";
export default {
  props: {},
  components: { tmpChunk, colorChunk, goBack, tmpButton },
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>
<style scoped lang='less'>
.check-index {
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-around;
  padding: 50px 20px 220px;
}
.color-chunk-row {
  display: flex;
  justify-content: space-evenly;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.table {
  display: flex;
  justify-content: center;
  padding-top: 15px;
}
table,
td {
  border: 1px solid #333;
}
td {
  width: 37px;
  height: 250px;
}
// 盘点信息
.check-info{
    display: flex;
    flex-direction: column;
    
    align-items: center;
    padding-top: 20px;
    h1{
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 10px;
    }
    .gif{
        padding-top: 20px;
        margin-bottom:20px;
    }
    h5{
        font-weight: 500;
        color: orangered;
        margin-bottom: 10px;
    }
    h6{
        font-weight: 100;
        white-space: nowrap;
        padding-top: 10px;
        margin-bottom: 20px;
            color: orangered;
            font-size: 12px;
        
        display: flex;
        align-items: center;
        .icon{
            padding: 0 5px;
        }
        span{
            color: #D42F2F;
        }
    }
}
</style>