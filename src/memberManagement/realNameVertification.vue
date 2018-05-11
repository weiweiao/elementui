<template>
    <!--实名认证-->
    <div class="real-name-vertification">

        <el-row :gutter="24" class="el-row1">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <span class="spans0">时间范围</span>
                    <el-date-picker
                            v-model="value6"
                            type="daterange"
                            placeholder="选择日期范围">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <span class="spans0">店铺编号</span>
                    <el-input type="primary"></el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary">导出</el-button>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                value6: '',
//               默认显示当前页数
                currentPage: 1
            }
        },

    }
</script>
<style scoped>
    .grid-content {
        display: flex;
        line-height: 36px;
    }
    .spans0 {
        width: 100px;
    }
    .el-row1{
        margin-bottom: 10px;
    }
</style>