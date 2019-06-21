<template>
  <div class="tbody-wrap">
    <table class="table">
      <tr class="row" v-for="(row,index) in matrixData" :key="index">
        <td
          v-for="(item,ind) in row"
          :key="ind"
          :style="{backgroundColor:item.bgc}"
        >{{index*10+ind+1}}</td>
      </tr>
    </table>
    <div class="map">
      <span v-for="(item,index) in mapData" :key="index" :style="{ backgroundColor: item.bgc}" v-text="item.text"/>

    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      mapData: [
        { text: '已使用', bgc: '#7D7C7F' },
        { text: '借用', bgc: '#FCFD01' },
        { text: '原位置', bgc: '#F9AC1B' },
        { text: '已选中', bgc: '#86D647' },
        { text: '未使用', bgc: '#EDF1F3' }
      ],
      matrixData: [
        [
          { bgc: '#7D7C7F' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#222' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#333' },
          { bgc: '#f42' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#444' },
          { bgc: '#f99' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#000' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#555' },
          { bgc: 'blue' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#555' },
          { bgc: 'yellow' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
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

.map {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 60px;
  height: 150px;

  cursor: pointer;
  white-space: nowrap;

  font-size: 13px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 2px 3px;

    color: #333;
    border-radius: 3px;
    background-color: #f99;

    font-size: 13px;
  }
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
