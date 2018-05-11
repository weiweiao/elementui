<template>
    <!--九张图片-->
    <div>
        <!--<p>请上传1至9张图片 , 图片大小为00*00px(必选)</p>-->
        <ul class="ulPics">
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls+'find'"
                        :on-success="handleSuccess0"
                        :show-file-list="false"
                >
                    <img  :src="arr[0]" class="avatar">
                </el-upload>
                <div style="text-align: center">图片 1 </div>
            </li>
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls+'find'"
                        :on-success="handleSuccess1"
                        :show-file-list="false"
                >
                    <img  :src="arr[1]" class="avatar">
                    <div style="text-align: center">图片 2 </div>
                </el-upload>
            </li>
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls+'find'"
                        :on-success="handleSuccess2"
                        :show-file-list="false"
                >
                    <img  :src="arr[2]" class="avatar">
                </el-upload>
                <div style="text-align: center">图片 3 </div>
            </li>
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls+'find'"
                        :on-success="handleSuccess3"
                        :show-file-list="false"
                >
                    <img  :src="arr[3]" class="avatar">
                </el-upload>
                <div style="text-align: center">图片 4 </div>
            </li>
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls+'find'"
                        :on-success="handleSuccess4"
                        :show-file-list="false"
                >
                    <img  :src="arr[4]" class="avatar">
                </el-upload>
                <div style="text-align: center">图片 5 </div>
            </li>
        </ul>
        <ul class="ulPics">
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls+'find'"
                        :on-success="handleSuccess5"
                        :show-file-list="false"
                >
                    <img  :src="arr[5]" class="avatar">
                </el-upload>
                <div style="text-align: center">图片 6 </div>
            </li>
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls+'find'"
                        :on-success="handleSuccess6"
                        :show-file-list="false"
                >
                    <img  :src="arr[6]" class="avatar">
                </el-upload>
                <div style="text-align: center">图片 7 </div>
            </li>
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls+'find'"
                        :on-success="handleSuccess7"
                        :show-file-list="false"
                >
                    <img  :src="arr[7]" class="avatar">
                </el-upload>
                <div style="text-align: center">图片 8 </div>
            </li>
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls+'find'"
                        :on-success="handleSuccess8"
                        :show-file-list="false"
                >
                    <img  :src="arr[8]" class="avatar">
                </el-upload>
                <div style="text-align: center">图片 9 </div>
            </li>
        </ul>
        <el-button @click="aa">点击给后台</el-button>
        <el-button @click="bb">查询</el-button>
    </div>
</template>

<script type="text/javascript">
    export default {
        data() {
            return {
                arr:["http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png"],
            }
        },
        methods: {
            handleSuccess0(file) {
                console.log(file);
                //数组监听  this.arr[0] = file.data.url;不生效
                this.$set(this.arr,0,file.data.url)
            },
            handleSuccess1(file) {
                console.log(file);
                this.$set(this.arr,1,file.data.url)
            },
            handleSuccess2(file) {
                console.log(file);
                this.$set(this.arr,2,file.data.url)
            },
            handleSuccess3(file) {
                console.log(file);
                this.$set(this.arr,3,file.data.url)
            },
            handleSuccess4(file) {
                console.log(file);
                this.$set(this.arr,4,file.data.url)
            },
            handleSuccess5(file) {
                console.log(file);
                this.$set(this.arr,5,file.data.url)
            },
            handleSuccess6(file) {
                console.log(file);
                this.$set(this.arr,6,file.data.url)
            },
            handleSuccess7(file) {
                console.log(file);
                this.$set(this.arr,7,file.data.url)
            },
            handleSuccess8(file) {
                console.log(file);
                this.$set(this.arr,8,file.data.url)
            },
            aa(){
                let newArr=[];
                let flag  = 0;
                for(let i=0;i<9;i++){
                    if(this.arr[i]!='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'){
                        newArr.push(this.arr[i]);
                        console.log(newArr);
                    }else{
                        flag++;
                    }
                }
                if(flag==9){
                    this.$message({
                        type:'warning',
                        message:'请选择图片!',
                    })
                }
            },
            bb(){
                let arr=["http://qqskimage.oss-cn-hangzhou.aliyuncs.com/productImage/1516548557343.jpg", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/productImage/1516548549193.jpg", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/productImage/1516548553113.jpg"];
                for (let i=0;i<arr.length;i++){
                    this.$set(this.arr,i,arr[i])
                }
            }
        }

    }
</script>

<style scoped>
    .ulPics{
        display: flex;
        list-style: none;
    }
    .liPics{
        margin-right: 25px;
    }
    .avatar{
        width: 80px;
        height: 80px;
        border-radius: 5px;
    }
</style>
