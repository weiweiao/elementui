<template>
    <!--绑定优惠券-->
    <div class="yy">
        <div>
            <el-tabs type="border-card" @tab-click="tabs">
                <el-tab-pane label="未绑定商品">
                    <el-row :gutter="12" style="margin-bottom: 8px">
                        <el-col :span="11">
                            <el-button  @click="bind">批量绑定</el-button>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple el-row2" style="display: flex">
                                <span class="spans">优惠券名称</span>
                                <el-input type="primary" v-model="name"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple el-row2"  style="display: flex">
                                <span style="font-size: 14px;line-height: 35px;width: 60px;">状态</span>
                                <el-select v-model="status" placeholder="请选择">
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
                            <div class="grid-content bg-purple">
                                <el-button type="primary" class="btns" @click="inquiry">查询</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-table
                            class="table a1"
                            :data="tableData1"
                            border
                            @selection-change="handleSelectionChange1"
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                :selectable="selectable"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="couponName"
                                label="优惠券名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="couponAmount"
                                label="面额"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="day"
                                label="有效期"
                        >
                            <template slot-scope="scope">
                                <p v-show="scope.row.day==null?false:true">{{scope.row.day}}</p>
                                <p v-show="scope.row.useDate!=null?true:false">从{{scope.row.useDate|time}}到{{scope.row.outDate|time}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="quantity"
                                label="	发放总量"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="bang"
                                label="	是否绑定"
                        >
                            <template slot-scope="scope">
                                <p v-show="scope.row.bang==1?true:false">已绑定</p>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页1-->
                    <div class="block">
                        <el-pagination
                                @current-change="handleCurrentChange1"
                                :current-page="currentPage1"
                                :page-sizes="[10]"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="arr1.length">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已绑定商品">
                    <el-button @click="remove">批量解除绑定</el-button>
                    <el-table
                            class="table a1"
                            :data="tableData2"
                            border
                            @selection-change="handleSelectionChange2"
                            style="width: 100%;margin-top: 8px">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="couponName"
                                label="优惠券名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="couponAmount"
                                label="面额"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="day"
                                label="有效期"
                        >
                            <template slot-scope="scope">
                                <p v-show="scope.row.day==null?false:true">{{scope.row.day}}</p>
                                <p v-show="scope.row.useDate!=null?true:false">从{{scope.row.useDate|time}}到{{scope.row.outDate|time}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="quantity"
                                label="发放总量"
                        >
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name:'',//优惠券名称
                status:'',//状态
                options: [
                    {
                    value: '',
                    label: '--请选择--'
                }, {
                    value: '1',
                    label: '过期'
                }, {
                    value: '0',
                    label: '未过期'
                }],
                tableData1:[],
                currentPage1:1,
                arr1:[],
                tableData2:[],
                backageId:'',
                changeArr2:[],
                chechboxArr1:'',
                flag:true,
            }
        },
        methods: {
            //变灰
            selectable:function(row,index){   //禁用第四个
                console.log(row);
                if(row.bang==1){
                    return false;
                }else{
                    return true;
                }
            },
            //tabs
            tabs(val){
                console.log(val);
                if(val.label=='未绑定商品'){
                    this.currentPage1 = 1
                    this.ajax1(this.currentPage1,'','');
                }else{
                    this.ajax2();
                }
            },
            //批量绑定
            bind(){
                console.log(this.tableData1);
                if(this.chechboxArr1.length==0){
                    this.$message({
                        type:'warning',
                        message:'请选择商品!',
                        duration:1000,
                    })
                }else{
                    if(this.flag) {
                        this.flag = false;
                        this.$http.post(this.url+'/backagecoupon/update_coupon',{backageId:this.$route.query.row.backageId,coupinId:this.changeArr1,function:'add'},{emulateJSON:true}).then(function (res) {
                            console.log(res);
                            this.flag = true;
                            if(res.data.status==200){
                                this.$message({
                                    type:'success',
                                    message:'绑定商品成功!',
                                    duration:1000,
                                })
                                //刷新
                                this.ajax1(this.currentPage1,this.name,this.status);
                            }else{
                                this.$message({
                                    type:'success',
                                    message:'绑定商品失败!',
                                    duration:1000,
                                })
                            }

                        },function (err) {
                            this.$message({
                                type:'error',
                                message:'服务器连接中断,请联系后台人员!',
                            });
                        })
                    }else{
                        alert('请勿重复提交')
                    }
                }
            },
            //批量移除
            remove(){
                if(this.changeArr2.length==0){
                    this.$message({
                        type:'warning',
                        message:'请选择商品!',
                        duration:1000,
                    })
                }else{
                    this.$http.post(this.url+'/backagecoupon/update_coupon',{backageId:this.$route.query.row.backageId,coupinId:this.changeArr2.join(','),function:'del'},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type:'success',
                                message:'操作成功!',
                                duration:1000,
                            })
                            //刷新
                            this.ajax2();
                        }else{

                        }

                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    })
                }
            },
            //查询
            inquiry(){
                this.currentPage1 = 1;
                this.ajax1(this.currentPage1,this.name,this.status);
            },
            //1-多选
            handleSelectionChange1(val){
                console.log(val);
                this.chechboxArr1 = val;
                let  arr=[];
                for(let i=0;i<val.length;i++){
                    arr.push(val[i].couponId)
                }
                this.changeArr1 = arr.join(',');
                console.log(this.changeArr1);
            },
            //2-多选
            handleSelectionChange2(val){
                let  arr=[];
                for(let i=0;i<val.length;i++){
                    arr.push(val[i].couponId)
                }
                this.changeArr2 = arr;
                console.log(this.changeArr2);
            },
            //fenye
            handleCurrentChange1(val){
                this.currentPage1 = val;
                this.ajax1(this.currentPage1,this.name,this.status);
            },
            //ajax1
            ajax1(a1,a2,a3){
                this.$http.post(this.url+'/backagecoupon/binded_coupon',{backageId:this.backageId,page:a1,num:10,function:'no',couponName:a2,nouse:a3},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data.pageList==null){
                        this.tableData1 = [];
                        this.arr1.length = 0;
                    }else{
//                        for(let i=0;i<res.data.data.pageList.length;i++){
//                            if(res.data.data.pageList[i].bind==''||res.data.data.pageList[i].bind==null){
//                                res.data.data.pageList[i].bind0=''
//                            }else{
//                                let str = res.data.data.pageList[i].bind;
//                                let newArr = [];
//                                newArr = str.split(',');
////                                console.log(arr);
////                                let newArr = [];
////                                if(arr[0]==''||arr[0]==null){
////                                    newArr = arr.splice(1);
////                                    console.log(newArr);
////                                }
////                                console.log(newArr);
//                                    for(let k=0;k<newArr.length;k++){
//                                        if(this.backageId == newArr[k]){
////                                            res.data.data.pageList[i].bind0 = '已绑定';
//
//                                            this.$set(res.data.data.pageList[i],'bind0','已绑定');
//                                            console.log(res.data.data.pageList[i].bind0);
//                                        }else{
//                                            res.data.data.pageList[i].bind0 = ''
//                                        }
//                                    }
//                            }
//                        }
                        this.tableData1 = res.data.data.pageList;
                        this.arr1.length = res.data.data.pageTotal;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
            //ajax2
            ajax2(){
                this.$http.post(this.url+'/backagecoupon/binded_coupon',{backageId:this.backageId,page:1,num:10,function:'yes'},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null){
                        this.tableData2 = [];
                    }else{
                        this.tableData2 = res.data.data;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
        },
        mounted() {
            console.log(this.$route.query.row);
            this.backageId = this.$route.query.row.backageId;
            this.ajax1(1,'','');
        }
    }
</script>

<style scoped>
    .spans{
        font-size: 14px;
        width: 100px;
        line-height: 35px;
    }
    .block{
        text-align: right;
    }
</style>
