<template>
  <div class="Home">
    <div class="refWrap" :class="{'refWrap-2': refrigeratorInfo}">
      <!-- 实验室展示层-->
      <div class="labList" :class="{'labList-2': labRefrigerator, 'labList-3': refrigeratorInfo}">
        <p><span>实验室总数:</span><span class="labNum">{{labList.length}}</span></p>
        <div class="labWrap">
          <ul>
            <li v-for="(item,index) in labList" :key="index">
              <img src="@/assets/img/lab.png" class="labImg" :class="{'labImgActive': labActive == index}" @click='refShow(index)'>
              <p><span>{{item.labName}}</span></p>
            </li>
          </ul>
          <img src="@/assets/img/arrowLeft.png" class="arrowL arrow">
          <img src="@/assets/img/arrowRight.png" class="arrowR arrow">
        </div>
      </div>
      <!-- 冰箱展示-->
      <div class="refrigeratorList" v-show="labRefrigerator" :class="{'refrigeratorList-2':refrigeratorInfo }">
        <p><span>冰箱总数:</span><span class="labNum">{{refrigeratorList.length}}</span></p>
        <div class="labWrap">
          <ul>
            <li v-for="(item,index) in refrigeratorList" :key="index">
              <img src="@/assets/img/refrigerator.jpg" class="refImg" @click="showRefInfo">
            </li>
          </ul>
            <img src="@/assets/img/arrowLeft.png" class="arrowL arrow">
            <img src="@/assets/img/arrowRight.png" class="arrowR arrow">
        </div>
      </div>
    </div>
    <!-- <div></div> -->
      <!-- 冰箱详情动画展示 -->
    <div class="refInfo" v-show="refrigeratorInfo">
        <img src="@/assets/img/ice_open.png">
        <div class="plies_wrap">
         <div v-for="(item,index) in pliesNum" 
              :key="index" class="plies" 
              :class="{'firstPlies': index==0}"
          >
               <div 
                  class="pliesMasking" 
                  @click="openPliesMasking(index)"
                  :class="{'opendoor': active==index}"
              >
                <div class="doorknobWrap">
                    <div class="doorknob"></div>
                    <div class="doorknob_btn1"></div>
                    <div class="doorknob_btn2"></div>
                </div>
              </div>         
              <table class="sampleTable" style="table-layout: fixed;">
                <!-- <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                </tr> -->
              </table>
          </div>
        </div>
    </div>
    <!-- 相关事件报警 -->
    <div class="sampleWarning"  :style="{ transform:  `translateX(${sampleWarningShow? '0' : '85%'})`}">
      <div class="sampleWarningL" @click="warningShow">
        <el-badge :value="12">
          <span>相关事件报警</span>
        </el-badge>
      </div>
      <div class="sampleWarningR">
        <ul class="sampleWarningList">
          <li v-for="(item,index) in sampleWarningList" 
              :key="index" 
              :class="{'active': index==warningActive }"
              @click="warningSelect(index)"
              >
              <el-badge :value="item.warningNum">
                  <span>{{item.title}}</span>
              </el-badge>
          </li>
        </ul>
        <div class="warningContent" v-show="warningActive == 0">
          <p>11</p>
        </div>
        <div class="warningContent" v-show="warningActive == 1" >
          <p>22</p>
        </div>
        <div class="warningContent" v-show="warningActive == 2">
          <p>33</p>
        </div>
        <div class="warningContent" v-show="warningActive == 3">
          <p>44</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      labRefrigerator: false, // 冰箱展示开关
      refrigeratorInfo: false ,// 冰箱详情展示
      sampleWarningShow: false,
      labActive: 0,
      refActive: 0,
      pliesNum: 4, //冰箱层数
      active: -1, //冰箱层数选中
      warningActive: 0, // 相关事件报警选中
      labList:[ // 实验室列表
        {
          labName:'aaa',
        },
        {
          labName:'aaa',
        },
        {
          labName:'aaa',
        },
        {
          labName:'aaa',
        },
        {
          labName:'aaa',
        },
        {
          labName:'aaa',
        },
        {
          labName:'aaa',
        },
        {
          labName:'aaa',
        }
      ],
      refrigeratorList:[ // 冰箱列表
        {

        },
        {

        },
        {

        }
      ],
      sampleWarningList:[
        {
          title: '已过期',
          warningNum: 3
        },
        {
          title: '快过期',
          warningNum: 6
        },
        {
          title: '逾期',
          warningNum: 9
        },
        {
          title: '其它',
          warningNum: 10
        }
      ]
    };
  },
  methods: {
    refShow(index){
      this.labRefrigerator = true
      this.labActive = index
      console.log(this.labActive);
    },
    warningShow(){
      this.sampleWarningShow = !this.sampleWarningShow
    },
    showRefInfo(){
      this.refrigeratorInfo = true
    },
    openPliesMasking(index){
       this.active = index
    },
    warningSelect(index){
      this.warningActive = index
    }
  },
  computed: {}
};
</script>
<style scoped lang='less'>
.Home {
  padding-left:30px;
}
.refWrap{
  .labList{
      width: 900PX;
      margin: 0 auto;
      margin-top: 10%;
      position: relative;
      padding:10px;
      transition: 1s;
      &:hover .arrow{
        opacity: 1;
        transition: 2s;
      }
      .labNum{
        margin-left: 10px;
      }
      .labWrap{
        text-align: center;
        width: 100%;
        overflow: hidden;
        margin-top: 5px;
        ul{
          width: 5000px;
          height: 100%;
        }
        li{
          float: left;
          width: 300PX;
          text-align: center;
        }
        .labImg{
          width: 200px;
          // height: 200PX;
          margin-bottom: 15px;
          cursor: pointer;
        }
      }
  }
  .refrigeratorList{
    width: 900PX;
    margin: 0 auto;
    border: 1px solid rgb(204, 204, 204);
    margin: 0 auto;
    border-radius: 5px;
    padding: 5px;
    position: relative;
    transition: 1s;
    &:hover .arrow{
      opacity: 1;
      transition: 2s;
    }
    .labNum{
      margin-left: 10px;
    }
    .labWrap{
      text-align: center;
      width: 100%;
      overflow: hidden;
      margin-top: 5px;
      ul{
        width: 5000px;
        height: 100%;
      }
      li{
        float: left;
        width: 300PX;
      }
      .refImg{
        width: 81PX;
        cursor: pointer;
      }
    }
  }
  .labImgActive{
    opacity: 1 !important;
  }
  .labList-2{
    border: 1px solid rgb(204, 204, 204);
    margin: 0 auto;
    margin-top: 4%;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 15px;
    .labImg{
      opacity: 0.5;
    }
  }
  .labList-3{
    // border: 1px solid rgb(204, 204, 204);
    margin: 0;
    margin-top: 10%;
    width:600PX;
    margin-bottom: 15px;
    // border-radius: 5px;
    // padding: 5px;
    // margin-bottom: 15px;
    .labImg{
      opacity: 0.5;
    }
    // .labImg{
    //   width: 100PX;
    // }
  }
  .refrigeratorList-2{
    width: 600PX;
    margin: 0;
  }
}
.refInfo{
  width: 50%;
  margin-top:5%;
  float: right;
  text-align: center;
  position: relative;
  img{
    width: 325px;
  }
  .plies_wrap{
    height: 220px;
    width: 100px;
    position: absolute;
    top: 22%;
    left: 39%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    transform: skewY(-30deg);
    background:#f6f6f6;
    .plies{
      width: 100%;
      cursor: pointer;
      position: relative;
      .pliesMasking{
        transform-origin: right;
        background: #E5E6E8;
        border:1px solid #bfbfbf;
        transition: 2s;
        width: 100%;
        height: 100%;
        z-index: 2;
        position:absolute;
        .doorknobWrap{
          width:25%;
          height:55%;
          background:#f3f3f3;
          border-top-right-radius:50%;
          border-bottom-right-radius:30%;
          margin-top: 11%;
          position: relative;
          .doorknob{
            width: 83%;
            height: 80%;
            position: absolute;
            top:5%;
            border: 1px solid #E5E6E8;
            border-top-right-radius:50%;
            border-bottom-right-radius:30%;
          }
          .doorknob_btn1{
            width: 30%;
            height: 60%;
            background:#AFAEB1;
            border-radius: 40%;
            position: absolute;
            top:21%;
          }
          .doorknob_btn2{
            width: 45%;
            height: 20%;
            background: #AFAEB1;
            box-shadow: 0px -1px 1px;
            position: absolute;
            top:45%;
            left: 15%;
          }
        }
      }
      .sampleTable{
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 1;
          text-align: center;
          border-collapse: collapse;
          border-spacing: 0;
          // font-size: 10px;
          td{
            border: none;
            border-right: 1px solid gray;
            border-bottom: 1px solid gray;
            &:last-of-type{
              border-right: none;
            }
          }
          tr:last-of-type td{
             border-bottom: none;
          }
      }
    }
    .firstPlies {
      border-top: 2px solid #ccc;
    }
    .opendoor {
      transform: rotateY(180deg);
    }
  }
}
.refWrap-2{
  float: left;
}
.arrow{
  position: absolute;
  top:40%;
  font-size: 14px;
  cursor:pointer;
  width: 48px;
  height:48px;
  opacity: 0;
}
.arrowL{
  left: -6%;
};
.arrowR{
  right: -6%;
}
.sampleWarning{
  width:450px;
  height: 400px;
  background:#fff;
  position: fixed;
  top:22%;
  right: 0px;
  border: 1px solid #ccc;
  border-radius: 40px 0 0 40px;
  box-shadow:-5px 0 5px #ccc;
  transition: 1s;
  z-index: 2;
  .sampleWarningL{
    float: left;
    width:60px;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
    /deep/.el-badge__content.is-fixed{
      top: -10px;
      right: 23px;
    }
    span{
      width:20px;
      display: inline-block;
      font-size: 18px;
    }
  }
  .sampleWarningR{
    float: right;
    border-left: 1px solid #ccc;
    height: 100%;
    width: 85%;
    .sampleWarningList{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .active{
        background: rgb(204, 204, 204)
      }
      li{
        width:98px;
        height: 35px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        text-align: center;
        line-height: 35px;
        cursor:pointer;
        /deep/.el-badge__content.is-fixed{
          top: 8px;
          right: 1px;
          background: #00c9ff;
        }
        span{
          font-size: 14px;
        }
      }
    }
    .warningContent{
      overflow-y: auto;
      height: 90%;
    }
    .warningContentItem{
      word-wrap: break-word;
      margin-bottom: 5px;
    }
  }
}
</style>