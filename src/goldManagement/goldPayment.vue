<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="5">
                <div class="flexs">
                    <span style="width: 80px">用户编码</span>
                    <el-input placeholder="请输入用户编码" v-model="userCode"></el-input>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="inquiry">查询</el-button>
            </el-col>
            <el-col :span="11">
                <el-button type="primary" @click="clears">清除条件</el-button>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="wholeCoin">批量发放金币</el-button>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="wholeCoupon">批量发放优惠券</el-button>
            </el-col>
        </el-row>
        <el-table
                :data="tableData"
                border
                style="width: 100%;margin: 8px 0px">
            <el-table-column
                    type="index"
                    label="序号"
                    width="99"
                   >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="买家名"
            >
                <template slot-scope="scope">
                    <div style="display: flex;align-items: center;margin: 5px 0">
                        <img :src="scope.row.headimgurl" alt="用户头像" style="width: 50px;height: 50px;">
                        <span>{{scope.row.nickname}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="releaseCoin(scope.row)">发放金币</el-button>
                    <span>|</span>
                    <el-button type="text" @click="releaseCoupon(scope.row)">发放优惠券</el-button>
                    <span>|</span>
                    <el-button type="text" @click="viewLog(scope.row)">查看日志</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <!--<div class="block">-->
            <!--<el-pagination-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page="currentPage"-->
                    <!--:page-sizes="[10]"-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                    <!--:total="arr.length">-->
            <!--</el-pagination>-->
        <!--</div>-->
        <!--批量发放金币弹框-->
        <el-dialog title="批量发放金币" :visible.sync="dialogFormVisible1">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="批量发放金币" prop="name">
                    <div>
                        <el-upload
                                class="upload"
                                action="string"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                :with-credentials="true"
                                :http-request="myupdate"
                                :show-file-list="false"
                                :multiple="false"
                                :limit="1"
                                :file-list="fileList">
                            <el-button  type="primary">点击上传</el-button>
                            <span v-if="temp.file">{{temp.file.name}}</span>
                        </el-upload>
                        <div style="text-align: right;margin-top: 15px">
                            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                            <el-button  type="primary" @click="mineUpload">发 送</el-button>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--批量发放优惠券-->
        <el-dialog title="批量发放优惠券" :visible.sync="dialogFormVisible2">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="优惠券名称" prop="name">
                    <el-select v-model="ruleForm2.name" placeholder=" ":clearable="clearable">
                        <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="批量发放优惠券">
                    <div>
                        <el-upload
                                class="upload"
                                action="string"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                :with-credentials="true"
                                :http-request="myupdate2"
                                :show-file-list="false"
                                :multiple="false"
                                :limit="1"
                                :file-list="fileList2">
                            <el-button  type="primary">点击上传</el-button>
                            <span v-if="temp2.file">{{temp2.file.name}}</span>
                        </el-upload>
                        <div style="text-align: right;margin-top: 15px">
                            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                            <el-button  type="primary" @click="mineUpload2('ruleForm2')">发 送</el-button>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--发放金币弹框-->
        <el-dialog title="发放金币" :visible.sync="dialogFormVisible3">
            <el-form :model="ruleForm3" :rules="rules3" ref="ruleForm3" label-width="100px" class="demo-ruleForm">
                <el-form-item label="虚拟币总额">
                    <span><span style="font-size: 14px;color: blue">{{ruleForm3.money}}</span>元</span>
                </el-form-item>
                <el-form-item label="发放金币数量" prop="num">
                    <el-input placeholder="请输入发放金币数量" class="inputs" v-model="ruleForm3.num"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input placeholder="请输入备注" class="inputs" v-model="ruleForm3.remark" type="textarea"></el-input>
                </el-form-item>
                <div style="text-align: right">
                    <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                    <el-button type="primary" @click="sure3('ruleForm3')">保 存</el-button>
                </div>
            </el-form>
        </el-dialog>
        <!--发放优惠券弹框-->
        <el-dialog title="发放优惠券" :visible.sync="dialogFormVisible4">
            <el-form :model="ruleForm4" :rules="rules4" ref="ruleForm4" label-width="100px" class="demo-ruleForm">
                <el-form-item label="优惠券名称" prop="name">
                    <el-select v-model="ruleForm4.name" :clearable="clearable">
                        <el-option
                                v-for="item in options4"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                        </el-option>
                    </el-select>
                </el-form-item>
                <div style="text-align: right">
                    <el-button @click="dialogFormVisible4 = false">取 消</el-button>
                    <el-button type="primary" @click="sure4('ruleForm4')">保 存</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    export default {
        data() {
            return {
                clearable:true,
                loading: false,
                tableData: [],
                userCode: '',//用户编码
                dialogFormVisible1: false,//批量发放金币
                dialogFormVisible2: false,//批量发放金优惠券
                dialogFormVisible3: false,//发放金币
                dialogFormVisible4: false,//发放优惠券
                ruleForm2: {name: ''},//批量发放金优惠券
                rules2: {
                    name: [{required: true, message: '请输入优惠券名称', trigger: 'change'}]
                },
                ruleForm3: {num: '',money:'',remark:''},//发放金币
                rules3: {
                    num: [{required: true, message: '请输入发放金币数量', trigger: 'blur'}, {
                        pattern: /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/,
                        message: '数字类型为 : 最多小数点后两位!'
                    }]
                },
                ruleForm4: {name:''},//发放优惠券
                rules4: {
                    name: [{required: true, message: '请选择优惠券', trigger: 'blur'}]
                },
                options4:[],
                options2:[],
                row3:{},
                row4:{},
                fileList: [],//批量金币发放-上传图片
                temp: {}, // 批量金币发放-上传图片
                fileList2: [],//批量优惠券发放-上传图片
                temp2: {}, // 批量优惠券发放-上传图片
            }
        },
        methods: {
            //批量金币发放
            myupdate(item) {
                this.fileList = [];
                console.log(item);
                this.temp = item;
                console.log(this.temp);
                console.log(this.fileList);
            },
            mineUpload() {
                console.log(this.temp.file);
                if(this.temp.file==undefined){
                    this.$message({
                        type: 'warning',
                        message: '请上传文件!'
                    });
                }else{
                    let item = this.temp;
                    let formData = new FormData();
                    formData.append('file', item.file);
                    this.$http.post(this.url+'/upload/gold_issue', formData).then(function (res) {
                        if (res.data.status === 200) {
//                            this.userInfo.img = res.data.url;
//                            this.userInfo.fileList = [];
                            this.dialogFormVisible1 = false;
                            this.$message({
                                type: 'success',
                                message: '发放金币成功!'
                            });
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    }, err => {
                        this.$message({
                            type: 'error',
                            message: '上传服务中断，稍后再试试'
                        });
                    });
                }
            },
            //批量优惠券发放
            myupdate2(item) {
                this.fileList2 = [];
                this.temp2 = item;
            },
            mineUpload2(ruleForm2) {
                if(this.ruleForm2.name == ' '){
                    this.ruleForm2.name='';
                }else{
                    this.$refs[ruleForm2].validate((valid) => {
                        if (valid) {
                            if(this.temp2.file==undefined){
                                this.$message({
                                    type: 'warning',
                                    message: '请上传文件!'
                                });
                            }else{
                                let item = this.temp2;
                                let formData = new FormData();
                                formData.append('file', item.file);
                                this.$http.post(this.url+'/upload/coupon_issue?couponId='+this.ruleForm2.name, formData).then(function (res) {
                                    if (res.status === 200) {
//                                        this.userInfo.img = res.data.url;
//                                        this.userInfo.fileList = [];
                                        this.dialogFormVisible2 = false;
                                        this.$message({
                                            type: 'success',
                                            message: '发放优惠券成功'
                                        });

                                    } else {
                                        this.$message.error(res.data.msg);
                                    }
                                }, err => {
                                    this.$message({
                                        type: 'error',
                                        message: '上传服务中断，稍后再试试'
                                    });
                                });
                            }
                        } else {
                            return false;
                        }
                    });
                }

            },
            //查询
            inquiry(){
                this.ajax();
            },
            //清除条件
            clears() {
                this.userCode = '';
            },
            //批量发放金币
            wholeCoin() {
                this.temp = {};
                this.dialogFormVisible1 = true;
            },
            //批量发放优惠券
            wholeCoupon() {
                this.loading = false;
                this.ruleForm2.name = ' ';
                this.temp2 = '';
                this.dialogFormVisible2 = true;
                //查询优惠券
                this.$http.post(this.url+'/coupon/allCoupons',{},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data==null){

                    }else{
                        for(let i=0;i<res.data.length;i++){
                            let obj = {};
                            obj.label = res.data[i].couponName;
                            obj.value = res.data[i].couponId;
                            this.options2.push(obj);
                        }
                    }
                })
            },
            //查看日志
            viewLog(row){
              this.$router.push({path:'/viewLog',query:{row:row}})
            },
            //发放-优惠券
            release2(ruleForm2) {
                this.$refs[ruleForm2].validate((valid) => {
                    if (valid) {

                    } else {
                        return false;
                    }
                });
            },
            //发放金币弹框
            releaseCoin(row) {
                console.log(row);
                this.row3 = row;
                this.dialogFormVisible3 = true;
                this.ruleForm3.money = row.goldNumber;
                this.ruleForm3.num = '';
                this.ruleForm3.remark = '';
            },
            //发放金币-sure
            sure3(ruleForm3) {
                this.$refs[ruleForm3].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url+'/gold/single_grant',{userId:this.row3.userId,currentAmount:this.row3.goldNumber,goldAmount:this.ruleForm3.num,issueDeductReason:this.ruleForm3.remark},{emulateJSON:true}).then(function (res) {
                            if(res.data.status==200){
                                this.$message({type:'success',message:'操作成功!'})
                                this.dialogFormVisible3 = false;
                            }else{
                                this.$message({type:'warning',message:res.data.msg})
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //发放优惠券
            releaseCoupon(row){
                this.row4 = row;
                this.ruleForm4.name = '';
                this.dialogFormVisible4 = true;
                this.options4 = [];
                //查询优惠券
                this.$http.post(this.url+'/coupon/allCoupons',{},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data==null){

                    }else{
                        for(let i=0;i<res.data.length;i++){
                            let obj = {};
                            obj.label = res.data[i].couponName;
                            obj.value = res.data[i].couponId;
                            this.options4.push(obj);
                        }
                    }
                })

            },
            //发放优惠券-sure
            sure4(ruleForm4){
                this.$refs[ruleForm4].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url+'/coupon/single_grant',{userId:this.row4.userId,couponId:this.ruleForm4.name},{emulateJSON:true}).then(function (res) {
                            if(res.data.status==200){
                                this.$message({type:'success',message:'操作成功!'})
                                this.dialogFormVisible4 = false;
                            }else{
                                this.$message({type:'warning',message:res.data.msg})
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //ajax
            ajax(){
                this.$http.post(this.url+'/user/getUserInfo',{userId:this.userCode},{emulateJSON:true}).then(function (res) {
                    this.tableData = [];
                    console.log(res);
                    if(res.data.data==null){
                        this.$message({type:'warning',message:res.data.msg});
                    }else{
                        this.tableData.push(res.data.data);
                        console.log(this.tableData);
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .flexs {
        display: flex;
        align-items: center;
    }

    .block {
        text-align: right;
    }

    .inputs {
        width: 300px;
    }

    .redP {
        color: red;
    }
</style>
