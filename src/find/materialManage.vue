<template>
    <!--素材管理-->
    <div>
        <el-button style="margin-bottom: 8px" @click="add">添加素材</el-button>
        <el-tabs type="border-card" @tab-click="tabClick">
            <el-tab-pane label="已发布">
                <publishBox :msgfromfather="tabsIndex"></publishBox>
            </el-tab-pane>
            <el-tab-pane label="定时发布箱">
                <timingPublishBox :msgfromfather="tabsIndex"></timingPublishBox>
            </el-tab-pane>
            <el-tab-pane label="草稿箱">
                <draftBox :msgfromfather="tabsIndex"></draftBox>
            </el-tab-pane>
            <el-tab-pane label="回收站">
                <recycleBin :msgfromfather="tabsIndex"></recycleBin>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/javascript">
    import publishBox from '../find/publishBox.vue'
    import timingPublishBox from '../find/timingPublishBox.vue'
    import draftBox from '../find/draftBox.vue'
    import recycleBin from '../find/recycleBin.vue'
    export default {
        components:{
            publishBox,
            timingPublishBox,
            draftBox,
            recycleBin,
        },
        data() {
            return {
                tabsIndex:'0',//tabs下标
            }
        },
        methods: {
            //tabs
            tabClick(val){
                console.log(val);
                this.tabsIndex = val.index;
                console.log(this.tabsIndex);
            },
            //添加
            add(){
                this.$router.push({path:'/findMaterial'})
            }
        },
        mounted()
        {
            console.log(this.tabsIndex);
        }
    }
</script>

<style scoped>

</style>
