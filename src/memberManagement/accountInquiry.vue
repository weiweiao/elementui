<template>
    <div class="account-inquiry">
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
                    <span style="width: 60px;">微信号</span>
                    <el-input type="primary"></el-input>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span style="width: 90px;">交易类型</span>
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
                    prop="shopOwnerName"
                    label="店主姓名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="WechatNumber"
                    label="微信号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="income"
                    label="收入"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="expenses"
                    label="支出"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="dealType"
                    label="交易类型"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="状态"
            >
            </el-table-column>
            <el-table-column
                    prop="cashSource"
                    label="提现来源"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="orderNumber"
                    label="订单号"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="100">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    prop="detail"
                    label="详情"
                    width="100">
                <template scope="scope">
                    <el-button type="text" size="small" @click="detail(scope.row,scope.$index)">返利详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--返利详情弹框-->
        <el-dialog title="返利详情" :visible.sync="dialogFormVisible" top="5vh">
            <el-form :model="form">
                <el-form-item label="奖金" :label-width="formLabelWidth">
                    <p style="font-size: 22px;color: blue">{{form.bonus}}</p>
                </el-form-item>
                <el-form-item label="奖金类型" :label-width="formLabelWidth">
                    <p>{{form.types}}</p>
                </el-form-item>
                <el-form-item label="订单编号" :label-width="formLabelWidth">
                    <p>{{form.code}}</p>
                </el-form-item>
                <el-form-item label="支付时间" :label-width="formLabelWidth">
                    <span v-show="payTimeShow">{{form.payTime | time}} </span>
                   <span style="margin-left: 40px;">结算时间 &nbsp <span v-show="takeOrderTimeShow">{{form.takeOrderTime | time}}</span></span>
                </el-form-item>
                <el-form-item label="订单状态" :label-width="formLabelWidth">
                    <p>{{form.orderStatus}}</p>
                </el-form-item>
                <el-form-item label="订单总额" :label-width="formLabelWidth">
                    <p style="color: forestgreen;font-size: 22px">{{form.money}}</p>
                </el-form-item>
                <el-form-item label="商品信息" :label-width="formLabelWidth">
                    <div v-for="data,index3 in form.orderDetail" style="display: flex"
                         :class="index3>0 ? 'borderB':'bb'">
                        <img style="padding: 25px 5px 0px 0px;width: 50px;height: 50px;" :src="data.src"
                             alt="商品图片" class="pics">
                        <div>
                            <p><span>{{data.commodityName}}</span></p>
                            <p>单价: <span>{{data.price}}</span></p>
                            <p>数量: <span>{{data.number}}</span></p>
                            <!--<p>已退款数量: <span>{{data.refoundNumber}}</span></p>-->
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="收货地址" :label-width="formLabelWidth">
                    <p>{{form.address}}</p>
                </el-form-item>
                <div style="text-align: center">
                    <el-button type="primary" @click="dialogFormVisible = false"
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
                value6: '',//时间选择器
                tableData3: [{
                    number:100000,
                    shopOwnerName:'王小二',
                    WechatNumber:'11111111111',
                    phone:'11111111111',
                    income:'18000000',
                    expenses:'111111111',
                    dealType:'坎坎坷坷',
                    state:'啦啦啦啦',
                    cashSource:'支付宝了',
                    orderNumber:'12222222222222',
                    createTime:'2019-9-90 90:90',
                }],
                options0: [
                    {
                        value: '',
                        label: ''
                    },
                    {
                    value: '选项1',
                    label: '充值结算'
                }, {
                    value: '选项2',
                    label: '提现'
                }, {
                    value: '选项3',
                    label: '税费'
                }, {
                    value: '选项4',
                    label: '系统奖励'
                }],
                options1: [
                    {
                        value: '',
                        label: ''
                    },
                    {
                    value: '选项1',
                    label: '待结算'
                }, {
                    value: '选项2',
                    label: '已结算'
                }, {
                    value: '选项3',
                    label: '已退款'
                }],
                value: '',//交易类型
                value1: '',//状态
                currentPage: 1,
                arr:[],//分页
                dialogFormVisible:false,
                form:{
                    bonus:'12.99',
                    types:'商品零售奖',
                    code:'180130544416036',
                    payTime:'2018-01-30 15:07',
                    takeOrderTime:'2018-02-04 23:57',
                    orderStatus:'交易完成',
                    money:'455.00 (含快递 0.00元)',
                    address:'福建省莆田市涵江区新涵大街移动营业厅一楼 王雪芬 13959539790',
                    orderDetail:[
                        {
                            src:'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/itemModule/1516612696709.jpg',
                            commodityName:'轻生活纯棉巾 一盒装 无添加干湿两用纯棉柔巾\n',
                            price:'99.00',
                            number:'1'
                        },
                        {
                            src:'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/itemModule/1516612696709.jpg',
                            commodityName:'轻生活纯棉巾 一盒装 无添加干湿两用纯棉柔巾\n',
                            price:'99.00',
                            number:'1'
                        }
                        ]
                },//返利详情
                formLabelWidth:'120px',
                takeOrderTimeShow:true,
                payTimeShow:true,



            }
        },
        methods: {
            detail(row,index){
                console.log(row, index);
                this.dialogFormVisible = true;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
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
    .block{
        text-align: right;
        margin: 10px 0;
    }
    .borderB {
        border-top: 1px dashed gray;
    }

</style>