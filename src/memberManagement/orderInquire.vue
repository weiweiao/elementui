<template>
    <!--订单查询-->
    <div class="order-inquire">
        <el-row :gutter="24" style="font-size: 14px">
            <el-col :span="7">
                <div class="grid-content bg-purple">
                    <span>时间范围</span>
                    <!--<el-input type="primary"></el-input>-->
                    <el-date-picker
                            v-model="value6"
                            type="daterange"
                            placeholder="选择日期范围">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span class="spans0">店主姓名</span>
                    <el-input type="primary"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <span style="width: 60px;">订单号</span>
                    <el-input type="primary"></el-input>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span style="width: 40px;">电话</span>
                    <el-input type="primary"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="24" class="el-row2" style="font-size: 14px">
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span style="width: 90px;">支付状态</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options0"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <span style="width: 60px;">状态</span>
                    <el-select v-model="value1" placeholder="请选择">
                        <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
                :data="tableData3"
                border
                style="width: 100%;font-size: 12px"
                max-height="600">
            <el-table-column
                             prop="xuhao"
                             label="序号"
                             width="66">
            </el-table-column>
            <el-table-column
                    prop="orderNumber"
                    label="订单号"
                    >
            </el-table-column>
            <el-table-column
                    prop="shopOwnerName"
                    label="店主姓名"
                    width="90"
                   >
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话"
                    >
            </el-table-column>
            <el-table-column
                    prop="grade"
                    label="等级"
                   >
            </el-table-column>
            <el-table-column
                    prop="referrer"
                    label="上级推荐人"
                    width="110"
                    >
            </el-table-column>
            <el-table-column
                    prop="team"
                    label="所属团队"
                    width="90"
            >
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格"
                    >
            </el-table-column>
            <el-table-column
                    prop="payMethods"
                    label="支付方式"
                    width="90"
                   >
            </el-table-column>
            <el-table-column
                    prop="payState"
                    label="支付状态"
                    width="90"
                    >
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注"
                   >
            </el-table-column>
            <el-table-column
                    prop="payTime"
                    label="支付时间"
                    width="110"
                   >
            </el-table-column>
            <el-table-column
                    fixed="right"
                    prop="operate"
                    label="操作"
                   >
                <template scope="scope">
                    <el-button type="text" size="small" @click="detail(scope.row,scope.$index)">会员详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--会员详情弹框-->
        <el-dialog title="会员详情" :visible.sync="dialogTableVisible0" top="5vh">
            <el-form :model="form0">
                <el-form-item label="微信号 : " :label-width="formLabelWidth">
                    <p>{{form0.WeChat}}</p>
                </el-form-item>
                <el-form-item label="头像 : " :label-width="formLabelWidth">
                    <img :src="form0.images" alt="头像" style="width: 80px;height: 80px;">
                </el-form-item>
                <el-form-item label="店主姓名 : " :label-width="formLabelWidth">
                    <span>{{form0.shoperName}}</span>
                    <span style="margin: 0px 20px">真实姓名 : {{form0.trueName}}</span>
                    <span>身份证号 : {{form0.ID}}</span>
                </el-form-item>
                <el-form-item label="手机 : " :label-width="formLabelWidth">
                    <p>{{form0.phone}}</p>
                </el-form-item>
                <el-form-item label="创建时间 : " :label-width="formLabelWidth">
                    <p>{{form0.createTime}}</p>
                </el-form-item>
                <el-form-item label="收货地址 : " :label-width="formLabelWidth">
                    <p>{{form0.address}}</p>
                </el-form-item>
                <el-form-item label="等级 : " :label-width="formLabelWidth">
                    <span class="blues">{{form0.level}}</span>
                    <span style="margin: 0px 20px">推荐人: <span class="blues">{{form0.recommender}}</span></span>
                    <span>旗舰店: <span class="blues">{{form0.flagship}}</span></span>
                    <span style="margin-left:20px">所属团队: <span class="blues">{{form0.team}}</span></span>
                </el-form-item>
                <div style="text-align: center">
                    <el-button type="primary" @click="dialogTableVisible0 = false"
                               style="padding: 10px 15px;">返回列表
                    </el-button>
                </div>
            </el-form>
        </el-dialog>
        <!--分页-->
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[3]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="arr.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
//                时间选择器
                value6: '',
                arr:[],//分页
                tableData3: [{
                    number: 100023,
                    orderNumber: 'T1111111111111',
                    shopOwnerName: '张娜娜',
                    phone: '00000098765',
                    grade: '开开开',
                    referrer: '哈哈哈',
                    name: '王小虎',
                    team: '少受一步',
                    price: 99999,
                    payMethods: '微信钱包',
                    payState: '审核中',
                    remark: '哈哈哈哈哈哈',
                    payTime: '2016-05-02 17:00',
                },
                    {
                        number: 100023,
                        orderNumber: 'T1111111111111',
                        shopOwnerName: '张娜娜',
                        phone: '00000098765',
                        grade: '看看',
                        referrer: '哈哈哈',
                        team: '少受一步',
                        price: 99999,
                        payMethods: '银行卡',
                        payState: '审核中',
                        remark: '哈哈哈哈哈哈',
                        payTime: '2016-05-02 13:00',
                    }],
                options0: [
                    {
                    value: '',
                    label: ''
                }, {
                    value: '0',
                    label: '已支付'
                }, {
                    value: '1',
                    label: '未支付'
                }, {
                    value: '2',
                    label: '取消'
                },{
                    value: '3',
                    label: '审核中'
                }],
                options1: [
                    {
                        value: '',
                        label: ''
                    },
                    {
                    value: '0',
                    label: '晋升'
                }, {
                    value: '1',
                    label: '购买'
                }],
                value: '',//支付状态
                value1: '',//状态
//                分页
                currentPage: 1,
                //会员详情
                dialogTableVisible0:false,
                form0:{},//会员详情
                formLabelWidth:'120px',
            }
        },
        methods: {
//            会员详情
            detail(row,index){
                console.log(row, index);
                this.dialogTableVisible0 = true;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
    };
</script>

<style scoped>
    .el-cascader__label {
        height: 0px;
    }

    /**/
    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .spans0 {
        width: 80px;
    }

    .spans1 {
        width: 100px;
    }

    .el-row2 {
        margin: 10px 0;
        text-align: left;
    }

    .block {
        text-align: right;
        margin: 10px 0;
    }
</style>