<template>
  <div class="div">
    <div class="tbody-box" v-if="!!row&&!!col">
      <table class="table">
        <tr class="row heng" style="background:#eee">
          <td class="td one"></td>
          <td class="td one" v-for="(num,index) in row" :key="index">{{test2(model,num)}}</td>
        </tr>
        <tr class="row" v-for="(item,index) in col" :key="index">
          <td class="shu" style="background:#eee">{{test(model,index)}}</td>
          <td
            class="td"
            style="background-color:#fff"
            v-for="(item,ind) in row"
            :key="ind"
            :style="{backgroundColor:item.bgc}"
          >
            <span>{{test3(index,ind+1)}}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: { model: Number, row: Number, col: Number },
  components: {},
  data () {
    return {
    //   matrixData: [
    //     [
    //       { bgc: "#fff" },
    //       { bgc: "#fff" },
    //       { bgc: "#fff" },
    //       { bgc: "#fff" },
    //       { bgc: "#fff" },
    //       { bgc: "#fff" },
    //       { bgc: "#fff" },
    //       { bgc: "#fff" },
    //       { bgc: "#fff" }
    //     ]
    //   ]
    }
  },
  methods: {
    test (model, index) {
      let res
      if (model === 3) {
        res = String.fromCharCode(65 + parseInt(index))
      } else {
        res = index + 1
      }
      return res
    },
    test2 (model, index) {
      let res
      if (model === 2) {
        res = String.fromCharCode(64 + parseInt(index))
      } else {
        res = index
      }
      return res
    },
    test3 (col, row) {
      let res
      if (this.model === 1) {
        res = col * this.row + row
      } else if (this.model === 2) {
        res = col + 1 + String.fromCharCode(64 + parseInt(row))
      } else if (this.model === 3) {
        res = String.fromCharCode(65 + parseInt(col)) + row
      }
      return res
    }
  },

  computed: {}
}
</script>
<style scoped lang='less'>
.tbody-box {
  position: relative;

  overflow: hidden;
  border-radius: 20px 0 0 0;
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
.one {
  border-color: #eee;
  border-bottom-color: #999;
  text-align: center;
  &:first-child {
    border-bottom-color: #eee;
  }
}
.shu {
  border-top-color: #999;
  text-align: center;
}
</style>
