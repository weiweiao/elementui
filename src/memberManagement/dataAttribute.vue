<template>
    <!--流量分配-->
    <div class="data-attribute">
        <el-button>录入会员</el-button>
        <!--table-->
        <el-table
                :data="tableData3"
                border
                style="width: 100%"
                max-height="600">
            <el-table-column fixed
                             prop="number"
                             label="序号"
                             width="160">
            </el-table-column>
            <el-table-column
                    prop="shopNumber"
                    label="店铺编号"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="memberName"
                    label="会员姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="weights"
                    label="权重"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="fweightsRate"
                    label="权重占比"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="operate"
                    label="操作"
                    width="120">
                <template scope="scope">
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
                    number:"12222121212121",
                    shopNumber:'你你你额',
                    memberName:'不通过',
                    weights:64,
                    fweightsRate:90
                },
                    {
                        number:"12222121212121",
                        shopNumber:'你你你额',
                        memberName:'不通过',
                        weights:64,
                        fweightsRate:90
                    }]
            }
        }
    }
</script>

<style scoped>
    .grid-content {
        display: flex;
        line-height: 36px;
    }
    .spans0{
        width: 100px;
    }
    .spans1{
        width: 80px;
    }
    .el-table{
        margin:10px 0;
    }
    .el-row2 {
        margin: 10px 0;
        text-align: left;
    }
    .block{
        text-align: right;
        margin: 10px 0;
    }
</style>



<style scoped>

</style>
