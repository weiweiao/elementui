<template>
    <!--交易完成报表-->
   <div v-loading="">
       <el-row :gutter="20">
           <el-col :span="6">
               <span>完成日期</span>
               <el-date-picker
                       @change="dateChange"
                       v-model="dates"
                       type="daterange"
                       align="right"
                       unlink-panels
                       placeholder="请输入完成日期"
                       range-separator="至"
                       start-placeholder="开始日期"
                       end-placeholder="结束日期"
                       :picker-options="pickerOptions">
               </el-date-picker>
           </el-col>
           <el-col :span="6">
               <span>供应商</span>
               <el-select v-model="appler" placeholder="请选择"  @change="applerChange" :clearable="clearable">
                   <el-option
                           v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                   </el-option>
               </el-select>
           </el-col>
           <el-col :span="2">
               <el-button type="primary" @click="inquiry">查询</el-button>
           </el-col>
           <el-col :span="2">
               <el-button type="primary" @click="clears">清除条件</el-button>
           </el-col>
       </el-row>
       <el-table
               :data="tableData"
               border
               class="table"
               style="width: 100%;margin-top: 8px">
           <el-table-column
                   prop="orderNo"
                   label="订单号"
                   width="120"
                   >
           </el-table-column>
           <el-table-column
                   prop="payNo"
                   label="支付单号"
                   width="120"
                  >
           </el-table-column>
           <el-table-column
                   prop="googsName"
                   label="商品名称"
                   width="90"
           >
           </el-table-column>
           <el-table-column
                   prop="goodsSpu"
                   label="spucode"
                   width="90"
           >
           </el-table-column>
           <el-table-column
                   prop="goodsSku"
                   label="skucode"
                   width="90"
           >
           </el-table-column>
           <el-table-column
                   prop="warehouse"
                   label="供应商 (供应商类别)"
                   width="90"
           >
               <template slot-scope="scope">
                   {{scope.row.warehouse}}({{scope.row.wareVarity}})
               </template>
           </el-table-column>
           <el-table-column
                   prop="categoryName"
                   label="所属类目"
                   width="90"
           >
           </el-table-column>
           <el-table-column
                   prop="bigCatName"
                   label="所属大类"
                   width="90"
           >
           </el-table-column>
           <el-table-column
                   prop="quantity"
                   label="数量"
                   width="40"
           >
           </el-table-column>
           <el-table-column
                   prop="refundamount"
                   label="退款数量"
                   width="40"
           >
           </el-table-column>
           <el-table-column
                   prop="price"
                   label="售价">
           </el-table-column>
           <el-table-column
                   prop="total"
                   label="商品总金额">
           </el-table-column>
           <el-table-column
                   prop="discount"
                   label="优惠">
           </el-table-column>
           <el-table-column
                   prop="costprice"
                   label="平均成本价">
           </el-table-column>
           <el-table-column
                   prop="costTotal"
                   label="总成本">
           </el-table-column>
           <el-table-column
                   prop="carriage"
                   label="运 费 (预计运费)">
               <template slot-scope="scope">
                   {{scope.row.carriage}}({{scope.row.planCarriage}})
               </template>
           </el-table-column>
           <el-table-column
                   prop="rate"
                   label="税率">
           </el-table-column>
           <el-table-column
                   prop="tariff"
                   label="进口税">
           </el-table-column>
           <el-table-column
                   prop="good"
                   label="返利">
           </el-table-column>
           <el-table-column
                   prop="returncoin"
                   label="返金币">
           </el-table-column>
           <el-table-column
                   prop="ComsumeRMB"
                   label="实际支付金额">
           </el-table-column>
           <el-table-column
                   prop="coin"
                   label="实际支付金币">
           </el-table-column>
           <el-table-column
                   prop="status"
                   label="订单状态">
           </el-table-column>
           <el-table-column
                   prop="payTime"
                   label="支付日期">
           </el-table-column>
           <el-table-column
                   prop="tradedTime"
                   label="交易完成日">
           </el-table-column>
           <el-table-column
                   prop="PayAccount"
                   label="支付方式">
           </el-table-column>
       </el-table>
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
                clearable:true,
                loading:false,
                    dates: [],
                    appler: '',
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
                options:[],//供应商
                tableData:[],
                currentPage:1,//分页
                arr:[],//分页
                startTime:'',
                endTime:'',
            }
        },
        methods: {
            //清除条件
            clears(){
                this.dates = [];
                this.appler = '';
            },
            inquiry(){
                this.currentPage = 1;
                this. ajax(this.currentPage,this.startTime,this.endTime,this.appler)
            },
//            查询-时间
            dateChange(val){
                console.log(val);
                this.startTime = val.substring(0,10);
                this.endTime = val.substring(11,21);
            },
//            查询-供应商
            applerChange(val){
                console.log(val);
                console.log(this.appler);
            },
//            分页
            handleCurrentChange(val){
                this.currentPage = val;
                this.ajax(this.currentPage,this.startTime,this.endTime,this.appler)
            },
//            ajax
            ajax(a1,a2,a3,a4){
                this.loading = true;
                this.$http.post(this.url + '/finance/all', {
                    pageNumber: a1,
                    pageSize: 10,
                    startTime:a2,
                    endTime:a3,
                    warehouse:a4,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    this.loading = false;
                    if(res.data.data==null){
                        this.tableData=[];
                        this.arr.length=0;
                    }else{
                        this.tableData = res.data.data.pageList;
                        this.arr.length=res.data.data.pageTotal;
                    }
                });
            }
        },
        mounted() {
//           查询商品发货仓所有
            this.$http.post(this.url + '/warehouse/all_warehouse', {
                page: 1,
                num: 100000,
                status: 1,
            }, {emulateJSON: true}).then(function (res) {
                console.log(res);
                if(res.data.data==null){
                    this.options=[];
                }else{
                    for(let i=0;i<res.data.data.pageList.length;i++){
                        let obj = {};
                        obj.value=res.data.data.pageList[i].warehouseCode;
                        obj.label=res.data.data.pageList[i].warehouseName;
                        this.options.push(obj);
                    }
//                    let obj = {value:"",label:"-- 请选择 --"};
//                    this.options.unshift(obj)
                }
            });
         this.ajax(1,'','','');
        }

    }
</script>

<style scoped>
    .grid-content {
        display: flex;
    }

    .spans1 {
        width: 120px;
    }

    .spans0 {
        width: 120px;
    }

    .el-tabs {
        margin-top: 10px;
    }

    .el-col {
        line-height: 36px;
    }

    .footer {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }

    p {
        /*color: red;*/
        font-size: 14px;
    }

    .btns {
        margin: 5px 0;
    }

    .bgs {
        border: 1px solid red;
        color: red;
    }


    .sure {
        margin-top: 15px;
    }

    .redP {
        color: red;
    }

    .xiaoshou {
        cursor: pointer;
        color: blue;
    }

    .blue {
        color: blue;
    }
    img {
        width: 50px;
        height: 50px;
    }
    .bb {
    }
    .borderB {
        border-top: 1px dashed gray;
    }
    .table{
        /*max-height: 600px;*/
        overflow: scroll;
    }
    .block{
       text-align: right;
        margin-top: 5px;
    }
</style>