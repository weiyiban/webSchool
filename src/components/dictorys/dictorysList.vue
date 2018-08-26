<template>
  <div>
    <public-head />
    <div class="publicList">
      <div v-if="!showUpdata">
        <div class="publicBack">
          <router-link class="returnBack" :to="{path:'./admin'}"><i class="el-icon-arrow-left"></i>返回</router-link>
        </div>
        <!-- 搜索表单 start -->
        <div class="publicListData mt1">
          <h2>数据字典</h2>
          <el-form :inline="true" :model="searchList" class="demo-form-inline">
            <el-form-item label="查询" size="mini">
              <el-input v-model="searchList.name" placeholder="输入项名称模糊查询"/>
            </el-form-item>
            <el-form-item size="mini">
              <el-button @click="searchUsersList">查询</el-button>
            </el-form-item>
            <el-button @click="addUser" class="pull-right" size="mini">新增</el-button>
          </el-form>
          <!-- 搜索表单 end -->

          <!-- 表格 start -->
          <el-table :data="usersList.slice((pageNum-1)*pageRows,pageNum*pageRows)" style="width: 100%">
            <el-table-column prop="name" label="项名称" />
            <el-table-column prop="code" label="项代码" />
            <el-table-column prop="description" label="说明" />
            <el-table-column prop="number" label="子项个数" />

            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click.native.prevent="updataUsersRow(scope.$index, usersList.slice((pageNum-1)*pageRows,pageNum*pageRows))" type="text" size="small">
                  编辑
                </el-button>
                <el-button @click.native.prevent="deleteUsersRow(scope.$index, usersList.slice((pageNum-1)*pageRows,pageNum*pageRows))" type="text" size="small">
                  删除
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
        </div>
      </div>
      <update-user v-if="showUpdata" :row="updataUsersForm" @on-update-success="updataUsersSuccess"/>
    </div>
  </div>
</template>
<script>
import publicHead from '@/components/publicHead'
import updateUser from '@/components/user/updateUser'
export default {
  name: 'users-list',
  components:{
    publicHead,
    updateUser
  },
  data() {
    return {
      // 查询表单
      searchList: {
        name:''
      },
      provinceList:[],
      cityList:[],
      updataUsersForm:{},
      showUpdata: false, // 是否显示 修改组件
      usersList: [],
      pageNum:1, // 选中页
      pageRows:10, // 每页多少行
      total:0 // 总共多少数据
    }
  },
  created () {
    this.searchUsersList()
  },
  methods: {
    // 查询
    searchUsersList() {
      this.$axios.post('/api/web/user/searchUsers', this.searchList).then(res => {
        this.usersList = res.data.list;
        // this.pageNum = res.data.pageNum; // 选中页
        // this.pageSize = res.data.pageSize; // 每页多少行(也可以写死)
        this.total = res.data.total;// 总共多少数据
      }).catch(err => {

      })
    },
    addUser() {
      this.$router.push({path:'/addUser'})
    },
    // 修改
    updataUsersRow(index, rows) {
      this.showUpdata = !this.showUpdata
      this.updataUsersForm = rows[index];
      console.log(rows[index]);
    },
    // 修改成功
    updataUsersSuccess(){
      this.showUpdata = false;
    },
    // 删除
    deleteUsersRow(index, rows) {
      this.$alert('您确定要删除这行吗？', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$axios.post('/api/web/user/delUser/'+rows[index].username).then(res => {
            this.$message({type: 'success',message: '删除成功！'});
            this.searchUsersList() // 删除成功 后 刷新表格
          }).catch(err => {
            this.$message({type: 'error',message: '删除失败！'});
            this.searchUsersList() // 删除成功后刷新表格
          })
        }
      })
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
