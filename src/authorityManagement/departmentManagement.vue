<template>
    <!--部门管理-->
    <div class="department-management">
        <el-button @click="add">添加</el-button>
        <!--添加弹出框-->
        <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="部门名称" :label-width="formLabelWidth" prop="departmentName">
                    <el-input v-model="form.departmentName" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="职能描述" :label-width="formLabelWidth" prop="desc">
                    <el-input type="textarea" v-model="form.desc" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sure('form')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--table-->
        <el-table
                :data="tableData"
                border
                style="width: 100%;"
                max-height="480"
        >
            <el-table-column
                    prop="deptName"
                    label="部门名称"
            >
            </el-table-column>
            <el-table-column
                    prop="deptDesc"
                    label="职能描述"
            >
            </el-table-column>
            <el-table-column
                    prop="deptNum"
                    label="成员数量 "
            >
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="添加时间"
            >
                <template slot-scope="scope">
                    {{scope.row.gmtCreate | time}}
                </template>
            </el-table-column>
            <el-table-column
                    prop='deptStatus'
                    label="是否启用"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.deptStatus"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="handleClick(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="qxset(scope.row,scope.$index)">权限设置</el-button>
                    <span>|</span>
                    <el-button type="text" size="small" @click="adit(scope.row,scope.$index)">编辑</el-button>
                    <span>|</span>
                    <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--编辑弹框-->
        <el-dialog title="添加部门" :visible.sync="dialogFormVisible1">
            <el-form :model="form1" :rules="rules1" ref="form1" label-width="100px" class="demo-ruleForm">
                <el-form-item label="部门名称" :label-width="formLabelWidth1" prop="departmentName1">
                    <el-input v-model="form1.departmentName1" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="职能描述" :label-width="formLabelWidth1" prop="desc1">
                    <el-input type="textarea" v-model="form1.desc1" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sure1('form1')">确 定</el-button>
                    <el-button @click="dialogFormVisible1 = false">取消</el-button>
                </el-form-item>
            </el-form>
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
</template>

<script type="text/javascript">
    export default {
        data() {
            return {
                deptId:'',//设置权限的部门
                //权限弹窗结束
                dialogFormVisible: false,
                dialogFormVisible1: false,
                formLabelWidth: '100px',
                formLabelWidth1: '100px',
                form: {
                    departmentName: '',
                    desc: '',
                },//添加模块
                rules: {
                    departmentName: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
                    desc: [{required: true, message: '请输入职能描述', trigger: 'blur'}],
                },
                form1: {
                    departmentName1: '',
                    desc1: '',
                },//编辑模块
                rules1: {
                    departmentName1: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
                    desc1: [{required: true, message: '请输入职能描述', trigger: 'blur'}],
                },
                arr: [],
                tableData: [{}],
                currentPage: 1,
                index: null,
                resPage: null,
                openOrClose: Number,//开关
            }
        },
        methods: {
            qxset(row,index){
                this.deptId=row.deptId;
               this.$router.push({
                   path:'/authoritySet',
                   query:{deptId:row.deptId}
               });
            },
            add() {
                this.dialogFormVisible = true;
            },
            adit(row,index) {
                this.form1.departmentName1 = row.deptName;
                this.form1.desc1 = row.deptDesc
                this.index = index;
                this.dialogFormVisible1 = true;
            },
            //  点击添加确定时触发的函数
            sure(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url+'/dept/dept_match',{deptName:this.form.departmentName},{emulateJSON:true}).then(function (res) {
                            console.log(res);
                            if(res.data.status==202){
                                this.$message({
                                    type:"warning",
                                    message:"该部门已存在!"
                                })
                            }else{
                                this.$http.post(this.url + '/dept/add_dept', {
                                    deptName: this.form.departmentName,
                                    deptDesc: this.form.desc,
                                }, {emulateJSON: true}).then(function (res) {
                                    console.log(res);
                                    if (res.data.status==200) {
                                       this.ajax(this.currentPage)
                                        this.dialogFormVisible = false;
                                        this.$refs[form].resetFields();
                                        this.$message({
                                            type:"success",
                                            message:"添加成功!"
                                        });
                                    } else {
                                        this.$message({
                                            type:"error",
                                            message:"添加失败!"
                                        });
                                    }
                                },function (err) {
                                    this.$message({
                                        type:'error',
                                        message:'服务器连接中断,请联系后台人员!',
                                    });
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
                            type:"warning",
                            message:"请完善信息!"
                        });
                        return false;
                    }
                });
            },//添加模块
            //编辑模块 点击编辑确定
            sure1(form1) {
                this.$refs[form1].validate((valid) => {
                    console.log(this.index);
                    if (valid) {
                        this.$http.post(this.url + '/dept/update_dept', {
                            deptId: this.tableData[this.index].deptId,
                            deptName: this.form1.departmentName1,
                            deptDesc: this.form1.desc1
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status==200) {
                                this.dialogFormVisible1 = false;
                                this.$refs[form1].resetFields();
                                //   页面同步数据发送的请求
                                this.ajax(this.currentPage)
                                this.$message({
                                    type:"success",
                                    message:"修改成功!"
                                })
                            } else {
                                this.$message({
                                    type:"error",
                                    message:"修改失败!"
                                })
                            }
                        },function (err) {
                            this.$message({
                                type:'error',
                                message:'服务器连接中断,请联系后台人员!',
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            deleteRow(index, rows) {
                this.$http.post(this.url + '/dept/del_dept', {deptId:this.tableData[index].deptId}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    this.$confirm('此操作将永久删除,是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (res.data.status ==200) {
                            this.$message({
                                type:'success',
                                message:'删除部门成功!'
                            });
                            this.ajax(this.currentPage)
                        } else {
                            //  如果失败,提示不可以删除此部门
                            this.$message({
                                type: 'warning',
                                message: '此部门不可以删除!'
                            });
                        }
                    }).catch(() => {
//                        this.$message({
//                            type: 'info',
//                            message: '已取消删除'
//                        });
                    });
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
            handleClick(rows) {
                console.log(rows);
                if (rows.deptStatus == true) {
                    this.openOrClose = 1;
                } else {
                    this.openOrClose = 0;
                }
                this.$http.post(this.url + '/dept/disabledDept', {
                    deptId: rows.deptId,
                    deptStatus: this.openOrClose,//开关
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        if(this.openOrClose == 1){
                            this.$message({
                                type:'success',
                                message:'开启成功!',
                                duration:1000
                            })
                        }else{
                            this.$message({
                                type:'success',
                                message:'关闭成功!',
                                duration:1000
                            })
                        }
                        //刷新
                        this.ajax(this.currentPage)
                    }else{
                        this.$message({
                            type:'error',
                            message:'错误202!'
                        })
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
//分页函数
            handleCurrentChange(val) {
               this.currentPage= val;
                this.ajax(this.currentPage)
            },
            //ajax
            ajax(a){
                this.$http.post(this.url + '/dept/all_dept', {page:a,num: 10}, {emulateJSON: true}).then(function (res) {
                    console.log(res)
                    if(res.data.data==null||res.data.data.pageList==null){
                        this.arr.length = 0;
                        this.tableData = [];
                    }else{
                        for (var i = 0; i < res.data.data.pageList.length; i++) {
                            //开关
                            if (res.data.data.pageList[i].deptStatus == 1) {
                                res.data.data.pageList[i].deptStatus = true;
                            } else {
                                res.data.data.pageList[i].deptStatus = false;
                            }
                        }
                        //  解析后渲染到页面
                        this.arr.length = res.data.data.pageTotal;
                        this.tableData = res.data.data.pageList;
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
            this.ajax(1);
        },
    }
</script>

<style scoped>
    .el-table {
        margin: 10px 0px;
    }

    .block {
        text-align: right;
    }

    .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 5;
        text-align: left;
    }

    .department-management {
        width: 100%;
        height: 100%;
        position: relative;
    }

    html, body {
        width: 100%;
        height: 100%;
    }
    .inputs{
        width: 350px;
    }
</style>

