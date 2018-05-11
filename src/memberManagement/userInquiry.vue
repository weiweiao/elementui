<template>
    <!--用户查询-->
    <div class="user-inquiry">
        <el-row :gutter="24">
        <el-col :span="5">
            <div class="grid-content bg-purple">
                <span class="spans1">请选择</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </el-col>
        <el-col :span="5">
            <div class="grid-content bg-purple">
                <el-input type="primary" placeholder="请输入"></el-input>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-button type="primary">查询</el-button>
            </div>
        </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value:'',//点击出现在输入框中
                options1:[{
                    value:'选项一',
                    label:'用户ID'
                },{
                    value:'选项二',
                    label:'店铺编号'
                },{
                    value:'选项三',
                    label:'手机号'
                }],
                selectedOptions: []
            }
        },

    }
</script>
<style scoped>
    .grid-content {
        display: flex;
        line-height: 36px;
    }
    .spans1 {
        width: 100px;
    }

</style>