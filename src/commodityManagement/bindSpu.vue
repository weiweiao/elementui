<template>
    <!--绑定spu-->
    <div class="bind-spu">
        <!--主页面-->
        <div>
            <el-tabs type="border-card" @tab-click="tabsChange">
                <el-tab-pane label="全部商品">
                    <el-row class="el-row2">
                        <el-col :span="9">
                            <el-button type="primary" @click="wholeBind">批量绑定</el-button>
                        </el-col>
                        <el-col :span="6" class="shop">
                            <span class="spans0">商品名称</span>
                            <el-input type="text" placeholder="请输入商品名称" v-model="selectCommodityName"
                                      class="kk"></el-input>
                        </el-col>
                        <el-col :span="5" class="shop">
                            <span class="spans0">spucode</span>
                            <el-input type="text" placeholder="请输入spucode" v-model="selectSpuCode"
                                      class="kk"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content bg-purple">
                                <el-button type="primary" @click="inquiry">查询</el-button>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content bg-purple">
                                <el-button type="primary" @click="clears1">清除条件</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%;max-height: 450px;overflow-y: scroll"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="spucode"
                                label="商品编码(spucode)"
                                width="180"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="spuname"
                                label="商品名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="tags"
                                label="已绑定标签"
                        >
                            <template slot-scope="scope">
                                <el-tag type="success" style="margin: 5px" v-for="item,index in scope.row.tags">
                                    {{item.tagName}}
                                </el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页-->
                    <div class="block" style="width: 100%">
                        <div style="width: 50%;text-align: right">
                            <el-button type="primary" @click="save">返回列表</el-button>
                        </div>
                        <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10]"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="arr.length">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已绑定商品">
                    <el-row class="el-row2">
                        <el-col :span="11">
                            <el-button type="primary" @click="wholeRemove">批量移除</el-button>
                        </el-col>
                        <!--<el-col :span="6" class="shop">-->
                        <!--<span class="spans0">商品名称</span>-->
                        <!--<el-input type="text" placeholder="请输入商品名称" v-model="selectCommodityName2" class="kk"></el-input>-->
                        <!--</el-col>-->
                        <!--<el-col :span="5" class="shop">-->
                        <!--<span class="spans0">spucode</span>-->
                        <!--<el-input type="text" placeholder="请输入spucode" v-model="selectSpuCode2" class="kk"></el-input>-->
                        <!--</el-col>-->
                        <!--<el-col :span="2">-->
                        <!--<div class="grid-content bg-purple">-->
                        <!--<el-button type="primary" @click="inquiry2">查询</el-button>-->
                        <!--</div>-->
                        <!--</el-col>-->
                    </el-row>
                    <el-table
                            :data="tableData2"
                            border
                            style="width: 100%;max-height: 450px;overflow-y: scroll"
                            @selection-change="handleSelectionChange2"
                    >
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="spucode"
                                label="商品编码(spucode)"
                                width="180"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="spuname"
                                label="商品名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="tags"
                                label="已绑定标签"
                        >
                            <template slot-scope="scope">
                                <el-tag type="success" style="margin: 5px" v-for="item,index in scope.row.tags">
                                    {{item.tagName}}
                                </el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="width: 50%;margin-top: 10px;text-align: right">
                        <el-button type="primary" @click="save">返回列表</el-button>
                    </div>
                    <!--分页-->
                    <!--<div class="block" style="width: 100%">-->
                    <!--<div style="width: 50%;text-align: right">-->
                    <!--<el-button type="primary" @click="save">返回列表</el-button>-->
                    <!--</div>-->
                    <!--<el-pagination-->
                    <!--@current-change="handleCurrentChange2"-->
                    <!--:current-page="currentPage2"-->
                    <!--:page-sizes="[10]"-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                    <!--:total="arr2.length">-->
                    <!--</el-pagination>-->
                    <!--</div>-->
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [],
                rules: {},
                tableData: [],
                currentPage: 1,
                arr: [],
                spuIdArr: [],
                selectSpuCode: '',//根据spucode查询
                selectCommodityName: '',//根据商品名称查询
                redNum: '',//标记
                ///////
                tableData0: [],//已绑定??
                binded: [],//已绑定
                removed: [],//移除
                showRemove: false,//移除显示与隐藏
                multipleSelection: [],//多选
                //绑定商品
                selectCommodityName2: '',
                multipleSelection2: [],
                selectSpuCode2: '',
                tableData2: [],
                currentPage2: 1,
                arr2: [],
                spuIdArr0: [],
            }
        },
        methods: {
            //清除条件
            clears1(){
                this.selectCommodityName = '';
                this.selectSpuCode = '';
            },
            //tabs
            tabsChange(val) {
                console.log(val.index);
                if (val.index == '0') {
                    this.currentPage = 1;
                    this.ajaxAll(this.currentPage, '', '');
                } else {
                    this.ajax2()
                }
            },
            //绑定商品
            inquiry2() {

            },
            //多选
            handleSelectionChange2(val) {
                this.multipleSelection2 = val;
            },
            //分页2
            handleCurrentChange2(val) {
                console.log(val);
            },
            //查询1
            inquiry() {
                this.currentPage = 1;
                this.ajaxAll(this.currentPage, this.selectSpuCode, this.selectCommodityName)
            },
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
                this.spuIdArr = [];
                for (let i = 0; i < val.length; i++) {
                    this.spuIdArr.push(val[i].spuId);
                }
                console.log(this.spuIdArr);
            },
            //保存按钮
            save() {
                this.$router.push({
                    path: '/label',
                });
            },
            //批量绑定
            wholeBind() {
                if (this.multipleSelection.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择商品!'
                    })
                } else {
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        let obj = {};
                        obj = this.multipleSelection[i]
                        this.binded.push(obj);
                    }
                    ;
                    let arr = [];
                    for (let i = 0; i < this.binded.length; i++) {
                        arr.push(this.binded[i].spuId);
                    }
                    ;
                    for (let i = 0; i < this.spuIdArr0.length; i++) {
                        arr.unshift(this.spuIdArr0[i])
                    }
                    console.log(this.spuIdArr0);
                    console.log(arr);
                    //去重
                    let arr1 = [];
                    console.log(arr);
                    for (let i = 0; i < arr.length; i++) {
                        if (arr1.indexOf(arr[i]) < 0) {
                            arr1.push(arr[i]);
                        }
                    }
                    console.log(arr1);
                    this.$http.post(this.url + '/spuTag/tag_addSpu', {
                        tagId: this.$route.query.tagId,
                        spuIds: arr1.join(',')
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '绑定成功!'
                            });
                            //刷新
                            this.ajaxAll(this.currentPage, this.selectSpuCode, this.selectCommodityName);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '绑定失败!'
                            });
                        }
                    }, function (err) {
                        this.$message({
                            type: 'error',
                            message: '服务器连接中断,请联系后台人员!',
                        });
                    });
                }
            },
            //批量移除
            wholeRemove() {
                if (this.multipleSelection2.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择商品!'
                    })
                } else {
//                    for(let i=0;i<this.multipleSelection2.length;i++){
//                        this.binded.splice( this.binded.indexOf(this.multipleSelection2[i]),1);
//                    }
                    let arr = [];
                    for (let i = 0; i < this.multipleSelection2.length; i++) {
                        arr.push(this.multipleSelection2[i].spuId)
                    }
                    console.log(arr);
                    this.$http.post(this.url + '/delete/tag_Spu', {
                        tagId: this.$route.query.tagId,
                        spuIds: arr.join(',')
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '移除成功!'
                            })
                            //刷新
                            this.ajax2();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '移除失败!'
                            })
                        }
                    }, function (err) {
                        this.$message({
                            type: 'error',
                            message: '服务器连接中断,请联系后台人员!',
                        });
                    });
                }
            },
            //分页函数
            handleCurrentChange(val) {
                this.currentPage = val;
                this.ajaxAll(this.currentPage, this.selectSpuCode, this.selectCommodityName);
            },
            //ajaxAll
            ajaxAll(a1, a2, a3) {
                this.$http.post(this.url + '/spuManage/select_allSpu', {
                    page: a1,
                    num: 10,
                    orderBy: 2,//必须写
                    haveTags: 1,
                    spucode: a2,
                    spuname: a3,
                }, {emulateJSON: true}).then(function (res) {
                    if (res.data.data == null) {
                        this.tableData = [];
                        this.arr.length = 0;
                    } else {
                        this.tableData = res.data.data.pageList;
                        this.arr.length = res.data.data.pageTotal;
                    }
                }, function (err) {
                    this.$message({
                        type: 'error',
                        message: '服务器连接中断,请联系后台人员!',
                    });
                });
            },
            ajax2() {
                this.$http.post(this.url + '/tag/query_allSpu', {
                    tagId: this.$route.query.tagId,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data == null || res.data.data == null) {
                        this.tableData2 = [];
                    } else {
                        let arr = [];
                        for (let i = 0; i < res.data.data.length; i++) {
                            arr.push(res.data.data[i].spuId);
                        }
                        this.spuIdArr0 = arr;
                        this.tableData2 = res.data.data;
                    }
                });
            }
        },
        mounted() {
            console.log(this.$route.query.tagId);
            //查询suoyou
            this.ajaxAll(1, '', '');
            this.ajax2();
        },
    }
</script>

<style scoped>
    .noBind {
        margin-right: 150px;
    }

    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .spans0 {
        line-height: 36px;
        width: 120px;
        font-size: 14px;
    }

    .el-row2 {
        margin-bottom: 10px;
        text-align: left;
    }

    .block {
        display: flex;
        justify-content: space-between;
        /*text-align: right;*/
        margin-top: 5px;
    }

    .shop {
        display: flex;
    }

    .kk {
        margin-right: 8px;
    }
</style>
