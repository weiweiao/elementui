<template>
    <!--TAAA模块-->
    <div>
        <el-button @click="add">添加</el-button>
        <el-table
                :data="tableData0"
                border
                style="width: 100%;margin-top: 10px;"
                max-height="480"
        >
            <el-table-column
                    type="index"
                    label="序号"
                    width="88">
            </el-table-column>
            <el-table-column
                    prop="columnAId"
                    label="columnAId"
            >
            </el-table-column>
            <el-table-column
                    prop="image"
                    label="图片"
            >
                <template slot-scope="scope">
                    <img :src="scope.row.image" alt="图片" style="width: 50px;height: 50px;">
                </template>
            </el-table-column>
            <el-table-column
                    prop="upTime"
                    label="上线时间"
            >
                <template slot-scope="scope">
                    <p>{{scope.row.upTime| time}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="adit(scope.row,scope.$index)">编辑</el-button>
                    <span>|</span>
                    <el-button type="text"  @click="delet(scope.row,scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 10px">
            <el-button @click="sureAll" type="primary">返回列表</el-button>
        </div>
        <!--添加弹框-->
        <el-dialog title="添加" :visible.sync="dialogTableVisible" top="5vh">
            <div>
                <el-form label-width="80px">
                    <el-form-item label="上线时间 : ">
                        <el-date-picker
                                @change="timeChange"
                                v-model="lineTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="图片 :">
                        <el-upload
                                class="upload-demo"
                                :action="urls+'templet'"
                                :on-success="handleSuccess"
                                :show-file-list="false"
                        >
                            <img :src="imageUrl" class="avatar">
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商品列表 :">
                        <div style="display: flex;">
                            <a :href="urldown+'/download_excel_file/TAAA'">
                                <el-button type="primary">格式导出</el-button>
                            </a>
                            <!--<el-upload-->
                            <!--style="margin-left: 50px"-->
                            <!--class="upload-demo"-->
                            <!--:action="url+'/indexColumn/upload_TAAA'"-->
                            <!--:on-success="handleSuccess1"-->
                            <!--multiple-->
                            <!--:file-list="fileList">-->
                            <!--</el-upload>-->
                            <el-upload
                                    style="margin-left: 50px"
                                    class="upload-demo"
                                    :action="url+'/indexColumn/upload_TAAA'"
                                    :on-success="handleSuccess1"
                                    :show-file-list="false"
                            >
                                <el-button type="primary">点击上传</el-button>
                            </el-upload>
                        </div>
                    </el-form-item>
                </el-form>
                <!--商品列表-->
                <div>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%;"
                            max-height="400"
                    >
                        <el-table-column
                                prop="spuId"
                                label="spuId"
                                width="80px"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="image"
                                label="商品图片"
                        >
                            <template slot-scope="scope">
                                <img :src="scope.row.imageUrlsToWeb[0]" alt="图片"
                                     style="width: 50px;height: 50px;">
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="spucode"
                                label="spucode"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="spuTitle"
                                label="商品标题"
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div style="text-align: center;margin-top: 10px">
                <el-button type="primary" @click="sure">保存</el-button>
            </div>
        </el-dialog>
        <!--编辑弹框-->
        <el-dialog title="编辑" :visible.sync="dialogTableVisible1" top="5vh">
            <div>
                <el-form label-width="80px">
                    <el-form-item label="上线时间 : ">
                        <el-date-picker
                                @change="timeChange"
                                v-model="lineTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="图片 :">
                        <el-upload
                                class="upload-demo"
                                :action="urls+'templet'"
                                :on-success="handleSuccess"
                                :show-file-list="false"
                        >
                            <img :src="imageUrl" class="avatar">
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商品列表 :">
                        <div style="display: flex;">
                            <a :href="urldown+'/download_excel_file/TAAA'">
                                <el-button type="primary">格式导出</el-button>
                            </a>
                            <!--<el-upload-->
                            <!--style="margin-left: 50px"-->
                            <!--class="upload-demo"-->
                            <!--:action="url+'/indexColumn/upload_TAAA'"-->
                            <!--:on-success="handleSuccess1"-->
                            <!--multiple-->
                            <!--:file-list="fileList">-->
                            <!--</el-upload>-->
                            <el-upload
                                    style="margin-left: 50px"
                                    class="upload-demo"
                                    :action="url+'/indexColumn/upload_TAAA'"
                                    :on-success="handleSuccess1"
                                    :show-file-list="false"
                            >
                                <el-button type="primary">点击上传</el-button>
                            </el-upload>
                        </div>
                    </el-form-item>
                </el-form>
                <!--商品列表-->
                <div>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%"
                            max-height="400"
                    >
                        <el-table-column
                                prop="spuId"
                                label="spuId"
                                width="80px"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="image"
                                label="商品图片"
                        >
                            <template slot-scope="scope">
                                <img :src="scope.row.imageUrlsToWeb[0]" alt="图片"
                                     style="width: 50px;height: 50px;">
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="spucode"
                                label="spucode"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="spuTitle"
                                label="商品标题"
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div style="text-align: center;margin-top: 10px">
                <el-button type="primary" @click="sure1">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                lineTime: '',//上线时间
                imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
//                urls: 'http://47.96.154.252:8088/Image/upload_image/templet',
                tableData: [],
                row: '',//路由row
                spuArr: [],
                tableData0: [{}],
                dialogTableVisible: false,//添加弹框
                dialogTableVisible1: false,//编辑弹框
                columnId:'',
                columnAId:'',
            }

        },
        methods: {
//            删除
            delet(row,index){
                console.log(row.columnAId);
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/indexColumn/del_column_info_taaa', {
                        columnAId:row.columnAId,
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                            //刷新
                            this.ajax();
                        }else{
                            this.$message({
                                type:'success',
                                message:'删除失败!'
                            });
                        }
                    });
                },()=>{
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                });
            },
//            编辑
            adit(row,index){
                this.columnId = row.columnId;
                this.columnAId = row.columnAId;
                this.dialogTableVisible1 = true;
                this.$http.post(this.url + '/indexColumn/get_taaa_info', {
                    columnAId:row.columnAId,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        this.dialogTableVisible1 = true;
                        this.lineTime = this.formatDate(res.data.data.upTime);//上线时间回显
                        this.imageUrl = res.data.data.image;//图片
                        this.tableData = res.data.data.products;//商品列表
                    }else{
                        this.$message({
                            type:'error',
                            message:'查询失败!'
                        })
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
//            编辑-sure
            sure1(){
                if(this.lineTime==null||this.lineTime==undefined||this.lineTime==''){
                    this.$message({
                        type:'warning',
                        message:'请选择时间!'
                    })
                }else if(this.imageUrl=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'){
                    this.$message({
                        type:'warning',
                        message:'请选择图片!'
                    })
                }else if(this.tableData.length==0){
                    this.$message({
                        type:'warning',
                        message:'请上传文件!'
                    });
                }else {
                    let arr=[];
                    for(let i=0;i<this.tableData.length;i++){
                        arr.push(this.tableData[i].spuId);
                    }
                    this.$http.post(this.url + '/indexColumn/update_column_info_taaa', {
                        columnAId: this.columnAId,
                        upTime: this.lineTime,
                        image: this.imageUrl,
                        productJson: arr.join(',')
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.dialogTableVisible1 = false;
                            this.$message({
                                type:'success',
                                message:'编辑成功!'
                            })
//                            刷新
                            this.ajax();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '编辑失败!'
                            })
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }
            },
//            添加
            add() {
//                清空
                this.lineTime = '';
                this.imageUrl='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                this.tableData=[];
                this.spuArr=[];
                this.dialogTableVisible = true;
            },
//            最后保存
            sureAll() {
                this.$router.push({
                    path:'/firstPage'
                })
            },
//            时间
            timeChange(val) {
                console.log(val);
                console.log(Date.now());
                this.lineTime = val
            },
            //            保存按钮
            sure() {
                console.log(this.lineTime);
                if(this.lineTime==null||this.lineTime==undefined||this.lineTime==''){
                    this.$message({
                        type:'warning',
                        message:'请选择时间!'
                    })
                }else if(this.imageUrl=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'){
                    this.$message({
                        type:'warning',
                        message:'请选择图片!'
                    })
                }else if(this.tableData.length==0){
                    this.$message({
                        type:'warning',
                        message:'请上传文件!'
                    });
                }else{
                    this.$http.post(this.url + '/indexColumn/create_column_info_taaa', {
                        columnId: this.row.columnId,
                        upTime: this.lineTime,
                        image: this.imageUrl,
                        productJson: this.spuArr.join(',')
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.dialogTableVisible = false;
//                            刷新
                            this.ajax();
                        }else{
                            this.$message({
                                type:'error',
                                message:'错误202!'
                            })
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }
            },
            //            上传文件
            uploadFile() {

            },
            //            上传文件
            handleSuccess1(file) {
                console.log(file);
                console.log(file.data);
                if (file.data == null || file.data.length == 0) {
                    this.tableData=[];
                    this.$message({
                        type:'warning',
                        message:file.msg,
                    })
                } else {
                    let arr = [];
                    for (let i = 0; i < file.data.length; i++) {
                        arr.push(file.data[i].spuId);
                    }
                    this.spuArr = arr;
                    this.tableData = file.data;
                }
            },
            //            上传图片
            handleSuccess(file) {
                console.log(file);
                this.imageUrl = file.data.url;
            },
            handleChange(file) {
                console.log(file);
            },
            //事件戳转换
            add0(m) {
                return m < 10 ? '0' + m : m
            },
            //时间函数
            formatDate(timestamp) {
                //timestamp是整数，否则要parseInt转换
                var time = new Date(timestamp);
                var y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
            },

//            ajax
            ajax(){
                this.$http.post(this.url + '/indexColumn/get_column_info', {
                    columnId: this.row.columnId,
                    templetType: this.row.templetId
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.data == null) {
                        this.tableData0 = [];
                    } else {
                        this.tableData0 = res.data.data;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            }
        },
        mounted() {
            console.log(this.$route.query.row);
            this.row = this.$route.query.row;
            this.ajax();
        }
    }
</script>
<style scoped>
    .avatar{
        width: 90px;
        height: 90px;
    }
</style>