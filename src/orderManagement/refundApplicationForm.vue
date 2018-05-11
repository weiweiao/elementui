<template>
    <!--退款申请表-->
    <div class="product-order-inquiry">
        <div style="margin-bottom: 5px">
            <el-row style="margin-bottom: 8px">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span class="spans0">订单编号</span>
                        <el-input type="primary" v-model="orderNum" class="inputs" style="font-size: 12px"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span class="spans0">退款单号</span>
                        <el-input type="primary" v-model="refoundNum" class="inputs" style="font-size: 12px"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span class="spans1">退货快递单号</span>
                        <el-input type="primary" v-model="returnCourierNum" class="inputs"
                                  style="font-size: 12px"></el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="spans0">订单状态</span>
                        <el-select v-model="orderstatus" placeholder="请选择" @change="orderStatus" class="inputs">
                            <el-option
                                    v-for="item in orderStatusOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="spans0">退款类型</span>
                        <el-select v-model="value1" placeholder="请选择" @change="refundType" class="inputs">
                            <el-option
                                    v-for="item in options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <transition name="el-fade-in-linear">
                    <el-col :span="4" v-show="isShows" class="transition-box">
                        <div class="grid-content bg-purple">
                            <span class="spans0">退货状态</span>
                            <el-select v-model="value2" placeholder="请选择" @change="returnGoodsStatus">
                                <el-option
                                        v-for="item in options2s"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </transition>
                <transition name="el-fade-in-linear">
                    <el-col :span="4" v-show="isShow" class="transition-box">
                        <div class="grid-content bg-purple">
                            <span class="spans0">退货状态</span>
                            <el-select v-model="value2" placeholder="请选择" @change="returnGoodsStatus">
                                <el-option
                                        v-for="item in options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </transition>
                <el-col :span="2">
                    <div class="grid-content bg-purple inquiry">
                        <el-button type="primary" class="btns" @click="inquery">查询</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div style="width: 100%;">
            <!--table-->
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    max-height="600">
                <el-table-column
                        type="selection"
                        width="55px"
                        :selectable="checkSelectable"
                >
                </el-table-column>
                <el-table-column
                        prop="refundNo"
                        label="退款单信息"
                        width="130"
                >
                    <template slot-scope="scope">
                        <p>退款单号: <br>{{scope.row.refundNo}}</p>
                        <el-button type="text" @click="originOrderDetail(scope.row,scope.$index)">查看原订单详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="退款类型"
                        width="100"
                >
                    <template slot-scope="scope">
                        <p>{{scope.row.type == 0 ? '仅退款' : '退货退款'}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="orderNo"
                        label="订单号"
                        width="200"
                >
                </el-table-column>
                <el-table-column
                        prop="refundProducts"
                        label="商品 | 单价 | 申请退款数量"
                        width="360px"
                >
                    <template slot-scope="scope">
                        <div v-for="item,index in scope.row.refundProducts" :class="index>0?'bt':'bb'"
                             style="display: flex;align-items: center;flex-direction: row;position: relative">
                            <img :src="item.imageUrl" alt="商品图片无">
                            <div>
                                <p>{{item.skuname}}</p>
                                <p>商品代码 : {{item.spucode}}</p>
                                <p>规格属性 : {{item.productProperty}}</p>
                            </div>
                            <div style="text-align: right;color: blue;position: absolute;right: 0">
                                <p>{{item.price}}</p>
                                <p>x{{item.productNum}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="refundCashAdvances"
                        label="应退金额"
                        width="130"
                >
                    <template slot-scope="scope">
                        <p>金币 : {{scope.row.refundAmounts}}</p>
                        <p>金额 : {{scope.row.refundCashAdvances}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="retireCashAdvances"
                        label="实退金额"
                        width="130"
                >
                    <template slot-scope="scope">
                        <p>金币 : {{scope.row.retireAmounts}}</p>
                        <!--悬浮框-->
                        <el-popover
                                ref="popover4"
                                placement="right"
                                width="600"
                                trigger="hover">
                            <el-table :data="scope.row.refundAmountlist" style="max-height:500px;overflow: scroll">
                                <el-table-column width="80" property="refundAmountType" label="类型"></el-table-column>
                                <el-table-column width="120" property="refundAmounts" label="退款金币"></el-table-column>
                                <el-table-column width="120" property="refundCashAdvances"
                                                 label="退款金额"></el-table-column>
                                <el-table-column width="80" property="isFinished" label="状态"></el-table-column>
                                <el-table-column width="80" property="refundCarriages"
                                                 label="运费"></el-table-column>
                                <el-table-column width="80" property="refundRatePrices"
                                                 label="税费"></el-table-column>
                                <el-table-column width="90" property="responsibleParty"
                                                 label="责任方"></el-table-column>
                            </el-table>
                        </el-popover>
                        <el-button type="text" class="xiaoshou" v-popover:popover4>
                            金额 : {{scope.row.retireCashAdvances}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="reason"
                        label="原因"
                        width="100"
                >
                    <template slot-scope="scope">
                        <div>
                            <p>{{scope.row.reason}}</p>
                            <!--<div v-show="scope.row.resendCode==null?false:true">-->
                            <!--<p class="redP">物流单号 <br> {{scope.row.resendCode}}</p>-->
                            <!--<p class="redP">物流公司 <br>{{scope.row.resendCompany}}</p>-->
                            <!--</div>-->
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="gmtCreate"
                        label="发起时间"
                        width="120px"
                >
                    <template slot-scope="scope">
                        {{scope.row.gmtCreate | time}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="refundStatus"
                        label="退货状态"
                        width="120"
                >
                    <template slot-scope="scope">
                        <p style="color: red">{{scope.row.refundStatus}}</p>
                        <div v-show="scope.row.resendCode==null?false:true">
                            <p>物流单号: <br> {{scope.row.resendCode}}</p>
                            <p>物流公司: <br>{{scope.row.resendCompany}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="warehouseName"
                        label="仓库"
                >
                </el-table-column>
                <el-table-column
                        prop="userRemark"
                        label="备注"
                        width="120px"
                >
                    <template slot-scope="scope">
                        <p>{{scope.row.userRemark}}</p>
                        <div v-show="scope.row.serviceRemark==null?false:true">
                            <el-tooltip placement="top" effect="light">
                                <div slot="content">{{scope.row.serviceRemark}}</div>
                                <el-button type="text">客服备注</el-button>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="responsibleParty"
                        label="责任方"
                >
                </el-table-column>
                <el-table-column
                        prop="sureTime"
                        label="财务确认时间"
                >
                    <template slot-scope="scope">
                        <p v-if="scope.row.sureTime==null?true:false">无</p>
                        <p v-if="scope.row.sureTime!=null?true:false">{{scope.row.sureTime | time}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="rejectReason"
                        label="驳回原因"
                >
                </el-table-column>
                <el-table-column
                        prop="operate"
                        label="操作"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <div v-if="(scope.row.type==1&&(scope.row.refundStatus=='拦截失败'||scope.row.refundStatus=='客服审核通过'))?true:false">
                            <el-button type="text" @click="fillLogistics(scope.row,scope.$index)">填写物流</el-button>
                            <br>
                        </div>
                        <div v-if="(scope.row.refundStatus=='等待客服审核')?true:false">
                            <el-button type="text" @click="audit(scope.row,scope.$index)">审核</el-button>
                            <br>
                        </div>
                        <div v-if="((scope.row.type==0&&scope.row.refundStatus=='客服审核通过')||(scope.row.type==1&&scope.row.refundStatus=='已提交物流'&&scope.row.whetherBack=='Y')||(scope.row.refundStatus=='财务审核不通过')||(scope.row.refundStatus=='拦截成功'))?true:false">
                            <el-button type="text" @click="refound(scope.row,scope.$index)">退款</el-button>
                            <br>
                        </div>
                        <div v-if="((scope.row.refundStatus=='客服已确认')||(scope.row.refundStatus=='财务审核通过')||(scope.row.refundStatus=='财务审核不通过')||(scope.row.refundStatus=='完成退款')||(scope.row.refundStatus=='拦截成功')||(scope.row.type==0&&(scope.row.refundStatus=='财务审核通过'||scope.row.refundStatus=='客服审核通过'))||(scope.row.type==1&&(scope.row.refundStatus=='客服审核不通过'||scope.row.refundStatus=='已提交物流')))?true:false">
                            <el-button type="text" @click="makeUp(scope.row,scope.$index)">补偿</el-button>
                            <br>
                        </div>
                        <div v-if="((scope.row.refundStatus=='拦截失败')||(scope.row.type==1&&scope.row.refundStatus=='客服审核通过'))?true:false">
                            <el-button type="text" @click="closeRefound(scope.row,scope.$index)">关闭退款</el-button>
                            <br>
                        </div>
                        <div v-show="(scope.row.type==0&&scope.row.refundStatus=='拦截失败')?true:false">
                            <el-button type="text" @click="mustRefound(scope.row,scope.$index)">强制退款</el-button>
                            <br>
                        </div>
                        <div>
                            <el-button type="text" @click="remark(scope.row,scope.$index)">备注</el-button>
                            <br>
                        </div>
                        <div>
                            <el-button type="text" @click="checkLog(scope.row,scope.$index)">查看日志</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!--原订单详情弹框-->
            <el-dialog title="原订单详情" :visible.sync="dialogFormVisible">
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
                    <el-button type="primary" @click="dialogFormVisible = false"
                               style="padding: 10px 15px;margin-left: 500px">返回列表
                    </el-button>
                </el-form>

            </el-dialog>
            <!--备注弹框-->
            <el-dialog title="备注操作" :visible.sync="dialogFormVisible1">
                <el-form :model="form2">
                    <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                        <el-input type="textarea" v-model="form2.remark"
                                  style="width: 400px"></el-input>
                    </el-form-item>
                    <div style="text-align:right;">
                        <el-button type="primary" @click="sure"
                                   style="padding: 10px 15px;margin-top: 20px">确定
                        </el-button>
                    </div>
                </el-form>

            </el-dialog>
            <!--补偿弹框-->
            <el-dialog title="补偿" :visible.sync="dialogFormVisible2">
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
                <div style="text-align: right">
                    <el-button @click="sure1" type="primary" class="btns">确定</el-button>
                    <el-button @click="dialogFormVisible2=false" type="primary" class="btns">取消
                    </el-button>
                </div>
            </el-dialog>
            <!--强制退款弹框-->
            <el-dialog title="确认退款金额" :visible.sync="dialogFormVisible3">
                <ul style="margin-left: 60px" class="Mul">
                    <li>退款金币 :
                        <el-input style="width: 300px;margin-left: 30px" v-model="MRCoin"></el-input>
                    </li>
                    <li>退款金额 :
                        <el-input style="width: 300px;margin-left: 30px" v-model="MRMoney"></el-input>
                    </li>
                    <li>
                        <el-checkbox v-model="Myunfei0" @change="Myunfei">运费 : </el-checkbox>
                        <el-input style="width: 150px;margin-left: 30px" :disabled="Mdisabled1"
                                  v-model="MRyunfei"></el-input>
                        <span>
                                        补运费 : <el-input style="width: 150px;" v-model="MRbuyunfei"></el-input>({{MbuyunfeiS}})
                                    </span>
                    </li>
                    <li>
                        <el-checkbox v-model="Mshuifei0" @change="Mshuifei">税费 : </el-checkbox>
                        <el-input style="width: 300px;margin-left: 30px" :disabled="Mdisabled2"
                                  v-model="MRshuifei"></el-input>
                    </li>
                    <li style="margin-left: 25px">备注 :
                        <el-input type="textarea" style="width: 300px;margin-left: 30px"
                                  v-model="MRremark"></el-input>
                    </li>
                </ul>
                <div style="text-align: right">
                    <el-button @click="sure2()" type="primary" class="btns">确定</el-button>
                    <el-button @click="dialogFormVisible3=false" type="primary" class="btns">取消
                    </el-button>
                </div>
            </el-dialog>
            <!--退款弹框-->
            <el-dialog title="确认退款金额" :visible.sync="dialogFormVisible4">
                <ul style="margin-left: 60px" class="Mul">
                    <li>退款金币 :
                        <el-input style="width: 300px;margin-left: 30px" v-model="RCoin"></el-input>
                    </li>
                    <li>退款金额 :
                        <el-input style="width: 300px;margin-left: 30px" v-model="RMoney"></el-input>
                    </li>
                    <li>
                        <el-checkbox v-model="yunfei0" @change="yunfei">运费 : </el-checkbox>
                        <el-input style="width: 150px;margin-left: 30px" :disabled="disabled1"
                                  v-model="Ryunfei"></el-input>
                        <span>
                                        补运费 : <el-input style="width: 150px;" v-model="Rbuyunfei"></el-input>({{buyunfeiS}})
                                    </span>
                    </li>
                    <li>
                        <el-checkbox v-model="shuifei0" @change="shuifei">税费 : </el-checkbox>
                        <el-input style="width: 300px;margin-left: 30px" :disabled="disabled2"
                                  v-model="Rshuifei"></el-input>
                    </li>
                    <li style="margin-left: 25px">备注 :
                        <el-input type="textarea" style="width: 300px;margin-left: 30px"
                                  v-model="Rremark"></el-input>
                    </li>
                </ul>
                <div style="text-align: right">
                    <el-button @click="sure3()" type="primary" class="btns">确定</el-button>
                    <el-button @click="dialogFormVisible4=false" type="primary" class="btns">取消
                    </el-button>
                </div>
            </el-dialog>
            <!--关闭退款弹框-->
            <el-dialog title="关闭退款" :visible.sync="dialogFormVisible5">
                <el-form :model="form3">
                    <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                        <el-input type="textarea" v-model="form3.remark"
                                  style="width: 400px"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="sure4"
                               style="padding: 10px 15px;margin-left: 550px;margin-top: 20px">确定
                    </el-button>
                </el-form>

            </el-dialog>
            <!--填写物流弹框-->
            <el-dialog title="填写物流" :visible.sync="dialogFormVisible6">
                <el-form :model="form4" :rules="form4Fules" ref="form4">
                    <el-form-item style="margin-bottom: 20px" label="物流单号" :label-width="formLabelWidth"
                                  prop="logisticsNumber">
                        <el-input type="text" v-model="form4.logisticsNumber"
                                  style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="物流公司" :label-width="formLabelWidth" prop="logisticsCompany">
                        <el-input type="text" v-model="form4.logisticsCompany"
                                  style="width: 300px"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="sure5('form4')"
                               style="padding: 10px 15px;margin-left: 550px;margin-top: 20px">确定
                    </el-button>
                </el-form>
            </el-dialog>
            <!--审核弹框-->
            <el-dialog title="审核操作" :visible.sync="dialogFormVisible7">
                <div class="auditSpans" style="font-size: 14px">
                    <span>退款单号 : {{ARNumber}} </span>
                    <span>参考退款金币 : {{ARCoin}} 元</span>
                    <span>参考退款金额 : {{ARMoney}} 元</span>
                    <span>申请退款数量 : {{refoundNumber}}</span>
                </div>
                <el-table :data="auditData" border>
                    <el-table-column property="imageUrl" label="商品图片" width="100">
                        <template slot-scope="scope">
                            <img :src="scope.row.imageUrl" alt="商品图片无"
                                 style="padding-top: 10px;width: 70px;height: 70px;">
                        </template>
                    </el-table-column>
                    <el-table-column property="spucode" label="spuCode"></el-table-column>
                    <el-table-column property="skuname" label="商品名称" width="200"></el-table-column>
                    <el-table-column property="productProperty" label="规格属性"></el-table-column>
                </el-table>
                <div style="margin-top: 8px">
                    <p>退款理由 : <span style="color: blue">{{refoundReason}}</span></p>
                    <p>用户备注 : {{userRemark}}</p>
                    <div style="display: flex;flex-wrap: wrap">
                        <div v-for="item in picItems">
                            <img :src="item" alt="图片无" style="width: 80px;height: 80px;padding:10px 10px; ">
                        </div>
                    </div>
                    <div style="display: flex;align-items: center;margin-top: 8px;flex-wrap:wrap"><p>客服备注 : </p>
                        <el-input type="textarea" style="width: 400px;" placeholder="若审核不通过请在此输入理由"
                                  v-model="serverRemark"></el-input>
                    </div>
                    <div style="margin-top: 8px">
                        <p>责任方 <span style="color: red">(必选)</span> :
                            <el-radio-group v-model="radio">
                                <el-radio label="德清仓库">德清仓库</el-radio>
                                <el-radio label="供应商">供应商</el-radio>
                                <el-radio label="平台">平台</el-radio>
                                <el-radio label="客户">客户</el-radio>
                                <el-radio label="客诉基金">客诉基金</el-radio>
                                <el-radio label="争议处理">争议处理</el-radio>
                            </el-radio-group>
                        </p>
                    </div>
                </div>
                <div style="text-align: right;margin-top: 8px">
                    <el-button class="btns" type="primary" @click="dialogFormVisible7=false">取消</el-button>
                    <el-button class="btns" type="primary" @click="auditNoPass">审核不通过</el-button>
                    <el-button class="btns" type="primary" @click="auditPass">审核通过</el-button>
                </div>
            </el-dialog>
            <!--分页-->
            <div class="block">
                <el-button @click="wholeRefound" type="primary" class="btns wholeRefound" :disabled="disabledWR">批量退款
                </el-button>
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10]"
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
                loading: true,//加载
                //订单状态-下拉框
                orderstatus: '',
                orderStatusOption: [
                    {
                        value: '',
                        label: '--请选择--'
                    }, {
                        value: '2',
                        label: '待发货'
                    }, {
                        value: '3',
                        label: '待收货'
                    }, {
                        value: '4',
                        label: '交易完成'
                    }],
                orderStatusVal: '',

                radio: '',//责任方
                Rradio: '',//补偿-责任方
                takeOrderTimeShow: '',//拍单时间
                payTimeShow: '',//支付时间
                //按钮-审核
                picItems: [],
                dialogFormVisible7: false,
                refoundNumber: Number,
                ARNumber: '',
                ARCoin: '',
                ARMoney: '',
                refoundReason: '',
                userRemark: '',
                serverRemark: '',
                auditData: [],
                auditRow: {},


                //按钮-填写物流
                dialogFormVisible6: false,
                logisticsRow: '',
                form4: {logisticsNumber: '', logisticsCompany: ''},
                form4Fules: {
                    logisticsNumber: [{required: true, message: '请输入物流单号', trigger: 'blur'},],
                    logisticsCompany: [{required: true, message: '请输入物流公司', trigger: 'blur'},]
                },
                //按钮-关闭退款
                dialogFormVisible5: false,
                form3: {remark: ''},
                CRow: {},//关闭退款
                //按钮-强制退款
                dialogFormVisible3: false,
                Mdisabled1: true,
                Mdisabled2: true,
                Mrow: {},//强制退款
                MRCoin: '',
                MRMoney: '',
                Myunfei0: '',
                MRyunfei: '',
                MRbuyunfei: '',
                MbuyunfeiS: '',
                Mshuifei0: '',
                MRshuifei: '',
                MRremark: '',
                //按钮-退款
                dialogFormVisible4: false,
                disabled1: true,
                disabled2: true,
                row: {},//强制退款
                RCoin: '',
                RMoney: '',
                yunfei0: '',
                Ryunfei: '',
                Rbuyunfei: '',
                buyunfeiS: '',
                shuifei0: '',
                Rshuifei: '',
                Rremark: '',


                //按钮-备注
                dialogFormVisible1: false,
                form2: {remark: ''},
                //按钮-补偿
                userId: '',
                dialogFormVisible2: false,
                buchangCoin: '',
                buchangMoney: '',
                accounter: '',//客服备注
                type: Number,
                orderNo: '',
                refundNo: '',

                checkArr: [],//多选
                disabledWR: '',//批量退款按钮变灰
                currentPage: 1,
                arr: [],
                value1: '',//退款类型
                val1: '',
                options1: [
                    {
                        value: '',
                        label: '--请选择--'
                    }, {
                        value: '0',
                        label: ' 仅退款'
                    }, {
                        value: '1',
                        label: ' 退货退款'
                    },],
                value2: '',//退货状态
                val2: '',
                options2: [
                    {
                        value: '',
                        label: '--请选择--'
                    }, {
                        value: '1',
                        label: ' 等待客服审核'
                    }, {
                        value: '2',
                        label: ' 客服审核不通过'
                    }, {
                        value: '11',
                        label: ' 客服审核通过'
                    }, {
                        value: '7',
                        label: ' 已提交物流'
                    }, {
                        value: '3',
                        label: ' 客服已确认'
                    }, {
                        value: '6',
                        label: ' 财务审核不通过'
                    }, {
                        value: '5',
                        label: ' 财务审核通过'
                    }, {
                        value: '8',
                        label: ' 完成退款'
                    }, {
                        value: '0',
                        label: ' 退款关闭'
                    }, {
                        value: '4',
                        label: ' 填写物流超时'
                    }, {
                        value: '9',
                        label: ' 拦截失败'
                    }, {
                        value: '10',
                        label: ' 拦截成功'
                    }
                ],//退货退款
                options2s: [
                    {
                        value: '',
                        label: '--请选择--'
                    },
                    {
                        value: '10',
                        label: ' 拦截成功'
                    }, {
                        value: '9',
                        label: ' 拦截失败'
                    }, {
                        value: '3',
                        label: ' 客服已确认'
                    }, {
                        value: '1',
                        label: ' 等待客服审核'
                    }, {
                        value: '2',
                        label: ' 客服审核不通过'
                    }, {
                        value: '11',
                        label: ' 客服审核通过'
                    }, {
                        value: '6',
                        label: ' 财务审核不通过'
                    }, {
                        value: '5',
                        label: ' 财务审核通过'
                    }, {
                        value: '8',
                        label: ' 完成退款'
                    }, {
                        value: '0',
                        label: ' 退款关闭'
                    }
                ],//仅退款
                orderNum: '',//订单号
                refoundNum: '',//退款单号
                returnCourierNum: '',//退货快递单号
                isShow: '',//退货退款
                isShows: '',//仅退款
                tableData: [],
                dialogFormVisible: false,//查看原订单详情
                formLabelWidth: '120px',
                form: {},

            }
        },
        methods: {
            //查看日志
            checkLog(row, index) {
                alert('此功能暂时无!')
            },
            //审核
            audit(row, index) {
                this.serverRemark = '';//清空
                console.log(row, index);
                this.auditRow = row;
                this.dialogFormVisible7 = true;
                this.$http.post(this.url + '/orderRefund/check_view', {
                    refundId: row.refundId,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    this.refoundNumber = res.data.data.applyNum;//退款数量
                    this.ARNumber = res.data.data.refundNo;//退款单号
                    this.ARCoin = res.data.data.refundAmounts;//金币
                    this.ARMoney = res.data.data.retireCashAdvances;//金额
                    this.refoundReason = res.data.data.reason;//退款理由
                    this.userRemark = res.data.data.userRemark;//用户备注
                    this.picItems = res.data.data.imgUrls;//用户拍照
                    this.auditData = res.data.data.refundProducts;//数组table
                });
            },
            sure6() {
                this.dialogFormVisible7 = false;
            },
            //审核不通过按钮
            auditNoPass() {
                if (this.serverRemark == '' || this.serverRemark == undefined) {
                    this.$message({
                        type: 'warning',
                        message: '请填写客服备注!'
                    });
                } else {
                    console.log(this.radio);
                    if (this.radio == '') {
                        this.$message({
                            type: 'warning',
                            message: '请选择责任方!'
                        });
                    } else {
                        this.$http.post(this.url + '/orderRefund/check_order', {
                            refundId: this.auditRow.refundId,
                            checkStatus: 0,
                            responsibleParty: this.radio,
                            serviceReviewRemark: this.serverRemark,
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {
                                this.dialogFormVisible7 = false;
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                                //刷新
                                this.ajax0(this.currentPage);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '操作失败!'
                                });
                            }
                        });
                    }
                }
            },
            //审核通过按钮
            auditPass() {
                if (this.radio == '') {
                    this.$message({
                        type: 'warning',
                        message: '请选择责任方!'
                    });
                } else {
                    this.$confirm('确定审核通过吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.post(this.url + '/orderRefund/check_order', {
                            refundId: this.auditRow.refundId,
                            checkStatus: 1,
                            responsibleParty: this.radio,
                            serviceReviewRemark: this.serverRemark,
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {
                                this.dialogFormVisible7 = false;
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                                //刷新
                                this.ajax0(this.currentPage);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '操作失败!'
                                });
                            }
                        });
                    }).catch(() => {
//                        this.$message({
//                            type: 'info',
//                            message: '已取消'
//                        });
                    });
                }
            },
            //填写物流
            fillLogistics(row, index) {
                this.logisticsRow = row;
                this.form4.logisticsNumber = '';//清空
                this.form4.logisticsCompany = '';//清空
                this.dialogFormVisible6 = true;
            },
            //填写物流sure
            sure5(form4) {
                this.$refs[form4].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url + '/orderRefund/add_logistics', {
                            refundId: this.logisticsRow.refundId,
                            resendCode: this.form4.logisticsNumber,
                            resendCompany: this.form4.logisticsCompany,
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {
                                this.dialogFormVisible6 = false;
                                this.$message({
                                    type: 'success',
                                    message: '保存成功!'
                                });
                                //刷新
                                this.ajax0(this.currentPage);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '保存失败!'
                                });
                            }
                        });


                    } else {
                        return false;
                    }
                });
            },
            //关闭退款
            closeRefound(row, index) {
                this.form3.remark == ''//清空
                console.log(row, index);
                this.CRow = row;
                this.dialogFormVisible5 = true;
            },
            //关闭退款sure
            sure4() {
                if (this.form3.remark == '' || this.form3.remark == undefined) {
                    this.$message({
                        type: 'warning',
                        message: '请填写备注!'
                    });
                } else {
                    this.$http.post(this.url + '/orderRefund/close_refund', {
                        refundId: this.CRow.refundId,
                        orderNo: this.CRow.orderNo,
                        serviceRemark: this.form3.remark,
                        refundNo:this.CRow.refundNo
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.dialogFormVisible5 = false;
                            this.$message({
                                type: 'success',
                                message: '关闭退款成功!'
                            });
                            //刷新
                            this.ajax0(this.currentPage);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '关闭退款失败!'
                            });
                        }
                    });
                }

            },
            //退款
            refound(row, index) {
                console.log(row, index);
                this.row = row;
                this.dialogFormVisible4 = true;
                this.Rremark = '';//清空
                this.RMoney = '';
                this.RCoin = '';
                this.Rshuifei = '';
                this.Ryunfei = '';
                this.Rbuyunfei = ''
                this.$http.post(this.url + '/orderRefund/view_refund', {refundId: row.refundId}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    this.Rremark = res.data.data.serviceRemark//备注(客服)
                    this.RMoney = res.data.data.refundCashAdvances//退款金额
                    this.RCoin = res.data.data.refundAmounts//退款金币
                    this.Rshuifei = res.data.data.ratePrices//税费
                    this.Ryunfei = res.data.data.orderCarriage//运费
                    if (res.data.data.carriageStatus == 0) {
                        this.buyunfeiS = '未退';
                    } else {
                        this.buyunfeiS = '已退';
                    }
                });
            },
            //退款sure
            sure3() {
                if (this.yunfei0 == false) {
                    this.Ryunfei = '0.00';
                }
                if (this.shuifei0 == false) {
                    this.Rshuifei = '0.00';
                }
                if (this.Rbuyunfei == '' || this.Rbuyunfei == undefined) {
                    this.Rbuyunfei = '0.00';
                }
                this.$http.post(this.url + '/orderRefund/update_insert_order', {
                    refundId: this.row.refundId,
                    type: this.row.type,//0仅退款，1退款退货
                    RefundCashAdvance: this.RMoney,//退款总额//
                    refundAmount: this.RCoin,//退金币数量//
                    orderCarriage: this.Ryunfei,//运费//
                    ratePrice: this.Rshuifei,//税费//
                    resendCode: this.row.resendCode,//物流编号
                    resendCompany: this.row.resendCompany,//物流公司
                    fillFreight: this.Rbuyunfei,//补运费
                    serviceReviewRemark: this.Rremark,//备注
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.status == 200) {
                        this.dialogFormVisible4 = false;
                        this.$message({
                            type: 'success',
                            message: '退款成功!'
                        });
                        //刷新
                        this.ajax0(this.currentPage);
                    } else {
                        this.$message({
                            type: 'error',
                            message: '退款失败!'
                        });
                    }
                });
            },
            //运费
            yunfei() {
                if (this.yunfei0 == true) {
                    this.disabled1 = false;
                } else {
                    this.disabled1 = true;
                }
            },
            //税费
            shuifei() {
                if (this.shuifei0 == true) {
                    this.disabled2 = false;
                } else {
                    this.disabled2 = true;
                }
            },
            //强制退款
            mustRefound(row, index) {
                console.log(row, index);
                this.Mrow = row;
                this.dialogFormVisible3 = true;
                this.$http.post(this.url + '/orderRefund/view_refund', {refundId: row.refundId}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.data == null) {

                    } else {

                        if (res.data.data.carriageStatus == 0) {
                            this.MbuyunfeiS = '未退';
                        } else {
                            this.MbuyunfeiS = '已退';
                        }
                        this.MRremark = res.data.data.serviceRemark//备注(客服)
                        this.MRMoney = res.data.data.refundCashAdvances//退款金额
                        this.MRCoin = res.data.data.refundAmounts//退款金币
                        this.MRshuifei = res.data.data.ratePrices//税费
                        this.MRyunfei = res.data.data.orderCarriage//运费
                    }
                });
            },
            //强制退款sure
            sure2() {
                if (this.Myunfei0 == false) {
                    this.MRyunfei = '0.00';
                }
                if (this.Mshuifei0 == false) {
                    this.MRshuifei = '0.00';
                }
                if (this.MRbuyunfei == '' || this.MRbuyunfei == undefined) {
                    this.MRbuyunfei = '0.00';
                }
                this.$http.post(this.url + '/orderRefund/update_insert_order', {
                    refundId: this.Mrow.refundId,//退款单Id
//                    refundNo: this.Mrow.refundNo,//退款单号
//                    orderNo: this.Mrow.orderNo,//订单号
//                    refundDetails: this.Mrow.refundDetails,//退款商品列表
//                    serviceRemark: this.MRremark,//客服备注未通过原因
                    type: this.Mrow.type,//0仅退款，1退款退货
                    RefundCashAdvance: this.MRMoney,//退款总额//
                    refundAmount: this.MRCoin,//退金币数量//
                    orderCarriage: this.MRyunfei,//运费//
                    ratePrice: this.MRshuifei,//税费//
//                    resendCode: this.Mrow.resendCode,//物流编号
//                    resendCompany: this.Mrow.resendCompany,//物流公司
                    fillFreight: this.MRbuyunfei,//补运费
//                    refundStatus: this.Mrow.refundStatus,//是中文-需改成数字
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.status == 200) {
                        this.dialogFormVisible3 = false;
                        this.$message({
                            type: 'success',
                            message: '退款成功!'
                        });
                        //刷新
                        this.ajax0(this.currentPage);
                    } else {
                        this.$message({
                            type: 'error',
                            message: '退款失败!'
                        });
                    }
                });
            },
            //运费
            Myunfei() {
                if (this.Myunfei0 == true) {
                    this.Mdisabled1 = false;
                } else {
                    this.Mdisabled1 = true;
                }
            },
            //税费
            Mshuifei() {
                if (this.Mshuifei0 == true) {
                    this.Mdisabled2 = false;
                } else {
                    this.Mdisabled2 = true;
                }
            },
            //备注弹框
            remark(row, index) {
                this.form2.remark = '';//清空
                console.log(row, index);
                this.refundId = row.refundId
                this.dialogFormVisible1 = true;
                this.$http.post(this.url + '/orderRefund/check_view', {refundId: this.refundId}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    this.form2.remark = row.serviceRemark;
                });
            },
            //备注sure
            sure() {
                if (this.form2.remark == '' || this.form2.remark == undefined) {
                    this.$message({
                        type: 'warning',
                        message: '请填写备注!'
                    })
                } else {
                    this.$http.post(this.url + '/orderRefund/add_remark', {
                        refundId: this.refundId,
                        serviceRemark: this.form2.remark
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.dialogFormVisible1 = false;
                            this.$message({
                                type: 'success',
                                message: '备注成功!'
                            });
                            //刷新
                            this.ajax0(this.currentPage);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '备注失败!'
                            });
                        }
                    });
                }

            },
            //补偿--未测
            makeUp(row, index) {
                console.log(row.userId, index);
                this.Rradio = '';
                this.userId = row.userId;
                this.accounter = '';
                this.buchangCoin = '0.00';
                this.buchangMoney = '0.00';
                this.type = row.type;
                this.orderNo = row.orderNo;
                this.refundNo = row.refundNo;
                this.dialogFormVisible2 = true;
            },
            //补偿sure
            sure1() {
                if (this.accounter == '') {
                    this.$message({
                        type: 'warning',
                        message: '请填写客服备注!'
                    });
                } else {
                    if (this.Rradio == '') {
                        this.$message({
                            type: 'warning',
                            message: '请选择责任方!'
                        });
                    } else {
                        this.$http.post(this.url + '/orderRefund/check_recoup', {
                            userId: this.userId,
                            orderNo: this.orderNo,
                            refundNo: this.refundNo,
                            serviceRemark: this.accounter,
                            type: this.type,
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
                                this.dialogFormVisible2 = false;
                            } else if (res.data.status == 202) {
                                alert(res.data.msg);
                            }
                        });
                    }
                }
            },
            //查询按钮
            inquery() {
                this.tableData = [];//清空
                this.currentPage = 1;
                this.ajax(this.currentPage, this.orderNum, this.refoundNum, this.returnCourierNum, this.value1, this.value2, this.orderStatusVal);
            },
            //查看原订单详情
            originOrderDetail(row, index) {
                console.log(row, index);
                this.$http.post(this.url + '/manage/query_order_details', {orderNo: row.orderNo}, {emulateJSON: true}).then(function (res) {
                    this.dialogFormVisible = true;
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
                    let orderStatusArr = ['待付款', '交易关闭', '待发货', '待收货', '交易完成', '已退款'];
                    for (let j = 0; j < orderStatusArr.length; j++) {
                        if (res.data.data.orderStatus == j) {
                            this.form.orderStatus = orderStatusArr[j];
                        }
                    }
                    //订单总额
                    if (res.data.data.orderCarriages == null) {
                        this.form.money = res.data.data.orderProductPriceTotals;
                    } else {
                        this.form.money = res.data.data.orderProductPriceTotals + '(含运费:' + res.data.data.orderCarriages + ' 优惠 : ' + res.data.data.discountAmounts + ' 税费 : ' + res.data.data.ratePrices + ')';
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
            //默认变灰
            checkSelectable(row, index) {
//                ((row.type == 0 && row.refundStatus == '拦截成功') || (row.type == 1 && row.refundStatus == '已提交物流' && row.whetherBack == 'Y'))
                if (row.type == 0 && row.refundStatus == '拦截成功') {
                    return true;
                } else {
                    return false;
                }
            },
            //批量退款按钮
            wholeRefound() {
                this.$confirm('确定批量退款吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/orderRefund/batch_refund', {refundIds: this.checkArr.join(',')}, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '批量退款成功!'
                            });
                            //刷新
                            this.ajax0(this.currentPage);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '批量退款失败!'
                            });
                        }
                    });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消'
//                    });
                });
            },
            orderStatus(val) {
                console.log(val);
                this.orderStatusVal = val;
            },
            //退款类型-查询时
            refundType(val) {
                console.log(val);
                this.val1 = val;
                if (this.val1 != '' && this.val1 == 0) {
                    this.isShows = true;
                    this.isShow = false;
                } else if (this.val1 != '' && this.val1 == 1) {
                    this.isShow = true;
                    this.isShows = false;
                } else {
                    this.isShow = false;
                    this.isShows = false;
                }
                this.value2 = '';//清空
            },
            //退货状态
            returnGoodsStatus(val) {
                this.val2 = val;
            },
            //多选
            handleSelectionChange(val) {
                console.log(val);
                this.checkArr = [];
                if (val.length == 0) {
                    this.disabledWR = true;
                } else {
                    this.disabledWR = false;
                }
                for (let i = 0; i < val.length; i++) {
                    this.checkArr.push(val[i].refundId);
                }
            },
            //分页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.ajax(this.currentPage, this.orderNum, this.refoundNum, this.returnCourierNum, this.value1, this.value2, this.orderStatusVal);

            },
            //ajax
            ajax(a1, a3, a4, a5, a6, a7, a8) {
                this.loading = true;
                this.$http.post(this.url + '/orderRefund/query_all_refund', {
                        page: a1,
                        num: 10,
                        orderNo: a3,
                        refundNo: a4,
                        resendCode: a5,
                        type: a6,
                        refundStatus: a7,
                        orderStatus: a8
                    }, {emulateJOSN: true}
                ).then(function (res) {
                    console.log(res);
                    this.loading = false;
                    for (let i = 0; i < res.data.data.pageList.length; i++) {
                        console.log(res.data.data.pageList[i].refundStatus);
                        for (let x = 0; x < res.data.data.pageList[i].refundProducts.length; x++) {
                            res.data.data.pageList[i].refundProducts[x].productNum = res.data.data.pageList[i].refundProducts[x].applyRefundNum;
                        }
                        //判断-悬浮框-实退金额
                        for (let x = 0; x < res.data.data.pageList[i].refundAmountlist.length; x++) {
                            if (res.data.data.pageList[i].refundAmountlist.length == 0) {

                            } else {
                                //判断状态
                                console.log(res.data.data.pageList[i].refundAmountlist[x].isFinished)
                                if (res.data.data.pageList[i].refundAmountlist[x].isFinished == 0) {
                                    res.data.data.pageList[i].refundAmountlist[x].isFinished = '未退款';
                                } else {
                                    res.data.data.pageList[i].refundAmountlist[x].isFinished = '已退款'
                                }
                                //判断类型
                                if (res.data.data.pageList[i].refundAmountlist[x].refundAmountType == 'NORMAL') {
                                    res.data.data.pageList[i].refundAmountlist[x].refundAmountType = '退款';
                                } else {
                                    res.data.data.pageList[i].refundAmountlist[x].refundAmountType = '补偿'
                                }
                            }
                        }
                        //判断退货状态
                        let statusArr = ['退款关闭', '等待客服审核', '客服审核不通过', '客服已确认', '填写物流超时', '财务审核通过', '财务审核不通过', '已提交物流', '完成退款', '拦截失败', '拦截成功', '客服审核通过'];
                        for (let k = 0; k < statusArr.length; k++) {
                            if (res.data.data.pageList[i].refundStatus == k) {
                                res.data.data.pageList[i].refundStatus = statusArr[k];
                            }
                        }
                    }
                    this.loading = false;
                    this.tableData = res.data.data.pageList;
                    this.arr.length = res.data.data.pageTotal;
                });
            },
            //ajax0-刷新
            ajax0(a1) {
                this.loading = true;
                this.$http.post(this.url + '/orderRefund/query_all_refund', {
                        page: a1,
                        num: 10,
                    }, {emulateJOSN: true}
                ).then(function (res) {
                    console.log(res);
                    this.loading = false;
                    for (let i = 0; i < res.data.data.pageList.length; i++) {
                        console.log(res.data.data.pageList[i].refundStatus);
                        //数量判断productNum
                        for (let x = 0; x < res.data.data.pageList[i].refundProducts.length; x++) {
                            if (res.data.data.pageList[i].whetherSplit == 0) {
                                res.data.data.pageList[i].refundProducts[x].productNum = res.data.data.pageList[i].refundProducts[x].productNum;
                            } else {
                                res.data.data.pageList[i].refundProducts[x].productNum = res.data.data.pageList[i].applyNum;
                            }
                        }
                        //判断-悬浮框-实退金额
                        for (let x = 0; x < res.data.data.pageList[i].refundAmountlist.length; x++) {
                            if (res.data.data.pageList[i].refundAmountlist.length == 0) {

                            } else {
                                //判断状态
                                console.log(res.data.data.pageList[i].refundAmountlist[x].isFinished)
                                if (res.data.data.pageList[i].refundAmountlist[x].isFinished == 0) {
                                    res.data.data.pageList[i].refundAmountlist[x].isFinished = '未退款';
                                } else {
                                    res.data.data.pageList[i].refundAmountlist[x].isFinished = '已退款'
                                }
                                //判断类型
                                if (res.data.data.pageList[i].refundAmountlist[x].refundAmountType == 'NORMAL') {
                                    res.data.data.pageList[i].refundAmountlist[x].refundAmountType = '退款';
                                } else {
                                    res.data.data.pageList[i].refundAmountlist[x].refundAmountType = '补偿'
                                }
                            }
                        }
                        //判断退货状态
                        let statusArr = ['退款关闭', '等待客服审核', '客服审核不通过', '客服已确认', '填写物流超时', '财务审核通过', '财务审核不通过', '已提交物流', '完成退款', '拦截失败', '拦截成功', '客服审核通过'];
                        for (let k = 0; k < statusArr.length; k++) {
                            if (res.data.data.pageList[i].refundStatus == k) {
                                res.data.data.pageList[i].refundStatus = statusArr[k];
                            }
                        }
                    }
                    this.tableData = res.data.data.pageList;
                    this.arr.length = res.data.data.pageTotal;
                });
            },
        },
        created() {
            this.ajax(1, '', '', '', '', '', '');
        }
    }
</script>


<style scoped>
    .show {
        display: inline-block;
    }

    .hide {
        display: none;
    }

    .inquiry {
        margin-left: 10px;
    }

    .inputs {
        margin-right: 5px;
    }

    * {
        padding: 0;
        margin: 0;
    }

    .block {
        margin-top: 5px;
        text-align: right;
        display: flex;
        justify-content: space-between;
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
        justify-content: space-between;
    }

    .header li {
        text-align: center;
    }

    ul > li {
        list-style: none;
    }

    img {
        width: 50px;
        height: 50px;
    }

    .pics {
        margin-top: 12px;
    }

    .xiaoshou {
        cursor: pointer;
    }

    .main {
        /*display: flex;*/
        max-height: 600px;
        overflow: scroll;
        /*对父级进行添加*/
        flex-direction: column;
        background: lightblue;

    }

    .main li {
        display: flex;
        /*justify-content: space-between;*/
        padding: 10px 10px 10px 0;
        align-items: center;
    }

    .main li div {
        padding-right: 10px;
    }

    .bt {
        border-top: 2px dashed green;
        padding-top: 10px;
    }

    .bb {
        padding-bottom: 10px;
    }

    .spans0 {
        width: 110px;
        text-align: center;
        color: #48576a;
    }

    .spans1 {
        width: 140px;
    }

    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .btns {
        padding: 10px 15px;
    }

    /*多行出现省略号*/
    .wrap {
        width: 100px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .wholeRefound {
        margin-left: 10px;
    }

    .redP {
        color: red;
    }

    .Mul li {
        margin-bottom: 10px;
    }

    .auditSpans {
        margin-bottom: 10px;
    }

    .auditSpans span {
        margin-right: 20px;
    }

    .bb {
    }

    .borderB {
        border-top: 1px dashed gray;
    }
</style>