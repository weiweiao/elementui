<template>
    <!--二级页-->
    <div>
        <el-button style="margin-bottom: 8px" @click="add">添加</el-button>
        <!--<span class="redP">分页暂时没做</span>-->
        <el-table
                :data="tableData"
                border
                style="width: 100%"
                max-height="480"
        >
            <el-table-column
                    prop="xuhao"
                    label="序号"
                    width="88">
            </el-table-column>
            <el-table-column
                    prop="pageName"
                    label="页面名称"
            >
            </el-table-column>
            <el-table-column
                    prop="customPageId"
                    label="页面ID"
            >
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
        <!--添加弹框-->
        <el-dialog title="添加页面名称" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="页面名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label=" " :label-width="formLabelWidth">
                    <el-button type="primary" @click="sure('form')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                tableData:[],
                dialogFormVisible:false,//add
                formLabelWidth:'120px',
                form:{name:''},
                rules:{
                    name:[ { required: true, message: '请输入页面名称', trigger: 'blur' },]
                },

            }

        },
        methods: {
//            删除
            delet(row,index){
                console.log(row, index);
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/customPage/del_custom_page',{customPageId :row.customPageId },{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
//                                刷新
                            this.ajax()
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
            add(){
                this.form.name='';//清空
                this.dialogFormVisible = true;
            },
//            编辑
            adit(row,index){
                console.log(row);
                this.$router.push({
                    path:'/secondAdit',
                    query:{customPageId:row.customPageId}
                })
            },
            sure(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url+'/customPage/create_customPage',{pageName:this.form.name},{emulateJSON:true}).then(function (res) {
                            console.log(res);
                            if(res.data.status==200){
                                this.dialogFormVisible = false;
                                this.$message({
                                    type:'success',
                                    message:'添加成功!'
                                });
//                                刷新页面
                                this.ajax();
                            }else{
                                this.$message({
                                    type:'error',
                                    message:'添加失败!'
                                });
                            }
                        },function (err) {
                            this.$message({
                                type:'error',
                                message:'服务器连接中断,请联系后台人员!',
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            ajax(){
                this.$http.post(this.url+'/customPage/get_all_page',{page:1,num:10},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null){
                        this.tableData=[];
                    }else{
                        for(let i=0;i<res.data.data.pageList.length;i++){
                            res.data.data.pageList[i].xuhao=i+1;
                        }
                        this.tableData=res.data.data.pageList;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },

        },
        mounted(){
            this.ajax();
        }
    }
</script>
<style scoped>
    .inputs{
        width: 350px;
    }
    .redP{
        color:red;
    }
</style>