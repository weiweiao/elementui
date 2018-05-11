<template>
    <!--查看日志-->
    <div>
        <div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="block">
                        <span style="width: 90px">选择时间范围</span>
                        <el-date-picker
                                @change="timeChange"
                                v-model="timeValue"
                                type="daterange"
                                range-separator="至"
                                placeholder="请选择时间范围"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="block">
                        <span style="width: 60px">用户ID</span>
                        <el-input placeholder="请输入用户ID" v-model="userID"></el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="block">
                        <span style="width: 75px">操作类型</span>
                        <el-select v-model="types" placeholder="请选择操作类型" :clearable="clearable">
                            <el-option
                                    v-for="item in options0"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="block">
                        <span style="width: 50px">金币池</span>
                        <el-select v-model="goldPoll" placeholder="请选择金币池" :clearable="clearable">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="block">
                        <el-button type="primary" @click="inquiry">查询</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="block">
                        <el-button type="primary" @click="clears">清除条件</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-table
                :data="tableData"
                border
                style="width: 100%;margin: 8px 0">
            <el-table-column
                    prop="xuhao"
                    label="序号"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="operator"
                    label="操作人"
            >
            </el-table-column>
            <el-table-column
                    prop="ipAddress"
                    label="ip">
            </el-table-column>
            <el-table-column
                    prop="operateName"
                    label="操作名称">
            </el-table-column>
            <el-table-column
                    prop="userId"
                    label="用户ID">
            </el-table-column>
            <el-table-column
                    prop="goldAmount"
                    label="金币数量">
            </el-table-column>
            <el-table-column
                    prop="goldPoolId"
                    label="发放金币池">
            </el-table-column>
            <el-table-column
                    prop="issueDeductReason"
                    label="原因">
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="操作时间">
                <template slot-scope="scope">
                    <p v-show="scope.row.gmtCreate==null||scope.row.gmtCreate==''?false:true">{{scope.row.gmtCreate | time}}</p>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div style="text-align:right">
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
                arr:[],
                tableData:[],
                currentPage:1,
                clearable:true,
                timeValue:'',//时间范围
                userID:'',//用户ID
                goldPoll:'',//金币池
                types:'',//操作类型
                startTime:'',
                endTime:'',
                options0:[
                    {label:'扣除虚拟币',value:'DEDUCTION'},
                    {label:'发放虚拟币',value:'GRANT'}
                ],
                options:[],
                userId:'',
            }
        },
        methods: {
            //查询
            inquiry(){
                this.currentPage = 1;
                this.ajax(this.currentPage,this.userID,this.types,this.goldPoll)
            },
            //清除条件
            clears(){
                this.timeValue = '';
                this.types = '';
                this.goldPoll = '';
                this.userID = '';
            },
            //时间范围
            //时间change
            timeChange(val){
                console.log(val);
                this.startTime = val.substring(0,10);
                this.endTime = val.substring(11);
                console.log(this.startTime);
                console.log(this.endTime);
            },
            //分页
            handleCurrentChange(val){
                console.log(val);
                this.currentPage = val;
                this.ajax(this.currentPage,this.userID,this.types,this.goldPoll)
            },
            //ajax
            ajax(a1,a2,a3,a4){
                this.$http.post(this.url+'/goldIssueLog/view_issue_log',{
                    page:a1,
                    num:10,
                    userId:a2,
                    operatingType:a3,
                    goldPoolId:a4,
                },{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    for(let i=0;i<res.data.data.pageList.length;i++){
                        res.data.data.pageList[i].xuhao = i+1+(this.currentPage-1)*10;
                    }
                    this.tableData = res.data.data.pageList;
                    this.arr.length = res.data.data.pageTotal;
                });
            },
        },
        mounted(){
            console.log(this.$route.query.row.userId);
            this.userId = this.$route.query.row.userId;
            this.userID = this.userId;
            //查询金币池
            this.$http.post(this.url+'/goldPool/all_pool',{},{emulateJSON:true}).then(function (res) {
                console.log(res);
                for(let i=0;i<res.data.data.length;i++){
                    let obj = {};
                    obj.label = res.data.data[i].goldPoolName;
                    obj.value = res.data.data[i].goldPoolId;
                    this.options.push(obj);
                }
            });
            this.ajax(1,this.userId,'','')
        }

    }
</script>

<style scoped>
    .block{
        display: flex;
        align-items: center;
    }
</style>
