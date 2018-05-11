<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <span style="width:60px">时间范围 </span>
                    <el-date-picker
                            v-model="value6"
                            @change ="timeChange"
                            type="daterange"
                            range-separator="至"
                            placeholder="选择日期范围">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
            <span class="spans0">店铺编号</span>
            <el-input type="primary" v-model="shopNum"></el-input>
        </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span style="width: 90px;">店主姓名</span>
                    <el-input type="primary" v-model="shopName"></el-input>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span class="spans1">级别</span>
                    <el-select v-model="value" placeholder="请选择" @change="level" :clearable="clearable">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="24" class="el-row2">
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span style="width: 60px">微信号</span>
                    <el-input type="primary" v-model="wechat"></el-input>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span style="width: 60px">手机号</span>
                    <el-input type="primary" v-model="phone"></el-input>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click="inquery">查询</el-button>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click="clears">清除条件</el-button>
                </div>
            </el-col>
        </el-row>
        <!--table-->
        <el-table
                :data="tableData3"
                border
                style="width: 100%;font-size: 12px"
                max-height="600">
            <el-table-column
                             prop="xuhao"
                             label="序号"
                             width="66">
            </el-table-column>
            <el-table-column
                    prop="userId"
                    label="店主编号"
                    >
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="店主姓名"
                    width="120px"
                    >
                <template slot-scope="scope">
                    <div style="text-align: center;display: flex">
                        <img :src="scope.row.headimgurl" alt="pics" style="width: 30px;height: 30px;"><span>{{scope.row.nickname}}({{scope.row.gender}})</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="loginMobile"
                    label="手机"
                    >
            </el-table-column>
            <el-table-column
                    prop="weixinNumber"
                    label="微信号"
                    >
            </el-table-column>
            <el-table-column
                    prop="userMemberRole"
                    label="等级"
                   >
            </el-table-column>
            <el-table-column
                    prop="parentMemberName"
                    label="推荐人"
            >
            </el-table-column>
            <el-table-column
                    prop="flagshipName"
                    label="旗舰店"
                   >
            </el-table-column>
            <el-table-column
                    prop="managerName"
                    label="客户经理"
                   >
            </el-table-column>
            <el-table-column
                    prop="teamName"
                    label="所属团队"
                   >
            </el-table-column>
            <el-table-column
                    prop="gmtLicense"
                    label="注册时间"
            >
                <template slot-scope="scope">
                    <div style="width: 70px;">
                        {{scope.row.gmtLicense | time}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    prop="address"
                    label="操作"
                   >
                <template slot-scope="scope">
                        <el-button @click="detail(scope.row,scope.$index)" style="font-size: 12px" type="text">会员详情</el-button>
                        <br>
                        <!--&lt;!&ndash;会员编辑暂时不用&ndash;&gt;-->
                        <!--<el-button type="text" size="small" @click="adit(scope.row,scope.$index)">会员编辑</el-button>-->
                        <!--<br>-->
                        <!--&lt;!&ndash;暂时无&ndash;&gt;-->
                        <!--<el-button type="text" size="small" @click="downClass(scope.row,scope.$index)">降级</el-button>-->
                        <!--<br>-->
                        <el-button type="text" @click="blacklist(scope.row,scope.$index)" style="font-size: 12px">加入黑名单</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--会员详情弹框-->
        <el-dialog title="会员详情" :visible.sync="dialogTableVisible0" top="5vh" width="70%">
            <el-form :model="form0"  class="fs" size="mini">
                <el-form-item label="微信号 : " :label-width="formLabelWidth">
                    <p  class="fs">{{form0.WeChat}}</p>
                </el-form-item>
                <el-form-item label="头像 : " :label-width="formLabelWidth">
                    <img :src="form0.images" alt="头像" style="width: 80px;height: 80px;">
                </el-form-item>
                <el-form-item label="店主姓名 : " :label-width="formLabelWidth">
                    <span>{{form0.shoperName}}</span>
                    <span style="margin: 0px 20px">真实姓名 : {{form0.trueName}}</span>
                    <span>身份证号 : {{form0.ID}}</span>
                </el-form-item>
                <el-form-item label="手机 : " :label-width="formLabelWidth">
                    <p>{{form0.phone}}</p>
                </el-form-item>
                <el-form-item label="创建时间 : " :label-width="formLabelWidth">
                    <p>{{form0.createTime | time}}</p>
                </el-form-item>
                <el-form-item label="收货地址 : " :label-width="formLabelWidth">
                    <p>{{form0.address}}</p>
                </el-form-item>
                <el-form-item label="等级 : " :label-width="formLabelWidth">
                    <span class="blues">{{form0.level}}</span>
                    <span style="margin: 0px 20px">推荐人: <span class="blues">{{form0.recommender}}</span></span>
                    <span>旗舰店: <span class="blues">{{form0.flagship}}</span></span>
                    <span style="margin-left:20px">所属团队: <span class="blues">{{form0.team}}</span></span>
                </el-form-item>
                <div style="text-align: center">
                    <el-button type="primary" @click="dialogTableVisible0 = false"
                               style="padding: 10px 15px;">返回列表
                    </el-button>
                </div>
            </el-form>
        </el-dialog>
        <!--会员编辑弹框-->
        <el-dialog title="编辑会员" :visible.sync="dialogTableVisible1" top="5vh">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="店主姓名 : " prop="shoperName">
                    <el-input v-model="ruleForm.shoperName" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="微信号 : " prop="weChat">
                    <el-input v-model="ruleForm.weChat" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="手机号 : " prop="phone">
                    <el-input  v-model="ruleForm.phone" class="inputs"></el-input>
                </el-form-item>
                <el-form-item label="性别 : " prop="sex">
                    <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                        <el-option label="未知" value="UNKNOWN"></el-option>
                        <el-option label="男" value="MALE"></el-option>
                        <el-option label="女" value="FEMALE"></el-option>
                    </el-select>
                </el-form-item>
                <div style="margin-left: 50px">
                    <div style="display: flex;justify-content: space-between">
                        <span style="line-height: 35px"><span style="color: red">*</span> 地址 : </span>
                        <el-input  v-model="ruleForm.province" class="inputs1" placeholder="省"></el-input>
                        <el-input  v-model="ruleForm.city" class="inputs1" placeholder="市"></el-input>
                        <el-input  v-model="ruleForm.county" class="inputs1" placeholder="县或区"></el-input>
                    </div>
                    <el-input  v-model="ruleForm.detailAddress" style="width: 400px;margin: 6px 0px 10px 58px;" placeholder="详细地址"></el-input>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="sure1('ruleForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--降级弹框-->
        <el-dialog title="降级" :visible.sync="dialogTableVisible2">
            <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原因 : " prop="origin">
                <el-input v-model="ruleForm1.origin" type="textarea" class="inputs" placeholder="暂时无此功能"></el-input>
            </el-form-item>
                <el-form-item label="">
                    <el-button type="primary">保存</el-button>
                </el-form-item>
        </el-form>
        </el-dialog>
        <!--分页-->
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="arr.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                clearable:true,
                startTime:'',
                endTime:'',
                shopNum:'',//店铺编号
                shopName:'',//店主姓名
                wechat:'',//微信号
                phone:'',//手机号
//                时间选择器
                value6: '',
                tableData3: [],
                options: [
                    {
                    value: 'MANAGER',
                    label: '客户经理'
                }, {
                    value: 'ULTIMATE',
                    label: '旗舰店'
                }, {
                    value: 'NORMAL',
                    label: '1688创业店'
                }, {
                    value: 'FANS',
                    label: '金卡会员199粉丝点'
                }, {
                    value: 'EXPERIENCE',
                    label: '购物满199体验会员'
                }],
                value: '',
//                分页
                currentPage: 1,
                arr:[],
                dialogTableVisible0:false,//会员详情
                dialogTableVisible1:false,//会员编辑
                dialogTableVisible2:false,//降级
                formLabelWidth:'120px',
                form0:{
                    WeChat:'',
                images:'',
                    shoperName:'',
                    trueName:'',
                    ID:'',
                    phone:'',
                    level:'',
                    flagship:'',
                    recommender:'',
                    team:'',
                    createTime:'',
                    address:'',},//会员详情
                ruleForm: {
                    shoperName:'',
                    weChat:'',
                    phone:'',
                    sex:'',
                    address:'',
                    province:'',
                    city:'',
                    county:'',
                    detailAddress:'',
                },//会员编辑
                rules: {
                    shoperName: [
                        { required: true, message: '请输入店主姓名', trigger: 'blur' },
                    ],
                    weChat: [
                        { required: true, message: '请输入微信号', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                },
                ruleForm1:{
                    origin:'',
                },//降级原因
                rules1:{
                    origin:[{ required: true, message: '请输入降级原因', trigger: 'blur' },]
                },
                userId:'',
            }
        },
        methods: {
            //清除条件
            clears(){
                this.value6 = '';
                this.value = '';
                this.shopNum = '';
                this.shopName = '';
                this.wechat = '';
                this.phone = '';
            },
//            级别
            level(val){
                console.log(val);
                console.log(this.value);
            },
//            时间
            timeChange(val){
                console.log(val);
                this.startTime = val.substring(0,10);
                this.endTime = val.substring(13,24);
                console.log(this.startTime);
                console.log(this.endTime);
            },
//            查询
            inquery(){
                this.ajaxInquire(this.currentPage,this.startTime,this.endTime,this.shopNum,this.shopName,this.phone,this.wechat,this.value)
            },
//            会员详情弹框
            detail(row,index){
                console.log(row, index);
                this.dialogTableVisible0 = true;
                this.$http.post(this.url + '/member/getMemberDetail', {userId:row.userId}, {emulateJSON: true}).then(function (res) {
                    console.log(res.data);
                    this.form0.WeChat = res.data.data.weixinNumber;//微信号
                    this.form0.images = res.data.data.headimgurl;//头像
                    this.form0.shoperName = res.data.data.nickname;//店主姓名
                    this.form0.trueName = res.data.data.realname;//真实姓名
                    this.form0.ID = res.data.data.idCardNumber;//身份ID
                    this.form0.phone = res.data.data.loginMobile;//手机
                    this.form0.level = res.data.data.userMemberRole;//等级
                    this.form0.flagship = res.data.data.flagshipName;//旗舰店名
                    this.form0.recommender = res.data.data.parentMemberName;//推荐人
                    this.form0.team = res.data.data.teamName;//团队
                    this.form0.createTime = res.data.data.gmtLicense;//创建时间
                    this.form0.address = res.data.data.address;//地址

                },function (err) {
                    this.$message({
                        type: 'error',
                        message: '服务器连接中断,请联系后台人员!',
                    });
                });
            },
//            会员编辑
            adit(row,index){
                console.log(row, index);
                //清空
                this.ruleForm.shoperName = '';//店主姓名
                this.ruleForm.weChat = '';//微信号
                this.ruleForm.phone = '';//手机号
                this.ruleForm.sex = ' ';//性别
                this.ruleForm.province ='';
                this.ruleForm.city = '';
                this.ruleForm.county = '';
                this.ruleForm.detailAddress = '';

                this.userId = row.userId;
                this.dialogTableVisible1 = true;
                this.$http.post(this.url + '/member/getMemberDetail', {userId:row.userId}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    this.ruleForm.shoperName = res.data.data.nickname;//店主姓名
                    this.ruleForm.weChat = res.data.data.weixinNumber;//微信号
                    this.ruleForm.phone = res.data.data.loginMobile;//手机号
                    this.ruleForm.sex = res.data.data.gender;//性别
                    this.ruleForm.province =res.data.data.provinceName;
                    this.ruleForm.city = res.data.data.cityName;
                    this.ruleForm.county = res.data.data.districtName;
                    this.ruleForm.detailAddress = res.data.data.streetAddress;
                },function (err) {
                    this.$message({
                        type: 'error',
                        message: '服务器连接中断,请联系后台人员!',
                    });
                })
            },
//            adit-sure
            sure1(ruleForm){
                if (this.ruleForm.province == '' ||this.ruleForm.city =='' ||this.ruleForm.county == ''||this.ruleForm.detailAddress==''){
                    this.$message({
                        type:'warning',
                        message:'请完善地址!'
                    })
                }else{
                    this.$refs[ruleForm].validate((valid) => {
                        if (valid) {
                            this.$http.post(this.url + '/member/updateMemberInfo', {
                                userId:this.userId,
                                nickName:this.ruleForm.shoperName,//店主姓名
                                weixinNumber:this.ruleForm.weChat,//微信号
                                loginMobile:this.ruleForm.phone,//手机号
                                gender:this.ruleForm.sex,//性别
                                provinceName:this.ruleForm.province,
                                cityName:this.ruleForm.city,
                                districtName:this.ruleForm.county,
                                streetAddress:this.ruleForm.detailAddress,
                            }, {emulateJSON: true}).then(function (res) {
                                console.log(res);
                                if(res.data.status==200){
                                    this.$message({
                                        type:'success',
                                        message:'编辑成功!'
                                    })
                                    this.dialogTableVisible1 = false;
                                    //刷新当前页
                                    this.ajaxInquire(this.currentPage,this.startTime,this.endTime,this.shopNum,this.shopName,this.phone,this.wechat,this.value)
                                }else{
                                    this.$message({
                                        type:'success',
                                        message:'编辑失败!'
                                    })
                                }
                            },function (err) {
                                this.$message({
                                    type: 'error',
                                    message: '服务器连接中断,请联系后台人员!',
                                });
                            });
                        } else {
                            return false;
                        }
                    });
                }
            },
//            降级
            downClass(row,index){
                console.log(row, index);
                this.dialogTableVisible2 = true;
            },
//           加入黑名单
            blacklist(row,index){
                console.log(row, index);
                this.$confirm('确定加入黑名单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                        this.$http.post(this.url + '/member/setMemberBlackList', {userId:row.userId}, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if(res.data.status==200){
                                this.$message({
                                    type:'success',
                                    message:'操作成功!'
                                })
                                //刷新
                                this.ajaxInquire(this.currentPage,this.startTime,this.endTime,this.shopNum,this.shopName,this.phone,this.wechat,this.value)
                            }else{
                                this.$message({
                                    type:'error',
                                    message:'操作失败!'
                                })
                            }
                        },function (err) {
                            this.$message({
                                type: 'error',
                                message: '服务器连接中断,请联系后台人员!',
                            });
                        });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消'
//                    });
                });
            },
//            分页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.ajaxInquire(this.currentPage,this.startTime,this.endTime,this.shopNum,this.shopName,this.phone,this.wechat,this.value)
            },
//            ajaxInquire
            ajaxInquire(a1,a2,a3,a4,a5,a6,a7,a8){
                this.$http.post(this.url + '/member/getMemberList', {
                    page:a1,
                    num:10,
                    startTime:a2,
                    endTime:a3,
                    userId:a4,
                    nickName:a5,
                    loginMobile:a6,//手机号
                    weixinNumber:a7,
                    userMemberRole:a8,//级别
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null){
                        this.tableData3 = [];
                        this.arr.length = 0;
                    }else{
                        for(let i=0;i<res.data.data.pageList.length;i++){
                            console.log(i);
                            if (this.currentPage == 1){
                                res.data.data.pageList[i].xuhao = i+1;
                            }else {
                                res.data.data.pageList[i].xuhao = (this.currentPage-1)*10+i+1
                            }
//                        判断性别
                            if(res.data.data.pageList[i].gender=='FEMALE'){
                                res.data.data.pageList[i].gender='女'
                            }else if(res.data.data.pageList[i].gender=='MALE'){
                                res.data.data.pageList[i].gender='男'
                            }else{
                                res.data.data.pageList[i].gender='未知'
                            }
//                        判断等级
                            if(res.data.data.pageList[i].userMemberRole=='MANAGER'){
                                res.data.data.pageList[i].userMemberRole='客户经理'
                            }else if(res.data.data.pageList[i].userMemberRole=='ULTIMATE'){
                                res.data.data.pageList[i].userMemberRole='旗舰店'
                            }else if(res.data.data.pageList[i].userMemberRole=='NORMAL'){
                                res.data.data.pageList[i].userMemberRole='1688创业店'
                            }else if(res.data.data.pageList[i].userMemberRole=='FANS'){
                                res.data.data.pageList[i].userMemberRole='金卡会员199粉丝店'
                            }else if(res.data.data.pageList[i].userMemberRole=='EXPERIENCE'){
                                res.data.data.pageList[i].userMemberRole='购物满199体验会员'
                            }else{
                                res.data.data.pageList[i].userMemberRole = '无'
                            }
                        }
                        this.tableData3 = res.data.data.pageList;
                        this.arr.length = res.data.data.pageTotal;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
        },
        mounted(){
           this.ajaxInquire(1,'','','','','','','');
        }
    };
</script>

<style scoped>
    .el-cascader__label {
        height: 0px;
    }
    /**/
    .grid-content {
        display: flex;
        line-height: 36px;
    }
    .spans0 {
        width: 80px;
    }
    .spans1 {
        width: 40px;
    }
    .el-row2 {
        margin: 10px 0;
        text-align: left;
    }
    .block{
        text-align: right;
        margin: 10px 0;
    }
    .blues{
        color: blue;
    }
    .inputs{
        width: 230px;
    }
    .inputs1{
        width: 170px;
    }
    .blues{
        color: blue;
    }
    /*.fs{*/
        /*font-size: 14px;*/
    /*}*/

</style>