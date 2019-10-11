<template>
  <div>
    <ul class="setList">
      <!-- 设置页 一级导航 -->
      <li
        v-for="(item,index) in setList"
        :key="index"
        :class="{current: active==index}"
      >
        <div class="setItem" @click="setCut(index)">
          <router-link :to="item.link">
            <img :src="item.imgUrl" />
            <div>{{item.setTitle}}</div>
            <div>{{item.setTitleE}}</div>
          </router-link>
        </div>
      </li>
    </ul>
    <ul class="secondMenu" v-show="active === 0">
      <!-- 设置页 硬件设置的二级导航 -->
      <li v-for="(item,index) in setListItemA" :key="index">
        <div class="setItem">
          <router-link :to="item.link">
            <img :src="item.imgUrl" />
          </router-link>
          <p>{{item.setTitle}}</p>
          <p>{{item.setTitleE}}</p>
        </div>
      </li>
    </ul>
      <!-- 设置页 贮藏设备设置的二级导航 -->
    <!-- <ul class="secondMenu" v-show="active === 1">
      <li v-for="(item,index) in setListItemB" :key="index">
        <div class="setItem">
          <router-link :to="item.link">
            <img :src="item.imgUrl" />
            <p>{{item.setTitle}}</p>
            <p>{{item.setTitleE}}</p>
          </router-link>
        </div>
      </li>
    </ul> -->
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      active: -1,
      setList: [
        // 设置一级导航的数据
        {
          imgUrl: require("@/assets/img/computer.png"),
          setTitle: "硬件设置",
          setTitleE: "Hardware setup",
          link: ""
        },
        {
          imgUrl: require("@/assets/img/storage.png"),
          setTitle: "冰箱设置",
          setTitleE: "refrigerator setting",
          link: "set/refrigerator"
        },
        {
          imgUrl: require("@/assets/img/data_setting.png"),
          setTitle: "数据设置",
          setTitleE: "Data setting",
          link: "set/DataSetting"
        },
        {
          imgUrl: require("@/assets/img/project_setting.png"),
          setTitle: "项目设置",
          setTitleE: "Project setting",
          link: "set/ProjectSetting"
        },
        {
          imgUrl: require("@/assets/img/Setuser.png"),
          setTitle: "用户设置",
          setTitleE: "User configuration",
          link: "set/UserConfiguration"
        }
      ],
      setListItemA: [
        // 硬件设置的数据
        {
          imgUrl: require("@/assets/img/card_setting.png"),
          setTitle: "读写器设置",
          setTitleE: "Card setting",
          link: "set/cardReader"
        },
        {
          imgUrl: require("@/assets/img/printer_setting.png"),
          setTitle: "打印机设置",
          setTitleE: "Printer  setting",
          link: "set/Printer"
        },
        {
          imgUrl: require("@/assets/img/Centrifuge_setting.png"),
          setTitle: "离心设置",
          setTitleE: "Centrifuge setting",
          link: "set/Centrifuge"
        }
      ],
      // setListItemB: [
        // 贮藏设置的数据
        // {
        //   imgUrl: require("@/assets/img/card_setting.png"),
        //   setTitle: "冰箱设置",
        //   setTitleE: "refrigerator setting",
        //   link: "set/refrigerator"
        // }
        // {
        //   imgUrl: require("@/assets/img/card_setting.png"),
        //   setTitle: "样本盒设置",
        //   setTitleE: "sampleBox setting",
        //   link: "set/sampleBox"
        // }
      // ]
    };
  },
  methods: {
    setCut(index) {
      this.active = index;
      if (index === 0) {
        this.setListItemShowA = true;
      } else if (index === 1) {
        this.setListItemShowB = true;
      }
    }
  },
  computed: {}
};
</script>
<style lang="less" scoped>
.setList {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 380px;
}
.setList li {
  padding: 50px;
}
.setList .setItem {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  text-align: center;
  padding: 15px;
  cursor: pointer;
  background: white;
  border-radius: 10px;
}
.setList .setItem img {
  width: 114px;
  height: 104px;
}
.setList .setItem p {
  margin-top: 5px;
  font-size: 16px;
}
.setList .setItem p:nth-child(3) {
  margin-top: 7px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
}
.current {
  background: #eee;
}
.secondMenu {
  display: flex;
  justify-content: flex-start;
  margin-left: 13px;
  text-align: center;
  background: #eee;
  padding: 30px;
  width: 90%;
  margin-top: -60px;
}
.secondMenu li {
  margin-left: 30px;
}
.secondMenu li .setItem {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 15px;
  cursor: pointer;
  border-radius: 10px;
}
.secondMenu li .setItem img {
  width: 72px;
  height: 72px;
}
.secondMenu li .setItem p {
  margin-top: 5px;
  font-size: 16px;
}
.secondMenu li .setItem p:nth-child(3) {
  margin-top: 7px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
}

a {
  color: #000 !important;
}
</style>
