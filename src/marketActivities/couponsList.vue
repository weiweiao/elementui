<template>
    <!--优惠券列表-->
    <div class="coupons-list">
        <div>
            <el-row :gutter="12" class="el-row2">
                <el-col :span="10">
                    <el-button @click="add">添加优惠券</el-button>
                    <el-button @click="add2">查看优惠券包</el-button>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span class="spans0">优惠券名称</span>
                        <el-input placeholder="请输入优惠券名称" v-model="discountName"></el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="spans1">状态</span>
                        <el-select v-model="value1" placeholder="请选择">
                            <el-option
                                    v-for="item in options1"
                                    :key="item.value1"
                                    :label="item.label"
                                    :value="item.value1">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="inquiry">查询</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="clears">清除条件</el-button>
                    </div>
                </el-col>
            </el-row>
            <!--table-->
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    max-height="440"
            >
                <el-table-column
                        prop="xuhao"
                        label="序号"
                        width="88">
                </el-table-column>
                <el-table-column
                        prop="couponName"
                        label="优惠券名称"
                       >
                </el-table-column>
                <el-table-column
                        prop="couponAmount"
                        label="面额"
                       >
                </el-table-column>
                <el-table-column
                        prop="releaseTime"
                        label="领取时间"
                        >
                    <template slot-scope="scope">
                        {{scope.row.releaseTime | time}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="terminalTime"
                        label="结束时间"
                       >
                    <template slot-scope="scope">
                        {{scope.row.terminalTime | time}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="validityPeriod"
                        label="有效期"
                       >
                </el-table-column>
                <el-table-column
                        prop="quantity"
                        label="发放总量"
                       >
                </el-table-column>
                <el-table-column
                        prop="gmtCreate"
                        label="创建时间"
                        >
                    <template slot-scope="scope">
                        {{scope.row.gmtCreate | time}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                       >
                    <template slot-scope="scope">
                        <el-button  type="text" size="small" @click="adit(scope.row,scope.$index)">编辑</el-button>
                        <span>|</span>
                        <el-button type="text" size="small" @click="delet(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--添加优惠弹框-->
            <el-dialog title="添加优惠券" :visible.sync="dialogFormVisible" top="5vh">
                <p class="redP">TIP:(1)优惠券可修改，修改前已领取的用户按原优惠券条件使用。</p>
                   <p  class="redP">(2)优惠券页面链接地址/shopping/coupon.htm，运营人员可自由开放优惠券领取入口</p>
                <el-form>
                    <el-form-item label="优惠券名称" :label-width="formLabelWidth">
                        <el-input v-model="name" auto-complete="off" class="inputs0"></el-input>
                    </el-form-item>
                    <el-form-item label="启用" :label-width="formLabelWidth">
                        <el-radio v-model="open" label="1">
                            <span   style="font-size: 10px;color: red">启用后,此优惠券显示在优惠券领取页面,用户可主动领取也可后台发放;如不勾选则只能后台发</span>
                        </el-radio>
                    </el-form-item>
                    <el-form-item label="优惠券面额" :label-width="formLabelWidth">
                        <el-input v-model="denomination" auto-complete="off" class="inputs"></el-input>
                    </el-form-item>
                    <el-form-item label="开始领取时间" :label-width="formLabelWidth">
                            <el-date-picker
                                    @change="startTimeChange"
                                    v-model="startTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束领取时间" :label-width="formLabelWidth">
                        <el-date-picker
                                @change="endTimeChange"
                                v-model="endTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发放总量" :label-width="formLabelWidth">
                        <el-input v-model="totalIssued" auto-complete="off" class="inputs"></el-input>
                    </el-form-item>
                    <el-form-item label="限领张数" :label-width="formLabelWidth">
                        <el-input v-model="limitNum" auto-complete="off" class="inputs"  placeholder="每人"></el-input>
                        <span class="redP">每人领取张数(0表示不限制领取数量)</span>
                        <br>
                        <el-input v-model="limitNum2" auto-complete="off" class="inputs"  style="margin-top: 5px" placeholder="每天"></el-input>
                        <span class="redP">每天领取张数(0表示不限制领取数量)</span>
                    </el-form-item>
                    <el-form-item label="使用时间" :label-width="formLabelWidth">
                        <el-radio-group v-model="useTime" @change="useTimeChange" >
                            <el-radio label="0">固定使用时间</el-radio>
                            <el-radio label="1">过期天数</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div v-show="isShow0">
                        <el-form-item label="优惠券可使用开始时间" :label-width="formLabelWidth">
                            <el-date-picker
                                    @change="useStartTimeChange"
                                    v-model="useStartTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="优惠券可使用结束时间" :label-width="formLabelWidth">
                            <el-date-picker
                                    @change="useEndTimeChange"
                                    v-model="useEndTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div  v-show="isShow1">
                        <el-form-item label=" " :label-width="formLabelWidth">
                            <el-input v-model="expiredDaysInput" auto-complete="off" class="inputs"  ></el-input>
                            <span>天</span>
                        </el-form-item>
                    </div>
                    <el-form-item label="使用条件" :label-width="formLabelWidth">
                        <el-radio-group v-model="useCondition" @change="useConditionChange"  >
                            <el-radio label="0">不限制</el-radio>
                            <el-radio label="1">满额使用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div  v-show="isShow2">
                        <el-form-item label=" " :label-width="formLabelWidth">
                            <el-input v-model="limitMoneyInput" auto-complete="off" class="inputs" ></el-input>
                            <span>元</span>
                        </el-form-item>
                    </div>
                    <el-form-item label="礼包专用" :label-width="formLabelWidth">
                        <el-radio-group v-model="specialCoupon" @change="specialCouponChange"  >
                            <el-radio label="0">否</el-radio>
                            <el-radio label="1">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="商品范围" :label-width="formLabelWidth">
                        <el-radio-group v-model="commodityRange" @change="commodityRangeChange">
                            <el-radio label="0">全部商品
                            </el-radio>
                            <el-radio label="1">
                                <el-upload
                                        style="display: inline-block"
                                        class="upload-demo"
                                        :action="url+'/coupon/bind_product'"
                                        :on-success="handleSuccess"
                                        :show-file-list="false"
                                >
                                    <span>
                                        指定商品上传
                                    </span>
                                </el-upload>
                            </el-radio>
                            <el-radio label="2">指定类目</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div v-show="isShow3">
                        <el-form-item label="指定类目" :label-width="formLabelWidth">
                            <el-checkbox-group v-model="assignClass" @change="assignClassChange">
                                <el-checkbox   v-for="item in assignClassArr" :label="item.itemModuleId" :key="item.itemModuleId">{{item.itemModuleName}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                    <div v-show="isShow4">
                        <el-table
                                :data="SPtableData"
                                border
                                style="width: 100%;max-height: 250px;overflow: scroll">
                            <el-table-column
                                    type="index"
                                    label="序号"
                                    width="66">
                            </el-table-column>
                            <el-table-column
                                    prop="spucode"
                                    label="spucode">
                            </el-table-column>
                            <el-table-column
                                    prop="productName"
                                    label="商品名称"
                                    >
                            </el-table-column>
                        </el-table>
                    </div>
                </el-form>
                <div style="text-align: center">
                    <el-button @click="addSure" type="primary">保存</el-button>
                </div>
            </el-dialog>
            <!--编辑弹框-->
            <el-dialog title="编辑优惠券" :visible.sync="dialogFormVisible1" top="5vh">
                <p class="redP">TIP:(1)优惠券可修改，修改前已领取的用户按原优惠券条件使用。</p>
                <p  class="redP">(2)优惠券页面链接地址/shopping/coupon.htm，运营人员可自由开放优惠券领取入口</p>
                <el-form v-loading="loading">
                    <el-form-item label="优惠券名称" :label-width="formLabelWidth">
                        <el-input v-model="name" auto-complete="off" class="inputs0"></el-input>
                    </el-form-item>
                    <el-form-item label="启用" :label-width="formLabelWidth">
                        <el-radio v-model="open" label="1"  disabled>
                            <span   style="font-size: 10px;color: red">启用后,此优惠券显示在优惠券领取页面,用户可主动领取也可后台发放;如不勾选则只能后台发</span>
                        </el-radio>
                    </el-form-item>
                    <el-form-item label="优惠券面额" :label-width="formLabelWidth">
                        <el-input v-model="denomination" auto-complete="off" class="inputs" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="开始领取时间" :label-width="formLabelWidth">
                        <el-date-picker
                                disabled
                                @change="startTimeChange"
                                v-model="startTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束领取时间" :label-width="formLabelWidth">
                        <el-date-picker
                                @change="endTimeChange"
                                v-model="endTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发放总量" :label-width="formLabelWidth">
                        <el-input v-model="totalIssued" auto-complete="off" class="inputs"></el-input>
                    </el-form-item>
                    <el-form-item label="限领张数" :label-width="formLabelWidth">
                        <el-input v-model="limitNum" auto-complete="off" class="inputs" disabled placeholder="每人"></el-input>
                        <span class="redP">每人领取张数(0表示不限制领取数量)</span>
                        <br>
                        <el-input v-model="limitNum2" auto-complete="off" class="inputs" disabled style="margin-top: 5px" placeholder="每天"></el-input>
                        <span class="redP">每天领取张数(0表示不限制领取数量)</span>
                    </el-form-item>
                    <el-form-item label="使用时间" :label-width="formLabelWidth">
                        <el-radio-group v-model="useTime" @change="useTimeChange" disabled>
                            <el-radio label="0">固定使用时间</el-radio>
                            <el-radio label="1">过期天数</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div v-if="isShow0">
                        <el-form-item label="优惠券可使用开始时间" :label-width="formLabelWidth">
                            <el-date-picker
                                    disabled
                                    @change="useStartTimeChange"
                                    v-model="useStartTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="优惠券可使用结束时间" :label-width="formLabelWidth">
                            <el-date-picker
                                    disabled
                                    @change="useEndTimeChange"
                                    v-model="useEndTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div  v-if="isShow1">
                        <el-form-item label=" " :label-width="formLabelWidth">
                            <el-input v-model="expiredDaysInput" auto-complete="off" class="inputs" disabled></el-input>
                            <span>天</span>
                        </el-form-item>
                    </div>
                    <el-form-item label="使用条件" :label-width="formLabelWidth">
                        <el-radio-group v-model="useCondition" @change="useConditionChange" disabled>
                            <el-radio label="0">不限制</el-radio>
                            <el-radio label="1">满额使用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div  v-show="isShow2">
                        <el-form-item label=" " :label-width="formLabelWidth">
                            <el-input v-model="limitMoneyInput" disabled auto-complete="off" class="inputs"></el-input>
                            <span>元</span>
                        </el-form-item>
                    </div>
                    <el-form-item label="礼包专用" :label-width="formLabelWidth">
                        <el-radio-group v-model="specialCoupon" @change="specialCouponChange" disabled>
                            <el-radio label="0">否</el-radio>
                            <el-radio label="1">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="商品范围" :label-width="formLabelWidth">
                        <el-radio-group v-model="commodityRange" @change="commodityRangeChange" disabled>
                            <el-radio label="0">全部商品</el-radio>
                            <el-radio label="1">指定商品</el-radio>
                            <el-radio label="2">指定类目</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!--<div v-show="isShow3">-->
                        <!--<el-form-item label="指定类目" :label-width="formLabelWidth">-->
                            <!--<el-checkbox-group v-model="assignClass" @change="assignClassChange">-->
                                <!--<el-checkbox   v-for="item in assignClassArr" :label="item.itemModuleId" :key="item.itemModuleId">{{item.itemModuleName}}</el-checkbox>-->
                            <!--</el-checkbox-group>-->
                        <!--</el-form-item>-->
                    <!--</div>-->
                </el-form>
                <div style="text-align: center">
                    <el-button @click="aditSure" type="primary">保存</el-button>
                </div>
            </el-dialog>
            <!--分页-->
            <div class="block">
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
                SPtableData:[],//add-列表
                ids:'',
                loading:false,
                discountName:'',//优惠券名称
                value1:'',//状态查询
                options1:[
                    {
                        value1: '',
                        label: '--请选择--'
                    },
                    {
                        value1: '1',
                        label: '已过期'
                    },
                    {
                        value1: '0',
                        label: '未过期'
                    }
                ],
                tableData: [],
                arr:[],//分页
                currentPage:1,
                formLabelWidth:'120px',
                dialogFormVisible:false,//添加优惠券
                dialogFormVisible1:false,//编辑
                isShow0:false,//固定使用时间显示
                isShow1:false,//过期天数显示
                isShow2:false,//使用条件显示
                isShow3:false,//指定类目显示
                isShow4:false,//指定商品上传
                name:'',//优惠券名字
                open:'',//是否启用
                denomination:'',//优惠券面额
                startTime:'',//开始领取时间
                endTime:'',//结束领取时间
                totalIssued:'',//发放总量
                limitNum:'',//限领张数1
                limitNum2:'',//限领张数2
                fixedTime:'',//固定使用时间
                expiredDays:'',//过期天数
                useTime:'',//使用时间
                useStartTime:'',//优惠券可使用开始时间
                useEndTime:'',//优惠券可使用结束时间
                expiredDaysInput:'',//过期时间input框
                useCondition:'',//使用条件
                limitMoneyInput:'',//满额使用input框
                specialCoupon:'',//特殊礼包
                commodityRange:'',//商品范围
                assignClass:[],//指定类目
                assignClassArr:[],//指定类目
                assignClassArrStr:'',
                commodityRange:'',
                useConditionVal:'',
                couponId:'',
            }
        },
        methods:{
            //清除条件
            clears(){
                this.discountName = '';
                this.value1 = '';
            },
            //文件上传
            handleSuccess(val){
                console.log(val);
                if(val.status==200){
                    this.isShow4 = true;
                    this.SPtableData = val.data;
                    let arr = [];
                    for(let i=0;i<val.data.length;i++){
                        arr.push(val.data[i].spucode)
                    }
//                    arr.unshift('commodity');
                    this.ids = arr.join(',');
                }else{
                    this.$message({
                        type:'error',
                        message:'202!'
                    })
                }

            },
            //编辑
            adit(row,index){
                console.log(row, index);
                this.couponId = row.couponId;
                this.dialogFormVisible1 = true;
                this.loading = true;
                this.$http.post(this.url+'/coupon/coupondetails',{couponId:row.couponId},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    this.loading = false;
                        this.name = res.data.data.couponName;//优惠券名字
                        this.denomination = res.data.data.couponAmount;//优惠券面额
                        this.startTime = this.formatDate1(res.data.data.releaseTime);//开始领取时间
                        this.endTime = this.formatDate1(res.data.data.terminalTime);//结束领取时间
                        this.totalIssued = res.data.data.quantity;//发放总量
                        this.limitNum = res.data.data.totalForUser;//每人限领数量
                        this.limitNum2 = res.data.data.recieveForDay;//每天领取数量
                        this.specialCoupon = res.data.data.specialCoupon.toString();//特殊礼包
                    //是否启用
                        if(res.data.data.showIt=='1'){
                            this.open  = '1';
                        }else{
                            this.open  = '';
                        };
                        if(res.data.data.useDate == null || res.data.data.outDate == null){
                                this.isShow1  = true;
                            this.isShow0 = false;
                                //过期天数
                                this.useTime = '1';
                                this.expiredDaysInput = res.data.data.day;
                        }else{
                            this.isShow0 = true;
                            this.isShow1  = false;
                            this.useTime = '0';
                            this.useStartTime = this.formatDate1(res.data.data.useDate);//优惠券开始使用时间
                            this.useEndTime = this.formatDate1(res.data.data.outDate);//优惠券结束使用时间
                        };
                        //限制使用条件
                        if(res.data.data.limit == '0'){
                            this.useCondition ='0';
                            this.isShow2 = false;
                        }else{
                            this.useCondition ='1';
                            this.isShow2 = true;
                            //满额
                            this.limitMoneyInput = res.data.data.useCondition;
                        };
//                        指定商品
                    let str=res.data.data.goods.substring(0,4);
                    console.log(str);
                    if(res.data.data.goods=='all'){
                        this.commodityRange = '0';
                        }else if(str=='item'){
                        this.commodityRange = '2';
                        console.log('00000');
                        this.isShow3 = false;
                        }else{
                        this.commodityRange = '1';
                        }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
            //编辑-sure
            aditSure(){
                if(this.name==''||this.endTime==''||this.totalIssued==''){
                    this.$message({
                        type:'warning',
                        message:'请完善内容!'
                    })
                }else{
                    this.$http.post(this.url+'/coupon/update_coupon',{
                        couponId:this.couponId,
                        couponName:this.name,
                        quantity:this.totalIssued,
                        terminalTime:this.endTime,
                    },{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.dialogFormVisible1 = false;
                            //刷新
                            this.ajax(this.currentPage,this.value1,this.discountName);
                            this.$message({
                                type:'success',
                                message:'编辑成功!'
                            })
                        }else{
                            this.$message({
                                type:'error',
                                message:'编辑失败!'
                            })
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    })
                }
            },
            //查询
            inquiry(){
                this.currentPage = 1;
                this.ajax(this.currentPage,this.value1,this.discountName);
            },
            //删除
            delet(row,index){
                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/coupon/del_coupon',{couponId:row.couponId},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                            //刷新
                            this.ajax(this.currentPage,this.value1,this.discountName);
                        }else{
                            this.$message({
                                type:'error',
                                message:'删除失败!'
                            });
                        }
                    });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                });
            },
            //添加优惠券
            add(){
                this.SPtableData = [];
                this.expiredDaysInput = '';
                this.dialogFormVisible = true;
                //清空
                this.name='';
                this.open='';
                this.denomination='';
                this.startTime='';
                this.endTime='';
                this.totalIssued='';
                this.limitNum='';
                this.limitNum2='';
                this.useTime='';
                this.useCondition='';
                this.commodityRange='';
                this.specialCoupon = '';
            },
            //添加-sure
            addSure(){
                if(this.name==''||this.denomination==''||this.startTime==''||this.endTime==''||this.totalIssued==''||this.limitNum==''||this.useTime==''||this.useCondition==''||this.commodityRange==''||this.limitNum2==''||this.specialCoupon==''){
                    this.$message({
                        type:'warning',
                        message:'请完善信息!'
                    });
                    console.log(this.commodityRange);
                }else{
                    console.log(this.SPtableData);
                    if((this.SPtableData.length==0||this.isShow4==false)&&(this.commodityRange=='1')){
                        this.$message({
                            type:'warning',
                            message:'请上传文件!'
                        });
                    }else{
                        //是否启用
                        let a;
                        if(this.open=='1'){
                            a=1;
                        }else {
                            a = 0
                        }
                        //使用条件
                        let useCondition;
                        if(this.useConditionVal=='0'){
                            useCondition = '0';
                        }else{
                            useCondition = this.limitMoneyInput;
                        }
                        //商品范围
                        let str;
                        let bools;
                        console.log(this.ids);
                        if(this.commodityRange=='0'){
                            str = 'all';
                            bools = '0'
                        }else if(this.commodityRange=='2'){
                            str='item,'+this.assignClass.join(',');
                            bools = '2'
                        }else{
                            str='commodity,'+this.ids;
                            bools = '1'
                        }

                        console.log(str);
                        //判断
                        if(this.useStartTime==undefined||this.useEndTime==undefined){
                            this.useEndTime='';
                            this.useStartTime='';
                        }
                        this.$http.post(this.url+'/coupon/add_coupon',{
                            couponName:this.name,//优惠券名字
                            couponAmount:this.denomination,//优惠券面额
                            releaseTime:this.startTime,//开始领取时间
                            terminalTime:this.endTime,//结束领取时间
                            showIt:a,//是否启用
                            quantity:this.totalIssued,//发放总量
                            totalForUser:this.limitNum,//每人限领数量
                            recieveForDay:this.limitNum2,//每天领取数量
                            useDate:this.useStartTime,//优惠券开始使用时间
                            outDate:this.useEndTime,//优惠券结束使用时间
                            limit:useCondition,//限制使用条件
                            day:this.expiredDaysInput,//过期天数
                            specialCoupon:this.specialCoupon,//礼包专用
                            goods:str,//指定商品
                            product:bools,
                        },{emulateJSON:true}).then(function (res) {
                            console.log(res);
                            if(res.data.status==200){
                                this.$message({
                                    type:'success',
                                    message:'添加成功!'
                                });
                                this.dialogFormVisible = false;
                                //刷新
                                this.ajax(this.currentPage,this.value1,this.discountName);
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
                        })
                    }
                }
            },
            //指定类目
            assignClassChange(val){
                console.log(val);
//                let a = val.join(',');
//                this.assignClassArrStr = a;
//                console.log(this.assignClass.join(','));
            },
            //特殊礼包
            specialCouponChange(val){
                console.log(val);
                this.specialCoupon = val;
            },
            //商品范围
            commodityRangeChange(val){
                console.log(val);
                this.commodityRange = val;
                console.log(val);
                if(val=='2'){
                    this.assignClass = [];
                    this.$http.post(this.url + '/itemModule/all_itemModule', {
                        moduleLevel: 1,
                    }, {emulateJSON: true}).then(function (res) {
                        this.assignClassArr = res.data.data;
                    });
                    this.isShow3 = true;
                    this.isShow4 = false;
                }else if(val=='0'){
                    this.isShow3 = false;
                    this.isShow4 = false;
                }else{
                    this.ids='';
                    this.isShow3 = false;
                }
            },
            //开始领取时间
            startTimeChange(val){
                console.log(val);
                this.startTime = val;
            },
            //结束领取时间
            endTimeChange(val){
                console.log(val);
                this.endTime = val;
            },
            //使用条件
            useConditionChange(val){
                console.log(val);
                this.useConditionVal = val;
                if(val=='0'){
                    this.isShow2 = false;
                    this.limitMoneyInput  ='';
                }else if(val=='1'){
                    this.isShow2 = true;
                }else{
                    this.isShow2 = false;
                    this.limitMoneyInput  ='';
                }
            },
            //使用时间
            useTimeChange(val){
                console.log(val);
                if(val=='0'){
                    this.isShow0 = true;
                    this.isShow1 = false;
                    this.expiredDaysInput = '';
                }else if(val=='1'){
                    this.isShow0 = false;
                    this.isShow1 = true;
                    this.useStartTime = '';
                    this.useEndTime = '';
                }else{
                    this.isShow0 = false;
                    this.isShow1 = false;
                }
//                this.useTime = val;
            },
            //优惠券可使用开始时间
            useStartTimeChange(val){
                console.log(val);
                this.useStartTime = val;
                console.log(this.useStartTime);
                console.log('00');
            },
            //优惠券可使用结束时间
            useEndTimeChange(val){
                console.log(val);
                this.useEndTime = val;
            },
            //添加优惠券包
            add2(){
              this.$router.push({
                  path:'/addCouponPackage',
              })
            },
            //分页
            handleCurrentChange(val){
                console.log(val);
                this.currentPage = val;
                this.ajax(this.currentPage,this.value1,this.discountName);
            },
            //事件戳转换
            add0(m) {
                return m < 10 ? '0' + m : m
            },
            formatDate(timestamp) {
                //timestamp是整数，否则要parseInt转换
                var time = new Date(timestamp);
                var y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm);
//                return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
            },
            formatDate1(timestamp) {
                //timestamp是整数，否则要parseInt转换
                var time = new Date(timestamp);
                var y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
            },
            //ajax
            ajax(a1,a2,a3){
                this.$http.post(this.url+'/coupon/all_coupon',{page:a1,num:10,nouse:a2,couponName:a3},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data.pageList==null){
                        this.tableData = [];
                        this.arr.length = 0;
                    }else{
                        for(let i=0;i<res.data.data.pageList.length;i++){
                            res.data.data.pageList[i].xuhao=i+1+10*(this.currentPage-1);
                            if(res.data.data.pageList[i].day==null|| res.data.data.pageList[i].day==''){
                                let start = this.formatDate(res.data.data.pageList[i].useDate);
                                let end =  this.formatDate(res.data.data.pageList[i].outDate);
                                res.data.data.pageList[i].validityPeriod='从'+start+'至'+end;
                            }else{
                                res.data.data.pageList[i].validityPeriod=res.data.data.pageList[i].day;
                            }
                        }
                        this.tableData = res.data.data.pageList;
                        this.arr.length = res.data.data.pageTotal;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
        },
        mounted(){
            this.ajax(1,'','');
        }
    }
</script>

<style scoped>
    .grid-content {
        display: flex;
        line-height: 36px;
    }
    .spans1 {
        width: 60px;
        font-size: 14px;
    }
    .spans0 {
        width: 140px;
        font-size: 14px;
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
    .redP{
        color: red;
      font-size: 14px;
    }
    .inputs{
        width: 190px;
    }
    .inputs0{
        width: 300px;
    }
</style>
