<template>
    <!--未推送订单-->
    <div>
        <!--<el-row :gutter="12" class="el-row2">-->
        <!--<el-col :span="7">-->
        <!--<div class="grid-content bg-purple">-->
        <!--<span class="spans">时间范围</span>-->
        <!--<el-date-picker-->
        <!--@change="date0"-->
        <!--v-model="value6"-->
        <!--type="daterange"-->
        <!--placeholder="选择日期范围">-->
        <!--</el-date-picker>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--<el-col :span="6">-->
        <!--<div class="grid-content bg-purple">-->
        <!--<span class="spans0">订单编号</span>-->
        <!--<el-input type="primary" style="margin-right: 20px"></el-input>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--<el-col :span="5">-->
        <!--<div class="grid-content bg-purple">-->
        <!--<span class="spans">供应商</span>-->
        <!--<el-select v-model="value2" placeholder="请选择">-->
        <!--<el-option-->
        <!--v-for="item in options2"-->
        <!--:key="item.value2"-->
        <!--:label="item.label"-->
        <!--:value="item.value2">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--<el-col :span="4">-->
        <!--<div class="grid-content bg-purple">-->
        <!--<el-button type="primary" class="btns" @click="inquiry">查询</el-button>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-button class="btns tuisong" @click="push">手动推送</el-button>
        <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange"
                max-height="600">
            <el-table-column
                    type="selection"
                    width="55px"
            >
            </el-table-column>
            <el-table-column
                    prop="orderNo"
                    label="订单号"
            >
            </el-table-column>
            <el-table-column
                    prop="orderDetails"
                    label="商品 | 单价 | 数量"
                    width="360px"
            >
                <template slot-scope="scope">
                    <div v-for="item,index in scope.row.orderDetails" :class="index>0?'bt':'bb'"
                         style="display: flex;align-items: center;flex-direction: row;position: relative">
                        <img :src="item.productImageUrl" alt="商品图片无">
                        <div>
                            <p>{{item.productName}}</p>
                            <p>商品代码 : {{item.spucode}}</p>
                            <p>规格属性 : {{item.productProperty}}</p>
                        </div>
                        <div style="text-align: right;color: blue;position: absolute;right: 0">
                            <p>{{item.productUnivalent}}</p>
                            <p>x{{item.productNum}}</p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="orderProductPriceTotals"
                    label="订单金额"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="shippingAddress"
                    label="收货地址"
            >
            </el-table-column>
            <el-table-column
                    prop="orderStatus"
                    label="订单状态"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="paymentTime"
                    label="支付时间"
                    width="120px"
            >
                <template slot-scope="scope">
                    <p v-show="(scope.row.paymentTime==null||scope.row.paymentTime=='')?false:true">{{scope.row.paymentTime | time}}</p>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
//                showTime:'',
                tableData: [],
                value6: '',//时间范围
                value2: '',//供应商
                options2: [],//供应商
                checkArr: [],//多选
                RDArr:[],//数组去重

            }
        },
        methods: {
            //手动推送
            push() {
                if (this.checkArr.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择订单!',
                        duration: 1000,
                    });
                } else {
                    this.$http.post(this.url+'/order/manual_push_order',{transactionNos:this.RDArr.join(',')},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==202){
                            alert(res.data.msg);
                        }else{
                            this.$message({
                                type:'success',
                                message:'推送成功!',
                                duration:2000,
                            });
                        }
                        //刷新
                        this.ajax(1,10000)
                    })
                }
            },
            //多选按钮
            handleSelectionChange(val) {
                console.log(val);
                this.checkArr=val;
                console.log(this.checkArr);
                console.log(this.tableData);
                let arr=[];
                for(let i=0;i<this.checkArr.length;i++) {
                    for(let k=0;k<this.tableData.length;k++){
                        if(this.tableData[k].transactionNo==this.checkArr[i].transactionNo) {
                            console.log(k,i);
                            arr.push(this.tableData[k].transactionNo);
                        }else{
                            console.log(k,i);
                        }
                    }
                }
                console.log(arr);
                //数组去重
                this.RDArr=[];
                for(let i=0;i<arr.length;i++){
                    if(this.RDArr.indexOf(arr[i]) < 0){
                        this.RDArr.push(arr[i]);
                    }
                }
                console.log(this.RDArr);
            },
            ajax(a1,a2) {
                this.$http.post(this.url + '/order/not_push_order', {
                    page: a1,
                    num: a2
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    for(let i=0;i<res.data.data.pageList.length;i++){
//                        if(res.data.data.pageList[i].paymentTime==''||res.data.data.pageList[i].paymentTime==null){
//                            this.showTime=false;
//                        }else{
//                            this.showTime=true;
//                        }
                        let arr=['待付款','交易关闭','待发货','待收货','交易完成','已退款'];
                        for (let k=0;k<arr.length;k++){
                            console.log(res.data.data.pageList[i].orderStatus);
                            if(res.data.data.pageList[i].orderStatus==k){
                                res.data.data.pageList[i].orderStatus=arr[k];
                            }
                        }
                    }
                    this.tableData = res.data.data.pageList;
                })
            }
        },

        created() {
            this.ajax(1,10000);
//            //查询供应商
//            this.$http.post(this.url + '/warehouse/all_warehouse', {
//                page: 1,
//                num: 100000,
//                status: 1,
//            }, {emulateJSON: true}).then(function (res) {
//                console.log(res);
//                for (let k = 0; k < res.data.data.pageList.length; k++) {
//                    let obj = {};
//                    obj.label = res.data.data.pageList[k].warehouseName;
//                    obj.value2 = res.data.data.pageList[k].warehouseCode;
//                    this.options2.push(obj)
//                }
//                let obj = {value2: "", label: "-- 请选择 --"};
//                this.options2.unshift(obj)
//            });
        }

    }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
    }

    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .spans0 {
        width: 100px;
    }

    .spans1 {
        width: 120px;
    }

    .spans {
        width: 70px;
    }

    .el-row2 {
        margin: 10px 0;
    }

    .el-row4 {
        margin-bottom: 10px;
    }

    .block {
        margin-top: 10px;
        text-align: right;
    }

    .btns {
        padding: 10px 15px;
    }

    img {
        width: 50px;
        height: 50px;
        vertical-align: middle;
        margin: 10px 0;
    }

    .bt {
        border-top: 2px dashed green;
    }

    .bb {

    }

    .tuisong {
        margin-bottom: 5px;
        margin-left: 10px;
    }
</style>
