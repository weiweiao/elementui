<template>
    <!--提现记录列表-->
    <div class="cash-record-list">
        <!--nav-->
        <el-row :gutter="24">
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span class="spans0">姓名</span>
                    <el-input type="primary" v-model="name"></el-input>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span class="spans1">手机号</span>
                    <el-input type="primary" v-model="phone"></el-input>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span class="spans0">状态</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click="inquiry">查询</el-button>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click="export0">导出</el-button>
                </div>
            </el-col>
        </el-row>
        <!--table-->
        <el-table
                :data="tableData3"
                border
                style="width: 100%"
                max-height="600">
            <el-table-column
                    prop="xuhao"
                    label="序号"
                    width="70"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="真实姓名"
            >
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号"
                    width="130"
            >
            </el-table-column>
            <el-table-column
                    prop="cash"
                    label="提现方式"
            >
                <template slot-scope="scope">
                    <p v-text="scope.row.type=='Alipay'?'支付宝':'微信'"></p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="amount"
                    label="打款金额(元)"
            >
            </el-table-column>
            <el-table-column
                    prop="applyAmount"
                    label="申请金额(元)"
            >
            </el-table-column>
            <el-table-column
                    prop="status0"
                    label="处理状态"
            >
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="申请时间"
                    width="120"
            >
                <template slot-scope="scope">
                    <p v-show="scope.row.gmtCreate==null?false:true">{{scope.row.gmtCreate | time}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="payTime"
                    label="到账时间"
                    width="120"
            >
                <template slot-scope="scope">
                    <p v-show="scope.row.payTime==null?false:true">{{scope.row.payTime | time}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作"
            >
                <template slot-scope="scope">
                    <div v-show="(scope.row.type=='Alipay'&&scope.row.status==4)?true:false">
                        <el-button type="text" @click="audit(scope.row,scope.index)">审核通过</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!--导出弹框-->
        <el-dialog title="选择日期" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="选择日期" :label-width="formLabelWidth">
                        <el-date-picker
                                @change="dateChange"
                                v-model="dates"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <a :href="url+'/finance/export_fiancelook'" @click="sure(startTime,endtime)"><el-button type="primary">确 定</el-button></a>
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
</template>

<script>
    export default {
        data() {
            return {
                dates:'',//日期
                formLabelWidth:'160px',
                dialogFormVisible:false,
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '今日',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime());
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '昨日',
                            onClick(picker) {
//                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                                picker.$emit('pick', [start, start]);
                            }
                        },
                        {
                            text: '最近7日',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近30日',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        },{
                            text: '本月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                let day = start.getDate() - 1;
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
                                picker.$emit('pick', [start, end]);
                            }
                        },{
                            text: '上月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                let monthStart = start.getMonth()+1-1;
                                let monthEnd = start.getMonth()+1;

                                //传入日期获取时间戳函数；看懂了自己再改改
                                function da (month,day){
                                    let start1 = new Date();
                                    let year = start1.getFullYear();
                                    let str = year.toString() +'/'+ '0' + month.toString() +'/'+ day;
                                    let date = new Date(str);
                                    let time = date.getTime();
                                    return time;
                                };

                                let st =da(monthStart,'01');
                                let en =da(monthEnd,'01');

                                start.setTime(st);
                                end.setTime(en);
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
                startTime:'',
                endtime:'',
                phone:'',//手机号
                name:'',//姓名
                tableData3: [{}],
                currentPage: 1,
                arr: [],
                options: [
                    {
                        value: '',
                        label: ''
                    },
                    {
                        value: 'A',
                        label: '提现成功'
                    }, {
                        value: 'B',
                        label: '提现中'
                    }, {
                        value: 'C',
                        label: '提现失败'
                    },
                ],
                value: '',
            }
        },
        methods: {
            //日期
            dateChange(val){
                console.log(val);
                this.startTime = val.substring(0,10);
                this.endTime = val.substring(11,21);
                console.log(this.startTime);
                console.log(this.endTime);
            },
            //日期-sure
            sure(startTime,endtime){
                console.log(this.dates);
                if(this.dates==''||this.dates==undefined) {
                    this.$message({
                        type: 'warning',
                        message: '请选择时间!'
                    });
                }else{
                    startTime = this.startTime;
                    endtime = this.endtime;
                }
            },
            //导出
            export0(){
                //清空
                this.dates = '';
                this.dialogFormVisible = true;
            },
            //查询
            inquiry(){
                this.currentPage = 1;
                this.ajax(this.currentPage,this.value,this.name,this.phone);
            },
            //审核
            audit(row,index){
                console.log(row);
                this.$confirm('确认审核通过?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        this.$http.post(this.url + '/qqsk/confirmTheMoney', {
                            withdrawno:row.withdrawNo,
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if(res.data.status==200){
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '操作失败!'
                                });
                            };
                            //刷新
                            this.ajax(this.currentPage,this.value,this.name,this.phone);
                        },function (err) {
                            this.$message({
                                type:'error',
                                message:'服务器连接中断,请联系后台人员!',
                            });
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            handleCurrentChange(val) {
                console.log(val);
                this.currentPage = val;
                this.ajax(this.currentPage,this.value,this.name,this.phone);
            },
            //ajax
            ajax(a1,a2,a3,a4){
                this.$http.post(this.url + '/qqsk/getWithdrawLimit', {
                    page: a1,
                    num: 10,
                    status:a2,
                    name:a3,
                    phone:a4,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.data == null) {
                        this.tableData3 = [];
                        this.arr.length = 0;
                    } else {
                        for (let i = 0; i < res.data.data.pageList.length; i++) {
                            res.data.data.pageList[i].xuhao = i + 1+10*(this.currentPage-1);
                            if (res.data.data.pageList[i].status == 1) {
                                res.data.data.pageList[i].status0 = '提现成功'
                            } else if (res.data.data.pageList[i].status == 4) {
                                res.data.data.pageList[i].status0 = '提现中'
                            } else if (res.data.data.pageList[i].status == 2) {
                                res.data.data.pageList[i].status0 = '提现失败'
                            } else {
                                res.data.data.pageList[i].status = '无'
                            }
                        }
                        this.tableData3 = res.data.data.pageList;
                        this.arr.length = res.data.data.pageTotal;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            }
        },
        mounted() {
            this.ajax(1,'','','')
        }

    }
</script>

<style scoped>

    .grid-content {
        display: flex;
    }

    .spans1 {
        width: 80px;
        font-size: 14px;
    }

    .spans0 {
        width: 50px;
        font-size: 14px;
    }

    .el-table {
        margin-top: 10px;
    }

    .el-col {
        display: flex;
        line-height: 36px;
    }

    .block{
        text-align: right;
    }
</style>