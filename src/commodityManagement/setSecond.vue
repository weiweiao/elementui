<template>
    <!--设置二级类目-->
    <div class="setSecond">
        <div>
            <el-row class="el-row1">
                <el-col :span="3">
                    <div class="grid-content bg-purple">
                        <p>主类目名称 : {{mainClassName}}</p>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <el-button @click="add">添加二级类目</el-button>
                        <!--添加品牌弹框-->
                        <el-dialog title="添加二级类目" :visible.sync="dialogFormVisible">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px"
                                     class="demo-ruleForm">
                                <!--图片上传-->
                                <el-form-item label="二级类目图片" prop="img">
                                    <p class="redP">图片大小为120*120px(必选)</p>
                                    <el-upload
                                            class="upload-demo"
                                            :action="urls+'itemModule'"
                                            :on-success="handleSuccess"
                                            :show-file-list="false"
                                    >
                                        <img  :src="imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="二级类目名称" prop="name">
                                    <el-input v-model="ruleForm.name" class="inputW"></el-input>
                                </el-form-item>
                                <el-form-item label="二级类目权重" prop="weight">
                                    <el-input v-model="ruleForm.weight" class="inputW"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div style="width: 50%;text-align: center">
                                        <el-button type="primary" @click="sure('ruleForm')">保存</el-button>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </el-dialog>
                    </div>
                </el-col>
            </el-row>
            <!--table-->
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    max-height="480">
                <el-table-column
                        type="index"
                        label="序号"
                        width="88"
                >
                </el-table-column>
                <el-table-column
                        prop="itemModuleImageUrl"
                        label="二级类目图片"
                >
                    <template slot-scope="scope">
                        <img :src="scope.row.itemModuleImageUrl" width="40" height="40"/>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="itemModuleName"
                        label="二级类目名称"
                >
                </el-table-column>
                <el-table-column
                        prop="itemModuleSort"
                        label="权重"
                        sortable
                >
                    <template slot-scope="scope">
                        <span @click="weight(scope.row,scope.$index)" class="xiaoshou">{{scope.row.itemModuleSort}}</span>
                        <input v-show="scope.row.inputShow" v-focus  v-model="scope.row.weightInput" @blur="blurWeight(scope.row,scope.$index)" class="iw">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operate"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="adit(scope.row,scope.$index)">编辑</el-button>
                        <span>|</span>
                        <el-button type="text" size="small" @click="setPics(scope.row,scope.$index)">设置轮播图</el-button>
                        <span>|</span>
                        <el-button type="text" size="small" @click="deletes(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--编辑弹框-->
            <el-dialog title="编辑二级类目" :visible.sync="dialogFormVisible1">
                <el-form :model="form1" label-width="100px">
                    <el-form-item label="二级类目图片" prop="img1">
                        <p class="redP">图片大小为120*120px</p>
                        <el-upload
                                class="upload-demo"
                                :action="urls+'itemModule'"
                                :on-success="handleSuccess1"
                                :show-file-list="false"
                        >
                            <img  :src="imageUrl1" class="avatar" style="width: 100px;height: 100px;">
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="二级类目名称">
                        <el-input v-model="form1.name1" auto-complete="off" class="inputW"></el-input>
                    </el-form-item>
                    <el-form-item label="二级类目权重">
                        <el-input v-model="form1.weight1" class="inputW"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div style="width: 50%;text-align: center">
                            <el-button type="primary" @click="sure1('form1',tableData)">保存</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--设置轮播图弹框-->
            <el-dialog title="设置轮播图" :visible.sync="dialogFormVisible2">
                <el-form  :model="Tform0" :rules="Tform0Rules" ref="Tform0" label-width="120px" class="forms">
                    <el-form-item label="设置轮播图">
                        <p class="redP">目前仅提供设置1张轮播图,图片大小为750*750px</p>
                        <el-upload
                                class="upload-demo"
                                :action="urls+'itemModule'"
                                :on-success="ThandleSuccess"
                                :show-file-list="false"
                        >
                            <img  :src="imageUrl2" class="avatar" style="width: 100px;height: 100px;">
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="绑定类型">
                        <el-radio-group v-model="Tform0.types" @change="types">
                            <el-radio label="DISCOUNT">二级页</el-radio>
                            <el-radio label="GOODSDETAIL">商品详情</el-radio>
                            <el-radio label="GOODSLIST">商品列表</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="目标Id">
                        <el-input v-model="Tform0.aims" class="inputW"></el-input>
                        <el-button @click="Tform0.aims='';Tform0.types='';imageUrl2='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                        <span class="redP">(注意 : 请不要输入空格)</span>
                    </el-form-item>
                    <el-form-item>
                        <div style="width: 50%;text-align: center">
                            <el-button type="primary" @click="sure2('Tform0')">保存</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imageUrl:'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',//add
                imageUrl1:'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',//adit
                imageUrl2:'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',//轮播图第一张
//                urls: 'http://47.96.154.252:8088/Image/upload_image/itemModule',//action中图片路径-brand
                tableData: [{}],
                rules: {
                    name: [
                        { required: true, message: '请输入二级类目名称', trigger: 'blur' },
                    ],
                    weight: [
                        { required: true, message: '请输入二级类目权重', trigger: 'blur' },
                    ],
                },
                Tform0: {types: '',aims:''},//设置轮播图
                Tform0Rules:{
                    types: [
                        { required: true, message: '请选择绑定类型', trigger: 'change' },
                    ],
                    aims: [
                        { required: true, message: '请输入目标Id', trigger: 'blur' },
                    ],
                },//设置轮播图
                mainClassName: '',
                dialogFormVisible: false,
                dialogFormVisible1: false,
                dialogFormVisible2: false,
                ruleForm: {name: '', img: '', weight: ''},//添加
                form1: {name1: '', img1: '', weight1: '', img2: ''},//编辑
                aditIndex: '',//编辑下标
                arr: [],//添加图片
                urlsArr: [],//编辑轮播图
                itemModuleid: '',
                typeVal0: '',//绑定类型
                marqueeUrl0: '',
            }
        },
        //input聚焦
        directives: {
            focus: {
                // 指令的定义
                update: function (el) {
                    el.focus()
                }
            }
        },
        methods: {
            //权重
            weight(rows,index){
                console.log(rows, index);
                rows.inputShow=true;
                rows.weightInput = rows.itemModuleSort;//默认
            },
            blurWeight(rows,index){
                console.log(rows.weightInput);
                console.log('999');
                if(rows.weightInput==rows.itemModuleSort){
                    rows.inputShow=false;
                }else{
                    this.$http.post(this.url + '/itemModule/update_itemModule', {
                        itemModuleId: rows.itemModuleId,
                        itemModuleSort: rows.weightInput,
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.ajax();
                        } else {
                            this.$message({
                                type: "error",
                                message: "编辑失败!"
                            })
                        }
                        rows.inputShow=false;
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }
            },
            //添加
            add() {
                    this.ruleForm.name = '',
                    this.ruleForm.weight = '',
                    this.imageUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    this.dialogFormVisible = true;
            },
            //编辑
            adit(rows, index) {
                this.aditIndex = index;
                this.form1.weight1 = this.tableData[index].itemModuleSort;
                this.form1.name1 = this.tableData[index].itemModuleName;
                this.imageUrl1 = rows.itemModuleImageUrl;
                this.dialogFormVisible1 = true;
            },
            //设置轮播图
            setPics(rows, index) {
                this.$http.post(this.url + '/itemModule/select_itemModule', {
                    itemModuleId:rows.itemModuleId
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.data.urls==null){
                        this.imageUrl2 = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                        this.Tform0.types = '';
                        this.Tform0.aims = '';
                    }else{
                        let arr = res.data.data.urls;
                        this.imageUrl2=arr[0].imageUrl;
                        this.Tform0.types = arr[0].type;
                        this.Tform0.aims = arr[0].typeId;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
                this.itemModuleid = rows.itemModuleId;
                this.dialogFormVisible2 = true;
            },
            //轮播图第一张
            ThandleSuccess(response, file) {
                this.imageUrl2 = response.data.url;
            },
            types(val) {
                console.log(val);
                this.typeVal0 = val;
            },//单选
            //设置轮播图确定按钮
            sure2(Tform0) {
                this.$refs[Tform0].validate((valid) => {
                    if (valid) {
                        if(this.imageUrl2=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'){
                            this.$message({
                                type:'warning',
                                message:'请选择图片!'
                            })   ;
                        }else{
                            let obj = {};
                            obj.imageUrl = this.imageUrl2;
                            obj.type = this.Tform0.types;
                            obj.typeId = this.Tform0.aims;
                            this.urlsArr.push(obj);
                            this.$http.post(this.url + '/itemModule/update_itemModule', {
                                itemModuleId: this.itemModuleid,
                                imageUrls: JSON.stringify(this.urlsArr),
                            }, {emulateJSON: true}).then(function (res) {
                                console.log(res);
                                if (res.data.status == 200) {
                                    this.$message({
                                        type: "success",
                                        message: "设置轮播图成功!"
                                    });
                                } else {
                                    this.$message({
                                        type: "error",
                                        message: "设置轮播图失败!"
                                    })
                                }
                            },function (err) {
                                this.$message({
                                    type:'error',
                                    message:'服务器连接中断,请联系后台人员!',
                                });
                            });
                            this.urlsArr=[];
                            this.imageUrl2 = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                            this.Tform0.types = '';
                            this.Tform0.aims = '';
                            this.dialogFormVisible2 = false;
                        }
                    }else{
                        return false;
                    }
                });
            },
            //删除
            deletes(rows, index) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                    this.$http.post(this.url + '/itemModule/del_itemModuleBrand', {itemModuleId: this.tableData[index].itemModuleId}, {emulateJSON: true}).then(function (res) {
//                        console.log(res);
                        if (res.data.status == 200) {
                            //刷新
                            this.ajax();
                        } else {
                            this.$message({
                                type: 'warning',
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
            //添加确定按钮
            sure(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        if(this.imageUrl=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'){
                             this.$message({
                                 type:'warning',
                                 message:'请选择图片!'
                             });
                        }else{
                            this.arr = [];
                            let obj = this.imageUrl;
                            this.arr.push(obj);//本次图片用数组
                            this.$http.post(this.url + '/itemModule/add_itemModule', {
                                itemModuleLevel: 2,
                                itemModuleParentId: this.$route.query.ha,
                                itemModuleImageUrl: this.arr.join(','),
                                itemModuleSort: this.ruleForm.weight,
                                itemModuleName: this.ruleForm.name,
                            }, {emulateJSON: true}).then(function (res) {
                                console.log(res);
                                if (res.data.status == 200) {
                                    this.$message({
                                        message: "添加成功!",
                                        type: 'success'
                                    });
                                    this.dialogFormVisible = false;
                                    this.ajax();
                                } else {
                                    this.$message({
                                        message: "添加失败!",
                                        type: 'warning'
                                    });
                                }
                            },function (err) {
                                this.$message({
                                    type:'error',
                                    message:'服务器连接中断,请联系后台人员!',
                                });
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            //编辑确定按钮
            sure1(form1, tableData) {
                this.$http.post(this.url + '/itemModule/update_itemModule', {
                    itemModuleId: tableData[this.aditIndex].itemModuleId,
                    itemModuleName: this.form1.name1,
                    itemModuleImageUrl: this.imageUrl1,
                    itemModuleSort: this.form1.weight1,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.status == 200) {
                        this.dialogFormVisible1 = false;
                        this.$message({
                            type: "success",
                            message: "编辑成功!"
                        });
                        //刷新
                        this.ajax();
                    } else {
                        this.$message({
                            type: "error",
                            message: "编辑失败!"
                        })
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
            //添加图片
            handleSuccess(response, file) {
                this.imageUrl = response.data.url;
            },
            //编辑类目图片
            handleSuccess1(response, file) {
                this.imageUrl1 = response.data.url;
            },
            ajax(){
                this.$http.post(this.url + '/itemModule/all_itemModule', {
                    moduleLevel: 2,
                    moduleId: this.$route.query.ha
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].inputShow = false;
                        res.data.data[i].weightInput ='';
                    }
                    this.tableData = res.data.data;
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            }
        },
        mounted() {
            this.ajax();
            this.mainClassName = this.$route.query.da;
        },
    }
</script>

<style scoped>
    .redP {
        color: red;
    }

    .grid-content {
        display: flex;
        line-height: 36px;
    }
    .el-row1 {
        margin-bottom: 10px;
    }

    .inputs {
        margin-right: 8px;
    }
    .xiaoshou{
        cursor: pointer;
    }
    .inputW{
        width: 300px;
    }
    .iw{
        width: 50px;
        height: 28px;
        border-radius: 5px;
    }
</style>
