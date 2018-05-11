<template>
    <!--基本统计-->
    <div class="basic-statistics">

        <span>时间</span>
        <el-select v-model="value" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button type="primary">查询</el-button>

        <el-tabs v-model="activeName" @tab-click="handleClick"  type="border-card">
            <el-tab-pane label="用户统计数据" name="first">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="type"
                            label="分类"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="orderNumber"
                            label="单数"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="单价">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="总金额">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="用户统计(新)" name="second">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="type"
                            label="分类"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="orderNumber"
                            label="单数"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="单价">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="总金额">
                    </el-table-column>
                </el-table>
                <p>* 最早计算时间从2017年5月29日 00:00:00开始</p>
            </el-tab-pane>
            <el-tab-pane label="订单数据统计" name="third">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="orderType"
                            label="订单类型"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="orderNumber"
                            label="单数"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="goldCoin"
                            label="摊分金币">
                    </el-table-column>
                    <el-table-column
                            prop="cash"
                            label="摊分现金">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="总额">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="订单类目统计" name="fourth">
                <div id="myChart" :style="{width: '600px', height: '400px'}"></div>
            </el-tab-pane>
            <el-tab-pane label="客单数统计" name="fifth">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="payOrderNumber"
                            label="支付单数"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="orderNumber"
                            label="下单人数"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="payTotal"
                            label="支付总金额">
                    </el-table-column>
                    <el-table-column
                            prop="payGoldCoin"
                            label="支付总金币">
                    </el-table-column>
                    <el-table-column
                            prop="totalOffer"
                            label="支付总优惠">
                    </el-table-column>
                    <el-table-column
                            prop="totalPay"
                            label="总支付">
                    </el-table-column>
                    <el-table-column
                            prop="packagePrice"
                            label="客包价">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/pie')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')


    export default {
        data() {
            return {
                activeName: 'first',
                options: [{
                    value: '选项1',
                    label: '全部'
                }, {
                    value: '选项2',
                    label: '今天'
                }, {
                    value: '选项3',
                    label: '昨天'
                }, {
                    value: '选项4',
                    label: '七天'
                }, {
                    value: '选项5',
                    label: '两周'
                }, {
                    value: '选项6',
                    label: '一月'
                }],
                value: ''
            }
        },
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: {text: '订单类目统计',left: 'center',},
                    tooltip: {},

                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data:  ["食品", "母婴", "美妆个护", "保健品", "奢侈品", "箱包","日用品","男士专区","智能生活","服饰馆"]
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'食品'},
                                {value:310, name:'母婴'},
                                {value:234, name:'美妆个护'},
                                {value:135, name:'保健品'},
                                {value:1548, name:'奢侈品'},
                                {value:1548, name:'箱包'},
                                {value:1548, name:'日用品'},
                                {value:1548, name:'男士专区'},
                                {value:1548, name:'智能生活'},
                                {value:1548, name:'服饰馆'},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]

                });
            }
        },
    }
</script>

<style scoped>
p{
    color: red;
    font-size: 14px;
}
    .el-tabs{
        margin-top: 10px;
    }
.el-tabs--border-card>.el-tabs__content{
    padding: 0px;
}
</style>
