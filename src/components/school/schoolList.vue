<template>
  <div>
    <public-head />
    <div class="publicList">
      <div class="publicBack">
        <span>返回</span>
      </div>
      <!-- 搜索表单 start -->
      <div class="publicListData mt1">
        <h2>驾校列表</h2>
        <el-form :inline="true" :model="searchList" class="demo-form-inline">
          <el-form-item label="省份" size="mini">
            <el-select v-model="searchList.province" placeholder="">
                <el-option v-for="item in provinceList" :key="item.scid" :label="item.cname" :value="item.scid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" size="mini">
            <el-select v-model="searchList.city" placeholder="">
                <el-option v-for="item in cityList" :key="item.scid" :label="item.cname" :value="item.scid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="查询" size="mini">
            <el-input v-model="searchList.name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button @click="getTableData">查询</el-button>
          </el-form-item>
          <el-button @click="addschool" class="pull-right" size="mini">新增</el-button>
        </el-form>
        <!-- 搜索表单 end -->
        
        <!-- 表格 start -->
        <el-table :data="schoolListData" style="width: 100%">
          <el-table-column prop="name" label="驾校名称" />
          <el-table-column prop="code" label="编号" />
          <el-table-column prop="province" label="省份" />
          <el-table-column prop="city" label="城市" />
          <el-table-column prop="products" label="套餐数量" />
          <el-table-column prop="customers" label="学员数量" />
          <el-table-column prop="display" label="平台展示" />

          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click.native.prevent="changeRow(scope.$index, schoolListData)" type="text" size="small">
                管理套餐
              </el-button>
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
  name: 'school-list',
  components:{
    publicHead
  },
  data() {
    return {
      // 查询表单
      searchList: {
        province: '',
        city: '',
        name:''
      },
      schoolListData: [], // 表格默认值
      currentPage:1, // 选中页
      pageSize:100, // 每页多少行
      pageTotal:1000 // 总共多少数据
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    // 查询
    getTableData() {
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
      this.$router.push({path:'/updataSchool',query:{row:JSON.stringify(rows[index])}})
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
