<template>
    <!--查询spu-->
    <div class="inquiry-spu">
        <!--主页面-->
        <div>
            <!--nav查询暂时-->
            <el-row :gutter="12">
                <!--<el-col :span="5">-->
                    <!--<div class="el-form">-->
                        <!--<span class="spans0">商品发货仓</span>-->
                        <!--<div  class="el-form-item">-->
                            <!--<el-cascader-->
                                    <!--:props="defaultProps1"-->
                                    <!--:options="options1"-->
                                    <!--v-model="selectedOptions1"-->
                                    <!--filterable-->
                                    <!--clearable-->
                                    <!--@change="handleChange1">-->
                            <!--</el-cascader>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</el-col>-->
                <!--<el-col :span="4" class="shop">-->
                    <!--<span class="spans0">商品名称</span>-->
                    <!--<el-input type="text" placeholder="请输入商品名称" v-model="skuName"></el-input>-->
                <!--</el-col>-->
                <el-col :span="5" class="shop">
                    <span class="spans0">spucode</span>
                    <el-input type="text" placeholder="请输入spucode" v-model="spucode"></el-input>
                </el-col>
                <el-col :span="5" class="shop">
                    <span class="spans0">是否在售</span>
                    <el-select v-model="status" placeholder="请选择" class="clas"
                               :clearable="clearable">
                        <el-option
                                v-for="item in statusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <!--<el-col :span="4">-->
                    <!--<div class="grid-content bg-purple">-->
                        <!--<span class="spans1">发布状态</span>-->
                        <!--<el-select v-model="value3" placeholder="请选择">-->
                            <!--<el-option-->
                                    <!--v-for="item in options3"-->
                                    <!--:key="item.value3"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value3">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</div>-->
                <!--</el-col>-->
                <!--<el-col :span="4">-->
                    <!--<div class="grid-content bg-purple">-->
                        <!--<span class="spans1">是否组套</span>-->
                        <!--<el-select v-model="value4" placeholder="请选择">-->
                            <!--<el-option-->
                                    <!--v-for="item in options4"-->
                                    <!--:key="item.value4"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value4">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</div>-->
                <!--</el-col>-->
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="inquiry">查询</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="clears">清除条件</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <a :href="url+'/exportSpuOrBrandExcel?code=S&spuCode='+spucode"><el-button type="primary">导出</el-button></a>
                    </div>
                </el-col>
            </el-row>
            <!--table-->
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%;margin-top: 8px"
                    max-height="500">
                <el-table-column
                                 prop="spuId"
                                 label="spuId"
                                 >
                </el-table-column>
                <el-table-column
                        prop="spucode"
                        label="spucode"
                >
                </el-table-column>
                <el-table-column
                        prop="spuname"
                        label="商品名称"
                        >
                </el-table-column>
                <el-table-column
                        prop="allStockNumber"
                        label="可售库存"
                >
                </el-table-column>
                <el-table-column
                        prop="spuTitle"
                        label="商品标题"
                       >
                </el-table-column>
                <el-table-column
                        prop="listStartTime"
                        label="上架时间"
                        width="120"
                        >
                    <template slot-scope="scope">
                        <p v-show="scope.row.listStartTime==null?false:true">{{scope.row.listStartTime | time}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="listStopTime"
                        label="下架时间"
                        width="120"
                >
                    <template slot-scope="scope">
                        <p v-show="scope.row.listStopTime==null?false:true">{{scope.row.listStopTime | time}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operate"
                        label="操作"
                        >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="publish(scope.row,scope.$index)">{{scope.row.spuStatus==0?'发布':'编辑'}}</el-button>
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                clearable:true,
                status:'',//是否在售
                statusOptions: [{label: '是', value: '1'}, {label: '否', value: '0'}],
                rules: {},
                tableData:[{}],
                currentPage: 1,
                arr:[],
                spucode:'',
            }
        },
        methods: {
            //清除条件
            clears(){
                this.spucode = '';
                this.status = '';
            },
            //查询
            inquiry(){
                this.currentPage = 1;
                this.ajax(this.currentPage,this.spucode,this.status)
            },
            publish(rows,index){
                this.$router.push({path:'/publish2',query:{selectspucode:rows.spucode}});
            },
            //分页函数
            handleCurrentChange(val) {
                this.currentPage = val;
               this.ajax(this.currentPage,this.spucode,this.status);
            },
            //ajax
            ajax(a1,a2,a3){
                this.$http.post(this.url+'/spuManage/select_allSpu',{
                    page:a1,
                    num:10,
                    orderBy:2,
                    spucode:a2,
                    haveSale:a3
                },{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null){
                        this.tableData = [];
                        this.arr.length = 0;
                    }else{
                        this.tableData = res.data.data.pageList;
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
        mounted(){
            this.ajax(1,'','');
        },
    }
</script>

<style scoped>
    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .spans1 {
        width: 120px;
    }

    .spans0 {
        line-height: 36px;
        width: 60px;
    }

    .el-row2 {
        margin-top: 10px;
        text-align: left;
    }
.block{
    text-align: right;
    margin-top: 5px;
}
    .el-form{
        display: flex;
    }
    .shop{
        display: flex;
    }
</style>
