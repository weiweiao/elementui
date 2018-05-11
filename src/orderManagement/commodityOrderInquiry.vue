<template>
    <!--商品订单查询-->
    <div class="product-order-inquiry">
        <!--查询-->
        <el-row :gutter="12">
            <el-col style="margin-bottom: 5px">
                <el-button type="primary" @click="highGrade" class="btns">高级</el-button>
                <el-button type="primary" @click="resetForm()" class="btns">重置</el-button>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span style="margin-right: 5px;width: 65px;">时间范围</span>
                        <el-date-picker
                                @change="date0"
                                v-model="value6"
                                type="daterange"
                                range-separator="-"
                                placeholder="选择日期范围">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <span class="spans0">订单编号</span>
                        <el-input type="primary" v-model="orderNumber"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span class="spans0">物流单号</span>
                        <el-upload
                                class="upload-demo"
                                :action="url+'/manualLogistics'"
                                :on-success="AhandleSuccess4"
                                :show-file-list="false"
                        >
                            <el-input v-model="wuliuNumber" placeholder="请选择文件"></el-input>
                        </el-upload>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" class="btns" @click="inquery">查询</el-button>
                    </div>
                </el-col>
            </el-col>
        </el-row>
        <div v-if="!isShow" style="margin-bottom: 5px">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="spans0">收货人</span>
                        <el-input type="primary" v-model="receiver"></el-input>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <span class="spans0">手机号码</span>
                        <el-input type="primary" v-model="phoneNumber"></el-input>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <span class="spans0">支付单号</span>
                        <el-input type="primary" v-model="payNumber"></el-input>
                    </div>
                </el-col>
                <!--<el-col :span="5">-->
                    <!--<div class="grid-content bg-purple">-->
                        <!--<span class="spans0">订单状态</span>-->
                        <!--<el-select v-model="value1" placeholder="请选择" @change="orderS">-->
                            <!--<el-option-->
                                    <!--v-for="item in options1"-->
                                    <!--:key="item.value1"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value1">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</div>-->
                <!--</el-col>-->
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <span class="spans0">供应商</span>
                        <el-select v-model="value2" placeholder="请选择" @change="handleChange">
                            <el-option
                                    v-for="item in options2"
                                    :key="item.value2"
                                    :label="item.label"
                                    :value="item.value2">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div style="margin-bottom: 5px">
            <el-button :class="{active:isActive}" @click="allBtn" style="padding: 10px 15px">全部订单</el-button>
            <el-button class="btns" :class="{bgs:btnsIndex==nowIndex}" v-for="data,btnsIndex in btnsData" @click="btns(btnsIndex)">{{data}}</el-button>
        </div>
        <div style="width: 100%;" >
            <ul class="header">
                <li style="width:120px">订单信息</li>
                <li style="width:180px">商品</li>
                <li style="width:140px">单价</li>
                <li style="width:100px;padding-right: 20px">数量</li>
                <li style="width:100px;padding-right: 10px">订单金额</li>
                <li style="width:120px">买家</li>
                <li style="width:100px">物流信息</li>
                <li style="width:100px;padding-left: 20px">支付信息</li>
                <li style="width:100px">订单状态</li>
                <li style="width:100px">收货地址</li>
                <li style="width:70px">备注</li>
                <li style="width:80px">操作</li>
            </ul>
            <ul class="main" v-loading="loading">
                <li v-for="itemZero,index0 in item0">
                    <ul class="firstClass">
                        <li v-show="itemZero.payTime==null?false:true">支付时间 : {{itemZero.payTime | time}} </li>
                        <li>支付单号 ：{{itemZero.payOrderCode}}</li>
                        <li>下单时间 : {{itemZero.gmtCreate | time}}</li>
                        <li>买家ID ：{{itemZero.buyerId}}</li>
                        <li class="payDetail">
                            <span style="color: blue" @click="payDetail(index0)" class="xiaoshou">支付详情</span>
                        </li>
                    </ul>
                    <!--二级-->
                    <ul class="secondClass">
                        <li v-for="itemOne,index1 in itemZero.item1" :class="index1>0 ? 'bt':'bb'">
                            <div style="width: 12%">
                                <p>仓库名称:{{itemOne.warehouseName}}</p>
                                <p>发货仓库:{{itemOne.deliveryWarehouse}}</p>
                                <p>订单号:</p>
                                <p>{{itemOne.orderCode}}</p>
                            </div>
                            <div style="width: 20%">
                                <!--商品循环-->
                                <ul style="display: flex; align-items: center;"
                                    v-for="itemTwo1,index21 in itemOne.item21"
                                    :class="index21>0 ? 'bt':'bb'">
                                    <li>
                                        <div class="commodityPic">
                                            <div style="display: flex;align-items:center">
                                                <img :src="itemTwo1.src" alt="商品图片无">
                                            </div>
                                            <div>
                                                <el-tooltip class="item" effect="light" placement="top-start">
                                                    <div slot="content" style="font-size: 14px">
                                                        <p>{{itemTwo1.commodityName}}</p>
                                                    </div>
                                                    <p class="xiaoshou">商品名称</p>
                                                </el-tooltip>
                                                <p>商品代码:</p>
                                                <p>{{itemTwo1.commodityCode}}</p>
                                                <p>规格:{{itemTwo1.rules}}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li style="text-align: right;width: 100px; ">
                                        <p style="color: blue">{{itemTwo1.commodityPrice}}</p>
                                        <p style="color: blue">x{{itemTwo1.numbers}}</p>
                                        <p>已退款数量 :<span style="color: blue">x{{itemTwo1.refundNum}}</span></p>
                                    </li>
                                    <li style="text-align: left;width: 50px; ">
                                        <!--<p style="color: blue">x{{itemTwo1.numbers}}</p>-->
                                    </li>
                                </ul>
                            </div>
                            <div style="width: 5%">
                                <p>{{itemOne.allAcconut}}</p>
                            </div>
                            <div style="width: 10%">
                                <p>姓名:{{itemOne.name}}</p>
                                <p>电话:</p>
                                <p>{{itemOne.phoneNumber}}</p>
                            </div>
                            <div style="width: 12%;">
                                <div v-show="itemOne.status=='待收货'||itemOne.status=='交易完成'||itemOne.status=='已退款'?true:false">
                                    <p v-show="itemOne.shipmentNumber==''||itemOne.shipmentNumber==null?false:true">物流单号:{{itemOne.shipmentNumber}}</p>
                                    <p v-show="itemOne.logisticsCompany==''||itemOne.logisticsCompany==null?false:true">物流公司:{{itemOne.logisticsCompany}}</p>
                                </div>
                            </div>
                            <div style="width: 10%">
                                <p>实付金额:</p>
                                <p>{{itemOne.realPayMoney}}</p>
                                <p>实付金币:</p>
                                <p>{{itemOne.realPayCoin}}</p>
                                <div>
                                    <!--<p v-for="data,shopIndex in itemOne.item23">店铺{{shopIndex}}:{{data.shop}}返利{{shopIndex}}：{{data.rebate}}</p>-->
                                    <p v-show="(itemOne.status=='待付款'||itemOne.status=='交易关闭')?false:true">店铺1: <span class="reds">{{itemOne.shop1}}</span>  <span>返利1:<span class="blues">{{itemOne.rebate1}}</span></span></p>
                                    <p v-show="(itemOne.status=='待付款'||itemOne.status=='交易关闭')?false:true">店铺2: <span class="reds">{{itemOne.shop2}}</span> <span>返利2:<span class="blues">{{itemOne.rebate2}}</span></span></p>
                                    <p v-show="(itemOne.status=='待付款'||itemOne.status=='交易关闭')?false:true">店铺3:<span class="reds">{{itemOne.shop3}}</span> <span>返利3:<span class="blues">{{itemOne.rebate3}}</span></span></p>
                                </div>
                            </div>
                            <div style="width: 7%">
                                <p style="color:red;">{{itemOne.status}}</p>
                                <span style="color:blue" @click="orderDetail(index0,index1)"
                                      class="xiaoshou">订单详情</span>
                            </div>
                            <div style="width: 8%">
                                <el-tooltip class="item" effect="light" placement="top-start">
                                    <div slot="content" style="font-size: 14px;">
                                        <p>{{itemOne.address}}</p>
                                    </div>
                                    <p class="xiaoshou"
                                       style="white-space: nowrap;;font-size: 14px;width: 100px; overflow:hidden; text-overflow:ellipsis;">
                                        {{itemOne.address}}</p>
                                </el-tooltip>
                            </div>
                            <div style="width: 4%">
                                <el-tooltip class="item" effect="light" placement="top-start">
                                    <div slot="content" style="font-size: 14px;">
                                        <p>{{itemOne.remark}}</p>
                                    </div>
                                    <p class="xiaoshou" style="font-size: 14px;width: 30px;">买家备注</p>
                                </el-tooltip>
                            </div>
                            <div style="width:4%; color: blue;font-weight: bolder;font-size: 16px">
                                <span class="xiaoshou"
                                      @click="remark(index0,index1)">备注</span>
                                <br>
                                <span class="xiaoshou" @click="refound(index0,index1)" v-show="itemOne.status=='待发货'?true:false">退款</span>
                                <br>
                                <span class="xiaoshou" @click="makeUp(index0,index1)" v-show="(itemOne.status=='待发货'||itemOne.status=='待收货'||itemOne.status=='交易完成')?true:false">补偿</span>
                            </div>
                        </li>
                    </ul>
                    <!--三级-->
                    <div></div>
                </li>
            </ul>
            <!--//支付详情弹框-->
            <el-dialog title="支付详情" :visible.sync="dialogFormVisible1" class="payDtaile" top="5vh">
                <el-form :model="form1">
                    <p v-for="data,data1Index in data1" style="margin-left: 70px;">
                        订单{{data1Index + 1}} <span
                            style="color: blue;font-size: 22px"> {{data}}</span></p>
                    <p style="margin-left: 110px;">*******************************************</p>
                    <el-form-item label="订单总额" :label-width="formLabelWidth">
                        <p>{{form1.orderAmount}}</p>
                    </el-form-item>
                    <el-form-item label="使用优惠券金额" :label-width="formLabelWidth">
                        <p>{{form1.couponAmount}}</p>
                    </el-form-item>
                    <el-form-item label="运费" :label-width="formLabelWidth">
                        <p>{{form1.yunfei}}</p>
                    </el-form-item>
                    <el-form-item label="税总" :label-width="formLabelWidth">
                        <p>{{form1.rateTotal}}</p>
                    </el-form-item>
                    <el-form-item label="使用金币金额" :label-width="formLabelWidth">
                        <p>{{form1.goldAmount}}</p>
                    </el-form-item>
                    <el-form-item label="实际支付金额" :label-width="formLabelWidth">
                        <p>{{form1.realAmount}}</p>
                    </el-form-item>
                    <el-form-item label="下单时间" :label-width="formLabelWidth">
                        <p v-show="orderTShow">{{form1.orderTime | time}}</p>
                    </el-form-item>
                    <el-form-item label="支付时间" :label-width="formLabelWidth">
                        <p v-show="payTShow">{{form1.paymentTime | time}}</p>
                    </el-form-item>
                    <el-form-item label="交易号" :label-width="formLabelWidth">
                        <p v-model="form1.tradeCode">{{form1.tradeCode}}</p>
                    </el-form-item>
                    <el-form-item label="支付方式" :label-width="formLabelWidth">
                        <p v-model="form1.payMathods">{{form1.payMathods}}</p>
                    </el-form-item>
                    <div style="text-align: center">
                        <el-button type="primary" @click="dialogFormVisible1 = false"
                                   style="padding: 10px 15px;">返回列表
                        </el-button>
                    </div>
                </el-form>

            </el-dialog>
            <!--订单详情弹框-->
            <el-dialog title="订单详情" :visible.sync="dialogFormVisible" top="5vh">
                <el-form :model="form">
                    <el-form-item label="订单编号" :label-width="formLabelWidth">
                        <p>{{form.code}}</p>
                    </el-form-item>
                    <el-form-item label="拍单时间" :label-width="formLabelWidth">
                        <p v-show="takeOrderTimeShow">{{form.takeOrderTime | time}}</p>
                    </el-form-item>
                    <el-form-item label="支付时间" :label-width="formLabelWidth">
                        <p v-show="payTimeShow">{{form.payTime | time}} </p>
                    </el-form-item>
                    <el-form-item label="订单状态" :label-width="formLabelWidth">
                        <p>{{form.orderStatus}}</p>
                    </el-form-item>
                    <!--<p>订单总额: <span>176.00 (含快递 0.00元)</span></p>-->
                    <el-form-item label="订单总额" :label-width="formLabelWidth">
                        <p>{{form.money}}</p>
                    </el-form-item>
                    <el-form-item label="商品信息" :label-width="formLabelWidth">
                        <div v-for="data,index3 in form.orderDetail" style="display: flex"
                             :class="index3>0 ? 'borderB':'bb'">
                            <img style="padding-top: 20px" :src="data.src"
                                 alt="商品图片" class="pics">
                            <div>
                                <p>商品名称: <span>{{data.commodityName}}</span></p>
                                <p>单价: <span>{{data.price}}</span></p>
                                <p>数量: <span>{{data.number}}</span></p>
                                <p>已退款数量: <span>{{data.refoundNumber}}</span></p>
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
            <!--备注弹框-->
            <el-dialog title="备注操作" :visible.sync="dialogFormVisible2">
                <el-form :model="form2">
                    <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                        <el-input type="textarea" v-model="form2.remark"
                                  style="width: 400px"></el-input>
                    </el-form-item>
                    <div style="text-align:center;">
                        <el-button type="primary" @click="sure()"
                                   style="padding: 10px 15px;margin-top: 20px">确定
                        </el-button>
                    </div>
                </el-form>

            </el-dialog>
            <!--补偿弹框-->
            <el-dialog title="补偿" :visible.sync="dialogFormVisible3" top="5vh">
                <ul style="margin-left: 60px">
                    <li>补偿金币 :
                        <el-input style="width: 300px;margin-left: 30px"
                                  v-model="buchangCoin"></el-input>
                    </li>
                    <li style="margin-top: 10px">补偿金额 :
                        <el-input style="width: 300px;margin-left: 30px"
                                  v-model="buchangMoney"></el-input>
                    </li>
                    <li style="margin-top: 10px;margin-bottom: 10px;line-height: 50px">客服备注 :
                        <el-input v-model="accounter" type="textarea"
                                  style="width: 300px;margin-left: 30px"></el-input>
                    </li>
                    <li style="margin-top: 8px">
                        <p>责任方 <span style="color: red">(必选)</span> :
                            <el-radio-group v-model="Rradio">
                                <el-radio label="德清仓库">德清仓库</el-radio>
                                <el-radio label="供应商">供应商</el-radio>
                                <el-radio label="平台">平台</el-radio>
                                <el-radio label="客户">客户</el-radio>
                                <el-radio label="客诉基金">客诉基金</el-radio>
                                <el-radio label="争议处理">争议处理</el-radio>
                            </el-radio-group>
                        </p>
                    </li>
                </ul>
                <div style="text-align: center">
                    <el-button @click="sure1()" type="primary" class="btns">确定</el-button>
                    <el-button @click="dialogFormVisible3=false" type="primary" class="btns">取消
                    </el-button>
                </div>
            </el-dialog>
            <!--退款弹框-->
            <el-dialog title="退款操作" :visible.sync="dialogTableVisible4" top="5vh">
                <p class="redP"> * 请先确认退款数量和退款类型,然后再选择</p>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            :selectable='checkboxInit'
                            width="40">
                    </el-table-column>
                    <el-table-column
                            prop="commodity"
                            label="商品"
                            width="150px"
                            >
                        <template slot-scope="scope">
                            <div style="display: flex">
                                <img :src="scope.row.productImageUrl" alt="pics" style="width: 40px;height: 40px;margin-top: 35px">
                                <div>
                                    <p>{{scope.row.productName}}</p>
                                    <p>商品代码:{{scope.row.spucode}}</p>
                                    <p>规格属性:{{scope.row.productProperty}}</p>
                                </div>

                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="productUnivalent"
                            label="售价"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="productNum"
                            label="购买数量"
                            width="70px"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="stockNumber"
                            label="库存"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="aa"
                            label="退款数量 | 退款类型"
                            width="180px"
                    >
                        <template slot-scope="scope">
                            <el-input-number  size="small" v-model="scope.row.num"  @change="handleChangeNum" :min="1" :max="scope.row.refundableNum"></el-input-number>
                            <el-radio-group v-model="scope.row.radios" @change="radiosChange"  style="font-size: 12px;display: flex;margin-top: 10px">
                                <el-radio :label="0">仅退款</el-radio>
                                <el-radio :label="1">退货退款</el-radio>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="line-height: 50px;margin-top: 10px;">
                    原因 <span class="redP">(必填)</span> : <el-input type="textarea" style="width:300px;" v-model="reson"></el-input>
                </div>
                <div style="text-align: right">
                    <el-button type="primary" style="padding: 10px 15px;margin-top: 10px" @click="refoundBtn">退款</el-button>
                </div>
            </el-dialog>
            <!--分页-->
            <div class="block" v-if="xianshi">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[30]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="arr.length">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading:true,//加载
                //退款部分
                dialogTableVisible4:false,
                tableData:[],
                reson:'',//原因
                //补偿部分
                dialogFormVisible3:false,
                buchangCoin:'',
                buchangMoney:'',
                accounter:'',
                Rradio:'',
                userId:'',
                orderNo:'',
                valArr:[],

                orderStatus:'',
                xianshi:true,
                aa:0,//全部
                aa:1,//6个按钮
                shopShow: '',//店铺显示与否
//                wuliuShow: '',//物流显示与否
                value6: '',//时间显示
                takeOrderTimeShow: '',//拍单时间
                payTimeShow: '',//支付时间
                startTime: '',
                endTime: '',
                orderTShow: '',//下单时间
                payTShow: '',//支付时间
                btnsIndex:Number,//下标按钮
                //查询
                isShow: 'true',
                orderNumber: '',//订单编号
//                value1: '',//订单状态
                value2: '',//供应商
                receiver: '',//收货人
                phoneNumber: '',//手机号
                payNumber: '',//支付单号
                wuliuNumber: '',//物流单号
                //6个按钮
                nowIndex:null,
                btnsData: ['待付款', '交易关闭', '待发货', '待收货', '交易完成', '已退款'],
                options1: [
                    {
                        value1: '',
                        label: '--请选择--'
                    },
                    {
                        value1: '0',
                        label: '待付款'
                    },
                    {
                        value1: '1',
                        label: '交易关闭'
                    },
                    {
                        value1: '2',
                        label: '待发货'
                    },
                    {
                        value1: '3',
                        label: '待收货'
                    },
                    {
                        value1: '4',
                        label: '交易完成'
                    },
                    {
                        value1: '5',
                        label: '已退款'
                    },
                ],//状态
                options2: [],//供应商
                currentPage: 1,
                arr: [],//分页
                item0: [],
                //订单详情
                dialogFormVisible: false,
                form: {
                    code: '129167722745910004',
                    takeOrderTime: '2019-11-09 00:00',
                    payTime: '2019-11-09 00:00',
                    orderStatus: '已完成',
                    address: '浙江杭州滨江区长河路475号华城和瑞科技园T3西802室 俞盛 13588012008',
                    money: '189.00(含快递费)',//订单金额
                    orderDetail: [
                        {
                            src: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/tag/1513646154327.jpg',
                            commodityName: '百味来Barilla进口意大利面通心粉精品礼盒组合1400g',
                            price: '120:00',
                            number: '2',
                            refoundNumber: '4'
                        }, {
                            src: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/tag/1513646154327.jpg',
                            commodityName: '百味来Barilla进口意大利面通心粉精品礼盒组合1400g',
                            price: '120:00',
                            number: '2',
                            refoundNumber: '0'
                        },],
// ],
                },
                //支付详情
                dialogFormVisible1: false,
                form1: {
                    rateTotal:'',
                    yunfei:'',
                    orderAmount: '',
                    couponAmount: '',
                    goldAmount: '',
                    realAmount: '',
                    orderTime: '',
                    paymentTime: '',
                    tradeCode: '',
                    payMathods: '',
                },
                data1: [],//支付详情-订单个数
                //备注
                dialogFormVisible2: false,
                form2: {
                    remark: '',
                },
                formLabelWidth: '120px',
                isActive:false,
            }
        },
        methods: {
            AhandleSuccess4(file){
                console.log(file);
                if(file.status==200){
                    this.$message({
                        type:'success',
                        message:'物流单号导入成功!'
                    })
                    //刷新
                    this.inquery();
                }else{
                    this.$message({
                        type:'warning',
                        message:file.msg,
                    })
                }
            },
            wuliuChange(val){
                console.log(val);
                console.log('9999');
            },
            //时间范围
            date0(val) {
                console.log(val);
                this.startTime = val.substr(0, 10);
                this.endTime = val.substr(11, val[val.length]);
                console.log(this.startTime);
                console.log(this.endTime);
            },
            //查询
            inquery() {
                this.aa=2;
                this.nowIndex = null;//7个按钮清空
                this.isActive = false;
                //物流单号暂放
                this.currentPage = 1;
                this.ajax(this.currentPage,'', this.startTime, this.endTime, this.orderNumber, this.receiver, this.phoneNumber, this.value2, this.wuliuNumber, this.payNumber);
            },
            //高级
            highGrade() {
                //清空
                this.receiver = '';
                this.phoneNumber = '';
                this.payNumber = '';
                this.value2 = '';

                this.isShow = !this.isShow;
            },
            resetForm() {
                this.value6 = '';//清空时间
                this.orderNumber = '';//订单编号
                this.value1 = '';//订单状态
                this.value2 = '';//供应商
                this.receiver = '';//收货人
                this.phoneNumber = '';//手机号
                this.payNumber = '';//支付单号
                this.wuliuNumber = '';//物流单号

            },
            //全部订单按钮
            allBtn() {
                this.aa=1;
                this.currentPage=1;
                this.nowIndex=null;
                this.isActive = true;
                this.ajax(this.currentPage, '', '', '', '', '', '', '', '', '');
            },
            //6个按钮
            btns(index) {
                //清空inputs查询框
                this.value6 = '';
                this.orderNumber = '';
                this.wuliuNumber = '';
                this.isShow = true;

                this.aa=0;
//                this.arr.length=0;
                console.log(index);
                this.btnsIndex=index;
                this.nowIndex = index;
                this.currentPage=1;
                this.isActive = false;//第一个按钮清空
                console.log(this.arr.length);
                this.item0=[];
                this.ajax(this.currentPage, index, '', '', '', '', '', '', '', '');
                console.log(this.arr.length);
            },
            //订单详情按钮
            orderDetail(index0, index1) {
                console.log(index1);
                this.dialogFormVisible = true;
                this.$http.post(this.url + '/manage/query_order_details', {orderNo: this.item0[index0].item1[index1].orderCode}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    this.form.code = res.data.data.orderNo;//订单编号
                    if (res.data.data.gmtCreate == '' || res.data.data.gmtCreate == null) {
                        this.takeOrderTimeShow = false;
                    } else {
                        this.form.takeOrderTime = res.data.data.gmtCreate;//拍单时间
                        this.takeOrderTimeShow = true;
                    }
                    if (res.data.data.paymentTime == '' || res.data.data.paymentTime == null) {
                        this.payTimeShow = false;
                    } else {
                        this.payTimeShow = true;
                        this.form.payTime = res.data.data.paymentTime;//支付时间
                    }
                    //订单状态
                    if (res.data.data.orderStatus == 0) {
                        this.form.orderStatus = '待付款'
                    } else if (res.data.data.orderStatus == 1) {
                        this.form.orderStatus = '交易关闭'
                    } else if (res.data.data.orderStatus == 2) {
                        this.form.orderStatus = '待发货'
                    } else if (res.data.data.orderStatus == 3) {
                        this.form.orderStatus = '待收货'
                    } else if (res.data.data.orderStatus == 4) {
                        this.form.orderStatus = '交易完成'
                    } else if (res.data.data.orderStatus == 5) {
                        this.form.orderStatus = '已退款'
                    }
                    //订单总额
                    if (res.data.data.orderCarriages == null) {
                        this.form.money = res.data.data.orderProductPriceTotals;
                    } else {
                        this.form.money = res.data.data.orderProductPriceTotals + '(含运费:' + res.data.data.orderCarriages + ' 优惠 : '+ res.data.data.discountAmounts+' 税费 : '+res.data.data.ratePrices+')';
                    }
                    this.form.address = res.data.data.shippingAddress + '  ' + res.data.data.receiverName + '  ' + res.data.data.receiverTel//收货地址
                    //数组循环--商品
                    this.form.orderDetail = [];
                    for (let i = 0; i < res.data.data.orderDetails.length; i++) {
                        let obj = {};
                        obj.src = res.data.data.orderDetails[i].productImageUrl;//商品图片
                        obj.commodityName = res.data.data.orderDetails[i].productName;//商品名称
                        obj.price = res.data.data.orderDetails[i].productUnivalent;//价格
                        obj.number = res.data.data.orderDetails[i].productNum//数量
                        obj.refoundNumber = res.data.data.orderDetails[i].refundNum//退款数量--暂时
                        this.form.orderDetail.push(obj);
                    }
                });
            },
            //支付详情按钮
            payDetail(index0) {
                console.log(index0);
                this.dialogFormVisible1 = true;
                this.$http.post(this.url + '/manage/query_pay_details', {transactionNo: this.item0[index0].payOrderCode}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    this.form1.orderAmount = res.data.data.transactionProductPriceTotals;//订单总额
                    this.form1.couponAmount = res.data.data.discountAmountTotals;//使用优惠券金额
                    this.form1.yunfei = res.data.data.transactionCarriages;//运费
                    this.form1.rateTotal = res.data.data.rateTotals;//税总
                    this.form1.goldAmount = res.data.data.transactionGolds;//使用金币金额
                    this.form1.realAmount = res.data.data.transactionPriceRmbs;//实际支付金额
                    if (res.data.data.paymentTime == '' || res.data.data.paymentTime == null) {
                        this.payTShow = false;
                    } else {
                        this.payTShow = true;
                        this.form1.paymentTime = res.data.data.paymentTime;//支付时间
                    }
                    if (res.data.data.gmtCreate == '' || res.data.data.gmtCreate == null) {
                        this.orderTShow = false;
                    } else {
                        this.form1.orderTime = res.data.data.gmtCreate;//下单时间
                        this.orderTShow = true;
                    }
                    this.form1.tradeCode = res.data.data.transactionNo;//交易号
                    //支付方式
                    if (res.data.data.payMethod == null || res.data.data.payMethod == '') {
                        this.form1.payMathods = '';
                    } else {
                        this.form1.payMathods = res.data.data.payMethod;
                    }
                    //订单个数
                    this.data1 = [];
                    for (let k = 0; k < res.data.data.orderDetailsShows.length; k++) {
                        let a = res.data.data.orderDetailsShows[k].orderProductPriceTotals + ' (含运费 : ' + res.data.data.orderDetailsShows[k].orderCarriages + ' 元)'
                        this.data1.push(a)
                    }


                })
            },
            //备注
            remark(index0, index1) {
                console.log(index1);
                this.dialogFormVisible2 = true
            },
            //备注确定按钮
            sure() {
                this.dialogFormVisible2 = false;
            },
            //退款-变灰
            checkboxInit(row,index){
                console.log(row, index);
                if (row.detailsStatus==1||row.detailsStatus==2)
                    return 0;//不可勾选
                else
                    return 1;//可勾选
            },
            //退款按钮
            refound(index0,index1) {
                this.dialogTableVisible4 = true;
                this.$http.post(this.url+'/manage/query_details',{orderNo:this.item0[index0].item1[index1].orderCode},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null){
                        this.tableData =[]
                    }else{
                        for(let i=0;i<res.data.data.length;i++){
                            res.data.data[i].num = '1';//计数器
                            res.data.data[i].radios = 0;//单选
                        }
                        this.tableData = res.data.data;
                    }
                })
            },
            //退款-确定
            refoundBtn(){
                console.log(this.valArr);
                if(this.valArr.length==0){
                    this.$message({
                        type:'warning',
                        message:'请选择商品!'
                    })
                }else{
                    if(this.reson == ''||this.reson == undefined){
                        this.$message({
                            type:'warning',
                            message:'请填写原因!'
                        })
                    }else{
                        this.$http.post(this.url+'/manage/refund_product_details',{
                            backgroundRefundList:JSON.stringify(this.valArr),
                            serviceRemark:this.reson,
                        },{emulateJSON:true}).then(function (res) {
                            console.log(res);
                            if(res.data.status==200){
                                this.dialogTableVisible4 = false;
                                this.$message({
                                    type:'success',
                                    message:'退款成功!'
                                });
                                //刷新当前页
                                this.ajax(this.currentPage,this.btnsIndex, this.startTime, this.endTime, this.orderNumber, this.receiver, this.phoneNumber, this.value2, this.wuliuNumber, this.payNumber);
                            }else if(res.data.status==20003){
                                this.$message({
                                    type:'warning',
                                    message:'订单已发货!'
                                })
                            }else if(res.data.status==20002){
                                this.$message({
                                    type:'warning',
                                    message:'订单号不存在!'
                                })
                            }else{
                                this.$message({
                                    type:'error',
                                    message:'退款失败!'
                                })
                            }
                        })
                }
                }
            },
            //选项
            handleSelectionChange(val){
                console.log(val);
                console.log(val.radios);
                if(val.num==''){
                    this.$message({
                        type:'warning',
                        message:'请填写退款数量!'
                    })
                    console.log("999");
                }else{
                    this.valArr=[];
                    for(let i=0;i<val.length;i++){
                        let obj={};
                        obj.orderDetailsId = val[i].orderDetailsId;
                        obj.applyNum=val[i].num;
                        obj.refundType=val[i].radios;
                        this.valArr.push(obj);
                    }
                }
                console.log(this.valArr);
            },
            //计数器
            handleChangeNum(val){
                console.log(val);
            },
            //单选
            radiosChange(val){
                console.log(val);
            },
            //补偿按钮
            makeUp(index0,index1){
                this.userId = this.item0[index0].buyerId;//买家ID
                this.Rradio='';
                this.accounter = '';
                this.buchangCoin = '0.00';
                this.buchangMoney = '0.00';
//                this.type = row.type;
                console.log(this.item0[index0].item1[index1]);
                this.orderNo =this.item0[index0].item1[index1].orderCode;
//                this.refundNo = row.refundNo;
                this.dialogFormVisible3 = true;
            },
            sure1(){
                console.log(this.accounter);
                if(this.accounter==''){
                    this.$message({
                        type: 'warning',
                        message: '请填写客服备注!'
                    });
                }else{
                    if (this.Rradio == '') {
                        this.$message({
                            type: 'warning',
                            message: '请选择责任方!'
                        });
                    } else {
                        this.$http.post(this.url + '/orderRefund/check_recoup',{
                            userId: this.userId,
                            orderNo: this.orderNo,
                            serviceRemark: this.accounter,
//                        type: this.type,
                            recoupAmount: this.buchangMoney,
                            recoupGold: this.buchangCoin,
                            responsibleParty: this.Rradio,
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 201) {
                                alert(res.data.msg);
                            } else if (res.data.status == 203) {
                                alert(res.data.msg);
                            } else if (res.data.status == 200) {
                                alert(res.data.msg);
                                this.dialogFormVisible3 = false;
                            } else if (res.data.status == 202) {
                                alert(res.data.msg);
                            }
                        });
                    }
                }
            },
            //供应商
            handleChange(val) {
                console.log(val);
            },
            //订单状态
//            orderS(val) {
//                console.log(val);
//                this.orderStatus=val;
//            },
            //分页
            handleCurrentChange(val) {
                console.log(val);
                this.currentPage = val;
                let a;
                if(this.aa==0){
                    a=this.btnsIndex;
                }else{
                   a=''
                }
                console.log(this.arr.length);
                this.ajax( this.currentPage,a, this.startTime, this.endTime, this.orderNumber, this.receiver, this.phoneNumber, this.value2, this.wuliuNumber, this.payNumber);
            },
            //ajax
            ajax(val1, val2, val3, val4, val5, val6, val7, val8, val9, val10) {
                this.loading = true;
                this.item0 = [];
                this.$http.post(this.url + '/manage/query_byTerm', {
                    page: val1,//1
                    num: 30,
                    orderStatus: val2,//订单状态2
                    startTime: val3,//时间段3
                    endTime: val4,//时间段4
                    orderNo: val5,//订单号5
                    receiverName: val6,//收货人6
                    receiverTel: val7,//电话7
                    warehouseCode: val8,//仓库名称8
                    logisticsNo: val9,//物流单号9
                    transactionNo: val10,//支付单号10
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    this.loading = false;
                    for (let i = 0; i < res.data.data.pageList.length; i++) {
                        let obj = {item1: []};
                        obj.payTime = res.data.data.pageList[i].payTime;//支付时间
                        obj.payOrderCode = res.data.data.pageList[i].transactionNo;//支付单号
                        obj.gmtCreate = res.data.data.pageList[i].gmtCreate;//下单时间
                        obj.buyerId = res.data.data.pageList[i].userId;//买家ID
                        let a = res.data.data.pageList[i].orderDetailsShows;
                        for (let k = 0; k < a.length; k++) {
                            let obj1 = {item21: [], item22: []};
                            obj1.warehouseName = a[k].warehouseName;//仓库名称
                            obj1.deliveryWarehouse = a[k].shortName;//发货仓库
                            obj1.orderCode = a[k].orderNo;//订单号
                            obj1.allAcconut = a[k].orderProductPriceTotals;//订单金额
                            obj1.name = a[k].receiverName;//姓名
                            obj1.phoneNumber = a[k].receiverTel;//电话
                            obj1.realPayMoney = a[k].rmbCoins;//实付金额
                            obj1.realPayCoin = a[k].goldCoins;//实付金币
                            obj1.address = a[k].shippingAddress;//地址
                            //判断-订单状态
                            if (a[k].orderStatus == 0) {
                                obj1.status = '待付款'
                            } else if (a[k].orderStatus == 1) {
                                obj1.status = '交易关闭'
                            } else if (a[k].orderStatus == 2) {
                                obj1.status = '待发货'
                            } else if (a[k].orderStatus == 3) {
                                obj1.status = '待收货'
                            } else if (a[k].orderStatus == 4) {
                                obj1.status = '交易完成'
                            } else if (a[k].orderStatus == 5) {
                                obj1.status = '已退款'
                            }
                            //店铺信息在交易关闭和待付款时不显示
//                            if (a[k].orderStatus == 0 || a[k].orderStatus == 1) {
//                                this.shopShow = false;
//                            } else {
//                                this.shopShow = true;
                                obj1.shop1 = a[k].firstMemberId;//店铺1
                                obj1.rebate1 = a[k].firstRebate;//返利1
                                obj1.shop2 = a[k].secondMemberId;//店铺2
                                obj1.rebate2 = a[k].secondRebate;//返利2
                                obj1.shop3 = a[k].ultimateId;//店铺3
                                obj1.rebate3 = a[k].ulitmateMemRebate;//返利3
//                            }
                            for (let j = 0; j < a[k].orderDetails.length; j++) {
                                let obj21 = {};//商品信息
                                let obj22 = {};//物流信息
                                obj21.src = a[k].orderDetails[j].productImageUrl;//图片
                                obj21.commodityName = a[k].orderDetails[j].productName;//商品名称
                                obj21.commodityCode = a[k].orderDetails[j].spucode;//商品代码
                                obj21.rules = a[k].orderDetails[j].productProperty;//规格
                                obj21.commodityPrice = a[k].orderDetails[j].productUnivalent;//商品单价
                                obj21.numbers = a[k].orderDetails[j].productNum;//商品数量
                                obj21.refundNum = a[k].orderDetails[j].refundNum;//已退款数量
                                if(a[k].orderDetails[0]==null||a[k].orderDetails[0]==''){
                                    obj1.shipmentNumber = '';//物流单号
                                    obj1.logisticsCompany = '';//物流公司
//                                        obj1.item22.push(obj22);
                                }else{
                                    obj1.shipmentNumber = a[k].orderDetails[0].logisticsNo;//物流单号
                                    obj1.logisticsCompany = a[k].orderDetails[0].expressCompany;//物流公司
//                                        obj1.item22.push(obj22);
                                }
                                obj1.item21.push(obj21);
                                //物流信息在待付款.代发货.交易关闭时不显示(又改为物流有就显示没有就隐藏)
//                                if (a[k].orderStatus == 0 || a[k].orderStatus == 1 || a[k].orderStatus == 2) {
//                                    this.wuliuShow = false;
//                                } else {
//                                    this.wuliuShow = true;
//                                    if(a[k].orderDetails[0]==null||a[k].orderDetails[0]==''){
//                                        obj22.shipmentNumber = '';//物流单号
//                                        obj22.logisticsCompany = '';//物流公司
////                                        obj1.item22.push(obj22);
//                                    }else{
//                                        obj22.shipmentNumber = a[k].orderDetails[0].logisticsNo;//物流单号
//                                        obj22.logisticsCompany = a[k].orderDetails[0].expressCompany;//物流公司
////                                        obj1.item22.push(obj22);
//                                    }
//                                }
                            }
                            obj.item1.push(obj1);
                        }
                        this.item0.push(obj);
                    }
                    this.loading = false;
                        this.arr.length = res.data.data.pageTotal;
                    console.log(this.arr.length);
                    if (this.arr.length == 0){
                        this.xianshi = false;
                        this.$message({
                            type:'warning',
                            message:'抱歉,没有您要的数据!',
                            duration:1500,
                        })
                    }else{
                        this.xianshi = true
                    }
                });
            },
        },
        created() {
            this.ajax(1, '', '', '', '', '', '', '', '', '');
//           查询供应商
            this.$http.post(this.url + '/warehouse/all_warehouse', {
                page: 1,
                num: 100000,
                status: 1,
            }, {emulateJSON: true}).then(function (res) {
                console.log(res);
                for (let k = 0; k < res.data.data.pageList.length; k++) {
                    let obj = {};
                    obj.label = res.data.data.pageList[k].warehouseName;
                    obj.value2 = res.data.data.pageList[k].warehouseCode;
                    this.options2.push(obj)
                }
                let obj = {value2: "", label: "-- 请选择 --"};
                this.options2.unshift(obj)
            });
        }
    }
</script>


<style scoped>
    * {
        padding: 0;
        margin: 0;
    }

    .block {
        margin-top: 5px;
        text-align: right;
    }

    .product-order-inquiry {
        font-size: 14px;
        width: 100%;
    }

    .header {
        background: #EBEEF5;
        height: 50px;
        display: flex;
        line-height: 50px;
    }

    .header li {
        /*width: 9%;*/
        text-align: center;
    }

    ul > li {
        list-style: none;
    }

    .firstClass {
        background: #E4E7ED;
        width: 100%;
        height: 50px;
        display: flex;
        line-height: 50px;
        font-weight: bold;
        position: relative;
    }

    .payDtaile {
        font-weight: normal;
    }

    .firstClass .payDetail {
        position: absolute;
        right: 0px;
    }

    .firstClass > li {
        padding: 0px 20px;
    }

    .secondClass {
        background: lightblue;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    .secondClass > li {
        display: flex;
        align-items: center;
        width: 100%;
    }

    .secondClass > li > div {
        /*width: 10%;*/
        padding: 10px 10px;
    }

    .commodityPic {
        display: flex;
    }

    img {
        width: 50px;
        height: 50px;
        /*margin-top: 20px;*/
        /*vertical-align: top;*/
        /*margin-right: 5px;*/
    }

    .pics {
        margin-top: 12px;
    }

    .xiaoshou {
        cursor: pointer;
    }

    .main {
        font-size: 12px;
        height: 490px;
        overflow: scroll;
    }

    .bt {
        border-top: 2px dashed green;
    }

    .bb {
    }

    .borderB {
        border-top: 1px dashed gray;
    }

    .spans0 {
        width: 90px;
        text-align: center;
        color:#48576a;
    }

    .spans1 {
        width: 120px;
    }

    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .spans {
        width: 100px;
    }

    .btns {
        padding: 10px 15px;
    }
    .redP{
        color: red;
    }

    .bgs{
        border:1px solid red;
        color: red;
    }
    .active{
        border:1px solid red;
        color: red;
    }
    .reds{
        font-size: 14px;
        color: red;
    }
.blues{
    font-size: 14px;
    color: blue;
}

</style>