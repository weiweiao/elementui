<template>
    <!--问题类型-->
    <div class="question-type">
        <!--主页面-->
        <div v-if="isShow">
            <el-button @click="add">添加问题类型</el-button>
            <!--table-->
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="number"
                        label="序号"
                        >
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        label="类型名称"
                        >
                </el-table-column>
                <el-table-column
                        label="操作"
                        >
                    <template slot-scope="scope">
                        <el-button  type="text" size="small">编辑</el-button>
                        <span>|</span>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--添加问题类型页面-->
        <div class="add" v-else="!isShow">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="问题类型" prop="questionType">
                    <el-input v-model="ruleForm.questionType"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShow:true,
                tableData: [{}],      //[{}]不写{}不显示操作内容
                ruleForm: {
                    questionType:'',
                },
                rules:{
                    questionType:[
                        { required: true, message: '请输入问题类型',trigger: 'blur' }
                    ]
                },

            }
        },
        methods:{
            add(){
                this.isShow = false;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.isShow = true;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .add {
        width: 500px;
    }
    .el-table{
        margin: 10px 0px;
    }
</style>

