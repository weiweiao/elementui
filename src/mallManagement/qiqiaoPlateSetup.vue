<template>
    <!--七巧板设置-->
    <div class="qiqiaoPlate-setup">
        <!--tabs切换-->
        <el-tabs type="border-card">
            <el-tab-pane label="栏目管理">
                <div v-if="isShow">
                    <!--tabs-nav-->
                    <el-row :gutter="24" class="el-row2">
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="spans">时间范围</span>
                                <el-date-picker
                                        v-model="value0"
                                        type="daterange"
                                        placeholder="选择日期范围">
                                </el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple">
                                <span class="spans0">标题</span>
                                <el-input type="primary" placeholder="支持模糊搜索"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content bg-purple">
                                <el-button type="primary">查询</el-button>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content bg-purple">
                                <el-button type="text" @click="addColumn">添加栏目</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <!--table-->
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="number"
                                label="序号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="title"
                                label="栏目标题"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="titleStyle"
                                label="标题样式"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="columnLayout"
                                label="栏目排版"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="columnStyle"
                                label="栏目样式"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="sort"
                                label="排序"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="sortNumber"
                                label="排序编号"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="time"
                                label="创建时间"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="280">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="aditColumn">编辑栏目</el-button>
                                <span>|</span>
                                <el-button type="text" size="small" @click="aditContent">编辑内容</el-button>
                                <!--编辑内容页面-->
                                <el-dialog title="编辑内容" :visible.sync="dialogFormVisible" :modal="false">
                                    <el-form :model="form">
                                        <el-form-item label="排序" class="el-form-item0" :label-width="formLabelWidth">
                                            <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
                                    </div>
                                </el-dialog>
                                <span>|</span>
                                <el-button type="text" size="small" v-popover:popover5 @click="deleteColumn">删除栏目</el-button>
                                <!--删除栏目弹框-->
                                <el-popover
                                        ref="popover5"
                                        placement="top"
                                        width="160"
                                        v-model="visible2">
                                    <p>您确定要删除吗?</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                                        <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                                    </div>
                                </el-popover>
                                <span>|</span>
                                <el-button type="text" size="small" @click="aditSort">排序编辑</el-button>
                                <!--排序编辑页面-->
                                <el-dialog title="栏目排序编辑" :visible.sync="dialogFormVisible" :modal="false">
                                    <el-form :model="form">
                                        <el-form-item label="排序" class="el-form-item0" :label-width="formLabelWidth">
                                            <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
                                    </div>
                                </el-dialog>

                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!--添加栏目-->
                <div v-else="!isShow" class="add-column">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="栏目标题" prop="title">
                            <el-input v-model="ruleForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="标题icon" prop="icon">
                            <el-select v-model="ruleForm.icon" placeholder="请选择图标">
                                <el-option label="图标一" value="first"></el-option>
                                <el-option label="图标二" value="second"></el-option>
                            </el-select>
                    </el-form-item>
                        <el-form-item label="标题颜色" prop="color">
                            <el-color-picker v-model="ruleForm.color"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="上线时间" prop="upTime">
                            <el-checkbox-group v-model="ruleForm.upTime">
                                <el-checkbox label="立即上线" name="upTime"></el-checkbox>
                                <el-checkbox label="自定义时间" name="upTime"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="下线时间" prop="downTime">
                            <el-checkbox-group v-model="ruleForm.downTime">
                                <el-checkbox label="长期" name="downTime"></el-checkbox>
                                <el-checkbox label="自定义时间" name="downTime"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="标题样式" prop="titleStyle">
                            <el-select v-model="ruleForm.titleStyle" placeholder="请选择">
                                <el-option label="选项一" value="first"></el-option>
                                <el-option label="选项二" value="second"></el-option>
                                <el-option label="选项三" value="third"></el-option>
                                <el-option label="选项四" value="forth"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="更多链接" prop="link">
                            <el-input v-model="ruleForm.link"></el-input>
                        </el-form-item>
                        <el-form-item label="边距设置" prop="set">
                            <el-checkbox-group v-model="ruleForm.set">
                                <el-checkbox label="显示" name="set"></el-checkbox>
                                <el-checkbox label="不显示带边距" name="set"></el-checkbox>
                                <el-checkbox label="不显示无边距" name="set"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="栏目样式" prop="columnStyle">
                            <el-select v-model="ruleForm.columnStyle" placeholder="请选择">
                                <el-option label="一列" value="first"></el-option>
                                <el-option label="二列" value="second"></el-option>
                                <el-option label="三列" value="third"></el-option>
                                <el-option label="四列" value="forth"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="活动页管理">
                <div v-if="isSeen">
                <!--tabs-nav-->
                <el-row :gutter="24" class="el-row2">
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <span class="spans">时间范围</span>
                            <el-date-picker
                                    v-model="value0"
                                    type="daterange"
                                    placeholder="选择日期范围">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content bg-purple">
                            <span class="spans0">标题</span>
                            <el-input type="primary" placeholder="支持模糊搜索"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple">
                            <el-button type="primary">查询</el-button>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple">
                            <el-button type="text" @click="addActivity">添加活动页</el-button>
                        </div>
                    </el-col>
                </el-row>
                <!--table-->
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="number"
                            label="序号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="标题"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="link"
                            label="链接"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="创建时间"
                    >
                    </el-table-column>
                    <el-table-column
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" size="small">编辑</el-button>
                            <span>|</span>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </div>
                <!--添加活动页-->
                <div v-else="!isSeen" class="activity-page">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="活动页标题" prop="title">
                            <el-input v-model="ruleForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="活动页内容" prop="content">
                            <el-input v-model="ruleForm.content"></el-input>
                        </el-form-item>
                        <el-form-item label="活动js" prop="js">
                            <el-input v-model="ruleForm.js"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="栏目样式参考">
                <a href="http://imgs3.mxthcdn.com/d/I36pno6io2c3864380045_cKzIxO.png">栏目样式参考</a>
            </el-tab-pane>
        </el-tabs>
        <!--分页-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[30]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="100">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShow: 'true',
                isSeen: 'true',
                visible2: false,
                dialogFormVisible: false,
                value0: '',
                tableData: [{}],
                ruleForm: {
                    title: '',
                    content:'',
                    js:'',
                    icon:'',
                    color: null,
                    downTime:[],
                    upTime:[],
                    set:[],
                    titleStyle:'',
                    link:'',
                    columnStyle:''
                },
                rules: {
                    title: [{ required: true, message: '请输入活动页标题', trigger: 'blur' }],
                    content:[{ required: true, message: '请输入活动页内容', trigger: 'blur' },],

                },
                form:{name:'',}


            }
        },
        methods: {
            addColumn() {
                this.isShow = !this.isShow;
            },
            addActivity(){
                this.isSeen = !this.isSeen;
            },
            deleteColumn(){
                this.visible2 = true;//显示弹框
            },
            aditSort(){
                this.dialogFormVisible = true;
            },
            aditContent(){
                this.dialogFormVisible = true;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.isSeen = !this.isSeen;
                        this.isShow = !this.isShow;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style scoped>
    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .spans0 {
        width: 60px;
    }

    .spans1 {
        width: 120px;
    }

    .spans {
        width: 80px;
    }

    .el-row2 {
        margin-bottom: 10px;
    }

    .el-row4 {
        margin-bottom: 10px;
    }

    .block {
        margin-top: 10px;
        text-align: right;
    }
    .add-column,.activity-page{
        width: 500px;
    }
    .el-form-item0{
        display: flex;
        width: 200px;
    }

</style>

