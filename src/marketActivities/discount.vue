<template>
    <!--优惠-->
    <div>
        <el-button @click="add">添加</el-button>
        <el-table
                :data="tableData0"
                border
                class="table"
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="序号"
                    width="88">
            </el-table-column>
            <el-table-column
                    prop="activityCondition"
                    label="优惠条件"
            >
            </el-table-column>
            <el-table-column
                    prop="activitySill"
                    label="优惠门槛">
                <template slot-scope="scope">
                    {{scope.row.activitySill + '件'}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="detail"
                    label="优惠内容详情">
                <template slot-scope="scope">
                    <p>{{scope.row.first}}</p>
                    <p>{{scope.row.second}}</p>
                    <p>{{scope.row.third}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="adit(scope.row,scope.$index)">编辑</el-button>
                    <span>|</span>
                    <el-button type="text" @click="delets(scope.row,scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--添加弹框-->
        <el-dialog title="添加" :visible.sync="dialogFormVisible0">
            <el-form v-for="data,indexs0 in datas" :class="indexs0>0?'bt':'bb'"
                     style="padding-left: 70px;padding-top: 15px;">
                <el-form-item label="优惠条件">
                    <el-radio v-model="data.discountCondition" label="FULLNUM">满件(打折)</el-radio>
                    <el-radio v-model="data.discountCondition" label="FULLRMB">满元(减钱)</el-radio>
                    <span class="redP"> (必选)</span>
                </el-form-item>
                <el-form-item label="优惠门槛" prop="discountThreshold0">
                    <div style="display: flex">
                        满
                        <el-input style="width: 100px" v-model="data.discountThreshold"
                                  :disabled="data.DTDisabled"></el-input>
                        (单位 : 件/元) <span class="redP">(必选)</span>
                    </div>
                </el-form-item>
                <el-form-item label="优惠内容" prop="discountContent">
                    <div style="margin-left: 66px;">
                        <div style="display: flex;margin-bottom: 10px">
                            <el-select :disabled="data.selectDisabled" @change="selectChange(indexs0)"
                                       v-model="data.select0" placeholder="请选择" style="width: 180px">
                                <!--<el-option-->
                                        <!--v-for="item in data.options0"-->
                                        <!--:key="item.value"-->
                                        <!--:label="item.label"-->
                                        <!--:value="item.value">-->
                                <!--</el-option>-->
                                <el-option v-show="data.discountCondition=='FULLRMB'?false:true" label="指定金额 (单位 : 元)" value="1">指定金额 (单位 : 元)</el-option>
                                <el-option label="打几折 (单位 : %)"  value="2">打几折 (单位 : %)</el-option>
                                <el-option label="减免金额 (单位 : 元)"  value="3">减免金额 (单位 : 元)</el-option>
                            </el-select>
                            <el-input v-show="data.show0" :disabled="data.show0Disabled" v-model="data.inputs"
                                      style="width: 100px;margin-left: 10px"></el-input>
                        </div>
                        <div>
                            <el-checkbox :disabled="data.sendCoinDisabled" label="sendCoin" v-model="data.sendCoin"
                                         @change="ddd(indexs0)">
                                赠 金 币&nbsp;&nbsp;
                                <el-input style="width: 100px" v-model="data.dcSendCoin"
                                          :disabled="data.a3"></el-input>
                            </el-checkbox>
                        </div>
                        <!--<div>-->
                        <!--<el-checkbox :disabled="data.sendCommodityDisabled" v-model="data.dcSendcommodity"-->
                        <!--label="sendCommodity"-->
                        <!--@change="sendCommodity(indexs0)">-->
                        <!--赠商品-->
                        <!--</el-checkbox>-->
                        <!--&lt;!&ndash;显示区&ndash;&gt;-->
                        <!--<div style="display: flex">-->
                        <!--<div class="showArea" v-for="showArea,indexs in data.showAreas">-->
                        <!--<img :src="showArea.url" alt="picture"-->
                        <!--style="width:60px;height: 60px;vertical-align: bottom">-->
                        <!--<p style="line-height: 20px">{{showArea.name}}</p>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--<div>-->
                            <!--<el-checkbox label="sendMember" :disabled="data.sendMemberDisabled"-->
                                         <!--v-model="data.dcSendMember" @change="eee(indexs0)">-->
                                <!--送会员-->
                                <!--<el-radio-group v-model="data.radios" :disabled="data.memberRadio">-->
                                    <!--<el-radio label="ULTIMATE">旗舰店</el-radio>-->
                                    <!--<el-radio label="NORMAL">创业店</el-radio>-->
                                    <!--<el-radio label="FANS">粉丝店</el-radio>-->
                                <!--</el-radio-group>-->
                            <!--</el-checkbox>-->
                        <!--</div>-->
                    </div>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button type="primary" @click="sure">保存</el-button>
            </div>
        </el-dialog>
        <!--赠商品弹框(暂时不用)-->
        <!--<el-dialog title="选择赠品" append-to-body top="5vh" :visible.sync="dialogTableVisible"-->
        <!--:close-on-click-modal="false"-->
        <!--:before-close="beforeClose">-->
        <!--<p class="redP">最多选8个商品</p>-->
        <!--<el-table-->
        <!--max-height="400"-->
        <!--:data="tableData"-->
        <!--border-->
        <!--style="width:100%"-->
        <!--@selection-change="handleSelectionChange"-->
        <!--&gt;-->
        <!--<el-table-column-->
        <!--type="selection"-->
        <!--width="55">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="commodityUrl"-->
        <!--label="商品图片"-->
        <!--&gt;-->
        <!--<template scope="scope">-->
        <!--<img :src="scope.row.commodityUrl" width="40" height="40"/>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="commodityDisc"-->
        <!--label="商品描述"-->
        <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="price"-->
        <!--label="价格"-->
        <!--width="120">-->
        <!--</el-table-column>-->
        <!--&lt;!&ndash;<el-table-column&ndash;&gt;-->
        <!--&lt;!&ndash;prop="store"&ndash;&gt;-->
        <!--&lt;!&ndash;label="库存"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
        <!--<el-table-column-->
        <!--prop="sendCommodityName"-->
        <!--label="赠品名称"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <!--</el-table>-->
        <!--&lt;!&ndash;下拉框&ndash;&gt;-->
        <!--<div class="xialakuang"-->
        <!--style="display: flex;justify-content: space-between;margin-top: 5px">-->
        <!--<p>每个用户可自选商品数-->
        <!--<el-select v-model="value0" placeholder="" style="width: 60px"-->
        <!--@change="xialakuangValue">-->

        <!--<el-option-->
        <!--v-for="item in options"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--个 <span class="redP">(必选 : 不能超过已选商品个数)</span>-->
        <!--</p>-->
        <!--<el-button type="primary" @click="zspSure()">保存</el-button>-->
        <!--</div>-->
        <!--</el-dialog>-->
        <!--编辑弹框-->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible1">
            <el-form v-for="data,indexs0 in datas1" :class="indexs0>0?'bt':'bb'"
                     style="padding-left: 70px;padding-top: 15px;">
                <el-form-item label="优惠条件">
                    <el-radio v-model="data.discountCondition" label="FULLNUM">满件(打折)</el-radio>
                    <el-radio v-model="data.discountCondition" label="FULLRMB">满元(减钱)</el-radio>
                    <span class="redP"> (必选)</span>
                </el-form-item>
                <el-form-item label="优惠门槛" prop="discountThreshold0">
                    <div style="display: flex">
                        满
                        <el-input style="width: 100px" v-model="data.discountThreshold"
                                  :disabled="data.DTDisabled"></el-input>
                        (单位 : 件/元) <span class="redP">(必选)</span>
                    </div>
                </el-form-item>
                <el-form-item label="优惠内容" prop="discountContent">
                    <div style="margin-left: 66px;">
                        <div style="display: flex;margin-bottom: 10px;">
                            <el-select :disabled="data.selectDisabled" @change="selectChange1(indexs0)"
                                       v-model="data.select0" placeholder="请选择" style="width: 180px">
                                <!--<el-option-->
                                        <!--v-for="item in data.options0"-->
                                        <!--:key="item.value"-->
                                        <!--:label="item.label"-->
                                        <!--:value="item.value">-->
                                <!--</el-option>-->
                                <el-option v-show="data.discountCondition=='FULLRMB'?false:true" label="指定金额 (单位 : 元)" value="1">指定金额 (单位 : 元)</el-option>
                                <el-option label="打几折 (单位 : %)"  value="2">打几折 (单位 : %)</el-option>
                                <el-option label="减免金额 (单位 : 元)"  value="3">减免金额 (单位 : 元)</el-option>
                            </el-select>
                            <el-input v-show="data.show0" :disabled="data.show0Disabled" v-model="data.inputs"
                                      style="width: 100px;margin-left: 10px"></el-input>
                        </div>
                        <div>
                            <el-checkbox :disabled="data.sendCoinDisabled" label="sendCoin" v-model="data.sendCoin"
                                         @change="ddd1(indexs0)">
                                赠 金 币&nbsp;&nbsp;
                                <el-input style="width: 100px" v-model="data.dcSendCoin"
                                          :disabled="data.a3"></el-input>
                            </el-checkbox>
                        </div>
                        <!--<div>-->
                        <!--<el-checkbox :disabled="data.sendCommodityDisabled" v-model="data.dcSendcommodity"-->
                        <!--label="sendCommodity"-->
                        <!--@change="sendCommodity(indexs0)">-->
                        <!--赠商品-->
                        <!--</el-checkbox>-->
                        <!--&lt;!&ndash;显示区&ndash;&gt;-->
                        <!--<div style="display: flex">-->
                        <!--<div class="showArea" v-for="showArea,indexs in data.showAreas">-->
                        <!--<img :src="showArea.url" alt="picture"-->
                        <!--style="width:60px;height: 60px;vertical-align: bottom">-->
                        <!--<p style="line-height: 20px">{{showArea.name}}</p>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--<div>-->
                            <!--<el-checkbox label="sendMember" :disabled="data.sendMemberDisabled"-->
                                         <!--v-model="data.dcSendMember" @change="eee1(indexs0)">-->
                                <!--送会员-->
                                <!--<el-radio-group v-model="data.radios" :disabled="data.memberRadio">-->
                                    <!--<el-radio label="ULTIMATE">旗舰店</el-radio>-->
                                    <!--<el-radio label="NORMAL">创业店</el-radio>-->
                                    <!--<el-radio label="FANS">粉丝店</el-radio>-->
                                <!--</el-radio-group>-->
                            <!--</el-checkbox>-->
                        <!--</div>-->
                    </div>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button type="primary" @click="sure1">保存</el-button>
            </div>
        </el-dialog>
        <div style="text-align: center;margin-top: 10px">
            <el-button @click="returnList" type="primary">返回列表</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData0: [],
                dialogFormVisible0: false,//添加弹框
                dialogTableVisible: false,
                datas: [
                    {
                        discountCondition: '',//优惠条件
                        select0: '',//下拉
                        options0: [
                            {
                                value: '1',
                                label: '指定金额 (单位 : 元)'
                            }, {
                                value: '2',
                                label: '打几折 (单位 : %)'
                            }, {
                                value: '3',
                                label: '减免金额 (单位 : 元)'
                            },
                        ],
                        show0: false,
                        inputs: '',
                        DTDisabled: false,//满件输入框变灰
                        selectDisabled: false,//优惠内容-下拉框变灰
                        show0Disabled: false,//下拉框后面的输入框
                        sendCoinDisabled: false,//赠金币变灰
                        sendCommodityDisabled: false,//赠商品变灰
                        sendMemberDisabled: false,//送会员变灰
                        discountThreshold: '',
                        memberRadio: true,//送会员
                        dcSendCoin: '',
                        dcSendcommodity: false,
                        dcSendMember: '',
                        value1: '',
                        options: [
                            {value: '0', label: '0'},
                            {value: '1', label: '1'},
                            {value: '2', label: '2'},
                            {value: '3', label: '3'},
                            {value: '4', label: '4'},
                            {value: '5', label: '5'},
                            {value: '6', label: '6'},
                            {value: '7', label: '7'},
                            {value: '8', label: '8'},
                        ],
                        radios: '',//送会员单选
                        showAreas: [],//赠商品-显示区
                        a0: true,
                        a1: true,
                        a2: true,
                        a3: true,
                    }
                ],
                tableData: [],
                value: '',
                value0: '',//赠商品下拉框
                options: [
                    {value: '0', label: '0'},
                    {value: '1', label: '1'},
                    {value: '2', label: '2'},
                    {value: '3', label: '3'},
                    {value: '4', label: '4'},
                    {value: '5', label: '5'},
                    {value: '6', label: '6'},
                    {value: '7', label: '7'},
                    {value: '8', label: '8'},

                ],
                spuIds: [],
                xialakuangvalue: '',//下拉框
                showAreaObj: {},//赠商品-显示区
                showAreasArr: [],
                //1,2,3,4,5...
                numberArr: [],
                first: Number,
                second: Number,
                third: Number,
                forth: Number,
                fifth: Number,
                sixth: Number,
                seventh: Number,
                zspArr: [],//赠商品-选择商品
                selectedSpuId: [],//赠商品-选择商品-new
                activityID: '',
                selectIndex: Number,
                inputs1: '',
                inputs2: '',
                inputs3: '',
                //编辑
                dialogFormVisible1: false,
                datas1: [
                    {
                        discountCondition: '',//优惠条件
                        select0: '',//下拉
                        options0: [
                            {
                                value: '1',
                                label: '指定金额 (单位 : 元)'
                            }, {
                                value: '2',
                                label: '打几折 (单位 : %)'
                            }, {
                                value: '3',
                                label: '减免金额 (单位 : 元)'
                            },
                        ],
                        show0: false,
                        inputs: '',
                        DTDisabled: false,//满件输入框变灰
                        selectDisabled: false,//优惠内容-下拉框变灰
                        show0Disabled: false,//下拉框后面的输入框
                        sendCoinDisabled: false,//赠金币变灰
                        sendCommodityDisabled: false,//赠商品变灰
                        sendMemberDisabled: false,//送会员变灰
                        discountThreshold: '',
                        memberRadio: true,//送会员
                        dcSendCoin: '',
                        dcSendcommodity: false,
                        dcSendMember: '',
                        value1: '',
                        options: [
                            {value: '0', label: '0'},
                            {value: '1', label: '1'},
                            {value: '2', label: '2'},
                            {value: '3', label: '3'},
                            {value: '4', label: '4'},
                            {value: '5', label: '5'},
                            {value: '6', label: '6'},
                            {value: '7', label: '7'},
                            {value: '8', label: '8'},
                        ],
                        radios: '',//送会员单选
                        showAreas: [],//赠商品-显示区
                        a0: true,
                        a1: true,
                        a2: true,
                        a3: true,
                    }
                ],
                aditRow: {},//编辑确定
                tilIndex: Number,//记录层级
            }
        },
        methods: {
            add() {
                //清空所有
                this.datas[0].show0 = false;//input框不显示
                this.datas[0].discountCondition = '';//优惠条件
                this.datas[0].discountThreshold = '';//优惠门槛
                this.datas[0].select0 = '';//优惠内容
                this.datas[0].sendCoin = '';//赠金币
                this.datas[0].dcSendCoin = '',//赠金币input清空
                    this.datas[0].dcSendcommodity = '',//赠商品
                    this.datas[0].showAreas = false,//赠商品不显示
                    this.datas[0].dcSendMember = ''//送会员
                this.datas[0].radios = '',//送会员
                    this.datas[0].memberRadio = true,//送会员-变灰
                    this.dialogFormVisible0 = true;
            },
            //编辑部分
            adit(row, index) {
                console.log(row);
                this.aditRow = row;
                this.tilIndex = index;
                //清空
                this.datas1[0].inputs = '';
                this.datas1[0].show0 = false;//input框不显示
                this.datas1[0].discountCondition = '';//优惠条件
                this.datas1[0].discountThreshold = '';//优惠门槛
                this.datas1[0].select0 = '';//优惠内容
                this.datas1[0].sendCoin = '';//赠金币
                this.datas1[0].dcSendCoin = '',//赠金币input清空
                    this.datas1[0].dcSendcommodity = '';//赠商品
                this.datas1[0].showAreas = [];
//                    this.datas1[0].showAreas = false,//赠商品不显示
                this.datas1[0].dcSendMember = '';//送会员
                this.datas1[0].radios = '';//送会员
                this.datas1[0].memberRadio = true;//送会员-变灰
                this.dialogFormVisible1 = true;
                console.log(row, index);
                //优惠条件
                if (row.activityCondition == '满元') {
                    this.datas1[0].discountCondition = 'FULLRMB';
                } else {
                    this.datas1[0].discountCondition = 'FULLNUM';
                }
                //优惠门槛
                this.datas1[0].discountThreshold = row.activitySill;
                //优惠内容
                if (row.quota == null && row.discountRate == null && row.derate == null) {
                    this.datas1[0].show0 = false;
                } else {
                    this.datas1[0].show0 = true;
                }
                for (let i = 0; i < row.activityModules.length; i++) {
                    if (row.activityModules[i] == 1) {
                        this.datas1[0].select0 = '1'
                        this.datas1[0].inputs = row.quota;//指定金额
//                        this.$set(this.datas1[0],"inputs",row.quota)
                    } else if (row.activityModules[i] == 2) {
                        this.datas1[0].select0 = '2'
                        this.datas1[0].inputs = row.discountRate;//打折
//                        this.$set(this.datas1[0],"inputs",row.discountRate)
                    } else if (row.activityModules[i] == 3) {
                        this.datas1[0].select0 = '3'
                        this.datas1[0].inputs = row.derate;//减免
                    }
                }
                //赠金币
                if (row.gold == null) {
                    this.datas1[0].sendCoin = false;
                    this.datas1[0].a3 = true;
                    this.datas1[0].dcSendCoin = '';
                } else {
                    console.log('333');
                    this.datas1[0].a3 = false;
                    this.datas1[0].sendCoin = true;
                    this.datas1[0].dcSendCoin = row.gold;

                }
                //赠商品
                if (row.list == null) {
                    this.datas1[0].dcSendcommodity = false;
                } else {
                    for (let i = 0; i < row.list.length; i++) {
                        let obj = {};
                        obj.url = row.list[i].image;
                        obj.name = row.list[i].spuname;
                        console.log(this.datas1[0].showAreas);
                        this.datas1[0].showAreas.push(obj);
                    }
                    console.log('ooo');
                    this.datas1[0].dcSendcommodity = true;
                }
                //送会员
                if (row.member == 'ULTIMATE') {
                    //旗舰店
                    this.datas1[0].dcSendMember = true;
                    this.datas1[0].memberRadio = false;
                    this.datas1[0].radios = 'ULTIMATE'
                } else if (row.member == 'NORMAL') {
                    //创业店
                    this.datas1[0].dcSendMember = true;
                    this.datas1[0].memberRadio = false;
                    this.datas1[0].radios = 'NORMAL'
                } else if (row.member == 'FANS') {
                    //粉丝店
                    this.datas1[0].dcSendMember = true;
                    this.datas1[0].memberRadio = false;
                    this.datas1[0].radios = 'FANS'
                } else {
                    this.datas1[0].memberRadio = true;
                }
            },
            //adit确定
            sure1() {
                this.numberArr = [];//清空
                if (this.datas1[0].discountCondition == '' || this.datas1[0].discountCondition == undefined) {
                    this.$message({
                        type: 'warning',
                        message: '请选择优惠条件!'
                    });
                } else {
                    if (this.datas1[0].discountThreshold == '' || this.datas1[0].discountThreshold == undefined) {
                        this.$message({
                            type: 'warning',
                            message: '请填写优惠门槛!'
                        });
                    } else {
                        if(this.datas1[0].select0!=''&&this.datas1[0].inputs==''){
                            this.$message({
                                type:"warning",
                                message:'请填写优惠内容!'
                            })
                        }else{
                            if( this.datas1[0].sendCoin == true&&this.datas1[0].dcSendCoin==''){
                                this.$message({
                                    type:"warning",
                                    message:'请填写金币!'
                                })
                            }else{
                                if (this.datas1[0].select0 == '1') {
                                    this.numberArr.push(1);
                                    this.inputs1 = this.datas1[0].inputs;
                                } else if (this.datas1[0].select0 == '2') {
                                    this.numberArr.push(2);
                                    this.inputs2 = this.datas1[0].inputs;
                                } else if (this.datas1[0].select0 == '3') {
                                    this.numberArr.push(3);
                                    this.inputs3 = this.datas1[0].inputs;
                                }
                                if (this.datas1[0].dcSendcommodity == true) {
                                    this.numberArr.push(4);
                                }
                                if (this.datas1[0].sendCoin == true) {
                                    this.numberArr.push(5);
                                }
                                if (this.datas1[0].dcSendMember == true) {
                                    this.numberArr.push(7);
                                }
                                if (this.datas1[0].dcSendCoin == undefined) {
                                    this.datas1[0].dcSendCoin = null;
                                }
                                //送会员
                                if (this.datas1[0].radios == undefined) {
                                    this.datas1[0].radios = null;
                                }
                                //商品spuIds
                                let arr = [];
                                if (this.datas1[0].showAreas == undefined) {
                                    arr = [];
                                } else {
                                    for (let i = 0; i < this.datas1[0].showAreas.length; i++) {
                                        let a = this.datas1[0].showAreas[i].spuId;
                                        arr.push(a);
                                    }
                                }
                                this.$http.post(this.url + '/activity/alterActivityCondition', {
                                    activityConditionId: this.aditRow.activityConditionId,
                                    activityId: this.aditRow.activityId,
                                    activityCondition: this.datas1[0].discountCondition,
                                    activitySill: this.datas1[0].discountThreshold,
                                    activityModules: this.numberArr.join(','),
                                    activityTier: this.tilIndex + 1,//层级
                                    quota: this.inputs1,//指定金额
                                    discountRate: this.inputs2,//折扣
                                    derate: this.inputs3,//减免金额
//                            spuIds: arr.join(','),//商品
                                    productNum: this.xialakuangvalue,//数量
                                    gold: this.datas1[0].dcSendCoin,//赠金币
                                    member: this.datas1[0].radios,//送会员
                                }, {emulateJSON: true}).then(function (res) {
                                    console.log(res);
                                    this.numberArr = [];
                                    if (res.data.status == 200) {
//                                this.showDC = false;
//                                this.showC = true;
                                        //刷新
                                        this.ajaxAll();
                                        this.$message({
                                            type: 'success',
                                            message: '编辑成功!'
                                        });

                                    } else {
                                        this.$message({
                                            type: 'success',
                                            message: '编辑失败!'
                                        })
                                    }
                                    this.dialogFormVisible1 = false;
                                });
                            }
                        }
                    }
                }
            },
            //删除
            delets(row, index) {
                console.log(row);
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url + '/activity/delActivityCondition', {
                        activityId: this.activityID,
                        activityConditionId: row.activityConditionId
                    }, {emulateJSON: true}).then(function (res) {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //shuaxin
                            this.ajaxAll();
                        } else if (res.data.status == 104) {
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
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            selectChange1(index) {
                if (this.datas1[0].select0 != '') {
                    this.datas1[0].show0 = true;
                } else {
                    this.datas1[0].show0 = false;
                }

            },
            //赠金币
            ddd1(index) {
                if (this.datas1[0].sendCoin == false) {
                    this.datas1[0].dcSendCoin = '';
                }
                this.datas1[0].a3 = !this.datas1[0].a3;
            },
            //送会员
            eee1(index) {
                if (this.datas1[0].dcSendMember == false) {
                    this.datas1[0].radios = false;
                }
                this.datas1[0].memberRadio = !this.datas1[0].memberRadio;
            },


            //添加保存按钮
            sure() {
                this.numberArr = [];//清空
                console.log(this.datas);
                if (this.datas[0].discountCondition == '' || this.datas[0].discountCondition == undefined) {
                    this.$message({
                        type: 'warning',
                        message: '请选择优惠条件!'
                    });
                } else {
                    if (this.datas[0].discountThreshold == '' || this.datas[0].discountThreshold == undefined) {
                        this.$message({
                            type: 'warning',
                            message: '请填写优惠门槛!'
                        });
                    } else {
                        if(this.datas[0].select0!=''&&this.datas[0].inputs==''){
                            this.$message({
                                type:"warning",
                                message:'请填写优惠内容!'
                            })
                        }else {
                            if (this.datas[0].sendCoin == true && this.datas[0].dcSendCoin == '') {
                                this.$message({
                                    type: "warning",
                                    message: '请填写金币!'
                                })
                            }else{
                                if (this.datas[0].select0 == '1') {
                                    this.numberArr.push(1);
                                    this.inputs1 = this.datas[0].inputs;
                                } else if (this.datas[0].select0 == '2') {
                                    this.numberArr.push(2);
                                    this.inputs2 = this.datas[0].inputs;
                                } else if (this.datas[0].select0 == '3') {
                                    this.numberArr.push(3);
                                    this.inputs3 = this.datas[0].inputs;
                                }
                                if (this.datas[0].dcSendcommodity == true) {
                                    this.numberArr.push(4);
                                }
                                if (this.datas[0].sendCoin == true) {
                                    this.numberArr.push(5);
                                }
                                if (this.datas[0].dcSendMember == true) {
                                    this.numberArr.push(7);
                                }
                                if (this.datas[0].dcSendCoin == undefined) {
                                    this.datas[0].dcSendCoin = null;
                                }
                                //送会员
                                if (this.datas[0].radios == undefined) {
                                    this.datas[0].radios = null;
                                }
                                //商品spuIds
                                let arr = [];
                                if (this.datas[0].showAreas == undefined) {
                                    arr = [];
                                } else {
                                    for (let i = 0; i < this.datas[0].showAreas.length; i++) {
                                        let a = this.datas[0].showAreas[i].spuId;
                                        arr.push(a)
                                    }

                                }
                                console.log(this.datas.length);
                                this.$http.post(this.url + '/activity/addActivityCondition', {
                                    activityId: this.activityID,
                                    activityCondition: this.datas[0].discountCondition,
                                    activitySill: this.datas[0].discountThreshold,
                                    activityModules: this.numberArr.join(','),
                                    activityTier: this.datas.length,//层级
                                    quota: this.inputs1,//指定金额
                                    discountRate: this.inputs2,//折扣
                                    derate: this.inputs3,//减免金额
//                            spuIds: arr.join(','),//商品
                                    productNum: this.xialakuangvalue,//数量
                                    gold: this.datas[0].dcSendCoin,//赠金币
                                    member: this.datas[0].radios,//送会员
                                }, {emulateJSON: true}).then(function (res) {
                                    console.log(res);
                                    this.numberArr = [];
                                    if (res.data.status == 200) {
//                                this.showDC = false;
//                                this.showC = true;
//                                this.active = 2;
                                        //刷新
                                        this.ajaxAll();
                                        this.dialogFormVisible0 = false;
                                        this.$message({
                                            type: 'success',
                                            message: '添加成功!'
                                        })
                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: '添加失败!'
                                        })
                                    }
                                });
                            }
                        }

                    }
                }
            },
            selectChange(index) {
                this.datas[0].inputs = '';//清空
                if (this.datas[0].select0 != '') {
                    this.datas[0].show0 = true;
                } else {
                    this.datas[0].show0 = false;
                }

            },
            //赠商品-下拉框
            xialakuangValue(val) {
                this.xialakuangvalue = val;
            },
            //赠商品-保存按钮
            zspSure(index) {
                if (this.value0 == '') {
                    this.$message({
                        type: 'warning',
                        message: '请选择--每用户可选商品数!'
                    });
                } else {
                    let num = parseInt(this.value0);
                    console.log(this.xialakuangvalue);
                    if (this.zspArr.length < num) {
                        this.$message({
                            type: 'warning',
                            message: '不能超过已选商品个数!'
                        });
                    } else {
                        this.dialogTableVisible = false;
                        console.log(this.datas);
                        console.log(this.showAreasArr);
                        this.datas[0].showAreas = this.showAreasArr;//赠商品-回显
                        this.datas1[0].showAreas = this.showAreasArr;//赠商品-回显
                        if (this.datas[0].showAreas.length != 0) {
                            this.datas[0].dcSendcommodity = true;
                        } else {
                            this.datas[0].dcSendcommodity = false;
                        }
                        if (this.datas1[0].showAreas.length != 0) {
                            this.datas1[0].dcSendcommodity = true;
                        } else {
                            this.datas1[0].dcSendcommodity = false;
                        }
                    }
                }
            },
            sendCommodity(index) {
                this.spuIds = [];//清空
                this.dialogTableVisible = true;
                this.tableData = [];
                this.$http.post(this.url + '/spuManage/gift_spu', {
                    page: 1,
                    num: 10000
                }, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    for (let i = 0; i < res.data.data.pageList.length; i++) {
                        let obj = {};
                        obj.commodityUrl = res.data.data.pageList[i].imageUrlsToWeb[0];
                        obj.spuId = res.data.data.pageList[i].spuId
                        obj.price = res.data.data.pageList[i].minPrice + '-' + res.data.data.pageList[i].maxPrice;
                        obj.sendCommodityName = res.data.data.pageList[i].spuname;
                        obj.commodityDisc = res.data.data.pageList[i].spuSimpleDesc;
                        this.tableData.push(obj);
                        this.spuIds.push(res.data.data.pageList[i].spuId);
                    }
                    console.log(this.spuIds);
                });

            },
            //赠商品弹框->多选
            handleSelectionChange(val) {
                this.zspArr = val;
                this.showAreasArr = [];
                this.selectedSpuId = [];
                for (let i = 0; i < val.length; i++) {
                    console.log(val);
                    this.showAreaObj = {};
                    this.showAreaObj.url = val[i].commodityUrl;
                    this.showAreaObj.name = val[i].sendCommodityName;
                    this.showAreaObj.spuId = val[i].spuId;
                    this.showAreasArr.push(this.showAreaObj);
                    this.selectedSpuId.push(val[i].spuId);
                }
                console.log(this.selectedSpuId);
            },
            beforeClose(val) {
                if (this.datas[0].showAreas.length != 0) {
                    this.datas[0].dcSendcommodity = true;
                } else {
                    this.datas[0].dcSendcommodity = false;
                }
                this.dialogTableVisible = false;
            },
            //赠金币
            ddd(index) {
                if (this.datas[0].sendCoin == false) {
                    this.datas[0].dcSendCoin = '';
                }
                this.datas[0].a3 = !this.datas[0].a3;
            },
            //送会员
            eee(index) {
                if (this.datas[0].dcSendMember == false) {
                    this.datas[0].radios = false;
                }
                this.datas[0].memberRadio = !this.datas[0].memberRadio;
            },

            //返回
            returnList() {
                this.$router.push({
                    path: '/activityList',
                })
            },
            ajaxAll() {
                this.$http.post(this.url + '/activity/getActivityCondition', {activityId: this.activityID}, {emulateJSON: true}).then(function (res) {
                    console.log(res.data);
                    if (res.data.data == null) {
                        this.tableData0 = [];
                    } else {
                        for (let i = 0; i < res.data.data.length; i++) {
//                    优惠条件
                            if (res.data.data[i].activityCondition == 'FULLNUM') {
                                res.data.data[i].activityCondition = '满件'
                            } else {
                                res.data.data[i].activityCondition = '满元'
                            }
//                    优惠内容
                            for (let k = 0; k < res.data.data[i].activityModules.length; k++) {
                                if (res.data.data[i].activityModules[k] == 1) {
                                    res.data.data[i].first = '指定金额/' + res.data.data[i].quota + '元'
                                } else if (res.data.data[i].activityModules[k] == 2) {
                                    res.data.data[i].first = '打折/' + res.data.data[i].discountRate + '%'
                                } else if (res.data.data[i].activityModules[k] == 3) {
                                    res.data.data[i].first = '减免金额/' + res.data.data[i].derate + '元'
                                } else if (res.data.data[i].activityModules[k] == 5) {
                                    res.data.data[i].second = '赠金币/' + res.data.data[i].gold
                                } else if (res.data.data[i].activityModules[k] == 7) {
                                    if(res.data.data[i].member=='ULTIMATE'){
                                        res.data.data[i].third = '送会员/旗舰店'
                                    }else if(res.data.data[i].member=='NORMAL'){
                                        res.data.data[i].third = '送会员/创业店'
                                    }else{
                                        res.data.data[i].third = '送会员/粉丝店'
                                    }
                                }
                            }
                        }
                        this.tableData0 = res.data.data
                    }
                });
            }
        },
        mounted() {
            this.activityID = this.$route.query.row.activityId;
            this.ajaxAll();
        }
    }
</script>

<style scoped>
    .discountArea {
        height: 500px;
        overflow: scroll;
        /*margin-left: 40px;*/
    }

    .setWidths {
        width: 195px;
    }

    .nextStep {
        margin-left: 20px;
    }

    .activityId {
        display: flex;
        align-items: center;
    }

    .showArea {
        width: 80px;
        text-align: center;
    }

    .el-row2 {
        display: flex;
        align-items: center;
    }

    .spans {
        width: 80px;
    }

    .spans0 {
        width: 60px;
    }

    .table {
        margin-top: 5px;
    }

    .block {
        text-align: right;
        margin-top: 5px;
    }

    .bt {
        border-top: 1px solid gainsboro;
    }

    .redP {
        color: red;
    }

    .table {
        margin-top: 10px;
        max-height: 400px;
        overflow: auto;
    }
</style>
