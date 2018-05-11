<template>
    <!--限时抢购-->
    <div>
        <div>
            <el-row :gutter="12" style="margin-bottom: 8px">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-button @click="TcreatedActivty">创建限时活动</el-button>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span class="spans0">活动ID</span>
                        <el-input placeholder="请输入活动ID" v-model="TactivityId"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span class="spans1">活动名称</span>
                        <el-input placeholder="请输入活动名称" v-model="TactivityName"></el-input>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="Tinquiry">查询</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="Tclears">清除条件</el-button>
                    </div>
                </el-col>
            </el-row>
            <!--table-->
            <el-table
                    ref="supplierTable"
                    :data="TtableData"
                    highlight-current-row
                    border
                    @selection-change="ThandleSelectionChange"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="activityId"
                        label="活动ID"
                        width="80px"
                >
                </el-table-column>
                <el-table-column
                        prop="activityType"
                        label="活动类型"
                >
                    <template slot-scope="scope">
                        <p v-text="scope.row.activityType=='ANY_TIME'?'限时抢购':'限时秒杀'">{{scope.row.activityType}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="activityName"
                        label="活动名称"
                >
                </el-table-column>
                <el-table-column
                        prop="activityStart"
                        label="开始时间"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.activityStart | time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="activityEnd"
                        label="结束时间"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.activityEnd | time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="活动状态"
                        width="100px"
                >
                    <template slot-scope="scope">
                        <span class="redP">{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="240"
                >
                    <template slot-scope="scope">
                        <div style="display: flex">
                            <el-button type="text" size="small" @click="Tadit1(scope.row,scope.$index)">基础页面
                            </el-button>
                            <span>|</span>
                            <el-button type="text" size="small" @click="Tadit3(scope.row,scope.$index)">绑定spu
                            </el-button>
                            <span>|</span>
                            <el-button type="text" size="small" @click="Tdelet(scope.row,scope.$index)">删除
                            </el-button>
                            <div v-show="scope.row.status=='进行中'?true:false">
                                <span style="color: gray;font-weight: bolder">|</span>
                                <el-button type="text" size="small" @click="Tstop(scope.row,scope.$index)">终止活动
                                </el-button>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="block">
                <el-button type="primary" :disabled="TwholeDeletDisabled" @click="TwholeDelet">批量删除</el-button>
                <el-pagination
                        @current-change="ThandleCurrentChange"
                        :current-page="TcurrentPage"
                        :page-sizes="[10]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="Tarr.length">
                </el-pagination>
            </div>
            <!--基础页面弹框-->
            <el-dialog title="基础页面" :visible.sync="TdialogTableVisible" top="5vh">
                <el-form :model="TruleForm" :rules="Trules" ref="TruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="activityName">
                        <el-input v-model="TruleForm.activityName" class="setWidths inputs"
                                  placeholder="最多10个字"></el-input>
                    </el-form-item>
                    <el-form-item label="活动对象" prop="activityObject">
                        <el-radio-group v-model="TruleForm.activityObject">
                            <el-radio label="ALL">所有人</el-radio>
                            <el-radio label="MEMBER">会员</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动类型" prop="activityType">
                        <el-radio-group v-model="TruleForm.activityType">
                            <el-radio label="ANY_TIME">限时抢购</el-radio>
                            <el-radio label="SECKILL">限时秒杀</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="上线时间" prop="TupLineTime0">
                        <el-date-picker
                                class="tws"
                                @change="TupLineTime0Change"
                                v-model="TruleForm.TupLineTime0"
                                type="datetime"
                                :clearable="clearable"
                                placeholder="请选择上线时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="开始时间" prop="TstartTime0">
                        <el-date-picker
                                class="tws"
                                @change="TstartTimes"
                                v-model="TruleForm.TstartTime0"
                                type="datetime"
                                :clearable="clearable"
                                placeholder="请选择开始日期">
                        </el-date-picker>
                        <!--<el-select v-model="Tvalue1" placeholder="请选择时间" class="tws" @change="Tvalue1Change">-->
                        <!--<el-option-->
                        <!--v-for="item in Toptions1"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                    </el-form-item>
                    <el-form-item label="结束时间" prop="TendTime0">
                        <el-date-picker
                                class="tws"
                                @change="TendTimes"
                                v-model="TruleForm.TendTime0"
                                type="datetime"
                                :clearable="clearable"
                                placeholder="请选择结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动描述" prop="activityDsc">
                        <el-input v-model="TruleForm.activityDsc" type="textarea" class="setWidths inputs"
                                  placeholder="请输入活动描述"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-top: 12px;" @click="Tsure('TruleForm')" type="primary">保存
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--编辑弹框-->
            <el-dialog title="基础页面" :visible.sync="T2dialogTableVisible" top="5vh">
                <el-form :model="TruleForm" :rules="Trules" ref="TruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="activityName">
                        <el-input v-model="TruleForm.activityName" class="setWidths inputs"
                                  placeholder="最多10个字" :disabled="disableds"></el-input>
                    </el-form-item>
                    <el-form-item label="活动对象" prop="activityObject">
                        <el-radio-group v-model="TruleForm.activityObject" :disabled="disableds">
                            <el-radio label="ALL">所有人</el-radio>
                            <el-radio label="MEMBER">会员</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动类型" prop="activityType">
                        <el-radio-group v-model="TruleForm.activityType" :disabled="disableds">
                            <el-radio label="ANY_TIME">限时抢购</el-radio>
                            <el-radio label="SECKILL">限时秒杀</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="上线时间" prop="TupLineTime0">
                        <el-date-picker
                                class="tws"
                                :disabled="disableds"
                                @change="TupLineTime0Change"
                                v-model="TruleForm.TupLineTime0"
                                type="datetime"
                                :clearable="clearable"
                                placeholder="请选择上线时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="开始时间" prop="TstartTime0">
                        <el-date-picker
                                :disabled="disableds"
                                class="tws"
                                @change="TstartTimes"
                                v-model="TruleForm.TstartTime0"
                                type="datetime"
                                :clearable="clearable"
                                placeholder="请选择开始日期">
                        </el-date-picker>
                        <!--<el-select v-model="Tvalue1" placeholder="请选择时间" class="tws" @change="Tvalue1Change">-->
                        <!--<el-option-->
                        <!--v-for="item in Toptions1"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                    </el-form-item>
                    <el-form-item label="结束时间" prop="TendTime0">
                        <el-date-picker
                                :disabled="disableds"
                                class="tws"
                                @change="TendTimes"
                                v-model="TruleForm.TendTime0"
                                type="datetime"
                                :clearable="clearable"
                                placeholder="请选择结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动描述" prop="activityDsc">
                        <el-input v-model="TruleForm.activityDsc" type="textarea" class="setWidths inputs"
                                  placeholder="请输入活动描述" :disabled="disableds"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-top: 12px;" @click="TaditSure('TruleForm')" type="primary">保存
                        </el-button>
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
                //上线时间
                Tuplinetime: '',
                disableds: false,
                TactivityId: '',
                TactivityName: '',
                TruleForm: {
                    TupLineTime0: '',
                    activityName: '',
                    activityDsc: '',
                    activityObject: '',
                    value1: '',
                    value2: '',
                    activityType: '',
                    TstartTime0: '',
                    TendTime0: '',
                },
                Trules: {
                    TupLineTime0: [
                        {required: true, message: '请输入上线时间', trigger: 'change'},
                    ],
                    TstartTime0: [
                        {required: true, message: '请输入开始时间', trigger: 'change'},
                    ],
                    TendTime0: [
                        {required: true, message: '请输入结束时间', trigger: 'change'},
                    ],
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
                    activityType: [
                        {required: true, message: '请选择活动类型', trigger: 'change'}
                    ],
                },
                TdialogTableVisible: false,//弹框
                Tvalue1: '',//开始时间
                Tvalue2: '',//结束时间
                Tstarttime: '',
                Tendttime: '',
                Toptions1: [
                    {
                        value: '0',
                        label: '10:00:00'
                    },
                    {
                        value: '1',
                        label: '14:00:00'
                    },
                    {
                        value: '2',
                        label: '20:00:00'
                    },
                ],
                Toptions2: [
                    {
                        value: '0',
                        label: '08:00:00'
                    },
                    {
                        value: '1',
                        label: '10:00:00'
                    },
                ],
                TtableData: [],
                TcurrentPage: 1,//分页
                Tarr: [],
                TwholeDeletDisabled: true,
                T2dialogTableVisible: false,
                TmultipleSelection: [],//多选

                currentPage: 1,
                arr: [],//分页
                clearable: true,//时间不可清除
                row: {},
                startTime0: '',
                endTime0: '',
                starttime: '',
                endtime: '',
                a: '',
                TactivityId: '',
            }

        },
        methods: {
            //清除条件
            Tclears() {
                this.TactivityId = '';
                this.TactivityName = '';
            },
            //分页
            ThandleCurrentChange(val) {
                this.TcurrentPage = val;
                this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
            },
            //多选
            ThandleSelectionChange(val) {
                this.TmultipleSelection = val;
                if (this.TmultipleSelection.length == 0) {
                    this.TwholeDeletDisabled = true;
                } else {
                    this.TwholeDeletDisabled = false;
                }
            },
            //选择时间
            Tvalue1Change(val) {
                console.log(val);
                console.log(this.Tvalue1);
            },
            //编辑基础页面
            Tadit1(row, index) {
                console.log(this.formatDate(row.upTime));
                console.log(row);
                let str = this.formatDate(row.activityStart);
                let str00 = str.substring(11);
                this.row = row;
                this.T2dialogTableVisible = true;
                this.TruleForm.activityName = row.activityName;//活动名称
                this.TruleForm.TupLineTime0 = this.formatDate(row.upTime);//活动上线时间
                this.TruleForm.TstartTime0 = this.formatDate(row.activityStart);//活动开始时间
                this.TruleForm.TendTime0 = this.formatDate(row.activityEnd);//活动结束时间
                this.Tvalue1 = row.type;
                this.TruleForm.activityDsc = row.activityDesc;//活动描述
                this.TruleForm.activityObject = row.activityTarget;//活动对象
                this.TruleForm.activityType = row.activityType;//活动类型
                if (row.status == '进行中') {
                    this.disableds = true
                } else {
                    this.disableds = false;
                }

            },
            TaditSure(TruleForm) {
                console.log(this.Tstarttime);
                console.log('pp');
                console.log(this.TruleForm.TupLineTime0);
                this.$refs[TruleForm].validate((valid) => {
                    console.log('pp');
                    if (valid) {
//                        console.log(this.Tstarttime);
//                        let start = this.formatDate(this.Tstarttime);
//                            let end = this.formatDate(this.Tendtime);
//                            let up = this.formatDate(this.Tuplinetime);
                        this.$http.post(this.url + '/activity/alterActivityList', {
                            activityId: this.row.activityId,
                            activityName: this.TruleForm.activityName,
                            activityDesc: this.TruleForm.activityDsc,
                            upTime: this.TruleForm.TupLineTime0,
                            activityStart: this.TruleForm.TstartTime0,
                            activityEnd: this.TruleForm.TendTime0,
                            activityTarget: this.TruleForm.activityObject,
                            activityType: this.TruleForm.activityType,
                        }, {emulateJSON: true}).then(function (res) {
                            if (res.data.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '创建成功!'
                                });
                                this.T2dialogTableVisible = false;
                                //刷新当前页
                                this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '操作失败!'
                                })
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            //编辑绑定spu
            Tadit3(row, index) {
                this.$router.push({
                    path: '/aditBindSpu2',
                    query: {activityId: row.activityId}
                });
            },
            //Tstop
            Tstop(row, index) {
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
                            this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName);
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
                                message: '操作失败!'
                            });
                        }
                    });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消'
//                    });
                });
            },
            //删除
            Tdelet(row, index) {
                console.log(row);
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
                            this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
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
            //批量删除
            TwholeDelet() {
                let arr = [];
                for (let i = 0; i < this.TmultipleSelection.length; i++) {
                    arr.push(this.TmultipleSelection[i].activityId);
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
                            this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
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
                    });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                });
            },
            //查询2
            Tinquiry() {
                this.TcurrentPage = 1;
                this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
            },
            //创建早十晚八
            TcreatedActivty() {
                //清空
                this.TruleForm.activityType = '';
                this.TruleForm.TupLineTime0 = '';
                this.TruleForm.TstartTime0 = '';
                this.TruleForm.TendTime0 = '';
                this.Tvalue1 = '';
                this.TruleForm.activityName = '';
                this.TruleForm.activityDsc = '';
                this.TruleForm.activityObject = '';
                this.TdialogTableVisible = true;
            },
            //创建限时
            Tsure(TruleForm) {
                this.$refs[TruleForm].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url + '/activity/addActivitySaleInfo', {
                            activityName: this.TruleForm.activityName,
                            activityDesc: this.TruleForm.activityDsc,
                            upTime: this.TruleForm.TupLineTime0,
                            activityStart: this.TruleForm.TstartTime0,
                            activityEnd: this.TruleForm.TendTime0,
                            activityTarget: this.TruleForm.activityObject,
                            activityType: this.TruleForm.activityType,
                        }, {emulateJSON: true}).then(function (res) {
                            if (res.data.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '创建成功!'
                                });
                                this.TdialogTableVisible = false;
                                //刷新当前页
                                this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '创建失败!'
                                })
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            //开始上线时间
            TupLineTime0Change(val) {
                console.log(val);
//                this.Tuplinetime = val;
                this.TruleForm.TupLineTime0 = val;
            },

            //开始时间
            TstartTimes(val) {
                console.log(val);
//                this.Tstarttime = val;
                this.TruleForm.TstartTime0 = val;
            },
            //结束时间
            TendTimes(val) {
                console.log(val);
//                this.Tendtime = val;
                this.TruleForm.TendTime0 = val;
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
            //ajax2
            ajax2(a1, a2, a3) {
                this.$http.post(this.url + '/activity/getActivityList', {
                    page: a1,
                    num: 10,
                    activityId: a2,
                    activityName: a3,
                    activityType: 'ANY_TIME',//不变
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.data == null || res.data.data.length == 0 || res.data.data.pageList == null) {
                        this.TtableData = [];
                        this.Tarr.length = 0;
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
                        this.TtableData = res.data.data.pageList;
                        this.Tarr.length = res.data.data.pageTotal;
                    }
                })
            },
        },
        created() {
            this.TactivityId = '';
            this.TactivityName = '';
//            this.ajax2(this.TcurrentPage,this.TactivityId,this.TactivityName)
            this.ajax2(1, '', '');
            console.log('000');
        },
        deactivated() {
            this.$destroy()
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
        width: 180px;
    }
</style>