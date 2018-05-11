<template>
    <!--二级页编辑-->
    <div>
        <el-button  @click="add">添加模板</el-button>
        <!--<p class="redP">注意 : 修改该页面之后,请务必按下保存按钮,否则,修改不生效 </p>-->
        <el-table
                class="table"
                :data="tableData"
                border
                style="width: 100%;margin-top: 8px"
                max-height="460"
        >
            <el-table-column
                    type="index"
                    label="序号"
                    width="66">
            </el-table-column>
            <el-table-column
                    prop="templetUrl"
                    label="模板图片"
                    width="200px"
            >
                <template slot-scope="scope">
                    <img :src="scope.row.templetUrl" alt="模板图片" style="width: 100px;height: 60px;padding-top: 10px">
                </template>
            </el-table-column>
            <el-table-column
                    prop="pics"
                    label="图片|绑定类型|目标ID">
                <template slot-scope="scope">
                    <div v-for="item,index in scope.row.templetD" style="display: flex;" :class="index>0?'bb':'bt'">
                        <img :src="item.imageUrl" alt="图片" style="width: 50px;height: 50px;margin: 10px">
                        <p style="margin-top: 18px">{{item.types}}</p>
                        <p style="margin-top: 18px;margin-left: 20px;color: blue">{{item.typeId}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作">
                <template slot-scope="scope">
                    <div style="">
                        <el-button type="text" @click="adit(scope.row,scope.$index)">编辑</el-button>
                        <span>|</span>
                        <el-button type="text" @click="delet(scope.row,scope.$index)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 10px">
            <el-button @click="returnList" type="primary">返回列表</el-button>
        </div>
        <!--添加模板弹框-->
        <el-dialog title="添加模板" :visible.sync="dialogFormVisible" top="2vh">
            <p class="redP">友情提示：图片规格尺寸为375*170px，重新选择样式后，所有图片都需要重新上传！</p>
            <div style="padding-left: 30px">
                <el-radio-group v-model="radio" @change="radioChange">
                    <el-radio label="AAA">
                        <img src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/AAA.png" alt="AAA" class="pics">
                    </el-radio>
                    <el-radio label="BBB">
                        <img src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/BBB.png" alt="BBB" class="pics">
                    </el-radio>
                    <el-radio label="CCC">
                        <img src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/CCC.png" alt="CCC" class="pics">
                    </el-radio>
                    <br>
                    <el-radio label="DDD">
                        <img src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/DDD.png" alt="DDD" class="pics">
                    </el-radio>
                    <el-radio label="EEE">
                        <img src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/EEE.png" alt="EEE" class="pics">
                    </el-radio>
                    <el-radio label="FFF">
                        <img src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/FFF.png" alt="FFF" class="pics">
                    </el-radio>
                </el-radio-group>
                <div v-show="isShow0">
                    <el-form ref="Aform0" :model="Aform0" label-width="70px">
                        <el-form-item label="图片 1">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="AhandleSuccess"
                                    :show-file-list="false"
                            >
                                <img :src="arr[0]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform0.types" @change="Atypes0">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform0.aims" class="aims"></el-input>
                            <el-button @click="Aform0.aims='';Aform0.types='';arr[0]='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                    </el-form>
                    <span class="fengefu">**********************************************************************</span>
                </div>
                <div v-show="isShow1">
                    <el-form ref="Aform1" :model="Aform1" label-width="70px">
                        <el-form-item label="图片 2">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="AhandleSuccess1"
                                    :show-file-list="false"
                            >
                                <img :src="arr[1]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform1.types" @change="Atypes1">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform1.aims" class="aims"></el-input>
                            <el-button @click="Aform1.aims='';Aform1.types='';arr[1]='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                    </el-form>
                    <span class="fengefu">**********************************************************************</span>
                </div>
                <div v-show="isShow2">
                    <el-form ref="Aform2" :model="Aform2" label-width="70px">
                        <el-form-item label="图片 3">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="AhandleSuccess2"
                                    :show-file-list="false"
                            >
                                <img :src="arr[2]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform2.types" @change="Atypes2">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform2.aims" class="aims"></el-input>
                            <el-button @click="Aform2.aims='';Aform2.types='';arr[2]='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                    </el-form>
                    <span class="fengefu">**********************************************************************</span>
                </div>
                <div v-show="isShow3">
                    <el-form ref="Aform3" :model="Aform3" label-width="70px">
                        <el-form-item label="图片 4">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="AhandleSuccess3"
                                    :show-file-list="false"
                            >
                                <img :src="arr[3]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform3.types" @change="Atypes3">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform3.aims" class="aims"></el-input>
                            <el-button @click="Aform3.aims='';Aform3.types='';arr[3]='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                    </el-form>
                    <span class="fengefu">**********************************************************************</span>
                </div>
                <div v-show="isShow4">
                    <el-form ref="Aform4" :model="Aform4" label-width="70px">
                        <el-form-item label="图片 5">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="AhandleSuccess4"
                                    :show-file-list="false"
                            >
                                <img :src="arr[4]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform4.types" @change="Atypes4">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform4.aims" class="aims"></el-input>
                            <el-button @click="Aform4.aims='';Aform4.types='';arr[4]='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                    </el-form>
                    <span class="fengefu">**********************************************************************</span>
                </div>
                <div style="text-align: center">
                    <el-button type="primary" @click="sure">保存</el-button>
                </div>
            </div>
        </el-dialog>
        <!--编辑弹框0000-->
        <el-dialog title="编辑模板" :visible.sync="dialogFormVisible1" top="2vh">
            <p class="redP">友情提示：图片规格尺寸为375*170px，重新选择样式后，所有图片都需要重新上传！</p>
            <div style="padding-left: 30px">
                <el-radio-group v-model="radio" @change="radioChange">
                    <el-radio label="AAA">
                        <img src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/AAA.png" alt="AAA" class="pics">
                    </el-radio>
                    <el-radio label="BBB">
                        <img src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/BBB.png" alt="BBB" class="pics">
                    </el-radio>
                    <el-radio label="CCC">
                        <img src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/CCC.png" alt="CCC" class="pics">
                    </el-radio>
                    <br>
                    <el-radio label="DDD">
                        <img src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/DDD.png" alt="DDD" class="pics">
                    </el-radio>
                    <el-radio label="EEE">
                        <img src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/EEE.png" alt="EEE" class="pics">
                    </el-radio>
                    <el-radio label="FFF">
                        <img src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/FFF.png" alt="FFF" class="pics">
                    </el-radio>
                </el-radio-group>
                <div v-show="isShow0">
                    <el-form ref="Aform0" :model="Aform0" label-width="70px">
                        <el-form-item label="图片 1">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="AhandleSuccess"
                                    :show-file-list="false"
                            >
                                <img :src="arr[0]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform0.types" @change="Atypes0">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform0.aims" class="aims"></el-input>
                            <el-button @click="Aform0.aims='';Aform0.types='';arr[0]='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                    </el-form>
                    <span class="fengefu">**********************************************************************</span>
                </div>
                <div v-show="isShow1">
                    <el-form ref="Aform1" :model="Aform1" label-width="70px">
                        <el-form-item label="图片 2">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="AhandleSuccess1"
                                    :show-file-list="false"
                            >
                                <img :src="arr[1]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform1.types" @change="Atypes1">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform1.aims" class="aims"></el-input>
                            <el-button @click="Aform1.aims='';Aform1.types='';arr[1]='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                    </el-form>
                    <span class="fengefu">**********************************************************************</span>
                </div>
                <div v-show="isShow2">
                    <el-form ref="Aform2" :model="Aform2" label-width="70px">
                        <el-form-item label="图片 3">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="AhandleSuccess2"
                                    :show-file-list="false"
                            >
                                <img :src="arr[2]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform2.types" @change="Atypes2">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform2.aims" class="aims"></el-input>
                            <el-button @click="Aform2.aims='';Aform2.types='';arr[2]='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                    </el-form>
                    <span class="fengefu">**********************************************************************</span>
                </div>
                <div v-show="isShow3">
                    <el-form ref="Aform3" :model="Aform3" label-width="70px">
                        <el-form-item label="图片 4">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="AhandleSuccess3"
                                    :show-file-list="false"
                            >
                                <img :src="arr[3]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform3.types" @change="Atypes3">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform3.aims" class="aims"></el-input>
                            <el-button @click="Aform3.aims='';Aform3.types='';arr[3]='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                    </el-form>
                    <span class="fengefu">**********************************************************************</span>
                </div>
                <div v-show="isShow4">
                    <el-form ref="Aform4" :model="Aform4" label-width="70px">
                        <el-form-item label="图片 5">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'productImage'"
                                    :on-success="AhandleSuccess4"
                                    :show-file-list="false"
                            >
                                <img :src="arr[4]" class="avatar">
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Aform4.types" @change="Atypes4">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Aform4.aims" class="aims"></el-input>
                            <el-button @click="Aform4.aims='';Aform4.types='';arr[4]='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                    </el-form>
                    <span class="fengefu">**********************************************************************</span>
                </div>
                <div style="text-align: center">
                    <el-button type="primary" @click="sure1">保存</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShow0: false,
                isShow1: false,
                isShow2: false,
                isShow3: false,
                isShow4: false,
                arr: ["http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png"],//图片
//                urls: 'http://47.96.154.252:8088/Image/upload_image/productImage',//上传图片路径
                tableData: [{}],
                newArr: [],//存放给后台
                datas: [],
                returnArr: [],//返回列表
                dialogFormVisible: false,//添加模板
                radio: '',//添加模板
//                添加部分
                AfileList0: [],
                Aform0: {types: '',aims:''},
                Aform1: {types: '',aims:''},
                Aform2: {types: '',aims:''},
                Aform3: {types: '',aims:''},
                Aform4: {types: '',aims:''},
                AtypeVal0: '',//绑定类型1
                AmarqueeUrl0: '',//接收后台返回图片url
                //轮播图第二张
                AfileList1: [],
                AtypeVal1: '',//绑定类型2
                AmarqueeUrl1: '',//接收后台返回图片url1
                //轮播图第三张
                AfileList2: [],
                AtypeVal2: '',//绑定类型3
                AmarqueeUrl2: '',//接收后台返回图片url2
                //轮播图第四张
                AfileList3: [],
                AtypeVal3: '',//绑定类型3
                AmarqueeUrl3: '',//接收后台返回图片url3
                //轮播图第五张
                AfileList4: [],
                AtypeVal4: '',//绑定类型4
                AmarqueeUrl4: '',//接收后台返回图片url4
//                编辑部分
                dialogFormVisible1: false,
                customPageId: '',
                aditIndex: '',
                templetId: '',

                Aform: []
            }
        },
        methods: {
            add() {
//                清空
                this.$nextTick(()=>{
                    for (let i = 0; i < 5; i++) {
                        this.arr[i] = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                        this['Aform' + i].types = '';
                        this['Aform' + i].aims = '';
                    }
                })
                this.newArr = [];
                this.radio = '';
                this.dialogFormVisible = true;
            },
//            编辑
            adit(row, index) {
                console.log(row, index);
                this.aditIndex = index;
                this.templetId = row.templetId;
//                console.log(this.arr);
                if (row.templetModule == 'AAA') {
                    this.isShow0 = true;
                    this.isShow1 = false;
                    this.isShow2 = false;
                    this.isShow3 = false;
                    this.isShow4 = false;
                    console.log(this.arr)
                } else if (row.templetModule == 'BBB') {
                    this.isShow0 = true;
                    this.isShow1 = true;
                    this.isShow2 = false;
                    this.isShow3 = false;
                    this.isShow4 = false;
                    console.log(this.arr)
                } else if (row.templetModule == 'CCC' || row.templetModule == 'EEE') {
                    this.isShow0 = true;
                    this.isShow1 = true;
                    this.isShow2 = true;
                    this.isShow3 = false;
                    this.isShow4 = false;
                    console.log(this.arr)
                } else if (row.templetModule == 'DDD') {
                    this.isShow0 = true;
                    this.isShow1 = true;
                    this.isShow2 = true;
                    this.isShow3 = true;
                    this.isShow4 = true;
                    console.log(this.arr)
                } else if (row.templetModule == 'FFF') {
                    this.isShow0 = true;
                    this.isShow1 = true;
                    this.isShow2 = true;
                    this.isShow3 = true;
                    this.isShow4 = false;
                    console.log(this.arr)
                }
                this.radio = row.templetModule;
                this.$nextTick(()=>{
                    let arr = row.templetD;
                    for (let j in arr) {
                        this.arr[j] = arr[j].imageUrl;
                        this['Aform' + j].types = arr[j].type;
                        this['Aform' + j].aims = arr[j].typeId;
                    }
                })
                this.dialogFormVisible1 = true;
                console.log(this.arr);
            },
//            删除
            delet(row, index) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/customPage/del_basis_templet',{
                        templetId: row.templetId,
                        templetModule: row.templetModule,
                    },{emulareJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.tableData.splice(index, 1);
                            let arr = [];
                            for(let k=0;k<this.tableData.length;k++){
                                arr.push(this.tableData[k].templetId)
                            }
                            this.$http.post(this.url + '/customPage/complete_page', {
                                customPageId: this.$route.query.customPageId,
                                tIds: arr.join(',')
                            }, {emulateJSON: true}).then(function (res) {
                                console.log(res);
                                //  刷新页面
                                this.ajax();
                            })
                        }else{
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    })
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                });

            },
//            选择模板
            radioChange(val) {
                console.log('pppp');
                if (this.radio == 'AAA') {
                    this.isShow0 = true;
                    this.isShow1 = false;
                    this.isShow2 = false;
                    this.isShow3 = false;
                    this.isShow4 = false;
                } else if (this.radio == 'BBB') {
                    this.isShow0 = true;
                    this.isShow1 = true;
                    this.isShow2 = false;
                    this.isShow3 = false;
                    this.isShow4 = false;
                } else if (this.radio == 'CCC' || this.radio == 'EEE') {
                    this.isShow0 = true;
                    this.isShow1 = true;
                    this.isShow2 = true;
                    this.isShow3 = false;
                    this.isShow4 = false;
                } else if (this.radio == 'DDD') {
                    this.isShow0 = true;
                    this.isShow1 = true;
                    this.isShow2 = true;
                    this.isShow3 = true;
                    this.isShow4 = true;
                } else if (this.radio == 'FFF') {
                    this.isShow0 = true;
                    this.isShow1 = true;
                    this.isShow2 = true;
                    this.isShow3 = true;
                    this.isShow4 = false;
                } else {
                    this.isShow0 = false;
                    this.isShow1 = false;
                    this.isShow2 = false;
                    this.isShow3 = false;
                    this.isShow4 = false;
                }
                for (let i = 0; i < 5; i++) {
                    this.arr[i] = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                    this['Aform' + i].types = '';
                    this['Aform' + i].aims = '';
                }
            },
//            编辑-sure
            sure1() {
                let templetUrl;
                let a;
                if (this.radio == 'AAA') {
                    a = 1;
                    templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/AAA.png'
                } else if (this.radio == 'BBB') {
                    a = 2;
                    templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/BBB.png'
                } else if (this.radio == 'CCC') {
                    a = 3;
                    templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/CCC.png'
                } else if (this.radio == 'DDD') {
                    a = 5;
                    templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/DDD.png'
                } else if (this.radio == 'EEE') {
                    a = 3;
                    templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/EEE.png'
                } else if (this.radio == 'FFF') {
                    a = 4;
                    templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/FFF.png'
                }

                this.datas = [];
                let mm;
                for (let i = 0; i < a; i++) {
                    if (this.arr[i] == 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png') {
                        mm = 1;
                    } else {
                        mm = 2;
                        let imageUrl = this.arr[i];
                        let type = this['Aform' + i].types;
                        let typeId = this['Aform' + i].aims;
                        this.datas.push({imageUrl, type, typeId});
                        console.log(this.datas)
                    }
                }
                if (mm == 1) {
                    this.$message({
                        type: 'warning',
                        message: '请完善信息!'
                    })
                } else {
                    this.$http.post(this.url + '/customPage/update_templet', {
                        templetId: this.templetId,
                        templetModule: this.radio,
                        templetData: JSON.stringify(this.datas),
                    }, {emulateJSON: true}).then(function (res) {
//                    刷新
                        this.$http.post(this.url + '/customPage/complete_page', {
                            customPageId: this.$route.query.customPageId,
                            tIds: this.returnArr.join(',')
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            this.ajax();
                            this.dialogFormVisible1 = false;
                        })
                    });
                }
            },
//            添加-sure
            sure() {
                if (this.radio == '') {
                    this.$message({
                        type: 'warning',
                        message: '请选择模版!'
                    })
                } else {
                    let a;
                    if (this.radio == 'AAA') {
                        a = 1
                    } else if (this.radio == 'BBB') {
                        a = 2
                    } else if (this.radio == 'CCC' || this.radio == 'EEE') {
                        a = 3
                    } else if (this.radio == 'DDD') {
                        a = 5
                    } else if (this.radio == 'FFF') {
                        a = 4
                    }
                    console.log(a);
                    this.datas = [];
//                    this.newArr=[];
                    console.log(this.arr);
                    let mm;
                    for (let i = 0; i < a; i++) {
                        if (this.arr[i] == 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png') {
                            console.log('8888');
                            mm = 1;
                        } else {
                            let imageUrl = this.arr[i];
                            let type = this['Aform' + i].types;
                            let typeId = this['Aform' + i].aims;
                            this.datas.push({imageUrl, type, typeId});
                            console.log(this.datas)
                            console.log(99999);
                            mm = 2;
                        }
                    }
                    if (mm == 1) {
                        this.$message({
                            type: 'warning',
                            message: '请完善信息!'
                        });
                    } else {
                        this.$http.post(this.url + '/customPage/create_templet', {
                            templetModule: this.radio,
                            templetData: JSON.stringify(this.datas),
                            templetType: 'BASIS',
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            this.returnArr.push(res.data.data.templetId);
                            if (res.data.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.$http.post(this.url + '/customPage/complete_page', {
                                    customPageId: this.$route.query.customPageId,
                                    tIds: this.returnArr.join(',')
                                }, {emulateJSON: true}).then(function (res) {
                                    console.log(res);
                                    this.dialogFormVisible = false;
                                    //  刷新页面
                                    this.ajax();
                                })
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '添加失败!'
                                });
                            }
                        })
                    }
                }
            },
//            返回列表
            returnList() {
                this.$router.push({
                    path:'/secondPage'
                })
//                let arr = [];
//                for (let i = 0; i < this.tableData.length; i++) {
//                    arr.push(this.tableData[i].templetId)
//                }
//                console.log(arr);
//                this.$http.post(this.url + '/customPage/complete_page', {
//                    customPageId: this.$route.query.customPageId,
//                    tIds: arr.join(',')
//                }, {emulateJSON: true}).then(function (res) {
//                    console.log(res);
//                    if(res.data.status==200){
//                        this.$router.push({
//                            path:'/secondPage'
//                        })
//                    }else{
//                        this.$message({
//                            type:'error',
//                            message:'错误202!'
//                        })
//                    }
//                })
            },
            handleSuccess0(file) {
                console.log(file);
                //数组监听  this.arr[0] = file.data.url;不生效
                this.$set(this.arr, 0, file.data.url)
            },
            handleSuccess1(file) {
                console.log(file);
                this.$set(this.arr, 1, file.data.url)
            },
            handleSuccess2(file) {
                console.log(file);
                this.$set(this.arr, 2, file.data.url)
            },
            handleSuccess3(file) {
                console.log(file);
                this.$set(this.arr, 3, file.data.url)
            },
            handleSuccess4(file) {
                console.log(file);
                this.$set(this.arr, 4, file.data.url)
            },
            //轮播图第一张
            AhandleSuccess(file, res) {
                this.$set(this.arr, 0, file.data.url)
            },
            Atypes0(val) {
                console.log(val);
                this.AtypeVal0 = val;
            },
            //轮播图第二张
            AhandleSuccess1(file) {
                this.$set(this.arr, 1, file.data.url)
            },
            Atypes1(val) {
                console.log(val);
                this.AtypeVal1 = val;
            },
            //轮播图第三张
            AhandleSuccess2(file) {
                this.$set(this.arr, 2, file.data.url)
            },
            Atypes2(val) {
                console.log(val);
                this.AtypeVal2 = val;
            },//单选
            //轮播图第四张
            AhandleSuccess3(file) {
                this.$set(this.arr, 3, file.data.url)
            },
            Atypes3(val) {
                console.log(val);
                this.AtypeVal3 = val;
            },//单选
            //轮播图第五张
            AhandleSuccess4(file) {
                this.$set(this.arr, 4, file.data.url)
            },
            Atypes4(val) {
                console.log(val);
                this.AtypeVal4 = val;
            },//单选
//            ajax
            ajax() {
                this.$http.post(this.url + '/customPage/get_custom_page_info', {customPageId: this.$route.query.customPageId}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.data == null) {
                        this.tableData = [];
                    } else {
                        this.returnArr = [];
                        for (let i = 0; i < res.data.data.length; i++) {
                            for (let k = 0; k < res.data.data[i].templetD.length; k++) {
                                if (res.data.data[i].templetD[k].type == 'DISCOUNT') {
                                    res.data.data[i].templetD[k].types = '二级页'
                                } else if (res.data.data[i].templetD[k].type == 'GOODSLIST') {
                                    res.data.data[i].templetD[k].types = '商品列表'
                                } else if (res.data.data[i].templetD[k].type == 'GOODSDETAIL') {
                                    res.data.data[i].templetD[k].types = '商品详情'
                                }
                            }
                            if (res.data.data[i].templetModule == 'AAA') {
                                res.data.data[i].templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/AAA.png'
                            } else if (res.data.data[i].templetModule == 'BBB') {
                                res.data.data[i].templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/BBB.png'
                            } else if (res.data.data[i].templetModule == 'CCC') {
                                res.data.data[i].templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/CCC.png'
                            } else if (res.data.data[i].templetModule == 'DDD') {
                                res.data.data[i].templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/DDD.png'
                            } else if (res.data.data[i].templetModule == 'EEE') {
                                res.data.data[i].templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/EEE.png'
                            } else if (res.data.data[i].templetModule == 'FFF') {
                                res.data.data[i].templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/FFF.png'
                            }
                            this.returnArr.push(res.data.data[i].templetId);
                        }
                        this.tableData = res.data.data;
                    }
                })
            },
        },
        mounted() {
            this.customPageId = this.$route.query.customPageId;
            this.ajax();
        }
    }
</script>
<style scoped>
    .redP {
        color: red;
        font-size: 14px;
    }

    .pics {
        width: 120px;
        height: 60px;
        vertical-align: middle;
        margin-bottom: 10px;
    }

    li {
        list-style: none;
    }

    li img {
        width: 90px;
        height: 90px;
    }

    .aims {
        width: 300px;
    }

    .avatar {
        width: 90px;
        height: 90px;
        margin-left: 60px;
    }

    .fengefu {
        color: lightsteelblue;
    }

    .bb {
        border-top: 1px dashed green;
    }

    .bt {

    }

</style>