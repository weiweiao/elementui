<template>
    <!--自动回复-->
    <div class="automatic-response">
        <p>此功能用于用户关注公众号后向用户自动发送文本消息或图文消息</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="文本" prop="txt">
                <el-input type="textarea" v-model="ruleForm.txt"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

            <el-form-item label="图片">
                <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="链接">
                <el-input v-model="ruleForm.link"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input  type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogImageUrl: '',//设置图片
                dialogVisible: false,
                ruleForm: {
                    txt:'',
                    title:'',
                    link:'',
                    desc:'',
                },
                rules:{
                    txt:{ required: true, message: '请输入文本内容', trigger: 'blur' },
                    title:{required: true, message: '请输入标题', trigger: 'blur' },
                    desc:{required: true, message: '请输入描述', trigger: 'blur' },

                }
            };
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //图片
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }
    }
</script>

<style scoped>
.el-form{
    width: 500px;
}
    p{
        color: red;
        font-size: 14px;
        margin-bottom: 10px;
        margin-left: 35px;
    }
</style>
