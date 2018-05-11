<template>
    <div>
        <div>
            <el-button type="primary" @click="add">添加金币池</el-button>
            <!--<el-button type="primary" @click="viewGoldLog">查看金币发放日志</el-button>-->
        </div>
        <div>
            <el-table
                    :data="tableData"
                    border
                    max-height="500"
                    style="width: 100%;margin-top: 8px">
                <el-table-column
                        type="index"
                        label="序号"
                        width="88">
                </el-table-column>
                <el-table-column
                        prop="goldPoolName"
                        label="金币池名称"
                >
                </el-table-column>
                <el-table-column
                        prop="goldBalances"
                        label="余额">
                </el-table-column>
                <el-table-column
                        prop="gmtCreate"
                        label="创建时间">
                    <template slot-scope="scope">
                        <p v-show="scope.row.gmtCreate==null||scope.row.gmtCreate==''?false:true">{{scope.row.gmtCreate | time}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="isEnable"
                        label="状态">
                    <template slot-scope="scope">
                        <p v-show="scope.row.isEnable==0?true:false" class="redP">禁用</p>
                        <p v-show="scope.row.isEnable==1?true:false" class="blueP">启用</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operate"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="adit(scope.row,scope.$index)">编辑</el-button>
                        <span>|</span>
                        <el-button type="text" @click="disabled(scope.row,scope.$index)" v-show="scope.row.isEnable==1?true:false">禁用</el-button>
                        <span> </span>
                        <el-button type="text" @click="open(scope.row,scope.$index)" v-show="scope.row.isEnable==0?true:false">启用</el-button>
                        <span>|</span>
                        <el-button type="text" @click="fillings(scope.row,scope.$index)" v-show="scope.row.isEnable==1?true:false">填充</el-button>
                        <span v-show="scope.row.isEnable==1?true:false">|</span>
                        <el-button type="text"  @click="fillLog(scope.row,scope.$index)">填充日志</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <!--add弹框-->
            <el-dialog title="添加金币池" :visible.sync="dialogFormVisible1">
                <el-form :model="form1" ref="form1" :rules="rules1">
                    <el-form-item label="金币池名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form1.name" auto-complete="off" class="inputs"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: right">
                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="sure1('form1')">确 定</el-button>
                </div>
            </el-dialog>
            <!--adit弹框-->
            <el-dialog title="编辑金币池" :visible.sync="dialogFormVisible2">
                <el-form :model="form2" ref="form2" :rules="rules2">
                    <el-form-item label="金币池名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form2.name" auto-complete="off" class="inputs"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: right">
                    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="sure2('form2')">确 定</el-button>
                </div>
            </el-dialog>
            <!--填充弹框-->
            <el-dialog title="填充金币池" :visible.sync="dialogFormVisible3">
                <el-form :model="form3" ref="form3" :rules="rules3">
                    <el-form-item label="补充数量" :label-width="formLabelWidth" prop="num">
                        <el-input v-model="form3.num"  auto-complete="off" class="inputs"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: right">
                    <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                    <el-button type="primary" @click="sure3('form3')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        data() {
            return {
                tableData:[],
                goldPoolId:'',
                goldPoolId3:'',
                dialogFormVisible1:false,//添加金币池
                dialogFormVisible2:false,//编辑金币池
                dialogFormVisible3:false,//填充金币池
                formLabelWidth:'120px',
                form1:{name:''},//添加
                form2:{name:''},//编辑
                form3:{num:''},//填充
                rules1:{ name: [{ required: true, message: '请输入金币池名称', trigger: 'blur' }]},
                rules2:{ name: [{ required: true, message: '请输入金币池名称', trigger: 'blur' }]},
                rules3:{ num: [{  required: true,message: '请输入补充数量', trigger: 'blur' },
                    { pattern: /^(\-)*(\d+)\.(\d\d).*$/, message: '数字类型为小数点后两位!' }
                    ]},
            };

        },
        methods: {
            //查看金币日志
//            viewGoldLog(){
//              this.$router.push({
//                  path:'/viewGoldLog',
//              })
//            },
            //添加
            add(){
                this.form1.name = '';
                this.dialogFormVisible1 = true;
            },
            //添加-sure
            sure1(form1){
                this.$refs[form1].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url+'/goldPool/add_pool',{goldPoolName:this.form1.name},{emulateJSON:true}).then(function (res) {
                            console.log(res);
                            if(res.data.status==200){
                                this.$message({type:'success',message:'添加成功!'});
                                this.dialogFormVisible1 = false;
                                //刷新
                                this.ajax();
                            }else{
                                this.$message({type:'error',message:res.data.msg});
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //编辑
            adit(row,index){
                this.goldPoolId = row.goldPoolId;
                this.form2.name = '';
                this.form2.name  = row.goldPoolName;
                this.dialogFormVisible2 = true;
            },
            //编辑-sure
            sure2(form2){
                this.$refs[form2].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url+'/goldPool/update_pool',{goldPoolId:this.goldPoolId,goldPoolName:this.form2.name},{emulateJSON:true}).then(function (res) {
                            console.log(res);
                            if(res.data.status==200){
                                this.$message({type:'success',message:'编辑成功!'});
                                this.dialogFormVisible2 = false;
                                //刷新
                                this.ajax();
                            }else{
                                this.$message({type:'error',message:res.data.msg});
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //禁用
            disabled(row,index){
                this.$confirm('确定禁用?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/goldPool/enable_pool',{goldPoolId:row.goldPoolId,isEnable:0},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({type:'success',message:'操作成功!'});
                            //刷新
                            this.ajax();
                        }else{
                            this.$message({type:'error',message:'操作失败!'});
                        }
                    })
                }).catch(() => {

                });
            },
            //启用
            open(row,index){
                this.$confirm('确定启用?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/goldPool/enable_pool',{goldPoolId:row.goldPoolId,isEnable:1},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({type:'success',message:'操作成功!'});
                            //刷新
                            this.ajax();
                        }else{
                            this.$message({type:'error',message:'操作失败!'});
                        }
                    })
                }).catch(() => {

                });
            },
            //填充
            fillings(row,index){
                this.goldPoolId3 = row.goldPoolId;
                this.form3.num = '';
                console.log(this.form3.num);
                this.dialogFormVisible3 = true;
            },
            //填充-sure
            sure3(form3){
                this.$refs[form3].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url+'/goldPool/filling_data',{goldPoolId:this.goldPoolId3,goldBalance:this.form3.num},{emulateJSON:true}).then(function (res) {
                            console.log(res);
                            if(res.data.status==200){
                                this.$message({type:'success',message:'操作成功!'});
                                this.dialogFormVisible3 = false;
                                //刷新
                                this.ajax();
                            }else{
                                this.$message({type:'error',message:res.data.status});
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //填充日志
            fillLog(row,index){
              this.$router.push({
                  path:'/fillLog',
                  query:{row:row}
              })
            },
            //ajax
            ajax(){
                this.$http.post(this.url+'/goldPool/all_pool',{},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null){
                        this.tableData = [];
                    }else{
                        this.tableData = res.data.data;
                    }
                })
            },
        },
        mounted(){
            this.ajax();
        }

    }
</script>

<style scoped>
.inputs{
    width: 300px;
}
    .redP{
        color: red;
    }
.blueP{
    color: blue;
}
</style>
