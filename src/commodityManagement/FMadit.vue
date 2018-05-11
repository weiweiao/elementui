<template>
    <!--前台模块-编辑部分-->
    <div class="front-module-adit">
        <div class="main">
            <el-form :model="ruleForm1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                <el-form-item label="模块名称" prop="name1">
                    <el-input v-model="ruleForm1.name1" auto-complete="off" class="ws"></el-input>
                </el-form-item>
                <el-form-item label="模块权重" prop="weight1" sortable="true">
                    <el-input v-model="ruleForm1.weight1" auto-complete="off" class="ws"></el-input>
                </el-form-item>
                <el-form-item label="模块图片" prop="file" class="picsWS">
                    <el-upload
                            class="upload-demo"
                            :action="urls+'itemModule'"
                            :on-success="aditHandleSuccess1"
                            :file-list="aditFileList1"
                            list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <p class="redP">请自行编辑1至5张轮播图，轮播图片大小为710*334px</p>
                <el-form ref="Bform0" :model="Bform0" label-width="100px" class="picsWS">
                    <el-form-item label="轮播图 1">
                        <el-upload
                                class="upload-demo"
                                :action="urls+'itemModule'"
                                :on-success="BhandleSuccess"
                                :file-list="BfileList0"
                                list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="绑定类型">
                        <el-radio-group v-model="Bform0.types" @change="Btypes0">
                            <el-radio label="DISCOUNT">二级页</el-radio>
                            <el-radio label="GOODSDETAIL">商品详情</el-radio>
                            <el-radio label="GOODSLIST">商品列表</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="目标Id">
                        <el-input v-model="Bform0.aims"  class="ws"></el-input>
                        <el-button @click="Bform0.aims='';Bform0.types='';BfileList0=[]">清空</el-button>
                        <span class="redP">(注意 : 请不要输入空格)</span>
                    </el-form-item>
                    <el-form-item>
                        <span class="fengefu">*************************************分隔符**************************************</span>
                    </el-form-item>
                </el-form>
                <el-form ref="Bform1" :model="Bform1" label-width="100px" class="picsWS">
                    <el-form-item label="轮播图 2">
                        <el-upload
                                class="upload-demo"
                                :action="urls+'itemModule'"
                                :on-success="BhandleSuccess1"
                                :file-list="BfileList1"
                                list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="绑定类型">
                        <el-radio-group v-model="Bform1.types" @change="Btypes1">
                            <el-radio label="DISCOUNT">二级页</el-radio>
                            <el-radio label="GOODSDETAIL">商品详情</el-radio>
                            <el-radio label="GOODSLIST">商品列表</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="目标Id">
                        <el-input v-model="Bform1.aims" class="ws"></el-input>
                        <el-button @click="Bform1.aims='';Bform1.types='';BfileList1=[]">清空</el-button>
                        <span class="redP">(注意 : 请不要输入空格)</span>
                    </el-form-item>
                    <el-form-item>
                        <span class="fengefu">*************************************分隔符**************************************</span>
                    </el-form-item>
                </el-form>
                <el-form ref="Bform2" :model="Bform2" label-width="100px" class="picsWS">
                    <el-form-item label="轮播图 3">
                        <el-upload
                                class="upload-demo"
                                :action="urls+'itemModule'"
                                :on-success="BhandleSuccess2"
                                :file-list="BfileList2"
                                list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="绑定类型">
                        <el-radio-group v-model="Bform2.types" @change="Btypes2">
                            <el-radio label="DISCOUNT">二级页</el-radio>
                            <el-radio label="GOODSDETAIL">商品详情</el-radio>
                            <el-radio label="GOODSLIST">商品列表</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="目标Id">
                        <el-input v-model="Bform2.aims" class="ws"></el-input>
                        <el-button @click="Bform2.aims='';Bform2.types='';BfileList2=[]">清空</el-button>
                        <span class="redP">(注意 : 请不要输入空格)</span>
                    </el-form-item>
                    <el-form-item>
                        <span class="fengefu">*************************************分隔符**************************************</span>
                    </el-form-item>
                </el-form>
                <el-form ref="Bform3" :model="Bform3" label-width="100px" class="picsWS">
                    <el-form-item label="轮播图 4">
                        <el-upload
                                class="upload-demo"
                                :action="urls+'itemModule'"
                                :on-success="BhandleSuccess3"
                                :file-list="BfileList3"
                                list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="绑定类型">
                        <el-radio-group v-model="Bform3.types" @change="Btypes3">
                            <el-radio label="DISCOUNT">二级页</el-radio>
                            <el-radio label="GOODSDETAIL">商品详情</el-radio>
                            <el-radio label="GOODSLIST">商品列表</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="目标Id">
                        <el-input v-model="Bform3.aims" class="ws"></el-input>
                        <el-button @click="Bform3.aims='';Bform3.types='';BfileList3=[]">清空</el-button>
                        <span class="redP">(注意 : 请不要输入空格)</span>
                    </el-form-item>
                    <el-form-item>
                        <span class="fengefu">*************************************分隔符**************************************</span>
                    </el-form-item>
                </el-form>
                <el-form ref="Bform4" :model="Bform4" label-width="100px" class="picsWS">
                    <el-form-item label="轮播图 5">
                        <el-upload
                                class="upload-demo"
                                :action="urls+'itemModule'"
                                :on-success="BhandleSuccess4"
                                :file-list="BfileList4"
                                list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="绑定类型">
                        <el-radio-group v-model="Bform4.types" @change="Btypes4">
                            <el-radio label="DISCOUNT">二级页</el-radio>
                            <el-radio label="GOODSDETAIL">商品详情</el-radio>
                            <el-radio label="GOODSLIST">商品列表</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="目标Id">
                        <el-input v-model="Bform4.aims" class="ws"></el-input>
                        <el-button @click="Bform4.aims='';Bform4.types='';BfileList4=[]">清空</el-button>
                        <span class="redP">(注意 : 请不要输入空格)</span>
                    </el-form-item>
                </el-form>
                <el-form-item>
                    <div style="padding-left: 100px;">
                        <el-button type="primary" @click="sure1('ruleForm1')">保存</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        data() {
            return {
//                urls: 'http://47.96.154.252:8088/Image/upload_image/itemModule',//action中图片路径
                ruleForm1: {name1: '', file: '', weight1: ''},
                aditFileList1: [],//编辑模块图片
//编辑轮播图
                BmarqueeArr: [],//存放轮播图数组
                //轮播图第一张
                BfileList0: [],
                Bform0: {
                    types: ''
                },
                Bform1: {types: ''},
                Bform2: {types: ''},
                Bform3: {types: ''},
                Bform4: {types: ''},
                BtypeVal0: '',//绑定类型1
                BmarqueeUrl0: '',//接收后台返回图片url
                //轮播图第二张
                BfileList1: [],
                BtypeVal1: '',//绑定类型2
                BmarqueeUrl1: '',//接收后台返回图片url1
                //轮播图第三张
                BfileList2: [],
                BtypeVal2: '',//绑定类型3
                BmarqueeUrl2: '',//接收后台返回图片url2
                //轮播图第四张
                BfileList3: [],
                BtypeVal3: '',//绑定类型3
                BmarqueeUrl3: '',//接收后台返回图片url3
                //轮播图第五张
                BfileList4: [],
                BtypeVal4: '',//绑定类型4
                BmarqueeUrl4: '',//接收后台返回图片url4
            }
        },
        methods: {
            //编辑单张图片
            aditHandleSuccess1(response, file, fileList) {
                console.log(response, file, fileList);
                this.aditFileList1 = [];//先清空再添加
                let obj = {};
                obj.url = response.data.url;
                this.aditFileList1.push(obj);
                this.aditUrl1 = response.data.url;//传给后台
            },
            //编辑确定
            sure1(form) {
                this.BmarqueeArr = [];
                for (let i = 0; i < 5; i++) {
                    let obj = {};
                    let aa = 'BfileList' + i;
                    console.log(aa);
                    let Arr = this[aa];
                    console.log(Arr);
                    if (Arr.length != 0) {
                        obj.imageUrl = Arr[0].url;
                        obj.type = this['Bform' + i].types;
                        obj.typeId = this['Bform' + i].aims;
                        this.BmarqueeArr.push(obj);
                        console.log(this.BmarqueeArr);
//                        for (let i = this.BmarqueeArr.length - 1; i >= 0; i--) {
//                            if (this.BmarqueeArr[i].type == '') {
//                                this.BmarqueeArr.splice(i, 1);
//                            }
//                        }
                        console.log(this.BmarqueeArr);
                    } else {
//                        return;
                    }
                }
                this.$http.post(this.url + '/itemModule/update_itemModule', {
                    itemModuleId: this.$route.query.id.itemModuleId,
                    itemModuleName: this.ruleForm1.name1,
                    itemModuleImageUrl: this.aditFileList1[0].url,
                    itemModuleSort: this.ruleForm1.weight1,
//                    itemModuleStatus: this.openOrClose,//开关
                    imageUrls:JSON.stringify(this.BmarqueeArr),
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.status == 200) {
                        this.$message({
                            message: '编辑成功!',
                            type: 'success'
                        });
                        this.$router.push({
                            path:'/frontModule',
                        });
                    } else {
                        this.$message({
                            message: '编辑失败!',
                            type: 'warning'
                        });
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
            //编辑轮播图部分
            //轮播图第一张
            BhandleSuccess(file) {
                console.log(file.data.url);
                this.BmarqueeUrl0 = file.data.url;
                this.BfileList0 = [];
                let obj = {};
                obj.url = file.data.url;
                this.BfileList0.push(obj);
            },
            Btypes0(val) {
                console.log(val);
                this.BtypeVal0 = val;
            },
            //轮播图第二张
            BhandleSuccess1(file) {
                console.log(file.data.url);
                this.BmarqueeUrl1 = file.data.url;
                this.BfileList1 = [];
                let obj = {};
                obj.url = file.data.url;
                this.BfileList1.push(obj);
                console.log(this.BfileList1);
            },
            Btypes1(val) {
                console.log(val);
                this.BtypeVal1 = val;
            },
            //轮播图第三张
            BhandleSuccess2(file) {
                console.log(file.data.url);
                this.BmarqueeUrl2 = file.data.url;
                this.BfileList2 = [];
                let obj = {};
                obj.url = file.data.url;
                this.BfileList2.push(obj);
            },
            Btypes2(val) {
                console.log(val);
                this.BtypeVal2 = val;
            },//单选
            //轮播图第四张
            BhandleSuccess3(file) {
                console.log(file.data.url);
                this.BmarqueeUrl3 = file.data.url;
                this.BfileList3 = [];
                let obj = {};
                obj.url = file.data.url;
                this.BfileList3.push(obj);
            },
            Btypes3(val) {
                console.log(val);
                this.BtypeVal3 = val;
            },//单选
            //轮播图第五张
            BhandleSuccess4(file) {
                console.log(file.data.url);
                this.BmarqueeUrl4 = file.data.url;
                this.BfileList4 = [];
                let obj = {};
                obj.url = file.data.url;
                this.BfileList4.push(obj);
            },
            Btypes4(val) {
                console.log(val);
                this.BtypeVal4 = val;
            },//单选
        },
        mounted() {
            console.log('999999');
            let rows = this.$route.query.id;
            this.ruleForm1.name1 = rows.itemModuleName;
            this.ruleForm1.weight1 = rows.itemModuleSort;
            //单张图片回显
            let obj = {};
            obj.url = rows.itemModuleImageUrl;
            this.aditFileList1.push(obj);
            //轮播图回显
            for(let i=0;i<5;i++){
                this['BfileList' + i]=[];
                this['Bform'+i].types='';
                this['Bform'+i].aims='';
            }
            this.BmarqueeArr=[];
            let arr = rows.urls;
            let long=arr.length;
            if (long===0){
                return;
            }else{
                for (let key in arr){
                    console.log(arr[key].imageUrl);
                    this['BfileList'+key].push({url:arr[key].imageUrl});
                    this['Bform'+key].types = arr[key].type.toString();
                    this['Bform'+key].aims = arr[key].typeId;
                }
            }
        },
    }
</script>

<style scoped>
    .fengefu{
        color: lightsteelblue;
    }
    .main {
        height: 570px;
        overflow: scroll;
    }

    .ws {
        width: 300px;
    }
    .redP{
        color: red;
        margin-left: 25px;
    }
.upload-demo{
    width: 300px;
}
</style>
