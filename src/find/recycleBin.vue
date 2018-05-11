<template>
    <!--回收站-->
    <div>
        <div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="flexs">
                        <p style="width: 70px">发布时间</p>
                        <el-date-picker
                                @change="timeDate"
                                v-model="timeValue"
                                type="daterange"
                                range-separator="至"
                                placeholder="选择日期范围">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="flexs">
                        <p style="width: 40px">话题</p>
                        <el-select v-model="topicValue" placeholder="请选择" @change="topicChange" :clearable="clearable">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="flexs">
                        <p style="width: 40px">标题</p>
                        <el-input placeholder="请输入标题" v-model="title"></el-input>
                    </div>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="inquiry">查询</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="clears">清除条件</el-button>
                </el-col>
            </el-row>
            <el-table
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    :data="tableData"
                    border
                    style="width: 100%;margin-top: 8px">
                <el-table-column
                        type="selection"
                        width="88">
                </el-table-column>
                <el-table-column
                        prop="materialTitle"
                        label="标题"
                >
                </el-table-column>
                <el-table-column
                        prop="mtList"
                        label="关联话题">
                    <template slot-scope="scope">
                        <div>
                            <el-tag v-for="tag in scope.row.mtList" type="success" size="small" style="margin-right: 5px">
                                {{tag.topicName}}
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="materialLevel"
                        label="非会员是否可见">
                    <template slot-scope="scope">
                        <p v-text="scope.row.materialLevel==0?'是':'否'"></p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="upTime"
                        label="发布时间">
                </el-table-column>
                <el-table-column
                        prop="operate"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="pub(scope.row,scope.$index)">发布</el-button>
                        <span>|</span>
                        <el-button type="text">编辑</el-button>
                        <span>|</span>
                        <el-button type="text" @click="delet(scope.row,scope.$index)">彻底删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="block">
                <div>
                    <el-button  type="primary" @click="wholePub" :disabled="disabledBtn">批量发布</el-button>
                    <el-button @click="wholeDel" type="primary" :disabled="disabledBtn">批量删除</el-button>
                </div>
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
<script type="text/javascript">
    export default{
        props:['msgfromfather'],
        data() {
            return {
                title:'',//标题
                timeValue:[],//时间
                topicValue:'',//话题
                options:[],//话题
                startTime:'',//开始时间
                endTime:'',//结束时间
                tableData: [],
                currentPage:1,
                arr:[],//分页
                disabledBtn:true,//批量删除按钮变灰
                handleSelectArr:[],//选中
                clearable:true,
            }
        },
        methods:{
            //清除条件
            clears(){
                this.title = '';
                this.timeValue = [];
                this.topicValue = '';
            },
            //查询按钮
            inquiry(){
                this.currentPage = 1;
                this.ajax(this.currentPage,this.startTime,this.endTime,this.topicValue,this.title);
            },
            //话题
            topicChange(val) {
                console.log('00000');
            },
            //批量删除按钮
            wholeDel(){
                this.$confirm('确定批量删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/material/deleteMaterialIds',{materialIds:JSON.stringify(this.handleSelectArr)},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //刷新
                            this.ajax(this.currentPage,this.startTime,this.endTime,this.topicValue,this.title);
                        }else{
                            this.$message({
                                type:'error',
                                message:'删除失败!'
                            });
                        }
                    });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消'
//                    });
                });
            },
            //单个删除
            delet(row,index){
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/material/deleteMaterialById',{materialId:row.materialId},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //刷新
                            this.ajax(this.currentPage,this.startTime,this.endTime,this.topicValue,this.title);
                        }else{
                            this.$message({
                                type:'error',
                                message:'删除失败!'
                            });
                        }
                    });

                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                });
            },
            //批量发布
            wholePub(){
                this.$confirm('确定批量发布?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/material/publishMaterialIds',{materialIds:JSON.stringify(this.handleSelectArr)},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type: 'success',
                                message: '发布成功!'
                            });
                            //刷新
                            this.ajax(this.currentPage,this.startTime,this.endTime,this.topicValue,this.title);
                        }else{
                            this.$message({
                                type:'error',
                                message:'发布失败!'
                            });
                        }
                    });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消'
//                    });
                });
            },
            //单个发布
            pub(row,index){
                this.$confirm('确定发布?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/material/publishMaterialById',{materialId:row.materialId},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type: 'success',
                                message: '发布成功!'
                            });
                            //刷新
                            this.ajax(this.currentPage,this.startTime,this.endTime,this.topicValue,this.title);
                        }else{
                            this.$message({
                                type:'error',
                                message:'发布失败!'
                            });
                        }
                    });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消'
//                    });
                });
            },
            //选中
            handleSelectionChange(val){
                console.log(val);
//                this.handleSelectArr = val;
                //只有选中时,按钮才显示
                if(val.length>0){
                    this.disabledBtn = false;
                }else{
                    this.disabledBtn = true;
                }
                this.handleSelectArr = [];
                for(let i=0;i<val.length;i++){
                    this.handleSelectArr.push(val[i].materialId);
                }
                console.log(this.handleSelectArr);
            },
            //分页
            handleCurrentChange(val){
                this.currentPage = val;
            },
            //发布时间
            timeDate(val){
                console.log(val);
                this.startTime = val.substring(0,10);
                this.endTime = val.substring(11);
            },
            //ajax
            ajax(a1, a2, a3, a4,a5) {
                this.$http.post(this.url + '/material/getMaterialList', {
                    materialStatus: 2,//2代表回收站
                    page: a1,
                    num: 10,
                    startTime: a2,//时间范围
                    endTime: a3,//时间范围
                    topicId: a4,//话题
                    materialTitle: a5,//标题
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.data == null || res.data.data.pageList == null) {
                        this.tableData = [];
                        this.arr.length = 0;
                    } else {
                        this.tableData = res.data.data.pageList;
                        this.arr.length = res.data.data.pageTotal;
                    }
                })
            }
        },
        created(){
            this.ajax(1, '', '', '', '');
            //话题查询
            this.$http.post(this.url + '/material/getMaterialTopics', {}, {emulateJSON: true}).then(function (res) {
                console.log(res);
                if (res.data.data == null) {
                    this.options = [];
                } else {
                    for (let i = 0; i < res.data.data.length; i++) {
                        let obj = {};
                        obj.label = res.data.data[i].topicName;
                        obj.value = res.data.data[i].topicId;
                        this.options.push(obj);
                    }
                    console.log(this.options);
                }
            });
        }
    }
</script>
<style scoped>
    .spans{
        width: 40px;
        line-height: 36px;
    }
    .table{
        margin-top: 8px;
    }
    .block{
        display: flex;
        /*padding-left: 20px;*/
        justify-content: space-between;
        margin-top: 5px;
    }
    .flexs{
        display: flex;
        line-height: 35px;
    }
    .flexs p{
        font-size: 14px;
    }
</style>

