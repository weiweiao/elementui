<template>
    <!--添加优惠券包-->
    <div>
        <!--<el-button @click="add">添加优惠券包</el-button>-->
        <el-table
                :data="tableData"
                border
                style="width: 100%;">
            <el-table-column
                    type="index"
                    label="序号"
                    width="77">
            </el-table-column>
            <el-table-column
                    prop="backageName"
                    label="优惠券包名称"
                   >
            </el-table-column>
            <el-table-column
                    prop="backage0"
                    label="优惠券包类型">
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="创建时间">
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
                    <el-button type="text" @click="bindCoupon(scope.row,scope.$index)">绑定优惠券</el-button>
                    <!--<span>|</span>-->
                    <!--<el-button type="text">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <!--添加弹框-->
        <el-dialog title="添加优惠券包" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="优惠券包名称" :label-width="formLabelWidth">
                    <el-input v-model="name" auto-complete="off" class="inputs" onkeydown="if(event.keyCode==32) return false"></el-input>
                </el-form-item>
                <el-form-item label="优惠券包类型" :label-width="formLabelWidth">
                    <el-radio-group v-model="type" @change="typeChange">
                        <el-radio label="0">开通GT金卡会员</el-radio>
                        <el-radio label="1">开通创业店</el-radio>
                        <el-radio label="2"> 原688会员店升级创业店</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div style="text-align: center">
                    <el-button type="primary" @click="sure">保存</el-button>
                </div>
            </el-form>
        </el-dialog>
        <!--编辑弹框-->
        <el-dialog title="编辑优惠券包" :visible.sync="dialogFormVisible1">
            <el-form>
                <el-form-item label="优惠券包名称" :label-width="formLabelWidth">
                    <el-input v-model="name" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <!--<el-form-item label="优惠券包类型" :label-width="formLabelWidth">-->
                    <!--<el-radio-group v-model="type" @change="typeChange">-->
                        <!--<el-radio label="0">开通GT金卡会员</el-radio>-->
                        <!--<el-radio label="1">开通创业店</el-radio>-->
                        <!--<el-radio label="2"> 原688会员店升级创业店</el-radio>-->
                    <!--</el-radio-group>-->
                <!--</el-form-item>-->
                <div style="text-align: center">
                    <el-button type="primary" @click="sure1">保存</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData:[{},{}],
                dialogFormVisible:false,//add
                dialogFormVisible1:false,//adit
                formLabelWidth:'120px',
                name:'',//优惠券包名称
                type:'',
                backageId:'',
            }
        },
        methods: {
            bindCoupon(row,index){
                this.$router.push({
                    path:'/bindCoupon',
                    query:{row:row}
                })
            },
            //编辑
            adit(row,index){
                console.log(row);
                this.backageId = row.backageId;
                this.name = row.backageName;
                this.type = row.backage.toString();
                this.dialogFormVisible1=true;
            },
            //编辑保存
            sure1(){
                if(this.name==''||this.type==''){
                    this.$message({
                        type:'warning',
                        message:'请完善内容!'
                    })
                }else {
                    this.$http.post(this.url + '/backagecoupon/update_name', {
                        backageName: this.name,
                        backage: this.type,
                        backageId:this.backageId,
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '编辑成功!'
                            });
                            this.dialogFormVisible1 = false;
                            //刷新
                            this.ajax()
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
                    })
                }
            },
            //add-类型
            typeChange(val){
                console.log(val);
            },
            //确定
            add(){
                //清空
                this.name='';
                this.type='';
                this.dialogFormVisible = true;
            },
            //add-sure
            sure(){
                if(this.name==''||this.type==''){
                    this.$message({
                        type:'warning',
                        message:'请完善内容!'
                    })
                }else{
                    this.$http.post(this.url+'/backagecoupon/add_backage',{backageName:this.name,backage:this.type},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type:'success',
                                message:'添加成功!'
                            });
                            this.dialogFormVisible = false;
                            //刷新
                            this.ajax()
                        }else{
                            this.$message({
                                type:'error',
                                message:'添加失败!'
                            })
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    })
                }
            },
            //ajax
            ajax(){
                this.$http.post(this.url+'/backagecoupon/all',{page:1,num:10},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null||res.data.data.pageList==null){
                        this.tableData = [];
                    }else{
                        for(let i=0;i<res.data.data.pageList.length;i++){
                            if(res.data.data.pageList[i].backage=='FANS'){
                                res.data.data.pageList[i].backage0='全球金卡优惠券包'
                            }else if(res.data.data.pageList[i].backage=='NORMAL'){
                                res.data.data.pageList[i].backage0='全球黑卡优惠券包'
                            }else if(res.data.data.pageList[i].backage=='688NORMAL'){
                                res.data.data.pageList[i].backage0='升级全球黑卡优惠券包'
                            }else{
                                res.data.data.pageList[i].backage0='无'
                            }
                        }
                        this.tableData = res.data.data.pageList;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            }
        },
        mounted() {
           this.ajax();
        }
    }
</script>

<style scoped>
   .inputs{
       width: 300px;
   }
</style>
