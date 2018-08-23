<template>
  <div id="table-demo">
    <school-head />
    <div class="schoolList">
      <div class="schoolBack">
        <span>返回</span>
      </div>
      <!-- 搜索表单 start -->
      <div class="schoolTable mt1">
        <h2>驾校列表</h2>
        <el-form :inline="true" :model="formList" class="demo-form-inline">
          <el-form-item label="省份" size="mini">
            <el-select v-model="formList.province" placeholder="">
                <el-option v-for="item in typeList" :key="item.scid" :label="item.cname" :value="item.scid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" size="mini">
            <el-select v-model="formList.city" placeholder="">
                <el-option v-for="item in typeList" :key="item.scid" :label="item.cname" :value="item.scid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="查询" size="mini">
            <el-input v-model="formList.name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button @click="getTableData">查询</el-button>
          </el-form-item>
          <el-button @click="dialogAddForm = true" class="pull-right" size="mini">新增</el-button>
        </el-form>
        <!-- 搜索表单 end -->
        <!-- 新增表单对话框 start -->
        <el-dialog title="驾校信息维护" :visible.sync="dialogAddForm">
          <el-form :model="addForm">
            <el-form-item label="驾校名称" :label-width="formLabelWidth">
              <el-input v-model="addForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="所在城市" :label-width="formLabelWidth">
              <el-select v-model="addForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-select v-model="addForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddForm = false">取 消</el-button>
            <el-button type="primary" @click="addTableData">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 新增表单对话框 end -->
        <!-- 修改表单对话框 start -->
        <el-dialog title="驾校信息维护" :visible.sync="dialogChangeForm">
          <el-form :model="changeForm">
            <el-form-item label="招商产品名称" :label-width="formLabelWidth">
              <el-input v-model="changeForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="车型" :label-width="formLabelWidth">
              <el-select v-model="changeForm.carType" placeholder="请选择活动区域">
                <el-option label="C1" value="shanghai"></el-option>
                <el-option label="C2" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班别" :label-width="formLabelWidth">
              <el-input v-model="changeForm.cost" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="费用" :label-width="formLabelWidth">
              <el-input v-model="changeForm.trainingMethod" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="培训方式" :label-width="formLabelWidth">
              <el-input v-model="changeForm.packageFeatures" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="套餐特色" :label-width="formLabelWidth">
              <el-input v-model="changeForm.expenseDescription" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChangeForm = false">取 消</el-button>
            <el-button type="primary" @click="onChangeTableData">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改表单对话框 end -->
        <!-- 表格 start -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="招商产品名称" />
          <el-table-column prop="carType" label="车型" />
          <el-table-column prop="cost" label="班别" />
          <el-table-column prop="trainingMethod" label="费用" />
          <el-table-column prop="packageFeatures" label="培训方式" />
          <el-table-column prop="expenseDescription" label="套餐特色" />
          <el-table-column prop="state" label="状态" />

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click.native.prevent="changeRow(scope.$index, tableData)" type="text" size="small">
                修改
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="text-align: center;"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="pageTotal">
        </el-pagination>
        <!-- 表格 end -->
      </div>
    </div>
  </div>
</template>
<script>
import schoolHead from '@/components/schoolHead'
export default {
  name: 'table-demo',
  components:{
    schoolHead
  },
  data() {
    return {
      // 查询表单
      formList: {
        user: '',
        region: ''
      },
      // 新增表单
      dialogAddForm: false,
      addForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 修改表单
      dialogChangeForm: false,
      changeForm: {
        id:null,
        name: '',
        carType: '',
        cost: '',
        trainingMethod: '',
        packageFeatures: [],
        expenseDescription: '',
        state: ''
      },
      formLabelWidth: '120px',
      tableData: [], // 表格默认值
      tablelist: [{
        id:0,
        name: 'C1普通班',
        carType: 'C1',
        cost: 2800,
        trainingMethod:'一对一训练，不需要预约',
        packageFeatures:'专为上班族打造',
        expenseDescription:'培训费，补考费',
        state:'正常'
        // state:'normal'
      },{
        id:1,
        name: 'C1普通班1',
        carType: 'C11',
        cost: 28001,
        trainingMethod:'一对一训练，不需要预约1',
        packageFeatures:'专为上班族打造1',
        expenseDescription:'培训费，补考费1',
        state:'正常1'
        // state:'normal'
      }
      ],
      currentPage:1, // 选中页
      pageSize:100, // 每页多少行
      pageTotal:1000 // 总共多少数据
    }
  },
  methods: {
    // 查询
    getTableData() {
      this.$axios.post('web/kaola/getTableData', this.formList).then(res => {
        this.tableData = this.tablelist
        this.currentPage = res.currentPage; // 选中页
        this.pageSize = res.pageSize; // 每页多少行(也可以写死)
        this.pageTotal = res.pageTotal;// 总共多少数据
      }).catch(err => {
        this.tableData = this.tablelist
      })
    },
    // 新增
    addTableData() {
      this.$axios.post('web/kaola/addTableData', this.addForm).then(res => {
        this.dialogAddForm = false
        this.getTableData() // 新增成功 后 刷新表格
      }).catch(err => {
        this.dialogAddForm = false
        this.getTableData() // 新增成功后刷新表格
      })
    },
    // 修改
    // 修改时后台一般会要个id，用来确定修改哪行
    changeRow(index, rows) {
      this.dialogChangeForm = true;
      this.changeForm = rows[index]
       console.log(index,rows[index])
    },
    // 确定修改
    onChangeTableData(){
      this.$axios.post('web/kaola/changeRow', this.changeForm).then(res => {
        this.dialogChangeForm = false
        this.getTableData() // 修改成功 后 刷新表格
      }).catch(err => {
        this.dialogChangeForm = false
        this.getTableData() // 修改成功后刷新表格
      })
    },
    // 删除
    deleteRow(index, rows) {
      this.$alert('您确定要删除这行吗？', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {

            this.$axios.post('web/kaola/deleteRow', {id:index}).then(res => {
              this.$message({type: 'info',message: '删除成功！'});
              this.getTableData() // 删除成功 后 刷新表格
            }).catch(err => {
              this.$message({type: 'error',message: '删除失败！'});
              this.getTableData() // 删除成功后刷新表格
            })

          }
        })
    },
    // 分页切换
     handleCurrentChange(val) {
      this.currentPage  = val;
      this.getTableData()
        console.log(`当前页: ${val}`);
      }
  },
}

</script>

<style scoped>
.schoolList{
  width: 1200px;
  margin: auto;
}
.schoolBack{
  padding: 24px 0 21px 35px;
  background-color: #ffffff;
  margin-top: 25px;
  border-radius: 8px;
}
.schoolBack span{
  color: #999999;
  font-size: 16px;
}
.schoolTable{
  background-color: #ffffff;
  padding: 45px 40px 40px 40px;
  border-radius: 8px;
}
.schoolTable h2{
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 40px;
}
</style>
