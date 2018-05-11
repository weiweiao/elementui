<template>
    <!--编辑素材模块-->
    <div class="find-material">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title" class="inputs"></el-input>
            </el-form-item>
            <el-form-item label="所属话题" prop="topic">
                <el-checkbox-group
                        @change="checkboxChange"
                        v-model="ruleForm.topic">
                    <el-checkbox v-for="item in items" :label="item.topicId" :key="item.topicId">{{item.topicName}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="文字" prop="words">
                <el-input type="textarea" v-model="ruleForm.words" class="inputs"></el-input>
            </el-form-item>
            <el-form-item label="添加内容" prop="addContent">
                <el-radio-group v-model="ruleForm.addContent" @change="addContent">
                    <el-radio label="添加图片" value="1">添加图片</el-radio>
                    <el-radio label="添加视频" value="0">添加视频</el-radio>
                </el-radio-group>
            </el-form-item>
            <!--添加图片显示-->
            <el-form-item label="" v-if="picsShow">
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
                                <img :src="arr[0]" class="avatar">
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
                                <img :src="arr[1]" class="avatar">
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
                                <img :src="arr[2]" class="avatar">
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
                                <img :src="arr[3]" class="avatar">
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
                                <img :src="arr[4]" class="avatar">
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
                                <img :src="arr[5]" class="avatar">
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
                                <img :src="arr[6]" class="avatar">
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
                                <img :src="arr[7]" class="avatar">
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
                                <img :src="arr[8]" class="avatar">
                            </el-upload>
                            <div style="text-align: center">图片 9 </div>
                        </li>
                    </ul>
                    <!--<el-button @click="aa">点击给后台</el-button>-->
                    <!--<el-button @click="bb">查询</el-button>-->
                </div>
                <!--<pics></pics>-->
            </el-form-item>
            <!--添加视频显示-->
            <el-form-item label="" v-if="videoShow">
                <div style="text-align: center;width: 200px;">
                    <el-upload
                            class="upload-demo"
                            action="http://116.62.165.6/video/upload_video/topicVideo"
                            :on-success="handleSuccessVideo"
                            :show-file-list="false"
                    >
                            <video :src="imgUrlVideo" width="200" height="100" style="border: 1px solid red" controls autobuffer>
                                <source :src="imgUrlVideo" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
                            </video>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item label="绑定类型" prop="bindType">
                <!--<el-select v-model="ruleForm.bindType" placeholder="请选择" @change="bindType">-->
                    <!--<el-option-->
                            <!--v-for="item in options"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
                <el-radio-group v-model="ruleForm.bindType" @change="bindType">
                    <el-radio label="ACTIVITY" value="0">绑定活动</el-radio>
                    <el-radio label="PRODUCT" value="1">绑定商品</el-radio>
                </el-radio-group>
            </el-form-item>
            <!--绑定商品显示弹框-->
            <el-dialog title="绑定商品" :visible.sync="dialogTableVisible" top="5vh" @close="layerClose">
                <el-row>
                    <el-col :span="9" style="margin-right: 20px">
                        <div class="grid-content bg-purple" style="display: flex;justify-content: space-between">
                            <span style="width: 70px;line-height: 36px">spucode</span>
                            <el-input placeholder="请输入spucode" v-model="spucode"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="9">
                        <div class="grid-content bg-purple" style="display: flex;justify-content: space-between">
                            <span style="width: 70px;line-height: 36px">商品名称</span>
                            <el-input placeholder="请输入商品名称" v-model="spuName"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple" style="padding-left: 30px">
                            <el-button type="primary" @click="inquirySP">查询</el-button>
                        </div>
                    </el-col>
                </el-row>
                <p class="redP" style="margin: 5px 0">只能选择绑定一个商品</p>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        border
                        style="width: 100%;"
                        max-height="440"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="productImageUrl"
                            label="商品图片"
                            width="120">
                        <template slot-scope="scope">
                            <img :src="scope.row.productImageUrl" alt="图片无" style="width: 50px;height: 50px;margin-top: 10px">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="spuCode"
                            label="spucode"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="productId"
                            label="productId"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="productName"
                            label="商品名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="商品价格"
                    >
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="block">
                    <el-button @click="bindCommodity" :disabled="bindCommodityDisabled" type="primary">绑定该商品</el-button>
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="30"
                            :total="pageArr.length">
                    </el-pagination>
                </div>
            </el-dialog>
            <!--绑定商品显示-->
            <el-form-item label="" v-show="bindCommodityShow">
                <div v-show="bindCommodityShow" style="text-align: center;width: 200px;">
                    <img :src="imageUrl1" alt="图片无" style="width: 80px;height: 80px;border-radius: 5px" @click="imgClick">
                    <p>{{spName}}</p>
                </div>
            </el-form-item>
            <!--绑定活动显示-->
            <div v-show="bindActivityShow">
                <el-form-item label="活动图片" prop="activityPic">
                    <el-upload
                            class="upload-demo"
                            :action="urls+'find'"
                            :on-success="handleSuccess"
                            :show-file-list="false"
                    >
                        <img :src="imageUrl" class="avatar"
                             style="border-radius: 5px;width: 80px;height: 80px;margin:20px 0 10px 70px">
                    </el-upload>
                </el-form-item>
                <el-form-item label="活动ID" prop="activityID">
                    <el-input class="inputs" v-model="ruleForm.activityID"></el-input>
                </el-form-item>
                <!--<el-form-item label="活动链接" prop="activityLink">-->
                <!--<el-input class="inputs" v-model="ruleForm.activityLink"></el-input>-->
                <!--</el-form-item>-->
            </div>
            <el-form-item label="非会员是否可见" prop="isSeen">
                <el-radio-group v-model="ruleForm.isSeen">
                    <el-radio label="0" value="0">是</el-radio>
                    <el-radio label="1" value="1">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="发布时间" prop="publicTime">
                <el-radio-group v-model="ruleForm.publicTime" @change="publicTime">
                    <el-radio label="1" value="1">立即上线</el-radio>
                    <el-radio label="0" value="0">定时上线</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="设定至" prop="setTime" v-show="timeingOnlineShow">
                <el-date-picker
                        @change="timeChange"
                        v-model="ruleForm.setTime"
                        type="datetime"
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="publish('ruleForm')" type="primary">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import pics from '../find/pics.vue'
    export default {
        components: {pics},
        data() {
            return {
                arr: ["http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png"],
                picsShow: false,//添加图片显示
                videoShow: false,//添加视频显示

                imgUrlVideo: '',
                options: [
                    {label: '-- 请选择 --', value: ''},
                    {label: '绑定商品', value: 'PRODUCT'},
                    {label: '绑定活动', value: 'ACTIVITY'},
                ],//绑定类型
                imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                imageUrl1: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',//绑定商品回显
//                urls: 'http://116.62.165.6/Image/upload_image/find',//图片上传路径===暂时????
                timeingOnlineShow: false,//定时上线-input框显示
                bindActivityShow: false,//绑定活动显示
                dialogTableVisible: false,//绑定商品显示
                tableData: [],
                ruleForm: {
                    activityID: '',//活动ID
                    setTime: '',//设定时间
                    title: '',//标题
                    topic: [],//所属话题
                    addContent: '',//添加内容
                    words: '',//文字
                    bindType: '',//绑定类型
                    isSeen: '',//非会员是否可见
                    publicTime: '',//发布时间
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
//                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    topic: [
                        {type: 'array', required: true, message: '请至少选择一个所属话题', trigger: 'change'}
                    ],
                    addContent: [
                        {required: true, message: '请选择添加内容', trigger: 'change'}
                    ],
                    words: [
                        {required: true, message: '请填写文字', trigger: 'blur'}
                    ],
                    isSeen: [
                        {required: true, message: '请选择是否可见', trigger: 'change'}
                    ],
                    publicTime: [
                        {required: true, message: '请选择发布时间', trigger: 'change'}
                    ],
                },
                currentPage: 1,
                pageArr: [],//分页,
                bindCommodityArr: [],//绑定商品-选中
                bindCommodityDisabled: true,//绑定商品变灰
                bindCommodityShow: false,//绑定商品回显
                items: [],//所属话题
                spucode: '',//spucode
                spuName: '',//商品名称
                selectSPArr:[],//选择一个商品
                spName:'',//商品name
                id:'',
                materialId:'',
                productId:'',
            };
        },
        methods: {
            //绑定商品
            imgClick(){
                this.dialogTableVisible = true;
                    this.ajaxSP(1, '', '');
            },
            //定时上线时间
            timeChange(val){
                this.ruleForm.setTime = val;
            },
//            九张图片
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
            handleSuccess5(file) {
                console.log(file);
                this.$set(this.arr, 5, file.data.url)
            },
            handleSuccess6(file) {
                console.log(file);
                this.$set(this.arr, 6, file.data.url)
            },
            handleSuccess7(file) {
                console.log(file);
                this.$set(this.arr, 7, file.data.url)
            },
            handleSuccess8(file) {
                console.log(file);
                this.$set(this.arr, 8, file.data.url)
            },
            //所属话题多选
            checkboxChange(val) {
                console.log(val);
                console.log(this.ruleForm.topic);
            },
//            发布
            publish(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //判断添加内容-九张图
                        let newArr = [];
                        let flag = 0;
                        for (let i = 0; i < 9; i++) {
                            if (this.arr[i] != 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png') {
                                newArr.push(this.arr[i]);
                                console.log(newArr);
                            } else {
                                flag++;
                            }
                        }
                        console.log(newArr);
                        if(flag==9&&this.ruleForm.addContent=='添加图片'){
                            this.$message({
                                type:'warning',
                                message:'请添加图片!',
                            })
                        }else if(this.imgUrlVideo==''&&this.ruleForm.addContent=='添加视频'){
                            this.$message({
                                type:'warning',
                                message:'请上传视频!',
                            })
                        }else if(this.ruleForm.publicTime == '0'&&(this.ruleForm.setTime==''||this.ruleForm.setTime==undefined)){
                            this.$message({
                                type:'warning',
                                message:'请设置定时上线时间!',
                            })
                        }else{
                            if(this.bindActivityShow == true){
                                this.id = this.ruleForm.activityID;
                            }
                            if(this.bindCommodityShow == true){
                                console.log(this.selectSPArr);
                                if(this.selectSPArr.length==0){
                                    this.id = '';
                                }else{
                                    this.id = this.selectSPArr[0].productId;
                                }
                            }
                            let upTimeSP='';
                            //判断发布时间
                            if (this.ruleForm.publicTime == '1') {
                                upTimeSP = '';//立即上线传''
                            } else {
                                upTimeSP = this.ruleForm.setTime;
                            }
                            console.log(upTimeSP);
                            let arr0 = [];
                            if(this.id==''||this.id==undefined||this.id==null){

                            }else{
                                arr0.push(this.id);
                            }
                            if(this.ruleForm.bindType!='ACTIVITY'){
                                this.imageUrl='';
                            }
                            let imageUrl;
                            if(this.imageUrl=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'){
                                imageUrl='';
                            }else{
                                imageUrl=this.imageUrl;
                            }
                            this.$http.post(this.url + '/material/addMaterial', {
                                materialId: this.materialId,
                                topicIds: JSON.stringify(this.ruleForm.topic),//话题ids ruleForm.topic
                                materialTitle: this.ruleForm.title,//素材标题
                                materialContent: this.ruleForm.words,//素材内容/文字
                                materialImage: JSON.stringify(newArr),//九张图片
                                materialVideo: this.imgUrlVideo,//视频
                                materialType: this.ruleForm.bindType,//类型ruleForm.bindType   ACTIVITY-活动  PRODUCT-商品
                                typeTarget: JSON.stringify(arr0),//活动id
                                activityImage: imageUrl,//活动图片
                                materialLevel: this.ruleForm.isSeen,//是否可见  0是 1否
                                materialStatus: 1,//1发布
                                upTime:upTimeSP,
                            }, {emulateJSON: true}).then(function (res) {
                                console.log(res);
                                if(res.data.status==200){
                                    this.$message({
                                        type:'success',
                                        message:'编辑成功!'
                                    });
                                    this.$router.push({path:'/materialManage'})
                                }else{
                                    this.$message({
                                        type:'success',
                                        message:'编辑失败!'
                                    })
                                }
                            })
                        }

                    } else {
                        return false;
                    }
                });
            },
//            发布时间-定时上线
            publicTime(val) {
                console.log(val);
                if (val == '0') {
                    this.timeingOnlineShow = true;
                    this.ruleForm.setTime = '';
                } else {
                    this.timeingOnlineShow = false;
                }
            },
//            绑定活动图片
            handleSuccess(response, file) {
                console.log(response, file);
                this.imageUrl = response.data.url;
            },
//            绑定类型
            bindType(val) {
                console.log(val);
                if (val == 'ACTIVITY') {
                    this.bindActivityShow = true;
                    this.bindCommodityShow = false;
                    //初始状态
                    this.imageUrl='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                    this.ruleForm.activityID = '';
                } else if (val == 'PRODUCT') {
                    this.bindActivityShow = false;
                    this.bindCommodityShow = true;
                    this.imageUrl1='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                    this.spName = '';
//                    this.dialogTableVisible = true;
//                    this.ajaxSP(1, '', '');
                    this.id = '';
                } else {
                    this.bindCommodityShow = false;
                    this.bindActivityShow = false;
                    //初始状态
                    this.imageUrl='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                    this.ruleForm.activityID = '';
                    this.id = '';
                }
            },
//            绑定商品-选中
            handleSelectionChange(val) {
                console.log(val);
                this.selectSPArr = val;
                this.bindCommodityArr = val;
                if (val.length > 0 && val.length < 2) {
                    this.bindCommodityDisabled = false;
                } else {
                    this.bindCommodityDisabled = true;
                }
            },
//            分页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.ajaxSP(this.currentPage,this.spucode,this.spuName);
            },
//            绑定该商品
            bindCommodity() {
                this.dialogTableVisible = false;
                this.bindCommodityShow = true;
                console.log(this.selectSPArr);
                this.imageUrl1 = this.selectSPArr[0].productImageUrl;
                this.spName = this.selectSPArr[0].productName;
                console.log('999');
            },
//           绑定商品弹框-关闭时
            layerClose() {
                if (this.bindCommodityShow == true) {
                    console.log('1111');
                } else {
                    console.log('22222');
                    this.ruleForm.bindType = '';
                }
            },
//           添加内容
            addContent(val) {
                console.log(val);
                if (val == '添加图片') {
                    this.picsShow = true;
                    this.videoShow = false;
                    this.arr= ["http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png", "http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png"];
                } else {
                    this.videoShow = true;
                    this.picsShow = false;
                    this.imgUrlVideo = '';
                }
            },
            //        添加视频
            handleSuccessVideo(res, file) {
                console.log(res.msg, file);
                this.imgUrlVideo = res.msg;
                console.log(this.imgUrlVideo);
            },
            //查询商品按钮
            inquirySP(){
                this.currentPage = 1;
                this.ajaxSP(this.currentPage,this.spucode,this.spuName)
            },
            //查询商品
            ajaxSP(a1, a2, a3) {
                //查询商品
                this.$http.post(this.url + '/material/getMaterialProduct', {
                    page: a1,
                    num: 30,
                    spuCode: a2,
                    productName: a3,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null||res.data.data.pageList==null){
                        this.tableData = [];
                        this.pageArr.length = 0;
                    }else{
                        this.tableData = res.data.data.pageList;
                        this.pageArr.length = res.data.data.pageTotal;
                    }
                })
            }
        },
        mounted() {
            this.$http.post(this.url+'/material/getSetMaterial',{materialId:this.materialId},{emulateJSON:true}).then(function (res) {
                console.log(res);
                if(res.data.data.mpList==null||res.data.data.mpList.length==0){

                }else{
                    this.selectSPArr.push(res.data.data.mpList[0]);
                    this.productId = res.data.data.mpList[0].productId;
                }
                this.ruleForm.title = res.data.data.materialTitle;//标题
                for(let i=0;i<res.data.data.mtList.length;i++){
                    console.log(res.data.data.mtList);
                    this.ruleForm.topic.push(res.data.data.mtList[i].topicId);
                };//所属话题
                this.ruleForm.words = res.data.data.materialContent;//文字
                this.ruleForm.isSeen = res.data.data.materialLevel.toString();//非会员是否可见
                if(res.data.data.upTime!=''||res.data.data.upTime!=null){
                    this.ruleForm.publicTime = '0'//定时上线upTime
                    this.$nextTick(()=>{
                        this.ruleForm.setTime = res.data.data.upTime;
                    })
                }else{
                    this.ruleForm.publicTime = '1'//立即上线
                };//发布时间
                this.ruleForm.bindType = res.data.data.materialType;//绑定类型
                this.$nextTick(()=>{
                this.imageUrl = res.data.data.activityImage;//活动图片
                    let arr1 = JSON.parse(res.data.data.typeTarget);
                    this.ruleForm.activityID = arr1[0];//活动id
                });
                this.$nextTick(()=>{
                    if(res.data.data.mpList==null){

                    }else{
                        this.imageUrl1 = res.data.data.mpList[0].productImageUrl;//商品图片
                        this.spName = res.data.data.mpList[0].productName;//商品名称
                    }
                });
                //添加内容
                console.log(res.data.data.materialImage);
                //有问题
                if(res.data.data.materialImage==null){
                    this.ruleForm.addContent='添加视频';
                }else{
                    this.ruleForm.addContent='添加图片';
                }
//                if(res.data.data.materialImage!=null){
//                    this.ruleForm.addContent='添加图片';
////                    this.$nextTick(()=>{
////                        let arr=JSON.parse(res.data.data.materialImage);
////                        for(let i=0;i<arr.length;i++){
////                            this.$set(this.arr,i,arr[i])
////                        }
////                        console.log(this.arr);
////                    })
//                }
//                if(res.data.data.materialVideo != ''||res.data.data.materialVideo!=null){
//                    this.ruleForm.addContent='添加视频';
////                    this.imgUrlVideo = res.data.data.materialVideo;
//                }
            })
        },
        created() {
            console.log(this.$route.query.row.materialId);
            this.materialId = this.$route.query.row.materialId;
            //查询话题
            this.$http.post(this.url + '/material/getMaterialTopics', {}, {emulateJSON: true}).then(function (res) {
                console.log(res);
                if(res.data.data==null||res.data==null){
                    this.items = [];
                }else{
                    this.items = res.data.data;
                }
                console.log(this.items);
            });
        }
    }
</script>

<style scoped>
    .ulPics {
        display: flex;
        list-style: none;
    }

    .liPics {
        margin-right: 25px;
    }

    .avatar {
        width: 80px;
        height: 80px;
        border-radius: 5px;
    }

    .inputs {
        width: 300px;
    }

    .block {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
    }

    .redP {
        color: red;
    }
</style>

