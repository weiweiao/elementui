<template>
    <!--店铺升级审核列表-->
   <div class="client-manager-audit-list">
       <!--nav-->
       <el-row :gutter="24">
           <el-col :span="6">
               <div class="grid-content bg-purple">
                   <span class="spans0">店铺编号</span>
                   <el-input type="primary" placeholder="请输入店铺编号" v-model="shopNum"></el-input>
               </div>
           </el-col>
           <el-col :span="6">
               <div class="grid-content bg-purple">
                   <span class="spans1">审核状态</span>
                   <el-select v-model="value1" placeholder="请选择审核状态":clearable="clearable">
                       <el-option
                               v-for="item in options1"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </div>
           </el-col>
           <el-col :span="6">
               <div class="grid-content bg-purple">
                   <span class="spans1">审核等级</span>
                   <el-select v-model="value2" placeholder="请选择审核等级"  :clearable="clearable">
                       <el-option
                               v-for="item in options2"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </div>
           </el-col>
           <el-col :span="2">
               <div class="grid-content bg-purple">
                   <el-button type="primary" @click="inquiry">查询</el-button>
               </div>
           </el-col>
           <el-col :span="2">
               <div class="grid-content bg-purple">
                   <el-button type="primary" @click="clears">清除条件</el-button>
               </div>
           </el-col>
       </el-row>
       <!--table-->
       <el-table
               :data="tableData3"
               border
               style="width: 100%"
               max-height="480">
           <el-table-column
                            prop="shopNumber"
                            label="店铺编号"
                            width="160">
           </el-table-column>
           <el-table-column
                   prop="ownerName"
                   label="店主姓名"
                   width="120">
           </el-table-column>
           <el-table-column
                   prop="upgradeStatus0"
                   label="状态"
                   width="160">
           </el-table-column>
           <el-table-column
                   prop="directPushQuantity"
                   label="直推店铺"
                   width="100">
           </el-table-column>
           <el-table-column
                   prop="ulitmateQuantity"
                   label="旗舰店铺"
                   width="100">
           </el-table-column>
           <el-table-column
                   prop="memberRemark"
                   label="备注"
                   >
           </el-table-column>
           <el-table-column
                   prop="gmtCreate"
                   label="发起时间"
                  >
               <template slot-scope="scope">
                   {{scope.row.gmtCreate | time}}
               </template>
           </el-table-column>
           <el-table-column
                   prop="operate"
                   label="操作"
                   width="120">
               <template slot-scope="scope">
                   <div>
                       <el-button type="primary" v-show="scope.row.upgradeStatus=='PENDING'?true:false" @click="audit(scope.row,scope.$index)">审核</el-button>
                       <p v-text="scope.row.upgradeStatus=='PASS'?'审核通过':''"></p>
                       <p v-text="scope.row.upgradeStatus=='NOTPASS'?'审核不通过':''"></p>
                   </div>
               </template>
           </el-table-column>
       </el-table>
       <!--分页-->
       <div class="block">
           <el-pagination
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="arr.length">
           </el-pagination>
       </div>

   </div>
</template>

<script>
    export default {
         data(){
             return{
                 clearable:true,
                 shopNum:'',//店铺编号
                 value1:'',//审核等级
                 value2:'',//审核状态
                 options1:[
                     {
                     value:'PENDING',
                     label:'待审核'
                 },
                     {
                         value:'PASS',
                         label:'审核通过'
                     },
                     {
                         value:'NOTPASS',
                         label:'审核不通过'
                     }],
                 options2:[
                     {
                         value:'MANAGER',
                         label:'大客户经理'
                     },
                     {
                         value:'ULTIMATE',
                         label:'旗舰店'
                     }],
                 tableData3:[{}],
                 arr:[],//分页
                 currentPage:1,
             }
         },
        methods:{
             //清除条件
            clears(){
                this.shopNum = '';
                this.value1 = '';
                this.value2 = '';
            },
             //查询
            inquiry(){
              this.currentPage = 1;
                this.ajax(this.currentPage,this.shopNum,this.value1,this.value2)
            },
             //审核按钮
            audit(row,index){
                console.log(row, index);
                this.$confirm('确定审核通过?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.url+'/shopUpgrade/check_shopUpgrade',{shopUpgradeId:row.shopUpgradeId},{emulateJSON:true}).then(function (res) {
                        console.log(res);
                        if(res.data.status==200){
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            //刷新
                            this.ajax(this.currentPage,this.shopNum,this.value1,this.value2)
                        }else{
                            this.$message({
                                type: 'success',
                                message: '操作失败!'
                            });
                        }
                    },function (err) {
                        this.$message({
                            type:'error',
                            message:'服务器连接中断,请联系后台人员!',
                        });
                    })
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消'
//                    });
                });
            },
             //分页
            handleCurrentChange(val){
                console.log(val);
                this.currentPage = val;
                this.ajax(this.currentPage,this.shopNum,this.value1,this.value2)
            },
            //ajax
            ajax(a1,a2,a3,a4){
                this.$http.post(this.url+'/shopUpgrade/select_all_shopUpgrade',{
                    page:a1,
                    num:10,
                    shopNumber:a2,
                    upgradeStatus:a3,
                    auditLevel:a4,
                },{emulateJSON:true}).then(function (res) {
                    console.log(res);
                    if(res.data.data==null){
                        this.tableData3 = [];
                        this.arr.length = 0;
                    }else{
                        for(let k=0;k<res.data.data.pageList.length;k++){
                            let a = res.data.data.pageList[k].upgradeStatus;
                            if(a=='PENDING'){
                                res.data.data.pageList[k].upgradeStatus0 = '待审核';
                            }else if(a=='PASS'){
                                res.data.data.pageList[k].upgradeStatus0 = '审核通过';
                            }else{
                                res.data.data.pageList[k].upgradeStatus0 = '审核不通过';
                            }
                        }
                        this.tableData3 = res.data.data.pageList;
                        this.arr.length = res.data.data.pageTotal;
                    }
                },function (err) {
                    console.log(err);
                    this.$message({
                        type:'error',
                        message:'服务器连接中断,请联系后台人员!',
                    });
                })
            }
        },
        mounted(){
             this.ajax(1,'','','')
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
