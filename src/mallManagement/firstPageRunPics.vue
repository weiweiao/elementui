<template>
    <!--首页轮播图-->
    <div>
        <div>
            <p style="color: red;margin-bottom: 8px">注意 : 填写目标Id时,请不要输入空格,否则会出错!</p>
                    <el-form ref="Aform0" :model="Aform0" label-width="100px">
                        <el-form-item label="轮播图 1">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'templet'"
                                    :on-success="AhandleSuccess0"
                                    :show-file-list="false"
                                    >
                                <img  :src="arr[0]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform0.types">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform0.aims" class="inputs"></el-input>
                            <el-button @click="clear0">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="fengefu">*************************************分隔符**************************************</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="Aform1" :model="Aform1" label-width="100px">
                        <el-form-item label="轮播图 2">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'templet'"
                                    :on-success="AhandleSuccess1"
                                    :show-file-list="false"
                            >
                                <img  :src="arr[1]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform1.types">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform1.aims" class="inputs"></el-input>
                            <el-button @click="clear1">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="fengefu">*************************************分隔符**************************************</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="Aform2" :model="Aform2" label-width="100px">
                        <el-form-item label="轮播图 3">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'templet'"
                                    :on-success="AhandleSuccess2"
                                    :show-file-list="false"
                            >
                                <img  :src="arr[2]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform2.types">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform2.aims"  class="inputs"></el-input>
                            <el-button @click="clear2">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="fengefu">*************************************分隔符**************************************</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="Aform3" :model="Aform3" label-width="100px">
                        <el-form-item label="轮播图 4">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'templet'"
                                    :on-success="AhandleSuccess3"
                                    :show-file-list="false"
                            >
                                <img  :src="arr[3]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform3.types">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform3.aims"  class="inputs"></el-input>
                            <el-button @click="clear3">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="fengefu">*************************************分隔符**************************************</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="Aform4" :model="Aform4" label-width="100px">
                        <el-form-item label="轮播图 5">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'templet'"
                                    :on-success="AhandleSuccess4"
                                    :show-file-list="false"
                            >
                                <img  :src="arr[4]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform4.types">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform4.aims"  class="inputs"></el-input>
                            <el-button @click="clear4">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item label="" style="padding-left: 60px">
                            <el-button @click="sure" type="primary">保存</el-button>
                        </el-form-item>
                    </el-form>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                arr:["http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png"],
                Aform0:{
                    types:'',
                    aims:'',
                },
                Aform1:{
                    types:'',
                    aims:'',
                },
                Aform2:{
                    types:'',
                    aims:'',
                },
                Aform3:{
                    types:'',
                    aims:'',
                },
                Aform4:{
                    types:'',
                    aims:'',
                },
                columnId:'',
            }

        },
        methods: {
            //清空
            clear0(){
                this.arr[0] = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                this.Aform0.types ='';
                this.Aform0.aims = '';
            },
            clear1(){
                this.arr[1] = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                this.Aform1.types ='';
                this.Aform1.aims = '';
            },
            clear2(){
                this.arr[2] = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                this.Aform2.types ='';
                this.Aform2.aims = '';
            },
            clear3(){
                this.arr[3] = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                this.Aform3.types ='';
                this.Aform3.aims = '';
            },
            clear4(){
                this.arr[4] = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                this.Aform4.types ='';
                this.Aform4.aims = '';
            },
            sure(){
                let arr = [];
              for(let i=0;i<5;i++){
                  let obj={};
                  obj.imageUrl = this.arr[i];
                  obj.type = this['Aform'+i].types;
                  obj.typeId = this['Aform'+i].aims;
                  arr.push(obj);
              }
                console.log(arr);
//                let i=this.AmarqueeArr.length-1;i>=0;i--
                for(let j=arr.length-1;j>=0;j--){
                    console.log(arr[j]);
                    if(arr[j].imageUrl=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'){
                            arr.splice(j,1);
                    }
                }
                console.log(arr);
                //保存轮播图
                this.$http.post(this.url+'/indexColumn/create_index_images',{columnId:this.columnId,images:JSON.stringify(arr)},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        this.$message({
                            type:'success',
                            message:'保存成功!'
                        })
                        //刷新
                        this.ajax();
                    }else{
                        this.$message({
                            type:'error',
                            message:'创建失败!'
                        })
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
            AhandleSuccess0(file){
                this.$set(this.arr,0,file.data.url);
            },
            AhandleSuccess1(file){
                this.$set(this.arr,1,file.data.url);
            },
            AhandleSuccess2(file){
                this.$set(this.arr,2,file.data.url);
            },
            AhandleSuccess3(file){
                this.$set(this.arr,3,file.data.url);
            },
            AhandleSuccess4(file){
                this.$set(this.arr,4,file.data.url);
            },
            ajax(){
                //查询轮播图
                this.$http.post(this.url+'/indexColumn/get_column_info',{templetType:'IAAA'},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null){
                        this.columnId = '';
                    }else{
                        let arr = res.data.data.images;
                        for(let i=0;i<5;i++) {
                            console.log(arr[4]);
                            if (arr[i]!=undefined) {
                                this.arr[i] =  arr[i].imageUrl;
                                this['Aform'+i].types =arr[i].type ;
                                this['Aform'+i].aims = arr[i].typeId;
                            }else{
                                this.arr[i] = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                                this['Aform'+i].types = '';
                                this['Aform'+i].aims = '';
                            }
                        }
                        this.columnId = res.data.data.columnId;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            }
        },
        mounted(){
           this.ajax();
        },
        deactivated() {
            this.$destroy()
        },
    }
</script>
<style scoped>
.inputs{
    width: 300px;
}
    img{
        width: 90px;
        height: 90px;
    }
    .fengefu{
        color: lightsteelblue;
    }
    .redP{
        color: red;
    }
</style>