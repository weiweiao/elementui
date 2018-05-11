<template>
    <!--商品-->
    <div style="width:100%">
        <!--nav-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="仓库编码">
                <el-input type="text" placeholder="请输入仓库编码" v-model="warehouseCode" class="clas0"></el-input>
            </el-form-item>
            <el-form-item label="skucode">
                <el-input type="text" placeholder="请输入skucode" v-model="skucode" class="clas0"></el-input>
            </el-form-item>
            <el-form-item label="spucode">
                <el-input type="text" placeholder="请输入spucode" v-model="spucode" class="clas0"></el-input>
            </el-form-item>
            <el-form-item label="在售状态">
                <el-select v-model="status" placeholder="请选择" class="clas" @change="statusChange"
                           :clearable="clearable">
                    <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item label="排序方式">-->
            <!--<el-select v-model="sort" placeholder="请选择" class="clas" @change="sortChange" :clearable="clearable">-->
            <!--<el-option-->
            <!--v-for="item in sortOptions"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="searchDate()">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="heigher">高级</el-button>
            </el-form-item>
            <el-form-item style="margin-left: 20px">
                <el-button type="primary" @click="clears">清除条件</el-button>
            </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" v-show="heighShow">
            <el-form-item label="类目查询">
                <el-cascader
                        style="width: 180px"
                        placeholder="请输入"
                        :options="commodityClassOptions"
                        filterable
                        clearable
                        @change="finalChoose"
                        change-on-select
                        v-model="commodityClassValue"
                        :props="defaultProps2"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="品牌">
                <!--<el-input type="text" placeholder="请输入品牌" v-model="brandId" class="clas0"></el-input>-->
                <el-select v-model="brandId" placeholder="请选择品牌" :clearable="clearable">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序方式">
                <el-select v-model="sort" placeholder="请选择" class="clas" @change="sortChange" :clearable="clearable">
                    <el-option
                            v-for="item in sortOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <!--table-->
        <el-table
                :data="tableData"
                border
                style="width: 100%"
                max-height="475"
                @selection-change="handleSelectionChange"
        >
            <el-table-column
                    type="selection"
                    width="55"
            >
            </el-table-column>
            <el-table-column
                    prop="productId"
                    label="商品ID"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    prop="productImageUrl"
                    label="商品图片"
                    width="86"
            >
                <template slot-scope="scope">
                    <img :src="scope.row.productImageUrl" width="40" height="40" style="margin-top: 10px"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="productName"
                    label="商品名称"
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    prop="warehouseName0"
                    label="仓库名称"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="skucode"
                    label="skucode"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="spucode"
                    label="spucode"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="null"
                    label="所属分类"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="listPrice"
                    label="商品成本价"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="originalPrice"
                    label="商品市场价"
                    width="100"
            >
                <template slot-scope="scope">
                    <p>{{scope.row.originalPrice/100}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="商品售价"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="soldNum"
                    label="销量"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="null"
                    label="近30日销量"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="stockNumber"
                    label="库存"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="null"
                    label="去返毛利率"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="null"
                    label="利润比"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="isRelease"
                    label="状态"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    prop="null"
                    label="权重"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    prop="null"
                    label="发布时间"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作"
                    fixed="right"
            >
                <template slot-scope="scope">
                    <div v-show="scope.row.isRelease=='下架'?true:false">

                        <el-button type="text" size="small" @click="upOrDown(scope.row,scope.$index)">上架
                        </el-button>
                        <br>
                    </div>
                    <div v-show="scope.row.isRelease=='上架'?true:false">
                        <el-button type="text" size="small" @click="upOrDown(scope.row,scope.$index)">下架</el-button>
                        <br>
                    </div>
                    <el-button type="text" size="small" @click="adit(scope.row,scope.$index)">编辑</el-button>
                    <br>
                    <el-button type="text" size="small" @click="viewLog(scope.row,scope.$index)">查看日志</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block">
            <div>
                <el-button type="primary" :disabled="disabled" v-show="upShow" @click="wholeUp">批量上架</el-button>
                <el-button type="primary" :disabled="disabled" v-show="downShow" @click="wholeDown">批量下架</el-button>
            </div>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="arr.length">
            </el-pagination>
        </div>
        <div style="width:100%">
            <!--查看日志弹框-->
            <el-dialog title="查看日志" :visible.sync="dialogTableVisible" top="5vh">
                <el-table
                        :data="logTableData"
                        border
                        style="width: 100%;"
                        max-height="500"
                >
                    <!--<el-table-column-->
                    <!--type="index"-->
                    <!--label="序号"-->
                    <!--width="77">-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="executeAccount"
                            label="操作人"
                            width="80"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="ipAddress"
                            label="IP"
                            width="120"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="operateList"
                            label="操作内容"

                    >
                        <template slot-scope="scope">
                            <p v-for="item in scope.row.operateList">{{item}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="executeTime"
                            label="操作时间"
                            width="140"
                    >
                        <template slot-scope="scope">
                            {{scope.row.executeTime | time}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>

    </div>
</template>

<script type="text/javascript">
    export default {
        data() {
            return {
                clearable:true,
                options:[],
                heighShow:false,
                defaultProps2: {
                    value: 'itemModuleId',
                    label: 'itemModuleName',
                    children: 'moduleChild'
                },
                firstId:'',
                secondId:'',
                commodityClassOptions:[],
                commodityClassValue:[],//类目
                brandId: '',
                clearable: true,
                dialogTableVisible: false,//查看日志
                logTableData: [],//查看日志
                formInline: {},
                //在售状态
                statusOptions: [{label: '上架', value: '1'}, {label: '下架', value: '0'}],
                status: '',
                //排序
                sortOptions: [{label: '降序', value: '1'}, {label: '升序', value: '0'}],
                sort: '',
                //table
                tableData: [],
//                upOrDownShow: '',//上架或下架显示字
                currentPage: 1,
                arr: [],//分页
                disabled: true,//按钮变灰
                skuname: '',
                skucode: '',
                warehouseCode: '',
                chooseArr: [],//多选
                upShow: '',//上架按钮显示
                downShow: '',//下架按钮显示
                spucode: ''
            }
        },
        methods: {
            //高级
            heigher(){
              this.heighShow = !this.heighShow;
            },
            //类目
            finalChoose(val) {
                console.log(val);
                this.secondId = '';
                this.firstId = '';
                this.firstId = val[0];
                if(val.length>1){
                    this.secondId = val[1];
                }
                console.log(this.firstId);
                console.log(this.secondId);
            },
            //清除条件
            clears() {
                this.warehouseCode = '';
                this.skucode = '';
                this.spucode = '';
                this.status = '';
                this.sort = '';
                this.firstId = '';
                this.secondId = '';
                this.commodityClassValue = [];
                this.brandId = '';
            },
            //查看日志
            viewLog(row, index) {
                this.dialogTableVisible = true;
                this.$http.post(this.url + '/product/getProductLogs', {productId: row.productId}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.data == null || res.data.data == '') {
                        this.logTableData = [];
                    } else {
                        this.logTableData = res.data.data;
                    }
                }, function (err) {
                    this.$message({
                        type: 'error',
                        message: '服务器连接中断,请联系后台人员!',
                    });
                })
            },
            //查询
            searchDate() {
                console.log(this.warehouseCode);
                if (this.status == '1') {
//                    this.upOrDownShow = '下架';
                    this.downShow = true;
                    this.upShow = false;
                } else {
//                    this.upOrDownShow = '上架';
                    this.upShow = true;
                    this.downShow = false;
                }
                //刷新
                this.currentPage = 1;
                this.ajax(this.currentPage, this.status, this.sort, this.warehouseCode, this.skucode, this.skuname, this.spucode,this.firstId,this.secondId,this.brandId);
            },
            //在售状态
            statusChange(val) {
                console.log(val);
            },
            //排序
            sortChange(val) {
                console.log(val);
            },
            //选择
            handleSelectionChange(val) {
                console.log(val);
                this.chooseArr = []
                for (let i = 0; i < val.length; i++) {
                    this.chooseArr.push(val[i].productId);
                }
                console.log(this.chooseArr);
                if (val.length != 0) {
                    this.disabled = false;
                } else {
                    this.disabled = true;
                }
            },
            //上架或下架
            upOrDown(row, index) {
                console.log(row.isRelease, index);
                if (row.isRelease == '下架') {
                    this.$confirm('确定上架该商品?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.post(this.url + '/product/upOrDown_skus', {
                            productIds: row.productId,
                            order: 1
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '上架成功!'
                                });
                                //刷新
                                this.status = '0';//默认下架
                                this.sort = '1';//默认降序
//                                this.upOrDownShow = '上架';
                                this.upShow = true;
                                //刷新
                                this.ajax(this.currentPage, this.status, this.sort, this.warehouseCode, this.skucode, this.skuname, this.spucode,this.firstId,this.secondId,this.brandId);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '上架失败!'
                                });
                            }
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                } else {
                    this.$confirm('确定下架该商品?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.post(this.url + '/product/upOrDown_skus', {
                            productIds: row.productId,
                            order: 0
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '下架成功!'
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '下架失败!'
                                });
                            }
                            //刷新
                            this.ajax(this.currentPage, this.status, this.sort, this.warehouseCode, this.skucode, this.skuname, this.spucode,this.firstId,this.secondId,this.brandId);
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }

            },
            //编辑
            adit(row, index) {
                console.log(row, index);
                this.$router.push({
                    path: '/publish10',
                    query: {skucode: row.skucode, productId: row.productId}
                });
            },
            //批量下架
            wholeDown() {
                let arr = [];
                for (let k = 0; k < this.chooseArr.length; k++) {
                    if (arr.indexOf(this.chooseArr[k]) < 0) {
                        arr.push(this.chooseArr[k]);
                    }
                }
                this.$confirm('确定下架该商品吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //order代表下架
                    this.$http.post(this.url + '/product/upOrDown_skus', {
                        productIds: arr.join(','),
                        order: 0
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '下架成功!'
                            });
                            this.chooseArr = [];
                            //刷新
                            this.ajax(this.currentPage, this.status, this.sort, this.warehouseCode, this.skucode, this.skuname, this.spucode,this.firstId,this.secondId,this.brandId);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '下架失败!'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            //批量上架
            wholeUp() {
                let arr = [];
                for (let k = 0; k < this.chooseArr.length; k++) {
                    if (arr.indexOf(this.chooseArr[k]) < 0) {
                        arr.push(this.chooseArr[k]);
                    }
                }
                console.log(arr);
                this.$confirm('确定上架该商品吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //order=1代表上架
                    this.$http.post(this.url + '/product/upOrDown_skus', {
                        productIds: arr.join(','),
                        order: 1
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '上架成功!'
                            });
                            this.chooseArr = [];
                            //刷新
                            this.ajax(this.currentPage, this.status, this.sort, this.warehouseCode, this.skucode, this.skuname, this.spucode,this.firstId,this.secondId,this.brandId)
                        } else {
                            this.$message({
                                type: 'error',
                                message: '上架失败!'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            //分页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.ajax(this.currentPage, this.status, this.sort, this.warehouseCode, this.skucode, this.skuname, this.spucode,this.firstId,this.secondId,this.brandId)
            },
            //ajax
            ajax(a1, a2, a3, a4, a5, a6, a7,a8,a9,a10) {
                if(a8==undefined){
                    a8='';
                }
                this.$http.post(this.url + '/product/select_product', {
                    page: a1,
                    num: 10,
                    isRelease: a2,
                    orderBy: a3,
                    warehouseCode: a4,
                    skucode: a5,
                    skuname: a6,
                    spucode: a7,
                    itemModuleId1:a8,
                    itemModuleId2:a9,
                    brandId:a10,
                }, {emulateJSON: true}).then(function (res) {
                    if (res.data.data.pageList == null || res.data.data == null) {
                        this.tableData = [];
                        this.arr.length = 0;
                    } else {
                        for (let i = 0; i < res.data.data.pageList.length; i++) {
                            res.data.data.pageList[i].warehouseName0 = res.data.data.pageList[i].warehouseName+'--'+res.data.data.pageList[i].type;
                            //商城价格
                            let p = res.data.data.pageList[i].price / 100;
                            res.data.data.pageList[i].price = p;
                            //是否组套
                            if (res.data.data.pageList[i].isBom == 0) {
                                res.data.data.pageList[i].isBom = '否'
                            } else {
                                res.data.data.pageList[i].isBom = '是'
                            }
                            //是否虚拟组套
                            if (res.data.data.pageList[i].isVirtualBom == 0) {
                                res.data.data.pageList[i].isVirtualBom = '否'
                            } else {
                                res.data.data.pageList[i].isVirtualBom = '是'
                            }
                            //在售状态
                            if (res.data.data.pageList[i].isRelease == 0) {
                                res.data.data.pageList[i].isRelease = '下架';

                            } else {
                                res.data.data.pageList[i].isRelease = '上架'

                            }
                            //是否支持退款
                            if (res.data.data.pageList[i].noRefund == 0) {
                                res.data.data.pageList[i].noRefund = '否'
                            } else {
                                res.data.data.pageList[i].noRefund = '是'
                            }
                        }
                        this.tableData = res.data.data.pageList;
                        this.arr.length = res.data.data.pageTotal;
                    }
                });
            }
        },
        mounted() {
            //            this.status='0';//默认下架
            this.sort = '1';//默认降序
//            this.upOrDownShow='上架';
            this.upShow = true;
            this.ajax(1, '', 1, '', '', '', '','','','')
        },
        created() {
            //查询类目
            this.$http.post(this.url + '/itemModule/itemModuleAndChild', {}, {emulateJSON: true}).then(function (res) {
                console.log(res);
                this.commodityClassOptions = res.data.data;
                console.log(this.commodityClassOptions);

            },function (err) {
                this.$message({
                    type:'error',
                    message:'服务器连接中断,请联系后台人员!',
                });
            });
            //查询品牌
            this.$http.post(this.url + '/brand/select_brand_ByName', {page:1,num:10000000}, {emulateJSON: true}).then(function (res) {
                console.log(res);
                for(let i=0;i<res.data.data.pageList.length;i++){
                    let obj = {};
                    obj.label = res.data.data.pageList[i].brandName;
                    obj.value = res.data.data.pageList[i].brandId;
                    this.options.push(obj);
                }
            });
        }
    }
</script>

<style scoped>
    .clas0 {
        width: 130px;
    }

    .clas {
        width: 90px;
    }

    .block {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
    }
</style>

