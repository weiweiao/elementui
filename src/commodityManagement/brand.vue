<template>
    <!--品牌-->
    <div class="brand">
        <!--主页面-->
        <div>
            <!--查询-->
            <el-row class="el-row1">
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                        <el-button @click="add">添加品牌</el-button>
                        <!--添加品牌弹框-->
                        <el-dialog title="添加品牌" :visible.sync="dialogFormVisible" top="5vh">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="品牌名称" prop="name">
                                    <el-input v-model="ruleForm.name" style="width: 250px"></el-input>
                                </el-form-item>
                                <!--图片上传-->
                                <el-form-item label="品牌图片" prop="img">
                                    <div v-model="ruleForm.img">
                                        <p class="redP">图片尺寸大小为120*120px</p>
                                        <el-upload
                                                class="upload-demo"
                                                :action="urls+'brand'"
                                                :on-success="handleSuccess"
                                                :show-file-list="false"
                                        >
                                            <img  :src="imageUrl" class="avatar" style="width: 100px;height: 100px;" >


                                        </el-upload>
                                    </div>
                                </el-form-item>
                                <el-form-item label="品牌权重" prop="weight">
                                    <el-input v-model="ruleForm.weight" style="width: 250px"></el-input>
                                </el-form-item>
                                <el-form-item label="类目" prop="classes">
                                    <el-checkbox-group v-model="ruleForm.classes" @change="selects">
                                        <el-checkbox   v-for="item in firstClassNameArr" :label="item.itemModuleId" :key="item.itemModuleId">{{item.itemModuleName}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <div style="text-align: center">
                                    <el-button type="primary" @click="sure('ruleForm')">保存</el-button>
                                </div>
                            </el-form>
                        </el-dialog>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span class="spans0">品牌名称</span>
                        <el-input type="primary" v-model="brandName" class="kk" placeholder="请输入品牌名称"></el-input>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="inquire">查询</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="clears">清除条件</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <a :href="url+'/exportSpuOrBrandExcel?code=B'" @click="export0()"><el-button type="primary">导出</el-button></a>
                    </div>
                </el-col>
            </el-row>
            <!--table-->
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    max-height="460">
                <el-table-column
                                 prop="xuhao"
                                 label="序号"
                                 width="88"
                                 >
                </el-table-column>
                <el-table-column
                        prop="imageUrl"
                        label="品牌图片"
                >
                    <template slot-scope="scope">
                        <img :src="scope.row.imageUrl" width="40" height="40" style="margin-top: 10px"/>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="brandName"
                        label="品牌名称"
                        >
                </el-table-column>
                <el-table-column
                        sortable
                        prop="weight"
                        label="权重"
                >
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
                        label="操作"
                        >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="adit(scope.row,scope.$index)">编辑</el-button>
                        <span>|</span>
                        <el-button type="text" size="small" @click="setClass(scope.row,scope.$index)">设置类目</el-button>
                        <span>|</span>
                        <el-button type="text" size="small" @click="deletes(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--编辑弹框-->
            <el-dialog title="编辑品牌" :visible.sync="dialogFormVisible1">
                <el-form :model="form1" label-width="100px" >
                    <el-form-item label="品牌名称">
                        <el-input v-model="form1.brandName1" auto-complete="off" style="width: 250px"></el-input>
                    </el-form-item>
                    <!--图片上传-->
                    <el-form-item label="品牌图片" prop="img1">
                        <div v-model="form1.img1">
                            <p class="redP">图片尺寸大小为120*120px</p>
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'brand'"
                                    :on-success="handleSuccess1"
                                    :show-file-list="false"
                            >
                                <img  :src="imageUrl1" class="avatar" style="width: 100px;height: 100px;" >
                            </el-upload>
                        </div>
                    </el-form-item>
                    <el-form-item label="品牌权重">
                        <el-input v-model="form1.weight1" auto-complete="off" style="width: 250px"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="图片" prop="img1">-->
                    <!--<div v-model="form1.img1">-->
                    <!--<el-upload-->
                    <!--class="upload-demo"-->
                    <!--:action="urls"-->
                    <!--:on-success="handleSuccess1"-->
                    <!--:file-list="fileList1"-->
                    <!--list-type="picture"-->
                    <!--&gt;-->
                    <!--<el-button slot="trigger" size="small" type="primary">选取图片</el-button>-->
                    <!--<div slot="tip" class="el-upload__tip redP">图片尺寸大小为120*120px</div>-->
                    <!--</el-upload>-->
                    <!--</div>-->
                    <!--</el-form-item>-->
                    <el-form-item>
                        <el-button type="primary" @click="sure1('form1',tableData)">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--设置类目弹框-->
            <el-dialog title="设置类目" :visible.sync="dialogFormVisible2">
                <el-form :model="form2" label-width="100px" >
                    <el-form-item label="选择类目" prop="clas">
                        <el-checkbox-group v-model="form2.clas" @change="selects2">
                            <el-checkbox   v-for="item in firstClassNameArr2" :label="item.itemModuleId" :key="item.itemModuleId">{{item.itemModuleName}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <div style="text-align: center">
                        <el-button type="primary" @click="sure2('form2',tableData)">保存</el-button>
                    </div>
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

<script>
    export default {
        data() {
            return {
                imageUrl:'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',//添加上传图片默认样式
                imageUrl1:'',
//                urls:'http://47.96.154.252:8088/Image/upload_image/brand',//action中图片路径-brand
                tableData:[{}],
                ruleForm: {
                    name: '',
                    img:'',
                    weight:'',
                    classes:[]
                },
                form1:{
                    brandName1:'',
                    img1:'',
                    weight1:'',
                },
                form2:{
                    clas:[]
                },
                rules: {
                    name: [
                        {required: true, message: '请输入品牌名称', trigger: 'blur'},
                    ],
                    weight: [
                        {required: true, message: '请输入品牌权重', trigger: 'blur'},
                    ],
                    classes: [
                        {type: 'array', required: true, message: '请至少选择一个类目', trigger: 'change'}
                    ]
                },
                //分页
                resPage:1,
                arr: [],
                currentPage: 1,
                dialogFormVisible:false,//添加弹框
                dialogFormVisible1:false,//编辑弹框
                dialogFormVisible2:false,//设置类目弹框
                fileList1:[{}],//编辑图片上传
                a:'',//上传成功图片路径
                runUrlArr:[],//图片路径
                runUrlArr1:'',//图片路径join(',')
                firstClassNameArr:[],//添加弹框类目
                firstClassNameArrId:'',//id
                firstClassNameArr2:[],//设置类目
                storeFirstClassNameArrId:'',//添加向后台发送的类目id
                storeFirstClassNameArrId2:'',//设置类目向后台发送的类目id
                brandName:'',//查询框
                aditIndex:'',//编辑下标
                setClassIndex:'',//设置类目下标
            };
        },
        methods: {
            //导出
            export0(a1){
                console.log(a1);
                a1='B'
            },
            //清除所有
            clears(){
              this.brandName = '';
            },
            //查询
            inquire(){
                this.currentPage = 1;
                this.ajax(this.currentPage,this.brandName);
            },
            //添加确定弹框
            sure(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.imageUrl=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'){
                            this.$message({
                                message: '请添加图片!',
                                type: 'warning'
                            });
                        }else{
                            this.$http.post(this.url+'/brand/add_brand',{
                                brandName:this.ruleForm.name,
                                imageUrl:this.imageUrl,//
                                weight:this.ruleForm.weight,
                                itemModuleIds:this.storeFirstClassNameArrId,
                            },{emulateJSON:true}).then(function (res) {
                                console.log(res);
                                if(res.data.status==200){
                                    this.$message({
                                        message: '添加成功!',
                                        type: 'success'
                                    });
                                    this.ajax(this.currentPage,this.brandName);
                                }else{
                                    this.$message({
                                        message: '添加失败!',
                                        type: 'warning'
                                    });
                                }
                            });
                            this.dialogFormVisible = false;
                        }
                    } else {
                        return false;
                    }
                });
            },
            //编辑确定按钮
            sure1(formName,tableData){
                this.$http.post(this.url+'/brand/update_brand',{
                    brandId:tableData[this.aditIndex].brandId,
                    imageUrl:this.imageUrl1,//
                    weight:this.form1.weight1,
                    brandName:this.form1.brandName1,
                },{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        this.$message({
                            message: '编辑成功!',
                            type: 'success'
                        });
                        //刷新
                        this.ajax(this.currentPage,this.brandName);
                    }else{
                        this.$message({
                            message: '编辑失败!',
                            type: 'warning'
                        });
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
                this.dialogFormVisible1 = false;
            },
            //设置类目确定按钮
            sure2(formName,tableData){
                console.log(this.form2.clas);
                this.$http.post(this.url+'/itemModuleBrand/brand_addItemModule',{brandId:tableData[this.setClassIndex].brandId,itemModuleIds:this.form2.clas.join(',')},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        this.$message({
                            message: '设置类目成功!',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '设置类目失败!',
                            type: 'warning'
                    });
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
                this.dialogFormVisible2 = false;
            },
            //添加
            add() {
                //清空
                this.ruleForm.name='';
                this.ruleForm.classes=[];
                this.imageUrl='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                //查询类目
                this.$http.post(this.url+'/itemModule/all_itemModule',{moduleLevel:1},{emulateJSON:true}).then(function (res) {
                    if(res.data.data==null){
                        this.firstClassNameArr=[];
                    }else{
                        this.firstClassNameArr=res.data.data;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
                this.dialogFormVisible=true;
            },
            //添加时选择类目
            selects(val){
                console.log(val);
                this.storeFirstClassNameArrId=val.join(',')
            },
            //设置类目选择类目
            selects2(val){
                console.log(val);
                this.storeFirstClassNameArrId2=val.join(',');
            },
            //编辑
            adit(rows,index){
                this.aditIndex = index;
                console.log(index)
                this.form1.brandName1 = this.tableData[index].brandName;
                this.imageUrl1 = this.tableData[index].imageUrl;
                this.form1.weight1 = this.tableData[index].weight;
                console.log(this.fileList1);
                this.dialogFormVisible1=true;
            },
            //设置类目
            setClass(rows,index){
                this.setClassIndex=index;
                this.$http.post(this.url+'/itemModule/all_itemModule',{moduleLevel:1},{emulateJSON:true}).then(function (res) {
//                    console.log(res);
                    this.firstClassNameArr2=res.data.data;
                    this.storeFirstClassNameArrId2=this.storeFirstClassNameArrId;
                    if(res.data.status==200){
                        this.$http.post(this.url+'/brand/selectItemModule',{brandId:this.tableData[index].brandId},{emulateJSON:true}).then(function (res) {
                            console.log(res);
                            this.form2.clas = res.data.data
                        },function (err) {
                            this.$message({
                                type:'error',
                                message:'服务器连接中断,请联系后台人员!',
                            });
                        });
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
                    this.dialogFormVisible2 = true;
            },
            //删除
                deletes(rows,index) {
                    this.$confirm('确定继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal:false,
                        type: 'warning'
                    }).then(() => {
                        this.$http.post(this.url+'/brand/dro_brand',{brandId:this.tableData[index].brandId},{emulateJSON:true}).then(function (res) {
                            console.log(res.data.data);
                            if(res.data.status==200){
                                //刷新
                                this.ajax(this.currentPage,this.brandName);
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                });
                            }else{
                                this.$message({
                                    type: 'warning',
                                    message: '删除失败'
                                });
                            }
                        },function (err) {
                            this.$message({
                                type:'error',
                                message:'服务器连接中断,请联系后台人员!',
                            });
                        });
                    }).catch(() => {
//                        this.$message({
//                            type: 'info',
//                            message: '已取消删除'
//                        });
                    });
                },
            handleSuccess(response, file){
                console.log(response, file);
                this.imageUrl = response.data.url;
            },
            //编辑
            handleSuccess1(response, file,){
                this.imageUrl1=response.data.url;
                this.fileList1=[];
                this.a=response.data.url;
                let obj = {};
                obj.url = response.data.url;
                this.fileList1.push(obj);
            },
            //分页函数
            handleCurrentChange(val) {
                this.currentPage = val;
                this.ajax(this.currentPage,this.brandName);
            },
            ajax(a1,a2){
                this.$http.post(this.url+'/brand/select_brand_ByName',{
                    page:a1,
                    num:10,
                    brandName:a2,
                },{emulateJSON:true}).then(function (res) {
                    if(res.data.data==null||res.data.data.pageList==null){
                        this.arr.length = 0;
                        this.tableData = [];
                    }else{
                        for (let i = 0; i < res.data.data.pageList.length; i++) {
                            res.data.data.pageList[i].xuhao = i+1;
                        }
                        this.arr.length = res.data.data.pageTotal;
                        this.tableData = res.data.data.pageList;
                    }
                },function (err){
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            }
        },
        mounted(){
            this.ajax(1,'');
        },
    }
</script>

<style scoped>
    .add {
        /*width: 400px;*/
    }
    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .spans0 {
        width: 80px;
    }
    .el-row1{
        margin-bottom: 10px;
    }
    .block{
        text-align:right;
        margin-top: 10px;
    }
    .kk{
        margin-right: 15px;
    }
    .redP{
        color: red;
    }
</style>
