<template>
    <!--发布2-->
    <div class="publish2">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <el-form-item label="所属模块">
                <div class="module">
                    <el-input
                            class="inputtree"
                            placeholder="模块关键字搜索"
                            v-model="filterText">
                    </el-input>
                    <el-tree
                            class="filter-tree tree"
                            :filter-node-method="filterNode"
                            accordion
                            @check-change="checkChange"
                            ref="tree"
                            :data="data2"
                            show-checkbox
                            node-key="id"
                            :props="defaultProps">
                    </el-tree>
                </div>
            </el-form-item>
            <el-form-item label="商品属性" v-show="propShow">
                <div id="shuxing">
                    <div v-for="item,index in items">
                        <span>属性名: <span class="shuxingming"
                                         @click="deleteAttibute(index)">{{item.attributeName}}</span></span>
                        <br>
                        <!--//添加属性值-->
                        属性值:
                        <el-button class="tags" v-for="tag,indexs in item.attributeValue">{{tag}}
                        </el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="商品图片">
                <div>
                    <p class="redP">请上传1至5张图片 , 图片大小为00*00px(必选)</p>
                    <ul class="ulPics">
                        <li class="liPics">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="handleSuccess0"
                                    :show-file-list="false"
                            >
                                <img  :src="arr[0]" class="avatar">
                            </el-upload>
                        </li>
                        <li class="liPics">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="handleSuccess1"
                                    :show-file-list="false"
                            >
                                <img  :src="arr[1]" class="avatar">
                            </el-upload>
                        </li>
                        <li class="liPics">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="handleSuccess2"
                                    :show-file-list="false"
                            >
                                <img  :src="arr[2]" class="avatar">
                            </el-upload>
                        </li>
                        <li class="liPics">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="handleSuccess3"
                                    :show-file-list="false"
                            >
                                <img  :src="arr[3]" class="avatar">
                            </el-upload>
                        </li>
                        <li class="liPics">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="handleSuccess4"
                                    :show-file-list="false"
                            >
                                <img  :src="arr[4]" class="avatar">
                            </el-upload>
                        </li>
                    </ul>
                </div>
                <!--<el-upload-->
                        <!--style="width: 100px"-->
                        <!--class="upload-demo"-->
                        <!--:action="urls"-->
                        <!--:on-success="onSuccess"-->
                        <!--:before-upload="beforeUpload"-->
                        <!--:on-remove="handleRemove"-->
                        <!--:file-list="fileList"-->
                        <!--list-type="picture">-->
                    <!--<el-button size="small" type="primary">点击上传</el-button>-->
                    <!--<div slot="tip" class="el-upload__tip redP">最多上传5张图片</div>-->
                <!--</el-upload>-->
            </el-form-item>
            <!--穿梭框-->
            <el-form-item label="热门标签" prop="hotLabel">
                <el-transfer
                        filterable
                        :titles="['全部', '已选']"
                        filter-placeholder="搜索"
                        @change="handleChange"
                        v-model="labelValue"
                        :data="data">
                </el-transfer>
            </el-form-item>
            <div class="mm">
                <el-form-item label="发货仓" prop="supplier">
                    <el-input v-model="form.supplier"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="commodityName">
                    <el-input v-model="form.commodityName"></el-input>
                </el-form-item>
                <el-form-item label="spu编码">
                    <el-input v-model="form.spuCode" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商品标题" prop="commodityTitle">
                    <el-input v-model="form.commodityTitle"></el-input>
                </el-form-item>
            </div>
            <div class="mm">
                <!--<el-form-item label="商品分类">-->
                    <!--<el-cascader-->
                            <!--style="width: 300px"-->
                            <!--placeholder="请输入商品分类"-->
                            <!--:options="commodityClassOptions"-->
                            <!--filterable-->
                            <!--clearable-->
                            <!--@active-item-change="handleItemChange"-->
                            <!--@change="finalChoose"-->
                            <!--change-on-select-->
                            <!--v-model="form.commodityClassValue"-->
                            <!--:props="defaultProps2"-->
                    <!--&gt;</el-cascader>-->
                <!--</el-form-item>-->
                <el-form-item label="所属品牌" prop="selectedOptions1">
                    <el-cascader
                            :options="options1"
                            v-model="form.selectedOptions1"
                            filterable
                            clearable
                            @change="handleChange1">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="源产地" prop="selectedOptions2">
                    <el-cascader
                            :options="options2"
                            v-model="form.selectedOptions2"
                            filterable
                            clearable
                            @change="handleChange2">
                    </el-cascader>
                </el-form-item>
                <!--<el-form-item label="税率" prop="rate">-->
                    <!--<el-input v-model="form.rate"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="权重">
                    <el-input type="text" v-model="form.weight" class="inputs"></el-input>
                </el-form-item>
            </div>
            <div class="mm">
                <el-form-item label="是否交税" prop="whetherRate">
                    <el-select v-model="form.whetherRate" placeholder="请选择">
                        <el-option label="否" value="0"></el-option>
                        <el-option label="包税" value="1"></el-option>
                        <el-option label="保税" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发布渠道" prop="publishMotheds">
                    <el-select v-model="form.publishMotheds" placeholder="请选择">
                        <el-option label="所有" value="ALL"></el-option>
                        <el-option label="web" value="WEB"></el-option>
                        <el-option label="app" value="APP"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="能否搜索" prop="search">
                    <el-select v-model="form.search" placeholder="请选择" @change="search">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否赠品" prop="gifts">
                    <el-select v-model="form.gifts" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="mm">
                <el-form-item label="上架时间" prop="value1">
                    <el-date-picker
                            @change="upTime"
                            v-model="form.value1"
                            type="datetime"
                            placeholder="请选择上架时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="下架时间" prop="value2">
                    <el-date-picker
                            @change="downTime"
                            v-model="form.value2"
                            type="datetime"
                            placeholder="请选择下架时间">
                    </el-date-picker>
                </el-form-item>
                <!--<el-form-item label="最小购买量" prop="minPurchaseAmount">-->
                    <!--<el-input type="text" v-model="form.minPurchaseAmount"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="最大购买量" prop="maxPurchaseAmount">-->
                    <!--<el-input type="text" v-model="form.maxPurchaseAmount"></el-input>-->
                <!--</el-form-item>-->
            </div>
            <div style="width: 40%">
                <el-form-item label="商品简介">
                    <el-input type="textarea" v-model="form.commodityShort"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="商品详情" prop="content2">
                <vue-editor
                        useCustomImageHandler
                        @imageAdded="handleImageAdded" v-model="form.content2" id="content2">
                </vue-editor>
            </el-form-item>
            <!--<el-form-item label="商品头部描述">-->
                <!--<vue-editor-->
                        <!--useCustomImageHandler-->
                        <!--@imageAdded="handleImageAdded" v-model="content1" id="content1">-->
                <!--</vue-editor>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="商品尾部描述">-->
                <!--<vue-editor-->
                        <!--useCustomImageHandler-->
                        <!--@imageAdded="handleImageAdded" v-model="content3" id="content3">-->
                <!--</vue-editor>-->
            <!--</el-form-item>-->
            <el-form-item style="text-align: center">
                <el-button type="primary" @click="onSubmit('form')">{{baocun}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {VueEditor} from 'vue2-editor'
    import axios from 'axios'

    export default {
        components: {
            VueEditor
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },//所属模块监听
        data() {
            return {
                arr:["http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png","http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png"],//商品图片
                propShow:'',//商品属性显示
                spuid: '',
//                urls: 'http://47.96.154.252:8088/Image/upload_image/productImage',//上传图片路径
                //所属模块
                filterText: '',
                data2: [],
                data1: [],
                defaultProps: {
                    id: 'id',
                    label: 'label',
                    children: 'children',
                },
                setArr: [],//模块回显数组接收
                content1: '',//富文本\
                content3: '',
                //总form
                form: {
                    value1: '',//上架时间
                    value2: '',//下架时间
                    content2: '',
                    rate:'',
                    selectedOptions2:[],
                    commodityClassValue: [],
                    supplier: '',
                    modules: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    whetherRate: '',
                    minPurchaseAmount: '',
                    maxPurchaseAmount: '',
                    publishMotheds: '',
                    search: '',
                    gifts: '',
                    selectedOptions1: [],
                },
                rules: {
                    value1: [
                        {required: true, message: '请输入上架时间', trigger: 'change'},
                    ],
                    value2: [
                        {required: true, message: '请输入下架时间', trigger: 'change'},
                    ],
                    content2: [
                        {required: true, message: '请输入商品详情', trigger: 'blur'},
                    ],
                    rate: [
                        {required: true, message: '请输入税率', trigger: 'blur'},
                    ],
                    minPurchaseAmount: [
                        {required: true, message: '请输入最小购买量', trigger: 'blur'},
                    ],
                    maxPurchaseAmount: [
                        {required: true, message: '请输入最大购买量', trigger: 'blur'},
                    ],
                    supplier: [
                        {required: true, message: '请输入发货仓', trigger: 'blur'},
                    ],
                    whetherRate: [
                        {required: true, message: '请选择是否交税', trigger: 'change'},
                    ],
                    publishMotheds: [
                        {required: true, message: '请选择发布渠道', trigger: 'change'},
                    ],
                    search: [
                        {required: true, message: '请选择能否搜索', trigger: 'change'},
                    ],
                    gifts: [
                        {required: true, message: '请选择是否赠品', trigger: 'change'},
                    ],
                    commodityClassValue:[
                { type: 'array', required: true, message: '请选择商品分类', trigger: 'change' }
            ],
                    selectedOptions1:[
                        { type: 'array', required: true, message: '请选择所属品牌', trigger: 'blur' }
                    ],
                    commodityName: [
                {required: true, message: '请输入商品名称', trigger: 'blur'},
            ],
                    commodityTitle: [
                        {required: true, message: '请输入商品标题', trigger: 'blur'},
                    ],
                    selectedOptions2:[
                        { type: 'array', required: true, message: '请选择源产地', trigger: 'blur' }
                    ],
                },
                //添加模块
                addModuleForm: {
                    firstModule: '',
                    secondModule: '',
                },
                //所属商品
                clearable: true,//下拉框选择之后清空
                options1: [],
                options2: [],//原产地
                labelValue: [],//穿梭框Number
                value: '',//穿梭框
                data: [],//穿梭框
                handleArr: [],//穿梭框
                handleArrStr: '',
                commodityClassOptions: [],//商品分类
                clearable: true,
                defaultProps2: {
                    value: 'categoryId',
                    label: 'categoryName',
                    children: 'categoryChild'
                },
                categoryId: '',
                spuId: '',//商品id
                uptime: '',//上架时间
                downtime: '',//下架时间
                runUrlStr: '',//上传图片str
                brandId: '',//品牌id
                countryName: '',
                productId: '',
                skucode: '',
                //-->属性部分start
                newObj: {
                    attributeName: '',
                    attributeValue: [],
                },
                visible2: false,
                index: Number,
                shuxingzhi: '',
                isShowInput: false,
                formLabelWidth: '120px',
                addAttributeValueInput: '',
                attributeForm: {
                    attributeName: '',
                    attributeValue: '',
                },
                items: [],
                //<--属性end
                //图片
                fileList: [],
                imagesUrls: [],//从后台接受
                Arr: [],
                selectspucode: '',//查询spu路由
                code: '',//接收spucode
                baocun: '',
                warehousecode: '',
            }
        },
        methods: {
            //能否搜索
            search(val){
                console.log(val);
                console.log(this.form.search);
            },
            //商品图片
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
            onSubmit(form) {
                console.log(this.form.value1);
                console.log(this.form.value2);
                let flag  = 0;
                //商品图片
                let newArr=[];
                for(let i=0;i<5;i++){
                    if(this.arr[i]!='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'){
                        newArr.push(this.arr[i]);
                        console.log(newArr);
                    }else{
                        flag++;
                    }
                }
                //当查询spu时
                if(flag==5){
                    this.$message({
                        type:'warning',
                        message:'请选择图片!',
                    })
                }else{
                    this.$refs[form].validate((valid) => {
                        if (valid) {
                            if (this.$route.query.spuKode == undefined) {
//                                window.history.forward(1);
                                this.$router.push({path: '/inquirySpu', query: {}});
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                })
                            } else if (this.$route.query.selectspucode == undefined) {
                                //当同步商品库时
                                this.$router.push({
                                    path: '/publish1',
                                    query: {
                                        productId: this.productId,
                                        spuCode: this.form.spuCode,
                                        commodityName: this.form.commodityName,
                                        pics: this.runUrlStr,
                                        skucode: this.skucode
                                    }
                                });
                            }
                            //属性
                            let obj = {};//格式转化
                            for (let key in this.items) {
                                obj[this.items[key].attributeName] = this.items[key].attributeValue;
                            }
                            if(this.downtime==undefined){
                                this.downtime='';
                            }else{
                                this.$http.post(this.url + '/spuManage/update_spu', {
                                    spuStatus: 1,
                                    spuId: this.spuid,
                                    spucode: this.code,
                                    spuname: this.form.commodityName,
                                    warehouseCode: this.warehousecode,
                                    propertys: JSON.stringify(obj),//属性
                                    spuTitle: this.form.commodityTitle,
                                    imagesUrls:newArr.join(','),//图片
                                    spuSimpleDesc: this.form.commodityShort,
                                    spuDesc: this.form.content2,
                                    brandId: this.brandId,
                                    upDesc: this.content1,
                                    downDesc: this.content3,
                                    categoryId: this.spuId,//分类
                                    listStartTime: this.form.value1,
                                    listStopTime: this.form.value2,
                                    countryName: this.countryName,
                                    minPurchase: this.form.minPurchaseAmount,
                                    maxPurchase: this.form.maxPurchaseAmount,
                                    isGift: this.form.gifts,
                                    salesChannel: this.form.publishMotheds,
                                    spuWeight: this.form.weight,
                                    isSearch: this.form.search,
                                    itemoduleIds: this.$refs.tree.getCheckedKeys().join(','),//模块
                                    tagIds: this.handleArrStr,//标签
                                    ferme: this.form.whetherRate,
                                }, {emulateJSON: true}).then(function (res) {
                                    console.log(res);
                                },function (err) {
                                    this.$message({
                                        type:'error',
                                        message:'服务器连接中断,请联系后台人员!',
                                    });
                                });
                            }
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
            },
            //删除属性
            deleteAttibute(index) {
                console.log(index);
                this.$confirm('确定删除该属性吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.items.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //所属模块1
            checkChange(a, b, c) {
//                console.log(this.$refs.tree.getCheckedKeys());
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //添加模块所属
            addModule() {
            },
            //添加模块-确定按钮
            sure1() {
            },
            //所属商品
            handleChange1(val) {
                this.brandId = val[0];
                console.log(val);
            },
            handleChange2(val) {
                this.countryName = val[0];
                console.log(val);
            },
            upTime(val) {
                this.form.value1 = val;
                console.log(val);
            },//上架时间
            downTime(val) {
                this.form.value2 = val;
                console.log(val);
            },//下架时间
            //穿梭框
            handleChange(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
                this.handleArr = value;
                this.handleArrStr = this.handleArr.join(',');
            },
            //商品分类
            handleItemChange(val) {
                console.log(val);
            },
            finalChoose(val) {
                this.spuId = val[val.length - 1];
                console.log(val[val.length - 1]);

            },
            //富文本
            handleImageAdded: function (file, Editor, cursorLocation) {
                var formData = new FormData();
                formData.append('file', file)
                axios({
                    url: this.urls+'productImage',
                    method: 'POST',
                    data: formData
                })
                    .then((result) => {
                        console.log(result, this.content1);
                        let url = result.data.data.url;
                        Editor.insertEmbed(cursorLocation, 'image', url);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            //事件戳转换
            add0(m) {
                return m < 10 ? '0' + m : m
            },
            formatDate(timestamp) {
                //timestamp是整数，否则要parseInt转换
                var time = new Date(timestamp);
                var y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
            },
        },
        created() {
//            //查询商品分类
//            this.$http.post(this.url + '/category/all_category', {}, {emulateJSON: true}).then(function (res) {
//                console.log(res);
//                this.commodityClassOptions = res.data.data;
//            },function (err) {
//                this.$message({
//                    type:'error',
//                    message:'服务器连接中断,请联系后台人员!',
//                });
//            });
            //查询所有
            this.form.spuCode = this.$route.query.spuKode;//同步商品库路由
            this.productId = this.$route.query.productId;
            this.selectspucode = this.$route.query.selectspucode;//查询spu路由
            //判断是从哪个页面路由过来的
            if (this.form.spuCode == undefined) {
                //查询spu路由
                this.code = this.selectspucode;
                this.baocun = "保存";
            }
            if (this.selectspucode == undefined) {
                //同步商品库路由
                this.code = this.form.spuCode;
                this.baocun = "保存并下一步";
                this.skucode = this.$route.query.skucode;
            }
            this.$http.post(this.url + '/spuManage/select_spu', {spucode: this.code}, {emulateJSON: true}).then(function (res) {
                console.log(res);
                if(res.data.data.category==null){
                    this.form.commodityClassValue=[];
                    console.log(88);
                }else{
                    let a = res.data.data.category.categoryId;
                    let b = res.data.data.category.categoryChild[0].categoryId;
                    console.log(res.data.data.category.categoryChild);
                    console.log(b);
                    let c = res.data.data.categoryId;
                    this.form.commodityClassValue.push(a,b,c);
                    console.log(99);
                }
                //所属模块
                if (res.data.data.modules == null) {
                } else {;
                    for (let i = 0; i < res.data.data.modules.length; i++) {
                        for (let k = 0; k < res.data.data.modules[i].moduleChild.length; k++) {
                            this.setArr.push(res.data.data.modules[i].moduleChild[k].itemModuleId);
                        }
                    }
                    this.$refs.tree.setCheckedKeys(this.setArr);
                }
                //发货仓
                if (res.data.data.warehouse == null) {
                    this.form.supplier = '';
                } else {
                    this.form.supplier = res.data.data.warehouse.warehouseName;
                }
                this.spuid = res.data.data.spuId;
                //图片
                if (res.data.data.imageUrlsToWeb == null) {
                } else {
                    for (let i = 0; i < res.data.data.imageUrlsToWeb.length; i++) {
                        this.$set(this.arr,i,res.data.data.imageUrlsToWeb[i])
                    }
                }
                this.warehousecode = res.data.data.warehouseCode;
                this.form.spuCode = this.code;
                this.form.commodityName = res.data.data.spuname;
                this.form.weight = res.data.data.spuWeight;
                this.form.rate = res.data.data.rate;
                this.form.commodityShort = res.data.data.spuSimpleDesc;
                if(res.data.data.minPurchase==''||res.data.data.minPurchase==null){
                    this.form.minPurchaseAmount = '';
                }else{
                    this.form.minPurchaseAmount = res.data.data.minPurchase.toString();
                }
                if(res.data.data.maxPurchase==''||res.data.data.maxPurchase==null){
                    this.form.maxPurchaseAmount = '';
                }else{
                    this.form.maxPurchaseAmount = res.data.data.maxPurchase.toString();

                }
                this.form.commodityTitle = res.data.data.spuTitle;
                if(res.data.data.listStartTime==''||res.data.data.listStartTime==null){
                    this.form.value1 = '';
                }else{
                    this.form.value1 = this.formatDate(res.data.data.listStartTime);
                }
                if(res.data.data.listStopTime==''||res.data.data.listStopTime==null){
                    this.form.value2 = '';
                }else{
                    this.form.value2 = this.formatDate(res.data.data.listStopTime);
                }
                this.form.value2 = this.formatDate(res.data.data.listStopTime);
                this.form.publishMotheds = res.data.data.salesChannel;
                this.content1 = res.data.data.upDesc;
                this.form.content2 = res.data.data.spuDesc;
                this.content3 = res.data.data.downDesc;
                //能否搜索
                if (res.data.data.isSearch == null||res.data.data.isSearch == '') {
                    this.form.search = '1';//默认能搜索
                } else {
                    this.form.search=res.data.data.isSearch.toString();
                }
                if (res.data.data.isGift == null) {
                    this.form.gifts = '';
                } else {
                    this.form.gifts = res.data.data.isGift.toString();
                }
                ;//是否赠品
                if (res.data.data.ferme == null||res.data.data.ferme == '') {
                    this.form.whetherRate = '0';//默认否
                } else {
                    this.form.whetherRate = res.data.data.ferme.toString();
                }
                ;//是否交税
                if (res.data.data.tagIds == null||res.data.data.tagIds == '') {
                    this.labelValue = [];
                } else {
                    this.labelValue = res.data.data.tagIds;
                }
                ;//热门标签
                if (res.data.data.brandId == null||res.data.data.brandId == '') {
                    this.form.selectedOptions1 = [];
                } else {
                    this.form.selectedOptions1.push(res.data.data.brandId.toString());
                }
                ;//品牌
                if (res.data.data.countryName == null||res.data.data.countryName == '') {
                    this.form.selectedOptions2 = [];
                } else {
                    this.form.selectedOptions2=[];
                    this.form.selectedOptions2.push(res.data.data.countryName.toString());
                }
            },function (err) {
                this.$message({
                    type:'error',
                    message:'服务器连接中断,请联系后台人员!',
                });
            });
        },
        mounted() {
            //查询所有品牌
            this.$http.post(this.url + '/brand/selectAll_brand', {}, {emulateJSON: true}).then(function (res) {
//                console.log(res.data.data);
                for (let i = 0; i < res.data.data.length; i++) {
                    let obj = {
                        value: '',
                        label: ''
                    }
                    obj.value = res.data.data[i].brandId.toString();
                    obj.label = res.data.data[i].brandName;
                    this.options1.push(obj);
                }
            },function (err) {
                this.$message({
                    type:'error',
                    message:'服务器连接中断,请联系后台人员!',
                });
            });
            //查询热门品牌(穿梭框)
            this.$http.post(this.url + '/tag/queryAll_tag', {}, {emulateJSON: true}).then(function (res) {
                console.log(res.data.data);
                let temp = res.data.data;
                console.log(temp);
                this.data = [];
                if(res.data.data==null){

                }else{
                    temp.forEach((item, index) => {
                        this.data.push({
                            label: item.tagName,
                            key: item.tagId,
                        });
                    });
                }
            },function (err) {
                this.$message({
                    type:'error',
                    message:'服务器连接中断,请联系后台人员!',
                });
            });

            //查询所属模块
            this.$http.post(this.url + '/itemModule/itemModuleAndChild', {}, {emulateJSON: true}).then(function (res) {
                console.log(res);
                for (let i = 0; i < res.data.data.length; i++) {
                    let obj = {id: Number, label: '', children: []};
                    obj.id = res.data.data[i].itemModuleId;
                    obj.label = res.data.data[i].itemModuleName;
                    for (let k = 0; k < res.data.data[i].moduleChild.length; k++) {
                        let obj2 = {};
                        obj2.id = res.data.data[i].moduleChild[k].itemModuleId;
                        obj2.label = res.data.data[i].moduleChild[k].itemModuleName;
                        obj.children.push(obj2);
                    }
                    this.data1.push(obj);
                }
                this.data2 = this.data1;
            },function (err) {
                this.$message({
                    type:'error',
                    message:'服务器连接中断,请联系后台人员!',
                });
            });
            //查询原产地
            this.$http.post(this.url + '/originCountry/all_originCountry', {}, {emulateJSON: true}).then(function (res) {
                console.log(res);
                for (let i = 0; i < res.data.data.length; i++) {
                    let obj = {
                        value: '',
                        label: ''
                    }
                    obj.value = res.data.data[i].countryName.toString();
                    obj.label = res.data.data[i].countryName;
                    this.options2.push(obj);
                }

            },function (err) {
                this.$message({
                    type:'error',
                    message:'服务器连接中断,请联系后台人员!',
                });
            });
            //查询属性
            this.$http.post(this.url + '/spuManage/select_spu_bySpucode', {spucode: this.code}, {emulateJSON: true}).then(function (res) {
                    this.propShow=true;
                    let jsObj = res.data.data.prop;
                    console.log(JSON.stringify(jsObj));
                    for (let key in jsObj) {
                        this.newObj = {};
                        this.newObj.attributeName = key;
                        this.newObj.attributeValue = jsObj[key];
                        this.items.push(this.newObj);
                    }
            },function (err) {
                this.$message({
                    type:'error',
                    message:'服务器连接中断,请联系后台人员!',
                });
            });
        },
    }
</script>

<style scoped>
    .shuxingming {
        cursor: pointer;
        color: blue;
        font-size: 18px;
    }

    .my {
        margin-top: 8px;
    }

    .publish1 {
        max-height: 560px;
        overflow: auto;
    }

    .time, .purchase-amount, .price, .origin-price, .whether, .rate, .mm {
        display: flex;
    }

    .inputs {
        width: 200px;
    }

    .selects {
        margin-bottom: 15px;
    }

    .aaa {
        margin-bottom: 15px;
    }

    .publish2 {
        /*max-height: 560px;*/
        /*overflow: auto;*/
    }

    .button-new0-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .module {
        width: 200px;
    }
    .redP{
        color: red;
    }
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
    .tree{
        display: none;
    }
    .module:hover .tree{
        display: block;
    }
</style>