<template>
  <div class="labWrap">
    <div class="labTitle">
      <span>选择实验室</span>
    </div>
    <div class="operationlab">
      <el-button type="primary" @click="addEl()" size="small">添加实验室</el-button>
      <el-button type="primary" @click="delEl()" size="small">删除实验室</el-button>
    </div>
    <div class="labListWrap">
      <ul class="labList" :style="{'left':calleft + 'px'}">
        <li
          v-for="(item,index) in list"
          :key="index"
          :class="{active:activeClass == index}"
          @click="chooselab(index)"
        >
          <img src="@/assets/img/lab.png" @dblclick="setFocus(index)">
          <div @dblclick="editLabName(index)" class="labName">
            <span v-show="!item.editing">{{item.laboratoryName}}</span>
            <el-input
              size="small"
              v-show="item.editing"
              v-model="item.laboratoryName"
              placeholder="请输入内容"
              @blur="blur(index)"
            ></el-input>
          </div>
        </li>
      </ul>
    </div>
    <img @click="zuohua" src="@/assets/img/arrowLeft.png" class="arrowL arrow" v-show="list.length  > 3 && calleft > -(list.length - 3) * 232">
    <img @click="youhua" src="@/assets/img/arrowRight.png" class="arrowR arrow" v-show="list.length > 3 && calleft < 0">
    <div class="labBtn">
      <el-button type="primary" size="small">保存</el-button>
      <el-button type="primary" @click="returnup()" size="small">返回</el-button>

    </div>
    <el-button type="primary" size="small" class="labNext" @click="equipmentInfo">下一步</el-button>
  </div>
</template>
<script>
// import { setTimeout } from "timers";
export default {
  data() {
    return {
      laboratoryName: "",
      calleft: 0,
      activeClass: -1,
      delIndex: -1,
      list: [
        {
          id: Date.now(),
          laboratoryName: "实验室1",
          editing: false
        },
        {
          id: Date.now(),
          laboratoryName: "实验室2",
          editing: false
        }
      ]
    };
  },
  methods: {
    chooselab(index) {
      console.log(index);
      this.delIndex = index;
      this.activeClass = index;
    },
    returnup(){
        this.$router.push('/set/refrigerator')
    },
    editLabName(index) {
      this.list[index].editing = true;
    },
    equipmentInfo () {
        this.$router.push('/set/refrigerator/equipmentInfo')
    },
    setFocus(index) {
      this.list.forEach(item => {
        item.editing = false;
      });
      this.list[index].editing = true;
      // setTimeout(() => {
      //   document.getElementById("focus" + index).focus();
      // }, 0);
    },

    blur(index) {
      console.log("视角时间: ", index);
      this.list[index].editing = false;
      this.list.forEach(item => {
        if (item.laboratoryName == "") {
          alert('请输入实验室名称');
        }
      });
    },
    addEl() {
      if(this.list.length >=3){
        this.calleft -= 232;
      }else{
        this.calleft = 0
      }
      // this.calleft -= 232;
      this.list.push({
        id: Date.now(),
        laboratoryName: "",
        editing: true
      });
      // setTimeout(() => {
      //   document.getElementById("focus" + (this.list.length - 1)).focus();
      // }, 0);
    },
    delEl() {
      if (this.delIndex == -1) {
        this.$alert("请选择删除的冰箱", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.list.splice(this.delIndex, 1);
          this.delIndex = -1;
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      }
      console.log(this.delIndex);
    },
    //点击按钮左移
    zuohua() {
      this.calleft -= 232;
      if (this.calleft < -((this.list.length - 3) * 232)) {
        this.calleft = -(this.list.length - 3) * 232;
      }
    },
    //点击按钮右移
    youhua() {
      this.calleft += 232;
      if (this.calleft > 0) {
        this.calleft = 0;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.labWrap{
    position: relative;
    width: 100%;
    .labTitle{
        text-align: center;
        margin-top: 30px;
        font-size: 18px;
    }
    .operationlab{
        width: 90%;
        text-align: right;
        margin: 20px 0;
    }
    .labListWrap{
      width: 696PX;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      height: 180px;
      /*&:hover .arrow{*/
        /*opacity: 1;*/
      /*}*/
    }
    .labList{
        width: 50000px;
        height: 100%;
        position: absolute;
        // display: flex;
        // justify-content: center;
        text-align: center;
        left: 0px;
        transition: 1s;
        // margin-top: 30px;
        li{
            width: 200PX;
            border: 1PX solid transparent;
            padding: 15PX;
            float: left;
            .labName{
                span{
                    margin-top: 10px;
                    display: inline-block;
                    // font-size: 14px;
                }
            }
        }
        img{
            width: 200PX;
            // height: 200px;
            cursor: pointer;
        }
        .active{
            border: 1PX solid #00c9ff;
        }
    }
    .labBtn{
        text-align: center;
        margin-top: 30px;
    }
    .labNext{
        position: absolute;
        top:50%;
        right:5%;
    }
}
.arrow{
    position: absolute;
    top: 50%;
    cursor: pointer;
    opacity: 1;
    transition: 3s;
}
.arrowL{
  left:25%;
}
.arrowR{
  right: 25%;
}
</style>
