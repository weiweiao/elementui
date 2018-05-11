<template>
    <!--返利-->
   <div>
       <el-button @click="add">添加</el-button>
       <el-table
               :data="tableData"
               border
               class="table"
               style="width: 100%"
               max-height="480"
       >
           <el-table-column
                   type="index"
                   label="序号"
                   width="88">
           </el-table-column>
           <el-table-column
                   prop="levelName"
                   label="级别名称"
                   width="180">
           </el-table-column>
           <el-table-column
                   prop="rebateProportion"
                   label="利润">
           </el-table-column>
           <el-table-column
                   prop="gmtCreate"
                   label="创建时间	">
               <template slot-scope="scope">
                   {{scope.row.gmtCreate | time}}
               </template>
           </el-table-column>
           <el-table-column
                   prop="operate"
                   label="操作">
               <template slot-scope="scope">
                   <el-button type="text" @click="adit(scope.row,scope.$index)">编辑</el-button>
                   <span>|</span>
                   <el-button type="text" @click="checkLog(scope.row,scope.$index)">查看日志</el-button>  <span>|</span>
                   <el-button type="text" @click="delet(scope.row,scope.$index)">删除</el-button>
               </template>
           </el-table-column>
       </el-table>
       <!--添加弹框-->
       <el-dialog title="添加返利级别" :visible.sync="dialogFormVisible">
           <el-form :model="form" :rules="rules" ref="form">
               <el-form-item label="级别" :label-width="formLabelWidth" prop="level">
                   <el-input v-model="form.level" auto-complete="off" class="inputs"></el-input>
               </el-form-item>
               <el-form-item label="利润" :label-width="formLabelWidth" prop="profit">
                   <el-input v-model="form.profit" auto-complete="off" class="inputs"></el-input>
                   <span class="redP">(注意 : 只能填写小数)</span>
               </el-form-item>
               <el-form-item label="" :label-width="formLabelWidth">
                   <el-button type="primary" @click="sure('form')">确 定</el-button>
               </el-form-item>
           </el-form>
       </el-dialog>
       <!--编辑弹框-->
       <el-dialog title="编辑利润" :visible.sync="dialogFormVisible1">
           <el-form :model="form1" :rules="rules1" ref="form1">
               <el-form-item label="利润" :label-width="formLabelWidth" prop="profit">
                   <el-input v-model="form1.profit" auto-complete="off" class="inputs"></el-input>
                   <span class="redP">(注意 : 只能填写小数)</span>
               </el-form-item>
               <el-form-item label="" :label-width="formLabelWidth">
                   <el-button type="primary" @click="sure1('form1')">确 定</el-button>
               </el-form-item>
           </el-form>
       </el-dialog>
   </div>
</template>


<script>
    export default {
        data() {
            return {
                tableData:[],
                dialogFormVisible:false,//添加弹框
                dialogFormVisible1:false,//编辑弹框
                formLabelWidth:'100px',
                form:{
                    level:'',
                    profit:'',
                },
                rules: {
                    level: [
                        {required: true, message: '请输入级别', trigger: 'blur'},
//                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    profit: [
                        {required: true, message: '请输入利润', trigger: 'blur'},
                    ],
                },
                form1:{
                    profit:'',
                },//编辑
                rules1: {
                    profit: [
                        {required: true, message: '请输入利润', trigger: 'blur'},
                    ],
                },
                rows:{},
            }

        },
        methods: {
//            添加
            add(){
                this.form.level = '';
                this.form.profit = '';
                this.dialogFormVisible = true;
            },
            sure(form){
                this.$http.post(this.url+'/profitLevel/confirm_profitLevel',{levelName:this.form.level},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        this.$refs[form].validate((valid) => {
                            if (valid) {
                                this.$http.post(this.url+'/profitLevel/add_profitLevel',{levelName:this.form.level,rebateProportion:this.form.profit},{emulateJSON:true}).then(function (res) {
                                    console.log(res);
                                    if(res.data.status==200){
                                        this.$message({
                                            type:'success',
                                            message:'添加成功!'
                                        })
//                                刷新当前页
                                        this.ajax();
                                    }else{
                                        this.$message({
                                            type:'error',
                                            message:'添加失败!'
                                        })
                                    }
                                    this.dialogFormVisible = false;
                                },function (err) {
                                    this.$message({
                                        type:'error',
                                        message:'服务器连接中断,请联系后台人员!',
                                    });
                                })
                            } else {
                                return false;
                            }
                        });
                    }else{
                        this.$message({
                            type:'warning',
                            message:'该级别已存在,请重新填写!'
                        })
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
//            编辑
            adit(row,index){
                console.log(row, index);
                this.rows = row;
                this.form1.profit = row.rebateProportion.toString();
                this.dialogFormVisible1 = true;
            },
            sure1(form1){
                this.$refs[form1].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url+'/profitLevel/update_profitLevel',{profitLevelId:this.rows.profitLevelId,rebateProportion:this.form1.profit},{emulateJSON:true}).then(function (res) {
                            console.log(res);
                            if(res.data.status==200){
                                this.$message({
                                    type:'success',
                                    message:'编辑成功!'
                                })
//                                刷新当前页
                                this.ajax();
                            }else{
                                this.$message({
                                    type:'error',
                                    message:'编辑失败!'
                                })
                            }
                            this.dialogFormVisible1 = false;
                        },function (err) {
                            this.$message({
                                type:'error',
                                message:'服务器连接中断,请联系后台人员!',
                            });
                        })
                    } else {
                        return false;
                    }
                });
            },
//            删除
            delet(row,index){
                console.log(row, index);
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/profitLevel/delete_profitLevel',{profitLevelId:row.profitLevelId},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
//                                刷新当前页
                            this.ajax();
                        }else{
                            this.$message({
                                type:'error',
                                message:'删除失败!'
                            })
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    })
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                });
            },
//            查看日志
            checkLog(row,index){
                this.$message({
                    type:'warning',
                    message:'此功能暂时无'
                })
            },
//            ajax
            ajax(){
                this.$http.post(this.url+'/profitLevel/all_profitLevel',{},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data==null||res.data.data==null){
                        this.tableData = [];
                    }else{
                        this.tableData = res.data.data;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
        },
        mounted() {
            this.ajax();
        },
    }
</script>

<style scoped>
    .inputs{
        width: 300px;
    }
    .table{
        margin-top: 10px;
    }
    .redP{
        color: red;
    }
</style>
