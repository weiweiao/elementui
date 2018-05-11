<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="7">
                <div class="flexs">
                    <span style="width: 60px;">时间范围</span>
                    <el-date-picker
                            @change="timeChange"
                            v-model="value1"
                            type="datetimerange"
                            range-separator="至"
                            placeholder="请选择时间范围"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="flexs">
                    <span style="width: 80px;">用户姓名</span>
                    <el-input placeholder="请输入用户姓名" v-model="userName"></el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="flexs">
                    <span style="width: 60px;">手机号</span>
                    <el-input placeholder="请输入手机号" v-model="phone"></el-input>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button @click="inquiry" type="primary">查询</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="clears" type="primary">清除条件</el-button>
            </el-col>
        </el-row>
        <el-table
                :data="tableData"
                border
                style="width: 100%;margin-top: 8px">
            <el-table-column
                    prop="xuhao"
                    label="序号"
                    width="88">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="用户姓名"
                    >
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    prop="storeAddress"
                    label="店铺地址">
            </el-table-column>
            <el-table-column
                    prop="storeDesc"
                    label="店铺详情">
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="创建时间">
                <template slot-scope="scope">
                    <p v-show="scope.row.gmtCreate==null||scope.row.gmtCreate==''?false:true">{{scope.row.gmtCreate | time}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="notes"
                    label="备注">
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="adit(scope.row,scope.$index)">编辑</el-button>
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
        <!--编辑弹框-->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="店铺地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" auto-complete="off" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="店铺详情" :label-width="formLabelWidth">
                    <el-input v-model="form.shopDetail" auto-complete="off" type="textarea" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" auto-complete="off" type="textarea" class="inputs"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage:1,
                arr:[],
                value1:[],//时间范围
                userName:'',//用户姓名
                phone:'',//手机号
                tableData:[{}],
                dialogFormVisible:false,
                form:{
                    name:'',
                    phone:'',
                    address:'',
                    shopDetail:'',
                    remark:''
                },
                formLabelWidth:'100px',
                startTime:'',
                endTime:'',
                row:{},
            }
        },
        methods:{
            //时间范围
            timeChange(val){
                console.log(val);
                this.startTime = val.substring(0,19);
                this.endTime = val.substring(20);
                console.log(this.startTime);
                console.log(this.endTime);
            },
            //清除条件
            clears(){
                this.value1 = [];
                this.userName = '';
                this.phone = '';
            },
            //查询
            inquiry(){
                this.currentPage = 1;
                this.ajax(this.currentPage,this.startTime,this.endTime,this.userName,this.phone);
            },
            //编辑
            adit(row,index){
                this.row = row;
                //回显
                console.log(row);
                this.form.name = row.name;
                this.form.phone =row.mobile ;
                this.form.address =row.storeAddress ;
                this.form.shopDetail =row.storeDesc ;
                this.form.remark = row.notes;
                this.dialogFormVisible = true;
            },
            //编辑确定按钮
            sure(){
                this.$http.post(this.url+'/manager/update_store',{
                    name:this.form.name,
                    mobile:this.form.phone,
                    storeAddress:this.form.address,
                    storeDesc:this.form.shopDetail,
                    notes:this.form.remark,
                    id:this.row.id
                },{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        this.$message({
                            type:'success',
                            message:'编辑成功!'
                        });
                        this.dialogFormVisible = false;
                        //刷新
                        this.ajax(this.currentPage,this.startTime,this.endTime,this.userName,this.phone);
                    }else{
                        this.$message({
                            type:'error',
                            message:'编辑失败!'
                        })
                    }

                })
            },
            //分页
            handleCurrentChange(val){
                console.log(val);
                this.currentPage = val;
                this.ajax(this.currentPage,this.startTime,this.endTime,this.userName,this.phone);
            },
            //ajax
            ajax(a1,a2,a3,a4,a5){
                this.$http.post(this.url+'/manager/select_physicalStore',{
                    page:a1,
                    num:10,
                    startTime:a2,
                    endTime:a3,
                    name:a4,
                    mobile:a5,
                },{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null||res.data.data.pageList==null){
                        this.tableData = [];
                        this.arr.length = 0;
                    }else{
                        for(let i=0;i<res.data.data.pageList.length;i++){
                            res.data.data.pageList[i].xuhao=i+1+(this.currentPage-1)*10;
                        }
                        this.tableData = res.data.data.pageList;
                        this.arr.length = res.data.data.pageTotal;
                    }
                })
            },
        },
        mounted(){
            this.ajax(1,'','','','')
        }
    }
</script>


<style scoped>
.inputs{
    width:60%;
}
    .flexs{
        display: flex;
    }
.flexs span{
    line-height: 35px;
}
    .block{
        text-align: right;
        margin-top: 8px;
    }
</style>
