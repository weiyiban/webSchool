<template>
  <div>
    <public-head />
    <div class="publicList">
      <div class="publicBack">
        <router-link class="returnBack" :to="{path:'/admin'}"><i class="el-icon-arrow-left"></i>返回</router-link>
      </div>
      <!-- 搜索表单 start -->
      <div class="publicListData mt1">
        <div v-if="!showUpdata">
          <h2>学员投诉建议</h2>
          <el-form :inline="true" :model="searchList" class="demo-form-inline">
            <el-form-item label="提交时间" size="mini">
              <el-date-picker
                v-model="searchList.time"
                value-format="yyyy-MM-dd"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="logTimeChange">
              </el-date-picker>
              <!-- <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-col> -->
            </el-form-item>
            <el-form-item label="回复状态" size="mini">
              <el-select v-model="searchList.province" placeholder="">
                  <el-option label="已回复" value="REPLIED"/>
                  <el-option label="新建" value="NEW"/>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" size="mini">
              <el-select v-model="searchList.city" placeholder="">
                  <el-option label="投诉" value="COMPLAINT"/>
                  <el-option label="建议" value="ADVICE"/>
              </el-select>
            </el-form-item>
            <el-form-item label="查询" size="mini">
              <el-input v-model="searchList.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item size="mini">
              <el-button @click="searchComplaintList">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- 搜索表单 end -->

          <!-- 表格 start -->
          <el-table :data="complaintList.slice((pageNum-1)*pageRows,pageNum*pageRows)" style="width: 100%">
            <el-table-column prop="type" label="类型">
              <template slot-scope="scope">
                {{ scope.row.type ==='ADVICE'? '建议' : '投诉' }}
              </template>
            </el-table-column>
            <el-table-column prop="nickname" label="提交人" />
            <el-table-column prop="phone" label="联系电话" />
            <el-table-column prop="complaintTime" label="提交时间" />
            <el-table-column prop="target" label="对象" >
              <template slot-scope="scope">
                {{ scope.row.target ==='SCHOOL'? '驾校' : '教练' }}
              </template>
            </el-table-column>
            <el-table-column prop="content" label="内容">
              <!-- <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>{{ scope.row.content }}</p> 
                </el-popover>
              </template> -->
            </el-table-column>
            <el-table-column prop="status" label="回复状态">
              <template slot-scope="scope">
                {{ scope.row.status ==='NEW'? '新建' : '已回复' }}
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="50">
              <template slot-scope="scope">
                <el-button @click.native.prevent="complaintReply(scope.$index, complaintList.slice((pageNum-1)*pageRows,pageNum*pageRows))" type="text" size="small">
                  回复
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="text-align:right;margin-top:10px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 50, 100, 500]"
            :page-size="pageRows"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
          <!-- 表格 end -->
          <!-- 回复弹框 -->
          <el-dialog title="回复" :visible.sync="dialogReplyForm">
            <el-form :model="complaintReplyForm">
              <el-form-item label="">
                  <el-input type="textarea" v-model="complaintReplyForm.replyContent"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="complaintReplySubmit">确认回复</el-button>
              <el-button @click="dialogReplyForm = false">取消</el-button>
            </div>
          </el-dialog>
        </div>
        <updata-school v-if="showUpdata" :row="updataSchoolForm" @on-update-success="updataSchoolSuccess"/>
      </div>
    </div>
  </div>
</template>
<script>
import publicHead from '@/components/publicHead'
export default {
  name: 'school-list',
  components:{
    publicHead,
  },
  data() {
    return {
      // 查询表单
      searchList: {
        complaintTimeFrom: '',
        complaintTimeTo: '',
        status:'',
        // type:'',
        username:''
      },
      complaintReplyForm:{
        pk:'',
        replyContent:''
      },
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      dialogReplyForm:false,
      provinceList:[],
      cityList:[],
      updataSchoolForm:{},
      showUpdata: false, // 是否显示 修改组件
      complaintList: [],
      pageNum:1, // 选中页
      pageRows:10, // 每页多少行
      total:0 // 总共多少数据
    }
  },
  created () {
    this.searchComplaintList()
  },
  methods: {
    // 查询
    searchComplaintList() {
      this.$axios.post('/api/web/complaint/searchComplaints', this.searchList).then(res => {
        this.complaintList = res.data.returnValue.list;
        // this.pageNum = res.data.pageNum; // 选中页
        // this.pageSize = res.data.pageSize; // 每页多少行(也可以写死)
        this.total = res.data.returnValue.total;// 总共多少数据
      }).catch(err => {

      })
    },
    // 回复弹框显示
    complaintReply(index,complaintRow) {
      this.dialogReplyForm = true;
      this.complaintReplyForm.pk = complaintRow[index].pk
    },
    // 回复确认
    complaintReplySubmit(){
      this.$axios.post('/api/web/complaint/updateAnswerContent', this.complaintReplyForm).then(res => {
        this.dialogReplyForm = false;
        this.$message({type: 'success',message: '回复成功！'});
      }).catch(err => {

      })
    },
    logTimeChange(val){
      this.complaintTimeFrom = val[0]
      this.complaintTimeTo = val[1]
    },
    // 分页切换
    handleCurrentChange(val) {
      this.pageNum  = val
      this.searchSchoolList()
    },
    handleSizeChange(val){
      this.pageRows = val
      this.searchSchoolList()
    },
    bundleProductList(){
      this.$router.push({path:'/bundleProduct'})
    }
  },
}

</script>

<style scoped>

</style>
