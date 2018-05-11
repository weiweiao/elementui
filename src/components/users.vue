<template>
    <!--活动列表-->
    <div class="activity-list">
        <div style="margin-bottom: 10px">
            <el-button>满减活动</el-button>
            <el-button>早十晚八</el-button>
            <el-button>限时活动</el-button>
        </div>
        <!--满减活动显示-->
        <div>
            <activityOne></activityOne>
        </div>
        <!--早十晚八显示-->
        <div>

        </div>
        <!--满限时活动显示-->
        <div>

        </div>
    </div>
</template>

<script>
    import activityOne from '../marketActivities/activityOne.vue'
    export default {
        components: {activityOne},
//        name:'activityList',
        data() {
            return {

            }
        },
        methods: {

        },
        created(){

        },
        mounted() {

        },
    }
</script>

<style scoped>
    .el-table .warning-row {
        background: red;
    }

    .el-table .success-row {
        background: green;
    }

    .activity-list {
        font-size: 14px;
        color: #48576a;
        width: 100%;
    }

    .grid-content {
        display: flex;
        line-height: 36px;
    }

    .spans1 {
        width: 80px;
    }

    .spans0 {
        width: 60px;
    }

    .redP {
        color: red;
    }

    .block {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        padding-left: 8px;
    }

    .inputs {
        width: 300px;
    }

    .tws {
        width: 160px;
    }
</style>
