<template>
    <!--黑名单-->
    <div class="black-list">
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="600">
        <el-table-column
                prop="number"
                label="序号"
                width="140">
        </el-table-column>
        <el-table-column
                prop="shopNumber"
                label="店铺编号"
                width="140">
        </el-table-column>
        <el-table-column
                prop="shopOwnerName"
                label="店主姓名"
                width="120">
        </el-table-column>
        <el-table-column
                prop="sex"
                label="性别"
                width="80">
        </el-table-column>

        <el-table-column
                prop="WechatNumber"
                label="微信号"
                width="120">
        </el-table-column>
        <el-table-column
                prop="grade"
                label="等级"
                width="80">
        </el-table-column>
        <el-table-column
                prop="recommendPeople"
                label="推荐人"
                width="120">
        </el-table-column>
        <el-table-column
                prop="flagShop"
                label="旗舰店"
                width="120">
        </el-table-column>
        <el-table-column
            prop="team"
            label="所属团队"
            width="120">
    </el-table-column>
        <el-table-column
                prop="registeredTime"
                label="注册时间"
                width="120">
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
        data() {
            return {
                tableData: [{
                    number:222222,
                    shopNumber:2222,
                    shopOwnerName:'开开开',
                    sex:'怒',
                    WechatNumber:'wwwwwwwww',
                    grade:3,
                    recommendPeople:'坎坎坷坷',
                    team:'坎坎坷坷扩',
                    registeredTime:'2019-90-90 90:90'
                }]
            }
        }
    }
</script>


<style scoped>
    .block{
        text-align: right;
        margin: 10px 0;
    }
</style>
