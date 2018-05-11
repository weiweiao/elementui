 <template>
        <!--登录-->
        <div class="login">
            <el-row>
                <el-col>
                    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px"
                             class="demo-ruleForm">
                        <el-form-item label="用户名" prop="pass">
                            <el-input type="text" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="login-btn">
                            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
</template>

<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                    checkPass: ''
                },
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]

                },
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url+'/admin/admin_login',{loginName:this.ruleForm2.pass, password:this.ruleForm2.checkPass},{emulateJSON:true}).then(function (res) {
                            console.log(res);
                            if(res.data.status==202){
                                this.$message({
                                    type:'error',
                                    message:'用户名或密码错误!'
                                });
                            }else{
                                console.log(res.data.data);
                                //截取字符
                                let newArr=[];
                                for(let i=0;i<res.data.data.length;i++){
                                    if(res.data.data[i].length>3){
                                        //去除字符串后两位
                                        let a=res.data.data[i].substring(0,res.data.data[i].length-2);
                                        newArr.push(a,res.data.data[i]);
                                    }
                                }
                                //去重
                                let arr2=[];
                                for(let i=0;i<newArr.length;i++){
                                    if(arr2.indexOf(newArr[i]) < 0){
                                        arr2.push(newArr[i]);
                                    }
                                }
                                //判断{}和[]中是否有相同的
                                for(let i=0;i<arr2.length;i++){
                                    for(let key in this.Obj){
                                        if(arr2[i]==key){
                                            this.Obj[key]=true;
                                            console.log(this.Obj[key]);
                                        }
                                    }
                                }
                                this.currentUser = this.ruleForm2.pass;
                                this.isShow = false;
                                this.$router.push({
                                    path:'/App.vue',
                                });
                            }
                        });

                    } else {
                       this.$message({
                           type:'error',
                           message:'登录失败!'
                       });
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
