<template>
    <!--创建活动-->
    <div class="activity" style="width: 100%" v-loading="loading">
        <div style="width: 100%">
            <!--<div style="width:80%;padding-left: 250px;border: 1px solid gainsboro;background:#EBEEF5;padding-top: 15px;margin-bottom: 10px;">-->
            <div style="width:80%;padding-left: 250px;padding-top: 15px;margin-bottom: 10px;border-bottom: 1px solid gainsboro;">
                <div>
                    <el-steps :active="active" finish-status="success">
                        <el-step title="基本信息"></el-step>
                        <el-step title="优惠门槛及内容"></el-step>
                        <el-step title="选择商品"></el-step>
                    </el-steps>
                </div>
            </div>
            <!--基本信息页面-->
            <div v-if="isShow" style="margin-left: 150px">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="activityName">
                        <el-input v-model="ruleForm.activityName" class="setWidths" placeholder="最多10个字"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间" prop="startTime">
                        <el-date-picker
                                v-model="ruleForm.startTime"
                                type="datetime"
                                @change="startTime"
                                placeholder="请选择">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间" prop="endTime">
                        <el-date-picker
                                v-model="ruleForm.endTime"
                                @change="endTime"
                                type="datetime"
                                placeholder="请选择">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动描述" prop="activityDsc">
                        <el-input v-model="ruleForm.activityDsc" type="textarea" class="setWidths"
                                  placeholder="请输入活动描述"></el-input>
                    </el-form-item>
                    <el-form-item label="活动对象" prop="activityObject">
                        <el-radio-group v-model="ruleForm.activityObject">
                            <el-radio label="ALL">所有人</el-radio>
                            <el-radio label="MEMBER">会员</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item>
                        <el-button style="margin-top: 12px;" @click="nextStepF('ruleForm')" type="primary">下一步
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else class="discountArea">
                <!--优惠门槛及内容页面-->
                <div style="border: 1px solid gainsboro;padding-left: 70px">
                    <el-form label-position="left" inline class="discountPage">
                        <el-form-item label="活动ID :" prop="activityId" class="activityId">
                            <p>{{activityID}}</p>
                        </el-form-item>
                        <el-form-item label="活动名称 :" prop="activityName">
                            <p>{{activityName}}</p>
                        </el-form-item>
                        <el-form-item label="活动开始时间 :" prop="activityStart">
                            <p>{{activityStart | time}}</p>
                        </el-form-item>
                        <el-form-item label="活动结束时间 :" prop="activityEnd">
                            <p>{{activityEnd | time}}</p>
                        </el-form-item>
                        <el-form-item label="创建时间 :" prop="createdTime">
                            <p>{{createdTime | time}}</p>
                        </el-form-item>
                        <el-form-item label="活动对象 :" prop="activityObject">
                            <p>{{activityObject}}</p>
                        </el-form-item>
                    </el-form>
                </div>
                <!--优惠条件-->
                <div v-show="showDC">
                    <el-form v-for="data,index in datas" :class="index>0?'bt':'bb'"
                             style="padding-left: 70px;padding-top: 15px;">
                        <el-form-item label="优惠条件" prop="discountCondition">
                            <el-radio-group v-model="data.discountCondition" :disabled="data.disRadio">
                                <el-radio label="FULLNUM">满件(打折)</el-radio>
                                <el-radio label="FULLRMB">满元(减钱)</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="优惠门槛" prop="discountThreshold0">
                            <div style="display: flex">
                                满
                                <el-input style="width: 100px" v-model="data.discountThreshold"
                                          :disabled="data.DTDisabled"></el-input>
                                (单位:件/元)
                            </div>
                        </el-form-item>
                        <el-form-item label="优惠内容" prop="discountContent">
                            <div style="margin-left: 66px;">
                                <div style="display: flex;margin-bottom: 10px">
                                    <el-select :disabled="data.selectDisabled" @change="selectChange(index)"
                                               v-model="data.select0" placeholder="请选择" style="width: 180px">
                                        <!--<el-option-->
                                                <!--v-for="item in data.options0"-->
                                                <!--:key="item.value"-->
                                                <!--:label="item.label"-->
                                                <!--:value="item.value">-->
                                        <!--</el-option>-->
                                        <el-option v-show="data.discountCondition=='FULLRMB'?false:true" label="指定金额 (单位 : 元)" value="1">指定金额 (单位 : 元)</el-option>
                                        <el-option label="打几折 (单位 : %)"  value="2">打几折 (单位 : %)</el-option>
                                        <el-option label="减免金额 (单位 : 元)"  value="3">减免金额 (单位 : 元)</el-option>
                                    </el-select>
                                    <el-input v-show="data.show0" :disabled="data.show0Disabled" v-model="data.inputs"
                                              style="width: 100px;margin-left: 10px"></el-input>
                                </div>
                                <div>
                                    <el-checkbox :disabled="data.sendCoinDisabled" label="sendCoin"
                                                 v-model="data.sendCoin" @change="ddd(index)">
                                        赠 金 币&nbsp;&nbsp;
                                        <el-input style="width: 100px" v-model="data.dcSendCoin"
                                                  :disabled="data.a3"></el-input>
                                    </el-checkbox>
                                </div>
                                <!--<div>-->
                                <!--<el-checkbox :disabled="data.sendCommodityDisabled" v-model="data.dcSendcommodity" label="sendCommodity"-->
                                <!--@change="sendCommodity(index)">-->
                                <!--赠商品-->
                                <!--</el-checkbox>-->
                                <!--&lt;!&ndash;显示区&ndash;&gt;-->
                                <!--<div style="display: flex">-->
                                <!--<div class="showArea" v-for="showArea,indexs in data.showAreas">-->
                                <!--<img :src="showArea.url" alt="picture"-->
                                <!--style="width:60px;height: 60px;vertical-align: bottom">-->
                                <!--<p style="line-height: 20px">{{showArea.name}}</p>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--<div>-->
                                    <!--<el-checkbox label="sendMember" :disabled="data.sendMemberDisabled"-->
                                                 <!--v-model="data.dcSendMember" @change="eee(index)">-->
                                        <!--送会员-->
                                        <!--<el-radio-group v-model="data.radios" :disabled="data.memberRadio">-->
                                            <!--<el-radio label="ULTIMATE">旗舰店</el-radio>-->
                                            <!--<el-radio label="NORMAL">创业店</el-radio>-->
                                            <!--<el-radio label="FANS">粉丝店</el-radio>-->
                                        <!--</el-radio-group>-->
                                    <!--</el-checkbox>-->
                                <!--</div>-->
                            </div>
                            <!--&lt;!&ndash;赠商品弹框&ndash;&gt;-->
                            <!--<el-dialog title="选择赠品" top="5vh" :visible.sync="dialogTableVisible"-->
                            <!--:close-on-click-modal="false"-->
                            <!--:before-close="beforeClose">-->
                            <!--<p class="redP">最多选8个商品</p>-->
                            <!--<el-table-->
                            <!--max-height="400"-->
                            <!--:data="tableData"-->
                            <!--border-->
                            <!--style="width:100%"-->
                            <!--@selection-change="handleSelectionChange"-->
                            <!--&gt;-->
                            <!--<el-table-column-->
                            <!--type="selection"-->
                            <!--width="55">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                            <!--prop="commodityUrl"-->
                            <!--label="商品图片"-->
                            <!--&gt;-->
                            <!--<template scope="scope">-->
                            <!--<img :src="scope.row.commodityUrl" width="40" height="40"/>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                            <!--prop="commodityDisc"-->
                            <!--label="商品描述"-->
                            <!--width="120">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                            <!--prop="price"-->
                            <!--label="价格"-->
                            <!--width="120">-->
                            <!--</el-table-column>-->
                            <!--&lt;!&ndash;<el-table-column&ndash;&gt;-->
                            <!--&lt;!&ndash;prop="store"&ndash;&gt;-->
                            <!--&lt;!&ndash;label="库存"&ndash;&gt;-->
                            <!--&lt;!&ndash;&gt;&ndash;&gt;-->
                            <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
                            <!--<el-table-column-->
                            <!--prop="sendCommodityName"-->
                            <!--label="赠品名称"-->
                            <!--&gt;-->
                            <!--</el-table-column>-->
                            <!--</el-table>-->
                            <!--&lt;!&ndash;下拉框&ndash;&gt;-->
                            <!--<div class="xialakuang"-->
                            <!--style="display: flex;justify-content: space-between;margin-top: 5px">-->
                            <!--<p>每个用户可自选商品数-->
                            <!--<el-select v-model="value0" placeholder="" style="width: 60px"-->
                            <!--@change="xialakuangValue">-->

                            <!--<el-option-->
                            <!--v-for="item in options"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                            <!--个 <span class="redP">(必选 : 不能超过已选商品个数)</span>-->
                            <!--</p>-->
                            <!--<el-button type="primary" @click="zspSure(index)">保存</el-button>-->
                            <!--</div>-->
                            <!--</el-dialog>-->
                        </el-form-item>
                    </el-form>
                    <div style="padding-left: 70px">
                        <el-button @click="addDiscount()">添加优惠</el-button>
                        <el-button @click="deleteDiscount()">清空</el-button>
                        <el-button @click="discountSure()">保存并下一步</el-button>
                    </div>
                </div>
                <!--查询商品-->
                <div v-show="showC" style="margin-top: 10px">
                    <el-tabs type="border-card" @tab-click="tabs">
                        <el-tab-pane label="选择商品">
                            <el-row :gutter="12">
                                <el-col :span="10">
                                    <el-button @click="wholeBind">批量绑定</el-button>
                                </el-col>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple el-row2">
                                        <span class="spans">spucode</span>
                                        <el-input type="primary" v-model="spucode1"></el-input>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple el-row2">
                                        <span class="spans0">供应商</span>
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
                                <el-col :span="2">
                                    <div class="grid-content bg-purple">
                                        <el-button type="primary" class="btns" @click="inquiry1">查询</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-table
                                    class="table"
                                    :data="tableData1"
                                    border
                                    @selection-change="handleSelectionChange1"
                                    style="width: 100%;font-size: 12px">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="spucode"
                                        label="spucode"
                                        width="100"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="spuname"
                                        label="商品名称"
                                        width="150"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="spuTitle"
                                        label="商品标题"
                                        width="150"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="allStockNumber"
                                        label="商品库存"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="maxPurchaseActivity"
                                        label="最大购买量"
                                        width="120"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="minPurchaseActivity"
                                        label="最小购买量"
                                        width="120"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="allStockNumberActivity"
                                        label="活动库存"
                                        width="100"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="activityName"
                                        label="已绑定活动"
                                        width="200"
                                >
                                    <template slot-scope="scope">
                                        <div style="display: flex;flex-wrap: wrap">
                                            <div v-for="item in scope.row.activityName">
                                                <el-tag type="success" style="margin: 5px;">
                                                    {{item[0]}}
                                                </el-tag>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!--分页1-->
                            <div class="block" style="text-align: right">
                                <el-pagination
                                        @current-change="handleCurrentChange1"
                                        :current-page="currentPage1"
                                        :page-sizes="[10]"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="arr1.length">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="已选商品">
                            <el-row :gutter="12">
                                <el-col :span="10">
                                    <el-button @click="wholeRemove">批量移除</el-button>
                                </el-col>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple el-row2">
                                        <span class="spans">spucode</span>
                                        <el-input type="primary" v-model="spucode2"></el-input>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple el-row2">
                                        <span class="spans0">供应商</span>
                                        <el-select v-model="value2" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options2"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </el-col>
                                <el-col :span="2">
                                    <div class="grid-content bg-purple">
                                        <el-button type="primary" class="btns" @click="inquiry2">查询</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-table
                                    class="table"
                                    :data="tableData2"
                                    border
                                    @selection-change="handleSelectionChange2"
                                    style="width: 100%;font-size: 12px">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="spucode"
                                        label="spucode"
                                        width="100"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="spuname"
                                        label="商品名称"
                                        width="150"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="spuTitle"
                                        label="商品标题"
                                        width="150"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="allStockNumber"
                                        label="商品库存"
                                        width="100"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="maxPurchaseActivity"
                                        label="最大购买量"
                                        width="120"
                                >
                                    <!--<template slot-scope="scope">-->
                                <!--<span @click="maxPurchase(scope.row,scope.$index)"-->
                                      <!--class="xiaoshou">{{scope.row.maxPurchaseActivity}}</span>-->
                                        <!--<input class="inputs" v-show="scope.row.maxShow" v-focus-->
                                               <!--v-model="scope.row.maxInput"-->
                                               <!--@blur="maxBlur(scope.row,scope.$index)">-->
                                    <!--</template>-->
                                </el-table-column>
                                <el-table-column
                                        prop="minPurchaseActivity"
                                        label="最小购买量"
                                        width="120"
                                >
                                    <!--<template slot-scope="scope">-->
                                <!--<span @click="minPurchase(scope.row,scope.$index)"-->
                                      <!--class="xiaoshou">{{scope.row.minPurchaseActivity}}</span>-->
                                        <!--<input class="inputs" v-show="scope.row.minShow" v-focus-->
                                               <!--v-model="scope.row.minInput"-->
                                               <!--@blur="minBlur(scope.row,scope.$index)">-->
                                    <!--</template>-->
                                </el-table-column>
                                <el-table-column
                                        prop="allStockNumberActivity"
                                        label="活动库存"
                                        width="100"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="activityName"
                                        label="已绑定活动"
                                        width="200"
                                >
                                    <template slot-scope="scope">
                                        <div style="display: flex;flex-wrap: wrap">
                                            <div v-for="item in scope.row.activityName">
                                                <el-tag type="success" style="margin: 5px;">
                                                    {{item[0]}}
                                                </el-tag>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="operate"
                                        label="操作"
                                        fixed="right"
                                >
                                    <template slot-scope="scope">
                                        <el-button type="text" @click="adit(scope.row,scope.$index)">编辑</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!--编辑弹框-->
                            <el-dialog title="编辑sku" :visible.sync="dialogFormVisible" top="5vh">
                                <el-table
                                        class="table"
                                        :data="aditTableData"
                                        border
                                        style="width: 100%;font-size: 12px"
                                        max-height="400"
                                >
                                    <el-table-column
                                            type="index"
                                            label="序号"
                                            width="80"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="skucode"
                                            label="skucode"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="skuname"
                                            label="skuname"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="activityPrice"
                                            label="活动价格"
                                    >
                                        <!--<template slot-scope="scope">-->
                                <!--<span @click="activityPrice(scope.row,scope.$index)"-->
                                      <!--class="xiaoshou">{{scope.row.activityPrice * 0.01}}</span>-->
                                            <!--<input class="inputs" v-show="scope.row.activityPriceShow" v-focus-->
                                                   <!--v-model="scope.row.activityPriceInput"-->
                                                   <!--@blur="activityPriceBlur(scope.row,scope.$index)">-->
                                        <!--</template>-->
                                    </el-table-column>
                                    <el-table-column
                                            prop="activityStock"
                                            label="活动库存"
                                    >
                                        <!--<template slot-scope="scope">-->
                                <!--<span @click="activityStock(scope.row,scope.$index)"-->
                                      <!--class="xiaoshou">{{scope.row.activityStock}}</span>-->
                                            <!--<input class="inputs" v-show="scope.row.activityStockShow" v-focus-->
                                                   <!--v-model="scope.row.activityStockInput"-->
                                                   <!--@blur="activityStockBlur(scope.row,scope.$index)">-->
                                        <!--</template>-->
                                    </el-table-column>
                                </el-table>
                            </el-dialog>
                            <!--分页2-->
                            <div style="display: flex;justify-content: flex-end;margin-top: 5px">
                                <el-button @click="returnList" type="primary" style="margin-right: 200px">保存并发布</el-button>
                                <el-pagination
                                        @current-change="handleCurrentChange2"
                                        :current-page="currentPage2"
                                        :page-sizes="[10]"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="arr2.length">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading:false,
                //table-start
                aditTableData: [],
                dialogFormVisible: false,//编辑弹框
                selectIndex: Number,
                value1: '',//供应商1
                value2: '',//供应商2
                options1: [],//供应商1
                options2: [],//供应商2
                tableData1: [],//全部商品
                tableData2: [],//已绑定商品
                checkedArr1: [],//多选1
                checkedArr2: [],//多选2
                spucode1: '',//查询1
                spucode2: '',//查询2
                //分页
                currentPage1: 1,
                currentPage2: 1,
                arr1: [],
                arr2: [],
                //table-end

                inputs1: '',
                inputs2: '',
                inputs3: '',
                urls: 'http://116.62.165.6/Image/upload_image/productImage',//上传图片路径
                active: 0,
                radio: '',//单选
                isShow: true,
                ruleForm: {
                    activityName: '',
                    activityDsc: '',
                    startTime: '',
                    endTime: '',
                    activityObject: '',
                },
                rules: {
                    activityName: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 2, max: 16, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                    ],
                    activityDsc: [
                        {required: true, message: '请输入活动描述', trigger: 'blur'},
                    ],
                    startTime: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'blur'}
                    ],
                    endTime: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'blur'}
                    ],
                    activityObject: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                },
                dialogTableVisible: false,
                showDC: '',//优惠条件显示隐藏
                showC: '',//商品查询显示隐藏
                activityId: '',//活动ID-接收
                activityID: '',//活动ID-html
                activityName: '',//活动名称
                activityStart: '',//开始时间
                activityEnd: '',//结束时间
                createdTime: '',//创建时间
                activityObject: '',//活动对象
                //优惠部分
                tableData: [],
                value: '',
                value0: '',//赠商品下拉框
                options: [
                    {value: '0', label: '0'},
                    {value: '1', label: '1'},
                    {value: '2', label: '2'},
                    {value: '3', label: '3'},
                    {value: '4', label: '4'},
                    {value: '5', label: '5'},
                    {value: '6', label: '6'},
                    {value: '7', label: '7'},
                    {value: '8', label: '8'},

                ],
//                discountCondition: [],//优惠条件
                datas: [
                    {
                        sendCoin:false,
                        select0: '',//下拉
                        discountCondition: '',//优惠条件
                        disRadio:false,//优惠条件变灰
                        options0: [
                            {
                                value: '1',
                                label: '指定金额 (单位 : 元)'
                            }, {
                                value: '2',
                                label: '打几折 (单位 : %)'
                            }, {
                                value: '3',
                                label: '减免金额 (单位 : 元)'
                            },
                        ],
                        show0: false,
                        inputs: '',
                        DTDisabled: false,//满件输入框变灰
                        selectDisabled: false,//优惠内容-下拉框变灰
                        show0Disabled: false,//下拉框后面的输入框
                        sendCoinDisabled: false,//赠金币变灰
                        sendCommodityDisabled: false,//赠商品变灰
                        sendMemberDisabled: false,//送会员变灰
                        discountThreshold: '',
                        memberRadio: true,//送会员
                        dcSendCoin: '',
                        dcSendcommodity: false,
                        dcSendMember: '',
                        value1: '',
                        options: [
                            {value: '0', label: '0'},
                            {value: '1', label: '1'},
                            {value: '2', label: '2'},
                            {value: '3', label: '3'},
                            {value: '4', label: '4'},
                            {value: '5', label: '5'},
                            {value: '6', label: '6'},
                            {value: '7', label: '7'},
                            {value: '8', label: '8'},
                        ],
                        radios: '',//送会员单选
                        showAreas: [],//赠商品-显示区
                        a0: true,
                        a1: true,
                        a2: true,
                        a3: true,
                    }
                ],
                spuIds: [],
                xialakuangvalue: '',//下拉框
                showAreaObj: {},//赠商品-显示区
                showAreasArr: [],
                //1,2,3,4,5...
                numberArr: [],
                first: Number,
                second: Number,
                third: Number,
                forth: Number,
                fifth: Number,
                sixth: Number,
                seventh: Number,
                zspArr: [],//赠商品-选择商品
                selectedSpuId: [],//赠商品-选择商品-new
            }
        },
        //input聚焦
        directives: {
            focus: {
                // 指令的定义
                update: function (el) {
                    el.focus()
                }
            }
        },
        methods: {
            //table
//活动库存
            activityStock(row, index) {
                row.activityStockShow = true;
                row.activityStockInput = row.activityStock;//默认
            },
            activityStockBlur(row, index) {
                if (row.activityStockInput == row.activityStock) {
                    row.activityStockShow = false;
                } else {
                    if (row.activityStockInput > 0 || row.activityStockInput == 0) {
                        console.log(row.productId);
                        this.$http.post(this.url + '/product/setActivityPriceAndStock', {
                            productId: row.productId,
                            activityStock: row.activityStockInput
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {
                                //刷新当前页
                                this.$http.post(this.url + '/product/select_productBySpucode', {spucode: row.spucode}, {emulateJSON: true}).then(function (res) {
                                    console.log(res);
                                    for (let i = 0; i < res.data.data.length; i++) {
                                        res.data.data[i].activityPriceShow = false;
                                        res.data.data[i].activityPriceInput = '';
                                        res.data.data[i].activityStockShow = false;
                                        res.data.data[i].activityStockInput = '';
                                    }
                                    this.aditTableData = res.data.data
                                },function (err) {
                                    this.$message({
                                        type:'error',
                                        message:'服务器连接中断,请联系后台人员!',
                                    });
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '修改失败!'
                                })
                            }
                            row.activityStockShow = false;
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请正确填写活动库存!'
                        })
                    }
                }
            },
            //活动价格
            activityPrice(row, index) {
                console.log(row, index);
                row.activityPriceShow = true;
                row.activityPriceInput = row.activityPrice * 0.01;//默认
            },
            activityPriceBlur(row, index) {
                if (row.activityPriceInput == row.activityPrice) {
                    row.activityPriceShow = false;
                } else {
                    if (row.activityPriceInput > 0) {
                        console.log(row.productId);
                        this.$http.post(this.url + '/product/setActivityPriceAndStock', {
                            productId: row.productId,
                            activityPrice: row.activityPriceInput
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {
                                //刷新当前页
                                this.$http.post(this.url + '/product/select_productBySpucode', {spucode: row.spucode}, {emulateJSON: true}).then(function (res) {
                                    console.log(res);
                                    for (let i = 0; i < res.data.data.length; i++) {
                                        res.data.data[i].activityPriceShow = false;
                                        res.data.data[i].activityPriceInput = '';
                                        res.data.data[i].activityStockShow = false;
                                        res.data.data[i].activityStockInput = '';
                                    }
                                    this.aditTableData = res.data.data
                                },function (err) {
                                    this.$message({
                                        type:'error',
                                        message:'服务器连接中断,请联系后台人员!',
                                    });
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '修改失败!'
                                })
                            }
                            row.activityPriceShow = false;
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请正确填写活动价格!'
                        })
                    }
                }
            },
            //编辑按钮
            adit(row, index) {
                console.log(row, index);
                this.$http.post(this.url + '/product/select_productBySpucode', {spucode: row.spucode}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].activityPriceShow = false;
                        res.data.data[i].activityPriceInput = '';
                        res.data.data[i].activityStockShow = false;
                        res.data.data[i].activityStockInput = '';
                    }
                    this.aditTableData = res.data.data
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
                this.dialogFormVisible = true;
            },
            //点击最大购买量span
            maxPurchase(row, index) {
                console.log(row, index);
                row.maxShow = true;
                row.maxInput = row.maxPurchaseActivity;//默认

            },
            maxBlur(row, index) {
                console.log(row, index);
                if (row.maxInput == row.maxPurchaseActivity) {
                    row.maxShow = false;
                } else {
                    if (row.maxInput > 0) {
                        this.$http.post(this.url + '/spuManage/activity_byNum', {
                            maxPurchaseActivity: row.maxInput,
                            spuId: row.spuId,
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {
                                //刷新当前页
                                this.ajaxSelect(this.currentPage2);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '修改失败!'
                                });
                            }
                            row.maxShow = false;
                        },function (err) {
                            this.$message({
                                type:'error',
                                message:'服务器连接中断,请联系后台人员!',
                            });
                        });
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请正确填写最大购买量!'
                        })
                    }
                }
            },
            //点击最小购买量span
            minPurchase(row, index) {
                console.log(row, index);
                row.minShow = true;
                row.minInput = row.minPurchaseActivity;//默认

            },
            minBlur(row, index) {
                console.log(row, index);
                if (row.minInput == row.minPurchaseActivity) {
                    row.minShow = false;
                } else {
                    if (row.minInput > 0) {
                        this.$http.post(this.url + '/spuManage/activity_byNum', {
                            minPurchaseActivity: row.minInput,
                            spuId: row.spuId,
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {

                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '修改失败!'
                                });
                            }
                            //刷新当前页
                            this.ajaxSelect(this.currentPage2);
                        },function (err) {
                            this.$message({
                                type:'error',
                                message:'服务器连接中断,请联系后台人员!',
                            });
                        });
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请正确填写最小购买量!'
                        });
                    }
                }
            },
            selectChange(index) {
                this.selectIndex = index;
                this.datas[this.selectIndex].inputs = '';//清空
                if (this.datas[this.selectIndex].select0 != '') {
                    this.datas[this.selectIndex].show0 = true;
                } else {
                    this.datas[this.selectIndex].show0 = false;
                }

            },
            //分页1
            handleCurrentChange1(val) {
                this.currentPage1 = val;
                //查询全部商品
                if (this.spucode1 != '' || this.value1 != '') {
                    //查询1
                    this.$http.post(this.url + '/activity/getActivitySpuList', {
                        page: this.currentPage1,
                        num: 10,
                        activityId: this.activityID,
                        code: '',
                        spuCode: this.spucode1,
                        warehouseCode: this.value1,
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if(res.data.data.pageList==null||res.data.data==null){
                            this.tableData1 = [];
                            this.arr1.length = 0;
                        }else{
                            this.tableData1 = res.data.data.pageList;
                            this.arr1.length = res.data.data.pageTotal;
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                } else {
                    this.ajaxAll(this.currentPage1);
                }
            },
            //分页2
            handleCurrentChange2(val) {
                this.currentPage2 = val;
                if (this.spucode2 != '' || this.value2 != '') {
                    //查询1
                    this.$http.post(this.url + '/activity/getActivitySpuList', {
                        page: this.currentPage2,
                        num: 10,
                        code: '',
                        activityId: this.activityID,
                        spuCode: this.spucode2,
                        warehouseCode: this.value2,
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if(res.data.data.pageList==null||res.data.data==null){
                            this.tableData2 = [];
                            this.arr2.length = 0;
                        }else{
                            this.tableData2 = res.data.data.pageList;
                            this.arr2.length = res.data.data.pageTotal;
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                } else {
                    this.ajaxSelect(this.currentPage2);
                }
            },
            //多选1
            handleSelectionChange1(val) {
                console.log(val);
                this.checkedArr1 = [];
                for (let i = 0; i < val.length; i++) {
                    this.checkedArr1.push({spuId:val[i].spuId,spucode:val[i].spucode});
                }
                console.log(this.checkedArr1);
            },
            //多选2
            handleSelectionChange2(val) {
                console.log(val);
                this.checkedArr2 = [];
                for (let i = 0; i < val.length; i++) {
                    this.checkedArr2.push(val[i].spucode);
                }
                console.log(this.checkedArr2);
            },
            //批量绑定
            wholeBind() {
                if (this.checkedArr1.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择商品!',
                        duration: 2000
                    });
                } else {
                    this.loading = true;
                    this.$http.post(this.url + '/activity/relevanceSpu', {
                        activityId: this.activityID,
                        as: JSON.stringify(this.checkedArr1),
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '绑定成功!',
                                duration: 1000
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '绑定失败!',
                                duration: 1000
                            });
                        }
                        //刷新当前页
                        this.ajaxAll(this.currentPage1);
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    })
                }
            },
            //批量移除
            wholeRemove() {
                console.log(this.checkedArr2.length);
                if (this.checkedArr2.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择商品!',
                        duration: 2000
                    });
                } else {
                    this.loading = true;
                    this.$http.post(this.url + '/activity/delActivitySpu', {
                        activityId: this.activityID,
                        spuCode: this.checkedArr2.join(',')
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        this.loading = false;
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '移除成功!',
                                duration: 1000
                            });
//                            刷新当前页
                            this.ajaxSelect(this.currentPage2);
                        } else {
                            this.$message({
                                type: 'error',
                                message:res.data.msg+ ',移除失败!',
                                duration: 1000
                            });
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }
            },
            //tabs切换
            tabs(val) {
                console.log(val.$data.index);
                if (val.$data.index == '0') {
                    //tabs1
                    //供应商1
                    this.options1 = [];
                    this.ajaxP(this.options1);
                    //查询所有商品
                    this.spucode1 = '';//清空
                    this.value1 = '';
                    this.currentPage1 = 1;
                    this.ajaxAll(this.currentPage1);
                } else {
                    //tabs2
                    //供应商2
                    this.options2 = [];
                    this.ajaxP(this.options2);
                    //查询绑定商品
                    this.spucode2 = '';//清空
                    this.value2 = '';
                    this.currentPage2 = 1;
                    this.ajaxSelect(this.currentPage2);
                }
            },
            //查询
            inquiry1() {
                //查询1
                this.$http.post(this.url + '/activity/getActivitySpuList', {
                    page: 1,
                    num: 10,
                    code: '',
                    activityId: this.activityID,
                    spuCode: this.spucode1,
                    warehouseCode: this.value1,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null||res.data.data.pageList==null){
                        this.tableData1= [];
                        this.arr1.length = 0;
                    }else{
                        this.tableData1 = res.data.data.pageList;
                        this.arr1.length = res.data.data.pageTotal;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
            inquiry2() {
                //查询2
                this.$http.post(this.url + '/activity/getActivitySpuList', {
                    page: 1,
                    num: 10,
                    code: 1,
                    activityId: this.activityID,
                    spuCode: this.spucode2,
                    warehouseCode: this.value2,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null||res.data.data.pageList==null){
                        this.tableData2 = [];
                        this.arr2.length = 0;
                    }else{
                        this.tableData2 = res.data.data.pageList;
                        this.arr2.length = res.data.data.pageTotal;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
            //查询2 ----编辑
//        adit(row, index) {
//            console.log(row, index);
//            this.$router.push({
//                path: '/skuActivity',
//                query: {spucode:row.spucode}
//            })
//        },
            //ajax-查询供应商
            ajaxP(a) {
                //查询供应商
                this.$http.post(this.url + '/warehouse/all_warehouse', {
                    page: 1,
                    num: 100000,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    for (let i = 0; i < res.data.data.pageList.length; i++) {
                        let obj = {};
                        obj.value = res.data.data.pageList[i].warehouseCode;
                        obj.label = res.data.data.pageList[i].warehouseName;
                        a.push(obj);
                    }
                    let obj = {value: "", label: "-- 请选择 --"};
                    a.unshift(obj)
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
            //查询全部商品ajax
            ajaxAll(a1) {
                //查询全部商品
                this.$http.post(this.url + '/activity/getActivitySpuList', {
                    page: a1,
                    num: 10,
                    code: '',
                    activityId: this.activityID,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null||res.data.data.pageList==null){
                        this.tableData1 = [];
                        this.arr1.length = 0;
                    }else{
                        this.tableData1 = res.data.data.pageList;
                        this.arr1.length = res.data.data.pageTotal;
                    }
                    this.loading = false;
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
            //查已选商品ajax
            ajaxSelect(a1) {
                this.$http.post(this.url + '/activity/getActivitySpuList', {
                    page: a1,
                    num: 10,
                    code: 1,
                    activityId: this.activityID,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null||res.data.data.pageList==null){
                        this.tableData2 = [];
                        this.arr2.length = 0;
                    }else{
                        for (let i = 0; i < res.data.data.pageList.length; i++) {
                            res.data.data.pageList[i].maxShow = false;
                            res.data.data.pageList[i].maxInput = '';
                            res.data.data.pageList[i].minShow = false;
                            res.data.data.pageList[i].minInput = '';
                        }
                        this.tableData2 = res.data.data.pageList;
                        this.arr2.length = res.data.data.pageTotal;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
            selectChange(index) {
                this.selectIndex = index;
                this.datas[this.selectIndex].inputs = '';//清空
                if (this.datas[this.selectIndex].select0 != '') {
                    this.datas[this.selectIndex].show0 = true;
                } else {
                    this.datas[this.selectIndex].show0 = false;
                }

            },
            //开始时间
            startTime(val) {
                this.starttime = val;
                console.log(val);
            },
            //结束时间
            endTime(val) {
                this.endtime = val;
                console.log(val);
            },
            //步骤条
            next() {
                if (this.active++ > 2) this.active = 0;
            },
            nextStepF(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url + '/activity/addActivityBaseInfo', {
                            activityName: this.ruleForm.activityName,
                            activityDesc: this.ruleForm.activityDsc,
                            activityStart: this.starttime,
                            activityEnd: this.endtime,
                            activityTarget: this.ruleForm.activityObject,
                            activityType:'FULL_CUT',
                        }, {emulateJSON: true}).then(function (res) {
                            if(res.data.status==200){
                                this.showDC = true;
                                this.active = 1;
                                this.activityID = res.data.data.activityId;
                                this.activityName = res.data.data.activityName;
                                this.activityStart = res.data.data.activityStart;
                                this.activityEnd = res.data.data.activityEnd;
                                this.createdTime = res.data.data.gmtCreate;
                                if (res.data.data.activityTarget == "MEMBER") {
                                    this.activityObject = "会员";
                                } else {
                                    this.activityObject = "所有人";
                                }
                                this.isShow = false;
                                this.next;
                                //查询全部商品
                                this.ajaxAll(1);
                                //供应商1
                                this.options1 = [];
                                this.ajaxP(this.options1);
                            }else{
                                this.$message({
                                    type:'error',
                                    message:res.data.msg,
                                })
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            //赠商品-下拉框
            xialakuangValue(val) {
                this.xialakuangvalue = val;
            },
            //赠商品-保存按钮
            zspSure(index) {
                if (this.value0 == '') {
                    this.$message({
                        type: 'warning',
                        message: '请选择--每用户可选商品数!'
                    });
                } else {
                    let num = parseInt(this.value0);
                    console.log(this.xialakuangvalue);
                    if (this.zspArr.length < num) {
                        this.$message({
                            type: 'warning',
                            message: '不能超过已选商品个数!'
                        });
                    } else {
                        this.dialogTableVisible = false;
                        this.datas[index].showAreas = this.showAreasArr;//赠商品-回显
                        if (this.datas[index].showAreas.length != 0) {
                            this.datas[index].dcSendcommodity = true;
                        } else {
                            this.datas[index].dcSendcommodity = false;
                        }
                    }
                }
            },
            sendCommodity(index) {
                this.spuIds = [];//清空
                this.dialogTableVisible = true;
                this.tableData = [];
                this.$http.post(this.url + '/spuManage/gift_spu', {
                    page: 1,
                    num: 10000
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    for (let i = 0; i < res.data.data.pageList.length; i++) {
                        let obj = {};
                        obj.commodityUrl = res.data.data.pageList[i].imageUrlsToWeb[0];
                        obj.spuId = res.data.data.pageList[i].spuId
                        obj.price = res.data.data.pageList[i].minPrice + '-' + res.data.data.pageList[i].maxPrice;
                        obj.sendCommodityName = res.data.data.pageList[i].spuname;
                        obj.commodityDisc = res.data.data.pageList[i].spuSimpleDesc;
                        this.tableData.push(obj);
                        this.spuIds.push(res.data.data.pageList[i].spuId);
                    }
                    console.log(this.spuIds);
                });

            },
            //赠商品弹框->多选
            handleSelectionChange(val) {
                this.zspArr = val;
                this.showAreasArr = [];
                this.selectedSpuId = [];
                for (let i = 0; i < val.length; i++) {
                    console.log(val);
                    this.showAreaObj = {};
                    this.showAreaObj.url = val[i].commodityUrl;
                    this.showAreaObj.name = val[i].sendCommodityName;
                    this.showAreaObj.spuId = val[i].spuId;
                    this.showAreasArr.push(this.showAreaObj);
                    this.selectedSpuId.push(val[i].spuId);
                }
                console.log(this.selectedSpuId);
            },
            beforeClose(val) {
                if (this.datas[0].showAreas.length != 0) {
                    this.datas[0].dcSendcommodity = true;
                } else {
                    this.datas[0].dcSendcommodity = false;
                }
                this.dialogTableVisible = false;
            },
            //添加优惠按钮
            addDiscount() {
                if (this.datas[this.datas.length - 1].discountCondition == '' || this.datas[this.datas.length - 1].discountCondition == undefined) {
                    this.$message({
                        type: 'warning',
                        message: '请选择优惠条件!'
                    });
                } else {
                    if (this.datas[this.datas.length - 1].discountThreshold == '' || this.datas[this.datas.length - 1].discountThreshold == undefined) {
                        this.$message({
                            type: 'warning',
                            message: '请填写优惠门槛!'
                        });
                    } else {
                        if((this.datas[this.datas.length - 1].select0 == ''||this.datas[this.datas.length - 1].select0 == undefined)&&(this.datas[this.datas.length - 1].sendCoin == false||this.datas[this.datas.length - 1].sendCoin==undefined)){
                            this.$message({
                                type: "warning",
                                message: '请选择优惠内容!'
                            })
                        }else{
                            if (this.datas[this.datas.length - 1].show0 == true && this.datas[this.datas.length - 1].inputs == '') {
                                this.$message({
                                    type: "warning",
                                    message: '请填写优惠内容!'
                                })
                            } else {
                                if (this.datas[this.datas.length - 1].a3 == false && (this.datas[this.datas.length - 1].dcSendCoin == ''||this.datas[this.datas.length - 1].dcSendCoin == undefined)) {
                                    this.$message({
                                        type: "warning",
                                        message: '请填写金币!'
                                    })
                                } else {
                                    //上一级按钮变灰 不能修改
                                    this.datas[this.datas.length - 1].disRadio = true;//优惠条件变灰
                                    this.datas[this.datas.length - 1].DTDisabled = true;//满件输入框变灰
                                    this.datas[this.datas.length - 1].selectDisabled = true;//优惠内容下拉框变灰
                                    this.datas[this.datas.length - 1].show0Disabled = true;//下拉框后面的输入框变灰
                                    this.datas[this.datas.length - 1].sendCoinDisabled = true;//赠金币变灰
                                    this.datas[this.datas.length - 1].a3 = true;
                                    this.datas[this.datas.length - 1].sendCommodityDisabled = true;//赠商品变灰
                                    this.datas[this.datas.length - 1].sendMemberDisabled = true;//送会员变灰
                                    this.datas[this.datas.length - 1].memberRadio = true;//送会员后面的单选按钮变灰

                                    this.numberArr = [];
                                    let obj = {
                                        a0: true, a1: true, a2: true, a3: true, memberRadio: true, options0: [
                                            {
                                                value: '1',
                                                label: '指定金额 (单位 : 元)'
                                            }, {
                                                value: '2',
                                                label: '打几折 (单位 : %)'
                                            }, {
                                                value: '3',
                                                label: '减免金额 (单位 : 元)'
                                            },
                                        ], show0: false, inputs: ''
                                    };
                                    this.datas.push(obj);
                                    let aa = this.datas[this.datas.length - 2];
                                    if (aa.select0 == '1') {
                                        this.numberArr.push(1);
                                        this.inputs1 = aa.inputs;
                                    } else if (aa.select0 == '2') {
                                        this.numberArr.push(2);
                                        this.inputs2 = aa.inputs;
                                    } else if (aa.select0 == '3') {
                                        this.numberArr.push(3);
                                        this.inputs3 = aa.inputs;
                                    }
                                    if (aa.dcSendcommodity == true) {
                                        this.numberArr.push(4);
                                    }
                                    if (aa.sendCoin == true) {
                                        this.numberArr.push(5);
                                    }
                                    if (aa.dcSendMember == true) {
                                        this.numberArr.push(7);
                                    }
                                    if (aa.dcSendCoin == undefined) {
                                        aa.dcSendCoin = null;//赠金币
                                    }
                                    //送会员
                                    if (aa.radios == undefined) {
                                        aa.radios = null;//赠金币
                                    }
                                    this.$http.post(this.url + '/activity/addActivityCondition', {
                                        activityId: this.activityID,
                                        activityCondition: this.datas[this.datas.length - 2].discountCondition,
                                        activitySill: aa.discountThreshold,
                                        activityModules: this.numberArr.join(','),
                                        quota: this.inputs1,//指定金额
                                        activityTier: this.datas.length - 1,//层级
                                        discountRate: this.inputs2,//折扣
                                        derate: this.inputs3,//减免金额
//                            spuIds: this.selectedSpuId.join(','),//商品
                                        productNum: this.xialakuangvalue,//数量
                                        gold: aa.dcSendCoin,//赠金币
                                        member: aa.radios,//送会员
                                    }, {emulateJSON: true}).then(function (res) {
                                        console.log(res);
                                        if(res.data.status==200){

                                        }else{
                                            this.$message({
                                                type:'error',
                                                message:'添加失败!'
                                            })
                                        }
                                    },function (err) {
                                        this.$message({
                                            type:'error',
                                            message:'服务器连接中断,请联系后台人员!',
                                        });
                                    });
                                }
                            }
                        }
                    }
                }
            },
            //删除最近一级优惠
            deleteDiscount() {
                this.$confirm('确定清空所有优惠?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.loading = true;
                    this.$http.post(this.url+'/activity/delPreciseCondition',{activityId:this.activityID},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        this.loading = false;
                        if(res.data.status==200){
                            this.datas = [
                                {
                                    sendCoin:'',
                                    select0: '',//下拉
                                    discountCondition: '',//优惠条件
                                    disRadio:false,//优惠条件变灰
                                    options0: [
                                        {
                                            value: '1',
                                            label: '指定金额 (单位 : 元)'
                                        }, {
                                            value: '2',
                                            label: '打几折 (单位 : %)'
                                        }, {
                                            value: '3',
                                            label: '减免金额 (单位 : 元)'
                                        },
                                    ],
                                    show0: false,
                                    inputs: '',
                                    DTDisabled: false,//满件输入框变灰
                                    selectDisabled: false,//优惠内容-下拉框变灰
                                    show0Disabled: false,//下拉框后面的输入框
                                    sendCoinDisabled: false,//赠金币变灰
                                    sendCommodityDisabled: false,//赠商品变灰
                                    sendMemberDisabled: false,//送会员变灰
                                    discountThreshold: '',
                                    memberRadio: true,//送会员
                                    dcSendCoin: '',
                                    dcSendcommodity: false,
                                    dcSendMember: '',
                                    value1: '',
                                    options: [
                                        {value: '0', label: '0'},
                                        {value: '1', label: '1'},
                                        {value: '2', label: '2'},
                                        {value: '3', label: '3'},
                                        {value: '4', label: '4'},
                                        {value: '5', label: '5'},
                                        {value: '6', label: '6'},
                                        {value: '7', label: '7'},
                                        {value: '8', label: '8'},
                                    ],
                                    radios: '',//送会员单选
                                    showAreas: [],//赠商品-显示区
                                    a0: true,
                                    a1: true,
                                    a2: true,
                                    a3: true,
                                }
                            ];
                            this.$message({
                                type:'success',
                                message:'操作成功!'
                            })
                        }else{
                            this.$message({
                                type:'error',
                                message:'操作失败!'
                            })
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            //保存
            discountSure() {
                this.numberArr = [];//清空
                console.log(this.datas);
                if (this.datas[this.datas.length - 1].discountCondition == '' || this.datas[this.datas.length - 1].discountCondition == undefined) {
                    this.$message({
                        type: 'warning',
                        message: '请选择优惠条件!'
                    });
                } else {
                    if (this.datas[this.datas.length - 1].discountThreshold == '' || this.datas[this.datas.length - 1].discountThreshold == undefined) {
                        this.$message({
                            type: 'warning',
                            message: '请填写优惠门槛!'
                        });
                    } else {
                        if (this.datas[this.datas.length - 1].show0 == true && this.datas[this.datas.length - 1].inputs == '') {
                            this.$message({
                                type: "warning",
                                message: '请填写优惠内容!'
                            })
                        } else {
                            if (this.datas[this.datas.length - 1].a3 == false && (this.datas[this.datas.length - 1].dcSendCoin == '' || this.datas[this.datas.length - 1].dcSendCoin == undefined)) {
                                this.$message({
                                    type: "warning",
                                    message: '请填写金币!'
                                })
                            } else {
                                if (this.datas[this.datas.length - 1].select0 == '1') {
                                    this.numberArr.push(1);
                                    this.inputs1 = this.datas[this.datas.length - 1].inputs;
                                } else if (this.datas[this.datas.length - 1].select0 == '2') {
                                    this.numberArr.push(2);
                                    this.inputs2 = this.datas[this.datas.length - 1].inputs;
                                } else if (this.datas[this.datas.length - 1].select0 == '3') {
                                    this.numberArr.push(3);
                                    this.inputs3 = this.datas[this.datas.length - 1].inputs;
                                }
                                if (this.datas[this.datas.length - 1].dcSendcommodity == true) {
                                    this.numberArr.push(4);
                                }
                                if (this.datas[this.datas.length - 1].sendCoin == true) {
                                    this.numberArr.push(5);
                                }
                                if (this.datas[this.datas.length - 1].dcSendMember == true) {
                                    this.numberArr.push(7);
                                }
                                if (this.datas[this.datas.length - 1].dcSendCoin == undefined) {
                                    this.datas[this.datas.length - 1].dcSendCoin = null;
                                }
                                //送会员
                                if (this.datas[this.datas.length - 1].radios == undefined) {
                                    this.datas[this.datas.length - 1].radios = null;
                                }
                                //商品spuIds
                                let arr = [];
                                if (this.datas[this.datas.length - 1].showAreas == undefined) {
                                    arr = [];
                                } else {
                                    for (let i = 0; i < this.datas[this.datas.length - 1].showAreas.length; i++) {
                                        let a = this.datas[this.datas.length - 1].showAreas[i].spuId;
                                        arr.push(a)
                                    }

                                }
                                console.log(this.datas.length);
                                this.$http.post(this.url + '/activity/addActivityCondition', {
                                    activityId: this.activityID,
                                    activityCondition: this.datas[this.datas.length - 1].discountCondition,
                                    activitySill: this.datas[this.datas.length - 1].discountThreshold,
                                    activityModules: this.numberArr.join(','),
                                    activityTier: this.datas.length,//层级
                                    quota: this.inputs1,//指定金额
                                    discountRate: this.inputs2,//折扣
                                    derate: this.inputs3,//减免金额
//                            spuIds: arr.join(','),//商品
                                    productNum: this.xialakuangvalue,//数量
                                    gold: this.datas[this.datas.length - 1].dcSendCoin,//赠金币
                                    member: this.datas[this.datas.length - 1].radios,//送会员
                                }, {emulateJSON: true}).then(function (res) {
                                    console.log(res);
                                    this.numberArr = [];
                                    if (res.data.status == 200) {
                                        this.showDC = false;
                                        this.showC = true;
                                        this.active = 2;
                                    } else {
                                        this.$message({
                                            type:'error',
                                            message:'保存失败!'
                                        })
                                    }
                                },function (err) {
                                    this.$message({
                                        type:'error',
                                        message:'服务器连接中断,请联系后台人员!',
                                    });
                                });
                            }
                        }
                    }
                }
            },
            //赠金币
            ddd(index) {
                if (this.datas[index].sendCoin == false) {
                    this.datas[index].dcSendCoin = '';
                }
                this.datas[index].a3 = !this.datas[index].a3;
            },
            //送会员
            eee(index) {
                if (this.datas[index].dcSendMember == false) {
                    this.datas[index].radios = false;
                }
                this.datas[index].memberRadio = !this.datas[index].memberRadio;
            },
            ajaxSelect(a1) {
                this.$http.post(this.url + '/activity/getActivitySpuList', {
                    page: a1,
                    num: 10,
                    code: 1,
                    activityId: this.activityID,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    for (let i = 0; i < res.data.data.pageList.length; i++) {
                        res.data.data.pageList[i].maxShow = false;
                        res.data.data.pageList[i].maxInput = '';
                        res.data.data.pageList[i].minShow = false;
                        res.data.data.pageList[i].minInput = '';
                    }
                    this.tableData2 = res.data.data.pageList;
                    this.arr2.length = res.data.data.pageTotal;
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
            //返回列表
            returnList(){
                this.$http.post(this.url + '/activity/completeActivity',{activityId: this.activityID}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        this.$message({
                            type:'success',
                            message:'发布成功!'
                        });
                        this.$router.push({
                            path:'/activityList',
                        })
                    }else{
                        this.$message({
                            type:'error',
                            message:'发布失败!'
                        })
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
//                this.isShow = true;
//                this.ruleForm.activityName = '';
//                this.ruleForm.startTime = '';
//                this.ruleForm.endTime = '';
//                this.ruleForm.activityDsc = '';
//                this.ruleForm.activityObject = '';
//                this.active=0;
//                this.showC = false;
//                this.datas=[
//                    {
//                        select0: '',//下拉
//                        discountCondition: '',//优惠条件
//                        options0: [
//                            {
//                                value: '1',
//                                label: '指定金额 (单位 : 元)'
//                            }, {
//                                value: '2',
//                                label: '打几折 (单位 : %)'
//                            }, {
//                                value: '3',
//                                label: '减免金额 (单位 : 元)'
//                            },
//                        ],
//                        show0: false,
//                        inputs: '',
//                        DTDisabled: false,//满件输入框变灰
//                        selectDisabled: false,//优惠内容-下拉框变灰
//                        show0Disabled: false,//下拉框后面的输入框
//                        sendCoinDisabled: false,//赠金币变灰
//                        sendCommodityDisabled: false,//赠商品变灰
//                        sendMemberDisabled: false,//送会员变灰
//                        discountThreshold: '',
//                        memberRadio: true,//送会员
//                        dcSendCoin: '',
//                        dcSendcommodity: false,
//                        dcSendMember: '',
//                        value1: '',
//                        options: [
//                            {value: '0', label: '0'},
//                            {value: '1', label: '1'},
//                            {value: '2', label: '2'},
//                            {value: '3', label: '3'},
//                            {value: '4', label: '4'},
//                            {value: '5', label: '5'},
//                            {value: '6', label: '6'},
//                            {value: '7', label: '7'},
//                            {value: '8', label: '8'},
//                        ],
//                        radios: '',//送会员单选
//                        showAreas: [],//赠商品-显示区
//                        a0: true,
//                        a1: true,
//                        a2: true,
//                        a3: true,
//                    }
//                ];
//                this.ajaxSelect(1)
            }
        }
    }
</script>

<style scoped>
    .discountArea {
        height: 500px;
        overflow: scroll;
    }

    .setWidths {
        width: 195px;
    }

    .nextStep {
        margin-left: 20px;
    }

    .activityId {
        display: flex;
        align-items: center;
    }

    .showArea {
        width: 80px;
        text-align: center;
    }

    .el-row2 {
        display: flex;
        align-items: center;
    }

    .spans {
        width: 80px;
        font-size: 14px;
    }

    .spans0 {
        width: 60px;
        font-size: 14px;
    }

    .table {
        margin-top: 5px;
    }

    .block {
        /*text-align: right;*/
        margin-top: 5px;
    }

    .bt {
        border-top: 1px solid gainsboro;
    }

    .redP {
        color: red;
    }

    /**/
    .discountArea {
        height: 500px;
        overflow: scroll;
    }

    .setWidths {
        width: 195px;
    }

    .nextStep {
        margin-left: 20px;
    }

    .activityId {
        display: flex;
        align-items: center;
    }

    .showArea {
        width: 80px;
        text-align: center;
    }

    .el-row2 {
        display: flex;
        align-items: center;
    }

    .spans {
        width: 80px;
    }

    .spans0 {
        width: 60px;
    }

    .table {
        margin-top: 5px;
    }

    .block {
        /*text-align: right;*/
        /*margin-top: 5px;*/
    }

    .bt {
        border-top: 1px solid gainsboro;
    }

    .xiaoshou {
        cursor: pointer;
    }

    .inputs {
        width: 60px;
        height: 30px;
        border-radius: 5px;
    }
</style>
