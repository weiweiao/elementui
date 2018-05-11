<template>
    <!--成员管理-->
    <div class="member-management">
        <el-row :gutter="20">
            <el-col :span="10">
                <el-button @click="add">添加</el-button>
            </el-col>
            <el-col :span="5">
                <div style="display: flex;align-items: center;">
                    <span style="width: 80px">真实姓名</span>
                    <el-input type="text" placeholder="请输入真实姓名" v-model="trueName"></el-input>
                </div>
            </el-col>
            <el-col :span="5">
                <div style="display: flex;align-items: center;">
                    <span style="width: 70px">部门名称</span>
                    <el-cascader
                            :props="defaultProps"
                            :options="options"
                            v-model="selectedOptions"
                            filterable
                    >
                    </el-cascader>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="searchDate">查询</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="trueName='';selectedOptions=[]">清除条件</el-button>
            </el-col>
        </el-row>
        <!--添加弹出框-->
        <el-dialog title="添加" :visible.sync="dialogFormVisible" top="10vh">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="登入名称" :label-width="formLabelWidth" prop="loginname">
                    <el-input v-model="form.loginname" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="adminname">
                    <el-input v-model="form.adminname" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="登入密码" :label-width="formLabelWidth" prop="passwords">
                    <el-input v-model="form.passwords" auto-complete="off" placeholder="至少六位" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phonenumber">
                    <el-input v-model="form.phonenumber" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="选择部门" :label-width="formLabelWidth" prop="selectedOptions1">
                    <el-select v-model="selectedOptions1" placeholder="请选择">
                        <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金币池" :label-width="formLabelWidth" prop="goldPool">
                    <el-select v-model="goldPool" placeholder="请选择">
                        <el-option
                                v-for="item in goldPoolOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理员描述" :label-width="formLabelWidth" prop="admindesc">
                    <el-input v-model="form.admindesc" auto-complete="off" type="textarea" class="inputs"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sure('form')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--table-->
        <div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%;margin-top: 10px;"
                    max-height="100vh"
            >
                <el-table-column
                        prop="adminId"
                        label="员工Id"
                >
                </el-table-column>
                <el-table-column
                        prop="deptName"
                        label="部门名称"
                >
                </el-table-column>
                <el-table-column
                        prop="loginName"
                        label="登入名称"
                >
                </el-table-column>
                <el-table-column
                        prop="adminName"
                        label="真实姓名"
                >
                </el-table-column>
                <el-table-column
                        prop="phoneNumber"
                        label="电话号码"
                        width="140"
                >
                </el-table-column>
                <el-table-column prop="gmtCreate"
                                 label="创建时间"
                                 width="160px"
                >
                    <template slot-scope="scope">
                        {{scope.row.gmtCreate | time}}
                    </template>
                </el-table-column>
                <el-table-column prop="adminStatus"
                                 label="是否启用"
                >
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.adminStatus"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="handleClick(scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="180"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="authoritySet(scope.$index,scope.row)">权限设置</el-button>
                        <span>|</span>
                        <el-button type="text" size="small" @click="adit(scope.$index,scope.row)">编辑</el-button>
                        <span>|</span>
                        <el-button type="text" size="small"
                                   @click.native.prevent="deleteRow(scope.$index, tableData,scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--编辑弹框-->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible1">
            <el-form :model="form1" :rules="rules1" ref="form1" label-width="100px" class="demo-ruleForm">
                <el-form-item label="真实姓名" :label-width="formLabelWidth1" prop="adminname">
                    <el-input v-model="form1.adminname" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" :label-width="formLabelWidth1" prop="phonenumber">
                    <el-input v-model="form1.phonenumber" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="选择部门" :label-width="formLabelWidth1" prop="selectedOptions2">
                    <el-select v-model="form1.selectedOptions2" placeholder="请选择">
                        <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金币池" :label-width="formLabelWidth1">
                    <el-select v-model="form1.goldPool2" placeholder="请选择">
                        <el-option
                                v-for="item in goldPoolOptions2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="员工描述" :label-width="formLabelWidth1" prop="admindesc">
                    <el-input type="textarea" v-model="form1.admindesc" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sure1(index,'form1')">确 定</el-button>
                    <el-button @click="dialogFormVisible1 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--分页-->
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[20]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="arr.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //金币池
                goldPoolOptions:[],
                goldPool:'',

                clearable: true,
                selectedOptions: [],
                trueName: '',//input真实姓名
                //编辑-单选
                items: [{lab: null, id: null}],
                dialogFormVisible: false,
                dialogFormVisible1: false,
                formLabelWidth: '100px',
                formLabelWidth1: '100px',
                //添加模块
                form: {
                    loginname: '',
                    adminname: '',
                    passwords: '',
                    phonenumber: '',
                    deptid: [],
                    admindesc: '',
                },
                rules: {
                    loginname: [{required: true, message: '请输入登录名称', trigger: 'blur'}],
                    adminname: [{required: true, message: '请输入真实姓名', trigger: 'blur'}],
                    phonenumber: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                        {pattern: /^[1][3,4,5,7,8][0-9]{9}$/,message: '请输入正确的手机号!'}
                    ],
                    passwords:[{required: true, message: '请输入登入密码', trigger: 'blur'},
                        { min: 6, max: 18, message: '至少6位数 '}]
                },
                //编辑模块
                form1: {
                    adminname: '',
                    phonenumber: '',
                    deptid: '',
                    deptname: '',
                    admindesc: '',
                    selectedOptions2: '',
                    goldPool2:'',
                },
                goldPoolOptions2:[],
                rules1: {
                    adminname: [{required: true, message: '请输入真实姓名', trigger: 'blur'}],
                    phonenumber: [{required: true, message: '请输入电话号码', trigger: 'blur'},{ min: 11, max: 11, message: '您输入的电话号码有误! ', trigger: 'blur' }],
                },
                //头部
                formInline: {
                    user: '',
                    region: ''
                },
                arr: [],
                tableData: [],
                currentPage: 1,
                index: null,
                resData: [],
//          部门下拉菜单
                options: [],
                defaultProps: {
                    value: 'deptId',
                    label: 'deptName',//过滤deptName
                },
                //添加弹框-选择部门
                selectedOptions1:'',
                options1: [],
                options2: [],
                openOrClose: Number,//开关
                deptId:'',
            }
        },
        created() {
            const loadAllEvent = () => {//获得焦点触发;拉取所有用户数据
                return new Promise((resolve, reject) => {
                    let self = this;
                    this.$http.post(this.url + '/dept/selectAll_dept', {
//            page: 1,
//            num: 10000
                    }, {emulateJSON: true}).then(function (res) {
                        let resData = res.data.data.pageList;
                        let array = [];
                        for (let key in resData) {
                            let obj = {'value': ''};
                            obj.value = resData[key].adminName;
                            array.push(obj);
                        }
                        console.log('异步回调成功', array);
                        resolve(array);
                    }, (err) => {
                        console.log(err);
                    });
                }).catch(function (err) {
                    console.log(err);//异步错误捕获
                })
                //end
            };
        },
        methods: {
            //开关
            handleClick(rows) {
                if (rows.adminStatus == true) {
                    this.openOrClose = 1;
                } else {
                    this.openOrClose = 0;
                }
                this.$http.post(this.url + '/admin/disabled_admin', {
                    adminId: rows.adminId,
                    adminStatus: this.openOrClose,//开关
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.status == 200) {
                        if(this.openOrClose == 1){
                            this.$message({
                                type: 'success',
                                message: '开启成功!',
                                duration:1000,
                            })
                        }else{
                            this.$message({
                                type: 'success',
                                message: '关闭成功!',
                                duration:1000,
                            })
                        }
                        //刷新
                        if(this.selectedOptions[0]==undefined){
                            this.selectedOptions[0]=''
                        }
                        this.ajax2(this.currentPage,this.trueName,this.selectedOptions[0])
                    } else {
                        this.$message({
                            type: 'error',
                            message: '错误202!',
                        })
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
            //查询
            searchDate() {
                this.currentPage = 1;
                console.log(this.selectedOptions);
                //后台接收格式为数组
                if(this.selectedOptions[0]==null||this.selectedOptions[0]==undefined){
                    this.selectedOptions[0]='';
                }
                this.ajax2(this.currentPage,this.trueName,this.selectedOptions[0])
            },
            //添加
            add() {
                //清空
                this.form.admindesc = ''
                this.form.loginname = '';
                this.form.adminname = '';
                this.form.passwords = '';
                this.form.phonenumber = '';
                this.goldPool = '';
                this.options1 = [];
                this.goldPoolOptions = [];
                this.selectedOptions1='';//清空选择部门
                this.$http.post(this.url + '/dept/select_onedept', {
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null){
                        this.options1 = [];
                    }else{
                        for(let i=0;i<res.data.data.length;i++){
                            let obj = {};
                            obj.label = res.data.data[i].deptName;
                            obj.value = res.data.data[i].deptId;
                            this.options1.push(obj)
                        }
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
                this.$http.post(this.url+'/goldPool/all_pool',{},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null){
                        this.goldPoolOptions = []
                    }else{
                        for(let i=0;i<res.data.data.length;i++){
                            let obj = {};
                            obj.label = res.data.data[i].goldPoolName;
                            obj.value = res.data.data[i].goldPoolId.toString();
                            this.goldPoolOptions.push(obj);
                        }
                    }
                })
                this.dialogFormVisible = true;
            },
            //权限设置
            authoritySet(index, row) {
                console.log(index, row);
                this.$router.push({
                    path: '/memberAuthoritySet',
                    query: {adminId: row.adminId}
                })
            },
            //编辑
            adit(index, row) {
                console.log(index, row);
                this.options2 = [];
                this.deptId = row.deptId;
                this.$http.post(this.url + '/dept/all_dept', {
                    page: 1,
                    num: 10
                }, {emulateJSON: true}).then(function (res) {
                    if(res.data.data==null||res.data.data.pageList==null){

                    }else{
                        console.log(res.data.data.pageList);
                        for(let i=0;i<res.data.data.pageList.length;i++){
                            let obj = {};
                            obj.label = res.data.data.pageList[i].deptName;
                            obj.value = res.data.data.pageList[i].deptId;
                            this.options2.push(obj);
                        }
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
                //查询金币池
                this.$http.post(this.url+'/goldPool/all_pool',{},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null){
                        this.goldPoolOptions2 = []
                    }else{
                        for(let i=0;i<res.data.data.length;i++){
                            let obj = {};
                            obj.label = res.data.data[i].goldPoolName;
                            obj.value = res.data.data[i].goldPoolId.toString();
                            this.goldPoolOptions2.push(obj);
                        }
                    }
                })
                this.form1.goldPool2 = row.goldPoolId;
                this.form1.adminname = row.adminName;
                this.form1.phonenumber = row.phoneNumber;
                this.form1.selectedOptions2 = row.deptId;
                this.form1.admindesc = row.adminDesc;
                this.index = row;
                this.dialogFormVisible1 = true;
            },
            //确定-添加模块
            sure(form) {
                //  向后台发送添加的请求
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        if(this.selectedOptions1==undefined){
                            this.$message({
                                type:'warning',
                                message:'请选择部门!'
                            });
                        }else{
                            this.$http.post(this.url + '/admin/check_loginName', {loginName:this.form.loginname},{emulateJSON: true}).then(function (res) {
                                if(res.data.status==200){
                                    this.$http.post(this.url + '/admin/add_admin', {
                                        goldPoolId:this.goldPool,
                                        loginName: this.form.loginname,
                                        adminName: this.form.adminname,
                                        password: this.form.passwords,
                                        phoneNumber: this.form.phonenumber,
                                        deptId: this.selectedOptions1,
                                        adminDesc: this.form.admindesc,
                                    }, {emulateJSON: true}).then(function (res) {
                                        if (res.data.status == 200) {
                                            if(this.selectedOptions[0]==undefined){
                                                this.selectedOptions[0]=''
                                            }
                                            if(this.selectedOptions[0]==undefined){
                                                this.selectedOptions[0]=''
                                            }
                                            this.ajax2(this.currentPage,this.trueName,this.selectedOptions[0])
                                            this.dialogFormVisible = false;
                                            this.$message({
                                                type: 'success',
                                                message: '添加成功!'
                                            });
                                        } else {
                                            this.$message({
                                                type: 'error',
                                                message: '添加失败!'
                                            })
                                        }
                                    },function (err) {
                                        this.$message({
                                            type:'error',
                                            message:'服务器连接中断,请联系后台人员!',
                                        });
                                    });
                                }else{
                                    this.$message({
                                        type:'warning',
                                        message:'您输入的登入名称已经存在!'
                                    });
                                }
                            },function (err) {
                                this.$message({
                                    type:'error',
                                    message:'服务器连接中断,请联系后台人员!',
                                });
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            //确定-编辑模块
            sure1(index, form1) {
                this.$refs[form1].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url + '/admin/update_admin', {
                            goldPoolId:this.form1.goldPool2,
                            adminId: index.adminId,
                            adminName: this.form1.adminname,
                            phoneNumber: this.form1.phonenumber,
                            deptId: this.form1.selectedOptions2,
                            adminDesc: this.form1.admindesc
                        }, {emulateJSON: true}).then(function (res) {
                            if (res.data.status == 200) {
                                this.dialogFormVisible1 = false;
//                                this.$refs[form1].resetFields();
                                // 刷新
                                if(this.selectedOptions[0]==undefined){
                                    this.selectedOptions[0]=''
                                }
                                this.ajax2(this.currentPage,this.trueName,this.selectedOptions[0])
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
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
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请完善信息!'
                        });
                        return false;
                    }
                });
            },
            //删除
            deleteRow(index, rows, item) {
                this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let adminId = item.adminId;//员工ID
                    this.$http.post(this.url + '/admin/del_admin', {adminId: adminId}, {emulateJSON: true}).then(function (res) {
                        if(res.data.status==200){
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            //刷新
                            console.log('9999999');
                            console.log(this.currentPage);
                            if(this.selectedOptions[0]==undefined){
                                this.selectedOptions[0]=''
                            }
                            this.ajax2(this.currentPage,this.trueName,this.selectedOptions[0]);
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
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //分页函数
            handleCurrentChange(val) {
                this.currentPage = val;
                if(this.selectedOptions[0]==undefined||this.selectedOptions[0]==null){
                    this.selectedOptions[0]=''
                }
                    this.ajax2(this.currentPage,this.trueName,this.selectedOptions[0])

            },
            //ajax
//            ajax(a){
//                this.$http.post(this.url + '/admin/all_admin', {
//                    page: a,
//                    num: 10
//                }, {emulateJSON: true}).then(function (res) {
//                    //console.log(res)
////                this.resData = res.data.data.pageList;
//                    //  遍历后台返回的data值,取时间戳进行解析
//                    for (let i = 0; i < res.data.data.pageList.length; i++) {
//                        //开关
//                        if (res.data.data.pageList[i].adminStatus == 1) {
//                            res.data.data.pageList[i].adminStatus = true;
//                        } else {
//                            res.data.data.pageList[i].adminStatus = false;
//                        }
//                    }
//                    //  解析后渲染到页面
//                    this.arr.length = res.data.data.pageTotal;
//                    this.tableData = res.data.data.pageList;
//                });
//            },
            //ajax2
            ajax2(a1,a2,a3){
                    this.$http.post(this.url + '/admin/blurry_admin', {
                        page: a1,
                        num: 20,
                        adminName: a2,
                        deptId:a3
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.data.pageList == null||res.data.data==null) {
                            this.tableData = [];
                            this.arr.length = 0;
                        } else {
                            for (var i = 0; i < res.data.data.pageList.length; i++) {
                                //开关
                                if (res.data.data.pageList[i].adminStatus == 1) {
                                    res.data.data.pageList[i].adminStatus = true;
                                } else {
                                    res.data.data.pageList[i].adminStatus = false;
                                }
                            }
                            this.arr.length = res.data.data.pageTotal;
                            this.tableData = res.data.data.pageList;
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    })
            }

        },
        //分页/第一次进入页面页面ajax刷新
        mounted() {
            let arr=[];
            this.ajax2(1,'','');
//      下拉
            this.$http.post(this.url + '/dept/select_onedept', {}, {emulateJSON: true}).then(function (res) {
                this.options = res.data.data;
                let obj = {};
                obj.deptName = '--请选择--';
                obj.deptId = null;
                this.options.unshift(obj);
            },function (err) {
                this.$message({
                    type:'error',
                    message:'服务器连接中断,请联系后台人员!',
                });
            });
        },
    }
</script>

<style scoped>
    .el-table {
        margin-bottom: 10px;
    }

    .block {
        text-align: right;
    }
    .inputs{
        width: 300px;
    }
</style>
