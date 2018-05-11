<template>
    <!--模块管理-->
    <div class="module-management">
        <div class="height" v-loading="loading">
            <el-tree :data="listData"  :props="defaultProps" @node-click="handleNodeClick" class="update"></el-tree>
        </div>
        <div class="btn">
            <el-button type="primary" @click="postdate()">更新</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading:true,
                listData: [],
                flag:true,
                defaultProps: {
                    children: 'childModule',
                    label: 'moduleName',
                },
                arr:[
                    {
                    moduleId: 'A1',
                    moduleName: '会员管理',
                    moduleParentId: '',
                    childModule: [
                        {
                        moduleId: 'A1B1',
                        moduleName: '团队列表',
                        moduleParentId: 'A1',
                    },
//                        {
//                        moduleId: 'A1B2',
//                        moduleName: '会员资格审核',
//                        moduleParentId: 'A1',
//                    },
                    {
                        moduleId: 'A1B3',
                        moduleName: '会员列表',
                        moduleParentId: 'A1',
                    },
//                        {
//                        moduleId: 'A1B4',
//                        moduleName: '实名认证',
//                        moduleParentId: 'A1',
//                    },
//                    {
//                        moduleId: 'A1B5',
//                        moduleName: '订单查询',
//                        moduleParentId: 'A1',
//                    },
//                    {
//                        moduleId: 'A1B6',
//                        moduleName: '账户查询',
//                        moduleParentId: 'A1',
//                    },
//                        {
//                        moduleId: 'A1B7',
//                        moduleName: '用户查询',
//                        moduleParentId: 'A1',
//                    },
//                        {
//                        moduleId: 'A1B8',
//                        moduleName: '店铺合并列表',
//                        moduleParentId: 'A1',
//                    },
                    {
                        moduleId: 'A1B9',
                        moduleName: '店铺升级审核列表',
                        moduleParentId: 'A1',
                    },
//                    {
//                        moduleId: 'A1B10',
//                        moduleName: '流量分配',
//                        moduleParentId: 'A1',
//                    }, {
//                        moduleId: 'A1B11',
//                        moduleName: '降级列表',
//                        moduleParentId: 'A1',
//                    }, {
//                        moduleId: 'A1B12',
//                        moduleName: '黑名单',
//                        moduleParentId: 'A1',
//                    }
                        ,{
                            moduleId: 'A1B13',
                        moduleName: '实体店列表',
                        moduleParentId: 'A1',
                        }
                    ]
                },
                    {
                        moduleId: 'A2',
                        moduleName: '商城管理',
                        moduleParentId: '',
                        childModule: [
//                            {
//                            moduleId: 'A2B1',
//                            moduleName: '商城设置',
//                            moduleParentId: 'A2',
//                        }, {
//                            moduleId: 'A2B2',
//                            moduleName: '七巧板块设置',
//                            moduleParentId: 'A2',
//                        }, {
//                            moduleId: 'A2B3',
//                            moduleName: '自定义商品',
//                            moduleParentId: 'A2',
//                        }, {
//                            moduleId: 'A2B4',
//                            moduleName: '加盟商品活动页',
//                            moduleParentId: 'A2',
//                        }, {
//                            moduleId: 'A2B5',
//                            moduleName: '模板设置',
//                            moduleParentId: 'A2',
//                        },
                        {
                            moduleId: 'A2B6',
                            moduleName: '二级页',
                            moduleParentId: 'A2',
                        },
                            {
                                moduleId: 'A2B7',
                                moduleName: '首页',
                                moduleParentId: 'A2',
                            },
                            {
                                moduleId: 'A2B8',
                                moduleName: '首页轮播图',
                                moduleParentId: 'A2',
                            },
                            {
                                moduleId: 'A2B9',
                                moduleName: '加盟活动商品',
                                moduleParentId: 'A2',
                            },
                            {
                                moduleId: 'A2B10',
                                moduleName: '商品列表',
                                moduleParentId: 'A2',
                            },
                        ]
                    },
                         {
                        moduleId: 'A3',
                        moduleName: '仓库管理',
                        moduleParentId: '',
                        childModule:[{
                            moduleId: 'A3B1',
                            moduleName: '仓库列表',
                            moduleParentId: 'A3',
                        }]
                    },{
                        moduleId: 'A4',
                        moduleName: '商品管理',
                        moduleParentId: '',
                        childModule:[{
                            moduleId: 'A4B1',
                            moduleName: '同步商品库',
                            moduleParentId: 'A4',
                        },{
                            moduleId: 'A4B2',
                            moduleName: '商品',
                            moduleParentId: 'A4',
                        },
//                            {
//                            moduleId: 'A4B3',
//                            moduleName: '组合商品',
//                            moduleParentId: 'A4',
//                        },
                            {
                            moduleId: 'A4B4',
                            moduleName: '前台模块',
                            moduleParentId: 'A4',
                        },{
                            moduleId: 'A4B5',
                            moduleName: '品牌',
                            moduleParentId: 'A4',
                        },
                            {
                            moduleId: 'A4B6',
                            moduleName: '返利',
                            moduleParentId: 'A4',
                        },
                            {
                                moduleId: 'A4B7',
                                moduleName: '标签',
                                moduleParentId: 'A4',
                            },
                            {
                                moduleId: 'A4B8',
                                moduleName: 'spu管理',
                                moduleParentId: 'A4',
                            },
                            {
                                moduleId: 'A4B9',
                                moduleName: '原产地',
                                moduleParentId: 'A4',
                            },
                        ]
                    },
                    {
                        moduleId: 'A5',
                        moduleName: '营销活动',
                        moduleParentId: '',
                        childModule:[
                            {
                            moduleId: 'A5B1',
                            moduleName: '优惠券列表',
                            moduleParentId: 'A5',
                        },
//                    {
//                            moduleId: 'A5B2',
//                            moduleName: '抢购',
//                            moduleParentId: 'A5',
//                        },{
//                            moduleId: 'A5B3',
//                            moduleName: '店铺加盟活动商品',
//                            moduleParentId: 'A5',
//                        },
                            {
                                moduleId: 'A5B4',
                                moduleName: '活动列表',
                                moduleParentId: 'A5',
                            },
//                            {
//                                moduleId: 'A5B5',
//                                moduleName: '创建活动',
//                                moduleParentId: 'A5',
//                            }
                        ]
                    },
                    {
                        moduleId: 'A6',
                        moduleName: '订单管理',
                        moduleParentId: '',
                        childModule:[{
                            moduleId: 'A6B1',
                            moduleName: '商品订单查询',
                            moduleParentId: 'A6',
                        },{
                            moduleId: 'A6B2',
                            moduleName: '退款申请表',
                            moduleParentId: 'A6',
                        },{
                            moduleId: 'A6B3',
                            moduleName: '未推送订单列表',
                            moduleParentId: 'A6',
                        }
                        ]
                    },
                    {
                        moduleId: 'A7',
                        moduleName: '财务管理',
                        moduleParentId: '',
                        childModule:[
                            {
                            moduleId: 'A7B1',
                            moduleName: '提现记录列表',
                            moduleParentId: 'A7',
                        },
                            {
                            moduleId: 'A7B2',
                            moduleName: '财务审核',
                            moduleParentId: 'A7',
                        }, {
                                moduleId: 'A7B3',
                                moduleName: '交易完成报表',
                                moduleParentId: 'A7',
                            },{
                                moduleId: 'A7B4',
                                moduleName: '交易完成商品汇总表',
                                moduleParentId: 'A7',
                            },
                            {
                                moduleId: 'A7B5',
                                moduleName: '客户经理工资管理',
                                moduleParentId: 'A7',
                            },
                            {
                                moduleId: 'A7B6',
                                moduleName: '财务报表',
                                moduleParentId: 'A7',
                            },
                        ]
                    },
//                    {
//                        moduleId: 'A8',
//                        moduleName: '统计管理',
//                        moduleParentId: '',
//                        childModule:[{
//                            moduleId: 'A8B1',
//                            moduleName: '基本统计',
//                            moduleParentId: 'A8',
//                        },{
//                            moduleId: 'A8B2',
//                            moduleName: '店铺排行榜',
//                            moduleParentId: 'A8',
//                        },{
//                            moduleId: 'A8B3',
//                            moduleName: '数据查询系统',
//                            moduleParentId: 'A8',
//                        }]
//                    },
// {
//                        moduleId: 'A9',
//                        moduleName: '微信设置',
//                        moduleParentId: '',
//                        childModule:[{
//                            moduleId: 'A9B1',
//                            moduleName: '自动回复',
//                            moduleParentId: 'A9',
//                        }]
//                    },{
//                        moduleId: 'A10',
//                        moduleName: '客服服务',
//                        moduleParentId: '',
//                        childModule:[{
//                            moduleId: 'A10B1',
//                            moduleName: '问题类型',
//                            moduleParentId: 'A10',
//                        },{
//                            moduleId: 'A10B2',
//                            moduleName: '问题列表',
//                            moduleParentId: 'A10',
//                        }]
//                    },
                    {
                        moduleId: 'A11',
                        moduleName: '权限管理',
                        moduleParentId: '',
                        childModule:[{
                            moduleId: 'A11B1',
                            moduleName: '部门管理',
                            moduleParentId: 'A11',
                        },{
                            moduleId: 'A11B2',
                            moduleName: '成员管理',
                            moduleParentId: 'A11',
                        },{
                            moduleId: 'A11B3',
                            moduleName: '模块管理',
                            moduleParentId: 'A11',
                        }]
                    },
                    {
                        moduleId: 'A12',
                        moduleName: '发现管理',
                        moduleParentId: '',
                        childModule:[{
                            moduleId: 'A12B1',
                            moduleName: '轮播图',
                            moduleParentId: 'A12',
                        },{
                            moduleId: 'A12B2',
                            moduleName: '话题管理',
                            moduleParentId: 'A12',
                        },
                            {
                                moduleId: 'A12B3',
                                moduleName: '素材管理',
                                moduleParentId: 'A12',
                            },
// {
//                            moduleId: 'A12B3',
//                            moduleName: '发布箱',
//                            moduleParentId: 'A12',
//                        },{
//                            moduleId: 'A12B4',
//                            moduleName: '草稿箱',
//                            moduleParentId: 'A12',
//                        },{
//                            moduleId: 'A12B5',
//                            moduleName: '定时发布箱',
//                            moduleParentId: 'A12',
//                        }
                        ]
                    },
                    {
                        moduleId: 'A13',
                        moduleName: '返利体系',
                        moduleParentId: '',
                        childModule:[{
                            moduleId: 'A13B1',
                            moduleName: '高级返利',
                            moduleParentId: 'A13',
                        }]
                    },
                    {
                        moduleId: 'A14',
                        moduleName: '金币管理',
                        moduleParentId: '',
                        childModule:[{
                            moduleId: 'A14B1',
                            moduleName: '金币池管理',
                            moduleParentId: 'A14',
                        },{
                            moduleId: 'A14B2',
                            moduleName: '金币发放',
                            moduleParentId: 'A14',
                        },{
                            moduleId: 'A14B3',
                            moduleName: '金币扣除',
                            moduleParentId: 'A14',
                        },{
                            moduleId: 'A14B4',
                            moduleName: '查看日志',
                            moduleParentId: 'A14',
                        }]
                    }
                ]
            }
        },
        mounted: function () {
            this.$http.post(this.url+'/module/all_module', {emulateJSON: true}).then(function (res) {
                console.log(res);
                this.loading = false;
                this.listData=res.data.data
            },function (err) {
                this.$message({
                    type:'error',
                    message:'服务器连接中断,请联系后台人员!',
                });
            })
        },
        methods: {
            //操作节点
            handleNodeClick(data) {
                console.log(data);
            },
            distill(arr) {
                let nowarr = [];
                for (let key in arr) {
                    // 提取childModule
                    var tempchild = arr[key].childModule;
                    //删除父级模块的childModule
                    delete arr[key].childModule;
                    nowarr.push(arr[key]);
                    //遍历子模块
                    for (let i in tempchild) {
                        nowarr.push(tempchild[i]);
                    }
                }
                console.log('hghghhghjjj');
                return nowarr;
            },
            postdate() {
                this.loading = true;
                if(!this.flag){
                    return;
                };
                this.flag=false;
                console.log(this.arr);
                let temp=[];
                for (let key in this.arr){
                    temp.push(this.arr[key]);
                }
                let newarr = this.distill(temp);
//                console.log(this.arr);
                console.log(newarr);
                let jsondate = JSON.stringify(newarr);
                console.log(jsondate);
                this.$http.post(this.url+'/module/add_module', {moduleJson:jsondate}, {emulateJSON: true}).then(function (res) {
                    console.log(res);
                    this.loading = false;
                    if (res.data.status == 200){
                        this.$http.post(this.url+'/module/all_module', {emulateJSON: true}).then(function (res) {
                            console.log(res);
                            this.flag=true;
                            this.arr=this.listData=res.data.data;
                        })
                    }else{
                        console.log('返回失败')
                    }
                }, function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            },
        }
    };
</script>

<style scoped>
    .update {
        text-align: left;
        margin-top: 10px;
    }
    .height{
        max-height: 460px;
        overflow: scroll;
    }
    .btn{
        text-align: center;
        margin-top: 10px;
    }
</style>
