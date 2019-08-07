<template>
  <!-- 已使用 借用 原位置 已选中 未使用 -->
  <div class="map">
    <span
      v-for="(item,index) in mapData"
      :key="index"
      :style="{ backgroundColor: item.bgc}"
      v-text="item.text"
    />
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
      ]
    }
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.map {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 60px;
  height: 140px;
padding-top: 10px;
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
</style>
