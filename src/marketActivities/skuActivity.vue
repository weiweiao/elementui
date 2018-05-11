<template>
    <!--skuActivity-->
    <div>
        <el-table
                class="table"
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="序号"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    prop="skucode"
                    label="skucode"
            >
            </el-table-column>
            <el-table-column
                    prop="skuname"
                    label="skuname"
            >
            </el-table-column>
            <el-table-column
                    prop="activityPrice"
                    label="活动价格"
            >
                <template slot-scope="scope">
                                <span @click="activityPrice(scope.row,scope.$index)"
                                      class="xiaoshou">{{scope.row.activityPrice}}</span>
                        <input class="inputs" v-show="scope.row.activityPriceShow" v-focus v-model="scope.row.activityPriceInput"
                               @blur="activityPriceBlur(scope.row,scope.$index)">
                    </template>
            </el-table-column>
            <el-table-column
                    prop="activityStock"
                    label="活动库存"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData:[],
            }
        },
        methods:{
            //活动价格
            activityPrice(row,index){
                console.log(row, index);
                row.activityPriceShow = true;
                row.activityPriceInput = row.activityPrice;//默认
            },
            activityPriceBlur(row,index){
                if (row.activityPriceInput == row.activityPrice) {
                    row.activityPriceShow = false;
                } else {
                    if (row.activityPriceInput > 0) {

                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请正确填写活动价格!'
                        })
                    }
                }
            },
        },
        //input聚焦
        directives: {
            focus: {
                // 指令的定义
                update: function (el) {
                    el.focus()
                }
            }
        },
        mounted(){
            console.log(this.$route.query.spucode);
            this.$http.post(this.url+'/product/select_productBySpucode',{spucode:this.$route.query.spucode},{emulateJSON:true}).then(function (res) {
                console.log(res);
                for (let i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].activityPriceShow = false;
                    res.data.data[i].activityPriceInput = '';
                    res.data.data[i].activityStockShow = false;
                    res.data.data[i].activityStockInput = '';
                }
                this.tableData=res.data.data
            })
        }
    }
</script>

<style scoped>

</style>
