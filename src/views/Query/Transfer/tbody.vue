<template>
  <div class="tbody-wrap">
    <table class="table">
      <tr class="row" v-for="(row,index) in matrixData" :key="index">
        <td v-for="(item,ind) in row" :key="ind" :style="{backgroundColor:item.bgc}">{{ind+1}}</td>
      </tr>
    </table>
    <markColor></markColor>
  </div>
</template>
<script>
import markColor from '@/components/tmp/zhanglan/markColor'
export default {
  props: {},
  components: { markColor },
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
table {
  border-spacing: 0;

  border: 2px solid #43ccfe;
  border-collapse: collapse;
}

td {
  border: 1px solid #43ccfe;
}

td {
  width: 23px;
  height: 20px;
  padding: 0.155rem 0.405rem;

  text-align: center;

  font-size: 0.655rem;
  font-size: 11px;
}

.tbody-wrap {
  display: flex;

  padding: 20px 20px 0;

  background-color: #fff;

  .table {
    margin-right: 20px;
  }
}
</style>
