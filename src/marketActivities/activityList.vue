<template>
    <!--活动列表-->
    <div class="activity-list">
        <el-tabs type="border-card" @tab-click="tabs">
            <el-tab-pane label="满减活动">
                <div>
                    <el-row :gutter="12" style="margin-bottom: 8px">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-button @click="createdActivty">创建满减活动</el-button>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <span class="spans0">活动ID</span>
                                <el-input placeholder="请输入活动ID" v-model="activityId"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <span class="spans1">活动名称</span>
                                <el-input placeholder="请输入活动名称" v-model="activityName"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content bg-purple">
                                <el-button type="primary" @click="inquiry">查询</el-button>
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
                            ref="supplierTable"
                            :data="tableData"
                            border
                            @selection-change="handleSelectionChange"
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                width="55"
                                :selectable='checkboxInit'
                        >
                        </el-table-column>
                        <el-table-column
                                prop="activityId"
                                label="活动ID"
                                width="90px"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="activityName"
                                label="活动名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="activityStart"
                                label="开始时间"
                                width="160"

                        >
                            <template slot-scope="scope">
                                <span>{{scope.row.activityStart | time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="activityEnd"
                                label="结束时间"
                                width="160"
                        >
                            <template slot-scope="scope">
                                <span>{{scope.row.activityEnd | time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="活动状态"
                                width="100"
                        >
                            <template slot-scope="scope">
                                <span class="redP">{{scope.row.status}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="320"
                        >
                            <template slot-scope="scope">
                                <div style="display: flex">
                                    <el-button type="text" size="small" @click="adit1(scope.row,scope.$index)">基础页面
                                    </el-button>
                                    <span>|</span>
                                    <el-button type="text" size="small" @click="adit2(scope.row,scope.$index)">
                                        优惠内容及门槛
                                    </el-button>
                                    <span>|</span>
                                    <el-button type="text" size="small" @click="adit3(scope.row,scope.$index)">绑定spu
                                    </el-button>
                                    <span>|</span>
                                    <el-button type="text" size="small" @click="delet(scope.row,scope.$index)">删除
                                    </el-button>
                                    <div v-show="scope.row.status=='进行中'?true:false">
                                        <span>|</span>
                                        <el-button type="text" size="small" @click="stop(scope.row,scope.$index)">终止活动
                                        </el-button>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--基础页面弹框-->
                    <el-dialog title="编辑基础页面" :visible.sync="dialogTableVisible">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                                 class="demo-ruleForm">
                            <el-form-item label="活动名称" prop="activityName">
                                <el-input v-model="ruleForm.activityName" class="setWidths inputs"
                                          placeholder="最多10个字" :disabled="disableds"></el-input>
                            </el-form-item>
                            <el-form-item label="开始时间">
                                <el-date-picker
                                        :disabled="disableds"
                                        @change="startTimes"
                                        v-model="startTime0"
                                        type="datetime"
                                        :clearable="clearable"
                                        placeholder="请选择开始时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间">
                                <el-date-picker
                                        :disabled="disableds"
                                        @change="endTimes"
                                        v-model="endTime0"
                                        type="datetime"
                                        :clearable="clearable"
                                        placeholder="请选择结束时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="活动描述" prop="activityDsc">
                                <el-input v-model="ruleForm.activityDsc" type="textarea" class="setWidths inputs"
                                          placeholder="请输入活动描述" :disabled="disableds"></el-input>
                            </el-form-item>
                            <el-form-item label="活动对象" prop="activityObject">
                                <el-radio-group v-model="ruleForm.activityObject" :disabled="disableds">
                                    <el-radio label="ALL">所有人</el-radio>
                                    <el-radio label="MEMBER">会员</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button  @click="sure('ruleForm')" type="primary">保存
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                    <!--分页-->
                    <div class="block">
                        <el-button type="primary" :disabled="wholeDeletDisabled" @click="wholeDelet">批量删除</el-button>
                        <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10]"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="arr.length">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="早十晚八">
                <div>
                    <el-row :gutter="12" style="margin-bottom: 8px">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-button @click="TcreatedActivty">创建早十晚八活动</el-button>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <span class="spans0">活动ID</span>
                                <el-input placeholder="请输入活动ID" v-model="TactivityId"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <span class="spans1">活动名称</span>
                                <el-input placeholder="请输入活动名称" v-model="TactivityName"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content bg-purple">
                                <el-button type="primary" @click="Tinquiry">查询</el-button>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content bg-purple">
                                <el-button type="primary" @click="Tclears">清除条件</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <!--table-->
                    <el-table
                            ref="supplierTable"
                            :data="TtableData"
                            highlight-current-row
                            border
                            @selection-change="ThandleSelectionChange"
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="activityId"
                                label="活动ID"
                                width="90px"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="activityName"
                                label="活动名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="activityStart"
                                label="开始时间"
                        >
                            <template slot-scope="scope">
                                <span>{{scope.row.activityStart | time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="activityEnd"
                                label="结束时间"
                        >
                            <template slot-scope="scope">
                                <span>{{scope.row.activityEnd | time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="活动状态"
                                width="100px"
                        >
                            <template slot-scope="scope">
                                <span class="redP">{{scope.row.status}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="240"
                        >
                            <template slot-scope="scope">
                                <div style="display: flex">
                                    <el-button type="text" size="small" @click="Tadit1(scope.row,scope.$index)">基础页面
                                    </el-button>
                                    <span> | </span>
                                    <el-button type="text" size="small" @click="Tadit3(scope.row,scope.$index)">绑定spu
                                    </el-button>
                                    <span> | </span>
                                    <el-button type="text" size="small" @click="Tdelet(scope.row,scope.$index)">删除
                                    </el-button>
                                    <div v-show="scope.row.status=='进行中'?true:false">
                                        <span> | </span>
                                        <el-button type="text" size="small" @click="Tstop(scope.row,scope.$index)">终止活动
                                        </el-button>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页-->
                    <div class="block">
                        <el-button type="primary" :disabled="TwholeDeletDisabled" @click="TwholeDelet">批量删除</el-button>
                        <el-pagination
                                @current-change="ThandleCurrentChange"
                                :current-page="TcurrentPage"
                                :page-sizes="[10]"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="Tarr.length">
                        </el-pagination>
                    </div>
                    <!--早十晚八基础页面弹框-->
                    <el-dialog title="创建基础页面" :visible.sync="TdialogTableVisible" top="5vh">
                        <el-form :model="TruleForm" :rules="Trules" ref="TruleForm" label-width="100px"
                                 class="demo-ruleForm">
                            <el-form-item label="活动名称" prop="activityName">
                                <el-input v-model="TruleForm.activityName" class="setWidths inputs"
                                          placeholder="最多10个字" :disabled="disabled2"></el-input>
                            </el-form-item>
                            <el-form-item label="活动图片">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls+'templet'"
                                        :on-success="handleSuccess1"
                                        :show-file-list="false"
                                >
                                    <img :src="imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="开始时间">
                                <el-date-picker
                                        :disabled="disabled2"
                                        class="tws"
                                        @change="TstartTimes"
                                        v-model="TstartTime0"
                                        type="date"
                                        :clearable="clearable"
                                        placeholder="请选择开始日期">
                                </el-date-picker>
                                <el-select v-model="Tvalue1" placeholder="请选择时间" class="tws" :disabled="disabled2" @change="Tvalue1Change">
                                    <el-option
                                            v-for="item in Toptions1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <!--<el-form-item label="结束时间">-->
                            <!--<el-date-picker-->
                            <!--class="tws"-->
                            <!--@change="TendTimes"-->
                            <!--v-model="TendTime0"-->
                            <!--type="date"-->
                            <!--:clearable="clearable"-->
                            <!--placeholder="请选择结束日期">-->
                            <!--</el-date-picker>-->
                            <!--<el-select v-model="Tvalue2" placeholder="请选择时间" class="tws">-->
                            <!--<el-option-->
                            <!--v-for="item in Toptions2"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                            <!--</el-form-item>-->
                            <el-form-item label="活动描述" prop="activityDsc">
                                <el-input v-model="TruleForm.activityDsc" type="textarea" class="setWidths inputs"
                                          placeholder="请输入活动描述" :disabled="disabled2"></el-input>
                            </el-form-item>
                            <el-form-item label="活动对象" prop="activityObject">
                                <el-radio-group v-model="TruleForm.activityObject" :disabled="disabled2">
                                    <el-radio label="ALL">所有人</el-radio>
                                    <el-radio label="MEMBER">会员</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button style="margin-top: 12px;" @click="Tsure('TruleForm')" type="primary">保存
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                    <!--编辑限时活动-->
                    <el-dialog title="编辑基础页面" :visible.sync="TaditDialogTableVisible" top="5vh">
                    <el-form :model="TruleForm" :rules="Trules" ref="TruleForm" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="activityName">
                    <el-input v-model="TruleForm.activityName" class="setWidths inputs"
                    placeholder="最多10个字"></el-input>
                    </el-form-item>
                    <el-form-item label="活动图片">
                    <el-upload
                    class="upload-demo"
                    :action="urls+'templet'"
                    :on-success="handleSuccess1"
                    :show-file-list="false"
                    >
                    <img  :src="imageUrl" class="avatar" style="width: 100px;height: 100px;" >
                    </el-upload>
                    </el-form-item>
                    <el-form-item label="开始时间">
                    <el-date-picker
                    class="tws"
                    @change="TstartTimes"
                    v-model="TstartTime0"
                    type="date"
                    :clearable="clearable"
                    placeholder="请选择开始日期">
                    </el-date-picker>
                    <el-select v-model="Tvalue1" placeholder="请选择时间" class="tws">
                    <el-option
                    v-for="item in Toptions1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="活动描述" prop="activityDsc">
                    <el-input v-model="TruleForm.activityDsc" type="textarea" class="setWidths inputs"
                    placeholder="请输入活动描述"></el-input>
                    </el-form-item>
                    <el-form-item label="活动对象" prop="activityObject">
                    <el-radio-group v-model="TruleForm.activityObject">
                    <el-radio label="ALL">所有人</el-radio>
                    <el-radio label="MEMBER">会员</el-radio>
                    </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                    <el-button style="margin-top: 12px;" @click="Taditsure('TruleForm')" type="primary">保存
                    </el-button>
                    </el-form-item>
                    </el-form>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="限时活动">
                <limitTime></limitTime>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import limitTime from '../marketActivities/limitTime.vue'

    export default {
        components: {limitTime},
        name:'activityList',
        data() {
            return {
                TaditDialogTableVisible:false,
                disableds: false,
                disabled2:false,
//                urls: 'http://47.96.154.252:8088/Image/upload_image/templet',//action中图片路径-brand
                imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',//添加上传图片默认样式
                //早十晚八部分
                TactivityId: '',
                TactivityName: '',
                Trules: {
                    activityName: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 2, max: 16, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                    ],
                    activityDsc: [
                        {required: true, message: '请输入活动描述', trigger: 'blur'},
                    ],
                    activityObject: [
                        {required: true, message: '请选择活动对象', trigger: 'change'}
                    ],
                },
                TruleForm: {
                    activityName: '',
                    activityDsc: '',
                    activityObject: '',
                    value1: '',
                    value2: '',
                },
                TstartTime0: '',
//                TendTime0: '',
                TdialogTableVisible: false,//弹框
                Tvalue1: '',//开始时间
//                Tvalue2: '',//结束时间
                Tstarttime: '',
                Toptions1: [
                    {
                        value: '0',
                        label: '10:00:00'
                    },
                    {
                        value: '1',
                        label: '14:00:00'
                    },
                    {
                        value: '2',
                        label: '20:00:00'
                    },
                ],
                Toptions2: [
                    {
                        value: '0',
                        label: '08:00:00'
                    },
                    {
                        value: '1',
                        label: '10:00:00'
                    },
                ],
                TtableData: [],
                TcurrentPage: 1,//分页
                Tarr: [],
                TwholeDeletDisabled: true,
                TmultipleSelection: [],//多选


                tableData: [],
                currentPage: 1,
                arr: [],//分页
                formLabelWidth: '120px',
                dialogTableVisible: false,//基础页面
//                基础页面
                ruleForm: {
                    activityName: '',
                    activityDsc: '',
                    activityObject: '',
                    value1: '',
                    value2: '',
                },
                clearable: false,//时间不可清除
                rules: {
                    activityName: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 2, max: 16, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                    ],
                    activityDsc: [
                        {required: true, message: '请输入活动描述', trigger: 'blur'},
                    ],
                    activityObject: [
                        {required: true, message: '请选择活动对象', trigger: 'change'}
                    ],
                },
                row: {},
                startTime0: '',
                endTime0: '',
                starttime: '',
                endtime: '',
                multipleSelection: [],//多选
                wholeDeletDisabled: true,//批量删除变灰
                activityId: '',//活动id
                activityName: '',//活动名称
                a: '',
            }
        },
        methods: {
            //清除条件
            clears(){
                this.activityId = '';
                this.activityName = '';
            },
            Tclears(){
                this.TactivityId = '';
                this.TactivityName = '';
            },
            //默认变灰
            checkboxInit(row,index){
                if (row.bt==1){
                    return 0;//不可勾选
                }else{
                    return 1;//可勾选
                }
            },
            //早十晚八
            tabs(val) {
                console.log(val);
                if (val.index == "1") {
                    //清空
                    this.TactivityId = '';
                    this.TactivityName = '';
                    this.TcurrentPage = 1;
                    this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
                } else if(val.index=="0"){
                    //清空
                    this.activityId = '';
                    this.activityName = '';
                    this.currentPage = 1;
                    this.ajaxAll(this.currentPage, this.activityId, this.activityName);
                }else if(val.index=="2"){
                    this.$http.post(this.url + '/activity/getActivityList', {
                        page: 1,
                        num: 10,
                        activityId:  this.activityId,
                        activityName: this.activityName,
                        activityType:'ANY_TIME',//不变
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.data == null || res.data.data.length == 0||res.data.data.pageList==null) {
                            this.TtableData = [];
                            this.Tarr.length = 0;
                        } else {
                            for (let i = 0; i < res.data.data.pageList.length; i++) {
                                res.data.data.pageList[i].number = i + 1;
                                let status = res.data.data.pageList[i].status;
                                if (status == 0) {
                                    res.data.data.pageList[i].status = '还未进行'
                                } else if (status == 1) {
                                    res.data.data.pageList[i].status = '进行中'
                                } else if (status == 2) {
                                    res.data.data.pageList[i].status = '已结束'
                                }else if(status == 3){
                                    res.data.data.pageList[i].status = '正在预热'
                                }else if(status == 4){
                                    res.data.data.pageList[i].status = '未完成编辑'
                                }else{
                                    res.data.data.pageList[i].status = ''
                                }
                            }
                            this.TtableData = res.data.data.pageList;
                            this.Tarr.length = res.data.data.pageTotal;
                        }
                    })
                }
            },
            //图片上传
            handleSuccess1(response, file) {
                this.imageUrl = response.data.url;
            },
            //分页
            ThandleCurrentChange(val) {
                this.TcurrentPage = val;
                this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
            },
            //多选
            ThandleSelectionChange(val) {
                this.TmultipleSelection = val;
                if (this.TmultipleSelection.length == 0) {
                    this.TwholeDeletDisabled = true;
                } else {
                    this.TwholeDeletDisabled = false;
                }
            },
            //选择时间
            Tvalue1Change(val) {
                console.log(val);
                console.log(this.Tvalue1);
            },
            //编辑基础页面
            Tadit1(row, index) {
                console.log(row);
                let str = this.formatDate(row.activityStart);
                let str00 = str.substring(11);
                this.$nextTick(() => {
                    if (str00 === '10:00:00') {
                        this.Tvalue1 = '0';
                    } else if (str00 === '14:00:00') {
                        this.Tvalue1 = '1'
                    } else {
                        this.Tvalue1 = '2'
                    }
                })
//                this.TactivityId = row.activityId;
                this.disabled2 = true;
                this.row = row;
                this.imageUrl = row.activityImage;
                this.TaditDialogTableVisible = true;
                this.TruleForm.activityName = row.activityName;//活动名称
                this.TstartTime0 = row.activityStart;//活动开始时间
                this.Tvalue1 = row.type;
                this.TruleForm.activityDsc = row.activityDesc;//活动描述
                this.TruleForm.activityObject = row.activityTarget;//活动对象
            },
            Taditsure(TformName) {
                this.$refs[TformName].validate((valid) => {
                    if (valid) {
                        if (this.TstartTime0 == '' || this.Tvalue1 == '') {
                            this.$message({
                                type: 'warning',
                                message: '请完善时间!'
                            })
                        } else {
                            if (this.imageUrl == 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png') {
                                this.$message({
                                    type: 'warning',
                                    message: '请上传图片!'
                                })
                            } else {
                                let aa = this.formatDate(this.TstartTime0);
                                let bb = aa.substring(0, 11);
                                this.$http.post(this.url + '/activity/alterActivityList', {
                                    activityImage: this.imageUrl,
                                    activityName: this.TruleForm.activityName,
                                    activityDesc: this.TruleForm.activityDsc,
                                    time: bb,
                                    type: this.Tvalue1,
                                    activityId: this.TactivityId,
                                    activityTarget: this.TruleForm.activityObject,
                                    activityType: 'FLASH_SALE',
                                }, {emulateJSON: true}).then(function (res) {
                                    if (res.data.status == 200) {
                                        this.$message({
                                            type: 'success',
                                            message: '创建成功!'
                                        });
                                        this.TaditDialogTableVisible = false;
                                        //刷新当前页
                                        this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: '操作失败!'
                                        })
                                    }
                                },function (err) {
                                    this.$message({
                                        type:'error',
                                        message:'服务器连接中断,请联系后台人员!',
                                    });
                                });
                            }
                        }
                    } else {
                        return false;
                    }
                });
            },
            //编辑绑定spu
            Tadit3(row, index) {
                this.$router.push({
                    path: '/aditBindSpu2',
                    query: {activityId: row.activityId}
                })
            },
            //Tstop
            Tstop(row, index) {
                this.$confirm('确定终止活动?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/activity/stopActivity', {activityId: row.activityId}, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            //刷新当前页
                            this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName);
                        } else if (res.data.status == 101) {
                            this.$message({
                                type: 'warning',
                                message: '活动已经结束!'
                            });
                        } else if (res.data.status == 103) {
                            this.$message({
                                type: 'warning',
                                message: '不再活动范围!'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '操作失败!'
                            });
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
//                        message: '已取消'
//                    });
                });
            },
            //删除
            Tdelet(row, index) {
                console.log(row);
                let arr = [];
                arr.push(row.activityId)
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/activity/delActivityList', {ids: arr.join(',')}, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //刷新当前页
                            this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
                        } else {
                            this.$message({
                                type: 'error',
                                message:res.data.msg,
                            });
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
            //批量删除
            TwholeDelet() {
                let arr = [];
                for (let i = 0; i < this.TmultipleSelection.length; i++) {
                    arr.push(this.TmultipleSelection[i].activityId);
                }
                console.log(arr);
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/activity/delActivityList', {ids: arr.join(',')}, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //刷新当前页
                            this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
                        } else if (res.data.status == 101) {
                            this.$message({
                                type: 'warning',
                                message: '当前活动' + res.data.data + '正在进行,不可删除!'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
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
            //查询2
            Tinquiry() {
                this.TcurrentPage = 1;
                this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
            },
            //创建早十晚八
            TcreatedActivty() {
                //清空
                this.disabled2 = false;
                this.imageUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                this.TstartTime0 = '';
                this.Tvalue1 = '';
                this.TruleForm.activityName = '';
                this.TruleForm.activityDsc = '';
                this.TruleForm.activityObject = '';
                this.TdialogTableVisible = true;
            },
            //创建早十晚八-sure
            Tsure(TformName) {
                this.$refs[TformName].validate((valid) => {
                    if (valid) {
                        if (this.TstartTime0 == '' || this.Tvalue1 == '') {
                            this.$message({
                                type: 'warning',
                                message: '请完善时间!'
                            })
                        } else {
                            if (this.imageUrl == 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png') {
                                this.$message({
                                    type: 'warning',
                                    message: '请上传图片!'
                                })
                            } else {
                                console.log(this.imageUrl);
                                this.$http.post(this.url + '/activity/addActivitySaleInfo', {
                                    activityImage: this.imageUrl,
                                    activityName: this.TruleForm.activityName,
                                    activityDesc: this.TruleForm.activityDsc,
                                    time: this.Tstarttime,
                                    type: this.Tvalue1,
                                    activityTarget: this.TruleForm.activityObject,
                                    activityType: 'FLASH_SALE',
                                }, {emulateJSON: true}).then(function (res) {
                                    if (res.data.status == 200) {
                                        this.$message({
                                            type: 'success',
                                            message: '创建成功!'
                                        });
                                        this.TdialogTableVisible = false;
                                        //刷新当前页
                                        this.ajax2(this.TcurrentPage, this.TactivityId, this.TactivityName)
                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: '创建失败!'
                                        })
                                    }
                                },function (err) {
                                    this.$message({
                                        type:'error',
                                        message:'服务器连接中断,请联系后台人员!',
                                    });
                                });
                            }
                        }
                    } else {
                        return false;
                    }
                });
            },
            //开始时间
            TstartTimes(val) {
                console.log(val);
                this.Tstarttime = val;
            },
            //结束时间
            TendTimes(val) {
                console.log(val);
            },
            //当前状态
            tableRowClassName({row, rowIndex}) {
                console.log(row, rowIndex);
                if (rowIndex == 1) {
                    console.log('1111');
                    return 'warning-row';
                } else if (rowIndex == 3) {
                    console.log('222');
                    return 'success-row';
                } else {
                    return '';
                    console.log('3333');
                }
            },
//            编辑绑定spu
            adit3(row, index) {
                console.log(row, index);
                console.log(this.currentPage);
                console.log(row.activityId);
                let obj = {};
                obj.row = row;
                obj.currentPage = this.currentPage;
                obj.index = index;
                obj.activityIdInput = this.activityId;
                obj.activityNameInput = this.activityName;
                console.log(obj);
                this.$router.push({
                    path: '/aditBindSpu',
                    query: {obj: obj}
                })
            },
//            查询
            inquiry() {
                this.currentPage = 1;
                this.ajaxAll(this.currentPage, this.activityId, this.activityName)
            },
//            创建活动
            createdActivty() {
                this.$router.push({
                    path: '/createdActivity'
                })
            },
//            编辑基础页面
            adit1(row, index) {
                console.log(row, index);
                this.row = row;
                this.dialogTableVisible = true;
                this.ruleForm.activityName = row.activityName;//活动名称
                this.startTime0 = row.activityStart;//活动开始时间
                this.endTime0 = row.activityEnd;//活动结束时间
                this.ruleForm.activityDsc = row.activityDesc;//活动描述
                this.ruleForm.activityObject = row.activityTarget;//活动对象
                if (row.status == '进行中') {
                    this.disableds = true
                } else {
                    this.disableds = false;
                }
            },
//           开始时间
            startTimes(val) {
                this.starttime = val;
                console.log(val);
            },
            //结束时间
            endTimes(val) {
                this.endtime = val;
                console.log(val);
            },
//            编辑基础页面-确定
            sure(ruleForm) {
                if (this.starttime == '') {
                    this.starttime = this.formatDate(this.startTime0)
                }
                if (this.endtime == '') {
                    this.endtime = this.formatDate(this.endTime0)
                }
                this.$http.post(this.url + '/activity/alterActivityList', {
                    activityId: this.row.activityId,
                    activityName: this.ruleForm.activityName,
                    activityStart: this.starttime,
                    activityEnd: this.endtime,
                    activityTarget: this.ruleForm.activityObject,
                    activityDesc: this.ruleForm.activityDsc,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.status == 200) {
                        this.dialogTableVisible = false;
                        //刷新当前页
                        this.ajaxAll(this.currentPage, this.activityId, this.activityName);
                        this.$message({
                            type: 'success',
                            message: '编辑成功!'
                        })
                    } else if (res.data.status == 104) {
                        this.$message({
                            type: 'warning',
                            message: '活动正在进行,不能修改!'
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '编辑失败!'
                        })
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
//            优惠内容及门槛
            adit2(row, index) {
                console.log(row, index);
                this.$router.push({
                    path: '/discount',
                    query: {row: row},
                })
            },
//            终止活动
            stop(row, index) {
                this.$confirm('确定终止活动?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/activity/stopActivity', {activityId: row.activityId}, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            //刷新当前页
                            this.ajaxAll(this.currentPage, this.activityId, this.activityName);
                        } else if (res.data.status == 101) {
                            this.$message({
                                type: 'warning',
                                message: '活动已经结束!'
                            });
                        } else if (res.data.status == 103) {
                            this.$message({
                                type: 'warning',
                                message: '不再活动范围!'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '操作失败!'
                            });
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
//                        message: '已取消'
//                    });
                });
            },
//            删除
            delet(row, index) {
                console.log(row, index);
                let arr = [];
                arr.push(row.activityId)
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/activity/delActivityList', {ids: arr.join(',')}, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //刷新当前页
                            this.ajaxAll(this.currentPage, this.activityId, this.activityName);
                        } else if (res.data.status == 101) {
                            this.$message({
                                type: 'warning',
                                message: '活动正在进行,不可删除!'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
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
//            多选
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
                if (this.multipleSelection.length == 0) {
                    this.wholeDeletDisabled = true;
                } else {
                    this.wholeDeletDisabled = false;
                }
            },
//            批量删除
            wholeDelet() {
                let arr = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    arr.push(this.multipleSelection[i].activityId);
                }
                console.log(arr);
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/activity/delActivityList', {ids: arr.join(',')}, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //刷新当前页
                            this.ajaxAll(this.currentPage, this.activityId, this.activityName);
                        } else if (res.data.status == 101) {
                            this.$message({
                                type: 'warning',
                                message: '当前活动' + res.data.data + '正在进行,不可删除!'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
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
//            分页
            handleCurrentChange(val) {
                console.log(val);
                console.log('分页');
                this.currentPage = val;
                this.ajaxAll(this.currentPage, this.activityId, this.activityName);
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
//            查询所有
            ajaxAll(a1, a2, a3) {
                this.$http.post(this.url + '/activity/getActivityList', {
                    page: a1,
                    num: 10,
                    activityId: a2,
                    activityName: a3,
                    activityType: 'FULL_CUT',
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.data == null || res.data.data.length == 0) {
                        this.tableData = [];
                        this.arr.length = 0;
                    } else {
                        for (let i = 0; i < res.data.data.pageList.length; i++) {
                            res.data.data.pageList[i].number = i + 1;
                            let status = res.data.data.pageList[i].status;
                            if (status == 0) {
                                res.data.data.pageList[i].status = '还未进行'
                            } else if (status == 1) {
                                res.data.data.pageList[i].status = '进行中'
                            } else if (status == 2) {
                                res.data.data.pageList[i].status = '已结束'
                            }else if(status == 3){
                                res.data.data.pageList[i].status = '正在预热'
                            }else if(status == 4){
                                res.data.data.pageList[i].status = '未完成编辑'
                            }else{
                                res.data.data.pageList[i].status = ''
                            }
                        }
                        this.tableData = res.data.data.pageList;
                        this.arr.length = res.data.data.pageTotal;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
//            ajax2
            ajax2(a1, a2, a3) {
                this.$http.post(this.url + '/activity/getActivityList', {
                    page: a1,
                    num: 10,
                    activityId: a2,
                    activityName: a3,
                    activityType: 'FLASH_SALE',
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.data == null || res.data.data.length == 0) {
                        this.TtableData = [];
                        this.Tarr.length = 0;
                    } else {
                        for (let i = 0; i < res.data.data.pageList.length; i++) {
                            res.data.data.pageList[i].number = i + 1;
                            let status = res.data.data.pageList[i].status;
                            if (status == 0) {
                                res.data.data.pageList[i].status = '还未进行'
                            } else if (status == 1) {
                                res.data.data.pageList[i].status = '进行中'
                            } else if (status == 2) {
                                res.data.data.pageList[i].status = '已结束'
                            }else if(status == 3){
                                res.data.data.pageList[i].status = '正在预热'
                            }else if(status == 4){
                                res.data.data.pageList[i].status = '未完成编辑'
                            }else{
                                res.data.data.pageList[i].status = ''
                            }
                        }
                        this.TtableData = res.data.data.pageList;
                        this.Tarr.length = res.data.data.pageTotal;
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
        },
//        beforeRouteEnter(to, from, next) {
//            next(vm => {
//                /*
//                如果 to.meta.savedPosition === undefined 说明是刷新页面或可以叫第一次进入页面 需要刷新数据
//                如果to.meta.keepAlive === false, 那么说明是需要请求的;
//                此时需要刷新数据，获取新的列表内容。
//                否则的话 什么都不做，直接使用 keep-alive中的缓存
//                */
//                if (from.path == '/aditBindSpu' || from.path == '/discount') {
//
//                } else {
//                    if (to.meta.savedPosition === undefined) {
//                        vm.activityId = '';
//                        vm.activityName = '';
//                        vm.currentPage = 1
//                        vm.ajaxAll(vm.currentPage, '', '');
//                    }
//                    if (!to.meta.keepAlive) {
//                        vm.currentPage=1;
//                        vm.ajaxAll(vm.currentPage,'','');
//                    }
//
//                }
//            })
//        },

        created(){
            this.activityId = '';
            this.activityName = '';
        },
        mounted() {
            this.ajaxAll(1, '', '');
        },
        deactivated() {
            this.$destroy()
        },
    }
</script>

<style scoped>
    .el-table .warning-row {
        background: red;
    }

    .el-table .success-row {
        background: green;
    }

    .activity-list {
        font-size: 14px;
        color: #48576a;
        width: 100%;
    }

    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .spans1 {
        width: 80px;
    }

    .spans0 {
        width: 60px;
    }

    .redP {
        color: red;
    }

    .block {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        padding-left: 8px;
    }

    .inputs {
        width: 300px;
    }

    .tws {
        width: 160px;
    }
</style>
