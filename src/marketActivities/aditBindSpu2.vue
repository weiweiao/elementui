<template>
    <div class="yy">
        <div>
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
                            class="table a1"
                            :data="tableData1"
                            border
                            v-loading="loading"
                            @selection-change="handleSelectionChange1"
                            style="width: 100%;font-size: 12px"
                            max-height="480"
                    >
                        <el-table-column
                                type="selection"
                                :selectable='checkboxInit'
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="spucode"
                                label="spucode"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="spuname"
                                label="商品名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="spuTitle"
                                label="商品标题"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="allStockNumber"
                                label="商品库存"
                        >
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--prop="maxPurchaseActivity"-->
                                <!--label="最大购买量"-->
                                <!--width="120"-->
                        <!--&gt;-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="minPurchaseActivity"-->
                                <!--label="最小购买量"-->
                                <!--width="120"-->
                        <!--&gt;-->
                        <!--</el-table-column>-->
                        <el-table-column
                                prop="allStockNumberActivity"
                                label="活动库存"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="activityName"
                                label="已绑定活动"

                        >
                            <template slot-scope="scope">
                                <div style="display: flex;flex-wrap: wrap">
                                    <div v-for="item in scope.row.activeMsg">
                                        <el-tag type="success" style="margin: 5px;">
                                            {{item.name}}
                                        </el-tag>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页1-->
                    <div class="block">
                        <el-button @click="baocun" type="primary" style="margin-right: 200px">保存并发布</el-button>
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
                            class="table a1"
                            :data="tableData2"
                            border
                            v-loading="loadingDelet"
                            @selection-change="handleSelectionChange2"
                            style="width: 100%;font-size: 12px"
                            max-height="480"
                    >
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="spucode"
                                label="spucode"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="spuname"
                                label="商品名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="spuTitle"
                                label="商品标题"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="allStockNumber"
                                label="商品库存"
                        >
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--prop="maxPurchaseActivity"-->
                                <!--label="最大购买量"-->
                                <!--width="120"-->
                        <!--&gt;-->
                            <!--<template slot-scope="scope">-->
                                <!--<span @click="maxPurchase(scope.row,scope.$index)"-->
                                      <!--class="xiaoshou">{{scope.row.maxPurchaseActivity}}</span>-->
                                <!--<input class="inputs" v-show="scope.row.maxShow" v-focus v-model="scope.row.maxInput"-->
                                       <!--@blur="maxBlur(scope.row,scope.$index)">-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="minPurchaseActivity"-->
                                <!--label="最小购买量"-->
                                <!--width="120"-->
                        <!--&gt;-->
                            <!--<template slot-scope="scope">-->
                                <!--<span @click="minPurchase(scope.row,scope.$index)"-->
                                      <!--class="xiaoshou">{{scope.row.minPurchaseActivity}}</span>-->
                                <!--<input class="inputs" v-show="scope.row.minShow" v-focus v-model="scope.row.minInput"-->
                                       <!--@blur="minBlur(scope.row,scope.$index)">-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <el-table-column
                                prop="allStockNumberActivity"
                                label="活动库存"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="activityName"
                                label="已绑定活动"
                                width="200"
                        >
                            <template slot-scope="scope">
                                <div style="display: flex;flex-wrap: wrap">
                                    <div v-for="item in scope.row.activeMsg">
                                        <el-tag type="success" style="margin: 5px;">
                                            {{item.name}}
                                        </el-tag>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="operate"
                                label="操作"
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
                                style="width: 100%;font-size: 12px">
                            <!--<el-table-column-->
                                    <!--type="index"-->
                                    <!--label="序号"-->
                                    <!--width="80"-->
                            <!--&gt;-->
                            <!--</el-table-column>-->
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
                                    prop="minPurchaseActivity"
                                    label="最小购买量"
                            >
                                <template slot-scope="scope">
                                <span @click="minPurchase(scope.row,scope.$index)"
                                      class="xiaoshou">{{scope.row.minPurchaseActivity}}</span>
                                    <input class="inputs" v-show="scope.row.minShow" v-focus v-model="scope.row.minInput"
                                           @blur="minBlur(scope.row,scope.$index)">
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="maxPurchaseActivity"
                                    label="最大购买量"
                            >
                                <template slot-scope="scope">
                                <span @click="maxPurchase(scope.row,scope.$index)"
                                      class="xiaoshou">{{scope.row.maxPurchaseActivity}}</span>
                                    <input class="inputs" v-show="scope.row.maxShow" v-focus v-model="scope.row.maxInput"
                                           @blur="maxBlur(scope.row,scope.$index)">
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="activityPrice"
                                    label="活动价格"
                            >
                                <template slot-scope="scope">
                                <span @click="activityPrice(scope.row,scope.$index)"
                                      class="xiaoshou">{{scope.row.activityPrice * 0.01}}</span>
                                    <input class="inputs" v-show="scope.row.activityPriceShow" v-focus
                                           v-model="scope.row.activityPriceInput"
                                           @blur="activityPriceBlur(scope.row,scope.$index)">
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="activityStock"
                                    label="活动库存"
                            >
                                <template slot-scope="scope">
                                <span @click="activityStock(scope.row,scope.$index)"
                                      class="xiaoshou">{{scope.row.activityStock}}</span>
                                    <input class="inputs" v-show="scope.row.activityStockShow" v-focus
                                           v-model="scope.row.activityStockInput"
                                           @blur="activityStockBlur(scope.row,scope.$index)">
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-dialog>
                    <!--分页2-->
                    <div class="block">
                        <el-button @click="baocun" type="primary" style="margin-right: 200px">保存并发布</el-button>
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
</template>

<script>
    export default {
        name: 'hh',
        data() {
            return {
                tableData3: [],
                loading: false,//批量绑定
                loadingDelet: false,//批量删除
                aditTableData: [],
                dialogFormVisible: false,//编辑弹框
                selectIndex: Number,
                inputs1: '',
                inputs2: '',
                inputs3: '',
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
                datas: [
                    {
                        select0: '',//下拉
                        options0: [
                            {
                                value: '1',
                                label: '指定金额'
                            }, {
                                value: '2',
                                label: '打几折'
                            }, {
                                value: '3',
                                label: '减免金额'
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
                obj: {},
                spucode:'',
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
            //默认变灰
            checkboxInit(row,index){
                if (row.bt==1){
                    return 0;//不可勾选
                }else{
                    return 1;//可勾选
                }
            },
            baocun() {
                this.$http.post(this.url + '/activity/completeActivity',{activityId: this.activityID}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        this.$message({
                            type:'success',
                            message:'发布成功!'
                        });
                        this.$router.push({
                            path: '/activityList',
                            query: {obj: this.obj, a: 1},
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
            },
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
                                this.ajaxSku(this.spucode);
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
                                this.ajaxSku(this.spucode);
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
                this.spucode = row.spucode;
                this.ajaxSku(this.spucode);
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
                        this.$http.post(this.url + '/product/activity_byNum', {
                            maxPurchaseActivity: row.maxInput,
                            productId: row.productId,
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {
                                row.maxShow = false;
                                //刷新当前页
                                this.ajaxSku(this.spucode);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '修改失败!'
                                });
                            }
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
                        this.$http.post(this.url + '/product/activity_byNum', {
                            minPurchaseActivity: row.minInput,
                            productId: row.productId,
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {
                                row.minShow = false;
                                //刷新当前页
                                this.ajaxSku(this.spucode);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '修改失败!'
                                });
                            }
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
                        as: JSON.stringify(this.checkedArr1)
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        this.loading = false;
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
                    this.loadingDelet = true;
                    this.$http.post(this.url + '/activity/delActivitySpu', {
                        activityId: this.activityID,
                        spuCode: this.checkedArr2.join(',')
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        this.loadingDelet = false;
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
                                message: '移除失败!',
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
            },
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
                    a.unshift(obj);
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
                    if(res.data.data.pageList==null||res.data.data==null){
                        this.tableData1 = [];
                        this.arr1.length = 0;
                    }else {
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
            //查已选商品ajax
            ajaxSelect(a1) {
                this.$http.post(this.url + '/activity/getActivitySpuList', {
                    page: a1,
                    num: 10,
                    code: 1,
                    activityId: this.activityID,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.data.pageList==null||res.data.data==null){
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
            //sku刷新
            ajaxSku(a){
                this.$http.post(this.url + '/product/select_productBySpucode', {spucode: a}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null){
                        this.aditTableData = [];
                    }else{
                        for (let i = 0; i < res.data.data.length; i++) {
                            res.data.data[i].activityPriceShow = false;
                            res.data.data[i].activityPriceInput = '';
                            res.data.data[i].activityStockShow = false;
                            res.data.data[i].activityStockInput = '';
                            res.data.data[i].maxShow = false;
                            res.data.data[i].maxInput = '';
                            res.data.data[i].minShow = false;
                            res.data.data[i].minInput = '';
                        }
                        this.aditTableData = res.data.data
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            }
        },
        created() {
            this.activityID = this.$route.query.activityId;
            //查询全部商品
            this.ajaxAll(1);
            //供应商1
            this.options1 = [];
            this.ajaxP(this.options1);
        }
    }
</script>

<style scoped>
    /*.discountArea {*/
        /*height: 500px;*/
        /*overflow: scroll;*/
    /*}*/

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
        margin-top: 5px;
        display: flex;
        justify-content: flex-end;
    }

    .bt {
        border-top: 1px solid gainsboro;
    }

    .redP {
        color: red;
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
