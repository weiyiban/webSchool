<template>
  <div>
    <public-head />
    <div class="publicList">
      <div v-if="!showUpdata">
        <div class="publicBack">
          <router-link class="returnBack" :to="{path:'/schoolList'}"><i class="el-icon-arrow-left"></i>返回</router-link>
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
          <el-table :data="bundleProductList.slice((pageNum-1)*pageRows,pageNum*pageRows)" style="width: 100%">
            <el-table-column prop="name" label="招生产品名称" />
            <el-table-column prop="driverlicenseType" label="车型" />
            <el-table-column prop="classType" label="班别" />
            <el-table-column prop="currentPrice" label="费用" />
            <el-table-column prop="trainMethod" label="培训方式" />
            <el-table-column prop="classDescription" label="套餐特色" />
            <el-table-column prop="feeDescription" label="费用说明" />
            <el-table-column prop="display" label="状态" >
              <template slot-scope="scope">
                {{ scope.row.display ? '正常':'停用'}}
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click.native.prevent="updataBundleProductRow(scope.$index, bundleProductList.slice((pageNum-1)*pageRows,pageNum*pageRows))" type="text" size="small">
                  编辑
                </el-button>
                <el-button @click.native.prevent="deleteBundleProductRow(scope.$index, bundleProductList.slice((pageNum-1)*pageRows,pageNum*pageRows))" type="text" size="small">
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
      <updata-bundle-product v-if="showUpdata" :row="updataBundleProductForm" @on-update-success="updataBundleProductSuccess"/>
    </div>
  </div>
</template>
<script>
import publicHead from '@/components/publicHead'
import updataBundleProduct from '@/components/school/product/updataBundleProduct'
export default {
  name: '',
  components:{
    publicHead,
    updataBundleProduct
  },
  data() {
    return {
      // 查询表单
      searchProductList: {
        schoolCode:this.$route.params.schoolCode,
        name:''
      },
      bundleProductList: [], // 表格默认值
      updataBundleProductForm:{},
      showUpdata: false, // 是否显示 修改组件
      pageNum:1, // 选中页
      pageRows:10, // 每页多少行
      total:0, // 总共多少数据
    }
  },
  created: function() {
    this.searchBundleProduct()
  },
  methods: {
    // 查询
    searchBundleProduct() {
      this.$axios.post('/api/web/product/searchBundleProduct', this.searchProductList).then(res => {
        this.bundleProductList = res.data.list;
        // this.pageNum = res.data.pageNum; // 选中页
        // this.pageRows = res.data.pageRows; // 每页多少行(也可以写死)
        this.total = res.data.total;// 总共多少数据
      }).catch(err => {
        
      })
    },
    // 添加
    addBundleProduct() {
      this.$router.push({name:'addBundleProduct',params:{schoolCode:this.$route.params.schoolCode}})
    },
    // 修改
    updataBundleProductRow(index, rows) {
      this.showUpdata = !this.showUpdata
      this.updataBundleProductForm = rows[index]
    },
     // 修改成功
    updataBundleProductSuccess(){
      this.showUpdata = false
    },
    // 删除
    deleteBundleProductRow(index, rows) {
      this.$alert('您确定要删除这行吗？', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$axios.post('/api/web/product/delBundleProduct/'+rows[index].pk).then(res => {
              this.$message({type: 'success',message: '删除成功！'});
              this.searchBundleProduct() // 删除成功 后 刷新表格
            }).catch(err => {
              this.$message({type: 'error',message: '删除失败！'});
              this.searchBundleProduct() // 删除成功后刷新表格
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
    }
  }
}

</script>

<style scoped>

</style>
