<template>
    <!--交易完成商品汇总表-->
   <div v-loading="loading">
       <el-form :inline="true" :model="formInline" class="demo-form-inline">
           <el-form-item label="完成日期">
                   <el-date-picker
                           @change="dateChange"
                           v-model="formInline.dates"
                           type="daterange"
                           align="right"
                           unlink-panels
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           :picker-options="pickerOptions">
                   </el-date-picker>
           </el-form-item>
           <el-form-item label="供应商">
               <el-select v-model="formInline.appler" placeholder="请选择"  @change="applerChange">
                   <el-option
                           v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                   </el-option>
               </el-select>
           </el-form-item>
           <el-form-item label="skucode">
               <el-input placeholder="请输入skucode" v-model="skucode"></el-input>
           </el-form-item>
           <el-form-item>
               <el-button type="primary" @click="inquiry">查询</el-button>
           </el-form-item>
       </el-form>
       <el-table
               :data="tableData"
               border
               class="table"
               style="width: 100%;font-size: 12px">
           <el-table-column
                   prop="googsName"
                   label="商品名称"
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
                   prop="total"
                   label="总金额">
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
                   prop="good"
                   label="现金返利"
                   width="100"
           >
           </el-table-column>
           <el-table-column
                   prop="returncoin"
                   label="返金币">
           </el-table-column>
           <el-table-column
                   prop="coin"
                   label="实际支付金币">
           </el-table-column>
           <el-table-column
                   prop="ComsumeRMB"
                   label="实际消费">
           </el-table-column>
           <el-table-column
                   prop="price"
                   label="商品售价">
           </el-table-column>
           <el-table-column
                   prop="costprice"
                   label="采购单价">
           </el-table-column>
           <el-table-column
                   prop="tariff"
                   label="进口税">
           </el-table-column>
           <el-table-column
                   prop="status"
                   label="订单状态">
           </el-table-column>
           <el-table-column
                   prop="rate"
                   label="毛利率"
                   width="190"
           >
               <template slot-scope="scope">
                   <p>商品毛利率 : {{scope.row.goodsInfulence}}</p>
                   <p>实收毛利率 : {{scope.row.virtalInfulence}}</p>
                   <p>优惠影响毛利率 : {{scope.row.freeInfulence}}</p>
                   <p>返利影响毛利率 : {{scope.row.returnInfulence}}</p>
                   <p>运费影响毛利率 : {{scope.row.carriageInfulence}}</p>
               </template>
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
                skucode:'',//查询-sku
                formInline: {
                    dates: '',
                    appler: ''
                },
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
                loading:false,
            }
        },
        methods: {
            inquiry(){
                this.currentPage = 1;
                this.ajax(this.currentPage,this.startTime,this.endTime,this.formInline.appler,this.skucode)
            },
//            查询-时间
            dateChange(val){
                console.log(val);
                this.startTime = val.substring(0,10);
                this.endTime = val.substring(11,21);
                console.log(this.formInline.dates);
            },
//            查询-供应商
            applerChange(val){
                console.log(val);
                console.log(this.formInline.appler);
            },
//            分页
            handleCurrentChange(val){
                this.currentPage = val;
                this.ajax(this.currentPage,this.startTime,this.endTime,this.formInline.appler,this.skucode)
            },
//            ajax
            ajax(a1,a2,a3,a4,a5){
                this.loading = true;
                this.$http.post(this.url + '/finance/allGoods', {
                    pageNumber: a1,
                    pageSize: 10,
                    startTime:a2,
                    endTime:a3,
                    warehouse:a4,
                    skucode:a5,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    this.loading = false;
                    if(res.data.data.pageList==null){
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
                    let obj = {value:"",label:"-- 请选择 --"};
                    this.options.unshift(obj)
                }
            });
         this.ajax(1,'','','','','');
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
        max-height: 600px;
        overflow-y: scroll;
    }
    .block{
       text-align: right;
        margin-top: 5px;
    }
</style>