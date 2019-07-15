<template>
  <div class="tbody-wrap">
    <table class="table" :style="{borderColor:borderColor,borderWidth:borderWidth}">
      <tr class="row" v-for="(row,index) in matrixData" :key="index">
        <td

          v-for="(item,ind) in row"
          :key="ind"
          :style="{backgroundColor:item.bgc,borderColor:borderColor}"
        >{{index*10+ind+1}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    borderColor: { type: String, default: '#3cd7ff' },
    borderWidth: { type: String, default: '2px' }
  },
  components: {},
  data () {
    return {
      matrixData: [
        [ { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' } ],
        [ { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' } ],
        [ { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' } ],
        [ { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' } ],
        [ { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' } ],
        [ { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' } ],
        [ { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' } ],
        [ { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' } ],
        [ { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' } ],
        [ { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' }, { bgc: '#fff' } ]

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

</style>
