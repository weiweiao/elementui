<template>
    <!--自定义话题-->
    <div class="customize-topic">
       <div>
           <div>
                   <el-row :gutter="20">
                       <el-col :span="9">
                           <el-button @click="add" style="margin-bottom: 10px">添加话题</el-button>
                       </el-col>
                       <el-col :span="6">
                           <div class="flexs">
                               <p style="width: 70px">时间范围</p>
                               <el-date-picker
                                       @change="timeDate"
                                       v-model="timeValue"
                                       type="daterange"
                                       range-separator="至"
                                       placeholder="选择日期范围">
                               </el-date-picker>
                           </div>
                       </el-col>
                       <el-col :span="7">
                           <div class="flexs">
                               <p style="width: 80px">话题标题</p>
                               <el-input placeholder="请输入标题" v-model="title"></el-input>
                           </div>
                       </el-col>
                       <el-col :span="2">
                           <el-button type="primary" @click="inquire">查询</el-button>
                       </el-col>
                   </el-row>
           </div>
           <el-table
                   :data="tableData"
                   border
                   style="width: 100%"
                   max-height="515">
               <el-table-column
                       type="index"
                       label="序号"
                       width="70px"
               >
               </el-table-column>
               <el-table-column
                       prop="topicImage"
                       label="话题图片"
                       width="100px"
               >
                   <template scope="scope">
                       <img :src="scope.row.topicImage" style="width: 40px;height: 40px;margin-top: 10px"/>
                   </template>
               </el-table-column>
               <el-table-column
                       prop="topicName"
                       label="标题"
               >
               </el-table-column>
               <el-table-column
                       prop="topicWeight"
                       label="权重"
                       sortable
               >
                  <!-- <template slot-scope="scope">
                       <span @click="weight(scope.row,scope.$index)" class="xiaoshou">{{scope.row.itemModuleSort}}</span>
                       <el-input v-if="scope.row.inputShow"  :autofocus="true" v-model="scope.row.weightInput" @blur="blurWeight(scope.row,scope.$index)"></el-input>
                   </template>-->
               </el-table-column>
               <el-table-column
                       prop="quantity"
                       label="素材数量"
               >
               </el-table-column>
               <el-table-column
                       prop="official"
                       label="是否为官方话题"
               >
                   <template slot-scope="scope">
                       <p v-show="scope.row.official==1?true:false" style="color: red">是</p>
                       <p v-show="scope.row.official==0?true:false">否</p>
                   </template>
               </el-table-column>
               <el-table-column
                       prop="gmtCreate"
                       label="创建时间"
               >
                   <template slot-scope="scope">
                       {{scope.row.gmtCreate | time}}
                   </template>
               </el-table-column>
               <!--<el-table-column-->
                       <!--prop="itemModuleName"-->
                       <!--label="非会员是否可见"-->
               <!--&gt;-->
               <!--</el-table-column>-->
               <el-table-column
                       prop="operate"
                       label="操作"
               >
                   <template slot-scope="scope">
                       <el-button type="text" @click="adit(scope.row,scope.$index)">编辑</el-button>
                       <span>|</span>
                       <el-button @click="delet(scope.row,scope.$index)" type="text">删除</el-button>
                   </template>
               </el-table-column>
           </el-table>
           <!--add弹框-->
           <el-dialog title="添加话题" :visible.sync="dialogFormVisible" top="5vh">
               <el-form :model="form" :rules="rules" ref="form"  label-width="140px">
                   <el-form-item label="话题图片">
                       <!--<p class="redP">图片大小为00*00px(必选)</p>-->
                       <el-upload
                               class="upload-demo"
                               :action="urls+'find'"
                               :on-success="handleSuccess"
                               :show-file-list="false"
                       >
                           <img  :src="imageUrl" class="avatar" style="width: 100px;height: 100px;">
                       </el-upload>
                   </el-form-item>
                   <el-form-item label="是否为官方话题" prop="isOffical">
                       <el-radio-group v-model="form.isOffical">
                           <el-radio label="1" value="1">是</el-radio>
                           <el-radio label="0" value="0">否</el-radio>
                       </el-radio-group>
                   </el-form-item>
                   <el-form-item label="权重" prop="weight" >
                       <el-input v-model="form.weight" auto-complete="off" class="inputW"></el-input>
                   </el-form-item>
                   <el-form-item label="标题" prop="title" >
                       <el-input v-model="form.title" auto-complete="off" class="inputW" placeholder="最多10个字"></el-input>
                   </el-form-item>
                   <el-form-item label="话题描述">
                       <el-input type="textarea" v-model="form.topicDesc" auto-complete="off" class="inputW"></el-input>
                   </el-form-item>
                   <el-form-item>
                       <el-button style="margin-left: 100px" type="primary" @click="sure('form')">保存</el-button>
                   </el-form-item>
               </el-form>
           </el-dialog>
           <!--adit弹框-->
           <el-dialog title="编辑话题" :visible.sync="dialogFormVisible1" top="5vh">
               <el-form :model="form1" :rules="rules1" ref="form1"  label-width="140px">
                   <el-form-item label="话题图片">
                       <!--<p class="redP">图片大小为00*00px</p>-->
                       <el-upload
                               class="upload-demo"
                               :action="urls+'find'"
                               :on-success="handleSuccess1"
                               :show-file-list="false"
                       >
                           <img  :src="imageUrl1" class="avatar" style="width: 100px;height: 100px;">
                       </el-upload>
                   </el-form-item>
                   <el-form-item label="是否为官方话题" prop="isOffical">
                       <el-radio-group v-model="form1.isOffical">
                           <el-radio label="1" value="1">是</el-radio>
                           <el-radio label="0" value="0">否</el-radio>
                       </el-radio-group>
                   </el-form-item>
                   <el-form-item label="权重" prop="weight" >
                       <el-input v-model="form1.weight" auto-complete="off" class="inputW"></el-input>
                   </el-form-item>
                   <el-form-item label="标题" prop="title" >
                       <el-input v-model="form1.title" auto-complete="off" class="inputW"></el-input>
                   </el-form-item>
                   <el-form-item label="话题描述">
                       <el-input type="textarea" v-model="form1.topicDesc" auto-complete="off" class="inputW"></el-input>
                   </el-form-item>
                   <el-form-item>
                       <el-button style="margin-left: 100px" type="primary" @click="sure1('form1')">保存</el-button>
                   </el-form-item>
               </el-form>
           </el-dialog>
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
<script type="text/javascript">
    export default{
        data() {
            return {
                title:'',//标题
                timeValue:'',//时间范围
                imageUrl:'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                tableData:[{}],
                currentPage:1,
                arr:[],//分页
                dialogFormVisible:false,//添加弹框
                form:{
                    isSeen:'',
                    title:'',
                    topicDesc:'',
                    weight:'',
                    isOffical:'',
                },
                rules:{
                    weight: [
                        { required: true, message: '请填写权重', trigger: 'blur' },
                    ],
                    isOffical: [
                        { required: true, message: '请选择是否为官方话题', trigger: 'change' },
                    ],
                    title: [
                        { required: true, message: '请填写标题', trigger: 'blur' },
                        { min: 1, max: 10, message: '最多10个字', trigger: 'blur' }
                    ],
                },
                dialogFormVisible1:false,//编辑弹框
                form1:{
                    isOffical:'',
                    isSeen:'',
                    title:'',
                    topicDesc:'',
                    weight:'',
                },
                rules1:{
                    weight: [
                        { required: true, message: '请填写权重', trigger: 'blur' },
                    ],
                    isOffical: [
                        { required: true, message: '请选择是否为官方话题', trigger: 'change' },
                    ],
                    title: [
                        { required: true, message: '请填写标题', trigger: 'blur' },
                        { min: 1, max: 10, message: '最多10个字', trigger: 'blur' }
                    ],
                },
                imageUrl1:'',
                startTime:'',
                endTime:'',
                topicId:'',
            }
        },
        methods:{
            //查询
            inquire(){
                this.currentPage = 1;
                this.ajax(this.currentPage,this.title,this.startTime,this.endTime);
            },
            //时间范围
            timeDate(val){
                console.log(val);
                this.startTime = val.substring(0,10);
                this.endTime = val.substring(11);
                console.log(this.startTime);
                console.log(this.endTime);
            },
            //删除
            delet(row,index){
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/topic/update_one',{topicId:row.topicId,del:1},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //刷新
                            console.log(this.currentPage);
                            this.ajax(this.currentPage,this.title,this.startTime,this.endTime)
                        }else{
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
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
            //添加
            add(){
                this.imageUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                this.form.isOffical = '';
                this.form.title = '';
                this.form.topicDesc = '';
                this.form.weight = '';
                this.dialogFormVisible = true;
            },
            //添加-保存按钮
            sure(form){
                if(this.imageUrl=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'){
                    this.$message({
                        type:'warning',
                        message:'请选择图片!'
                    })
                }else{
                    console.log(this.form.isOffical);
                    this.$refs[form].validate((valid) => {
                        if (valid) {
                            this.$http.post(this.url+'/topic/add_topic',{
                                topicName:this.form.title,
                                topicWeight:this.form.weight,
                                topicDesc:this.form.topicDesc,
                                topicImage:this.imageUrl,
                                official:this.form.isOffical
                            },{emulateJSON:true}).then(function (res) {
                                console.log(res);
                                if(res.data.status==200){
                                    this.$message({
                                        type:'success',
                                        message:'添加成功!'
                                    })
                                    this.dialogFormVisible = false;
                                    //刷新
                                    this.ajax(this.currentPage,'','','')
                                }else{
                                    this.$message({
                                        type:'error',
                                        message:'添加失败!'
                                    })
                                }
                            })
                        } else {
                            return false;
                        }
                    });
                }
            },
           //添加-图片
            handleSuccess(response, file){
                console.log(response, file);
                this.imageUrl = response.data.url;
            },
            //编辑
            adit(row,index){
                console.log(row);
                this.topicId  = row.topicId;
                this.dialogFormVisible1 = true;
                this.$http.post(this.url+'/topic/find_one',{topicId:row.topicId},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        this.imageUrl1 = row.topicImage;
                        this.form1.weight = row.topicWeight.toString();
                        this.form1.title = row.topicName;
                        this.form1.topicDesc = row.topicDesc;
                        this.form1.isOffical = row.official.toString()
                    }else{
                        this.$message({
                            type:'error',
                            message:'查询失败!'
                        })
                    }
                })
            },
            sure1(form1){
                if(this.imageUrl1=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'){
                    this.$message({
                        type:'warning',
                        message:'请选择图片!'
                    })
                }else{
                    this.$refs[form1].validate((valid) => {
                        if (valid) {
                            this.$http.post(this.url+'/topic/update_one',{
                                topicId:this.topicId,
                                topicImage:this.imageUrl1,
                                topicWeight:this.form1.weight,
                                topicName:this.form1.title,
                                topicDesc:this.form1.topicDesc,
                                official:this.form1.isOffical
                            },{emulateJSON:true}).then(function (res) {
                                console.log(res);
                                if(res.data.status==200){
                                    this.dialogFormVisible1 = false;
                                    this.$message({
                                        type:'success',
                                        message:'编辑成功!'
                                    })
                                    //刷新
                                    this.ajax(this.currentPage,this.title,this.startTime,this.endTime)
                                }else{
                                    this.$message({
                                        type:'error',
                                        message:'编辑失败!'
                                    })
                                }
                            })
                        } else {
                            return false;
                        }
                    });
                }
            },
            handleSuccess1(response, file){
                console.log(response, file);
                this.imageUrl1 = response.data.url;
            },
            //分页
            handleCurrentChange(val){
                console.log(val);
                this.currentPage=val;
                console.log(val);
                this.ajax(this.currentPage,this.title,this.startTime,this.endTime)
            },
            //ajax
            ajax(a1,a2,a3,a4){
                this.$http.post(this.url+'/topic/all',{
                    page:a1,
                    num:10,
                    name:a2,
                    s:a3,
                    e:a4,
                },{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        if(res.data.data==null||res.data.data==''){
                            this.tableData = [];
                            this.arr.length = 0;
                        }else{
                            this.tableData = res.data.data.pageList;
                            this.arr.length = res.data.data.pageTotal;
                        }
                    }else{
                       this.$message({
                           type:'error',
                           message:'查询失败!'
                       })
                    }
                })
            }
        },
        mounted(){
            this.ajax(1,'','','');
        }

    }
</script>
<style scoped>
.block{
    text-align: right;
    margin-top: 10px;
}
    .redP{
        color: red;
    }
    .inputW{
        width: 300px;
    }
.flexs{
    display: flex;
    line-height: 35px;
}
.flexs p{
    font-size: 14px;
}
</style>

