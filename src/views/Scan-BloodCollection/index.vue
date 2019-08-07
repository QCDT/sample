<template>
  <!-- 患者采血 -->
  <div class="div">
    <div class="blood-collection-index">
      <div class="box">
        <div class="small-box-poa">
          <div class="pic-small-l">
            <router-link :to="{name:'checkSingle'}">
              <div class="icon-box-small" title="单人核验">
                <i class="icon icon-danrenheyan"></i>
                <span>单人核验</span>
              </div>
            </router-link>
          </div>
          <div class="pic-small-r">
            <router-link :to="{name:'checkMore'}">
              <div class="icon-box-small" title="多人核验">
                <i class="icon icon-duorenheyan"></i>
                <span>多人核验</span>
              </div>
            </router-link>
          </div>
        </div>
        <div class="center-box">
          <div class="icon-big-box">
            <i class="icon icon-shanchuwenben"></i>
          </div>
          <div class="text">123</div>
        </div>
      </div>
      <div class="box">
        <div class="small-box-poa">
          <div class="pic-small-l">
            <router-link :to="{name:'createSingle'}">
              <div class="icon-box-small" title="创建单人核验">
                <i class="icon icon-chuangjiandanren"></i>
                <span>创建单人核验</span>
              </div>
            </router-link>
          </div>
          <div class="pic-small-r">
            <router-link :to="{name:'createMore'}">
              <div class="icon-box-small" title="创建多人核验">
                <i class="icon icon-chuangjianduoren"></i>
                <span>创建多人核验</span>
              </div>
            </router-link>
          </div>
        </div>
        <div class="icon-big-box">
          <i class="icon icon-wenben"></i>
        </div>
      </div>
    </div>
    <div class="bot-goback">
      <tmpButton>返回</tmpButton>
    </div>
  </div>
</template>
<script>
import tmpButton from "@/components/tmp/zhanglan/tmpButton";
export default {
  props: {},
  components: { tmpButton },
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>
<style scoped lang='less'>
.icon-box-small {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100px;
  height: 100px;

  transition: all 0.2s;

  color: #3cd7ff;
  border: 1px solid #eee;
  border-radius: 10px;

  .icon {
    width: 60px;
    height: 60px;

    font-size: 60px;
  }

  span {
    position: relative;

    transform: scale(0.75, 0.75);
    white-space: nowrap;

    font-weight: 900;
  }

  &:hover {
    color: #fff;
    background-color: #3cd7ff;
  }
}

.icon-big-box {
  z-index: 100;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 150px;
  height: 150px;

  transition: all 0.2s;

  color: #3cd7ff;
  border: 1px solid #eee;
  border-radius: 10px;

  .icon {
    font-size: 100px;
  }
}

.div {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  height: 60vh;
}

.blood-collection-index {
  display: flex;
  justify-content: center;

  width: 100%;

  // background-color: #999;

  .box {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 30%;
    margin: 0 0.5%;

    .small-box-poa {
      position: absolute;

      display: flex;
      justify-content: space-between;

      width: 100%;
    }

    .pic-small-r,
    .pic-small-l {
      display: flex;
      justify-content: center;
    }

    .pic-small-r,
    .pic-small-l {
      img {
        width: 100px;
        height: 100px;

        cursor: pointer;
      }
    }
  }
}
.center-box {
  position: relative;
  .text {
      width: 100%;
    font-size:17px;
   color: #3cd7ff;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
