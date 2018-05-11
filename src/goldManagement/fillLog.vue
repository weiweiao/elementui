<template>
    <!--填充日志-->
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
                    width="88">
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
                    prop="fillingGoldNum"
                    label="金币数量">
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
                tableData:[],
                arr:[],
                currentPage:1,
                timeValue:'',//时间范围
                startTime:'',
                endTime:'',
            }
        },
        methods: {
            //查询
            inquiry(){
              this.currentPage = 1;
              this.ajax(this.currentPage,this.startTime,this.endTime);
            },
            //清除条件
            clears(){
                this.timeValue = '';
            },
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
            },
            //ajax
            ajax(a1,a2,a3){
                this.$http.post(this.url+'/goldPool/view_log',{
                    page:a1,
                    num:10,
                    goldPoolId:this.goldPoolId,
                    startTime:a2,
                    endTime:a3,
                },{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null||res.data.data.pageList==null){
                        this.tableData = [];
                        this.arr.length = 0;
                    }else{
                        for(let i=0;i<res.data.data.pageList.length;i++){
                            res.data.data.pageList[i].xuhao = i+1+(this.currentPage-1)*10
                        }
                        this.tableData = res.data.data.pageList;
                        this.arr.length = res.data.data.pageTotal;
                    }
                })
            }
        },
        mounted(){
            this.goldPoolId = this.$route.query.row.goldPoolId;
            console.log(this.goldPoolId);
            this.ajax(1,'','')
        }

    }
</script>

<style scoped>
.block{
    display: flex;
    align-items:center;
}
</style>
