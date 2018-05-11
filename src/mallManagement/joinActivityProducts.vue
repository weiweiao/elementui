<template>
    <!--加盟活动商品-->
    <div>
        <div style="display: flex;">
            <el-upload
                    style="display: inline-block;margin-right: 30px;"
                    class="upload-demo"
                    :action="url+'/indexColumn/upload_member_product'"
                    :on-success="handleSuccess"
                    :show-file-list="false"
            >
                <el-button type="primary">
                    指定商品上传
                </el-button>
            </el-upload>
            <!--<a :href="url+'/finance/export_fiancelook'" @click="export0(startTime,endtime)"><el-button type="primary">导出</el-button></a>-->
            <a :href="urldown+'/download_excel_file/KDSP'">
                <el-button type="primary">格式导出</el-button>
            </a>
        </div>
        <el-table
                :data="tableData"
                border
                style="width: 100%;margin-top: 8px;margin-bottom: 10px;">
            <el-table-column
                    type="index"
                    label="序号"
                    width="88">
            </el-table-column>
            <el-table-column
                    prop="spuId"
                    label="spuId"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="spucode"
                    label="spucode">
            </el-table-column>
            <el-table-column
                    prop="spuname"
                    label="商品名称">
                <template slot-scope="scope">
                    {{scope.row.spuname}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="spuTitle"
                    label="商品标题">
                <template slot-scope="scope">
                    {{scope.row.spuTitle}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="memberRole0"
                    label="会员">
                <!--<template slot-scope="scope">-->
                    <!--<p v-text="scope.row.memberRole=='FANS'?'全球金卡':'全球黑卡'"></p>-->
                <!--</template>-->
            </el-table-column>
        </el-table>
        <div style="text-align: center">
            <el-button type="primary" @click="sure">保存</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData:[],
                newArr:[],
            }
        },
        methods: {
            handleSuccess(val){
                console.log(val);
                if(val.status==30001){
                    this.$message({
                        type:'error',
                        message:val.msg,
                    })
                }else if(val.status==202){
                    this.$message({
                        type:'error',
                        message:val.msg,
                    })
                }else{
//                    let obj={};
//                    for(let i=0;i<val.data.length;i++){
//                        this.newArr.push({spuId:val.data[i].spuId,spucode:val.data[i].spucode,memberRole:val.data[i].memberRole})
//                    }
                    for(let i=0;i<val.data.length;i++){
                        if(val.data[i].memberRole=="NORMAL"){
                            val.data[i].memberRole0 = '全球黑卡'
                        }else if(val.data[i].memberRole=="FANS"){
                            val.data[i].memberRole0 = '全球金卡'
                        }else{
                            val.data[i].memberRole0 = ''
                        }
                    }
                    this.tableData = val.data;
                }
            },
            export0(){
                this.$message({
                    type:'warning',
                    message:'暂时无!'
                });
            },
            sure(){
                this.newArr=[];
                let obj = {};
                for(let i=0;i<this.tableData.length;i++){
                    this.newArr.push({spuId:this.tableData[i].spuId,spucode:this.tableData[i].spucode,memberRole:this.tableData[i].memberRole})
                }
                this.$http.post(this.url+'/indexColumn/save_member_product',{data:JSON.stringify(this.newArr)},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.status==200){
                        this.$message({
                            type:'success',
                            message:'保存成功!'
                        });
                    }else{
                        this.$message({
                            type:'success',
                            message:'保存失败!'
                        })
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
            //ajax
            ajax(){
                this.$http.post(this.url+'/indexColumn/select_member_product',{},{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null||res.data==null){
                        this.tableData  = [];
                    }else {
                        for(let i=0;i<res.data.data.length;i++){
                            console.log(res.data.data[i].memberRole);
                            if(res.data.data[i].memberRole=="NORMAL"){
                                res.data.data[i].memberRole0 = '全球黑卡'
                            }else if(res.data.data[i].memberRole=="FANS"){
                                res.data.data[i].memberRole0 = '全球金卡'
                            }else{
                                res.data.data[i].memberRole0 = ''
                            }
                        }
                        this.tableData = res.data.data
                    }
                },function (err) {
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                });
            },
        },
        mounted() {
           this.ajax();
        }
    }
</script>
<style scoped>

</style>