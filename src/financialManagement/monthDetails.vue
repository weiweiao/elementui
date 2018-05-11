<template>
    <!--当月详情-->
    <div>
        <p style="font-size: 14px;color: red">月工资详情(尚未完善)</p>
        <el-table
                :data="tableData"
                border
                style="width: 100%;margin-top:8px;"
                max-height="480"
        >
            <el-table-column
                    type="index"
                    label="序号"
                    width="77">
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="收益所属时间"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="incomeTotals"
                    label="金钱收益">
            </el-table-column>
            <el-table-column
                    prop="incomeTotalGolds"
                    label="金币收益">
            </el-table-column>
            <el-table-column
                    prop="refundRmb"
                    label="退款金额">
            </el-table-column>
            <el-table-column
                    prop="refundGold"
                    label="退款金币">
                <!--<template slot-scope="scope">-->
                    <!--{{scope.row.userMemberRole=='MANAGER'?'客户经理':'暂时无(后台)'}}-->
                <!--</template>-->
            </el-table-column>
            <el-table-column
                    prop="saleType"
                    label="销售类型">
            </el-table-column>
            <el-table-column
                    prop="memberNum"
                    label="会员数量">
            </el-table-column>
            <el-table-column
                    prop="isSettlement"
                    label="是否结算">
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="dayDetails(scope.row,scope.$index)">查看当天详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData:[{}],
            }
        },
        methods:{
            //查看当天详情
            dayDetails(row,index){
                this.$router.push({path:'/dayDetails'})
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
                return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm);
//                return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
            },
        },
        mounted() {
//            console.log(this.$route.query.row);
//            let time = this.formatDate(new Date().getTime());
//            let currentTime = time.substring(0,10);
//            this.$http.post(this.url+'/select_month_details',{
//                userId:this.$route.query.row.userId,
//                revenueMonth:currentTime,
//                page:1,
//                num:40,
//            },{emulateJSON:true}).then(function (res) {
//                console.log(res);
//            })
        }

    }
</script>

<style scoped>

</style>