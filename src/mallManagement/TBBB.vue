<template>
    <!--TBBB-->
    <div>
        <el-button @click="add">添加</el-button>
        <el-table
                :data="tableData"
                border
                style="width: 100%;margin-top: 10px;max-height: 400px;overflow-y: scroll">
            <el-table-column
                    type="index"
                    label="序号"
                    width="66"
                   >
            </el-table-column>
            <el-table-column
                    prop="image"
                    label="图片"
                    width="80"
                    >
                <template slot-scope="scope">
                    <img :src="scope.row.imageData.imageUrl" alt="图片" style="width: 50px;height: 50px;">
                </template>
            </el-table-column>
            <el-table-column
                    prop="titleMain"
                    label="标题">
            </el-table-column>
            <el-table-column
                    prop="titleSec"
                    label="副标题">
            </el-table-column>
            <el-table-column
                    prop="sortNum"
                    label="排序号"
                    width="80px"
            >
            </el-table-column>
            <el-table-column
                    prop="upTime"
                    label="上线时间">
                <template slot-scope="scope">
                    {{scope.row.upTime | time}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="downTime"
                    label="下线时间">
                <template slot-scope="scope">
                    {{scope.row.downTime | time}}
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
        <div style="text-align: center;margin-top: 10px;">
            <el-button @click="returnList" type="primary">返回列表</el-button>
        </div>
        <!--添加弹框-->
        <el-dialog title="添加" :visible.sync="dialogTableVisible" top="5vh">
            <el-form label-width="80px">
                <el-form-item label="图片">
                    <el-upload
                            class="upload-demo"
                            :action="urls+'templet'"
                            :on-success="handleSuccess"
                            :show-file-list="false"
                    >
                        <img :src="imageUrl" class="avatar">
                    </el-upload>
                </el-form-item>
                <el-form-item label="绑定类型">
                    <el-radio-group v-model="typeRadio">
                        <el-radio label="DISCOUNT">二级页</el-radio>
                        <el-radio label="GOODSDETAIL">商品详情</el-radio>
                        <el-radio label="GOODSLIST">商品列表</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="目标ID">
                    <el-input class="inputs" v-model="aimsID"></el-input>
                    <el-button @click="aimsID='';typeRadio='';imageUrl='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                    <span style="color: red">(注意 : 请不要输入空格)</span>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input class="inputs" v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="副标题">
                    <el-input class="inputs" v-model="viceTitle"></el-input>
                </el-form-item>
                <el-form-item label="排序号">
                    <el-input class="inputs" v-model="sortNum"></el-input>
                </el-form-item>
                <el-form-item label="上线时间">
                    <el-date-picker
                            @change="upChange"
                            v-model="upTime"
                            type="datetime"
                            placeholder="选择上线时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="下线时间">
                    <el-date-picker
                            @change="downChange"
                            v-model="downTime"
                            type="datetime"
                            placeholder="选择下线时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label=" " style="text-align: center">
                    <el-button @click="sure" type="primary">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑弹框-->
        <el-dialog title="编辑" :visible.sync="dialogTableVisible1" top="5vh">
            <el-form label-width="80px">
                <el-form-item label="图片">
                    <el-upload
                            class="upload-demo"
                            :action="urls+'templet'"
                            :on-success="handleSuccess"
                            :show-file-list="false"
                    >
                        <img :src="imageUrl" class="avatar">
                    </el-upload>
                </el-form-item>
                <el-form-item label="绑定类型">
                    <el-radio-group v-model="typeRadio">
                        <el-radio label="DISCOUNT">二级页</el-radio>
                        <el-radio label="GOODSDETAIL">商品详情</el-radio>
                        <el-radio label="GOODSLIST">商品列表</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="目标ID">
                    <el-input class="inputs" v-model="aimsID"></el-input>
                    <el-button @click="aimsID='';typeRadio='';imageUrl='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                    <span style="color: red">(注意 : 请不要输入空格)</span>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input class="inputs" v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="副标题">
                    <el-input class="inputs" v-model="viceTitle"></el-input>
                </el-form-item>
                <el-form-item label="排序号">
                    <el-input class="inputs" v-model="sortNum"></el-input>
                </el-form-item>
                <el-form-item label="上线时间">
                    <el-date-picker
                            @change="upChange"
                            v-model="upTime"
                            type="datetime"
                            placeholder="选择上线时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="下线时间">
                    <el-date-picker
                            @change="downChange"
                            v-model="downTime"
                            type="datetime"
                            placeholder="选择下线时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label=" " style="text-align: center">
                    <el-button @click="sure1" type="primary">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
//                urls: 'http://47.96.154.252:8088/Image/upload_image/templet',
                tableData:[],
                row:'',//路由row
                dialogTableVisible:false,//添加弹框
                dialogTableVisible1:false,//编辑弹框
                //添加和编辑部分
                upTime:'',
                downTime:'',
                title:'',
                viceTitle:'',
                sortNum:'',
                columnBDId:'',
                typeRadio:'',
                aimsID:'',
            }
        },
        methods: {
            //返回列表
            returnList(){
                this.$router.push({
                    path:'/firstPage'
                })
            },
            //删除
            delet(row,index){
                console.log(row.columnAId);
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/indexColumn/del_column_info_tbbb', {
                        columnBDId:row.columnBDId,
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
            //编辑
            adit(row,index){
                console.log(row.columnBDId, index);
                this.$http.post(this.url+'/indexColumn/get_tbbb_info',{
                    columnBDId:row.columnBDId,
                },{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    let a = res.data.data;
                    if(res.data.status==200){
                        this.aimsID = a.imageData.typeId;
                        this.typeRadio = a.imageData.type;
                        this.imageUrl = a.imageData.imageUrl;
                        this.upTime = a.upTime;
                        this.downTime = a.downTime;
                        this.title = a.titleMain;
                        this.viceTitle = a.titleSec;
                        this.sortNum = a.sortNum;
                        this.dialogTableVisible1 = true;
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
                });
                this.columnBDId = row.columnBDId;//传后台
            },
            //添加
            add(){
                //清空
                this.typeRadio  = '';
                this.aimsID = '';
                this.imageUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                this.title = '';
                this.viceTitle = '';
                this.sortNum = '';
                this.upTime = '';
                this.downTime = '';
                this.dialogTableVisible = true;
            },
            //添加-sure
            sure(){
                if(this.imageUrl=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'||this.upTime==''||this.downTime==''||this.title==''||this.viceTitle==''||this.sortNum==''){
                    this.$message({
                        type:'warning',
                        message:'请完善信息!'
                    })
                }else{
                    let obj = {};
                    obj.imageUrl = this.imageUrl;
                    obj.type = this.typeRadio;
                    obj.typeId = this.aimsID;
                    console.log(obj);
                    this.$http.post(this.url+'/indexColumn/create_column_info_tbbb',{
                        columnId:this.row.columnId,
                        image:JSON.stringify(obj),
                        titleMain:this.title,
                        titleSec:this.viceTitle,
                        sortNum:this.sortNum,
                        upTime:this.upTime,
                        downTime:this.downTime,
                    },{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.dialogTableVisible = false;
                            //刷新
                            this.ajax();
                        }else{
                            this.$message({
                                type:'error',
                                message:' 错误202!'
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
            //编辑-sure
            sure1(){
                if(this.imageUrl=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'||this.upTime==''||this.downTime==''||this.title==''||this.viceTitle==''||this.sortNum==''){
                    this.$message({
                        type:'warning',
                        message:'请完善信息!'
                    })
                }else{
                    let obj = {};
                    obj.imageUrl = this.imageUrl;
                    obj.type = this.typeRadio;
                    obj.typeId = this.aimsID;
                    this.$http.post(this.url+'/indexColumn/update_column_info_tbbb',{
                        columnId:this.row.columnId,
                        columnBDId:this.columnBDId,
                        image:JSON.stringify(obj),
                        titleMain:this.title,
                        titleSec:this.viceTitle,
                        sortNum:this.sortNum,
                        upTime:this.formatDate(this.upTime),
                        downTime:this.formatDate(this.downTime),
                    },{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.dialogTableVisible1 = false;
                            this.$message({
                                type:'success',
                                message:'编辑成功!'
                            })
                            //刷新
                            this.ajax();
                        }else{
                            this.$message({
                                type:'error',
                                message:'编辑失败!'
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
            //上线时间
            upChange(val){
                console.log(val);
                this.upTime = val;
            },
            //上线时间
            downChange(val){
                console.log(val);
                this.downTime = val;
            },
            //图片上传
            handleSuccess(file){
                console.log(file);
                this.imageUrl = file.data.url;
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
            //ajax
            ajax(){
                this.$http.post(this.url+'/indexColumn/get_column_info',{columnId:this.row.columnId,templetType:'TBBB'},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    this.tableData = res.data.data;
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
            this.row = this.$route.query.row;
            this.ajax();
        }
    }
</script>
<style scoped>
    .inputs{
        width: 300px;
    }
    .avatar{
        width: 90px;
        height: 90px;
    }
</style>