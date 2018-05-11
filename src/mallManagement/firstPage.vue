<template>
    <!--首页-->
    <div style="height:100%">
        <el-button @click="add">添加栏目</el-button>
        <el-table
                :data="tableData"
                border
                style="width: 100%;margin-top: 8px"
        >
            <el-table-column
                    type="index"
                    label="序号"
                    width="66">
            </el-table-column>
            <el-table-column
                    prop="columnId"
                    label="ID"
                    >
            </el-table-column>
            <el-table-column
                    prop="columnName"
                    label="栏目名称">
            </el-table-column>
            <el-table-column
                    prop="columnWeight"
                    label="权重"
                    sortable
            >
                <template slot-scope="scope">
                    <span @click="weightClick(scope.row,scope.$index)" class="xiaoshou">{{scope.row.columnWeight}}</span>
                        <input class="inputs0" v-show="scope.row.weightInputShow" v-focus v-model="scope.row.weightInput" @blur="weightInputBlur(scope.row,scope.$index)">
                </template>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="是否可见">
                <template slot-scope="scope">
                    <el-switch
                            @change="switchChange(scope.row,scope.$index)"
                            v-model="scope.row.switchValue"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="adit(scope.row,scope.$index)">编辑</el-button>
                    <span>|</span>
                    <el-button type="text" @click="delet(scope.row,scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--添加弹框-->
        <el-dialog title="添加栏目" :visible.sync="dialogTableVisible" top="5vh" width="70%">
            <el-tabs type="border-card" @tab-click="tabs">
                <el-tab-pane label="功能模板">
                    <div>
                        <!--<span>功能模板 : </span>-->
                        <el-radio-group v-model="radio" @change="radioChange">
                            <el-radio label="TAAA">单品推荐</el-radio>
                            <el-radio label="TBBB">大牌推荐</el-radio>
                            <el-radio label="TCCC">热销品牌</el-radio>
                            <el-radio label="TDDD">一周热卖</el-radio>
                            <el-radio label="TEEE">新品驾到</el-radio>
                            <el-radio label="TFFF" style="margin-top: 5px">更多好物</el-radio>
                            <el-radio label="TGGG">每日疯抢</el-radio>
                        </el-radio-group>
                    </div>
                    <div>
                        <span>栏目名称 : </span>
                        <el-input class="inputs" style="margin-top: 10px" v-model="columnName"  :disabled="disabledInput"></el-input>
                    </div>
                    <div style="padding-left: 28px;margin-top: 10px">
                        <span>权重 : </span>
                        <el-input class="inputs" v-model="weight"></el-input>
                    </div>
                    <div style="text-align: center;margin-top: 10px">
                        <el-button type="primary" @click="sure">保存</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="基础模板">
                    <el-radio-group v-model="radio1" @change="radioChange1">
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
                    <div>
                        <span>栏目名称 : </span>
                        <el-input class="inputs" style="margin-top: 10px" v-model="columnName1"></el-input>
                    </div>
                    <div style="padding-left: 28px;margin-top: 10px">
                        <span>权重 : </span>
                        <el-input class="inputs" v-model="weight1"></el-input>
                    </div>
                    <div style="text-align: center;margin-top: 10px">
                        <el-button type="primary" @click="sure1">保存</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <!--TDDD弹框-->
        <el-dialog title="编辑" :visible.sync="TDDDdialogTableVisible" top="5vh">
            <div style="display: flex;">
                <el-upload
                        style="margin-right: 30px"
                        class="upload-demo"
                        :action="url+'/indexColumn/upload_TAAA'"
                        :on-success="handleSuccess1"
                        :show-file-list="false"
                >
                    <el-button type="primary">点击上传</el-button>
                </el-upload>
                <a :href="urldown+'/download_excel_file/TAAA'">
                    <el-button type="primary">格式导出</el-button>
                </a>
            </div>
            <el-table
                    :data="TDDDtableData"
                    border
                    style="width: 100%;margin-top: 8px;">
                <el-table-column
                        prop="spuId"
                        label="spuId"
                        width="80px"
                >
                </el-table-column>
                <el-table-column
                        prop="image"
                        label="商品图片"
                >
                    <template slot-scope="scope">
                        <img :src="scope.row.imageUrlsToWeb[0]" alt="图片"
                             style="width: 50px;height: 50px;">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="spucode"
                        label="spucode"
                >
                </el-table-column>
                <el-table-column
                        prop="spuTitle"
                        label="商品标题"
                >
                </el-table-column>
            </el-table>
            <div style="text-align: center;margin-top: 8px">
                <el-button @click="TDDDSure" type="primary">保存</el-button>
            </div>
        </el-dialog>
        <!--TEEE弹框-->
        <el-dialog title="编辑" :visible.sync="TEEEdialogTableVisible" top="5vh">
            <div style="display: flex;">
                <el-upload
                        style="margin-right: 30px"
                        class="upload-demo"
                        :action="url+'/indexColumn/upload_TEEE'"
                        :on-success="handleSuccess2"
                        :show-file-list="false"
                >
                    <el-button type="primary">点击上传</el-button>
                </el-upload>
                <a :href="urldown+'/download_excel_file/TEEE'">
                    <el-button type="primary">格式导出</el-button>
                </a>
            </div>
            <el-table
                    :data="TEEEtableData"
                    border
                    style="width: 100%;margin-top: 8px;">
                <el-table-column
                        prop="spuId"
                        label="spuId"
                        width="80px"
                >
                </el-table-column>
                <!--<el-table-column-->
                        <!--prop="image"-->
                        <!--label="商品图片"-->
                <!--&gt;-->
                    <!--<template slot-scope="scope">-->
                        <!--<img :src="scope.row.imageUrlsToWeb[0]" alt="图片"-->
                             <!--style="width: 50px;height: 50px;">-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column
                        prop="spucode"
                        label="spucode"
                >
                </el-table-column>
                <el-table-column
                        prop="spuSecTile"
                        label="商品副标题"
                >
                </el-table-column>
            </el-table>
            <div style="text-align: center;margin-top: 8px">
                <el-button @click="TEEESure" type="primary">保存</el-button>
            </div>
        </el-dialog>
        <!--TGGG弹框-->
        <!--<el-dialog title="编辑" :visible.sync="TGGGdialogTableVisible" top="5vh">-->
            <!--<h2>问毛毛</h2>-->
        <!--</el-dialog>-->
        <!--弹框-->
        <el-dialog title="编辑模板" :visible.sync="ABCDEFdialogFormVisible" top="2vh">
            <div style="padding-left: 30px">
               <div>
                   <el-form label-width="70px">
                       <el-form-item label="栏目图片">
                           <img :src="columnImg" alt="栏目图片" style="width:120px;height: 60px;">
                       </el-form-item>
                   </el-form>
               </div>
                <div v-if="isShow0">
                    <el-form ref="Aform0" :model="Aform0" label-width="70px">
                        <el-form-item label="图片 1">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'templet'"
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
                    <span class="fengefu">********************************************************************************</span>
                </div>
                <div v-if="isShow1">
                    <el-form ref="Aform1" :model="Aform1" label-width="70px">
                        <el-form-item label="图片 2">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'templet'"
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
                    <span class="fengefu">********************************************************************************</span>
                </div>
                <div v-if="isShow2">
                    <el-form ref="Aform2" :model="Aform2" label-width="70px">
                        <el-form-item label="图片 3">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'templet'"
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
                    <span class="fengefu">********************************************************************************</span>
                </div>
                <div v-if="isShow3">
                    <el-form ref="Aform3" :model="Aform3" label-width="70px">
                        <el-form-item label="图片 4">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'templet'"
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
                    <span class="fengefu">********************************************************************************</span>
                </div>
                <div v-if="isShow4">
                    <el-form ref="Aform4" :model="Aform4" label-width="70px">
                        <el-form-item label="图片 5">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'templet'"
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
                    <span class="fengefu">***********************************************************************************</span>
                </div>
                <div style="text-align: center">
                    <el-button type="primary" @click="Asure">保存</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                columnImg:'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                Aradio:'',
                isShow0: false,
                isShow1: false,
                isShow2: false,
                isShow3: false,
                isShow4: false,
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

                TDDDtableData:[],
                TEEEtableData:[],
                ABCDEFdialogFormVisible:false,
                TGGGdialogTableVisible:false,
                arr: ["http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png"],//图片
                imageUrl:'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
//                urls: 'http://116.62.165.6/Image/upload_image/templet',
                tableData:[],
                dialogTableVisible:false,//添加弹框
                TDDDdialogTableVisible:false,//TDDD弹框
                TEEEdialogTableVisible:false,//TEEE弹框
                radio:'',//功能模板-单选
                radio1:'',//基础模板-单选
                columnName:'',//功能模板-栏目名称
                columnName1:'',//基础模板-栏目名称
                weight:'',//权重
                weightInput:'',
                weight1:'',
                disabledInput:true,//功能-变灰
                row:'',
                datas:[],
                aa:'',
            }

        },
        //input聚焦
        directives: {
            focus: {
                // 指令的定义
                update: function (el) {
                    el.focus()
                }
            }
        },
        methods: {
//            ABCDEF保存
            Asure(){
                console.log(this.aa);
                let  mm;
                for(let i=0;i<this.aa;i++) {
//                    this.arr[i] == 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png' || this['Aform' + i].types == '' || this['Aform' + i].aims == ''
                    if (this.arr[i] == 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png') {
                        mm = 0;
                    } else {
                        mm = 1;
                        let imageUrl = this.arr[i];
                        let type = this['Aform' + i].types;
                        let typeId = this['Aform' + i].aims;
                        this.datas.push({imageUrl, type, typeId});
                        console.log(this.datas)
                    }
                }
                if(mm==0){
                    this.$message({
                        type: 'warning',
                        message: '请上传图片!'
                    });
                }else{
                    this.$http.post(this.url+'/indexColumn/create_column_info_basic',{
                        columnId:this.row.columnId,
                        images:JSON.stringify(this.datas),
                    },{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type: 'success',
                                message: '编辑成功!'
                            });
                            //刷新
                            this.$http.post(this.url+'/indexColumn/get_column_info',{
                                columnId:this.row.columnId,
                                templetType:this.row.templetId,
                            },{emulateJSON:true}).then(function (res) {
                                console.log(res);
                                console.log('成功');
                                this.ABCDEFdialogFormVisible = false;
                            },function (err) {
                                this.$message({
                                    type:'error',
                                    message:'服务器连接中断,请联系后台人员!',
                                });
                            })

                        }else{
                            this.$message({
                                type:'error',
                                message:'编辑失败!'
                            });
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }
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
            TEEESure(){
                if(this.TEEEtableData.length==0){
                    this.$message({
                        type:'warning',
                        message:'请上传文件!'
                    });
                }else{
                    let arr=[];
//                    for(let i=0;i<this.TEEEtableData.length;i++){
//                        arr.push(this.TEEEtableData[i].spuId);
//                    }
                    console.log(this.TEEEtableData);
                    this.$http.post(this.url+'/indexColumn/create_column_info_teee',{columnId:this.row.columnId,data:JSON.stringify(this.TEEEtableData)},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type:'success',
                                message:'操作成功!'
                            });
                            this.TEEEdialogTableVisible = false;
                            //刷新
                            this.ajax();
                        }else{
                            this.$message({
                                type:'error',
                                message:'操作失败!'
                            });
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    })
                }
            },
//            TDDD-sure
            TDDDSure(){
                if(this.TDDDtableData.length==0){
                    this.$message({
                        type:'warning',
                        message:'请上传文件!'
                    });
                }else{
                    let arr=[];
                    for(let i=0;i<this.TDDDtableData.length;i++){
                        arr.push(this.TDDDtableData[i].spuId);
                    }
                    this.$http.post(this.url+'/indexColumn/create_column_info_tddd',{columnId:this.row.columnId,spuIds:arr.join(',')},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type:'success',
                                message:'操作成功!'
                            });
                            this.TDDDdialogTableVisible = false;
                            //刷新
                            this.ajax();
                        }else{
                            this.$message({
                                type:'error',
                                message:'操作失败!'
                            });
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }
            },
//            添加
            add(){
                this.dialogTableVisible = true;
                //清空功能模板
                this.columnName='';
                this.weight='';
                this.radio='';
                //清空基础模板
                this.columnName1 = '';
                this.weight1 = '';
                this.radio1 = '';
            },
//            添加-功能模板-单选
            radioChange(val){
                console.log(val);
//                console.log(this.radio);
                if(val=='TAAA'){
                    this.columnName='单品推荐';
                    this.disabledInput = false;
                }else if(val=='TBBB'){
                    this.columnName='大牌推荐';
                    this.disabledInput = false;
                }else if(val=='TCCC'){
                    this.columnName='热销品牌';
                    this.disabledInput = true;
                }else if(val=='TDDD'){
                    this.columnName='一周热卖';
                    this.disabledInput = true;
                }else if(val=='TEEE'){
                    this.columnName='新品驾到';
                    this.disabledInput = true;
                }else if(val=='TFFF'){
                    this.columnName='更多好物';
                    this.disabledInput = true;
                }else if(val=='TGGG'){
                    this.columnName='每日疯抢';
                    this.disabledInput = true;
                }
            },
//            添加-基础模板-单选
            radioChange1(val){
                console.log(val);
            },
//            tabs
            tabs(val){
                console.log(val.label);
                //柳哥要求
//                if(val.label=='功能模板'){
////                    清空
//                    this.columnName='';
//                    this.weight='';
//                    this.radio='';
//                }else{
////                    清空
//                    this.columnName1='';
//                    this.weight1='';
//                    this.radio1='';
//                }
            },
//            功能保存
            sure(){
                if(this.columnName==''||this.weight==''||this.radio==''){
                    this.$message({
                        type:'warning',
                        message:'请完善内容!'
                    })
                }else{
                    this.$http.post(this.url+'/indexColumn/create_column',{
                        columnName:this.columnName,
                        columnWeight:this.weight,
                        templetId:this.radio,
                    },{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        this.dialogTableVisible = false;
//                    刷新
                        this.ajax();
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }
            },
//            基础保存
            sure1(){
                if(this.columnName1==''||this.weight1==''||this.radio1==''){
                    this.$message({
                        type:'warning',
                        message:'请完善内容!'
                    })
                }else{
                    this.$http.post(this.url + '/indexColumn/create_column', {
                        columnName: this.columnName1,
                        columnWeight: this.weight1,
                        templetId: this.radio1,
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        this.dialogTableVisible = false;
//                    刷新
                        this.ajax();
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }
            },
//            删除
            delet(row,index){
                console.log(row, index);
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/indexColumn/update_column_status',{columnId:row.columnId,status:2},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            })
//                            刷新
                            this.ajax();
                        }else{
                            this.$message({
                                type:'error',
                                message:'删除失败!'
                            })
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                });
            },
//            是否可见
            switchChange(row,index){
                console.log(row, index);
                if(row.status==0){
                    this.$http.post(this.url+'/indexColumn/update_column_status',{columnId:row.columnId,status:1},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type:'success',
                                message:'开启成功!'
                            })
//                            刷新
                            this.ajax();
                        }else{
                            this.$message({
                                type:'error',
                                message:'操作失败!'
                            })
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }else{
                    this.$http.post(this.url+'/indexColumn/update_column_status',{columnId:row.columnId,status:0},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type:'success',
                                message:'关闭成功!'
                            })
//                            刷新
                            this.ajax();
                        }else{
                            this.$message({
                                type:'error',
                                message:'操作失败!'
                            })
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }
            },
//            权重
            weightClick(row,index){
                console.log(row, index);
                row.weightInputShow = true;
                row.weightInput = row.columnWeight;
            },
//            权重blur
            weightInputBlur(row,index){
                console.log(row, index);
                if (row.weightInputInput == row.weightInput) {
                    row.weightInputShow = false;
                } else {
                    if (row.weightInput > 0 ||row.weightInput == 0) {
                        this.$http.post(this.url + '/indexColumn/set_column_weight', {
                            columnId: row.columnId,
                            columnWeight: row.weightInput
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 200) {

                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '修改失败!'
                                });
                            }
                            //刷新当前页
                            this.ajax();
                        },function (err) {
                            this.$message({
                                type:'error',
                                message:'服务器连接中断,请联系后台人员!',
                            });
                        });
                    }else{
                        this.$message({
                            type: 'warning',
                            message: '请正确填写权重!'
                        })
                    }
                }
            },
//             编辑
            adit(row,index){
                this.row = row;
                console.log(row, index);
                if(row.templetId=='TAAA'){
                    this.$router.push({
                        path:'/TAAA',
                        query:{row:row}
                    });
                }else if(row.templetId=='TBBB'){
                    this.$router.push({
                        path:'/TBBB',
                        query:{row:row}
                    });
                }else if(row.templetId=='TCCC'){
                    this.$message({
                        type:'warning',
                        message:'该栏目根据品牌权重自动抓取!'
                    });
                }else if(row.templetId=='TDDD'){
                    this.TDDDdialogTableVisible = true;
                    //查询模板信息
                    this.$http.post(this.url+'/indexColumn/get_column_info',{
                        columnId:row.columnId,
                        templetType:'TDDD',
                    },{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.TDDDtableData = res.data.data.spuData;
                        }else{
                            this.$message({
                                type:'error',
                                message:'查询失败!'
                            })
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }else if(row.templetId=='TEEE'){
                    this.TEEEdialogTableVisible = true;
                    //查询模板
                    this.$http.post(this.url+'/indexColumn/get_column_info',{
                        columnId:row.columnId,
                        templetType:'TEEE',
                    },{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.TEEEtableData = res.data.data.columnData;
                        }else{
                            this.$message({
                                type:'error',
                                message:'查询失败!'
                            })
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }else if(row.templetId=='TFFF'){
                    this.$message({
                        type:'warning',
                        message:'该栏目根据商品权重自动抓取!'
                    });
                }else if(row.templetId=='TGGG'){
                    this.$message({
                        type:'warning',
                        message:'该栏目根据活动自动抓取!'
                    });
                }else if(row.templetId=='AAA'||row.templetId=='BBB'||row.templetId=='CCC'||row.templetId=='DDD'||row.templetId=='EEE'||row.templetId=='FFF'){
                    //清空
                    for(let i=0;i<5;i++){
                        this['Aform' + i].types = '';
                        this['Aform' + i].aims = '';
                        this.arr[i] = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                    }
                    this.$http.post(this.url+'/indexColumn/get_column_info',{columnId:row.columnId,templetType:row.templetId},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.ABCDEFdialogFormVisible = true;
                            let a;
                            let  templetUrl;
                            if (row.templetId=='AAA') {
                                a = 1;
                                this.isShow0 = true;
                                this.isShow1 = false;
                                this.isShow2 = false;
                                this.isShow3 = false;
                                this.isShow4 = false;
                                templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/AAA.png'
                            } else if (row.templetId == 'BBB') {
                                a = 2;
                                this.isShow0 = true;
                                this.isShow1 = true;
                                this.isShow2 = false;
                                this.isShow3 = false;
                                this.isShow4 = false;
                                templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/BBB.png'
                            } else if (row.templetId == 'CCC') {
                                a = 3;
                                this.isShow0 = true;
                                this.isShow1 = true;
                                this.isShow2 = true;
                                this.isShow3 = false;
                                this.isShow4 = false;
                                templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/CCC.png'
                            } else if (row.templetId == 'DDD') {
                                a = 5;
                                this.isShow0 = true;
                                this.isShow1 = true;
                                this.isShow2 = true;
                                this.isShow3 = true;
                                this.isShow4 = true;
                                templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/DDD.png'
                            } else if (row.templetId == 'EEE') {
                                a = 3;
                                this.isShow0 = true;
                                this.isShow1 = true;
                                this.isShow2 = true;
                                this.isShow3 = false;
                                this.isShow4 = false;
                                templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/EEE.png'
                            } else if (row.templetId == 'FFF') {
                                a = 4;
                                this.isShow0 = true;
                                this.isShow1 = true;
                                this.isShow2 = true;
                                this.isShow3 = true;
                                this.isShow4 = false;
                                templetUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/FFF.png'
                            }
                            this.columnImg = templetUrl;
                            this.aa = a;
                            this.datas = [];
                            let c = res.data.data.images;
                            for (let i = 0; i < a; i++) {
                                //huixian
                                if(res.data.data.images==null){

                                }else{
                                    console.log(a);
                                        this.arr[i] = c[i].imageUrl;
                                        this['Aform' + i].types = c[i].type;
                                        this['Aform' + i].aims = c[i].typeId;
                                }
                            }
                        }else{
                            this.$message({
                                type:'error',
                                message:'查询失败!'
                            })
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    });
                }
            },
            handleSuccess1(file) {
                console.log(file.data);
                if (file.data == null || file.data.length == 0) {
                    this.TDDDtableData=[];
                } else {
                    this.TDDDtableData = file.data;
                }
            },
            handleSuccess2(file) {
                console.log(file);
                if(file.status==202){
                    this.$message({
                        type:'error',
                        message:'文件上传失败!'
                    })
                }else if(file.status==30001){
                    this.$message({
                        type:'error',
                        message:file.msg,
                    })
                }else{
                    if (file.data == null || file.data.length == 0) {
                        this.TEEEtableData=[];
                    } else {
                        this.TEEEtableData = file.data;
                    }
                }
            },
            ajax(){
                this.$http.post(this.url+'/indexColumn/get_index_column',{},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    for(let i=0;i<res.data.data.length;i++) {
                        if (res.data.data[i].status == 1) {
                            res.data.data[i].switchValue = true
                        }else{
                            res.data.data[i].switchValue = false;
                        }
                        res.data.data[i].weightInputShow = false;
                        res.data.data[i].weightInput = '';
                    }
                    this.tableData = res.data.data;
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
        },
        mounted(){
            this.ajax();
        }
    }
</script>
<style scoped>
    .avatar{
        width: 100px;
        height: 100px;
    }
.inputs{
    width: 260px;
}
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
.inputs0 {
    width: 60px;
    height: 30px;
    border-radius: 5px;
}
    .xiaoshou{
        cursor: pointer;
    }
    .aims{
        width: 280px;
    }
</style>