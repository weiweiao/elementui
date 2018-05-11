<template>
    <!--店铺排行榜-->
    <div class="shop-list">

        <el-tabs v-model="activeName" @tab-click="handleClick"  type="border-card">
            <el-tab-pane label="2017-10" name="first">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="shoperName"
                            label="店主姓名"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="授权时间">
                    </el-table-column>
                    <el-table-column
                            prop="retailSales"
                            label="零售销售额">
                    </el-table-column>
                    <el-table-column
                            prop="totalAccount"
                            label="订单总数">
                    </el-table-column>
                    <el-table-column
                            prop="averageSales"
                            label="平均销售">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="2017-9" name="second">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="shoperName"
                        label="店主姓名"
                >
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="手机号"
                >
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="授权时间">
                </el-table-column>
                <el-table-column
                        prop="retailSales"
                        label="零售销售额">
                </el-table-column>
                <el-table-column
                        prop="totalAccount"
                        label="订单总数">
                </el-table-column>
                <el-table-column
                        prop="averageSales"
                        label="平均销售">
                </el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="2017-8" name="third">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="shoperName"
                            label="店主姓名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="授权时间">
                    </el-table-column>
                    <el-table-column
                            prop="retailSales"
                            label="零售销售额">
                    </el-table-column>
                    <el-table-column
                            prop="totalAccount"
                            label="订单总数">
                    </el-table-column>
                    <el-table-column
                            prop="averageSales"
                            label="平均销售">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="2017-7" name="fourth">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="shoperName"
                            label="店主姓名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="授权时间">
                    </el-table-column>
                    <el-table-column
                            prop="retailSales"
                            label="零售销售额">
                    </el-table-column>
                    <el-table-column
                            prop="totalAccount"
                            label="订单总数">
                    </el-table-column>
                    <el-table-column
                            prop="averageSales"
                            label="平均销售">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="2017-6" name="fifth">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="shoperName"
                            label="店主姓名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="授权时间">
                    </el-table-column>
                    <el-table-column
                            prop="retailSales"
                            label="零售销售额">
                    </el-table-column>
                    <el-table-column
                            prop="totalAccount"
                            label="订单总数">
                    </el-table-column>
                    <el-table-column
                            prop="averageSales"
                            label="平均销售">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="自开店以来" name="sixth">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="shoperName"
                            label="店主姓名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="授权时间">
                    </el-table-column>
                    <el-table-column
                            prop="retailSales"
                            label="零售销售额">
                    </el-table-column>
                    <el-table-column
                            prop="totalAccount"
                            label="订单总数">
                    </el-table-column>
                    <el-table-column
                            prop="averageSales"
                            label="平均销售">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>

<style scoped>
    .el-tabs--border-card>.el-tabs__content{
        padding: 0px;
    }
</style>
