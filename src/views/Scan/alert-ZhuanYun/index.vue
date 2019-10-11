<template>
  <div class="zhuanyunbot-index">
    <h1 class="top-title">样本盒转移</h1>
    <div class="title">
      <h1>
        位置信息:
        <span >*</span>
      </h1>
      <span class="position">{{checkedBoxlist[0].address}}</span>
    </div>
    <div>
      <div class="item">
        <span>冰箱:</span>
        <el-select size="small" v-model="labValue" placeholder="请选择" @change="showLabRow">
          <el-option
            v-for="item in labOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>层数:</span>
        <el-select size="small" v-model="labRowValue" placeholder="请选择" @change="showDrawer">
          <el-option
            v-for="item in labRowOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item">
        <span>抽屉:</span>
        <el-select size="small" v-model="labDrawerValue" placeholder="请选择" @change="showSampleBox">
          <el-option
            v-for="item in labDrawerOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>样本盒:</span>
        <el-select size="small" v-model="sampleBox" placeholder="请选择">
          <el-option
            v-for="item in sampleBoxOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="bot-btn">
      <tmpButton @click="save">保存</tmpButton>
      <tmpButton @click="$emit('goBack')">返回</tmpButton>
    </div>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
export default {
  inject:['reload'],
  props: {checkedBoxlist:Array, checkedlist: Array},
  components: { tmpButton },
  data () {
    return {
      labValue:'', // 冰箱id值
      labOption:[],//所有冰箱
      labRowValue:'',// 冰箱层数id值
      labRowOption:[],//冰箱层数
      labDrawerValue:'', //冰箱抽屉id
      labDrawerOption:[], //冰箱抽屉
      sampleBox:'',//样本盒位置id
      sampleBoxOption:[], //样本盒位置
      matrixData: [
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' }
        ],
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' }
        ],
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' }
        ],
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' }
        ],
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' }
        ],
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' }
        ]
      ]
    }
  },
  created(){
    this.$axios({ // ........冰箱名称渲染
      method: 'get',
      url:'/sampleGuide/set/selectRefrigeratorName'
    })
    .then(({data})=>{
      console.log(data)
      data.data.forEach((item)=>{
        this.labOption.push({
          value:item.id,
          label: item.name
        })
      })
    })
  },
  methods: {
    save () {
          if(this.labRowValue =='' || this.labValue == '' || this.labDrawerValue =='' || this.sampleBox =='' ){
            this.$alert('请完善该页面信息', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          }else{
            this.$axios({
                method:'post',
                url: '/sampleGuide/set/updateSampleBoxStru',
                data:({
                  id: this.checkedBoxlist[0].id,
                  refrigeratorStruId :this.labValue,
                  tierStruId: this.labRowValue,
                  drawerStruId: this.labDrawerValue,
                  row: this.sampleBox,
              })
            })
            .then(({data})=>{
                console.log(data)
                this.$message({
                  message: '转移样本盒成功！',
                  type: 'success'
                });
                this.reload()
            })
        }
    },
    showLabRow () { // 冰箱层数的渲染
      this.labRowOption = []
      this.labRowValue = ''
      this.labDrawerValue = ''
      this.labDrawerOption = []
      this.sampleBoxOption = []
      this.sampleBox = ''
      this.$axios({
        method: 'post',
        url:'sampleGuide/set/selectTier',
        data:({
          refrigeratorStruId: this.labValue
        })
      })
      .then(({data})=>{
        console.log(data)
        data.data.forEach((item)=>{
          this.labRowOption.push({
            value: item.id,
            label:item.row
          })
        })
      })
    },
    showDrawer(){   //层数切换时加载相应的抽屉
      this.labDrawerValue = ''
      this.labDrawerOption = []
      this.sampleBoxOption = []
      this.sampleBox = ''
      this.$axios({
        method: 'post',
        url:'/sampleGuide/guest/selectDrawerStruByTierStru',
        data:({
          tierStruId:{
            id:this.labRowValue
	        }
        })
      })
      .then(({data})=>{
          console.log(data)
          data.data.forEach((item)=>{
            this.labDrawerOption.push({
              value:item.id,
              label:item.number
            })
          })
      })
    },
    showSampleBox(){ //抽屉切换时加载相应可选的样本盒位置
      this.sampleBoxOption = []
      this.sampleBox = ''
      this.$axios({
        method:'post',
        url: 'sampleGuide/set/selectSampleBoxStru',
        data:({
          drawerStruId:this.labDrawerValue
        })
      })
      .then(({data})=>{
        console.log(data)
        data.data.forEach((item)=>{
          this.sampleBoxOption.push({
            value: item.row,
            label:item.row
          })
        })
      })
    },
  },
  computed: {}
}
</script>
<style scoped lang='less'>

.zhuanyunbot-index {
  /*padding-top: 30px;*/
  /*padding-left: 70px;*/
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    h1{
      font-size: 18px;
      span{
        color: red
      }
    }
    .position{
        margin-left: 30px;
        font-size: 14px;
    }
  }
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
}
.item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span {
    white-space: nowrap;
    width: 4vw;
    margin-left: 20px;
  }
}
.bot-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  &/deep/ button {
    margin: 0 30px;
  }
}
</style>
