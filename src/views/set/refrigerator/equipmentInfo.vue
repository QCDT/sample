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
                <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input>
            </div>
            <div>
                <span>贮藏设备型号</span>
                <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input>
            </div>
            <div>
                <span>贮藏设备温度</span>
                <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input>
            </div>
            <div>
                <span>贮藏设备层高比例</span>
                <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input>
            </div>
            <div>
                <el-button type="primary" class="prevBtn" @click="prevEquipment">上一步</el-button>
                <el-button type="primary" class="nextBtn" @click="nextEquipment">下一步</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            equipmentName:''
        }
    },
    methods:{
        prevEquipment () {
            this.$router.push('/set/refrigerator/choicelaboratory')
        },
        nextEquipment () {
            this.$router.push('/set/refrigerator/equipmentConstruction')
        }
    }
}
</script>
<style lang="less">
.equipmentWrap{
    text-align: center;
    margin-top: 20px;
    .equipmentTitle{
        font-weight: bold;
        font-size: 20px;
    }
    .equipmentContent{
        // width: 50%;
        // margin: 0 auto;
        text-align: center;
        position: relative;
        >div{
            .el-input{
                width: 20%;
            }
            margin-top: 15px;
            text-align: center;
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
