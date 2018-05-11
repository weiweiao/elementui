<template>
    <!--店铺合并列表-->
    <div class="shop-merge-list">
        <!--nav-->
        <el-row :gutter="24">
            <el-col :span="9">
                <div class="grid-content bg-purple">
                    <el-button type="primary">全部</el-button>
                    <el-button type="primary">待审核</el-button>
                    <el-button type="primary">审核通过</el-button>
                    <el-button type="primary">审核不通过</el-button>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple">
                    <span class="spans0">目标店铺编号</span>
                    <el-input type="primary"></el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-button type="primary">查询</el-button>
                </div>
            </el-col>
        </el-row>
        <!--table-->
        <el-table
                :data="tableData3"
                border
                style="width: 100%"
                max-height="600">
            <el-table-column fixed
                             prop="mainShop"
                             label="主店铺"
                             width="160">
            </el-table-column>
            <el-table-column
                    prop="subShop1"
                    label="子店铺一"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="subShop2"
                    label="子店铺二"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="authenticate"
                    label="认证"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="状态"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="发起时间"
                    width="160"
            >
            </el-table-column>
            <el-table-column
                    fixed="right"
                    prop="address"
                    label="操作"
                    width="60">
                <template scope="scope">
                    <el-button type="text" size="small">审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[30]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="10000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
       data(){
           return{
               tableData3:[{
                   mainShop:"11111111111111",
                   subShop1:'11111111111111',
                   subShop2:'11111111111111',
                   authenticate:'审核不通过看看',
                   phone:'11111111111',
                   state:'坎坎坷坷扩',
                   remark:'坎坎坷坷扩扩扩',
                   time:'2090-9-90 90:90'
               }]
           }
       }
    }
</script>

<style scoped>
.grid-content{
    display: flex;
}
    .spans0{
        width: 200px;
        line-height: 36px;
    }
    .el-table{
        margin: 10px 0;
    }
    .block{
        text-align: right;
    }
</style>
