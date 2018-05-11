<template>
    <div>
    <el-row>
        <el-col :span="8" :offset="6">
            <div class="change-password">
                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="新密码" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="submit">
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
    </div>
</template>

<script>
    export default {
        name: "changePassword",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                url: 'http://192.168.8.59:8084',
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                },
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'},
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url+'/admin/change_password',{password:this.ruleForm2.pass},{emulateJSON:true}).then(function (res) {
                            alert("您确定修改密码吗?");
                            if(res.data.status==200){
                                alert("修改成功");
                            }
                            window.location.reload();
                        });
                    } else {
                        this.$message({
                            type:'error',
                            message:'修改失败!'
                        });
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
  .change-password{
      margin-top: 150px;
  }
    .submit{
        text-align: center;
    }
</style>
