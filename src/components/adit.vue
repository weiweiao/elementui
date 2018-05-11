<template>
    <div>
        <p>请上传1至5张图片 , 图片大小为00*00px(必选)</p>
        <ul class="ulPics">
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls"
                        :on-success="handleSuccess0"
                        :show-file-list="false"
                >
                    <img  :src="arr[0]" class="avatar">
                </el-upload>
            </li>
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls"
                        :on-success="handleSuccess1"
                        :show-file-list="false"
                >
                    <img  :src="arr[1]" class="avatar">
                </el-upload>
            </li>
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls"
                        :on-success="handleSuccess2"
                        :show-file-list="false"
                >
                    <img  :src="arr[2]" class="avatar">
                </el-upload>
            </li>
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls"
                        :on-success="handleSuccess3"
                        :show-file-list="false"
                >
                    <img  :src="arr[3]" class="avatar">
                </el-upload>
            </li>
            <li class="liPics">
                <el-upload
                        class="upload-demo"
                        :action="urls"
                        :on-success="handleSuccess4"
                        :show-file-list="false"
                >
                    <img  :src="arr[4]" class="avatar">
                </el-upload>
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
                arr:["http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png"],
                urls: 'http://116.62.165.6/Image/upload_image/productImage',//上传图片路径
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
            aa(){
                let newArr=[];
                let flag  = 0;
               for(let i=0;i<5;i++){
                   if(this.arr[i]!='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'){
                       newArr.push(this.arr[i]);
                       console.log(newArr);
                   }else{
                       flag++;
                   }
               }
               if(flag==5){
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
                //随便写的
                let obj1 = {a:'11',b:'22',c:[1,3]};
                let obj2 = {a:'44',b:'22',c:[4,3]};
                let obj = {}
                for(let key1 in obj1){
                    for(let key2 in obj2){
                        if(obj1[key1]==obj2[key2]){
                            delete obj2[key2]
                        }else{

                        }
                    }
                }
                console.log(obj2);
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
        width: 100px;
        height: 100px;
    }
</style>
