<template>
  <div class="add-box">
    <el-tabs type="border-card">
      <el-tab-pane label="选择已有样本盒">
        <div class="one-box">
          <div class="left-twins">
            <div class="item">
              <span>选择冰箱:</span>
              <el-select v-model="value" placeholder="请选择" size="small" style="margin:0 10px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>选择层:</span>
              <el-select v-model="value" placeholder="请选择" size="small" style="margin:0 10px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>选择抽屉:</span>
              <el-select v-model="value" placeholder="请选择" size="small" style="margin:0 10px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>选择样本盒:</span>
              <el-select v-model="value" placeholder="请选择" size="small" style="margin:0 10px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="right-twins">
            <h1 class="sample-boxTit">系统保存的样本盒信息</h1>
            <div class="matrixTable-box">
              <table class="table">
                <tr class="row" v-for="(index) in rowValue" :key="index">
                  <td
                    v-for="(ind) in colValue"
                    :key="ind"
                  >{{showTable(index,ind)}}</td>
                </tr>
              </table>
              <div class="map">
                <span
                  v-for="(item,index) in mapData"
                  :key="index"
                  :style="{ backgroundColor: item.bgc}"
                  v-text="item.text"
                />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新建样本盒">
        <div class="two-box">
          <div class="left-twins">
            <div class="row">
              <span>RFID编号</span>
              <el-input class="input" v-model="Rfid" size="mini" placeholder="请输入内容"></el-input>
              <div class="pic">
                <img src="@/assets/img/saomiao.gif" alt>
              </div>
            </div>
            <div class="row">
              <span>样本盒名称</span>
              <el-input class="input" size="mini" v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="mark-box">
              <span>备注:</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="mark"
                maxlength="30"
                show-word-limit
              ></el-input>
            </div>
          </div>
          <div class="right-twins">
            <div class="row-top">
              <span>样本盒规格</span>
              <el-select
                class="select"
                v-model="row"
                size="mini"
              >
                <el-option
                  v-for="item in 10"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <span>行</span>
              <el-select
                v-model="col"
                size="mini"
                class="select"
              >
                <el-option
                  v-for="item in 10"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <span>列</span>
              <el-select
                v-model="model"
                size="mini"
                class="select"
              >
                <el-option
                  v-for="item in modelOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span>显示模式</span>
            </div>
            <div class="matrixTable-box" v-show="row && col">
              <table class="table">
                <tr class="row" v-for="(index) in row" :key="index">
                  <td
                    v-for="(ind) in col"
                    :key="ind"
                  >{{showTable(index,ind)}}</td>
                </tr>
              </table>
              <div class="map">
                <span
                  v-for="(item,index) in mapData"
                  :key="index"
                  :style="{ backgroundColor: item.bgc}"
                  v-text="item.text"
                />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="扫描已有样本盒">
        <div class="three-box">
          <div class="left-twins">
            <div class="pic">
              <img src="@/assets/img/saomiao.gif" alt>
            </div>
            <h6>RFID编号:</h6>
            <h6>样本盒名称:</h6>
            <h6>位置信息:</h6>
          </div>
          <div class="right-twins">
            <div class="matrixTable-box">
              <table class="table">
                <tr class="row" v-for="(index) in rowValue" :key="index">
                  <td
                    v-for="(ind) in colValue"
                    :key="ind"
                  >{{showTable(index,ind)}}</td>
                </tr>
              </table>
              <div class="map">
                <span
                  v-for="(item,index) in mapData"
                  :key="index"
                  :style="{ backgroundColor: item.bgc}"
                  v-text="item.text"
                />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="bot-b">
      <button>保存</button>
      <button @click="goBack">返回</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {  },
  data () {
    return {
      value:'',
      model:1,
      Rfid:'',
      row:'',
      col:'',
      rowValue:9,
      colValue:9,
      modelOption:[
        {
          value: 1,
          label: '数字*数字'
        },
        {
          value: 2,
          label: '数字*字母'
        },
        {
          value:  3,
          label: '字母*数字'
        },
        {
          value:  4,
          label: '字母*字母'
        },
        {
          value:  5,
          label: '内部数字'
        }
      ],
      mapData: [
        { text: '已使用', bgc: '#00c9ff' },
        { text: '借用', bgc: '#FCFD01' },
        { text: '未使用', bgc: '#eee' }
      ],
      mark: '',
    }
  },
  methods: {
    goBack () {
      this.$emit('goBack')
    },
    showTable (row,col) {
      let res = ''
      if(this.model == 1){
        res = row+'/'+col
      }else if(this.model == 2){
        res = row+'/'+String.fromCharCode(64 + col)
      }else if(this.model == 3){
        res = String.fromCharCode(64 + row)+'/'+col
      }else if(this.model == 4){
        res = String.fromCharCode(64 + row) +'/'+ String.fromCharCode(64 + col)
      }else{
        res = (row-1)*this.col+col
      }
      return res
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.add-box {
  height: 500px;
  margin-top: 10px;
  margin:10px 40px 40px 40px;
  padding: 20px;
  background-color: #fff;
}

.one-box,
.two-box,
.three-box {
  display: flex;

  height: 400px;
    // background-color: #333;
}

.left-twins,
.right-twins {
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 15px 30px;
}

.left-twins {
  border-right: 1.5px solid #3cd7ff;
}

.right-twins {
  display: flex;
  flex-direction: column;
}

// 选择已有样本
.one-box {
  .left-twins {
    .item {
      margin: 10px;

      span {
        display: inline-block;
        width: 6rem;
      }
    }
  }

  .right-twins {
    .sample-boxTit {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 40px;

      font-size: 18px;
      font-weight: 500;
    }
  }
}
.two-box {
  .left-twins {
    .row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span {
        width: 6rem;
        text-align-last: justify;
      }
      .input{
        width: 40%;
      }
      .pic {
         img {
          width: 25px;
          height: 25px;
          cursor: pointer;
        }
        margin-left: 10px;
      }
    }
    .mark-box {
      span {
        padding-top: 3px;
        margin-bottom: 7px;
        width: 5rem;
        text-align-last: justify;
        display: inline-block;
      }
    }
  }
  .right-twins {
    .row-top {
      margin-bottom: 30px;
      .select{
        width: 20%;
        margin-left: 15px;
        margin-right: 5px;
      }
    }
  }
}

.three-box {
  .left-twins {
    display: flex;
    flex-direction: column;
    .pic {
      margin: 20px 20px 50px 35px;
      img{
        cursor: pointer;
      }
    }
    h6 {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 10px;
      padding-left: 50px;
    }
  }
}
.bot-b{
  text-align: center;
  margin-top: 10px;
  button{
    margin-right: 10px;
    // background: #00c9ff;
    border: 1px solid #00c9ff;
    background: #fff;
    width: 120px;
    height:25px;
    border-radius: 5px;
    &:hover{
      background: #00c9ff;
      color: white;
    }
  }
}
.map {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60px;
  height: 90px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  margin-left: 15px;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 3px;
    color: #333;
    border-radius: 3px;
    font-size: 14px;
  }
}
.table {
  border-spacing: 0;
  border: 1px solid  rgb(134, 134, 134);
  border-collapse: collapse;
  width: 80%;
  margin: 0 auto;
  td {
    padding: 5px;
    border: 1px solid rgb(134, 134, 134);
    text-align: center;
    font-size: 12px;
  }
}
.matrixTable-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
