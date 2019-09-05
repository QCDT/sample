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
                <el-select v-model="setBrand" placeholder="请选择" size="mini">
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
                <el-select v-model="setTier" placeholder="请选择" size="mini">
                    <el-option
                        v-for="item in setTierOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!-- <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input> -->
            </div>
            <div>
                <span>贮藏设备温度</span>
                <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input>
            </div>
            <div>
                <img src="@/assets/img/arrowLeft.png" class="prevBtn" @click="prevEquipment">
                <img src="@/assets/img/arrowRight.png" class="nextBtn" @click="nextEquipment">
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
      equipmentName: '',
      setBrand:'',
      setBrandOption:[
        // {
        //   label:'',
        //   value: ''  
        // }
      ]
    }
  },
  methods: {
    prevEquipment () {
      
      this.$router.push('/set/refrigerator/choicelaboratory')
    },
    nextEquipment () {
      this.$router.push('/set/refrigerator/equipmentConstruction')
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
    }
    .nextBtn{
        position: absolute;
        right: 20%;
        top: 22%;
    }
}
</style>
