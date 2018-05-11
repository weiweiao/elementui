<template>
    <!--原产地-->
    <div class="origin-place">
        <div>
            <el-button @click="add">添加原产地</el-button>
            <el-dialog title="添加原产地" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="原产地" :label-width="formLabelWidth">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center">
                    <el-button type="primary" @click="sure">确 定</el-button>
                </div>
            </el-dialog>
            <!--table-->
            <el-table
                    :data="tableData3"
                    border
                    style="width: 100%"
                    max-height="480">
                <el-table-column
                        type="index"
                        label="序号"
                        width="120px"
                >
                </el-table-column>
                <el-table-column
                        prop="countryName"
                        label="原产地"
                >
                </el-table-column>
                <el-table-column
                        prop="operate"
                        label="操作"
                >
                    <template scope="scope">
                        <el-button type="text" size="small" @click="adit(scope.row,scope.$index)">编辑</el-button>
                        <span>|</span>
                        <el-button type="text" size="small" @click="delete0(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="编辑原产地" :visible.sync="dialogFormVisible1">
                <el-form :model="form1">
                    <el-form-item label="原产地" :label-width="formLabelWidth">
                        <el-input v-model="form1.name" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center">
                    <el-button type="primary" @click="sure1">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script type="text/javascript">
    export default {
        data() {
            return {
                tableData3: [],
                formLabelWidth: '120px',
                dialogFormVisible: false,//添加
                form: {
                    name: '',
                },
                dialogFormVisible1: false,//编辑
                form1: {
                    name: '0000',
                },
                countyId:Number,
            }
        },
        methods: {
            add() {
                this.form.name = '';
                this.dialogFormVisible = true;
            },
            //添加-sure
            sure() {
                if (this.form.name == '' || this.form.name == undefined) {
                    this.$message({
                        type: 'warning',
                        message: '请填写原产地!'
                    });
                } else {
                    this.$http.post(this.url+'/originCountry/addOriginCountry',{countryName:this.form.name},{emualateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.dialogFormVisible = false;
                            //刷新
                            this.ajax();
                            this.$message({
                                type:'success',
                                message:'添加成功!'
                            });
                        }else{
                            this.$message({
                                type:'error',
                                message:'添加失败!'
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
            adit(rows,index) {
                console.log(rows, index);
                this.countyId=rows.countryId;
                this.form1.name=rows.countryName;
                this.dialogFormVisible1 = true;
            },
            //编辑-sure
            sure1() {
                if (this.form1.name == '' || this.form1.name == undefined) {
                    this.$message({
                        type: 'warning',
                        message: '请填写原产地!'
                    });
                } else {
                    this.$http.post(this.url+'/originCountry/updateOriginCountry',{countryId:this.countyId,countryName:this.form1.name},{emualateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.dialogFormVisible1 = false;
                            this.$message({
                                type:'success',
                                message:'编辑成功!'
                            });
                            this.ajax();
                        }else{
                            this.$message({
                                type:'error',
                                message:'编辑失败!'
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
            //删除
            delete0(rows,index){
                console.log(rows, index);
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/originCountry/deleteOriginCountry',{countryId:rows.countryId},{emualateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.ajax();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                });
            },
            //ajax
            ajax(){
                this.$http.post(this.url+'/originCountry/all_originCountry',{},{emualateJSON:true}).then(function (res) {
                    console.log(res);
                    this.tableData3=res.data.data;
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            }
        },
        created(){
              this.ajax();
        }
    }
</script>

<style scoped>
    .el-table {
        margin: 10px 0;
    }

    .add {
        width: 400px;
    }

</style>
