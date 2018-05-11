<template>
    <!--商品-->
    <div class="commodity">
        <!--主页面-->
        <div v-if="isShow">
            <el-button @click="add">添加组合商品</el-button>
            <el-row  class="el-row2">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="spans1">商品类目</span>
                        <el-select v-model="value1" placeholder="请选择">
                            <el-option
                                    v-for="item in options1"
                                    :key="item.value1"
                                    :label="item.label"
                                    :value="item.value1">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <span class="spans1">商品发货仓</span>
                        <el-select v-model="value3" placeholder="请选择">
                            <el-option
                                    v-for="item in options3"
                                    :key="item.value3"
                                    :label="item.label"
                                    :value="item.value3">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <el-select v-model="value4" placeholder="请选择">
                            <el-option
                                    v-for="item in options4"
                                    :key="item.value4"
                                    :label="item.label"
                                    :value="item.value4">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="3">
                    <el-input placeholder="请输入商品名称"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="highGrade">高级</el-button>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="spans1">排序方式</span>
                        <el-select v-model="value5" placeholder="请选择">
                            <el-option
                                    v-for="item in options5"
                                    :key="item.value5"
                                    :label="item.label"
                                    :value="item.value5">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-button type="primary">查询</el-button>
                        <el-button type="primary">导出</el-button>
                    </div>
                </el-col>
            </el-row>
            <!--高级列表-->
            <el-row  v-if="seen" class="el-row-hg">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="spans1">商品品牌</span>
                        <el-select v-model="value6" placeholder="请选择">
                            <el-option
                                    v-for="item in options6"
                                    :key="item.value6"
                                    :label="item.label"
                                    :value="item.value6">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="spans1">来自国家</span>
                        <el-select v-model="value7" placeholder="请选择">
                            <el-option
                                    v-for="item in options7"
                                    :key="item.value7"
                                    :label="item.label"
                                    :value="item.value7">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="spans1">返利层级</span>
                        <el-select v-model="value8" placeholder="请选择">
                            <el-option
                                    v-for="item in options8"
                                    :key="item.value8"
                                    :label="item.label"
                                    :value="item.value8">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="spans1">商品活动</span>
                        <el-select v-model="value9" placeholder="请选择">
                            <el-option
                                    v-for="item in options9"
                                    :key="item.value9"
                                    :label="item.label"
                                    :value="item.value9">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <!--button按钮系列-->
            <el-row>
                <el-button type="primary">全部商品</el-button>
                <el-button type="primary">上架商品</el-button>
                <el-button type="primary">下架商品</el-button>
            </el-row>

            <!--table-->
            <el-table
                    :data="tableData3"
                    border
                    style="width: 100%"
                    max-height="600">
                <el-table-column
                        fixed
                        prop="internalNumber"
                        label="内部编号"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="shopName"
                        label="商品名称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="classes"
                        label="所属分类"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="averageCostPrice"
                        label="平均成本价"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="originalPrice"
                        label="原价"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="售价"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="sales"
                        label="销量"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="stock"
                        label="库存"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="rate"
                        label="利润比"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="weights"
                        label="权重"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="状态"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="copyLink"
                        label="	复制链接"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        prop="address"
                        label="操作"
                        width="150">
                    <template scope="scope">
                        <el-button type="text" size="small">编辑</el-button>
                        <br>
                        <el-button type="text" size="small">商品组套信息</el-button>
                        <br>
                        <el-button type="text" size="small">查看日志</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--footer-->
            <div class="footer">
                <el-row>
                    <el-checkbox></el-checkbox>
                    <el-button disabled>上架</el-button>
                    <el-button disabled>下架</el-button>
                    <el-button disabled>修改返利</el-button>
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
                </el-row>
            </div>
        </div>
        <!--添加组合商品-->
        <div class="add" v-else="!isShow">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="供应商名称" prop="supplierName">
                    <el-select v-model="ruleForm.supplierName" placeholder="请选择商品分类">
                        <el-option label="分类一" value="feilei1"></el-option>
                        <el-option label="分类二" value="feilei2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="spucode" prop="commodityCode">
                    <el-input v-model="ruleForm.commodityCode"></el-input>
                </el-form-item>
                <el-form-item label="skucode" prop="ruleCode">
                    <el-input v-model="ruleForm.ruleCode"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="commodityName">
                    <el-input v-model="ruleForm.commodityName"></el-input>
                </el-form-item>
                <el-form-item label="sku名称" prop="skuName">
                <el-input v-model="ruleForm.skuName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShow: true,
                seen: false,
                checked2: true,
                tableData3: [{}],
                ruleForm: {
                    supplierName: '',
                    commodityCode: '',
                    ruleCode: '',
                    commodityName: '',
                    skuName: '',
                },
                rules: {
                    supplierName: [
                        {required: true, message: '请输入供应商名称', trigger: 'change'},
                    ],
                    commodityCode: [
                        {required: true, message: '请输入spucode', trigger: 'blur'},
                    ],
                    ruleCode: [
                        {required: true, message: '请输入skucode', trigger: 'blur'},
                    ],
                    commodityName: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                    ],
                    skuName: [
                        {required: true, message: '请输入sku名称', trigger: 'blur'},
                    ],
                },
//                主页面
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                options1: [{
                    value1: '选项一',
                    label: '商品类目一'
                },
                    {
                        value1: '选项二',
                        label: '商品类目二'
                    }
                ],
                options3: [{
                    value3: '选项一',
                    label: '发货仓一'
                },
                    {
                        value3: '选项二',
                        label: '发货仓二'
                    },
                ],
                options4: [{
                    value4: '选项一',
                    label: '啦啦'
                },
                    {
                        value4: '选项二',
                        label: '看看'
                    },
                    {
                        value4: '选项三',
                        label: '本价'
                    },
                ]
            }
        },
//        添加商品
        methods: {
            add() {
                this.isShow = false;
            },
            highGrade() {
                this.seen = !this.seen;//不能用this.seen = true 只是单向的
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.isShow = true;
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

    .spans1 {
        width: 120px;
    }

    .spans0 {
        width: 120px;
    }

    .el-row2 {
        margin: 10px 0;
        text-align: left;
    }

    .el-row-hg {
        margin-bottom: 10px;
    }

    .el-table {
        margin: 10px 0;
    }

    .add {
        width: 500px;
    }

    .footer {
        overflow: hidden;
    }

    .footer .el-row {
        float: left;
    }

    .block {
        padding-left: 380px;
        float: right;
    }
</style>

