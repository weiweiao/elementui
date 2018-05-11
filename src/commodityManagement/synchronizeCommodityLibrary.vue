<template>
    <!--同步商品库-->
    <div class="synchronize-commodity-library">
        <!--主页面-->
        <div>
            <!--nav-->
            <el-row class="el-row2">
                <el-col :span="5">
                    <div class="el-form">
                        <span class="spans0">商品发货仓</span>
                        <div class="el-form-item ww">
                            <el-cascader
                                    :clearable="clearable"
                                    :props="defaultProps1"
                                    :options="options1"
                                    v-model="selectedOptions1"
                                    filterable
                                    @change="handleChange1">
                            </el-cascader>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4" class="shop">
                    <span class="spans0">商品名称</span>
                    <el-input type="text" placeholder="请输入商品名称" v-model="skuName" class="ww"></el-input>
                </el-col>
                <el-col :span="4" class="shop">
                    <span class="spans0">skucode</span>
                    <el-input type="text" placeholder="请输入skucode" v-model="skuCode" class="ww"></el-input>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="spans1">发布状态</span>
                        <el-select v-model="value3" placeholder="请选择" class="ww" :clearable="clearable">
                            <el-option
                                    v-for="item in options3"
                                    :key="item.value3"
                                    :label="item.label"
                                    :value="item.value3">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content bg-purple">
                        <span class="spans1">是否组套</span>
                        <el-select v-model="value4" placeholder="请选择" class="ww" :clearable="clearable">
                            <el-option
                                    v-for="item in options4"
                                    :key="item.value4"
                                    :label="item.label"
                                    :value="item.value4">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
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
            </el-row>
            <!--table-->
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    max-height="480"
                    >
                <el-table-column
                        prop="xuhao"
                        label="序号"
                        width="80px"
                >
                </el-table-column>
                <el-table-column
                        prop="productId"
                        label="productId"
                        width="110"
                >
                </el-table-column>
                <el-table-column
                        prop="skucode"
                        label="skucode"
                        width="110"
                >
                </el-table-column>
                <el-table-column
                        prop="skuname"
                        label="商品名称"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="spucode"
                        label="spucode"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="warehouseName"
                        label="发货仓"
                        width="180px"
                >
                </el-table-column>
                <el-table-column
                        prop="stockNumber"
                        label="库存"
                >
                </el-table-column>
                <el-table-column
                        prop="listPrice"
                        label="平均成本价"
                >
                    <template slot-scope="scope">
                        {{scope.row.listPrice}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="isBom"
                        label="是否组套"
                        width="70px"
                >
                </el-table-column>
                <el-table-column
                        prop="gmtCreate"
                        label="同步时间"
                        width="160px"
                >
                    <template slot-scope="scope">
                        <p v-show="scope.row.gmtCreate==null?false:true">{{scope.row.gmtCreate | time}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operate"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="publish2(scope.row,scope.$index)">{{fabu}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
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
                warehouseCode: '',//下拉菜单warehouseCode
                skuName: '',//商品名称
                skuCode: '',//规格代码
                selectedOptions1: [],
                tableData: [{}],
                currentPage: 1,
                arr: [],//分页
                value: '',
                value2: '',
                value3: '0',
                value4: '0',
                options1: [],
                defaultProps1: {
                    value: 'warehouseCode',
                    label: 'warehouseName',//过滤warehouseName
                },
                options2: [{
                    value2: '选项一',
                    label: '商品名称'
                },
                    {
                        value2: '选项二',
                        label: 'skucode'
                    },
                    {
                        value2: '选项三',
                        label: '平均成本价'
                    },
                ],
                options3: [{value3: '0', label: '未发布'}, {value3: '1', label: '已发布'}],//发布状态
                options4: [{value4: '0', label: '否'}, {value4: '1', label: '是'}],//是否组套
                fahuocang: '',
                warehouseCode: '',
                fabu:'',
            }
        },
        methods: {
            //清空条件
            clears(){
                this.selectedOptions1 = [];
                this.skuName = '';
                this.skuCode = '';
                this.value3 = '';
                this.value4 = '';
                this.warehouseCode = '';
            },
            handleChange1(val) {
                this.warehouseCode = val[0];
                console.log();
            },
            //头部查询
            inquiry() {
                if(this.value3==0){
                    this.fabu="发布"
                }else{
                    this.fabu=""
                }
                this.$http.post(this.url + '/product/select_synchronizeProduct', {
                    page: 1,
                    num: 10,
                    warehouseCode:this.warehouseCode,
                    productStatus:this.value3,
                    isBom:this.value4,
                    skuname:this.skuName,//商品名称
                    skucode:this.skuCode,//规格代码
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    for (let i = 0; i < res.data.data.pageList.length; i++) {
                        if(res.data.data.pageList[i].isBom==0){
                            res.data.data.pageList[i].isBom="否"
                        }else{
                            res.data.data.pageList[i].isBom="是"
                        }
                        this.fahuocang = res.data.data.pageList[i].warehouseName + '--' + res.data.data.pageList[i].type;
                        res.data.data.pageList[i].xuhao = i + 1;
                        res.data.data.pageList[i].warehouseName = this.fahuocang;
                    }
                    this.arr.length = res.data.data.pageTotal;
                    this.tableData = res.data.data.pageList;
                });
            },
            //发布
            publish2(rows, index) {
                console.log(rows, index);
                this.$router.push({
                    path: '/publish2',
                    query: {
                        da: rows.warehouseName,
                        skuName: rows.skuname,
                        spuKode: rows.spucode,
                        productId: rows.productId,
                        skucode: rows.skucode
                    }
                })
                console.log(rows.warehouseCode);
            },
            //分页函数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(val);
                this.$http.post(this.url + '/product/select_synchronizeProduct', {
                    page: val,
                    num: 10,
                    isBom:this.value4,
                    productStatus:this.value3,
                    skuname:this.skuName,//商品名称
                    skucode:this.skuCode,
                    warehouseCode:this.warehouseCode,
                }, {emulateJSON: true}).then(function (res) {
                    if (res.data.status == 202) {
                        val = --val;
                        this.handleCurrentChange(val);
                    } else {
                        for (var i = 0; i < res.data.data.pageList.length; i++) {
                            if(res.data.data.pageList[i].isBom==0){
                                res.data.data.pageList[i].isBom="否"
                            }else{
                                res.data.data.pageList[i].isBom="是"
                            }
                            if (val == 1) {
                                res.data.data.pageList[i].xuhao = i + 1;
                            } else {
                                res.data.data.pageList[i].xuhao = (val - 1) * 10 + i + 1
                            }
                        }
                        this.arr.length = res.data.data.pageTotal;
                        this.tableData = res.data.data.pageList;
                    }
                });
            },
        },
        mounted() {
            //查询table所有
            if(this.value3==0){
                this.fabu="发布"
            }else{
                this.fabu=""
            }
            this.$http.post(this.url + '/product/select_synchronizeProduct', {
                page: 1,
                num: 10,
                productStatus:this.value3,
                isBom:this.value4,
            }, {emulateJSON: true}).then(function (res) {
                console.log(res);
                for (let i = 0; i < res.data.data.pageList.length; i++) {
                    if(res.data.data.pageList[i].isBom==0){
                        res.data.data.pageList[i].isBom="否"
                    }else{
                        res.data.data.pageList[i].isBom="是"
                    }
                    this.fahuocang = res.data.data.pageList[i].warehouseName + '--' + res.data.data.pageList[i].type;
                    res.data.data.pageList[i].xuhao = i + 1;
                    res.data.data.pageList[i].warehouseName = this.fahuocang;
                }
                this.arr.length = res.data.data.pageTotal;
                this.tableData = res.data.data.pageList;
            });
            //查询商品发货仓所有
            this.$http.post(this.url + '/warehouse/all_warehouse', {
                page: 1,
                num: 100000,
                status: 1,

            }, {emulateJSON: true}).then(function (res) {
                console.log(res);
                for (let k = 0; k < res.data.data.pageList.length; k++) {
                    this.fahuocang = res.data.data.pageList[k].warehouseName + '--' + res.data.data.pageList[k].typeName;
                    res.data.data.pageList[k].xuhao = k + 1;
                    res.data.data.pageList[k].warehouseName = this.fahuocang;
                }
                this.options1 = res.data.data.pageList;
//                let obj = {value:"",label:"-- 请选择 --"};
//                this.options1.unshift(obj)
            });
        },
    }
</script>

<style scoped>
    /*.synchronize-commodity-library{*/
        /*font-size: 14px;*/
    /*}*/
    element.style{
        /*max-height: 600px;*/
    }
    .grid-content {
        display: flex;
        line-height: 36px;
    }
    .spans1 {
        width: 100px;
    }

    .spans0 {
        line-height: 36px;
        width: 80px;
    }

    .el-row2 {
        text-align: left;
        color: #48576a;
    }

    .block {
        text-align: right;
        margin-top: 5px;
    }

    .el-form {
        display: flex;
    }

    .shop {
        display: flex;
    }
    .ww{
        margin-right: 5px;
    }
</style>
