<template>
    <div id="app">
        <!--登录-->
        <div v-if="isShow" class="login0">
            <div class="snow-container">
                <div class="snow foreground"></div>
                <div class="snow foreground layered"></div>
                <div class="snow middleground"></div>
                <div class="snow middleground layered"></div>
                <div class="snow background"></div>
                <div class="snow background layered"></div>
            </div>
            <el-row class="login">
                <el-col>
                    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px"
                             class="demo-ruleForm">
                        <el-form-item label="用户名" prop="pass">
                            <el-input type="text" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm2.checkPass"
                                      @keyup.enter.native="submitForm('ruleForm2')" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="login-btn">
                            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <!--主页面-->
        <!--nav-->
        <div v-else="!isShow" :style="{height:height}">
            <el-row class="nav">
                <el-col :span="4" class="el-col-first">
                    <!--返回main-->
                    <div>
                        <router-link to="/main"><p class="p">管理控制台</p></router-link>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="aa"></div>
                </el-col>
                <el-col :span="4">
                    <div style="text-align: right;padding-right: 20px;">
                        <!---->
                        <el-dropdown trigger="hover">
                            <span class="el-dropdown-link userinfo-inner current-user" style="cursor: pointer;font-size: 16px">{{currentUser}}</span><img
                                src="http://qqskimage.oss-cn-hangzhou.aliyuncs.com/templet/1524014247815.jpg" alt="用户头像" style="width: 40px;height:40px;border-radius: 50% 50%;vertical-align: middle">
                            <el-dropdown-menu slot="dropdown">
                                <router-link to="/changePassword">
                                    <el-dropdown-item>修改密码</el-dropdown-item>
                                </router-link>
                                <el-dropdown-item divided @click.native="tuichu">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!---->
                    </div>
                </el-col>
            </el-row>
            <!--主题-->
            <el-row class="content">
                <!--aside-->
                <el-col :span="3" scroll="none" class="aside">
                    <div style="height: 100%">
                        <!--default-active="11-1" 展开时默认高亮11-1(团队列表)填写11没有作用 只对子项有用-->
                        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo"  @select="menuChange" unique-opened>
                            <!--//背景层-->
                            <div class="hoverspan"></div>
                            <el-submenu index="1" v-show="Obj.A1" >
                                <template slot="title"><i class="iconfont">&#xe641;</i>会员管理</template>
                                <el-menu-item-group>
                                    <router-link to="/teamList" v-show="Obj.A1B1">
                                        <el-menu-item index="11-1">团队列表</el-menu-item>
                                    </router-link>
                                    <router-link to="/membershipReview" v-show="Obj.A1B2">
                                        <el-menu-item index="11-2">会员资格审核</el-menu-item>
                                    </router-link>
                                    <router-link to="/memberList" v-show="Obj.A1B3">
                                        <el-menu-item index="11-3">会员列表</el-menu-item>
                                    </router-link>
                                    <router-link to="/realNameVertification" v-show="Obj.A1B4">
                                        <el-menu-item index="11-4">实名认证</el-menu-item>
                                    </router-link>
                                    <router-link to="/orderInquire" v-show="Obj.A1B5">
                                        <el-menu-item index="11-5">订单查询</el-menu-item>
                                    </router-link>
                                    <router-link to="/accountInquiry" v-show="Obj.A1B6">
                                        <el-menu-item index="11-6">账户查询</el-menu-item>
                                    </router-link>
                                    <router-link to="/userInquiry" v-show="Obj.A1B7">
                                        <el-menu-item index="11-7">用户查询</el-menu-item>
                                    </router-link>
                                    <router-link to="/shopMergeList" v-show="Obj.A1B8">
                                        <el-menu-item index="11-8">店铺合并列表</el-menu-item>
                                    </router-link>
                                    <router-link to="/clientManagerAuditList" v-show="Obj.A1B9">
                                        <el-menu-item index="11-9">店铺升级审核列表</el-menu-item>
                                    </router-link>
                                    <router-link to="/dataAttribute" v-show="Obj.A1B10">
                                        <el-menu-item index="11-10">流量分配</el-menu-item>
                                    </router-link>
                                    <router-link to="/downGradeList" v-show="Obj.A1B11">
                                        <el-menu-item index="11-11">降级列表</el-menu-item>
                                    </router-link>
                                    <router-link to="/blackList" v-show="Obj.A1B12">
                                        <el-menu-item index="11-12">黑名单</el-menu-item>
                                    </router-link>
                                    <router-link to="/physicalStore" v-show="Obj.A1B13">
                                        <el-menu-item index="11-13">实体店列表</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="2" v-show="Obj.A2">
                                <template slot="title"><i class="iconfont">&#xe663;</i>商城管理</template>
                                <el-menu-item-group>
                                    <router-link to="/mallSetup" v-show="Obj.A2B1">
                                        <el-menu-item index="21-1">商城设置</el-menu-item>
                                    </router-link>
                                    <router-link to="/qiqiaoPlateSetup" v-show="Obj.A2B2">
                                        <el-menu-item index="21-2">七巧板块设置</el-menu-item>
                                    </router-link>
                                    <router-link to="/selfDefineProduct" v-show="Obj.A2B3">
                                        <el-menu-item index="21-3">自定义商品</el-menu-item>
                                    </router-link>
                                    <router-link to="/joinCommodityActivityPage" v-show="Obj.A2B4">
                                        <el-menu-item index="21-4">加入商品活动页</el-menu-item>
                                    </router-link>
                                    <router-link to="/templateSet" v-show="Obj.A2B5">
                                        <el-menu-item index="21-5">模板设置</el-menu-item>
                                    </router-link>
                                    <router-link to="/firstPage" v-show="Obj.A2B7">
                                        <el-menu-item index="21-7">首页</el-menu-item>
                                    </router-link>
                                    <router-link to="/secondPage" v-show="Obj.A2B6">
                                        <el-menu-item index="21-6">二级页</el-menu-item>
                                    </router-link>
                                    <router-link to="/firstPageRunPics" v-show="Obj.A2B8">
                                        <el-menu-item index="21-8">首页轮播图</el-menu-item>
                                    </router-link>
                                    <router-link to="/joinActivityProducts" v-show="Obj.A2B9">
                                        <el-menu-item index="21-9">加盟活动商品</el-menu-item>
                                    </router-link>
                                    <router-link to="/commodityList" v-show="Obj.A2B10">
                                        <el-menu-item index="21-10">商品列表</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="3" v-show="Obj.A3">
                                <template slot="title"><i class="iconfont">&#xe747;</i>仓库管理</template>
                                <el-menu-item-group>
                                    <router-link to="/warehouseList" v-show="Obj.A3B1">
                                        <!--<el-menu-item index="1-1" @click="warehouseList" :data="warehouseData">仓库列表</el-menu-item>-->
                                        <el-menu-item index="31-1">仓库列表</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>

                            </el-submenu>
                            <el-submenu index="4" v-show="Obj.A4">
                                <template slot="title"><i class="iconfont">&#xe689;</i>商品管理</template>
                                <el-menu-item-group>
                                    <router-link to="/synchronizeCommodityLibrary" v-show="Obj.A4B1">
                                        <el-menu-item index="41-1">同步商品库</el-menu-item>
                                    </router-link>
                                    <router-link to="/commodity" v-show="Obj.A4B2">
                                        <el-menu-item index="41-2">商品</el-menu-item>
                                    </router-link>
                                    <router-link to="/combinationCommodity" v-show="Obj.A4B3">
                                        <el-menu-item index="41-3">组合商品</el-menu-item>
                                    </router-link>
                                    <router-link to="/frontModule" v-show="Obj.A4B4">
                                        <el-menu-item index="41-4">前台模块</el-menu-item>
                                    </router-link>
                                    <router-link to="/brand" v-show="Obj.A4B5">
                                        <el-menu-item index="41-5">品牌</el-menu-item>
                                    </router-link>
                                    <router-link to="/rebate" v-show="Obj.A4B6">
                                        <el-menu-item index="41-6">返利</el-menu-item>
                                    </router-link>
                                    <router-link to="/label" v-show="Obj.A4B7">
                                        <el-menu-item index="41-7">标签</el-menu-item>
                                    </router-link>
                                    <router-link to="/inquirySpu" v-show="Obj.A4B8">
                                        <el-menu-item index="41-8">spu管理</el-menu-item>
                                    </router-link>
                                    <router-link to="/originPlace" v-show="Obj.A4B9">
                                        <el-menu-item index="41-9">原产地</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="5" v-show="Obj.A5">
                                <template slot="title"><i class="iconfont">&#xe726;</i>营销活动</template>
                                <el-menu-item-group>
                                    <router-link to="/couponsList" v-show="Obj.A5B1">
                                        <el-menu-item index="51-1">优惠券列表</el-menu-item>
                                    </router-link>
                                    <router-link to="/rushBuy" v-show="Obj.A5B2">
                                        <el-menu-item index="51-2">抢购</el-menu-item>
                                    </router-link>
                                    <router-link to="/shopJoinActivitiesGoods" v-show="Obj.A5B3">
                                        <el-menu-item index="51-3">店铺加盟活动商品</el-menu-item>
                                    </router-link>
                                    <router-link to="/createdActivity" v-show="Obj.A5B5">
                                        <el-menu-item index="51-5">创建活动</el-menu-item>
                                    </router-link>
                                    <router-link to="/activityList" v-show="Obj.A5B4">
                                        <el-menu-item index="51-4">活动列表</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="6" v-show="Obj.A6">
                                <template slot="title"><i class="iconfont">&#xe652;</i>订单管理</template>
                                <el-menu-item-group>
                                    <router-link to="/commodityOrderInquiry" v-show="Obj.A6B1">
                                        <el-menu-item index="61-1">商品订单查询</el-menu-item>
                                    </router-link>
                                    <router-link to="/refundApplicationForm" v-show="Obj.A6B2">
                                        <el-menu-item index="61-2">退款申请表
                                        </el-menu-item>
                                    </router-link>
                                    <router-link to="/notPushedOrderList" v-show="Obj.A6B3">
                                        <el-menu-item index="61-3">未推送订单列表
                                        </el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="7" v-show="Obj.A7">
                                <template slot="title"><i class="iconfont">&#xe702;</i>财务管理</template>
                                <el-menu-item-group>
                                    <router-link to="/cashRecordsList" v-show="Obj.A7B1">
                                        <el-menu-item index="71-1">提现记录列表</el-menu-item>
                                    </router-link>
                                    <router-link to="/financialAudit" v-show="Obj.A7B2">
                                        <el-menu-item index="71-2">财务审核</el-menu-item>
                                    </router-link>
                                    <router-link to="/financialReport" v-show="Obj.A7B6">
                                        <el-menu-item index="71-6">财务报表</el-menu-item>
                                    </router-link>
                                    <router-link to="/transactionCompletionReport" v-show="Obj.A7B3">
                                        <el-menu-item index="71-3">交易完成报表</el-menu-item>
                                    </router-link>
                                    <router-link to="/transactionCompletedProductSummary" v-show="Obj.A7B4">
                                        <el-menu-item index="71-4">交易完成商品汇总表</el-menu-item>
                                    </router-link>
                                    <router-link to="/salaryManagement" v-show="Obj.A7B5">
                                        <el-menu-item index="71-5">客户经理工资管理</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="8" v-show="Obj.A8">
                                <template slot="title"><i class="iconfont">&#xe660;</i>统计管理</template>
                                <el-menu-item-group>
                                    <router-link to="/basicStatistics" v-show="Obj.A8B1">
                                        <el-menu-item index="81-1">基本统计</el-menu-item>
                                    </router-link>
                                    <router-link to="/shopList" v-show="Obj.A8B2">
                                        <el-menu-item index="81-2">店铺排行榜</el-menu-item>
                                    </router-link>
                                    <router-link to="/dataQuerySystem" v-show="Obj.A8B3">
                                        <el-menu-item index="81-3">数据查询系统</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="9" v-show="Obj.A9">
                                <template slot="title"><i class="iconfont">&#xe61a;</i>微信设置</template>
                                <el-menu-item-group>
                                    <router-link to="/automaticResponse" v-show="Obj.A9B1">
                                        <el-menu-item index="91-1">自动回复</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="10" v-show="Obj.A10">
                                <template slot="title"><i class="iconfont">&#xe65a;</i>客服服务</template>
                                <el-menu-item-group>
                                    <router-link to="/questionType" v-show="Obj.A10B1">
                                        <el-menu-item index="101-1">问题类型</el-menu-item>
                                    </router-link>
                                    <router-link to="/questionList" v-show="Obj.A10B2">
                                        <el-menu-item index="101-2">问题列表</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="11" v-show="Obj.A11">
                                <template slot="title"><i class="iconfont">&#xe69e;</i>权限管理</template>
                                <el-menu-item-group>
                                    <router-link to="/departmentManagement" v-show="Obj.A11B1">
                                        <el-menu-item index="111-1">部门管理</el-menu-item>
                                    </router-link>
                                    <router-link to="/memberManagement" v-show="Obj.A11B2">
                                        <el-menu-item index="111-2">成员管理
                                        </el-menu-item>
                                    </router-link>
                                    <router-link to="/moduleManagement" v-show="Obj.A11B3">
                                        <el-menu-item index="111-3">模块管理
                                        </el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="12" v-show="Obj.A12">
                                <template slot="title"><i class="iconfont">&#xe631;</i>发现管理</template>
                                <router-link to="/runPics" v-show="Obj.A12B1">
                                    <el-menu-item index="121-1">轮播图</el-menu-item>
                                </router-link>
                                <router-link to="/customizeTopic" v-show="Obj.A12B2">
                                    <el-menu-item index="121-2">话题管理</el-menu-item>
                                </router-link>
                                <router-link to="/materialManage" v-show="Obj.A12B3">
                                    <el-menu-item index="121-3">素材管理</el-menu-item>
                                </router-link>
                                <!--<el-menu-item-group>-->
                                    <!--<router-link to="/publishBox" v-show="Obj.A12B3">-->
                                        <!--<el-menu-item index="121-3">发布箱-->
                                        <!--</el-menu-item>-->
                                    <!--</router-link>-->
                                    <!--<router-link to="/draftBox" v-show="Obj.A12B4">-->
                                        <!--<el-menu-item index="121-4">草稿箱-->
                                        <!--</el-menu-item>-->
                                    <!--</router-link>-->
                                    <!--<router-link to="/timingPublishBox" v-show="Obj.A12B5">-->
                                        <!--<el-menu-item index="121-5">定时发布箱-->
                                        <!--</el-menu-item>-->
                                    <!--</router-link>-->
                                <!--</el-menu-item-group>-->
                            </el-submenu>
                            <el-submenu index="13" v-show="Obj.A13">
                                <template slot="title"><i class="iconfont">&#xe64b;</i>返利体系</template>
                                <router-link to="/highRebate" v-show="Obj.A13B1">
                                    <el-menu-item index="131-1">高级返利
                                    </el-menu-item>
                                </router-link>
                            </el-submenu>
                            <el-submenu index="14" v-show="Obj.A14">
                                <template slot="title"><i class="iconfont">&#xe756;</i>金币管理</template>
                                <router-link to="/goldPoolManagement" v-show="Obj.A14B1">
                                    <el-menu-item index="141-1">金币池管理</el-menu-item>
                                </router-link>
                                <router-link to="/goldPayment" v-show="Obj.A14B2">
                                    <el-menu-item index="141-2">金币发放</el-menu-item>
                                </router-link>
                                <router-link to="/goldDeduction" v-show="Obj.A14B3">
                                    <el-menu-item index="141-3">金币扣除</el-menu-item>
                                </router-link>
                                <router-link to="/viewGoldLog" v-show="Obj.A14B4">
                                    <el-menu-item index="141-4">查看日志</el-menu-item>
                                </router-link>
                            </el-submenu>
                        </el-menu>
                    </div>
                </el-col>
                <!--router-->
                <el-col :span="21" class="router-area">
                    <!-- 缓存所有的页面 -->
                    <!--<keep-alive>-->
                        <router-view></router-view>
                    <!--</keep-alive>-->
                    <!--<keep-alive>-->
                        <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
                    <!--</keep-alive>-->
                    <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
//    var flag = true;
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                height: '',
                currentUser: '',//当前用户
                Obj: {
                    A1: false,
                    A1B1: false,
                    A1B2: false,
                    A1B3: false,
                    A1B4: false,
                    A1B5: false,
                    A1B6: false,
                    A1B7: false,
                    A1B8: false,
                    A1B9: false,
                    A1B10: false,
                    A1B11: false,
                    A1B12: false,
                    A1B13: false,
                    A2: false,
                    A2B1: false,
                    A2B2: false,
                    A2B3: false,
                    A2B4: false,
                    A2B5: false,
                    A2B6: false,
                    A2B7: false,
                    A2B8: false,
                    A2B9: false,
                    A2B10: false,
                    A3: false,
                    A3B1: false,
                    A4: false,
                    A4B1: false,
                    A4B2: false,
                    A4B3: false,
                    A4B4: false,
                    A4B5: false,
                    A4B6: false,
                    A4B7: false,
                    A4B8: false,
                    A4B9: false,
                    A5: false,
                    A5B1: false,
                    A5B2: false,
                    A5B3: false,
                    A5B4: false,
                    A5B5: false,
                    A6: false,
                    A6B1: false,
                    A6B2: false,
                    A6B3: false,
                    A7: false,
                    A7B1: false,
                    A7B2: false,
                    A7B3: false,
                    A7B4: false,
                    A7B5: false,
                    A7B6: false,
                    A8: false,
                    A8B1: false,
                    A8B2: false,
                    A8B3: false,
                    A9: false,
                    A9B1: false,
                    A10: false,
                    A10B1: false,
                    A10B2: false,
                    A11: false,
                    A11B1: false,
                    A11B2: false,
                    A11B3: false,
                    A12: false,
                    A12B1: false,
                    A12B2: false,
                    A12B3: false,
                    A12B4: false,
                    A12B5: false,
                    A13: false,
                    A13B1: false,
                    A14: false,
                    A14B1: false,
                    A14B2: false,
                    A14B3: false,
                    A14B4: false,
                },
                Arr: ["A1", "A1B1", "A1B2", "A1B3", "A1B4", "A1B5", "A1B6", "A1B7", "A1B8", "A1B9", "A1B10", "A1B11", "A1B12","A1B13", "A2", "A2B1", "A2B2", "A2B3", "A2B4", "A2B5", "A2B6","A2B7","A2B8","A2B9","A2B10", "A3", "A3B1", "A4", "A4B1", "A4B2", "A4B3", "A4B4", "A4B5", "A4B6", "A4B7", "A4B8", "A4B9", "A5", "A5B1", "A5B2", "A5B3", "A5B4", "A5B5", "A6", "A6B1", "A6B2", "A6B3", "A7", "A7B1", "A7B2","A7B3","A7B4","A7B5","A7B6","A8", "A8B1", "A8B2", "A8B3", "A9", "A9B1", "A10", "A10B1", "A10B2", "A11", "A11B1", "A11B2", "A11B3", "A12", "A12B1", "A12B2", "A12B3", "A13", "A13B1","A14", "A14B1", "A14B2", "A14B3","A14B4"],
                isShow: true,
                ruleForm2: {
                    pass: 'admin',
                    checkPass: 'admin000'
                },
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'},
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]

                },
                defaultActive:'',//展开时默认高亮某列中的某个子项
                list:[],//需要缓存的页面
            };
        },
//        watch:{
//            '$route':function(newv,oldv){
//                console.log('333333');
//                console.log(newv.name, oldv.name);
//                if(oldv.name !=='aditBindSpu' && newv.name === 'activityList'){
//                    console.log('111111111111缓存');
//                    this.list = [];
//                }
//                if(oldv.name ==='activityList' && newv.name !== 'aditBindSpu'){
//                    console.log('22222222222222不缓存');
//                    this.list = [];
//                }
//                console.log(this.list);
//            }
//        },
        created() {
            this.height = window.innerHeight + 'px';
            this.defaultActive = sessionStorage.defaultActive;
            //判断
            if(sessionStorage.authList){
                this.isShow = false;
                this.currentUser = sessionStorage.userName;
                //判断{}和[]中是否有相同的JSON.parse
                let arr2 = JSON.parse(sessionStorage.authList);
                for (let i = 0; i < arr2.length; i++) {
                    for (let key in this.Obj) {
                        if (arr2[i] == key) {
                            this.Obj[key] = true;
                            console.log(this.Obj[key]);
                        }
                    }
                }
            }
        },
        methods: {
            tuichu() {
                this.$http.post(this.url + '/admin/admin_login_out', {}, {emulateJSON: true}).then(function (res) {
                    if (res.data.status == 200) {
                        this.isShow = true;
                        sessionStorage.clear();
                    }
                })
            },
            submitForm(formName) {
//                this.isShow = false;//暂时
                this.defaultActive = '';//清除sessionStorage
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url + '/admin/admin_login', {
                            loginName: this.ruleForm2.pass,
                            password: this.ruleForm2.checkPass
                        }, {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            if (res.data.status == 202) {
                                alert("用户名或密码错误!")
                            } else {
                                console.log(res.data.data);
                                //截取字符
                                let newArr = [];
                                for (let i = 0; i < res.data.data.length; i++) {
                                    if (res.data.data[i].length > 3) {
                                        //去除字符串后两位
                                        let a = res.data.data[i].substring(0, res.data.data[i].length - 2);
                                        newArr.push(a, res.data.data[i]);
                                    }
                                }
                                //去重
                                let arr2 = [];
                                for (let i = 0; i < newArr.length; i++) {
                                    if (arr2.indexOf(newArr[i]) < 0) {
                                        arr2.push(newArr[i]);
                                    }
                                }
                                //
                                sessionStorage.setItem('authList',JSON.stringify(arr2));
                                sessionStorage.setItem('userName',this.ruleForm2.pass);
                                //
                                //判断{}和[]中是否有相同的
                                for (let i = 0; i < arr2.length; i++) {
                                    for (let key in this.Obj) {
                                        if (arr2[i] == key) {
                                            this.Obj[key] = true;
                                            console.log(this.Obj[key]);
                                        }
                                    }
                                }
                                console.log(arr2);
                                this.currentUser = this.ruleForm2.pass;
                                this.isShow = false;
                                this.$router.push({
                                    path: '/',
                                    query: {}
                                })
                            }
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            menuChange(val){
                console.log(val);
                //点击缓存某子项下标
                sessionStorage.setItem('defaultActive',val);
            },
        },
    }
</script>
<style>
    /*<!--修改-->*/
    .el-menu-item-group__title{
        padding-top: 0px;
    }
    .el-form-item {
        margin-bottom: 15px;
    }
    /*全局form,p,span,table,分页器,输入框字体*/
    p,span,.el-table,.el-form-item__label,.el-pagination,.el-pagination__sizes .el-input .el-input__inner,.el-pager li,.el-pagination__editor,.el-input__inner,.el-radio__label,.el-cascader__label{
        font-size: 12px;
    }
    .fs{
        font-size: 12px;
    }
    .p{
        font-size: 22px;
        color:white;
        padding-left: 20px;
    }
    /*<!--修改-->*/
    html, body {
        /*overflow-x: hidden;*/
        overflow: hidden;
    }
    * {
        padding: 0;
        margin: 0;
    }

    #app {
        min-width: 1000px;
        height: 100%;
        overflow-x: hidden;
    }
    .nav {
        /*background: lightsteelblue;*/
        background: #20a0ff;
        /*line-height: 50px;*/
        line-height: 8vh;
        /*注意height会影响布局 高度不适会导致布局混乱*/
        height: 9%;
    }

    .content {
        position: relative;
        height: 91%;
        /*overflow: scroll;*/
    }

    .hoverspan {
        background: gainsboro;
        position: absolute;
        z-index: -1;
        width: 100%;
        /*height: 584px;*/
        height: 100vh;
        /*overflow: scroll;*/
    }

    a {
        text-decoration: none;
    }

    h3 {
        color: white;
    }

    .el-col-first h3 {
        text-align: center;
    }

    .login {
        padding-top: 200px;
        width: 400px;
        height: 100vh;
        margin: auto;
    }

    .login0 {
        width: 100%;
        height: 100vh;
        margin: auto;
        background: url("./assets/bg.jpg") 0 0 no-repeat;
        background-size: 100% 100%;
    }

    .aa {
        height: 50px;
    }

    .login-btn {
        text-align: center;
    }

    .current-user {
        font-size: 20px;
        color: white;
    }
    /*修改路由区字体*/
    .router-area {
        font-size: 12px;
        padding-top: 10px;
        padding-left: 12px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .aside {
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    /*snow*/
    .snow-container {
        position: absolute;
        height: 100vh;
        width: 100%;
        max-width: 100%;
        top: 0;
        overflow: hidden;
        z-index: 2;
        pointer-events: none;

    }

    .snow-container.two {
        height: 440px;
    }

    .snow {
        display: block;
        position: absolute;
        z-index: 2;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
        -webkit-animation: snow linear infinite;
        animation: snow linear infinite;
    }

    .snow.foreground {
        background-image: url("https://dl6rt3mwcjzxg.cloudfront.net/assets/snow/snow-large-075d267ecbc42e3564c8ed43516dd557.png");
        -webkit-animation-duration: 15s;
        animation-duration: 15s;
    }

    .snow.foreground.layered {
        -webkit-animation-delay: 7.5s;
        animation-delay: 7.5s;
    }

    .snow.middleground {
        background-image: url(https://dl6rt3mwcjzxg.cloudfront.net/assets/snow/snow-medium-0b8a5e0732315b68e1f54185be7a1ad9.png);
        -webkit-animation-duration: 20s;
        animation-duration: 20s;
    }

    .snow.middleground.layered {
        -webkit-animation-delay: 10s;
        animation-delay: 10s;
    }

    .snow.background {
        background-image: url(https://dl6rt3mwcjzxg.cloudfront.net/assets/snow/snow-small-1ecd03b1fce08c24e064ff8c0a72c519.png);
        -webkit-animation-duration: 30s;
        animation-duration: 30s;
    }

    .snow.background.layered {
        -webkit-animation-delay: 15s;
        animation-delay: 15s;
    }

    @-webkit-keyframes snow {
        0% {
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
        100% {
            -webkit-transform: translate3d(15%, 100%, 0);
            transform: translate3d(15%, 100%, 0);
        }
    }

    @keyframes snow {
        0% {
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
        100% {
            -webkit-transform: translate3d(15%, 100%, 0);
            transform: translate3d(15%, 100%, 0);
        }
    }

    @media (max-width: 1366px) {
        .snow-container {
            position: absolute;
            height: 628px;
        }

    }

    @media (max-width: 1280px) {
        .snow-container {
            position: absolute;
            height: 578px;
        }
    }

    @media (max-width: 1080px) {
        .snow-container {
            position: absolute;
            height: 498px;
        }
    }

    @media (max-width: 1054px) {

    }

    @media (max-width: 1024px) {

    }

    @media (max-width: 991px) {
        .snow-container.two {
            height: 365px;
        }

    }

    @media (max-width: 800px) {

        .snow-container {
            position: absolute;
            height: 375px;
        }

        .snow-container.two {
            height: 352px;
        }
    }

    @media (max-width: 768px) {
        .snow-container {
            position: absolute;
            height: 373px;
        }
    }

    @media (max-width: 640px) {

    }

    @media (max-width: 480px) {

    }

    @media (max-width: 414px) {

    }

    @media (max-width: 384px) {

    }


</style>