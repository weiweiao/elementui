<template>
    <!--返利-->
    <div class="rebate">
        <div>
            <!--<el-button @click="add">添加利润级别</el-button>-->
            <!--<el-dialog title="添加利润级别" :visible.sync="dialogFormVisible0" top="5vh">-->
                <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
                    <!--<el-form-item label="返利编码" prop="grade">-->
                        <!--<el-input v-model="ruleForm.grade" class="inputs"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="基础比例" prop="profit">-->
                        <!--<el-input v-model="ruleForm.profit" class="inputs"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<div>-->
                        <!--<p>创业店</p>-->
                        <!--<el-form-item label="一级比例" prop="Cyijibili">-->
                            <!--<el-input v-model="ruleForm.Cyijibili"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="备注" prop="Cyijibeizhu">-->
                            <!--<el-input v-model="ruleForm.Cyijibeizhu"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="二级比例" prop="Cerjibili">-->
                            <!--<el-input v-model="ruleForm.Cerjibili"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="备注" prop="Cerjibeizhu">-->
                            <!--<el-input v-model="ruleForm.Cerjibeizhu"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</div>-->
                    <!--<div>-->
                        <!--粉丝店-->
                        <!--<el-form-item label="一级比例" prop="Fyijibili">-->
                            <!--<el-input v-model="ruleForm.Fyijibili"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="备注" prop="Fyijibeizhu">-->
                            <!--<el-input v-model="ruleForm.Fyijibeizhu"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="二级比例" prop="Ferjibili">-->
                            <!--<el-input v-model="ruleForm.Ferjibili"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="备注" prop="Ferjibeizhu">-->
                            <!--<el-input v-model="ruleForm.Ferjibeizhu"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</div>-->
                    <!--<el-form-item>-->
                        <!--&lt;!&ndash;el-button在执行@click时 带有validate属性时 需要在外面加上el-form-item 否则不识别&ndash;&gt;-->
                        <!--<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>-->
                    <!--</el-form-item>-->
                <!--</el-form>-->
            <!--</el-dialog>-->
            <!--table-->
            <p style="font-size: 16px;color:#48576a">高级返利</p>
            <el-table
                    :data="tableData3"
                    border
                    style="width: 100%"
                    max-height="500">
                <el-table-column
                        prop="xuhao"
                        label="序号"
                        width="80px"
                >
                </el-table-column>
                <el-table-column
                        prop="rebateCode"
                        label="返利编码"
                >
                </el-table-column>
                <el-table-column
                        prop="rebateLevel"
                        label="返利层级"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="rebateObject"
                        label="返利对象"
                >
                </el-table-column>
                <el-table-column
                        prop="rebateRemark"
                        label="说明"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        prop="rebateVariable"
                        label="返利变量值"
                >
                </el-table-column>
                <el-table-column
                        prop="gmtCreate"
                        label="创建时间"
                        width="160"
                >
                    <template slot-scope="scope">
                        {{scope.row.gmtCreate | time}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operate"
                        label="操作"
                        width="160px"
                >
                    <template scope="scope">
                        <el-button type="text" size="small" @click="adit(scope.row,scope.$index)">编辑</el-button>
                        <span>|</span>
                        <el-button type="text" size="small" @click="checkLog(scope.row,scope.$index)">查看日志</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--编辑弹框-->
            <el-dialog title="编辑" :visible.sync="dialogFormVisible">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="返利变量值" :label-width="formLabelWidth" prop="rebateVariable">
                        <el-input v-model="form.rebateVariable" auto-complete="off" class="inputs"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="基础比例" :label-width="formLabelWidth" prop="rebateProportion">-->
                        <!--<el-input v-model="form.rebateProportion" auto-complete="off" class="inputs"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="" :label-width="formLabelWidth">
                        <el-button type="primary" @click="sure('form')">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                isShow: true,
                tableData3: [{}],
                formLabelWidth: '120px',
                //添加
                dialogFormVisible0: false,
                ruleForm: {
                    grade: '',
                    profit: '',
                    Cyijibili: '',
                    Cerjibili: '',
                    Cyijibeizhu: '',
                    Cerjibeizhu: '',
                    Fyijibili: '',
                    Ferjibili: '',
                    Fyijibeizhu: '',
                    Ferjibeizhu: ''
                },
                rules: {
                    grade: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                    profit: [
                        {required: true, message: '请输入基础比例', trigger: 'blur'}
                    ],
                    Cyijibili: [
                        {required: true, message: '请输入一级比例', trigger: 'blur'}
                    ],
                    Cerjibili: [
                        {required: true, message: '请输入二级比例', trigger: 'blur'}
                    ],
                    Fyijibili: [
                        {required: true, message: '请输入一级比例', trigger: 'blur'}
                    ],
                    Ferjibili: [
                        {required: true, message: '请输入二级比例', trigger: 'blur'}
                    ]

                },
                //编辑
                form: {
                    rebateVariable: '',
//                    rebateProportion:'',
                },
                rules:{
                    rebateVariable:[ {required: true, message: '请输入返利变量值', trigger: 'blur'},],
//                    rebateProportion:[ {required: true, message: '请输入基础比例', trigger: 'blur'},],
                },
                dialogFormVisible: false,
                rebateId: Number,//编辑
                rebateCode:'',//编辑
            }

        },
        methods: {
            //add-sure
//            submitForm(formName) {
//                this.$refs[formName].validate((valid) => {
//                    if (valid) {
//                        this.$http.post(this.url + '/saleRebate/add_saleRebate', {
//                            rebateCode: this.ruleForm.grade,
//                            rebateProportion: this.ruleForm.profit,
//                            nFirstRebateVariable: this.ruleForm.Cyijibili,
//                            nFirstRemark: this.ruleForm.Cyijibeizhu,
//                            nSecondRebateVariable: this.ruleForm.Cerjibili,
//                            nSecondRemark: this.ruleForm.Cerjibeizhu,
//                            fFirstRebateVariable: this.ruleForm.Fyijibili,
//                            fFirstRemark: this.ruleForm.Fyijibeizhu,
//                            fSecondRebateVariable: this.ruleForm.Ferjibili,
//                            fSecondRemark: this.ruleForm.Ferjibeizhu,
//                        }, {emulateJSON: true}).then(function (res) {
//                            if (res.data.status == 200) {
//                                this.ajax(this.currentPage, 12);
//                                this.$message({
//                                    type: 'success',
//                                    message: '添加成功!'
//                                });
//                                this.dialogFormVisible0 = false;
//                            } else if (res.data.status == 201) {
//                                this.$message({
//                                    type: 'warning',
//                                    message: '返利编码重复!'
//                                });
//                            } else {
//                                this.$message({
//                                    type: 'error',
//                                    message: '添加失败!'
//                                });
//                            }
//                        });
//                    } else {
//                        return false;
//                    }
//                });
//            },
//            add() {
//                this.ruleForm.grade='',
//                    this.ruleForm.profit='',
//                    this.ruleForm.Cyijibili='',
//                    this.ruleForm.Cyijibeizhu='',
//                    this.ruleForm.Cerjibili='',
//                    this.ruleForm.Cerjibeizhu='',
//                    this.ruleForm.Fyijibili='',
//                    this.ruleForm.Fyijibeizhu='',
//                    this.ruleForm.Ferjibili='',
//                    this.ruleForm.Ferjibeizhu='',
//                    this.dialogFormVisible0 = true;
//            },
            //编辑
            adit(rows, index) {
                console.log(rows, index);
                this.rebateId = rows.rebateId;
                this.rebateCode = rows.rebateCode;
                this.form.rebateVariable = rows.rebateVariable.toString();
//                this.form.rebateProportion = rows.rebateProportion.toString();
                this.dialogFormVisible = true;
            },
            //编辑-sure
            sure(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url + '/saleRebates/update_saleRebates', {
                            rebateId: this.rebateId,
                            rebateVariable: this.form.rebateVariable,
//                            rebateProportion: this.form.rebateProportion,
//                            rebateCode:this.rebateCode
                        }, {emualateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功!'
                                });
                                this.dialogFormVisible = false;
                                this.ajax(1, 100);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '编辑失败!'
                                });
                            }
                        },function (err) {
                            this.$message({
                                type:'error',
                                message:'服务器连接中断,请联系后台人员!',
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            //查看日志
            checkLog(row,index){
              this.$message({
                  type:'warning',
                  message:'此功能暂时无!'
              })
            },
            //ajax
            ajax(a, b) {
                this.$http.post(this.url + '/saleRebates/all_saleRebates', {
                    page: a,
                    num: b
                }, {emulateJSON: true}).then(function (res) {
                    if(res.data.data==null){
                        this.tableData3=[];
                    }else{
                        for (let i = 0; i < res.data.data.length; i++) {
                            res.data.data[i].xuhao = i + 1;
                            if (res.data.data[i].rebateObject == 'ULTIMATE') {
                                res.data.data[i].rebateObject = '旗舰店';
                            } else if (res.data.data[i].rebateObject == 'NORMAL') {
                                res.data.data[i].rebateObject = '全球黑卡';
                            } else if(res.data.data[i].rebateObject == 'MANAGER'){
                                res.data.data[i].rebateObject = '大客户经理';
                            }else if(res.data.data[i].rebateObject == 'FANS'){
                                res.data.data[i].rebateObject = '全球金卡';
                            }else if(res.data.data[i].rebateObject == '688NORMAL'){
                                res.data.data[i].rebateObject = '688会员店';
                            }else if(res.data.data[i].rebateObject == 'EXPERIENCE'){
                                res.data.data[i].rebateObject = '体验会员';
                            }else{
                                res.data.data[i].rebateObject = '';
                            }
                        }
                        this.tableData3 = res.data.data;
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
            this.ajax(1,100);
        },
    }
</script>

<style scoped>
    .el-table {
        margin: 10px 0;
    }

    .add {
        width: 400px;
    }

    .block {
        text-align: right;
    }
    .inputs{
        width: 300px;
    }
</style>
