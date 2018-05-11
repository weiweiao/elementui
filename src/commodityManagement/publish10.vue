<template>
    <!--编辑上下架-->
    <div class="publish10">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <!--显示的属性名和属性值-->
            <el-form-item label="商品属性">
                <div id="shuxing">
                    <div v-for="item,index in items">
                        <span>属性名:<span class="shuxingming" @click="propName(index)">{{item.propName}}</span></span>
                        <el-dialog
                                title="修改属性名"
                                :visible.sync="valueDialogVisible1"
                                width="30%"
                        >
                            <el-input v-model="shuxingming"></el-input>
                            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="sure2(index)">确 定</el-button>
  </span>
                        </el-dialog>
                        <br>
                        <!--//添加属性值-->
                        <div>
                            属性值:
                            <el-button class="tags" v-for="tag,indexs in item.propValue"
                                       @click="shanchuzhi(index,indexs)">{{tag}}
                            </el-button>
                            <el-dialog
                                    title="修改属性值"
                                    :visible.sync="valueDialogVisible"
                            >
                                <el-input v-model="shuxingzhi"></el-input>
                                <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="sure">确 定</el-button>
                        </span>
                            </el-dialog>
                            <el-button class="attributeValue" @click="removeNV(index)">删除该属性</el-button>
                        </div>
                    </div>
                    <el-button @click="addAttribute">添加属性</el-button>
                    <el-dialog title="添加属性" :visible.sync="addAttributeVisible">
                        <el-form :model="attributeForm" ref="attributeForm" :rules="attributeRules">
                            <el-form-item label="属性名" :label-width="formLabelWidth" prop="propName"
                                          style="margin-bottom: 18px">
                                <el-input v-model="attributeForm.propName" auto-complete="off"
                                          style="width: 300px"></el-input>
                            </el-form-item>
                            <el-form-item label="属性值" :label-width="formLabelWidth" prop="propValue">
                                <el-input v-model="attributeForm.propValue" auto-complete="off"
                                          style="width: 300px;"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="addAttributeSure('attributeForm')">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-form-item>
            <el-form-item label="本商品图片">
                <p class="redP">图片尺寸大小为00*00px</p>
                <el-upload
                        class="upload-demo"
                        :action="urls+'productImage'"
                        :on-success="handleSuccess"
                        :show-file-list="false"
                >
                    <img :src="imageUrl" style="width: 100px;height: 100px;">

                </el-upload>
            </el-form-item>
            <div class="haha">
                <el-form-item label="是否组套" prop="zutao">
                    <el-select v-model="form.zutao" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否虚拟组套" prop="zutaoCommodity" label-width="120px">
                    <el-select v-model="form.zutaoCommodity" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="11是否支持退款" prop="refound" label-width="120px">
                    <el-select v-model="form.refound" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否包邮" prop="baoyou" label-width="120px">
                    <el-select v-model="form.baoyou" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="返利等级" prop="value">
                    <el-select v-model="form.value" clearable placeholder="请选择返利级别" @change="changeF">
                        <el-option
                                v-for="item in optionsF"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="税率" prop="rate">-->
                <!--<el-input v-model="form.rate"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="包装规格">-->
                <!--<el-select v-model="form.packType" placeholder="请选择">-->
                <!--<el-option label="个" value="EA"></el-option>-->
                <!--<el-option label="双" value="PA"></el-option>-->
                <!--<el-option label="盒" value="BOX"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
            </div>
            <!--<div class="haha">-->
            <!--<el-form-item label="单品重量单位">-->
            <!--<el-select v-model="form.weightUnit" placeholder="请选择">-->
            <!--<el-option label="千克" value="kg"></el-option>-->
            <!--<el-option label="克" value="g"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="单品体积单位">-->
            <!--<el-select v-model="form.volumeUnit" placeholder="请选择">-->
            <!--<el-option label="立方米" value="m3"></el-option>-->
            <!--<el-option label="立方厘米" value="cm3"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="单品长度单位">-->
            <!--<el-select v-model="form.lengthUnit" placeholder="请选择">-->
            <!--<el-option label="米" value="m"></el-option>-->
            <!--<el-option label="厘米" value="cm"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--</div>-->
            <!--<div class="haha">-->
            <!--<el-form-item label="箱重量单位">-->
            <!--<el-select v-model="form.boxWeightUnit" placeholder="请选择">-->
            <!--<el-option label="千克" value="kg"></el-option>-->
            <!--<el-option label="克" value="g"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="箱体积单位">-->
            <!--<el-select v-model="form.boxVolumnUnit" placeholder="请选择">-->
            <!--<el-option label="立方米" value="m3"></el-option>-->
            <!--<el-option label="立方厘米" value="cm3"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="箱长度单位">-->
            <!--<el-select v-model="form.boxLengthUnit" placeholder="请选择">-->
            <!--<el-option label="米" value="m"></el-option>-->
            <!--<el-option label="厘米" value="cm"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--</div>-->
            <div class="haha">
                <el-form-item label="商品名称" prop="commodityName">
                    <el-input v-model="form.commodityName" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="规格名称" prop="ruleName">
                    <el-input v-model="form.ruleName" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="spucode" prop="spuCode">
                    <el-input v-model="form.spuCode" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="skucode" prop="skuCode">
                    <el-input v-model="form.skuCode" :disabled="true"></el-input>
                </el-form-item>
            </div>
            <div class="haha">
                <el-form-item label="商家编码" prop="shoperCode">
                    <el-input v-model="form.shoperCode" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="店铺编码" prop="shopCode">
                    <el-input v-model="form.shopCode" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="仓库编码" prop="warehouseCode">
                    <el-input v-model="form.warehouseCode" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="标准批发价" prop="standardWholesalePrice">
                    <el-input v-model="form.standardWholesalePrice" :disabled="true"></el-input>
                </el-form-item>
            </div>
            <div class="haha">
                <el-form-item label="商城价格" prop="mallPrice">
                    <el-input v-model="form.mallPrice"></el-input>
                </el-form-item>
                <el-form-item label="原价" prop="originPrice">
                    <el-input type="text" v-model="form.originPrice"></el-input>
                </el-form-item>
                <el-form-item label="批发价格">
                    <el-input v-model="form.wholesalePrices"></el-input>
                </el-form-item>
                <el-form-item label="库存" prop="stock">
                    <el-input v-model="form.stock" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="锁定库存">
                    <el-input v-model="form.lockedStock"></el-input>
                </el-form-item>
            </div>
            <!--<div class="haha">-->
            <!--<el-form-item label="箱换算数量">-->
            <!--<el-input type="text" v-model="form.exchangeNumber"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="箱净重">-->
            <!--<el-input type="text" v-model="form.boxNewWeight"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="箱毛重">-->
            <!--<el-input type="text" v-model="form.boxGrossWeight"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="箱体积">-->
            <!--<el-input type="text" v-model="form.boxVolumn"></el-input>-->
            <!--</el-form-item>-->
            <!--</div>-->

            <div class="haha">
                <!--<el-form-item label="单品净重">-->
                <!--<el-input type="text" v-model="form.newWeight"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="单品毛重">-->
                <!--<el-input type="text" v-model="form.grossWeight"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="单品体积">-->
                <!--<el-input type="text" v-model="form.volume"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="不可用库存" prop="discardStock">
                    <el-input type="text" v-model="form.discardStock" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="最小购买量" prop="minPurchaseAmount">
                    <el-input type="text" v-model="form.minPurchaseAmount"></el-input>
                </el-form-item>
                <el-form-item label="最大购买量" prop="maxPurchaseAmount">
                    <el-input type="text" v-model="form.maxPurchaseAmount"></el-input>
                </el-form-item>
                <!--</div>-->
                <!--<div class="haha">-->
                <!--<el-form-item label="单品长">-->
                <!--<el-input type="text" v-model="form.lengths"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="单品宽">-->
                <!--<el-input type="text" v-model="form.width"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="单品高">-->
                <!--<el-input type="text" v-model="form.height"></el-input>-->
                <!--</el-form-item>-->
            </div>

            <!--<div class="haha">-->
            <!--<el-form-item label="箱长">-->
            <!--<el-input type="text" v-model="form.boxLength"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="箱宽">-->
            <!--<el-input type="text" v-model="form.boxWeight"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="箱高">-->
            <!--<el-input type="text" v-model="form.boxHeight"></el-input>-->
            <!--</el-form-item>-->
            <!--</div>-->
            <el-form-item style="text-align: center">
                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                obj1: {},//存储第一次查询数据
                imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',//默认上传图片
                clearable: true,//返利下拉框选择之后清空
                optionsF: [],//返利
//                value:'',
                characteristicName: '',
                characteristicValue: [],
                isSeen: false,
                items: [],
                suoyoushuxing: '',
//                urls: 'http://47.96.154.252:8088/Image/upload_image/productImage',//上传图片路径
                form: {
                    minPurchaseAmount:'',
                    maxPurchaseAmount:'',
                    value: '',
                    discardStock: '',
                    warehouseCode: '',
                    spuCode: '',
                    skuCode: '',
                    ruleName: '',
                    characteristic: '',
                    commodityName: '',
                    standardWholesalePrice: '',
                    zutao: '',
                    zutaoCommodity: '',
                    shoperCode: '',
                    shopCode: '',
                    rate: '',
                    mallPrice: '',
                    wholesalePrices: '',
                    stock: '',
                    lockedStock: '',
                    packType: '',
                    refound: '',
                    baoyou: '',
                    newWeight: '',
                    grossWeight: '',
                    volume: '',
                    lengths: '',
                    width: '',
                    height: '',
                    weightUnit: '',
                    volumeUnit: '',
                    lengthUnit: '',
                    exchangeNumber: '',
                    boxNewWeight: '',
                    boxGrossWeight: '',
                    boxVolumn: '',
                    boxLength: '',
                    boxWeight: '',
                    boxHeight: '',
                    boxWeightUnit: '',
                    boxVolumnUnit: '',
                    boxLengthUnit: '',
                    originPrice: ''
                },
                rules: {
                    minPurchaseAmount:[{required: true, message: '请填写最小购买量', trigger: 'blur'},],
                    maxPurchaseAmount:[{required: true, message: '请填写最大购买量', trigger: 'blur'},],
                    baoyou: [{required: true, message: '请选择是否包邮', trigger: 'blur'},],
                    zutao: [{required: true, message: '请选择是否组套', trigger: 'blur'},],
                    zutaoCommodity: [{required: true, message: '请选择是否虚拟组套', trigger: 'blur'},],
                    refound: [{required: true, message: '请选择是否退款', trigger: 'blur'},],
                    rate: [{required: true, message: '请填写税率', trigger: 'blur'},],
                    commodityName: [{required: true, message: '请填写商品名称', trigger: 'blur'},],
                    ruleName: [{required: true, message: '请填写规格名称', trigger: 'blur'},],
                    mallPrice: [{required: true, message: '请填写商城价格', trigger: 'blur'},],
                    originPrice: [{required: true, message: '请填写原价', trigger: 'blur'},],
                    wholesalePrices: [{required: true, message: '请填写批发价格', trigger: 'blur'},],
                    lockedStock: [{required: true, message: '请填写锁定库存', trigger: 'blur'},],
                    value: [{required: true, message: '请选择返利等级', trigger: 'change'},],
                },
                formLabelWidth: '120px',
                dialogFormVisible1: false,//添加模块所属
                fileList: [],//{}加上会有空框
                data: [],
                //添加模块
                addModuleForm: {
                    firstModule: '',
                    secondModule: '',
                },
                picsUrl: '',//图片
                productId: '',
                //属性new
                //-->属性部分start
                newObj: {
                    propName: '',
                    propValue: '',
                },
                visible2: false,
                index: Number,
                shuxingzhi: '',
                shuxingming: '',//修改属性名
                valueDialogVisible: false,//修改属性值
                valueDialogVisible1: false,//修改属性名
                isShowInput: false,
                formLabelWidth: '120px',
                addAttributeVisible: false,
                addAttributeValueInput: '',
                attributeForm: {
                    propName: '',
                    propValue: '',
                },
                attributeRules: {
                    propName: [{required: true, message: '请输入属性名', trigger: 'blur'},],
                    propValue: [{required: true, message: '请输入属性值', trigger: 'blur'},],
                },
                items: [],
                //<--属性end
                index: Number,//属性名
            }
        },
        methods: {
            //属性部分
            addAttribute() {
                this.attributeForm.propName = '';
                this.attributeForm.propValue = '';
                this.addAttributeVisible = true;
            },
            addAttributeSure(attributeForm) {
                this.$refs[attributeForm].validate((valid) => {
                    if (valid) {
                        let obj = {
                            propName: '',
                            propValue: [],
                        };
                        obj.propName = this.attributeForm.propName;
                        obj.propValue.push(this.attributeForm.propValue);
                        this.items.push(obj);
                        this.addAttributeVisible = false;
                    } else {
                        return false;
                    }
                });
            },
//            修改属性值确定
            sure() {
                if (this.shuxingzhi == '' || this.shuxingzhi == undefined) {
                } else {
                    let arr = [];
                    arr.push(this.shuxingzhi);
                    this.items[this.index].propValue = arr;
                }
                this.valueDialogVisible = false;
            },
            //修改属性值
            shanchuzhi(index, indexs) {
                this.shuxingzhi = ''
                this.index = index;
                this.valueDialogVisible = true;
            },
            //修改属性名
            propName(index) {
                console.log(index);
                this.index = index;
                this.valueDialogVisible1 = true;
            },
            //修改属性名确定
            sure2(index) {
                console.log(index);
                if (this.shuxingming == '' || this.shuxingming == undefined) {

                } else {
                    this.items[this.index].propName = this.shuxingming;
                }
                this.valueDialogVisible1 = false;
            },
            //删除该项
            removeNV(index) {
                console.log(index);
                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.items.splice(index, 1);
                }).catch(() => {

                });
            },
            //返利
            changeF(val) {
                this.form.value = val;
                console.log(val);
            },
            //  获取选择的属性名对应属性值
            fuck(it, value1, key) {
                console.log(key)
                for (var i = 0; i < value1.length; i++) {
                    document.getElementById(value1[i]).className = 'liu_border_hei'
                }
                this.noindex = document.getElementById(it)
                this.noindex.className = 'liu_border_hong'
                this.nooindex = document.getElementById(key)
                this.nooindex.className = 'liu_border_honge'
            },
            //添加模块所属
            addModule() {
                this.dialogFormVisible1 = true;
            },
            //添加模块-确定按钮
            sure1() {
                this.dialogFormVisible1 = false;
            },
            handleSuccess(response, file, fileList) {
                this.imageUrl = response.data.url;
                console.log(response, file, fileList);
                this.fileList = [];//单张替换
                this.picsUrl = response.url;//传给后台url
                let obj = {};
                obj.url = response.data.url;
                this.fileList.push(obj);
            },
            handleRemove() {
            },
            onSubmit(form) {
                this.$refs[form].validate((valid) => {
                    let newarr = [];
                    for (let i = 0; i < this.items.length; i++) {
                        for (let k = 0; k < this.items[i].propValue.length; k++) {
                            let obj = {};
                            obj.propName = this.items[i].propName;
                            obj.propValue = this.items[i].propValue[k];
                            newarr.push(obj);
                        }
                    }
                    if (valid) {
                        if (this.imageUrl == 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png') {
                            this.$message({
                                type: 'warning',
                                message: '请选择图片!'
                            });
                        } else {
                            if (this.form.value == '' || this.form.value == undefined) {
                                this.$message({
                                    type: 'warning',
                                    message: '请选择返利等级!'
                                });
                            } else {
//                                   let obj2 = {skuPropertys:JSON.stringify(newarr),productImageUrl:this.imageUrl,isBom:this.form.zutao,isVirtualBom:this.form.zutaoCommodity,noRefund:this.form.refound,rebateId:this.form.value,rate:this.form.rate,productName:this.form.commodityName,skuname:this.form.ruleName,storePrice:this.form.mallPrice,oPrice:this.form.originPrice,tPrice:this.form.wholesalePrices,lockedStockNumber:this.form.lockedStock};
//                                   for(let key1 in this.obj1){
//                                       for(let key2 in obj2){
//                                           if(this.obj1[key1]==obj2[key2]){
//                                               delete obj2[key2]
//                                           }
//                                       }
//                                   }
//                                   console.log(obj2);
//                                   obj2["productStatus"] = 1;
//                                   obj2["productId"] = this.productId;
//                                   console.log(obj2);
                                this.$http.post(this.url + '/product/update_product',
//                                           obj2
                                    {
                                        minPurchase:this.form.minPurchaseAmount,
                                        maxPurchase:this.form.maxPurchaseAmount,
                                        productStatus: 1,
                                        productId: this.productId,
                                        warehouseCode: this.form.warehouseCode,
                                        spucode: this.form.spuCode,
                                        skucode: this.form.skuCode,
                                        skuname: this.form.ruleName,
                                        skuPropertys: JSON.stringify(newarr),
                                        productName: this.form.commodityName,
                                        listPrice: this.form.standardWholesalePrice,
                                        isBom: this.form.zutao,
                                        haveCarriage: this.form.baoyou,
                                        isVirtualBom: this.form.zutaoCommodity,
                                        sellerCode: this.form.shoperCode,
                                        storeCode: this.form.shopCode,
//                                       rate: this.form.rate,
                                        productImageUrl: this.imageUrl,
                                        storePrice: this.form.mallPrice,
                                        tPrice: this.form.wholesalePrices,
                                        stockNumber: this.form.stock,
                                        lockedStockNumber: this.form.lockedStock,
                                        rebateId: this.form.value,//返利
                                        discardStock: this.form.discardStock,//不可用库存
                                        packType: this.form.packType,
                                        noRefund: this.form.refound,
                                        eaNetWeight: this.form.newWeight,
                                        eaGrossWeight: this.form.grossWeight,
                                        eaVolume: this.form.volume,
                                        eaLength: this.form.lengths,
                                        eaWidth: this.form.width,
                                        eaHeight: this.form.height,
                                        eaWeightUm: this.form.weightUnit,
                                        eaVolumeUm: this.form.volumeUnit,
                                        eaDimensionUm: this.form.lengthUnit,
                                        csConversionQty: this.form.exchangeNumber,
                                        csNetWeight: this.form.boxNewWeight,
                                        csGrossWeight: this.form.boxGrossWeight,
                                        csVolume: this.form.boxVolumn,
                                        csLength: this.form.boxLength,
                                        oPrice: this.form.originPrice,//原价
                                    }
                                    ,
                                    {emulateJSON: true}).then(function (res) {
                                    console.log(res);
                                    if (res.data.status == 200) {
                                        this.$message({
                                            type: "success",
                                            message: "编辑成功!"
                                        });
                                        this.$router.push({path: "/commodity"});
                                    } else {
                                        this.$message({
                                            type: "error",
                                            message: res.data.msg,
                                        });
                                    }
                                });
                            }
                        }
                    } else {
                        return false;
                    }
                });
            },
        },
        created() {
            this.form.skuCode = this.$route.query.skucode;
            this.productId = this.$route.query.productId;
        },
        mounted() {
            //查询所有
            this.$http.post(this.url + '/product/select_productByIdOrSkucode', {skucode: this.form.skuCode}, {emulateJSON: true}).then(function (res) {
                console.log(res);
                //属性
                console.log(res.data.data.oSkuProertysMap);
                if (res.data.data.oSkuProertysMap == null) {
                    this.items = [];
                } else {
                    let jsObj = res.data.data.oSkuProertysMap;
                    console.log(JSON.stringify(jsObj));
                    for (let key in jsObj) {
                        console.log(jsObj[key]);
                        this.newObj = {};
                        this.newObj.propName = key;
                        this.newObj.propValue = jsObj[key];
                        let arr = [];
                        arr.push(jsObj[key])
                        this.newObj.propValue = arr;
                        console.log(this.newObj.propValue);
                        console.log(this.newObj);
                        this.items.push(this.newObj);
                    }
                }
                if (res.data.data.noRefund == null) {
                    this.form.refound = '';//退款
                } else {
                    this.form.refound = res.data.data.noRefund.toString();
                }
                if (res.data.data.haveCarriage == null) {
                    this.form.baoyou = '';//是否包邮
                } else {
                    this.form.baoyou = res.data.data.haveCarriage.toString();
                }
                if (res.data.data.rebateId == null) {
                    this.form.value = '';
                } else {
                    console.log(res.data.data.rebateId);
                    this.form.value = res.data.data.rebateId.toString();//返利
                }
                this.form.packType = res.data.data.packType//pack-type
                this.suoyoushuxing = res.data;//属性
                this.form.warehouseCode = res.data.data.warehouseCode;//warehouseCode
                if (res.data.data.productImageUrl == null) {
                    this.imageUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                } else {
                    this.imageUrl = res.data.data.productImageUrl;
                }
                let a = res.data.data.originalPrice / 100;
                this.form.originPrice = a.toString();//原价
                this.form.zutao = res.data.data.isBom.toString();//是否组套
                this.form.zutaoCommodity = res.data.data.isVirtualBom.toString();//是否虚拟组套
                this.form.weightUnit = res.data.data.eaWeightUm;//单品重量单位
                this.form.volumeUnit = res.data.data.eaVolumeUm;//单品体积单位
                this.form.lengthUnit = res.data.data.eaDimensionUm;//单品长度单位
                this.form.boxWeightUnit = res.data.data.csWeightUm;//箱重量单位
                this.form.boxVolumnUnit = res.data.data.csVolumeUm;//箱体积单位
                this.form.boxLengthUnit = res.data.data.csDimensionUm;//箱长度单位
                this.form.spuCode = res.data.data.spucode;//spucode
                this.form.skuCode = res.data.data.skucode;//skucode
                this.form.ruleName = res.data.data.skuname;//skuname
                this.form.commodityName = res.data.data.productName;//商品名称
                this.form.standardWholesalePrice = res.data.data.listPrice;//标准批发价
                this.form.shoperCode = res.data.data.sellerCode;//商家编码
                this.form.shopCode = res.data.data.storeCode;//店铺编码
                this.form.rate = res.data.data.rate.toString();//税率
                let b = res.data.data.price / 100;
                this.form.mallPrice = b.toString();//商城价格
                let c = res.data.data.tradePrice / 100
                this.form.wholesalePrices = c.toString();//批发价格
                this.form.stock = res.data.data.stockNumber;//库存
                this.form.discardStock = res.data.data.discardStock;//不可用库存
                this.form.lockedStock = res.data.data.lockedStockNumber.toString();//已锁定的库存
                this.form.newWeight = res.data.data.eaNetWeight;//单品净重
                this.form.grossWeight = res.data.data.eaGrossWeight;//单品毛重
                this.form.volume = res.data.data.eaVolume;//单品体积
                this.form.lengths = res.data.data.eaLength;//单品长
                this.form.width = res.data.data.eaWidth;//单品宽
                this.form.height = res.data.data.eaHeight;//单品高
                this.form.exchangeNumber = res.data.data.csConversionQty;//箱换算数量
                this.form.boxNewWeight = res.data.data.csNetWeight;//箱净重
                this.form.boxGrossWeight = res.data.data.csGrossWeight;//箱毛重
                this.form.boxVolumn = res.data.data.csVolume;//箱体积
                this.form.boxLength = res.data.data.csLength;//箱长
                this.form.boxWeight = res.data.data.csWidth;//箱宽
                this.form.boxHeight = res.data.data.csHeight;//箱高
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
                //this.obj1用于与现有数据进行比较
                let items = [];
                for (let j = 0; j < this.items.length; j++) {
                    let obj = {};
                    obj.propName = this.items[j].propName;
                    obj.propValue = this.items[j].propValue[0];
                    items.push(obj);
                }
                console.log(JSON.stringify(items));
//                this.obj1 = {skuPropertys:JSON.stringify(items),productImageUrl:this.imageUrl,isBom:this.form.zutao,isVirtualBom:this.form.zutaoCommodity,noRefund:this.form.refound,rebateId:this.form.value,rate:this.form.rate,productName:this.form.commodityName,skuname:this.form.ruleName,storePrice:res.data.data.price/100,oPrice:this.form.originPrice,tPrice:this.form.wholesalePrices,lockedStockNumber:this.form.lockedStock};
            });
            //查询返利等级
            this.$http.post(this.url + '/profitLevel/all_profitLevel', {}, {emulateJSON: true}).then(function (res) {
                console.log(res.data);
                for (let i = 0; i < res.data.data.length; i++) {
                    let obj = {};
                    obj.label = res.data.data[i].levelName + '--' + res.data.data[i].rebateProportion;
                    obj.value = res.data.data[i].profitLevelId.toString();
                    this.optionsF.push(obj);
                }
            });
        },
    }
</script>

<style scoped>
    .redP {
        color: red;
    }

    .shuxingming {
        font-size: 18px;
        color: blue;
        cursor: pointer;
    }

    .liu_border_hong {
        color: #E50011;
        border: 1px solid #E50011;
    }

    .liu_border_honge {
        color: #E50011;
        border: 1px solid #E50011;
    }

    .liu_border_hei {
        font-size: 0.12rem;
        color: #333;
        border: 1px solid #999999;
    }

    .publish10 {
        /*max-height: 560px;*/
        /*overflow:auto;*/
    }

    .time, .purchase-amount, .price, .origin-price, .whether, .rate {
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

    .haha {
        display: flex;
    }

    .tags {
        margin-bottom: 5px;
    }
</style>