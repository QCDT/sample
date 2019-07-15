<template>
    <div>
        <div class="receiveTop">
            <img src="@/assets/img/saomiao.gif">
            <p><span>接收录入扫描</span></p>
            <p class="notice">
                <i class="el-icon-warning-outline"></i>
                <span>请将样本放置在读写器上，然后点击上方按钮开始扫描</span>
            </p>
        </div>
        <div class="receiveCenter">
            <div class="receiveNum"><span>扫描总数:</span><span>{{scanNum}}</span></div>
            <div class='record' @click="ShowHistoryReceiveList">
                <img src="@/assets/img/sample-receive.png">
                <span>接收记录</span>
            </div>
        </div>
        <div class="receiveContent">
            <div class="receiveL">
                <el-table
                    ref="multipleTable"
                    :data="sampleData"
                    tooltip-effect="dark"
                    style="width:100%"
                    height="220"
                    :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
                    :cell-style="{padding:'0px',textAlign: 'center'}"
                    :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff', color:'white'}"
                    border
                    >
                    <el-table-column
                    type="index"
                    width="70"
                    label="序号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="sampleName"
                    label="样本名称"
                    >
                    </el-table-column>
                </el-table>
            </div>
            <div class="receiveR">
                <div class="formTitle"><em>表单详情</em></div>
                <div>
                    <em>表单名称:</em>
                    <input type="text">
                </div>
                <div>
                    <em>采血地:</em>
                    <input type="text">
                </div>
                <div>
                    <em>接收地:</em>
                    <input type="text">
                </div>
                <div>
                    <em>配送人:</em>
                    <input type="text">
                </div>
                <div>
                    <em>接收人:</em>
                    <input type="text" disabled='true'>
                    <img src="@/assets/img/change.png" @click="validateReceivePerson">
                </div>
                <div>
                    <em>接收时间</em>
                    <el-date-picker
                        v-model="value1"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div>
                    <em>配送条件</em>
                    <el-checkbox v-model="checked">常温</el-checkbox>
                    <el-checkbox v-model="checked">冰上</el-checkbox>
                    <el-checkbox v-model="checked">避光</el-checkbox>
                    <el-checkbox v-model="checked">其它</el-checkbox>
                    <input type="text" class="receiveCondition">
                </div>
                <div>
                    <em>血样类型</em>
                    <input type="text">
                </div>
            </div>
        </div>
        <div class="receiveBtnWrap">
            <el-button type="primary" size="mini" class="receiveBtn">确认</el-button>
        </div>
        <el-dialog
            :visible.sync="dialogLogin"
            width="30%"
            center
            class="dialogLogin"
            >
          <!-- 登录框 -->
            <div class="loginTitle">
                <div class="titleLeft">
                <span>{{ LoginTab ? "账号登录" : "扫码登录" }}</span>
                <span class="lineBottom"></span>
                </div>
                <div class="titleRight">
                <span class="togglePic">
                    <em>{{ LoginTab ? "扫码登录更便捷" : "账密登录在这里" }}</em>
                </span>
                <span class="toggleText" @click="loginTab()">
                    <img src="@/assets/img/codeImg.png" v-show="LoginTab">
                    <img src="@/assets/img/computer.png" v-show="!LoginTab">
                </span>
                </div>
            </div>
            <div class="loginCenter">
                <label v-show="LoginTab">
                <img src="@/assets/img/user.png">
                <input type="text" placeholder="请输入用户名" v-model="userName">
                </label>
                <label v-show="LoginTab">
                <img src="@/assets/img/password.png">
                <input type="password" placeholder="请输入密码" v-model="userPassword">
                </label>
                <div v-show="!LoginTab" class="loginScan">
                <img src="@/assets/img/saomiao.gif">
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogLogin = false" size="mini">返回</el-button>
                <el-button type="primary" @click="dialogLogin = false" size="mini">验证</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="历史接收记录"
            :visible.sync="dialogRecords"
            width="80%"
            center>
            <div class="recordTitle">
                <div>
                <span class="recordType">表单名称:</span>
                <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
                <span class="recordType">样本名称:</span>
                <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
                </div>
                <div>
                <span class="recordTime">盘点时间</span>
                <el-date-picker
                    v-model="value1"
                    type="daterange"
                    size="mini"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary"  size="mini">搜索</el-button>
                </div>
            </div>
            <div class="fromNum">
                <div><span>表单数量:</span></div>
                <div>
                <img src="@/assets/img/receive-excel.png">
                <img src="@/assets/img/receive-pdf.png">
                </div>
            </div>
            <div class="fromContent">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 55%"
                        :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
                        :cell-style="{padding:'0px',textAlign: 'center'}"
                        :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
                        border
                        >
                        <el-table-column
                        type="selection"
                        >
                        </el-table-column>
                        <el-table-column
                        type="index"
                        
                        label="序号"
                        class="DataTable"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="data"
                        label="表单名称"
                        class="DataTable"
                        >
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="username"
                        label="操作(盘点)人"
                        class="DataTable"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="filename"
                        label="盘点日期"
                        class="DataTable"
                        >
                        </el-table-column>
                </el-table>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 40%"
                        :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
                        :cell-style="{padding:'0px',textAlign: 'center'}"
                        :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
                        border
                        >
                        <el-table-column
                        type="index"
                        
                        label="序号"
                        class="DataTable"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="data"
                        label="样本名称"
                        class="DataTable"
                        >
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="username"
                        label="样本类别"
                        class="DataTable"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="filename"
                        label="受试者编号"
                        class="DataTable"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="filename"
                        label="已盘点次数"
                        class="DataTable"
                        >
                        </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogRecords = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="dialogRecords = false" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            scanNum: 0,
            value1: '',
            checked: false,
            dialogLogin: false,
            dialogRecords: false,
            userName: '',
            userPassword: '',
            LoginTab: true,
            sampleData:[

            ],
            tabData:[

            ]
        }
    },
    methods:{
        loginTab () {
            this.LoginTab = !this.LoginTab
        },
        validateReceivePerson () {
            this.dialogLogin = true
        },
        ShowHistoryReceiveList () {
            this.dialogRecords = true
        }
    }
}
</script>
<style lang="less">
.receiveTop{
    text-align: center;
    margin-top: 20px;
    img{
        width: 96px;
        height: 96px;
    }
    p{
        color: #00c9ff;
        margin-top: 10px;
    }
    .notice{
        font-weight: bold;
        margin-top: 3px;
    }
}
.receiveCenter{
    width: 85%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 10px;
    .receiveNum{
        span{
            margin-right: 5px;
        }
    }
    .record{
        text-align: center;
        cursor: pointer;
        img{
            width: 24px;
            height: 24px;
        }
        span{
            display: block;
        }
    }
}
.receiveContent{
    width: 85%;
    margin: 0 auto;
    display: flex;
    align-items: top;
    .receiveL{
        // float: left;
        width: 55%;
    }
    .receiveR{
        margin-left: 8%;
        float: left;
        width: 40%;
        div{
           line-height: 27px;
           img{
               width: 20px;
               height: 20px;
               vertical-align: middle;
               margin-right: 6px;
               cursor: pointer;
           }
        }
        .formTitle{
            text-align: center;
            margin-top: 0;
        }
        em{
            display: inline-block;
            width: 90px;
        }
        .receiveCondition{
            width: 15%;
        }
        input{
            border:none;
            border-bottom: 1px solid #ddd;
            border-radius: 0;
            line-height:20px;
            width:50%;
        }
        .el-checkbox{
            margin-right: 10px;
        }
        .el-input__inner{
            width: 100%;
        }
        .el-input__inner{
            height: 20px;
            line-height: 20px;
        }
        .el-input__icon{
            line-height: 20px;
        }
    }
}
.receiveBtnWrap{
    text-align: center;
    margin-top: 15px;
    .receiveBtn{
        width: 120px;
    }
}
.loginTitle {
    height: 62px;
    .titleLeft {
        margin-top: 20px;
        float: left;
        font-size: 18px;
    }
    .titleRight {
        float: right;
        margin-top: 7px;
    span {
        display: inline-block;
        position: relative;
        img {
        vertical-align: middle;
        }
        em {
        position: absolute;
        top: 5px;
        left: 21px;
        font-size: 12px;
        color: #00a0e9;
        font-style: normal;
        }
    }
    .togglePic {
        background: url("~@/assets/img/tishi.png");
        background-size: 121px 28px;
        width: 121px;
        height: 28px;
        top: 8px;
    }
    .toggleText {
        cursor: pointer;
        img {
        width: 47px;
        height: 47px;
        }
    }
    }
    .lineBottom {
    display: block;
    width: 40px;
    height: 3px;
    margin-top: 3px;
    background: linear-gradient(to right, #004de9, #21d4fd);
    }
}
.loginCenter {
    label {
    display: block;
    margin-top: 20px;
    border-bottom: 1px solid #1ab6f9;
    padding-bottom: 5px;
    width: 80%;
    img {
        vertical-align: middle;
        width: 30px;
        height: 30px;
    }
    input {
        vertical-align: middle;
        border: none;
        width: 70%;
        height: 25px;
        font-size: 14px;
        padding-left: 15px;
        outline: none;
    }
    }
    .loginScan {
    text-align: center;
    img {
        width: 128px;
        height: 128px;
    }
    }
}
.dialogLogin{
    .el-dialog__header{
        display: none;
    }
}
</style>
