<template>
    <div class="equipmentWrap">
        <div class='equipmentTitle'>
            <span>
                贮藏设备信息设置
            </span>
        </div>
        <div class="equipmentContent">
            <div>
                <span>贮藏设备名称</span>
                <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input>
            </div>
            <div>
                <span>贮藏设备品牌</span>
                <el-select  filterable allow-create v-model="setBrand" class="selectStyle" placeholder="请选择" size="mini" @change="changeModelNub">
                    <el-option
                        v-for="item in setBrandOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span>贮藏设备型号</span>
                <el-select filterable allow-create v-model="setModelNub" class="selectStyle" placeholder="请选择" size="mini">
                    <el-option
                        v-for="item in setModelNubOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!-- <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input> -->
            </div>
            <div>
                <span>贮藏设备温度</span>
                <el-input class="temStyle" v-model="temperature" placeholder="请输入内容" size="mini"></el-input>
                <em>℃</em>
            </div>
            <div>
                <img src="@/assets/img/arrowLeft2.png" class="prevBtn" @click="prevEquipment">
                <img src="@/assets/img/arrowRight2.png" class="nextBtn" @click="nextEquipment">
                <!-- <el-button type="primary" size="small" class="prevBtn" @click="prevEquipment">上一步</el-button>
                <el-button type="primary" class="nextBtn" @click="nextEquipment">下一步</el-button> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      equipmentName: '',//设备名称
      setBrand:'',//设备品牌
      setModelNub:'',//设备型号
      temperature:'',//设备温度
      setBrandOption:[
        // {
        //   label:'',
        //   value: ''
        // }
      ],
      setModelNubOption:[]
    }
  },
  created(){
    this.$axios({ // 查询所有冰箱品牌
      method:'get',
      url:'sampleGuide/refrigeratorBrandTypeDict/findAllBrand'
    })
    .then(({data})=>{
      // console.log(data)
      data.data.forEach((item)=>{
        this.setBrandOption.push({
          label: item.name,
          value: item.id
        })
      })
    })
  },
  methods: {
    prevEquipment () {
      this.$router.push('/set/refrigerator/choicelaboratory')
    },
    changeModelNub(){
        this.setModelNub = ''
        this.$axios({
            method: 'post',
            url:'sampleGuide/refrigeratorBrandTypeDict/findBrandNumber',
            data:{
            pid:this.trademark
            }
        })
        .then(({data})=>{
            data.data.forEach((item)=>{
            this.setModelNubOption.push({
                label:item.name,
                value:item.id
            })
            })
            console.log(data)
        })
    },
    nextEquipment () {
     if(this.equipmentName == '' || this.setBrand == '' || this.setModelNub == '' || this.temperature == ''){
        this.$message({
          message: '请完善贮藏设备基本信息',
          type: 'warning'
        });
     }else{
        this.$axios({
           method:'post',
           url:'sampleGuide/refrigeratorStru/checkRefrigeName',
           data:({
               name:this.equipmentName
           })
        })
        .then(({data})=>{
            console.log(data)
            this.$router.push('/set/refrigerator/equipmentConstruction')
        })
     }
    }
  }
}
</script>
<style lang="less" scoped>
.equipmentWrap{
    text-align: center;
    margin-top: 30px;
    .equipmentTitle{
        font-weight: bold;
        font-size: 20px;
    }
    .equipmentContent{
        // width: 50%;
        // margin: 0 auto;
        // text-align: center;
        position: relative;
        >div{
            .el-input{
                width: 20%;
            }
            .temStyle{
                width: 19%;
            }
            .selectStyle{
                width:20%;
            }
            margin-top: 15px;
            // text-align: center;
            >span{
                width: 10%;
                text-align: left;
                display: inline-block;
            }
        }
    }
    .prevBtn{
        position: absolute;
        left: 20%;
        top: 22%;
        cursor: pointer;
    }
    .nextBtn{
        position: absolute;
        right: 20%;
        top: 22%;
        cursor: pointer;
    }
}
</style>
