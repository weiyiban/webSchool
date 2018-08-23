<template>
  <div>
    <public-head />
    <div class="publicList">
      <div class="publicBack">
        <span>返回</span>
      </div>
      <!-- 搜索表单 start -->
      <div class="publicListData mt1">
        <h2>管理套餐</h2>
        <el-form :inline="true" :model="searchProductList" class="demo-form-inline">
          <el-form-item label="查询" size="mini">
            <el-input v-model="searchProductList.name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button @click="searchBundleProduct">查询</el-button>
          </el-form-item>
          <el-button @click="addBundleProduct" class="pull-right" size="mini">增加</el-button>
        </el-form>
        <!-- 搜索表单 end -->
        
        <!-- 表格 start -->
        <el-table :data="schoolListData" style="width: 100%">
          <el-table-column prop="name" label="招生产品名称" />
          <el-table-column prop="driverlicenseType" label="车型" />
          <el-table-column prop="classType" label="班别" />
          <el-table-column prop="currentPrice" label="费用" />
          <el-table-column prop="trainMethod" label="培训方式" />
          <el-table-column prop="classDescription" label="套餐特色" />
          <el-table-column prop="feeDescription" label="费用说明" />
          <el-table-column prop="display" label="状态" />

          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click.native.prevent="changeRow(scope.$index, schoolListData)" type="text" size="small">
                编辑
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, schoolListData)" type="text" size="small">
                删除
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
import publicHead from '@/components/publicHead'
export default {
  name: '',
  components:{
    publicHead
  },
  data() {
    return {
      // 查询表单
      searchProductList: {
        name:''
      },
      bundleProductListData: [], // 表格默认值
      currentPage:1, // 选中页
      pageSize:100, // 每页多少行
      pageTotal:1000 // 总共多少数据
    }
  },
  mounted: function() {
    this.searchBundleProduct()
  },
  methods: {
    // 查询
    searchBundleProduct() {
      this.$axios.get('/api/web/school/searchDriverSchool', this.searchList).then(res => {
        this.schoolListData = res.data.list;
        this.currentPage = res.currentPage; // 选中页
        this.pageSize = res.pageSize; // 每页多少行(也可以写死)
        this.pageTotal = res.pageTotal;// 总共多少数据
      }).catch(err => {
        this.schoolListData = res.data.list;
      })
    },
    addschool() {
      this.$router.push({path:'/addSchool'})
    },
    // 修改
    changeRow(index, rows) {
      // console.log(rows[index])
      // this.dialogChangeForm = true;
      // this.changeForm = rows[index]
      this.$router.push({path:'/updataSchool'})
      // console.log(index,rows[index])
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

</style>
