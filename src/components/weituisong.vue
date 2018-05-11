<template>
    <!--test-->
    <div>
        <div>
            <el-button @click="add">添加模块</el-button>
            <!--添加模块弹框-->
            <el-dialog title="添加模块" :visible.sync="dialogFormVisible" top="5vh">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="模块名称" prop="name" class="names">
                        <el-input v-model="ruleForm.name" placeholder="最多四个字"></el-input>
                    </el-form-item>
                    <el-form-item label="权重" prop="weight" class="names">
                        <el-input v-model="ruleForm.weight"></el-input>
                    </el-form-item>
                    <!--图片上传-->
                    <el-form-item label="模块图片" prop="file" class="imgs">
                        <p class="redP">图片尺寸大小为00*00px(必选)</p>
                        <el-upload
                                class="upload-demo"
                                :action="urls"
                                :on-success="handleSuccess"
                                :show-file-list="false"
                        >
                            <img :src="imageUrl" class="avatar" style="width: 100px;height: 100px;">
                        </el-upload>
                    </el-form-item>
                    <!--穿梭框-->
                    <el-form-item label="品牌" prop="brands">
                        <el-transfer
                                filterable
                                :titles="['全部', '已选']"
                                filter-placeholder="搜索"
                                v-model="value1"
                                @change="handleChange1"
                                :data="data1">
                        </el-transfer>
                    </el-form-item>
                    <!--添加轮播图部分-->
                    <p class="redP" style="margin-left: 30px">请自行编辑1至5张轮播图，轮播图片大小为710*334px</p>
                    <p class="redP" style="margin-left: 30px;margin-bottom: 5px">注意 : 编辑一张完整的轮播图时 , 图片、绑定类型和目标Id三者缺一不可</p>
                    <div>
                        <!--轮播图1-->
                        <el-form ref="Aform0" :model="Aform0" label-width="100px">
                            <el-form-item label="轮播图 1">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="AhandleSuccess0"
                                        :show-file-list="false"
                                >
                                    <img :src="Aform0.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Aform0.types" @change="Atypes0">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Aform0.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span class="fengefu">***************分隔符****************</span>
                            </el-form-item>
                        </el-form>
                        <!--轮播图2-->
                        <el-form ref="Aform1" :model="Aform1" label-width="100px">
                            <el-form-item label="轮播图 2">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="AhandleSuccess1"
                                        :show-file-list="false"
                                >
                                    <img :src="Aform1.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Aform1.types" @change="Atypes1">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Aform1.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span class="fengefu">***************分隔符****************</span>
                            </el-form-item>
                        </el-form>
                        <!--轮播图3-->
                        <el-form ref="Aform2" :model="Aform2" label-width="100px">
                            <el-form-item label="轮播图 3">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="AhandleSuccess2"
                                        :show-file-list="false"
                                >
                                    <img :src="Aform2.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Aform2.types" @change="Atypes2">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Aform2.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span class="fengefu">***************分隔符****************</span>
                            </el-form-item>
                        </el-form>
                        <!--轮播图4-->
                        <el-form ref="Aform3" :model="Aform3" label-width="100px">
                            <el-form-item label="轮播图 4">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="AhandleSuccess3"
                                        :show-file-list="false"
                                >
                                    <img :src="Aform3.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Aform3.types" @change="Atypes3">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Aform3.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span class="fengefu">***************分隔符****************</span>
                            </el-form-item>
                        </el-form>
                        <!--轮播图5-->
                        <el-form ref="Aform4" :model="Aform4" label-width="100px">
                            <el-form-item label="轮播图 5">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="AhandleSuccess4"
                                        :show-file-list="false"
                                >
                                    <img :src="Aform4.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Aform4.types" @change="Atypes3">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Aform4.aims" class="inputsW"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="sure('ruleForm')">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--table-->
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    max-height="515">
                <el-table-column
                        type="index"
                        label="序号"
                        width="70px"
                >
                </el-table-column>
                <el-table-column
                        prop="itemModuleImageUrl"
                        label="模块图片"
                        width="100px"
                >
                    <template scope="scope">
                        <img :src="scope.row.itemModuleImageUrl" width="40" height="40"/>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="itemModuleName"
                        label="模块名称"
                >
                </el-table-column>
                <el-table-column
                        prop="itemModuleSort"
                        label="权重"
                        sortable
                        width="100px"
                >
                    <template slot-scope="scope">
                        <span @click="weight(scope.row,scope.$index)" class="xiaoshou">{{scope.row.itemModuleSort}}</span>
                        <input style="width: 60px;height: 30px;" v-show="scope.row.inputShow"  v-focus v-model="scope.row.weightInput" @blur="blurWeight(scope.row,scope.$index)">
                    </template>
                </el-table-column>
                <el-table-column prop="itemModuleStatus"
                                 label="是否启用"
                                 width="120px"
                >
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.itemModuleStatus"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="handleClick(scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="gmtCreate"
                        label="创建时间"
                >
                    <template slot-scope="scope">
                        {{scope.row.gmtCreate | time}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operate"
                        label="操作"
                        width="340"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="adit(scope.row,scope.$index)">编辑</el-button>
                        <span>|</span>
                        <el-button type="text" size="small" @click="brands(scope.row,scope.$index)">设置品牌</el-button>
                        <span>|</span>
                        <el-button type="text" size="small" @click="secondClass(scope.row,scope.$index)">设置二级类目
                        </el-button>
                        <span>|</span>
                        <el-button type="text" size="small" @click="setRunPics(scope.row,scope.$index)">设置轮播图
                        </el-button>
                        <span>|</span>
                        <el-button type="text" size="small" @click="deletes(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--编辑弹框-->
            <el-dialog title="编辑模块" :visible.sync="dialogFormVisible1" top="5vh">
                <el-form :model="ruleForm1"  ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="模块名称" prop="name" class="names">
                        <el-input v-model="ruleForm1.name" placeholder="最多四个字"></el-input>
                    </el-form-item>
                    <el-form-item label="权重" prop="weight" class="names">
                        <el-input v-model="ruleForm1.weight"></el-input>
                    </el-form-item>
                    <!--图片上传-->
                    <el-form-item label="模块图片" prop="file" class="imgs">
                        <p class="redP">图片尺寸大小为00*00px</p>
                        <el-upload
                                class="upload-demo"
                                :action="urls"
                                :on-success="BhandleSuccess"
                                :show-file-list="false"
                        >
                            <img :src="BimageUrl" class="avatar" style="width: 100px;height: 100px;">
                        </el-upload>
                    </el-form-item>
                    <!--添加轮播图部分-->
                    <p class="redP" style="margin-left: 30px">请自行编辑1至5张轮播图，轮播图片大小为710*334px</p>
                    <p class="redP" style="margin-left: 30px;margin-bottom: 5px">注意 : 编辑一张完整的轮播图时 , 图片、绑定类型和目标Id三者缺一不可</p>
                    <div>
                        <!--轮播图1-->
                        <el-form ref="Bform0" :model="Bform0" label-width="100px">
                            <el-form-item label="轮播图 1">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="BhandleSuccess0"
                                        :show-file-list="false"
                                >
                                    <img :src="Bform0.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Bform0.types" @change="Btypes0">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Bform0.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span class="fengefu">***************分隔符****************</span>
                            </el-form-item>
                        </el-form>
                        <!--轮播图2-->
                        <el-form ref="Bform1" :model="Bform1" label-width="100px">
                            <el-form-item label="轮播图 2">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="BhandleSuccess1"
                                        :show-file-list="false"
                                >
                                    <img :src="Bform1.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Bform1.types" @change="Btypes1">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Bform1.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span class="fengefu">***************分隔符****************</span>
                            </el-form-item>
                        </el-form>
                        <!--轮播图3-->
                        <el-form ref="Bform2" :model="Bform2" label-width="100px">
                            <el-form-item label="轮播图 3">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="BhandleSuccess2"
                                        :show-file-list="false"
                                >
                                    <img :src="Bform2.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Bform2.types" @change="Btypes2">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Bform2.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span class="fengefu">***************分隔符****************</span>
                            </el-form-item>
                        </el-form>
                        <!--轮播图4-->
                        <el-form ref="Bform3" :model="Bform3" label-width="100px">
                            <el-form-item label="轮播图 4">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="BhandleSuccess3"
                                        :show-file-list="false"
                                >
                                    <img :src="Bform3.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Bform3.types" @change="Btypes3">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Bform3.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span class="fengefu">***************分隔符****************</span>
                            </el-form-item>
                        </el-form>
                        <!--轮播图5-->
                        <el-form ref="Bform4" :model="Bform4" label-width="100px">
                            <el-form-item label="轮播图 5">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="BhandleSuccess4"
                                        :show-file-list="false"
                                >
                                    <img :src="Bform4.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Bform4.types" @change="Btypes3">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Bform4.aims" class="inputsW"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-form-item>
                            <el-button type="primary" @click="BSure()">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--设置品牌弹框-->
            <el-dialog title="设置品牌" :visible.sync="dialogFormVisible2" top="5vh" width="500">
                <el-form :model="ruleForm2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="模块名称 : " prop="name2">
                        <p>{{ruleForm2.name}}</p>
                    </el-form-item>
                    <!--穿梭框-->
                    <el-form-item label="品牌" prop="brands">
                        <el-transfer
                                filterable
                                :titles="['全部', '已选']"
                                filter-placeholder="搜索"
                                @change="handleChange2"
                                v-model="value2"
                                :data="data2">
                        </el-transfer>
                    </el-form-item>
                    <el-form-item>
                        <div style="text-align: right;margin-right: 80px">
                        <el-button type="primary" @click="CSure('ruleForm2',tableData)">保存</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--设置轮播图弹框-->
            <el-dialog title="设置轮播图" :visible.sync="dialogFormVisible3" top="5vh">
                    <p class="redP" style="margin-left: 30px">请自行编辑1至5张轮播图，轮播图片大小为710*334px</p>
                    <p class="redP" style="margin-left: 30px;margin-bottom: 5px">注意 : 编辑一张完整的轮播图时 , 图片、绑定类型和目标Id三者缺一不可</p>
                    <div>
                        <!--轮播图1-->
                        <el-form ref="Cform0" :model="Cform0" label-width="100px">
                            <el-form-item label="轮播图 1">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="ChandleSuccess0"
                                        :show-file-list="false"
                                >
                                    <img :src="Cform0.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Cform0.types" @change="Ctypes0">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Cform0.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span class="fengefu">***************分隔符****************</span>
                            </el-form-item>
                        </el-form>
                        <!--轮播图2-->
                        <el-form ref="Cform1" :model="Cform1" label-width="100px">
                            <el-form-item label="轮播图 2">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="ChandleSuccess1"
                                        :show-file-list="false"
                                >
                                    <img :src="Cform1.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Cform1.types" @change="Ctypes1">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Cform1.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span class="fengefu">***************分隔符****************</span>
                            </el-form-item>
                        </el-form>
                        <!--轮播图3-->
                        <el-form ref="Cform2" :model="Cform2" label-width="100px">
                            <el-form-item label="轮播图 3">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="ChandleSuccess2"
                                        :show-file-list="false"
                                >
                                    <img :src="Cform2.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Cform2.types" @change="Ctypes2">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Cform2.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span class="fengefu">***************分隔符****************</span>
                            </el-form-item>
                        </el-form>
                        <!--轮播图4-->
                        <el-form ref="Cform3" :model="Cform3" label-width="100px">
                            <el-form-item label="轮播图 4">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="ChandleSuccess3"
                                        :show-file-list="false"
                                >
                                    <img :src="Cform3.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Cform3.types" @change="Ctypes3">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Cform3.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span class="fengefu">***************分隔符****************</span>
                            </el-form-item>
                        </el-form>
                        <!--轮播图5-->
                        <el-form ref="Cform4" :model="Cform4" label-width="100px">
                            <el-form-item label="轮播图 5">
                                <el-upload
                                        class="upload-demo"
                                        :action="urls"
                                        :on-success="ChandleSuccess4"
                                        :show-file-list="false"
                                >
                                    <img :src="Cform4.imageUrl" class="avatar" style="width: 100px;height: 100px;">
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="绑定类型">
                                <el-radio-group v-model="Cform4.types" @change="Ctypes3">
                                    <el-radio label="DISCOUNT">活动</el-radio>
                                    <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                    <el-radio label="GOODSLIST">商品列表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="目标Id">
                                <el-input v-model="Cform4.aims" class="inputsW"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <div style="text-align: right;margin-right: 80px">
                                    <el-button type="primary" @click="DSure()">保存</el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
            </el-dialog>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                //设置轮播图部分
                dialogFormVisible3:false,
                CmarqueeArr:[],
                runIndex:Number,
                //轮播图1
                Cform0:{
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                CtypeVal0: '',//绑定类型
                //轮播图2
                Cform1: {
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                CtypeVal1: '',//绑定类型
                //轮播图3
                Cform2: {
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                CtypeVal2: '',//绑定类型
                //轮播图4
                Cform3: {
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                CtypeVal3: '',//绑定类型
                //轮播图5
                Cform4: {
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                CtypeVal4: '',//绑定类型


                //设置品牌
                dialogFormVisible2:false,
                ruleForm2:{name:''},
                value2: [],//设置品牌
                data2:[],
                str:'',
                brandsIndex:Number,
                arr3:[],

                tableData: [],
                openOrClose:Number,//开关
                //添加部分
                imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',//添加模块-模块图片
                urls: 'http://116.62.165.6/Image/upload_image/itemModule',//action中图片路径
                dialogFormVisible: false,//添加-弹框
                data1: [],//添加-穿梭框
                arr1: [],
                value1: [],//添加-穿梭框默认选中第几个
                ruleForm: {
                    name: '',
                    file: '',
                    weight: '',
                    brands: ''
                },//添加
                rules: {
                    name: [{required: true, message: '请输入模块名称', trigger: 'blur'}, {
                        min: 1,
                        max: 4,
                        message: '最多4个字',
                        trigger: 'blur'
                    }],
                    weight: [{required: true, message: '请输入权重', trigger: 'blur'}, {
                        min: 1,
                        max: 4,
                        message: '最多4个字',
                        trigger: 'blur'
                    }],
                },//添加*号提示
                AmarqueeArr: [],//轮播图
                //添加部分-轮播图
                //轮播图1
                Aform0:{
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                AtypeVal0: '',//绑定类型
                //轮播图2
                Aform1: {
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                AtypeVal1: '',//绑定类型
                //轮播图3
                Aform2: {
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                AtypeVal2: '',//绑定类型
                //轮播图4
                Aform3: {
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                AtypeVal3: '',//绑定类型
                //轮播图5
                Aform4: {
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                AtypeVal4: '',//绑定类型
                //编辑部分
                BimageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',//添加模块-模块图片
                dialogFormVisible1:false,//编辑弹框
                itemModuleId:'',//BSure使用
                BmarqueeArr:[],
                ruleForm1: {
                    name: '',
                    file: '',
                    weight: '',
                    brands: ''
                },//添加
                //轮播图1
                Bform0:{
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                BtypeVal0: '',//绑定类型
                //轮播图2
                Bform1: {
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                BtypeVal1: '',//绑定类型
                //轮播图3
                Bform2: {
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                BtypeVal2: '',//绑定类型
                //轮播图4
                Bform3: {
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                BtypeVal3: '',//绑定类型
                //轮播图5
                Bform4: {
                    imageUrl: 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png',
                    types: '',
                    aims: '',
                },
                BtypeVal4: '',//绑定类型

            }
        },
        methods: {
            //设置轮播图按钮
            setRunPics(rows, index) {
                for(let i=0;i<5;i++){
                    this['Cform'+ i].imageUrl='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                    this['Cform'+i].types='';
                    this['Cform'+i].aims='';
                }
                this.runIndex = index;
                this.dialogFormVisible3=true;
                this.CmarqueeArr=[];
                let arr = rows.urls;
                    for (let key in arr){
                        console.log(arr[key].imageUrl);
                        this['Cform'+key].imageUrl=arr[key].imageUrl;
                        this['Cform'+key].types = arr[key].type.toString();
                        this['Cform'+key].aims = arr[key].typeId;
                    }
            },
            DSure(){
                this.CmarqueeArr = [];
                for(let i=0;i<5;i++){
                    console.log(this['Cform' + i].imageUrl);
                    if(this['Cform'+i].imageUrl=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'||this['Cform'+i].types==''||this['Cform'+i].aims==''){

                    }else{
                        let obj={};
                        obj.imageUrl = this['Cform'+i].imageUrl;
                        obj.type = this['Cform'+i].types;
                        obj.typeId = this['Cform'+i].aims;
                        this.CmarqueeArr.push(obj);
                    }
                }
                this.$http.post(this.url + '/itemModule/update_itemModule', {
                    itemModuleId: this.tableData[this.runIndex].itemModuleId,
                    imageUrls: JSON.stringify(this.CmarqueeArr),
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        this.$message({
                            type:'success',
                            message:'保存成功!'
                        });
                        //刷新
                        this.ajax();
                        this.CmarqueeArr=[];
                    }else{
                        this.$message({
                            type:'error',
                            message:'保存失败!'
                        });
                    }
                    this.dialogFormVisible3=false;
                });
            },
            //轮播图1
            Ctypes0(val) {
                console.log(val);
                this.CtypeVal0 = val;
            },
            ChandleSuccess0(response, file) {
                this.Cform0.imageUrl = response.data.url;
            },
            //轮播图2
            Ctypes1(val) {
                console.log(val);
                this.CtypeVal1 = val;
            },
            ChandleSuccess1(response, file) {
                this.Cform1.imageUrl = response.data.url;
            },
            //轮播图3
            Ctypes2(val) {
                console.log(val);
                this.CtypeVal2 = val;
            },
            ChandleSuccess2(response, file) {
                this.Cform2.imageUrl = response.data.url;
            },
            //轮播图4
            Ctypes3(val) {
                console.log(val);
                this.CtypeVal3 = val;
            },
            ChandleSuccess3(response, file) {
                this.Cform3.imageUrl = response.data.url;
            },
            //轮播图5
            Ctypes4(val) {
                console.log(val);
                this.CtypeVal4 = val;
            },
            ChandleSuccess4(response, file) {
                this.Cform4.imageUrl = response.data.url;
            },

            //删除按钮
            deletes(rows, index) {
                this.$confirm('确定删除该模块?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                    this.$http.post(this.url + '/itemModule/del_itemModuleBrand', {itemModuleId: this.tableData[index].itemModuleId}, {emulateJSON: true}).then(function (res) {
                        if (res.data.status == 200) {
                            //刷新
                            this.ajax();
                        } else {
                            this.$message({
                                type:'error',
                                message:'删除失败!'
                            })
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //设置二级类目按钮
            secondClass(rows, index) {
                this.$router.push({path: '/setSecond', query: {da: rows.itemModuleName, ha: rows.itemModuleId}})
            },
            //设置品牌按钮
            brands(rows, index) {
                this.value2=[];
                this.brandsIndex = index;
                this.ruleForm2.name = rows.itemModuleName;
                this.dialogFormVisible2 = true;
                this.$http.post(this.url + '/itemModule/select_itemModuleBrand', {itemModuleId: rows.itemModuleId}, {emulateJSON: true}).then(function (res) {
                    console.log(res.data);
                    if (res.data.status == 200 && res.data.data == null) {
                        this.value2 = [];
                    } else if (res.data.status == 200 && res.data.data != null) {
                        for (let i = 0; i < res.data.data.brands.length; i++) {
                            this.arr3.push(res.data.data.brands[i].brandId)
                        }
                        this.value2 = this.arr3;
                    }
                }),
                    this.$http.post(this.url + '/brand/selectAll_brand', {}, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        let temp = res.data.data;
                        this.data2 = [];
                        temp.forEach((item, index) => {
                            this.data2.push({
                                label: item.brandName,
                                key: item.brandId,
                            });
                        });
                    });
            },
            //设置品牌确定
            CSure(form, tableData) {
                //穿梭框-去重
                let newArr2 = [];
                for (var i = 0; i < this.value2.length; i++) {
                    if (newArr2.indexOf(this.value2[i]) < 0) {
                        newArr2.push(this.value2[i]);
                    }
                }
                this.str = newArr2.join(',');
                this.$http.post(this.url + '/itemModule/itemModule_addBrand', {
                    itemModuleId: tableData[this.brandsIndex].itemModuleId,
                    brandIds: this.str
                }, {emulateJSON: true}).then
                (function (res) {
                    console.log(res);
                    if (res.data.status == 200) {
                        this.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '保存失败!',
                            type: 'warning'
                        });
                    }
                })
                this.arr3 = [];//清空右侧
                this.dialogFormVisible2 = false;
            },
            //设置品牌-穿梭框
            handleChange2(value, direction, movedKeys) {
                this.arr2 = value;
            },



            //添加模块图片
            handleSuccess(response, file) {
                console.log(response, file);
                this.imageUrl = response.data.url;
            },
            //添加-穿梭框
            handleChange1(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
                this.arr1.push(value);
            },
            //轮播图1
            Atypes0(val) {
                console.log(val);
                this.AtypeVal0 = val;
            },
            AhandleSuccess0(response, file) {
                this.Aform0.imageUrl = response.data.url;
            },
            //轮播图2
            Atypes1(val) {
                console.log(val);
                this.AtypeVal1 = val;
            },
            AhandleSuccess1(response, file) {
                this.Aform1.imageUrl = response.data.url;
            },
            //轮播图3
            Atypes2(val) {
                console.log(val);
                this.AtypeVal2 = val;
            },
            AhandleSuccess2(response, file) {
                this.Aform2.imageUrl = response.data.url;
            },
            //轮播图4
            Atypes3(val) {
                console.log(val);
                this.AtypeVal3 = val;
            },
            AhandleSuccess3(response, file) {
                this.Aform3.imageUrl = response.data.url;
            },
            //轮播图5
            Atypes4(val) {
                console.log(val);
                this.AtypeVal4 = val;
            },
            AhandleSuccess4(response, file) {
                this.Aform4.imageUrl = response.data.url;
            },
            //添加按钮
            add() {
                //清空
                this.ruleForm.name = '';
                this.ruleForm.weight = '';
                this.imageUrl = 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                this.value1 = [];//清空穿梭框右侧

                //查询所有品牌-穿梭框
                this.$http.post(this.url + '/brand/selectAll_brand', {}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    let temp = res.data.data;
                    this.data1 = [];
                    temp.forEach((item, index) => {
                        this.data1.push({
                            label: item.brandName,
                            key: item.brandId,
                        });
                    });
                });
                this.dialogFormVisible = true;
            },
            //添加确定按钮
            sure(formName) {
                this.AmarqueeArr = [];
                for(let i=0;i<5;i++){
                    if(this['Aform'+i].imageUrl=='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png'||this['Aform'+i].types==''||this['Aform'+i].aims==''){

                    }else{
                        let obj={};
                        obj.imageUrl = this['Aform'+i].imageUrl;
                        obj.type = this['Aform'+i].types;
                        obj.typeId = this['Aform'+i].aims;
                        this.AmarqueeArr.push(obj);
                        console.log(this.AmarqueeArr);
                    }

                }
                console.log(this.AmarqueeArr);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.imageUrl == 'http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png') {
                            this.$message({
                                type: 'warning',
                                message: '请选择模块图片!'
                            })
                        } else {
                            //穿梭框-去重
                            let newArr1 = [];
                            console.log(this.arr1);
                            for (var i = 0; i < this.arr1.length; i++) {
                                if (newArr1.indexOf(this.arr1[i]) < 0) {
                                    newArr1.push(this.arr1[i]);
                                }
                            }
                            this.$http.post(this.url + '/itemModule/add_itemModule', {
                                itemModuleName: this.ruleForm.name,
                                itemModuleLevel: 1,
                                itemModuleImageUrl: this.imageUrl,
                                itemModuleSort: this.ruleForm.weight,
                                brandIds: newArr1.join(','),
                                imageUrls: JSON.stringify(this.AmarqueeArr),
                            }, {emulateJSON: true}).then(function (res) {
                                if (res.data.status == 200) {
                                    this.$message({
                                        message: '添加成功!',
                                        type: 'success'
                                    });
                                    this.dialogFormVisible = false;
                                    //刷新当前页
                                    this.ajax();
                                } else {
                                    this.$message({
                                        message: '添加失败!',
                                        type: 'error'
                                    });
                                }
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            //adit-模块图片
            BhandleSuccess(response, file) {
                console.log(response, file);
                this.BimageUrl = response.data.url;
            },
            //轮播图1
            Btypes0(val) {
                console.log(val);
                this.BtypeVal0 = val;
            },
            BhandleSuccess0(response, file) {
                this.Bform0.imageUrl = response.data.url;
            },
            //轮播图2
            Btypes1(val) {
                console.log(val);
                this.BtypeVal1 = val;
            },
            BhandleSuccess1(response, file) {
                this.Bform1.imageUrl = response.data.url;
            },
            //轮播图3
            Btypes2(val) {
                console.log(val);
                this.BtypeVal2 = val;
            },
            BhandleSuccess2(response, file) {
                this.Bform2.imageUrl = response.data.url;
            },
            //轮播图4
            Btypes3(val) {
                console.log(val);
                this.BtypeVal3 = val;
            },
            BhandleSuccess3(response, file) {
                this.Bform3.imageUrl = response.data.url;
            },
            //轮播图5
            Btypes4(val) {
                console.log(val);
                this.BtypeVal4 = val;
            },
            BhandleSuccess4(response, file) {
                this.Bform4.imageUrl = response.data.url;
            },
            //编辑
            adit(rows, index) {
                console.log(rows, index);
                this.itemModuleId=rows.itemModuleId;//BSure使用
                this.dialogFormVisible1=true;
                this.ruleForm1.name = rows.itemModuleName;
                this.ruleForm1.weight = rows.itemModuleSort;
                this.BimageUrl = rows.itemModuleImageUrl;
                //清空
                for(let i=0;i<5;i++){
                    this['Bform' + i].imageUrl='http://qqskimage.oss-cn-hangzhou.aliyuncs.com/brand/1516271241514.png';
                    this['Bform'+i].types='';
                    this['Bform'+i].aims='';
                }
                //轮播图回显
                for (let key in rows.urls){
                    this['Bform'+key].imageUrl = rows.urls[key].imageUrl;
                    this['Bform'+key].types = rows.urls[key].type.toString();
                    this['Bform'+key].aims = rows.urls[key].typeId;
                }
            },
            //adit-sure
            BSure(){
                this.BmarqueeArr = [];
                for(let i=0;i<5;i++){
                    if(this['Bform'+i].imageUrl==''||this['Bform'+i].types==''||this['Bform'+i].aims==''){

                    }else{
                        let obj={};
                        obj.imageUrl = this['Bform'+i].imageUrl;
                        obj.type = this['Bform'+i].types;
                        obj.typeId = this['Bform'+i].aims;
                        this.BmarqueeArr.push(obj);
                        console.log(this.BmarqueeArr);
                    }
                }
                this.$http.post(this.url + '/itemModule/update_itemModule', {
                    itemModuleId: this.itemModuleId,
                    itemModuleName: this.ruleForm1.name,
                    itemModuleImageUrl: this.BimageUrl,
                    itemModuleSort: this.ruleForm1.weight,
                    imageUrls:JSON.stringify(this.BmarqueeArr),
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.status == 200) {
                        this.$message({
                            message: '编辑成功!',
                            type: 'success'
                        });
                        //刷新
                        this.ajax();
                    } else {
                        this.$message({
                            message: '编辑失败!',
                            type: 'warning'
                        });
                    }
                    this.dialogFormVisible1=false;
                });
            },

            //table-权重
            weight(rows,index){
                console.log(rows, index);
                rows.inputShow=true;
                rows.weightInput = rows.itemModuleSort;
            },
            blurWeight(rows,index){
                if(rows.weightInput==''||rows.weightInput==undefined){
                    rows.weightInput = rows.itemModuleSort;
                }else{
                    this.$http.post(this.url + '/itemModule/update_itemModule', {
                        itemModuleId: rows.itemModuleId,
                        itemModuleSort: rows.weightInput,
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            //刷新
                            this.ajax();
                        }else{
                            this.$message({
                                type:'error',
                                message:'修改失败!'
                            })
                        }
                    });
                }
                rows.inputShow=false;
            },
            //table-是否启用
            handleClick(rows) {
                console.log(rows);
                console.log(rows.itemModuleStatus);
                if (rows.itemModuleStatus == true) {
                    this.openOrClose = 1;
                    this.$message({
                        type:'success',
                        message:'开启成功!'
                    });
                } else {
                    this.openOrClose = 0;
                    this.$message({
                        type:'success',
                        message:'关闭成功!'
                    });
                }
                this.$http.post(this.url + '/itemModule/update_itemModule', {
                    itemModuleId: rows.itemModuleId,
                    itemModuleStatus: this.openOrClose,//开关
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    //刷新
                    this.ajax();
                });
            },
            //ajax刷新
            ajax(){
                this.$http.post(this.url + '/itemModule/all_itemModule', {
                    moduleLevel: 1,
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    for (let i = 0; i < res.data.data.length; i++) {
                        //开关
                        if (res.data.data[i].itemModuleStatus == 1) {
                            res.data.data[i].itemModuleStatus = true;
                        } else {
                            res.data.data[i].itemModuleStatus = false;
                        }
                        //权重
                        res.data.data[i].inputShow = false;
                        res.data.data[i].weightInput ='';
                    }
                    this.tableData = res.data.data;
                });
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
        created() {
            this.ajax();
        }
    }
</script>

<style scoped>
    .inputsW{
        width: 400px;
    }
    .xiaoshou {
        cursor: pointer;
    }
    .redP {
        color: red;
    }

    .el-table {
        margin: 10px 0;
    }

    .imgs, .names {
        width: 400px;
    }

    .el-upload__tip {
        color: darkcyan;
    }
</style>
