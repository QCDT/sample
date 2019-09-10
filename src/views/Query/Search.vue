<template>
  <div class="query-wrap">
    <!-- {{sampleSearch}} -->
    <div class="top">
      <div class="data">
        <div class="row row-spall">
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">
              样本名称:
            </span>
            <i class="tmp-row-empty-input">
              <el-input
                size="small"
                v-model="name"
                clearable
              ></el-input>
            </i>
          </div>
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title"> 查询类别</span>
            <i class="tmp-row-empty-input">
              <el-select
                size="small"
                clearable
                v-model="sampleItem"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in sampleItemOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </i>
          </div>
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title"> 借出人</span>
            <i class="tmp-row-empty-input">
              <el-select
                size="small"
                v-model="lender"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in lenderOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
            </el-select>
            </i>
          </div>
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">录入人</span>
            <i class="tmp-row-empty-input">
              <el-select
                size="small"
                clearable
                v-model="enterClerk"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in enterClerkOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </i>
          </div>
        </div>
        <div class="row row-spall">
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">样本类别</span>
            <i class="tmp-row-empty-input">
              <el-select
                size="small"
                clearable
                v-model="testTubeCategory"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in testTubeCategoryOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </i>
          </div>
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">样本来源</span>
            <i class="tmp-row-empty-input">
              <el-select
                slot="elUI"
                size="small"
                clearable
                v-model="source"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in sourceOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </i>
          </div>
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">状态</span>
            <i class="tmp-row-empty-input">
              <el-select
                slot="elUI"
                size="small"
                clearable
                v-model="status"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </i>
          </div>
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">项目名称</span>
            <i class="tmp-row-empty-input">
              <el-select
                slot="elUI"
                size="small"
                clearable
                v-model="itemClass"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in itemClassOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </i>
          </div>
        </div>
      </div>
      <!-- 搜索按钮 -->
      <blueSearch @click="startSearch "></blueSearch>
    </div>
    <!-- 高级搜索 -->
    <div class="advanced-search" :style="{height:asHeight}">
      <div v-show="showAdvancedSearch">
        <div class="row">
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">借出日期</span>
            <i class="tmp-row-empty-input">
              <el-date-picker
                slot="elUI"
                value-format="yyyy-MM-dd HH:mm:ss"
                clearable
                size="small"
                v-model="outDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </i>
          </div>
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">过期日期</span>
            <i class="tmp-row-empty-input">
              <el-date-picker
                slot="elUI"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small"
                clearable
                v-model="pastDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </i>
          </div>
        </div>
        <div class="row">
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">采样日期</span>
            <i class="tmp-row-empty-input">
              <el-date-picker
                slot="elUI"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small"
                clearable
                v-model="samplingDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </i>
          </div>
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title"> 录入日期</span>
            <i class="tmp-row-empty-input">
              <el-date-picker
                slot="elUI"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small"
                clearable
                v-model="enterData"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </i>
          </div>
        </div>
        <div class="row">
          <h2 style="white-space: nowrap;margin-right:22px">位置信息:</h2>
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">冰箱</span>
            <i class="tmp-row-empty-input">
              <el-select
                size="small"
                clearable
                v-model="refrigerator"
                placeholder="请选择"
                style="width:100%"
                @change="selectIceBox"
              >
                <el-option
                  v-for="item in refrigeratorOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </i>
          </div>
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">层数</span>
            <i class="tmp-row-empty-input">
              <el-select
                slot="elUI"
                clearable
                size="small"
                v-model="layer"
                placeholder="请选择"
                style="width:100%"
                @change="selectIcePlice"
              >
                <el-option
                  v-for="item in layerOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </i>
          </div>
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">抽屉</span>
            <i class="tmp-row-empty-input">
              <el-select
                slot="elUI"
                size="small"
                clearable
                v-model="chouTi"
                placeholder="请选择"
                style="width:100%"
                @change="selectDrawer"
              >
                <el-option
                  v-for="item in chouTiOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </i>
          </div>
          <div class="tmp-row-empty">
            <!-- XXX:输入框 | 选择框 -->
            <span class="tmp-row-empty-title">样本盒</span>
            <i class="tmp-row-empty-input">
              <el-select
                slot="elUI"
                size="small"
                clearable
                v-model="styleBox"
                placeholder="请选择"
                style="width:100%"
              >
                <el-option
                  v-for="item in styleBoxOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </i>
          </div>
          <tmpinput>

          </tmpinput>
        </div>
      </div>
    </div>

    <div class="gaoji-search">
      <div class="in" @click="toggleAdvancedSearch">
        <i class="icon" :class="[asHeight ==0 ?  'icon-xia' : 'icon-shang' ]"></i>
        <h1>{{asHeight ==0 ? '高级搜索' : '简化搜索' }}</h1>
      </div>
    </div>
  </div>
</template>
<script>
import tmpinput from '@/components/tmp/zhanglan/tmp-empty-input'
import blueSearch from '@/components/tmp/zhanglan/blueSearch'
export default {
  components: { tmpinput, blueSearch },

  data () {
    return {
      /* 是否高级搜索 */
      showAdvancedSearch: false,
      asHeight: 0,
      searchTableData:[],
      name: '', //样本名称
      sampleItem:0, //样本类别
      lender:'', // 借出人
      enterClerk:'',// 录入人
      testTubeCategory:'',// 样本类别
      source:'', //样本来源
      status:'',//样本状态
      itemClass:'', //项目类别
      outDate:'',// 借出日期
      pastDate:'', //过期日期
      samplingDate:'', //采样日期
      enterData:'', //录入日期
      refrigerator:'',//冰箱
      layer:'',//层数
      chouTi: '',//抽屉
      styleBox:'', //样本盒
      /* 下拉选择 */
      /* 样本类别 testTubeCategory */
      testTubeCategoryOption: [
        /* { value: 'A类别', label: 'A类别' },
        { value: 'B类别', label: 'B类别' } */
      ],
      /* 来源 source */
      sourceOption: [
        /* { value: 'A来源', label: 'A来源' },
        { value: 'B来源', label: 'B来源' } */
      ],
      // 借出人
      lenderOption:[

      ],
      //录入人
      enterClerkOption:[

      ],
      /* 状态 status */
      statusOption: [
        { value: 1, label: '正常' },
        { value: 2, label: '借出' },
        { value: 3, label: '预留' }
      ],
      /* 样本类别 sampleItem */
      sampleItemOption: [
        /* { value: '样本类别A', label: '样本类别A' },
        { value: '样本类别B', label: '样本类别B' } */
        { value: 0, label: '样本' },
        { value: 1, label: '样本盒' },
      ],
      /* 项目类别 itemClass */
      itemClassOption: [
        /* { value: '项目类别a', label: '项目类别a' },
        { value: '项目类别b', label: '项目类别b' } */
      ],
      /* 冰箱 refrigerator */
      refrigeratorOption: [
        /* { value: 'refrigeratorA', label: 'refrigeratorA' },
        { value: 'refrigeratorB', label: 'refrigeratorB' } */
      ],
      /* 层数 layer */
      layerOption: [
        /* { value: 'layer1', label: 'layer1' },
        { value: 'layer2', label: 'layer2' } */
      ],
      /* 抽屉 chouTi */
      chouTiOption: [
       /*  { value: 'chouTi1', label: 'chouTi1' },
        { value: 'chouTi2', label: 'chouTi2' } */
      ],
      /* 样式盒 styleBox */
      styleBoxOption: [
        /* { value: 'styleBox1', label: 'styleBox1' },
        { value: 'styleBox2', label: 'styleBox2' } */
      ]
    }
  },
  //查询初始化
  created(){
    this.$axios({ // ........冰箱名称渲染
      method: 'get',
      url:'/sampleGuide/set/selectRefrigeratorName'
    })
    .then(({data})=>{
      // console.log(data)
      data.data.forEach((item)=>{
        this.refrigeratorOption.push({
          value:item.id,
          label: item.name
        })
      })
    })
    //类别
    this.$axios({
      method:'get',
      url:'sampleGuide/queryCategoryDict/selectSampleCategory',
    })
    .then(({data})=>{
         // console.log(data);
          data.data.forEach((item)=>{
            this.testTubeCategoryOption.push(
              {
                label:item,
                value:item
              }
            )
          })
    }),
    //来源
      this.$axios({
        method:'get',
        url:'sampleGuide/querySampleSource/selectrfidSamplesource',
      })
      .then(({data})=>{
            console.log(data);
            data.data.forEach((item)=>{
                this.sourceOption.push({
                  label:item,
                  value:item
                });
              })
        }),
      //录入人
      this.$axios({
        method:'get',
        url:'sampleGuide/userInfo/findAllUser',
      })
      .then(({data})=>{
        // console.log(data);
        data.data.forEach((item)=>{
            this.enterClerkOption.push({
              value:item.id,
              label:item.chinesename
            });
          this.lenderOption.push({
            value:item.id,
            label:item.chinesename
          })
          })
      }),
      //项目类别
      this.$axios({
        method:'get',
        url:'sampleGuide/guest/selectProjectAll',
      })
        .then(({data})=>{
          // console.log(data);
          data.data.forEach((item)=>{
            this.itemClassOption.push({
              label:item.name,
              value:item.id
            });
          })
        })

    },

  methods: {
    toggleAdvancedSearch () {
      /* 切换高级搜索 */
      if (this.asHeight) {
        this.asHeight = 0
        this.showAdvancedSearch = false
      } else {
        this.showAdvancedSearch = true
        this.asHeight = '170px'
      }
    },

    startSearch () {
      this.searchTableData=[]
      /* 开始搜索 */
    // this.$emit('startSearch', JSON.stringify(this.sampleSearch))
    //   if(data.data==0){
    //     return
    //   }else{
    //
    //   }

      this.$axios({
            method:'post',
            url:'sampleGuide/query/findAllRfidSampleByCondition',
            data:({
              sampleCategoryDict:this.sampleItem,// 样本或者样本盒
              name :this.name,//样本名称
              loanUserName:this.lender,//借出人
              inputUserId:this.enterClerk,//录入人id
              sampleCategoryDictId:this.sampleItem,//样本类别
              sampleSource:this.source,//样本来源
              status:this.status,//状态
              ProjectId:this.itemClass,//项目名称
              minLoanTime:this.outDate[0],//借出日期
              maxLoanTime:this.outDate[1],
              minOverdueTime:this.pastDate[0],//过期日期
              maxOverdueTime:this.pastDate[1],
              minSamplingDateTime:this.samplingDate[0],//采样日期
              maxSamplingDateTime:this.samplingDate[1],
              minInputTime:this.enterData[0],//录入日期
              maxInputTime:this.enterData[1],
              refrigeratorStruId:this.refrigerator,//冰箱名称
              tierStruId:this.layer,//层
              drawStruId:this.chouTi,//抽屉
              sampleBoxStruId:this.styleBox,//样本盒
            })
          })
          .then(({data})=>{
            console.log(data);
            data.data.forEach((item)=>{
               console.log(item);
            this.searchTableData.push({
              id: item.id,
              color:item.capColor, // 管帽颜色
              sampleInfo:item.name, // 样本信息
              enterName:item.inputUserName, // 录入人
              enterData:item.inputTime, // 录入日期
              sampleBloodData:item.samplingDate, // 采样日期
              source:item.sampleSource, // 样本来源
              pastTime:item.expireDate, // 过期日期
              location:item.sampleStru.detailLocation, // 位置信息
              status:item.status == 1 ? '正常' : '借出' , // 状态
              classify:item.sampleCategoryDict.name, // 类别
              loanPerson:item.loanUserName, // 借出人
              loanTime:item.loanTime// 借出日期
            })
        })
        this.$emit('changeTable', this.searchTableData)
          })
    },
    selectIceBox(){ //切换冰箱加载该冰箱层数
      this.layerOption = []
      this.layer = ''
      this.chouTi = '',
      this.chouTiOption = []
      this.styleBox = ''
      this.styleBoxOption =[]
      this.$axios({
        method: 'post',
        url:'sampleGuide/set/selectTier',
        data:({
          refrigeratorStruId: this.refrigerator
        })
      })
      .then(({data})=>{
        // console.log(data)
        data.data.forEach((item)=>{
          this.layerOption.push({
            value: item.id,
            label:item.row
          })
        })
      })
    },
    selectIcePlice(){//层数切换时加载相应的抽屉
      this.$axios({
        method: 'post',
        url:'/sampleGuide/guest/selectDrawerStruByTierStru',
        data:({
          tierStruId:{
            id:this.layer
	        }
        })
      })
      .then(({data})=>{
          console.log(data)
          data.data.forEach((item)=>{
            this.chouTiOption.push({
              value:item.id,
              label:item.number
            })
          })
      })
    },
    selectDrawer(){   //抽屉切换加载相应样本盒
      this.styleBox = ''
      this.styleBoxOption =[]
      this.$axios({
        method:'post',
        url: 'sampleGuide/set/selectSampleBoxStru',
        data:({
          drawerStruId:this.chouTi
        })
      })
      .then(({data})=>{
        console.log(data)
        data.data.forEach((item)=>{
          this.styleBoxOption.push({
            value: item.row,
            label:item.row
          })
        })
      })
    },
  }
}
</script>
<style scoped lang='less'>
.query-wrap {
  position: relative;
  margin-top: 0.875rem;
  padding: 30px 30px 0;
  background-color: #fdfdfd;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
}

.row {
  display: flex;
  align-items: center;

  margin-bottom: 20px;
}

.td {
  display: flex;
  align-items: center;

  margin-right: 20px;

  font-size: 16px;

  span {
    margin-right: 0.5em;
  }
}

.gaoji-search {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 93%;
  margin-top: 10px;
  padding-bottom: 10px;

  .in {
    display: flex;
    align-items: center;

    padding: 2px 4px;

    cursor: pointer;
    transition: all 0.3s;

    border: 1px solid transparent;
    border-radius: 3px;

    &:hover {
      border: 1px solid #3cd7ff;
    }

    i {
      padding: 0 0.8em 0 0;

      // font-weight: 800;
    }
  }

  h1 {
    color: #333;

    font-size: 16px;
    // font-weight: 500;
  }
}

/* 高级搜索 */
.advanced-search {
  width: 100%;
  height: 0;

  transition: all 0.3s;
}

.top {
  display: flex;
  justify-content: space-between;

  .data {
    width: 80%;
  }

  .search {
    width: 100px;
    margin-right: 30px;

    .in {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      padding-top: 10px;

      cursor: pointer;

      color: #fff;
      border-radius: 3px;
      background-color: #3cd7ff;

      i {
        margin-bottom: 3px;

        font-size: 50px;
      }

      span {
        margin-bottom: 10px;
      }
    }
  }
}
.tmp-row-empty {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-right: 20px;
}
.tmp-row-empty-title {
  margin-right: 0.5em;
  white-space: nowrap;
}
.tmp-row-empty-input {
  font-style: normal;
  font-size: 14px;
}
</style>
