<template>
    <!--客户经理工资管理-->
    <div>
        <el-row :gutter="12">
            <el-col :span="7">
                <div class="grid-content bg-purple flexs">
                    <span class="spans0">店铺编号</span>
                    <el-input type="primary" v-model="shoperNum" placeholder="请输入店铺编号"></el-input>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple flexs">
                    <span style="font-size: 14px;width: 170px">收益所属日期</span>
                    <el-select v-model="datesYear" placeholder="年">
                        <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <el-select v-model="datesMonth" placeholder="月">
                        <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click="inquire">查询</el-button>
                </div>
            </el-col>
        </el-row>
        <!--table-->
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
                    prop="shopNumber"
                    label="店铺编号"
                    >
            </el-table-column>
            <el-table-column
                    prop="ownerName"
                    label="店主姓名">
            </el-table-column>
            <el-table-column
                    prop="loginMobile"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    prop="weixinNumber"
                    label="微信号">
            </el-table-column>
            <el-table-column
                    prop="userMemberRole"
                    label="等级">
                <template slot-scope="scope">
                    {{scope.row.userMemberRole=='MANAGER'?'客户经理':'暂时无(后台)'}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="revenueMonth"
                    label="收益所属月">
            </el-table-column>
            <el-table-column
                    prop="openNormalNum"
                    label="黑卡开通数">
            </el-table-column>
            <el-table-column
                    prop="openGTNum"
                    label="金卡开通数">
            </el-table-column>
            <el-table-column
                    prop="incomeTotals"
                    label="月销售额">
            </el-table-column>
            <el-table-column
                    prop="daigakuyoTotals"
                    label="应发工资">
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="monthDetails(scope.row,scope.$index)">查看当月详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                shoperNum:'',//店铺编号
                datesYear:'',//收益所属日期-年
                options1: [
                   {
                    value: '2017',
                    label: '2017年'
                }, {
                    value: '2018',
                    label: '2018年'
                }, {
                    value: '2019',
                    label: '2019年'
                }, {
                    value: '2020',
                    label: '2020年'
                }, {
                    value: '2021',
                    label: '2021年'
                }, {
                    value: '2022',
                    label: '2022年'
                }, {
                    value: '2023',
                    label: '2023年'
                }, {
                    value: '2024',
                    label: '2024年'
                }],
                datesMonth:'',//收益所属日期-月
                options2: [
                    {
                        value: '01',
                        label: '1月'
                    }, {
                        value: '02',
                        label: '2月'
                    }, {
                        value: '03',
                        label: '3月'
                    }, {
                        value: '04',
                        label: '4月'
                    }, {
                        value: '05',
                        label: '5月'
                    }, {
                        value: '06',
                        label: '6月'
                    }, {
                        value: '07',
                        label: '7月'
                    }, {
                        value: '08',
                        label: '8月'
                    },
                    {
                        value: '09',
                        label: '9月'
                    },
                    {
                        value: '10',
                        label: '10月'
                    },
                    {
                        value: '11',
                        label: '11月'
                    },
                    {
                        value: '12',
                        label: '12月'
                    },
                ],
                tableData:[],
                currentYear:'',//当前年
                currentMonth:'',//当前月
            }
        },
        methods:{
            inquire(){
                let time = this.datesYear + '-' + this.datesMonth;
              this.ajax(this.shoperNum,time)
            },
            //查看当月详情
            monthDetails(row,index){
                console.log(row);
//                this.$router.push({path:'/monthDetails',query:{row:row}});//暂时注掉
                this.$message({
                    type:'warning',
                    message:'暂无数据!'
                })
            },
            //ajax
            ajax(a1,a2){
                this.$http.post(this.url+'/select_manager_wage',{
                    shopNumber:a1,
                    revenueMonth:a2,
                    page:1,
                    num:1000,//暂时不分页,人数较少
                },{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    this.tableData = res.data.data.pageList;
                })
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
        created(){
            let time = this.formatDate(new Date().getTime());
            this.currentYear = time.substring(0,4);
            this.currentMonth = time.substring(5,7);
            this.datesYear = this.currentYear;//默认年
            this.datesMonth = this.currentMonth;//默认月
        },
        mounted() {
            let time = this.datesYear + '-' + this.datesMonth;
           this.ajax('',time)
        }

    }
</script>

<style scoped>
.spans0{
    font-size: 14px;
    width: 90px;
}
.flexs{
    display: flex;
    line-height: 36px;
}
</style>