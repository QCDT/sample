<<<<<<< HEAD
<template>
  <!-- 扫描样本盒添加 -->
  <div class="add-box">
    <div class="content">
      <h1 class="title">
        样本借出
        <i class="el-icon-close" @click="$emit('close')"></i>
      </h1>
      <div class="body">
        <div class="pic">
          <img src="@/assets/img/saomiao.gif" alt>
        </div>
        <button @click="$emit('close')">返回</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.add-box {
  width: 100%;
  height: 85%;
  display: flex;
  align-items: center;
}
.content {
  width: 65%;
  margin: 0 auto;
background-color: #fff;
  .title {
    display: flex;
    justify-content: center;
    position: relative;
    height: 32px;
    align-items: center;
    color: #fff;
    background-color: #3cd7ff;
    .el-icon-close {
      display: inline-block;
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      transition: color 0.1s;
      cursor: pointer;
      font-weight: 900;
      &:hover {
        color: #f42;
      }
    }
  }
  .body{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding : 50px 0 250px;
      .pic{
          margin-bottom: 50px;
          cursor: pointer;
      }

  }
}
</style>
=======
<template>
  <!-- 扫描样本盒添加 -->
  <div class="add-box">
    <div class="content">
      <h1 class="title">
        样本借出
        <i class="el-icon-close" @click="$emit('close')"></i>
      </h1>
      <div class="body">
        <div class="pic">
          <img src="@/assets/img/saomiao.gif" alt>
        </div>
        <button @click="$emit('close')">返回</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>
<style scoped lang='less'>
.add-box {
  width: 100%;
  height: 85%;
  display: flex;
  align-items: center;
}
.content {
  width: 65%;
  margin: 0 auto;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: center;
    position: relative;
    height: 32px;
    align-items: center;
    color: #fff;
    background-color: #3cd7ff;
    .el-icon-close {
      display: inline-block;
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      transition: color 0.1s;
      cursor: pointer;
      font-weight: 900;
      &:hover {
        color: #f42;
      }
    }
  }
  .body{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding : 50px 0 250px;
      .pic{
          margin-bottom: 50px;
          cursor: pointer;
      }
      
  }
}
</style>
>>>>>>> a6994a54ee8e86d397c8410f1933627f6e9d8b14
