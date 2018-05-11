<template>
    <!--活动1-->
    <div>
        <div>
            <el-row :gutter="12" style="margin-bottom: 8px">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-button @click="createdActivty">创建满减活动</el-button>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span class="spans0">活动ID</span>
                        <el-input placeholder="请输入活动ID" v-model="activityId"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span class="spans1">活动名称</span>
                        <el-input placeholder="请输入活动名称" v-model="activityName"></el-input>
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
                    ref="supplierTable"
                    :data="tableData"
                    border
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55"
                        :selectable='checkboxInit'
                >
                </el-table-column>
                <el-table-column
                        prop="activityId"
                        label="活动ID"
                        width="90px"
                >
                </el-table-column>
                <el-table-column
                        prop="activityName"
                        label="活动名称"
                >
                </el-table-column>
                <el-table-column
                        prop="activityStart"
                        label="开始时间"
                        width="160"

                >
                    <template slot-scope="scope">
                        <span>{{scope.row.activityStart | time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="activityEnd"
                        label="结束时间"
                        width="160"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.activityEnd | time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="活动状态"
                        width="100"
                >
                    <template slot-scope="scope">
                        <span class="redP">{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="320"
                >
                    <template slot-scope="scope">
                        <div style="display: flex">
                            <el-button type="text" size="small" @click="adit1(scope.row,scope.$index)">基础页面
                            </el-button>
                            <span>|</span>
                            <el-button type="text" size="small" @click="adit2(scope.row,scope.$index)">
                                优惠内容及门槛
                            </el-button>
                            <span>|</span>
                            <el-button type="text" size="small" @click="adit3(scope.row,scope.$index)">绑定spu
                            </el-button>
                            <span>|</span>
                            <el-button type="text" size="small" @click="delet(scope.row,scope.$index)">删除
                            </el-button>
                            <div v-show="scope.row.status=='进行中'?true:false">
                                <span>|</span>
                                <el-button type="text" size="small" @click="stop(scope.row,scope.$index)">终止活动
                                </el-button>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!--基础页面弹框-->
            <el-dialog title="编辑基础页面" :visible.sync="dialogTableVisible">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="activityName">
                        <el-input v-model="ruleForm.activityName" class="setWidths inputs"
                                  placeholder="最多10个字" :disabled="disableds"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-date-picker
                                :disabled="disableds"
                                @change="startTimes"
                                v-model="startTime0"
                                type="datetime"
                                :clearable="clearable"
                                placeholder="请选择开始时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker
                                :disabled="disableds"
                                @change="endTimes"
                                v-model="endTime0"
                                type="datetime"
                                :clearable="clearable"
                                placeholder="请选择结束时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动描述" prop="activityDsc">
                        <el-input v-model="ruleForm.activityDsc" type="textarea" class="setWidths inputs"
                                  placeholder="请输入活动描述" :disabled="disableds"></el-input>
                    </el-form-item>
                    <el-form-item label="活动对象" prop="activityObject">
                        <el-radio-group v-model="ruleForm.activityObject" :disabled="disableds">
                            <el-radio label="ALL">所有人</el-radio>
                            <el-radio label="MEMBER">会员</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="sure('ruleForm')" type="primary">保存
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--分页-->
            <div class="block">
                <el-button type="primary" :disabled="wholeDeletDisabled" @click="wholeDelet">批量删除</el-button>
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
                disableds: false,
                wholeDeletDisabled: true,
                clearable: true,
                tableData: [],
                arr: [],//分页
                currentPage: 1,
                activityId: '',//活动id
                activityName: '',//活动name
                startTime0: '',//开始时间
                endTime0: '',//结束时间
                starttime:'',
                endtime:'',
                dialogTableVisible: false,
                ruleForm: {
                    activityName: '',
                    activityDsc: '',
                    activityObject: '',
                    value1: '',
                    value2: '',
                },//基础页面
                rules: {
                    activityName: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 2, max: 16, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                    ],
                    activityDsc: [
                        {required: true, message: '请输入活动描述', trigger: 'blur'},
                    ],
                    activityObject: [
                        {required: true, message: '请选择活动对象', trigger: 'change'}
                    ],
                },
                multipleSelection: [],//多选
                row:{},
            }
        },
        methods: {
            //创建满减活动
            createdActivty() {
                this.$router.push({
                    path: '/createdActivity'
                })
            },
            //查询
            inquiry() {
                this.currentPage = 1;
                this.ajaxAll(this.currentPage, this.activityId, this.activityName)
            },
            //清除条件
            clears() {
                this.activityId = '';
                this.activityName = '';
            },
            //多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if (this.multipleSelection.length == 0) {
                    this.wholeDeletDisabled = true;
                } else {
                    this.wholeDeletDisabled = false;
                }
            },
            //默认变灰
            checkboxInit(row, index) {
                if (row.bt == 1) {
                    return 0;//不可勾选
                } else {
                    return 1;//可勾选
                }
            },
            //编辑基础页面
            adit1(row, index) {
                console.log(row, index);
                this.row = row;
                this.dialogTableVisible = true;
                this.ruleForm.activityName = row.activityName;//活动名称
                this.startTime0 = row.activityStart;//活动开始时间
                this.endTime0 = row.activityEnd;//活动结束时间
                this.ruleForm.activityDsc = row.activityDesc;//活动描述
                this.ruleForm.activityObject = row.activityTarget;//活动对象
                if (row.status == '进行中') {
                    this.disableds = true
                } else {
                    this.disableds = false;
                }
            },
            //优惠内容及门槛
            adit2(row, index) {
                console.log(row, index);
                this.$router.push({
                    path: '/discount',
                    query: {row: row},
                })
            },
            //编辑绑定spu
            adit3(row, index) {
        let obj = {};
        obj.row = row;
        obj.currentPage = this.currentPage;
        obj.index = index;
        obj.activityIdInput = this.activityId;
        obj.activityNameInput = this.activityName;
        this.$router.push({
            path: '/aditBindSpu',
            query: {obj: obj}
        })
    },
            // 删除
            delet(row, index) {
                console.log(row, index);
                let arr = [];
                arr.push(row.activityId)
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/activity/delActivityList', {ids: arr.join(',')}, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //刷新当前页
                            this.ajaxAll(this.currentPage, this.activityId, this.activityName);
                        } else if (res.data.status == 101) {
                            this.$message({
                                type: 'warning',
                                message: '活动正在进行,不可删除!'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
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
            //终止活动
            stop(row, index) {
                this.$confirm('确定终止活动?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/activity/stopActivity', {activityId: row.activityId}, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            //刷新当前页
                            this.ajaxAll(this.currentPage, this.activityId, this.activityName);
                        } else if (res.data.status == 101) {
                            this.$message({
                                type: 'warning',
                                message: '活动已经结束!'
                            });
                        } else if (res.data.status == 103) {
                            this.$message({
                                type: 'warning',
                                message: '不再活动范围!'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
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
//                        message: '已取消'
//                    });
                });
            },
            //开始时间
            startTimes(val) {
                this.starttime = val;
                console.log(val);
            },
            //结束时间
            endTimes(val) {
                this.endtime = val;
                console.log(val);
            },
            //编辑基础页面-确定
            sure(ruleForm) {
                if (this.starttime == '') {
                    this.starttime = this.formatDate(this.startTime0)
                }
                if (this.endtime == '') {
                    this.endtime = this.formatDate(this.endTime0)
                }
                this.$http.post(this.url + '/activity/alterActivityList', {
                    activityId: this.row.activityId,
                    activityName: this.ruleForm.activityName,
                    activityStart: this.starttime,
                    activityEnd: this.endtime,
                    activityTarget: this.ruleForm.activityObject,
                    activityDesc: this.ruleForm.activityDsc,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.status == 200) {
                        this.dialogTableVisible = false;
                        //刷新当前页
                        this.ajaxAll(this.currentPage, this.activityId, this.activityName);
                        this.$message({
                            type: 'success',
                            message: '编辑成功!'
                        })
                    } else if (res.data.status == 104) {
                        this.$message({
                            type: 'warning',
                            message: '活动正在进行,不能修改!'
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
            //批量删除
            wholeDelet() {
        let arr = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].activityId);
        }
        console.log(arr);
        this.$confirm('确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$http.post(this.url + '/activity/delActivityList', {ids: arr.join(',')}, {emulateJSON: true}).then(function (res) {
                console.log(res);
                if (res.data.status == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //刷新当前页
                    this.ajaxAll(this.currentPage, this.activityId, this.activityName);
                } else if (res.data.status == 101) {
                    this.$message({
                        type: 'warning',
                        message: '当前活动' + res.data.data + '正在进行,不可删除!'
                    });
                } else {
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
            // 分页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.ajaxAll(this.currentPage, this.activityId, this.activityName);
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
                return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
            },

            ajaxAll(a1, a2, a3) {
                this.$http.post(this.url + '/activity/getActivityList', {
                    page: a1,
                    num: 10,
                    activityId: a2,
                    activityName: a3,
                    activityType: 'FULL_CUT',
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.data == null || res.data.data.length == 0) {
                        this.tableData = [];
                        this.arr.length = 0;
                    } else {
                        for (let i = 0; i < res.data.data.pageList.length; i++) {
                            res.data.data.pageList[i].number = i + 1;
                            let status = res.data.data.pageList[i].status;
                            if (status == 0) {
                                res.data.data.pageList[i].status = '还未进行'
                            } else if (status == 1) {
                                res.data.data.pageList[i].status = '进行中'
                            } else if (status == 2) {
                                res.data.data.pageList[i].status = '已结束'
                            } else if (status == 3) {
                                res.data.data.pageList[i].status = '正在预热'
                            } else if (status == 4) {
                                res.data.data.pageList[i].status = '未完成编辑'
                            } else {
                                res.data.data.pageList[i].status = ''
                            }
                        }
                        this.tableData = res.data.data.pageList;
                        this.arr.length = res.data.data.pageTotal;
                    }
                }, function (err) {
                    this.$message({
                        type: 'error',
                        message: '服务器连接中断,请联系后台人员!',
                    });
                })
            },

        },
        created(){
            this.ajaxAll(1, '', '');
        },
        mounted() {
            this.ajaxAll(1, '', '');
        },
    }
</script>

<style scoped>
    .el-table .warning-row {
        background: red;
    }

    .el-table .success-row {
        background: green;
    }

    .activity-list {
        font-size: 14px;
        color: #48576a;
        width: 100%;
    }

    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .spans1 {
        width: 80px;
    }

    .spans0 {
        width: 60px;
    }

    .redP {
        color: red;
    }

    .block {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        padding-left: 8px;
    }

    .inputs {
        width: 300px;
    }

    .tws {
        width: 160px;
    }
</style>
