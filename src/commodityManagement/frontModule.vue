<template>
    <!--前台模块-->
    <div class="front-module" style="height: 100%">
        <!--主页面-->
        <div style="height: 100%">
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
                        <el-upload
                                class="upload-demo"
                                :action="urls+'itemModule'"
                                :on-success="handleSuccess"
                                :before-upload="loadPics"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <!--轮播图-->
                    <!--<el-form-item label="模块轮播图" prop="file">-->
                    <!--<p class="redP">请自行编辑1至5张轮播图 , 轮播图片大小为710*334px</p>-->
                    <!--添加轮播图部分-->
                    <el-form ref="Aform0" :model="Aform0" label-width="100px">
                        <p class="redP">请自行编辑1至5张轮播图，轮播图片大小为710*334px</p>
                        <el-form-item label="轮播图 1">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'itemModule'"
                                    :on-success="AhandleSuccess"
                                    :file-list="AfileList0"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
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
                            <el-button @click="Aform0.aims='';Aform0.types='';AfileList0=[]">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="fengefu">*************************************分隔符**************************************</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="Aform1" :model="Aform1" label-width="100px">
                        <el-form-item label="轮播图 2">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'itemModule'"
                                    :on-success="AhandleSuccess1"
                                    :file-list="AfileList1"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
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
                            <el-button @click="Aform1.aims='';Aform1.types='';;AfileList1=[]">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="fengefu">*************************************分隔符**************************************</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="Aform2" :model="Aform2" label-width="100px">
                        <el-form-item label="轮播图 3">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'itemModule'"
                                    :on-success="AhandleSuccess2"
                                    :file-list="AfileList2"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
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
                            <el-button @click="Aform2.aims='';Aform2.types='';;AfileList2=[]">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="fengefu">*************************************分隔符**************************************</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="Aform3" :model="Aform3" label-width="100px">
                        <el-form-item label="轮播图 4">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'itemModule'"
                                    :on-success="AhandleSuccess3"
                                    :file-list="AfileList3"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
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
                            <el-button @click="Aform3.aims='';Aform3.types='';;AfileList3=[]">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="fengefu">*************************************分隔符**************************************</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="Aform4" :model="Aform4" label-width="100px">
                        <el-form-item label="轮播图 5">
                            <el-upload
                                    class="upload-demo"
                                    :action="urls+'itemModule'"
                                    :on-success="AhandleSuccess4"
                                    :file-list="AfileList4"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
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
                            <el-button @click="Aform4.aims='';Aform4.types='';;AfileList4=[]">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                    </el-form>
                    <!--</el-form-item>-->
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
                    <el-form-item>
                        <!--el-button在执行@click时 带有validate属性时 需要在外面加上el-form-item 否则不识别-->
                        <div style="text-align: center">
                            <el-button type="primary" @click="sure('ruleForm')">保存</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--table-->
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    style="width: 100%;"
                    max-height="470"
            >
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
                        <img :src="scope.row.itemModuleImageUrl" width="40" height="40" style="margin-top: 10px"/>
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
                        <span @click="weight(scope.row,scope.$index)"
                              class="xiaoshou">{{scope.row.itemModuleSort}}</span>
                        <input v-show="scope.row.inputShow" v-focus v-model="scope.row.weightInput"
                               @blur="blurWeight(scope.row,scope.$index)" class="iw">
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
            <!--设置品牌弹框-->
            <el-dialog title="设置品牌" :visible.sync="dialogFormVisible2" top="5vh" width="500">
                <el-form :model="ruleForm2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="模块名称 : " prop="name2">
                        <p>{{ruleForm2.name2}}</p>
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
                        <div style="text-align: center">
                            <el-button type="primary" @click="sure2('ruleForm2',tableData)">保存</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--设置轮播图弹框-->
            <el-dialog title="设置轮播图" :visible.sync="dialogFormVisible4" top="5vh">
                <div class="pics">
                    <p class="redP">轮播图片大小为710*334px</p>
                    <el-form ref="Tform0" :model="Tform0" label-width="80px" class="forms">
                        <el-form-item label="轮播图 1">
                            <el-upload
                                    class="upload-demo ws"
                                    :action="urls+'itemModule'"
                                    :on-success="ThandleSuccess"
                                    :file-list="TfileList0"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Tform0.types" @change="types0">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Tform0.aims" class="aims"></el-input>
                            <el-button @click="Tform0.aims='';Tform0.types='';TfileList0=[]">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="fengefu">*************************************分隔符**************************************</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="Tform1" :model="Tform1" label-width="80px" class="forms">
                        <el-form-item label="轮播图 2">
                            <el-upload
                                    class="upload-demo ws"
                                    :action="urls+'itemModule'"
                                    :on-success="ThandleSuccess1"
                                    :file-list="TfileList1"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Tform1.types" @change="types1">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Tform1.aims" class="aims"></el-input>
                            <el-button @click="Tform1.aims='';Tform1.types='';TfileList1=[]">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="fengefu">*************************************分隔符**************************************</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="Tform2" :model="Tform2" label-width="80px" class="forms">
                        <el-form-item label="轮播图 3">
                            <el-upload
                                    class="upload-demo ws"
                                    :action="urls+'itemModule'"
                                    :on-success="ThandleSuccess2"
                                    :file-list="TfileList2"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Tform2.types" @change="types2">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Tform2.aims" class="aims"></el-input>
                            <el-button @click="Tform2.aims='';Tform2.types='';TfileList2=[]">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="fengefu">*************************************分隔符**************************************</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="Tform3" :model="Tform3" label-width="80px" class="forms">
                        <el-form-item label="轮播图 4">
                            <el-upload
                                    class="upload-demo ws"
                                    :action="urls+'itemModule'"
                                    :on-success="ThandleSuccess3"
                                    :file-list="TfileList3"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Tform3.types" @change="types3">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Tform3.aims" class="aims"></el-input>
                            <el-button @click="Tform3.aims='';Tform3.types='';TfileList3=[]">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="fengefu">*************************************分隔符**************************************</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="Tform4" :model="Tform4" label-width="80px" class="forms">
                        <el-form-item label="轮播图 5">
                            <el-upload
                                    class="upload-demo ws"
                                    :action="urls+'itemModule'"
                                    :on-success="ThandleSuccess4"
                                    :file-list="TfileList4"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="绑定类型">
                            <el-radio-group v-model="Tform4.types" @change="types4">
                                <el-radio label="DISCOUNT">二级页</el-radio>
                                <el-radio label="GOODSDETAIL">商品详情</el-radio>
                                <el-radio label="GOODSLIST">商品列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="目标Id">
                            <el-input v-model="Tform4.aims" class="aims"></el-input>
                            <el-button @click="Tform4.aims='';Tform4.types='';TfileList4=[]">清空</el-button>
                            <span class="redP">(注意 : 请不要输入空格)</span>
                        </el-form-item>
                    </el-form>
                    <div style="text-align: center">
                        <el-button type="primary" @click="sure4(tableData)">保存</el-button>
                    </div>
                </div>
                <!--<el-form :model="ruleForm4" ref="ruleForm4" label-width="100px">-->
                <!--<el-form-item label="设置轮播图" prop="file">-->
                <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--:action="urls"-->
                <!--:before-upload="loadPics4"-->
                <!--:on-success="handleSuccess4"-->
                <!--:on-remove="handleRemove4"-->
                <!--:file-list="fileList4"-->
                <!--list-type="picture">-->
                <!--<el-button size="small" type="primary">点击上传</el-button>-->
                <!--<div slot="tip" class="el-upload__tip">请自行编辑1至5张轮播图，只能上传jpg/png文件，且不超过500kb-->
                <!--</div>-->
                <!--</el-upload>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                <!--<el-button type="primary" @click="sure4('ruleForm4',tableData)">保存</el-button>-->
                <!--</el-form-item>-->
                <!--</el-form>-->
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: true,//加载
                //添加轮播图
                AmarqueeArr: [],//存放轮播图数组
                //轮播图第一张
                AfileList0: [],
                Aform0: {
                    types: '',
                    aims:''
                },
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

                //设置轮播图
                marqueeArr: [],//存放轮播图数组
                //轮播图第一张
                TfileList0: [],
                Tform0: {
                    types: '',
                    aims:''
                },
                Tform1: {types: '',aims:''},
                Tform2: {types: '',aims:''},
                Tform3: {types: '',aims:''},
                Tform4: {types: '',aims:''},
                typeVal0: '',//绑定类型1
                marqueeUrl0: '',//接收后台返回图片url
                //轮播图第二张
                TfileList1: [],
                typeVal1: '',//绑定类型2
                marqueeUrl1: '',//接收后台返回图片url1
                //轮播图第三张
                TfileList2: [],
                typeVal2: '',//绑定类型3
                marqueeUrl2: '',//接收后台返回图片url2
                //轮播图第四张
                TfileList3: [],
                typeVal3: '',//绑定类型3
                marqueeUrl3: '',//接收后台返回图片url3
                //轮播图第五张
                TfileList4: [],
                typeVal4: '',//绑定类型4
                marqueeUrl4: '',//接收后台返回图片url4

                fileList: [],//模块图片
//                urls: 'http://116.62.165.6/Image/upload_image/itemModule',//action中图片路径
                picsUrl: 'http://116.62.165.6/',//保存时图片路径
                isShow: true,
                value1: [],//添加 穿梭框默认选中第几个
                value2: [],// 设置品牌
//                table
                tableData: [{}],
                fileList3: [],//设置二级类目图片
                dialogFormVisible: false,//添加
                dialogFormVisible2: false,//设置品牌
                dialogFormVisible4: false,//设置轮播图
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
                    }]
                },//添加*号提示
                ruleForm2: {name2: ''},//设置品牌
                ruleForm3: {secondClassPics: ''},//设置二级类目
                data1: [],//添加穿梭框
                data2: [],//设置品牌穿梭框
                arr1: [],//添加穿梭框
                arr2: [],//设置品牌穿梭框
                arr3: [],//设置品牌穿梭框右边
                str: '',//设置品牌数组转字符串
                index: '',//下标
                runIndex: '',//轮播图id
                brandsIndex: '',//品牌下标
                runUrlArr: [],//轮播图路径拼接地址
                sortable: true,//权重排序
                secondClassIndex: '',//二级类目下标
                aditUrl1: '',//单张图片传给后台url
                setSecondUrlArr: [],//设置二级类目单张图片
                openOrClose: Number,//开关
            };
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
            //权重
            weight(rows, index) {
                console.log(rows, index);
                rows.inputShow = true;
                rows.weightInput = rows.itemModuleSort;//默认
            },
            blurWeight(rows, index) {
                if (rows.weightInput == rows.itemModuleSort) {
                    rows.inputShow = false;
                } else {
                    this.$http.post(this.url + '/itemModule/update_itemModule', {
                        itemModuleId: rows.itemModuleId,
                        itemModuleSort: rows.weightInput,
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res);
                        if (res.data.status == 200) {
                            //刷新
                            this.ajax();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '修改失败!'
                            })
                        }
                        rows.inputShow = false;
                    }, function (err) {
                        this.$message({
                            type: 'error',
                            message: '服务器连接中断,请联系后台人员!',
                        });
                    });
                }
            },
            //点击编辑按钮
            adit(rows, index) {
                this.$router.push({
                    path: '/FMadit',
                    query: {id: rows},
                });
            },
            //添加按钮(请求所有品牌)
            add() {
                //清空轮播图
                for (let i = 0; i < 5; i++) {
                    this['AfileList' + i] = [];
                    this['Aform' + i].types = '';
                    this['Aform' + i].aims = '';
                }
                this.ruleForm.name = '';//清空名称
                this.ruleForm.weight = '';//清空权重
                this.fileList = [];//清空模块图片
                this.arr1 = [];
                console.log(this.arr1);
                this.value1 = [];//清空穿梭框右侧
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
                }, function (err) {
                    this.$message({
                        type: 'error',
                        message: '服务器连接中断,请联系后台人员!',
                    });
                });
                this.dialogFormVisible = true;
            },
            //设置品牌按钮
            brands(rows, index) {
                this.brandsIndex = index;
                this.ruleForm2.name2 = rows.itemModuleName;
                this.dialogFormVisible2 = true;
                this.$http.post(this.url + '/brand/selectAll_brand', {}, {emulateJSON: true}).then(function (res) {
                        let temp = res.data.data;
                        this.data2 = [];
                        temp.forEach((item, index) => {
                            this.data2.push({
                                label: item.brandName,
                                key: item.brandId,
                            });
                        });
                    }, function (err) {
                        this.$message({
                            type: 'error',
                            message: '服务器连接中断,请联系后台人员!',
                        });
                    });
                this.$http.post(this.url + '/itemModule/select_itemModuleBrand', {itemModuleId: rows.itemModuleId}, {emulateJSON: true}).then(function (res) {
                    if (res.data.status == 200 && res.data.data == null) {
                        this.value2 = [];
                    } else if (res.data.status == 200 && res.data.data != null) {
                        this.arr3 = [];
                        for (let i = 0; i < res.data.data.brands.length; i++) {
                            this.arr3.push(res.data.data.brands[i].brandId)
                        }
                        this.value2 = this.arr3;
                    }
                }, function (err) {
                    this.$message({
                        type: 'error',
                        message: '服务器连接中断,请联系后台人员!',
                    });
                });
            },
            //设置二级类目按钮
            secondClass(rows, index) {
                this.$router.push({path: '/setSecond', query: {da: rows.itemModuleName, ha: rows.itemModuleId}})
                this.secondClassIndex = index;
                this.ruleForm3.mainClassName = rows.itemModuleName;
            },
            //设置轮播图按钮
            setRunPics(rows, index) {
                for (let i = 0; i < 5; i++) {
                    this['TfileList' + i] = [];
                    this['Tform' + i].types = '';
                    this['Tform' + i].aims = '';
                }
                console.log(rows, index);
                this.runIndex = index;
                this.dialogFormVisible4 = true;
                this.marqueeArr = [];
                let arr = rows.urls;
                let long = arr.length;
                if (long === 0) {
                    return;
                } else {
                    for (let key in arr) {
                        console.log(arr[key].imageUrl);
                        this['TfileList' + key].push({url: arr[key].imageUrl});
                        this['Tform' + key].types = arr[key].type.toString();
                        this['Tform' + key].aims = arr[key].typeId;
                    }
                }
            },
            //删除按钮
            deletes(rows, index) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/itemModule/del_itemModuleBrand', {itemModuleId: this.tableData[index].itemModuleId}, {emulateJSON: true}).then(function (res) {
//                        console.log(res);
                        if (res.data.status == 200) {
                            //刷新
                            this.ajax();
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!',
                            });
                        }
                    }, function (err) {
                        this.$message({
                            type: 'error',
                            message: '服务器连接中断,请联系后台人员!',
                        });
                    });
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                });
            },
            //添加确定按钮
            sure(formName) {
                if (this.fileList.length == 0) {
                    this.$message({
                        message: '请选择模块图片!',
                        type: 'warning'
                    });
                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.AmarqueeArr = [];
                            for (let i = 0; i < 5; i++) {
                                let obj = {};
                                let aa = 'AfileList' + i;
                                console.log(aa);
                                let Arr = this[aa];
                                console.log(Arr);
                                if (Arr.length != 0) {
                                    obj.imageUrl = Arr[0].url;
                                    obj.type = this['Aform' + i].types;
                                    obj.typeId = this['Aform' + i].aims;
                                    this.AmarqueeArr.push(obj);
                                    console.log(this.AmarqueeArr);
//                                    for (let i = this.AmarqueeArr.length - 1; i >= 0; i--) {
//                                        if (this.AmarqueeArr[i].type == '') {
//                                            this.AmarqueeArr.splice(i, 1);
//                                        }
//                                    }
                                    console.log(this.AmarqueeArr);
                                } else {
                                }
                            }
                            console.log(this.AmarqueeArr);
                            console.log(this.arr1);
                            //去重
                            let newArr1 = [];
                            for (var i = 0; i < this.arr1.length; i++) {
                                if (newArr1.indexOf(this.arr1[i]) < 0) {
                                    newArr1.push(this.arr1[i]);
                                }
                            }
                            this.$http.post(this.url + '/itemModule/add_itemModule', {
                                itemModuleName: this.ruleForm.name,
                                itemModuleLevel: 1,
                                itemModuleImageUrl: this.a,
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
                                    //刷新
                                    this.ajax();
                                } else {
                                    this.$message({
                                        message: '添加失败!',
                                        type: 'error'
                                    });
                                }
                            }, function (err) {
                                this.$message({
                                    type: 'error',
                                    message: '服务器连接中断,请联系后台人员!',
                                });
                            })
                        } else {
                            this.$message({
                                message: '请完善信息',
                                type: 'warning'
                            });
                            return false;
                        }
                        ;
                    });
                }
            },
            //设置品牌确定
            sure2(form, tableData) {
                this.str = this.value2.join(',');
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
                }, function (err) {
                    this.$message({
                        type: 'error',
                        message: '服务器连接中断,请联系后台人员!',
                    });
                })
                this.arr3 = [];//清空右侧
                this.dialogFormVisible2 = false;
            },
            //设置轮播图确定
            sure4(tableData) {
                this.marqueeArr = [];
                for (let i = 0; i < 5; i++) {
                    let obj = {};
                    let aa = 'TfileList' + i;
                    console.log(aa);
                    let Arr = this[aa];
                    console.log(Arr);
                    if (Arr.length != 0) {
                        obj.imageUrl = Arr[0].url;
                        obj.type = this['Tform' + i].types;
                        obj.typeId = this['Tform' + i].aims;
                        this.marqueeArr.push(obj);
                        console.log(this.marqueeArr);
//                        for (let i = this.marqueeArr.length - 1; i >= 0; i--) {
//                            if (this.marqueeArr[i].type == '') {
//                                this.marqueeArr.splice(i, 1);
//                            }
//                        }
                    } else {
//                        return;
                    }
                }
                console.log(this.marqueeArr);
                this.$http.post(this.url + '/itemModule/update_itemModule', {
                    itemModuleId: tableData[this.runIndex].itemModuleId,
                    imageUrls: JSON.stringify(this.marqueeArr),
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    if (res.data.status == 200) {
                        this.dialogFormVisible4 = false;
                        this.$message({
                            type: 'success',
                            message: '保存成功!'
                        });
                        //刷新
                        this.ajax();
                        this.marqueeArr = [];
                    }
                }, function (err) {
                    this.$message({
                        type: 'error',
                        message: '服务器连接中断,请联系后台人员!',
                    });
                });
                console.log(this.marqueeArr);
            },
            //table是否启用
            handleClick(rows) {
                console.log(rows);
                console.log(rows.itemModuleStatus);
                if (rows.itemModuleStatus == true) {
                    this.openOrClose = 1;
                    this.$message({
                        type: 'success',
                        message: '开启成功!'
                    });
                } else {
                    this.openOrClose = 0;
                    this.$message({
                        type: 'success',
                        message: '关闭成功!'
                    });
                }
                this.$http.post(this.url + '/itemModule/update_itemModule', {
                    itemModuleId: rows.itemModuleId,
                    itemModuleStatus: this.openOrClose,//开关
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    //刷新
                    this.ajax();
                }, function (err) {
                    this.$message({
                        type: 'error',
                        message: '服务器连接中断,请联系后台人员!',
                    });
                });
            },
            //穿梭框
            handleChange1(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
                this.arr1.push(value);
            },
            handleChange2(value, direction, movedKeys) {
//                console.log(value, direction, movedKeys);
                this.arr2 = value;
                console.log(this.arr2);
            },
            //添加限制上传模块图片个数
            loadPics(file) {
                if (this.fileList.length > 0) {
                    console.log(this.fileList.length);
                    this.$message({
                        type: 'error',
                        message: '最多上传1张图片',
                        duration: 1000
                    })
                    return false
                }
            },
            handleSuccess(response, file, fileList) {
                console.log(response.data.url);
                this.a = response.data.url;
                var bb = response.data.url;
                this.runUrlArr.push(bb);
                this.fileList = fileList
            },
            //编辑限制上传模块图片个数
            loadPics1(file) {
                if (this.fileList1.length > 0) {
                    console.log(this.fileList1.length);
                    this.$message({
                        type: 'error',
                        message: '最多上传1张图片',
                    })
                    return false
                }
            },
            handleSuccess1(response, file, fileList) {
                this.a = response.data.url;
                this.fileList1 = fileList;
            },
            //设置二级类目
            loadPics3(file) {
                if (this.fileList3.length > 0) {
                    this.$message({
                        type: 'error',
                        message: '最多上传1张图片',
                    })
                    return false
                }
            },
            handleSuccess3(response, file, fileList) {
                console.log(response.data.url);
                this.setSecondUrlArr.push(response.data.url);
                console.log(this.setSecondUrlArr);
            },
            //添加轮播图部分
            handleRemove() {
            },
            //轮播图第一张
            AhandleSuccess(file) {
                console.log(file.data.url);
                this.AmarqueeUrl0 = file.data.url;
                this.AfileList0 = [];
                let obj = {};
                obj.url = file.data.url;
                this.AfileList0.push(obj);
            },
            Atypes0(val) {
                console.log(val);
                this.AtypeVal0 = val;
            },
            //轮播图第二张
            AhandleSuccess1(file) {
                console.log(file.data.url);
                this.AmarqueeUrl1 = file.data.url;
                this.AfileList1 = [];
                let obj = {};
                obj.url = file.data.url;
                this.AfileList1.push(obj);
                console.log(this.AfileList1);
            },
            Atypes1(val) {
                console.log(val);
                this.AtypeVal1 = val;
            },
            //轮播图第三张
            AhandleSuccess2(file) {
                console.log(file.data.url);
                this.AmarqueeUrl2 = file.data.url;
                this.AfileList2 = [];
                let obj = {};
                obj.url = file.data.url;
                this.AfileList2.push(obj);
            },
            Atypes2(val) {
                console.log(val);
                this.AtypeVal2 = val;
            },//单选
            //轮播图第四张
            AhandleSuccess3(file) {
                console.log(file.data.url);
                this.AmarqueeUrl3 = file.data.url;
                this.AfileList3 = [];
                let obj = {};
                obj.url = file.data.url;
                this.AfileList3.push(obj);
            },
            Atypes3(val) {
                console.log(val);
                this.AtypeVal3 = val;
            },//单选
            //轮播图第五张
            AhandleSuccess4(file) {
                console.log(file.data.url);
                this.AmarqueeUrl4 = file.data.url;
                this.AfileList4 = [];
                let obj = {};
                obj.url = file.data.url;
                this.AfileList4.push(obj);
            },
            Atypes4(val) {
                console.log(val);
                this.AtypeVal4 = val;
            },//单选

            //设置轮播图部分
            //轮播图第一张
            ThandleSuccess(file) {
                console.log(file.data.url);
                this.marqueeUrl0 = file.data.url;
                this.TfileList0 = [];
                let obj = {};
                obj.url = file.data.url;
                this.TfileList0.push(obj);
            },
            types0(val) {
                console.log(val);
                this.typeVal0 = val;
            },
            //轮播图第二张
            ThandleSuccess1(file) {
                console.log(file.data.url);
                this.marqueeUrl1 = file.data.url;
                this.TfileList1 = [];
                let obj = {};
                obj.url = file.data.url;
                this.TfileList1.push(obj);
                console.log(this.TfileList1);
            },
            types1(val) {
                console.log(val);
                this.typeVal1 = val;
            },
            //轮播图第三张
            ThandleSuccess2(file) {
                console.log(file.data.url);
                this.marqueeUrl2 = file.data.url;
                this.TfileList2 = [];
                let obj = {};
                obj.url = file.data.url;
                this.TfileList2.push(obj);
            },
            types2(val) {
                console.log(val);
                this.typeVal2 = val;
            },//单选
            //轮播图第四张
            ThandleSuccess3(file) {
                console.log(file.data.url);
                this.marqueeUrl3 = file.data.url;
                this.TfileList3 = [];
                let obj = {};
                obj.url = file.data.url;
                this.TfileList3.push(obj);
            },
            types3(val) {
                console.log(val);
                this.typeVal3 = val;
            },//单选
            //轮播图第五张
            ThandleSuccess4(file) {
                console.log(file.data.url);
                this.marqueeUrl4 = file.data.url;
                this.TfileList4 = [];
                let obj = {};
                obj.url = file.data.url;
                this.TfileList4.push(obj);
            },
            types4(val) {
                console.log(val);
                this.typeVal4 = val;
            },//单选
            //ajax
            ajax() {
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
                        res.data.data[i].weightInput = '';
                    }
                    this.tableData = res.data.data;
                    this.loading = false;
                }, function (err) {
                    this.$message({
                        type: 'error',
                        message: '服务器连接中断,请联系后台人员!',
                    });
                });
            }
        },
        mounted() {
            this.ajax();
        },
        deactivated() {
            this.$destroy()
        },
    }
</script>

<style scoped>
    .fengefu{
        color: lightsteelblue;
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

    .ws {
        width: 300px;
    }

    .iw {
        width: 50px;
        height: 30px;
        border-radius: 5px;
    }

    .aims {
        width: 300px;
    }
</style>