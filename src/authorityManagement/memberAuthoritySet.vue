<template>
    <!--权限限制-成员-->
    <div>
        <div style="max-height: 520px;overflow-y: scroll">
            <el-tree
                    :data="data2"
                    @check-change="tree"
                    show-checkbox
                    node-key="moduleId"
                    ref="tree"
                    highlight-current
                    :default-checked-keys="defaultCheckedArr"
                    :props="defaultProps">
            </el-tree>
        </div>
        <div class="btn">
            <el-button type="primary" @click="qxsave()">保存</el-button>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
        data() {
            return {
                deptDefaultModel:[],
                defaultProps: {
                    children: 'childModule',
                    label: 'moduleName',
                },
                defaultCheckedArr:[],
                data2: [],
            }
        },
        methods:{
            tree(val){
                console.log(val.moduleId);
            },
            qxsave() {
                let arr=this.$refs.tree.getCheckedNodes();
                let qxarr=[];
                for (let key in arr){
                    qxarr.push(arr[key].moduleId)
                }
                this.deptDefaultModel=qxarr;
                console.log(this.deptDefaultModel);
                this.$http.post(this.url+'/admin/admin_privilege',{adminId:this.$route.query.adminId,specialModel:this.deptDefaultModel.join(',')},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        this.$message({
                            type:'success',
                            message:'设置成功!'
                        });
                        this.$router.push({
                            path:'/memberManagement'
                        });
                    }else{
                        this.$message({
                            type:'error',
                            message:'设置失败!'
                        })
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
        },
        created(){
            //查询模块
            this.$http.post(this.url+'/module/all_module',{},{emulateJSON:true}).then(function (res) {
                console.log(res);
                if(res.data.data==null||res.data==null){
                    this.data2 = [];
                }else {
                    this.data2 = res.data.data;
                }
            },function (err) {
                this.$message({
                    type:'error',
                    message:'服务器连接中断,请联系后台人员!',
                });
            });
            //显示选中项
            this.$http.post(this.url+'/admin/echo_permission',{adminId:this.$route.query.adminId},{emulateJSON:true}).then(function (res) {
                if(res.data.data==null){
                }else{
                    this.$refs.tree.setCheckedKeys(res.data.data);
                }
            },function (err) {
                this.$message({
                    type:'error',
                    message:'服务器连接中断,请联系后台人员!',
                });
            });
        }
    }
</script>
<style scoped>
.btn{
   text-align: center;
    margin-top: 10px;
}
</style>

