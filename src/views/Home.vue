<template>
    <div>
        <div class="homeWrap">
           <h1>首页</h1>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 0,
            homeLink: [
                { link: "home", text: "首页" },
                { link: "home", text: "扫描" },
                { link: "home", text: "查询" },
                { link: "home", text: "盘点" },
                { link: "home", text: "设置" },
                { link: "home", text: "数据分析" }
            ]
        };
    },

    methods: {
        test() {
            console.log("1: ", 1);
        },
        testclick() {
            console.log("111: ", 111);
        }
    }
};
</script>
<style    lang="less" scoped>

</style>
