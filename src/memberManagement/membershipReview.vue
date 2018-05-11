<template>
    <!--会员资格审核-->
    <div class="membership-review">
        <el-row :gutter="24" class="el-row1">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <span class="spans0">店主姓名</span>
                    <el-input type="primary"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <span class="spans1">手机号</span>
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
                             prop="number"
                             label="序号"
                             width="70">
            </el-table-column>
            <el-table-column
                             prop="orderNumber"
                             label="订单号"
                             width="140">
            </el-table-column>
            <el-table-column
                             prop="ownerName"
                             label="店主姓名"
                             width="100">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="WechatNumber"
                    label="微信号"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="grade"
                    label="等级"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="agents"
                    label="代理商"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="affiliatedTeam"
                    label="所属团队"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="createDate"
                    label="创建时间"
                    width="140">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    prop="operate"
                    label="操作"
                    width="140">
                <template scope="scope">
                    <el-button type="text" size="small">通过审核</el-button>
                    <el-button type="text" size="small">删除</el-button>
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
                       number:1,
                       orderNumber:'F2222222222',
                       ownerName:'哈哈哈',
                       phone:'12345678908',
                       WechatNumber:'12345678908',
                       grade:'旗舰店',
                       agents:'否',
                       affiliatedTeam:'销售一部',
                       status:'审核中',
                       createDate:'2017-6-80',
                   },
                       {
                           number:2,
                           orderNumber:'F2222222222',
                           ownerName:'哈哈哈',
                           phone:'12345678908',
                           WechatNumber:'12345678908',
                           grade:'旗舰店',
                           agents:'否',
                           affiliatedTeam:'销售一部',
                           status:'审核中',
                           createDate:'2017-6-80',
                       }],
//                   默认显示当前页数
                   currentPage:1
               }
           }
    }
</script>

<style scoped>
    /**/
    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .spans0 {
         width: 100px;
     }
    .spans1 {
        width: 70px;
    }
    .el-row1 {
        margin: 0 0 10px 0;
        text-align: left;
    }
    .block{
        text-align: right;
        margin: 10px 0;
    }

</style>
