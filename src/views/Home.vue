<template>
  <div class="Home">
    <div class="refWrap" :class="{'refWrap-2': refrigeratorInfo}">
      <!-- 实验室展示层-->
      <div class="labList" :class="{'labList-2': labRefrigerator, 'labList-3': refrigeratorInfo}">
        <p><span class="tatol">实验室总数:</span><span class="labNum">{{labList.length}}</span></p>
        <img @click="youhua" src="@/assets/img/arrowRight.png" class="arrowR arrow" :class="{'arrowR-2': labImgfangda }" v-show="labList.length > 3 && calleft < 0">
        <img @click="zuohua" src="@/assets/img/arrowLeft.png" class="arrowL arrow" :class="{'arrowL-2': labImgfangda }" v-show="labList.length  > 3 && calleft > -(labList.length - 3) * 300">
        <div class="labWrap" :class="{'labWrap-2': labImgfangda }" >
          <ul :style="{'left':calleft + 'px'}">
            <li v-for="(item,index) in labList" :key="index">
              <img src="@/assets/img/lab.png" class="labImg" :class="{'labImgActive': labActive == index, 'labImg-2': labImgfangda }" @click='refShow(index, item.id)'>
              <p><span :class="{'labName': labActive == index, 'labName1': labRefrigerator }">{{item.labName}}</span></p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 冰箱展示-->
      <div class="refrigeratorList" v-show="labRefrigerator" :class="{'refrigeratorList-2':refrigeratorInfo }">
        <p><span class="tatol">冰箱总数:</span><span class="labNum">{{refrigeratorList.length}}</span></p>
        <img @click="refYouhua" src="@/assets/img/arrowRight.png" class="arrowR arrow" :class="{'arrowR-2': labImgfangda }" v-show="refrigeratorList.length > 3 && refCalleft < 0">
        <img @click="refZuohua" src="@/assets/img/arrowLeft.png" class="arrowL arrow" :class="{'arrowL-2': labImgfangda }" v-show="refrigeratorList.length  > 3 && refCalleft > -(refrigeratorList.length - 3) * 300">
        <div class="labWrap">
          <!--<ul :style="{'left':refCalleft + 'px'}">-->
          <ul :style="{'left':refCalleft + 'px'}">
            <li v-for="(item,index) in refrigeratorList" :key="index">
              <!--<img :src=item.pic class="refImg" :class="{'refImgActive':refActive == index}" @click="showRefInfo(index)">-->
              <img :src=item.pic class="refImg" :class="{'refImgActive': refActive == index}" @click="showRefInfo(index, item.id)">
            </li>
          </ul>
        </div>
      </div>
      <!--数据分析-->
      <div class="refrigeratorList" :class="{'analyze': labImgfangda }" v-show="refrigeratorInfo && refrigeratorList.length > 0">
        <div class="refInfoLeft">
            <p><span>冰箱名称：</span>
              <span>{{refName}}</span></p>
            <p><span>冰箱品牌：</span>
              <span>{{refBrand}}</span></p>
            <p><span>冰箱型号：</span>
              <span>{{refType}}</span></p>
            <p><span>放置地点：</span>
              <span>{{refPlace}}</span></p>
            <p><span>设置温度：</span>
              <span>{{refTemperature}}</span>℃</p>
        </div>
        <div class="refInfoCenter" :style="{width: '38%'}">
          <h4 :style="{marginLeft:'35px'}">总体使用情况</h4>
          <div id="allSpace" :style="{width: '235px',height: '200px',right:'-30px'}">

          </div>

        </div>
        <div class="refInfoRight" :style="{width: '38%'}">
          <h4 :style="{marginLeft:'35px'}">每层使用情况</h4>
          <div id="cellSpace" :style="{width: '235px',height: '200px'}">

          </div>
        </div>
      </div>
    </div>
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
               ><!--&& active==index-->
                <div class="doorknobWrap">
                    <div class="doorknob"></div>
                    <div class="doorknob_btn1"></div>
                    <div class="doorknob_btn2"></div>
                </div>
              </div>
              <table class="sampleTable" style="table-layout: fixed;">
                <tr>
                  <td>
                    <div class="td-wrap">12
                      <!--<div class="drawer">-->
                        <!--<div class="btn">12</div>-->
                      <!--</div>-->
                      <!--<div class="drawer_tl">-->
                        <!--<div class="bottom">-->
                          <!--<div class="sampel_box1">-->
                            <!--<div class="cap"></div>-->
                            <!--<div class="befor"></div>-->
                            <!--<div class="aside"></div>-->
                          <!--</div>-->
                          <!--<div class="front">-->
                            <!--<div class="btn_2"></div>-->
                          <!--</div>-->
                          <!--<div class="left"></div>-->
                          <!--<div class="right"></div>-->
                        <!--</div>-->
                      <!--</div>-->
                    </div>
                  </td>

                </tr>

              </table>
          </div>
        </div>
    </div>
    <!-- 相关事件报警 -->
    <div class="sampleWarning"  :style="{ transform:  `translateX(${sampleWarningShow? '0' : '85%'})`}">
      <div class="sampleWarningL" @click="warningShow">
        <el-badge :value="warningAll">
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
              <el-badge :value="item.warningNum" :hidden="item.warningNum == 0 ? true : false ">
                  <span>{{item.title}}</span>
              </el-badge>
          </li>
        </ul>
        <div class="warningContent" v-show="warningActive == 0">
          <p v-for="(item,index) in sampleWarningList[0].content"
             :key="index"><span>{{item.name}}</span><span>({{item.sampleStru.detailLocation}})</span><span>已过期,请及时处理！</span></p>
        </div>
        <div class="warningContent" v-show="warningActive == 1" >
          <p v-for="(item,index) in sampleWarningList[1].content"
             :key="index"><span>{{item.name}}</span><span>({{item.sampleStru.detailLocation}})</span><span>已过期,请及时处理！</span></p>
        </div>
        <div class="warningContent" v-show="warningActive == 2">
          <p v-for="(item,index) in sampleWarningList[2].content"
             :key="index"><span>{{item.name}}</span><span>({{item.sampleStru.detailLocation}})</span><span>逾期,请及时处理！</span></p>
        </div>
        <div class="warningContent" v-show="warningActive == 3">
          <p v-for="(item,index) in sampleWarningList[3].content"
             :key="index"><span>{{item.name}}</span><span>({{item.sampleStru.detailLocation}})</span><span>即将逾期,请及时处理！</span></p>
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
      // labId:'',//冰箱id
      labImgfangda: false,
      labActive: -1,
      refActive: -1,
      pliesNum: 4, //冰箱层数
      isA: false,
      active: -1, //冰箱层数选中
      warningActive: 0, // 相关事件报警选中
      warningAll:0,//相关事件报警总数
      labList:[ // 实验室列表
      ],
      calleft: 0,
      refCalleft: 0,
      refrigeratorList:[ // 冰箱列表
        // {
        //   // pic: ''
        // },
        // {
        //
        // },
        // {
        //
        // }
      ],
      sampleWarningList:[
        {
          title: '已过期',
          warningNum: 0,
          content:[]
        },
        {
          title: '快过期',
          warningNum: 0,
          content:[]
        },
        {
          title: '逾期',
          warningNum: 0,
          content:[]
        },
        {
          title: '其它',
          warningNum: 0,
          content:[]
        }
      ],
      refName:'',
      refBrand:'',
      refType:'',
      refPlace:'',
      refTemperature:'',
      commonSampleNum:'',//饼图普通样本数量
      commonSampleNumZhu:[],//柱状普通样本数量
      totalSpace:'',//饼图总数
      totalSpaceZhu:[],//柱状总数
      surplus:'',//饼图剩余数量
      surplusZhu:[]//饼图剩余数量
    };
  },
  created () {
    this.$axios({
      method:'get',//相关事件报警
      url:'sampleGuide/index/sampleEventAlarm'
    })
      .then(({data})=>{
        // console.log(data);
        this.warningAll = data.data.rfidSampleExpireList.length + data.data.rfidSampleNearExpireList.length + data.data.rfidLoanSampleExpireList.length + data.data.rfidLoanSampleAboutToExpireList.length
        this.sampleWarningList[0].warningNum = data.data.rfidSampleExpireList.length
        data.data.rfidSampleExpireList.forEach((item)=>{
          this.sampleWarningList[0].content.push(item)
        })
        this.sampleWarningList[1].warningNum = data.data.rfidSampleNearExpireList.length
        data.data.rfidSampleNearExpireList.forEach((item)=>{
          this.sampleWarningList[1].content.push(item)
        })
        this.sampleWarningList[2].warningNum = data.data.rfidLoanSampleExpireList.length
        data.data.rfidLoanSampleExpireList.forEach((item)=>{
          this.sampleWarningList[2].content.push(item)
        })
        this.sampleWarningList[3].warningNum = data.data.rfidLoanSampleAboutToExpireList.length
        data.data.rfidLoanSampleAboutToExpireList.forEach((item)=>{
          this.sampleWarningList[3].content.push(item)
        })
      })
    this.$axios({
      method:'get',//实验室
      url:'sampleGuide/index/findLaboratoryDictAndUserNameAndRefrigeratorStruAndSampleCount'
    })
      .then(({data})=>{
        // console.log(data)
        data.data.laboratoryDictList.forEach((item)=>{
          this.labList.push({
            id: item.id,
            labName: item.name
          })
        })
      })

  },
  mounted(){
    // this.drawLine();
  },
  methods: {
    // toggleRef(index) {
    //   // this.isA=!this.isA
    //   this.active=this.active == index ? '' : index
    // },
    refShow(index,labId){
      // console.log(labId)
        this.labRefrigerator = true
        this.labActive = index
        this.refrigeratorList = []
        this.$axios({
          method: 'post',
          url: 'sampleGuide/index/findAllRefrigeratorStruByLaboratoryDictId',
          data: ({
            id:labId
          })
        })
          .then(({data})=>{  //冰箱展示
            console.log(data)
            data.data.forEach((item)=>{
              // item.refrigeratorBrandTypeDict.pic:  require(`@/assets/img/${item.picture}`)
              this.refrigeratorList.push({
                id: item.id,
                // name: item.name,
                pic:  require(`@/assets/img/${item.refrigeratorBrandTypeDict.picture}`)
              })
            })
          })
        // console.log(this.labActive);

    },
    warningShow(){
      this.sampleWarningShow = !this.sampleWarningShow
    },
    showRefInfo(index,refId){
      // console.log(refId)

      this.labImgfangda = true
      this.refrigeratorInfo = true
      this.refActive = index
      this.commonSampleNumZhu = []
      this.totalSpaceZhu = []
      this.surplusZhu = []
      this.$axios({
        method: 'post',
        url: 'sampleGuide/index/findRefrigeratorStruInfoById ',
        data: ({
          id:refId
        })
      })
        .then(({data})=>{ //冰箱内部信息展示图表
          console.log(data)
          //饼状图展示
          this.commonSampleNum = data.data.commonBatchSampleTotalSpaceVO.commonSampleNum
          this.totalSpace = data.data.commonBatchSampleTotalSpaceVO.totalSpace
          this.surplus = this.totalSpace - this.commonSampleNum
          this.refBrand = data.data.refrigeratorStruBrand
          data.data.refrigeratorStruList.forEach((item)=>{
            //冰箱信息展示
            this.refName = item.name
            this.refType = item.refrigeratorBrandTypeDict.name
            this.refPlace = item.laboratoryDict.name
            this.refTemperature = item.temperature
          })
          //柱状图表冰箱层数展示
          for(let i in data.data.indexMap){
              data.data.indexMap[i].forEach((item)=>{
                  this.commonSampleNumZhu.push(item.commonSampleNum)
                  this.totalSpaceZhu.push(item.totalSpace)
                  this.surplusZhu.push(item.totalSpace - item.commonSampleNum)
              })

          }
          this.drawLine();
        })

    },
    openPliesMasking(index){
      this.active = this.active === index ? -1 : index
    },
    warningSelect(index){
      this.warningActive = index
    },
    drawLine(){
      // console.log(this.surplus)
      let myChart = this.$echarts.init(document.getElementById('allSpace'))
      let nPercent = 100;
      myChart.setOption({
        title: {		//中间显示标题
          text: nPercent + '%',
          /*subtext: '20%',*/
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder',
            color: '#7d7d7d'
          }
        },
        color: ["#ccc", "#090ab7", "#01befe"],
        tooltip: {
          // show:refData[index].isCreatedRfidSampleBox,
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal',
          x: 'left',
          data: ['普通样本', '批量样本', '剩余空间'],
          selectedMode: false	//禁止点击事件
        },
        calculable: true,
        series: [
          {
            name: '总体使用情况',
            type: 'pie',
            radius: ['30%', '50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            data: [
              {value: this.surplus, name: '剩余空间'},
              {value: 0, name: '批量样本'},
              {value: this.commonSampleNum, name: '普通样本'}
            ]
          }
        ]
      });

      let cellChart = this.$echarts.init(document.getElementById('cellSpace'))
      cellChart.setOption({
        color: ["#01befe", "#090ab7", "#ccc"],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'none',			// 坐标轴指示器
            shadowStyle: {
              width: 'auto',
              type: 'default'
            }
          }
        },
        grid: {
          x: 40,
          x2: 40
        },
        legend: {
          data: ['普通样本', '批量样本', '剩余空间'],
          selectedMode: false	//禁止点击事件
        },
        calculable: true,
        xAxis: [
          {
            show: false,//坐标轴不显示
            type: 'value',
            splitLine: {
              show: false //网格不显示
            }
          }

        ],
        yAxis: [
          {
            show: false,
            type: 'category',
            data : this.totalSpaceZhu,
            splitLine: {
              show: false
            }
          }

        ],
        series: [

          {
            name: '普通样本',
            type: 'bar',
            stack: '总量',
            itemStyle: {normal: {label: {show: false, position: 'left'}, labelForeColor: 'blue'}},
            data: this.commonSampleNumZhu,
            barMaxWidth: 20
          },
          {
            name: '批量样本',
            type: 'bar',
            stack: '总量',
            itemStyle: {normal: {label: {show: false, position: 'center'}, labelForeColor: 'blue'}},
            data: [],
            barMaxWidth: 20
          },
          {
            name: '剩余空间',
            type: 'bar',
            stack: '总量',
            itemStyle: {normal: {label: {show: true, position: 'right'}, labelForeColor: 'blue'}},
            data: this.surplusZhu,
            barMaxWidth: 20

          }

        ]

      });

    },

    //点击按钮左移
    zuohua() {
      this.calleft -= 300;
      if (this.calleft < -((this.labList.length - 3) * 300)) {
        this.calleft = -(this.labList.length - 3) * 300;
      }
    },
    refZuohua() {
      this.refCalleft -= 300;
      if(this.refCalleft < -((this.refrigeratorList.length - 3) * 300)){
        this.refCalleft = -(this.refrigeratorList.length - 3) * 300;
      }
    },
    //点击按钮右移
    youhua() {
      this.calleft += 300;
      if (this.calleft > 0) {
        this.calleft = 0;
      }
    },
    refYouhua() {
      this.refCalleft += 300;
      if (this.refCalleft > 0) {
        this.refCalleft = 0;
      }
    }

  },
};
</script>
<style scoped lang='less'>
.Home {
  padding-left:30px;
}
.refWrap{
  /*width: 100%;*/
  .tatol{
    color: #00c9ff;
  }
  .labList{
      width: 50%;
      margin: 0 auto;
      margin-top: 10%;
      position: relative;
      padding:10px;
      transition: 1s;
      /*&:hover .arrow{*/
        /*opacity: 1;*/
        /*transition: 2s;*/
      /*}*/
    .arrow{
      width:30px;
      height: 30px;
    }
      .labNum{
        margin-left: 10px;
      }
      .labWrap-2{
        height: 160px !important;
      }
      .arrowL-2{
        left: -5% !important;
       }
     .arrowR-2{
      right: -5% !important;
     }
      .labWrap{
        /*width: 900px;*/
        position: relative;
        text-align: center;
        width: 100%;
        overflow: hidden;
        margin-top: 5px;
        height: 190px;

        /*transition:width 2s;*/
        ul{
          position: absolute;
          width: 5000px;
          height: 100%;
          left: 0px;
          transition: 1s;
        }
        li{
          float: left;
          width: 300PX;
          text-align: center;

        }
        .labImg{
          width: 60%;
           /*height: 200PX;*/
          margin-bottom: 15px;
          cursor: pointer;
        }
        .labImg-2{
          width: 49%;
        }

      }
  }
  .refrigeratorList{
    width: 50%;
    margin: 0 auto;
    /*border: 1px solid rgb(204, 204, 204);*/
    margin: 0 auto;
    border-radius: 5px;
    padding: 5px;
    position: relative;
    transition: 1s;
    .arrow{
      width:30px;
      height: 30px;
    }
    /*&:hover .arrow{*/
      /*opacity: 1;*/
      /*transition: 2s;*/
    /*}*/
    .labNum{
      margin-left: 10px;
    }
    .labWrap{
      position: relative;
      height: 160px;
      text-align: center;
      width: 100%;
      overflow: hidden;
      margin-top: 5px;
      ul{
        position: absolute;
        width: 5000px;
        height: 100%;
        transition: 1s;
      }
      li{
        float: left;
        width: 300PX;
      }
      .refImg{
        width: 45%;
        margin-top: 19px;
        cursor: pointer;
      }
    }
  }
  .labImgActive{
    opacity: 1 !important;
    transform: scale(1.1)!important;
  }
  .labName{
    opacity: 1!important;
  }
  .labList-2{
    /*border: 1px solid rgb(204, 204, 204);*/
    /*width: 100%;*/
    margin: 0 auto;
    margin-top: 4%;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 15px;
    .labImg{
      opacity: 0.3;
      transform: scale(0.8);
    }
    .labName1{
      opacity: 0.3;
    }
  }
  .labList-3{
    // border: 1px solid rgb(204, 204, 204);
    margin: 0;
    /*margin-top: 10%;*/
    width:100%;
    margin-bottom: 10px;
    margin-left: 5%;
    // border-radius: 5px;
    // padding: 5px;
    // margin-bottom: 15px;
    animation:mymove 2s;
    @keyframes mymove
    {
      from {
        margin-bottom:10%;
        /*margin-left:15%;*/
      }
      to {
        margin-bottom:10px;
        /*margin-left:5%;*/
      }
    }
    .labImg{
      opacity: 0.3;
      /*height: 120px;*/
      /*width: 120px;*/
    }
    // .labImg{
    //   width: 100PX;
    // }
  }
  .refImgActive{
    opacity: 1 !important;
    transform: scale(1.1) !important;
  }
  .refrigeratorList-2{
    width: 100%;
    margin: 0;
    margin-bottom: 10px;
    margin-left: 5%;
    animation:mymove 1s;
    .refImg{
      opacity: 0.3;
      transform: scale(0.8);
    }
    .arrowR-2{
      right: -5% !important;
    }
    .arrowL-2{
      left: -5% !important;
    }
  }
  .analyze{
    /*margin-left: 5% !important;*/
    width: 100%;
  }
}
.refInfo{
  width: 45%;
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
    left: 38%;
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
          border: 1px solid gray;
          /*table-layout: fixed;*/
          td{
            border: none;
            border-right: 1px solid gray;
            border-bottom: 1px solid gray;
            .td-wrap{
              width:100%;
              height:100%;
              position:relative;
              font-size: 8PX;
              /*.drawer{*/
                /*width:100%;*/
                /*height:100%;*/
                /*cursor: pointer;*/
                /*position: relative;*/
                /*.btn{*/
                  /*width: 100%;*/
                  /*height: 100%;*/
                  /*position: absolute;*/
                  /*top: 50%;*/
                  /*margin-top: -25%;*/
                  /*text-align:center;*/
                  /*color:gray;*/
                /*}*/
              /*}*/
              /*.drawer_tl{*/
                /*position:absolute;*/
                /*left: 50%;*/
                /*margin-left: -13px;*/
                /*!*display:none;*!*/
                /*.bottom{*/
                  /*position:absolute;*/
                  /*width:26px;*/
                  /*height:80px;*/
                  /*background:#d3d3d3;*/
                  /*z-index:10;*/
                  /*transform-origin:top;*/
                  /*transform:rotateX(60deg) skewX(30deg);*/

                /*}*/
                /*.bottom{*/
                  /*.sampel_box1,.sampel_box2,.sampel_box3,.sampel_box4,.sampel_box5{*/
                    /*position:absolute;*/
                    /*width:24px;*/
                    /*height:24px;*/
                  /*}*/
                  /*.sampel_box2{*/
                    /*margin-top:33px;*/
                  /*}*/
                  /*.sampel_box3{*/
                    /*margin-top:66px;*/
                  /*}*/
                  /*.sampel_box4{*/
                    /*margin-top:99px;*/
                  /*}*/
                  /*.sampel_box5{*/
                    /*margin-top:133px;*/
                  /*}*/
                  /*.sampel_box1 div{*/
                    /*position:absolute;*/
                  /*}*/
                  /*div[class^="sampel_box"] .cap{*/
                    /*background:linear-gradient(to bottom,#addaec,#eee);*/
                  /*}*/
                  /*div[class^="sampel_box"] .aside{*/
                    /*background:linear-gradient(to left,skyblue,#eee);*/
                  /*}*/
                  /*div[class^="sampel_box"] .befor{*/
                    /*background:#a6d7ec;*/
                  /*}*/
                  /*.sampel_box1 .cap{*/
                    /*width:18px;*/
                    /*height:30px;*/
                    /*transform: skewX(-30deg) translateY(-24px);*/
                    /*top:24px;*/
                  /*}*/
                  /*.sampel_box1 .aside{*/
                    /*width: 22px;*/
                    /*height: 25px;*/
                    /*transform-origin: left;*/
                    /*transform: skewY(-60deg);*/
                    /*bottom: -14px;*/
                  /*}*/
                  /*.sampel_box1 .befor{*/
                    /*width:18px;*/
                    /*height:25px;*/
                    /*transform: translateX(22px) translateY(-25px);*/
                  /*}*/

                  /*.sampel_box2 .cap,.sampel_box3 .cap,.sampel_box4 .cap,.sampel_box5 .cap{*/
                    /*width:18px;*/
                    /*height:30px;*/
                    /*transform: skewX(-30deg) translateY(0px) translateX(14px);*/
                    /*top:24px;*/
                  /*}*/
                  /*.sampel_box2 .aside,.sampel_box3 .aside,.sampel_box4 .aside,.sampel_box5 .aside{*/
                    /*width: 22px;*/
                    /*height: 25px;*/
                    /*background:linear-gradient(to left,skyblue,#eee);*/
                    /*transform-origin: left;*/
                    /*transform: skewY(-60deg) translateY(-41px);*/
                  /*}*/
                  /*.sampel_box2 .befor,.sampel_box3 .befor,.sampel_box4 .befor,.sampel_box5 .befor{*/
                    /*width:18px;*/
                    /*height:25px;*/
                    /*background:skyblue;*/
                    /*transform:translateX(22px) translateY(-54px);*/
                  /*}*/
                /*}*/
                 /*.bottom>div{*/
                  /*position:absolute;*/
                /*}*/
                /*.front{*/
                  /*position:absolute;*/
                  /*width:26px;*/
                  /*height:26px;*/
                  /*line-height:26px;*/
                  /*background:#eee;*/
                  /*border:1px solid rgb(170, 170, 170);*/
                  /*border-top:none;*/
                  /*bottom:0;*/
                  /*transform-origin:bottom;*/
                  /*transform:skewX(-30deg);*/
                  /*z-index:1;*/
                  /*cursor:pointer;*/
                  /*text-align:center;*/
                  /*color:gray;*/
                /*}*/
                /*.left{*/
                  /*width:8px;*/
                  /*height:80px;*/
                  /*background:#f6f6f6;*/
                  /*transform-origin:left;*/
                  /*transform:skewY(-60deg);*/
                  /*border-left:1px solid rgb(170, 170, 170);*/
                  /*z-index:10;*/
                /*}*/
               /*.right{*/
                  /*width: 8px;*/
                  /*height: 80px;*/
                  /*background: #f6f6f6;*/
                  /*transform-origin: left;*/
                  /*transform: skewY(-60deg);*/
                  /*right: -7px;*/
                  /*z-index:-1;*/
                /*}*/
              /*}*/
            }
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
    .opendoor-2 {
      transform: rotateY(0deg);
    }
  }
}
.refWrap-2{
  width: 50%;
  float: left;

}
.arrow{
  position: absolute;
  top:40%;
  font-size: 14px;
  cursor:pointer;
  width: 48px;
  height:48px;
  opacity: 1;
}
.arrowL{
  left: -10%;
}
.arrowR{
  right: -10%;
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
          /*background: #00c9ff;*/
        }
        span{
          font-size: 14px;
        }
      }
    }
    .warningContent{
      overflow-y: auto;
      height: 90%;
      p{
        margin-left: 5px;
        color: red;
        font-size: 12px;
      }
    }
    .warningContentItem{
      word-wrap: break-word;
      margin-bottom: 5px;
    }
  }

}
.analyze{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.refInfoLeft{
  p{
    margin-bottom: 10px;
  }
  p>span{
    font-size: 12px;
  }
}

</style>
