<template>
  <div class="tbody-box">
    <table class="heng">
      <tr>
        <td v-for="(item,index) in matrixData[0].length" :key="index">{{item}}</td>
      </tr>
    </table>
    <table class="shu">
      <tr v-for="(item,index) in matrixData[0].length" :key="index">
        <td>{{item}}</td>
      </tr>
    </table>
    <table class="table">
      <tr class="row" v-for="(row,index) in matrixData" :key="index">
        <td class="td" v-for="(item,ind) in row" :key="ind" :style="{backgroundColor:item.bgc}">
          <span>{{index*10+ind+1}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      matrixData: [
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
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
          { bgc: '#fff' },
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
          { bgc: '#fff' },
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
          { bgc: '#fff' },
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
          { bgc: '#fff' },
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
          { bgc: '#fff' },
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
          { bgc: '#fff' },
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
          { bgc: '#fff' },
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
          { bgc: '#fff' },
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
          { bgc: '#fff' },
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
          { bgc: '#fff' },
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
          { bgc: '#fff' },
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
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.tbody-box {
  position: relative;
  background-color: #eee;
  padding: 35px 0 0 35px;

  box-shadow: 0 0 5px #000;
}
table {
  border-collapse: collapse;
}

.td {
  border: 1px solid #999;
  width: 35px;
  height: 35px;
  span {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 28px;
    height: 28px;
    margin: 0 auto;

    white-space: nowrap;

    border: 1px solid #333;
    border-radius: 50%;

    font-size: 12px;
  }
}

.shu,
.heng {
  position: absolute;
  td {
    text-align: center;
  border: 1px solid #999;
  width: 35px;
  height: 35px;
    border-color: #333;
    background-color: #fff;
  }
}

.shu {
  left: 0;
}

.heng {
  top: 0;
  left: 0;
  width: 100% ;
}
</style>
