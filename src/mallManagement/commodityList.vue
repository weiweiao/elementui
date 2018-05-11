<template>
    <!--商品列表-->
    <div>
        <el-button @click="add">创建商品列表</el-button>
        <el-table
                :data="tableData"
                border
                style="width: 100%;margin: 8px 0px"
                max-height="480"
        >
            <el-table-column
                    type="index"
                    label="序号"
                    width="88">
            </el-table-column>
            <el-table-column
                    prop="spuListId"
                    label="列表ID">
            </el-table-column>
            <el-table-column
                    prop="spuListName"
                    label="列表名称">
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="创建时间"
            >
                <template slot-scope="scope">
                    {{scope.row.gmtCreate | time}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="adit(scope.row,scope.$index)">编辑</el-button>
                    <span>|</span>
                    <el-button type="text" @click="delet(scope.row,scope.$index)">删除</el-button>
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
        <!--add-弹框-->
        <el-dialog title="创建商品列表" :visible.sync="dialogFormVisible1" top="5vh">
            <el-form>
                <el-form-item label="列表名称" :label-width="formLabelWidth">
                    <el-input v-model="commodityName" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="上传商品" :label-width="formLabelWidth">
                    <div style="display: flex">
                        <el-upload
                                style="display: inline-block;margin-right: 30px"
                                class="upload-demo"
                                :action="url+'/uploadExcel/upload_spulist'"
                                :on-success="handleSuccess"
                                :show-file-list="false"
                        >
                            <el-button type="primary">
                                点击上传
                            </el-button>
                        </el-upload>
                        <a :href="urldown+'/download_excel_file/SPLB'">
                            <el-button type="primary">格式导出</el-button>
                        </a>
                    </div>
                </el-form-item>
            </el-form>
            <!--table-->
            <div>
                <el-table
                        :data="SPtableData"
                        border
                        style="width: 100%;margin: 8px 0px"
                        max-height="300"
                >
                    <el-table-column
                            type="index"
                            label="序号"
                            width="88">
                    </el-table-column>
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
                            label="商品名称">
                    </el-table-column>
                </el-table>
            </div>
            <div style="text-align: center">
                <el-button type="primary" @click="addSure">确 定</el-button>
            </div>
        </el-dialog>
        <!--adit-弹框-->
        <el-dialog title="编辑商品列表" :visible.sync="dialogFormVisible2" top="5vh">
            <el-form>
                <el-form-item label="列表名称" :label-width="formLabelWidth">
                    <el-input v-model="commodityName" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="上传商品" :label-width="formLabelWidth">
                    <div style="display: flex">
                        <el-upload
                                style="display: inline-block;margin-right: 30px"
                                class="upload-demo"
                                :action="url+'/uploadExcel/upload_spulist'"
                                :on-success="handleSuccess"
                                :show-file-list="false"
                        >
                            <el-button type="primary">
                                点击上传
                            </el-button>
                        </el-upload>
                        <a :href="urldown+'/download_excel_file/SPLB'">
                            <el-button type="primary">格式导出</el-button>
                        </a>
                    </div>
                </el-form-item>
            </el-form>
            <!--table-->
            <div>
                <el-table
                        :data="SPtableData"
                        border
                        style="width: 100%;margin: 8px 0px"
                        max-height="300"
                >
                    <el-table-column
                            type="index"
                            label="序号"
                            width="88">
                    </el-table-column>
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
                            label="商品名称">
                    </el-table-column>
                </el-table>
            </div>
            <div style="text-align: center">
                <el-button type="primary" @click="aditSure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{}],
                currentPage: 1,
                arr: [],//分页
                dialogFormVisible1: false,//add
                dialogFormVisible2: false,//adit
                commodityName: '',//商品名称
                formLabelWidth: '120px',
                SPtableData: [],//add-商品列表
                spuListId:'',

            }
        },
        methods: {
            //添加
            add() {
                //清空
                this.commodityName = '';
                this.SPtableData = [];
                this.dialogFormVisible1 = true;
            },
            //添加-sure
            addSure() {
                if (this.commodityName == '') {
                    this.$message({
                        type: 'warning',
                        message: '请填写列表名称!'
                    })
                } else if(this.SPtableData.length==0){
                    this.$message({
                        type: 'warning',
                        message: '请上传商品!'
                    })
                }else{
                    let spuIds = [];
                    for(let i=0;i<this.SPtableData.length;i++){
                        spuIds.push(this.SPtableData[i].spuId)
                    }
                    this.$http.post(this.url+'/spulist/spuList_create',{
                        spuListName:this.commodityName,
                        spuIds:spuIds.join(','),
                    },{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.dialogFormVisible1 = false;
                            this.$message({
                                type: 'success',
                                message: '创建成功!'
                            });
                            //刷新
                            this.ajax(this.currentPage);
                        }else{
                            this.$message({
                                type: 'error',
                                message: '创建失败!'
                            });
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    })
                }
            },
            //编辑
            adit(row, index) {
                console.log(row);
                this.spuListId = row.spuListId;
                this.dialogFormVisible2 = true;
                //查询
                this.$http.post(this.url+'/spulist/spuList_selectById',{
                    spuListId:row.spuListId,
                },{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    this.commodityName = res.data.data.spuListName;
                    this.SPtableData = res.data.data.lists;
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
            //编辑-sure
            aditSure() {
                if (this.commodityName == '') {
                    this.$message({
                        type: 'warning',
                        message: '请填写列表名称!'
                    })
                } else if(this.SPtableData.length==0){
                    this.$message({
                        type: 'warning',
                        message: '请上传商品!'
                    })
                }else{
                    let spuIds = [];
                    for(let i=0;i<this.SPtableData.length;i++){
                        spuIds.push(this.SPtableData[i].spuId)
                    }
                    this.$http.post(this.url+'/spulist/spuList_update',{
                        spuListName:this.commodityName,
                        spuIds:spuIds.join(','),
                        spuListId:this.spuListId,
                    },{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.dialogFormVisible2 = false;
                            this.$message({
                                type: 'success',
                                message: '编辑成功!'
                            });
                            //刷新
                            this.ajax(this.currentPage);
                        }else{
                            this.$message({
                                type: 'error',
                                message: '编辑失败!'
                            });
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    })
                }
            },
            //删除
            delet(row, index) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                        this.$http.post(this.url+'/spulist/spuList_delete',{spuListId:row.spuListId}).then(function (res) {
                            console.log(res);
                            if(res.data.status==200){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                //刷新
                                this.ajax(this.currentPage);
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                });
            },
            //文件上传
            handleSuccess(val) {
                console.log(val);
                if(val.status==200){
                    this.SPtableData = val.data;
                }else{
                    this.$message({
                        type:'warning',
                        message:val.msg
                    })
                }
            },
            //分页
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            //ajax
            ajax(a1){
                this.$http.post(this.url+'/spulist/spuList_select',{page:a1,num:10}).then(function (res) {
                    console.log(res);
                    this.tableData = res.data.data.pageList;
                    this.arr.length = res.data.data.pageTotal;
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            }
        },
        mounted() {
            this.ajax(1);
        }
    }
</script>
<style scoped>
    .block {
        text-align: right;
    }

    .inputs {
        width: 300px;
    }
</style>