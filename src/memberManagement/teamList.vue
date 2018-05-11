<template>
    <!--团队列表-->
    <div class="team-list">
        <el-row :gutter="24" class="el-row1">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <span class="spans0">时间范围</span>
                    <el-date-picker
                            @change="times"
                            v-model="value6"
                            type="daterange"
                            range-separator="至"
                            placeholder="请选择日期范围">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <span class="spans0">团队名称</span>
                    <el-input type="primary" placeholder="请输入团队名称" v-model="teamName"></el-input>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click="inquiry">查询</el-button>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click="clears">清除条件</el-button>
                </div>
            </el-col>
        </el-row>

        <!--table-->
        <el-table
                :data="tableData"
                border
                style="width: 100%"
                max-height="520">
            <el-table-column
                    type="index"
                    label="序号"
                    width="88"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="团队名称"
            >
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="注册时间"
            >
                <template slot-scope="scope">
                    <p v-show="scope.row.gmtCreate==null?false:true">{{scope.row.gmtCreate | time}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="text" @click="adit(scope.row,scope.$index)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--修改弹框-->
        <el-dialog title="修改团队名称" :visible.sync="dialogTableVisible">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
                <el-form-item label="团队名称" prop="name">
                    <el-input v-model="form.name" auto-complete="off" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="">
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
                value6: [],//时间范围
                teamName: '',//团队名称
                tableData: [
                    {
                        xuhao: 1,
                        registrationTime: '2016-05-02',
                        teamName: '王小虎',
                    },],
                dialogTableVisible: false,
                form: {name: ''},
                rules: {
                    name: [
                        {required: true, message: '请输入团队名称', trigger: 'blur'}
                    ]
                },
                startTime: '',
                endTime: '',
                teamId:'',
            }
        },
        methods: {
            //查询
            inquiry(){
              this.ajax(this.startTime,this.endTime,this.teamName)
            },
            //时间
            times(val) {
                console.log(val);
                this.startTime = val.substring(0, 10);
                this.endTime = val.substring(11);
                console.log(this.startTime);
                console.log(this.endTime);
            },
            //修改
            adit(row, index) {
                console.log(row, index);
                this.teamId = row.teamId
                this.dialogTableVisible = true;
                this.form.name = row.name;
            },
            //修改确定
            sure(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url+'/team/save_edit',{teamId:this.teamId,name:this.form.name},{emulateJSON:true}).then(function (res) {
                            console.log(res);
                            if(res.data.status==200){
                                this.$message({
                                    type:'success',
                                    message:'修改成功!'
                                })
                                this.dialogTableVisible = false;
                                //刷新
                                this.ajax(this.startTime,this.endTime,this.teamName)
                            }else{
                                this.$message({
                                    type:success,
                                    message:'修改失败!'
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //清除条件
            clears() {
                this.value6 = '';
                this.teamName = '';
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //ajax
            ajax(a1, a2, a3) {
                this.$http.post(this.url + '/team/select_byTerm', {
                    startTime: a1,
                    endTime: a2,
                    name: a3
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.data == null) {
                        this.tableData = [];
                    } else {
                        this.tableData = res.data.data
                    }
                })
            }
        },
        mounted() {
            this.ajax('', '', '')
        }
    }
</script>
<style scoped>
    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .spans0 {
        width: 60px;
    }

    .el-row1 {
        margin-bottom: 10px;
    }

    .block {
        text-align: right;
        margin: 10px 0;
    }
</style>