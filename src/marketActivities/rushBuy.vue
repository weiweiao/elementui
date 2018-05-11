<template>
    <!--抢购-->
    <div class="rush-buy">
        <!-- 添加会员抢购Form -->
        <el-button  @click="dialogFormVisible = true">添加限时抢购</el-button>
        <el-dialog title="添加限时抢购" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form" >
                <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上线时间" :label-width="formLabelWidth">
                        <el-date-picker
                                v-model="value1"
                                type="datetime"
                                placeholder="选择上线时间">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="下线时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="value2"
                            type="datetime"
                            placeholder="选择下线时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>


        <el-row :gutter="24" class="el-row2">
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span class="spans0">名称</span>
                    <el-input placeholder="请输入名称"></el-input>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button type="primary">查询</el-button>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span class="spans1">商品名称</span>
                    <el-input placeholder="请输入商品名称"></el-input>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button type="primary">查询</el-button>
            </el-col>
        </el-row>
        <el-tabs type="border-card">
            <el-tab-pane label="限时抢购">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="number"
                            label="序号"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="activityName"
                            label="活动名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="linkAddress"
                            label="链接地址"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="upTime"
                            label="上线时间"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="downTime"
                            label="下线时间"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="状态"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="280">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small">绑定商品</el-button>
                            <el-button type="text" size="small">导入</el-button>
                            <el-button type="text" size="small">导出</el-button>
                            <el-button type="text" size="small">查看日志</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="限时秒杀">待定</el-tab-pane>
            <el-tab-pane label="会员抢购">待定</el-tab-pane>
            <el-tab-pane label="会员专享">待定</el-tab-pane>
            <el-tab-pane label="会员秒杀">待定</el-tab-pane>
        </el-tabs>
        <!--分页-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[30]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="100">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value1:'',
                value2:'',
                tableData: [{}],
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    name: '',
                    region: '',
                },
                rules:{
                       name:[{required: true, message: '请输入名称', trigger: 'blur'}]
                }

            }
        },
        methods:{
            submitForm(ruleForm){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
//                        this.dialogFormVisible = !this.dialogFormVisible;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
.grid-content{
    display: flex;
    line-height: 36px;
}
  .spans0{
      width: 60px;
  }
.spans1{
    width: 120px;
}
.el-row2{
    margin: 10px 0;
}
    .block{
        text-align: right;
        margin-top: 10px;
    }
</style>
