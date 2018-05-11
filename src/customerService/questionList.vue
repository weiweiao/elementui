<template>
    <!--问题列表-->
    <div class="question-list">
        <p>意见投诉:待处理0  招商咨询:待处理0  提现问题:待处理0  售后问题:待处理0  售前咨询:待处理0</p>
            <el-row :gutter="6" class="el-row2">
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <span class="spans0">用户编号</span>
                        <el-input placeholder="请输入用户编号"></el-input>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <span class="spans0">问题类型</span>
                        <el-select v-model="value1" placeholder="请选择问题类型">
                            <el-option
                                    v-for="item in options1"
                                    :key="item.value1"
                                    :label="item.label"
                                    :value="item.value1">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <span class="spans0">问题状态</span>
                        <el-select v-model="value2" placeholder="请选择问题状态">
                            <el-option
                                    v-for="item in options2"
                                    :key="item.value2"
                                    :label="item.label"
                                    :value="item.value2">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-button type="primary">查询</el-button>
                    </div>
                </el-col>
            </el-row>
            <!--table-->
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="number"
                        label="序号"
                        >
                </el-table-column>
                <el-table-column
                        prop="userNumber"
                        label="用户编号"
                        >
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="具体内容"
                       >
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="问题类型"
                        >
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="问题状态"
                        >
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="提出时间"
                        >
                </el-table-column>
                <el-table-column
                        label="操作"
                        >
                    <!--<template slot-scope="scope">-->
                        <!--<el-button  type="text" size="small">编辑</el-button>-->
                        <!--<span>|</span>-->
                        <!--<el-button type="text" size="small">删除</el-button>-->
                    <!--</template>-->
                </el-table-column>
            </el-table>
        </div>
</template>

<script>
    export default {
        data() {
            return {
                value1:'',
                value2:'',
                options1:[
                    {
                        value1: '选项一',
                        label: '意见投诉'
                    },
                    {
                        value1: '选项二',
                        label: '招商咨询'
                    },
                    {
                        value1: '选项三',
                        label: '提现问题'
                    },
                    {
                        value1: '选项四',
                        label: '问题售后'
                    },
                    {
                        value1: '选项五',
                        label: '售前咨询'
                    },
                ],
                options2:[
                    {
                        value2: '选项一',
                        label: '正在处理'
                    },
                    {
                        value2: '选项二',
                        label: '待用户反馈'
                    },
                    {
                        value2: '选项三',
                        label: '已关闭'
                    },
                    {
                        value2: '选项四',
                        label: '已解决'
                    }
                ],
                tableData: [{}],      //[{}]不写{}不显示操作内容
            }
        },
        methods:{
        }
    }
</script>

<style scoped>
    .grid-content {
        display: flex;
        line-height: 36px;
    }
    .spans0 {
        width: 100px;
    }
    .el-row2 {
        margin: 10px 0;
        text-align: left;
    }

    .el-row-hg {
        margin-bottom: 10px;
    }

    .el-table {
        margin: 10px 0;
    }

    .add {
        width: 500px;
    }

    .footer {
        overflow: hidden;
    }

    .footer .el-row {
        float: left;
    }

    .block {
        padding-left: 380px;
        float: right;
    }
    p{
        color: red;
        font-size: 14px;
    }
</style>

