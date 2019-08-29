<template>
  <div>
    <h1 class="top-title">样本盒详细信息</h1>
    <div class="change-wrap">
      <!-- 左边 -->
        <div class="left-box">
            <div class="content-item">
                <span>RFID编号</span>
                <span>{{boxRfid}}</span>
            </div>
            <div class="content-item">
                <span>样本盒名称</span>
                <span>{{boxname}}</span>
            </div>
            <div class="content-item">
                <span>录入时间</span>
                <span>{{boxtime}}</span>
            </div>
            <div class="mark">
                    <h1>备注</h1>
                    <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    maxlength="1000"
                    show-word-limit
                    v-model="boxMark"
                    ></el-input>
            </div>
        </div>
      <!-- 右边 -->
        <div class="right-box">
            <div class="content-item">
                <span>位置信息</span>
                <span>{{boxPosition}}</span>
            </div>
            <div class="content-item"> 
                <span class="location-info">样本盒规格</span>
            </div>
            <div class="row">
              <table class="table">
                    <tr class="row" v-for="(index) in rowValue" :key="index">
                        <td
                        v-for="(ind) in colValue"
                        :key="ind"
                        >{{showTable(index,ind)}}</td>
                    </tr>
              </table>
            </div>
        </div>
    </div>
    <div class="bot-btn">
      <tmpButton @click="$emit('goBack')">返回</tmpButton>
    </div>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
export default {
    props:{
        sampleBoxId:{type:Number,default:0}
    },
    components: {tmpButton},
    data(){
        return{
            boxRfid:'', // 样本盒Rfid
            boxname:'', // 样本盒名称
            boxtime:'', // 录入时间
            boxMark:'', // 备注内容
            boxPosition:'',// 样本盒位置
            rowValue: '',// 样本盒行
            colValue: '',// 样本盒列
            sampleModel:''
        }
    },
    created(){
        this.$axios({
          method: 'post',
          url:'/sampleGuide/set/selectSampleBoxDetailInfo',
          data:({
            id:this.sampleBoxId
          })
        })
        .then(({data})=>{
            console.log(data.data)
            this.boxRfid = data.data[0].rfidCode,
            this.boxname = data.data[0].name,
            this.boxtime = data.data[0].inputTime,
            this.boxMark = data.data[0].remarks,
            this.boxPosition = data.data[0].sampleBoxStru.detailLocation,
            this.rowValue = data.data[0].sampleBoxStru.structureCol,
            this.colValue = data.data[0].sampleBoxStru.structureRow,
            this.sampleModel = data.data[0].sampleBoxStru.structureSpec
            // structureSpec
        })
    },
    methods:{
        showTable (row,col) {
          console.log(this.showModel)
          let res = ''
          if(this.showModel == 1){
            res = row+'/'+col
          }else if(this.showModel == 2){
            res = row+'/'+String.fromCharCode(64 + col)
          }else if(this.showModel == 3){
            res = String.fromCharCode(64 + row)+'/'+col
          }else if(this.showModel == 4){
            res = String.fromCharCode(64 + row) +'/'+ String.fromCharCode(64 + col)
          }else{
            res = (row-1)*this.colValue+col
          }
          return res
        }
    }
}
</script>
<style lang="less" scoped>
.top-title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 0;
  background-color: #e2e2e2;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 500;

}
.change-wrap{
    display: flex;
    justify-content: space-around;
}
.row{
  margin-top: 20px;
}
.left-box {
  width: 40%;

}

.right-box {
  width: 40%;
}

.content-item {
  margin-top: 20px;
  font-size: 14px;
  span:first-child{
    width: 7vw;
    display: inline-block
  }
  span:last-child{
    font-weight: 600
  }
}

.mark {
  padding-top: 30px;
  h1 {
    margin-bottom: 12px;
  }
}

.map {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  //   width: 60px;

  width: 4rem;
  height: 150px;

  cursor: pointer;
  white-space: nowrap;

  font-size: 13px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 2px 3px;

    color: #333;
    border-radius: 3px;
    background-color: #f99;

    font-size: 13px;
  }
}

.bot-btn /deep/ button {
  margin: 0 20px;
}

.bot-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
}

.location-info {
  margin-bottom: 10px;
  font-size: 14px;
}
.table {
  border-spacing: 0;
  border: 2px solid #ccc;
  border-collapse: collapse;
  width: 80%;
  margin: 0 auto;
  td {
    padding: 5px;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 12px;
  }
}
</style>