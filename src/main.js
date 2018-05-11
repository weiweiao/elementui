import Vue from 'vue'
//全局引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Router from 'vue-router'
import Resource from 'vue-resource'
import App from './App.vue'
import echarts from 'echarts'
import moment from 'moment'

Vue.use(ElementUI)
Vue.use(Router)
Vue.use(Resource)
Vue.use(moment)
Vue.config.productionTip = false;
//用途就是允许跨域请求携带cookie做身份认证
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true
//拦截器，作用是可以在请求前和发送请求后做一些处理
Vue.http.interceptors.push(function(request, next) {//拦截器
// 跨域携带cookie
    request.credentials = true;
    //全局403 刷新页面
    next((res)=>{
        console.log(res);
        console.log(res.data.status);
        if(res.data.status==403){
            sessionStorage.clear();
            window.location.reload();
            // this.$router.push({path:'/App'})
        }
        if(res.status==0){
            this.$message({
                type:'error',
                message:'服务器中断...'
            })
        }
    })
});

//全局url
import global from './global'
Vue.prototype.url=global.web;//后台路径
Vue.prototype.urldown=global.urldown;//导出
Vue.prototype.urls=global.urls;//图片上传

//全局时间函数
import {formatDate} from './methods'
Vue.filter('time',function (value) {
    let date = new Date(value);
    // return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    return formatDate(date, 'yyyy-MM-dd hh:mm');
});


//路由页面引入
import main from './components/main.vue'
import test from './components/test.vue'
import users from './components/users.vue'
import xw from './components/xw.vue'
import adit from './components/adit.vue'
import aa from './components/aa.vue'
import yy from './components/yy.vue'
import weituisong from './components/weituisong.vue'
//会员管理模块
import changePassword from './memberManagement/changePassword.vue'
import memberList from './memberManagement/memberList.vue'
import teamList from './memberManagement/teamList.vue'
import membershipReview from './memberManagement/membershipReview.vue'
import realNameVertification from './memberManagement/realNameVertification.vue'
import orderInquire from './memberManagement/orderInquire.vue'
import accountInquiry from './memberManagement/accountInquiry.vue'
import userInquiry from './memberManagement/userInquiry.vue'
import shopMergeList from './memberManagement/shopMergeList.vue'
import clientManagerAuditList from './memberManagement/clientManagerAuditList.vue'
import dataAttribute from './memberManagement/dataAttribute.vue'
import downGradeList from './memberManagement/downGradeList.vue'
import blackList from './memberManagement/blackList.vue'
import physicalStore from './memberManagement/physicalStore.vue'
//商城管理模块
import mallSetup from './mallManagement/mallSetup.vue'
import qiqiaoPlateSetup from './mallManagement/qiqiaoPlateSetup.vue'
import selfDefineProduct from './mallManagement/selfDefineProduct.vue'
import joinCommodityActivityPage from './mallManagement/joinCommodityActivityPage.vue'
import templateSet from './mallManagement/templateSet.vue'
import secondPage from './mallManagement/secondPage.vue'
import secondAdit from './mallManagement/secondAdit.vue'
import secondAdit2 from './mallManagement/secondAdit2.vue'
import firstPage from './mallManagement/firstPage.vue'
import firstPageRunPics from './mallManagement/firstPageRunPics.vue'
import TBBB from './mallManagement/TBBB.vue'
import TAAA from './mallManagement/TAAA.vue'
import joinActivityProducts from './mallManagement/joinActivityProducts.vue'
import commodityList from './mallManagement/commodityList.vue'
//仓库管理
import warehouseList from './warehouseManagement/warehouseList.vue'
//商品管理
import synchronizeCommodityLibrary from './commodityManagement/synchronizeCommodityLibrary.vue'
import combinationCommodity from './commodityManagement/combinationCommodity.vue'
import frontModule from './commodityManagement/frontModule.vue'
import brand from './commodityManagement/brand.vue'
import commodity from './commodityManagement/commodity.vue'
import rebate from './commodityManagement/rebate.vue'
import label from './commodityManagement/label.vue'
import setSecond from './commodityManagement/setSecond.vue'
import inquirySpu from './commodityManagement/inquirySpu.vue'
import publish1 from './commodityManagement/publish1.vue'
import publish10 from './commodityManagement/publish10.vue'
import publish2 from './commodityManagement/publish2.vue'
import bindSpu from './commodityManagement/bindSpu.vue'
import FMadit from './commodityManagement/FMadit.vue'
import originPlace from './commodityManagement/originPlace.vue'
//营销活动
import couponsList from './marketActivities/couponsList.vue'
import rushBuy from './marketActivities/rushBuy.vue'
import shopJoinActivitiesGoods from './marketActivities/shopJoinActivitiesGoods.vue'
import skuActivity from './marketActivities/skuActivity.vue'
import activityList from './marketActivities/activityList.vue'
import discount from './marketActivities/discount.vue'
import createdActivity from './marketActivities/createdActivity.vue'
import aditBindSpu from './marketActivities/aditBindSpu.vue'
import aditBindSpu2 from './marketActivities/aditBindSpu2.vue'
import addCouponPackage from './marketActivities/addCouponPackage.vue'
import bindCoupon from './marketActivities/bindCoupon.vue'
import activityOne from './marketActivities/activityOne.vue'
import activityTwo from './marketActivities/activityTwo.vue'
import activityThree from './marketActivities/activityThree.vue'
//订单管理
import commodityOrderInquiry from './orderManagement/commodityOrderInquiry.vue'
import refundApplicationForm  from './orderManagement/refundApplicationForm.vue'
import notPushedOrderList from './orderManagement/notPushedOrderList.vue'
import refound from './orderManagement/refound.vue'
// 财务管理
import financialAudit from './financialManagement/financialAudit.vue'
import cashRecordsList from './financialManagement/cashRecordsList.vue'
import transactionCompletionReport from './financialManagement/transactionCompletionReport.vue'
import transactionCompletedProductSummary from './financialManagement/transactionCompletedProductSummary.vue'
import salaryManagement from './financialManagement/salaryManagement.vue'
import monthDetails from './financialManagement/monthDetails.vue'
import dayDetails from './financialManagement/dayDetails.vue'
import financialReport from './financialManagement/financialReport.vue'
//统计管理statisticalManagement
import basicStatistics from './statisticalManagement/basicStatistics.vue'
import shopList from './statisticalManagement/shopList.vue'
import dataQuerySystem from  './statisticalManagement/dataQuerySystem.vue'
//微信设置
import automaticResponse from './WechatSet/automaticResponse.vue'
//客服服务
import questionType from './customerService/questionType.vue'
import questionList from './customerService/questionList.vue'
//权限管理
import departmentManagement from './authorityManagement/departmentManagement.vue'
import memberManagement from './authorityManagement/memberManagement.vue'
import moduleManagement from './authorityManagement/moduleManagement.vue'
import authoritySet from './authorityManagement/authoritySet.vue'
import memberAuthoritySet from './authorityManagement/memberAuthoritySet.vue'
//返利体系
import highRebate from './rebateSystem/highRebate.vue'
//金币管理
import goldPoolManagement from './goldManagement/goldPoolManagement.vue'
import goldPayment from './goldManagement/goldPayment.vue'
import goldDeduction from './goldManagement/goldDeduction.vue'
import fillLog from './goldManagement/fillLog.vue'
import viewGoldLog from './goldManagement/viewGoldLog.vue'
import viewLog from './goldManagement/viewLog.vue'

//发现
import runPics from './find/runPics.vue'
import customizeTopic from './find/customizeTopic.vue'
import materialManage from './find/materialManage.vue'
import recycleBin from './find/recycleBin.vue'
import aditFindMaterial from './find/aditFindMaterial.vue'
//以下暂时无
import publishBox from './find/publishBox.vue'
import draftBox from './find/draftBox.vue'
import timingPublishBox from './find/timingPublishBox.vue'
import findMaterial from './find/findMaterial.vue'
import pics from './find/pics.vue'

const router = new Router({
    name: 'rout',
    mode: 'history',
    base: __dirname,
    routes: [
        {path:"/",component:main},
        {
            path:"/main",component:main,
            // children:[
            //   {path:'/news',component:news},
            //   {path:'/hd',component:hd}
            // ]
        },
        {path:'/adit',component:adit},
        {path:'/aa',component:aa},
        {path:"/test",component:test},
        {path:"/users",component:users},
        {path:"/xw",component:xw},
        {path:"/yy",component:yy},
        {path:"/weituisong",component:weituisong},
        //会员管理
        {path:"/changePassword",component:changePassword},
        {path:"/memberList",component:memberList},
        {path:"/teamList",component:teamList},
        {path:"/membershipReview",component:membershipReview},
        {path:"/realNameVertification",component:realNameVertification},
        {path:"/orderInquire",component:orderInquire},
        {path:"/accountInquiry",component:accountInquiry},
        {path:"/userInquiry",component:userInquiry},
        {path:"/shopMergeList",component:shopMergeList},
        {path:"/clientManagerAuditList",component:clientManagerAuditList},
        {path:"/dataAttribute",component:dataAttribute},
        {path:"/downGradeList",component:downGradeList},
        {path:"/blackList",component:blackList},
        {path:"/physicalStore",component:physicalStore},
    //    商城管理
        {path:"/mallSetup",component:mallSetup},
        {path:"/qiqiaoPlateSetup",component:qiqiaoPlateSetup},
        {path:"/selfDefineProduct",component:selfDefineProduct},
        {path:"/joinCommodityActivityPage",component:joinCommodityActivityPage},
        {path:"/templateSet",component:templateSet},
        {path:"/secondPage",component:secondPage},
        {path:"/secondAdit",component:secondAdit},
        {path:"/secondAdit2",component:secondAdit2},
        {path:"/firstPage",component:firstPage},
        {path:"/firstPageRunPics",component:firstPageRunPics},
        {path:"/TBBB",component:TBBB},
        {path:"/TAAA",component:TAAA},
        {path:"/joinActivityProducts",component:joinActivityProducts},
        {path:"/commodityList",component:commodityList},
       //仓库管理
        {path:"/warehouseList",component:warehouseList},
    //    商品管理
        {path:"/synchronizeCommodityLibrary",component:synchronizeCommodityLibrary},
        {path:"/commodity",component:commodity},
        {path:"/combinationCommodity",component:combinationCommodity},
        {path:"/frontModule",component:frontModule},//不能用class命名 特殊
        {path:"/brand",component:brand},
        {path:"/rebate",component:rebate},
        {path:"/label",component:label},
        {path:"/setSecond",component:setSecond},
        {path:"/inquirySpu",component:inquirySpu},
        {path:"/publish1",component:publish1},
        {path:"/publish10",component:publish10},
        {path:"/publish2",component:publish2},
        {path:"/bindSpu",component:bindSpu},
        {path:"/FMadit",component:FMadit},
        {path:"/originPlace",component:originPlace},
        //营销活动
        {path:"/couponsList",component:couponsList},
        {path:"/rushBuy",component:rushBuy},
        {path:"/shopJoinActivitiesGoods",component:shopJoinActivitiesGoods},
        {path:"/skuActivity",component:skuActivity},
        // {path:"/activityList",component:activityList,meta:{keepAlive:true}},//缓存页面
        {path: '/activityList',component:activityList,name:'activityList'},
        {path:"/discount",component:discount},
        {path:"/createdActivity",component:createdActivity},
        {path:"/aditBindSpu",component:aditBindSpu,name:'aditBindSpu'},
        {path:"/aditBindSpu2",component:aditBindSpu2},
        // { path: '/aditBindSpu',component:aditBindSpu, meta:{keepAlive:true}},//有的组件跳该组件时,页面不刷新
        {path:"/addCouponPackage",component:addCouponPackage},
        {path:"/bindCoupon",component:bindCoupon},
        {path:"/activityOne",component:activityOne},
        {path:"/activityTwo",component:activityTwo},
        {path:"/activityThree",component:activityThree},
        //订单管理
        {path:"/commodityOrderInquiry",component:commodityOrderInquiry},
        {path:"/refundApplicationForm",component:refundApplicationForm},
        {path:"/notPushedOrderList",component:notPushedOrderList},
        {path:"/refound",component:refound},
        //财务管理
        {path:"/cashRecordsList",component:cashRecordsList},
        {path:"/financialAudit",component:financialAudit},
        {path:"/transactionCompletionReport",component:transactionCompletionReport},
        {path:"/transactionCompletedProductSummary",component:transactionCompletedProductSummary},
        {path:"/salaryManagement",component:salaryManagement},
        {path:"/monthDetails",component:monthDetails},
        {path:"/dayDetails",component:dayDetails},
        {path:"/financialReport",component:financialReport},
        //统计管理
        {path:"/basicStatistics",component:basicStatistics},
        {path:"/shopList",component:shopList},
        {path:"/dataQuerySystem",component:dataQuerySystem},
       //微信设置
        {path:"/automaticResponse",component:automaticResponse},
       //    客服服务
        {path:"/questionType",component:questionType},
        {path:"/questionList",component:questionList},
    //    权限管理
        {path:"/departmentManagement",component:departmentManagement},
        {path:"/memberManagement",component:memberManagement},
        {path:"/moduleManagement",component:moduleManagement},
        {path:"/authoritySet",component:authoritySet},
        {path:"/memberAuthoritySet",component:memberAuthoritySet},
        //返利体系
        {path:"/highRebate",component:highRebate},
        //发现
        {path:"/runPics",component:runPics},
        {path:"/customizeTopic",component:customizeTopic},
        {path:"/materialManage",component:materialManage},
        {path:"/recycleBin",component:recycleBin},
        {path:"/publishBox",component:publishBox},
        {path:"/draftBox",component:draftBox},
        {path:"/timingPublishBox",component:timingPublishBox},
        {path:"/findMaterial",component:findMaterial},
        {path:"/pics",component:pics},
        {path:"/aditFindMaterial",component:aditFindMaterial},
        //金币管理
        {path:"/goldPoolManagement",component:goldPoolManagement},
        {path:"/goldPayment",component:goldPayment},
        {path:"/goldDeduction",component:goldDeduction},
        {path:"/fillLog",component:fillLog},
        {path:"/viewGoldLog",component:viewGoldLog},
        {path:"/viewLog",component:viewLog},


    ]
});


new Vue({
    el: '#app',
    router,
    render: h => h(App),
      // template: '<App/>',
      // components: { App }
});