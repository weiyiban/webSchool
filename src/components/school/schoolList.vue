<template>
  <div>
    <public-head />
    <div class="publicList">
      <transition name="el-fade-in">
        <div v-if="!showUpdata">
          <div class="publicBack">
            <router-link class="returnBack" :to="{path:'./admin'}"><i class="el-icon-arrow-left"></i>返回</router-link>
          </div>
          <!-- 搜索表单 start -->
          <div class="publicListData mt1">
            <h2>驾校列表</h2>
            <el-form :inline="true" :model="searchList" class="demo-form-inline">
              <el-form-item label="省份" size="mini">
                <el-select v-model="searchList.provinceCode" clearable v-on:change="searchCitysByProvince" placeholder="全部">
                    <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="城市" size="mini">
                <el-select v-model="searchList.cityCode" clearable placeholder="全部">
                  <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="查询" size="mini">
                <el-input v-model="searchList.name" placeholder=""></el-input>
              </el-form-item>
              <el-form-item size="mini">
                <el-button @click="searchSchoolList">查询</el-button>
              </el-form-item>
              <el-button @click="addschool" class="pull-right" size="mini">新增</el-button>
            </el-form>
            <!-- 搜索表单 end -->

            <!-- 表格 start -->
            <el-table :data="schoolList.slice((pageNum-1)*pageRows,pageNum*pageRows)" style="width: 100%">
              <el-table-column prop="name" label="驾校名称" />
              <el-table-column prop="code" label="编号" />
              <el-table-column prop="province" label="省份" />
              <el-table-column prop="city" label="城市" />
              <el-table-column prop="products" label="套餐数量" />
              <el-table-column prop="customers" label="学员数量" />
              <el-table-column prop="display" label="平台展示">
                <template slot-scope="scope">
                  {{ scope.row.display ? '展示' : '不展示' }}
                </template>
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="bundleProductList(scope.$index, schoolList.slice((pageNum-1)*pageRows,pageNum*pageRows))" type="text" size="small">
                    管理套餐
                  </el-button>
                  <el-button @click.native.prevent="updataSchoolRow(scope.$index, schoolList.slice((pageNum-1)*pageRows,pageNum*pageRows))" type="text" size="small">
                    编辑
                  </el-button>
                  <el-button @click.native.prevent="deleteSchoolRow(scope.$index, schoolList.slice((pageNum-1)*pageRows,pageNum*pageRows))" type="text" size="small">
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
      </transition>
      <transition name="el-fade-in">
        <update-school v-if="showUpdata" :row="updataSchoolForm" @on-update-success="updataSchoolSuccess"/>
      </transition>
    </div>
  </div>
</template>
<script>
import publicHead from '@/components/publicHead'
import updateSchool from '@/components/school/updateSchool'
export default {
  name: 'school-list',
  components:{
    publicHead,
    updateSchool
  },
  data() {
    return {
      // 查询表单
      searchList: {
        provinceCode: '',
        cityCode: '',
        name:''
      },
      provinceList:[],
      cityList:[],
      updataSchoolForm:{},
      showUpdata: false, // 是否显示 修改组件
      schoolList: [{
        name:'21'
      }],
      pageNum:1, // 选中页
      pageRows:10, // 每页多少行
      total:0 // 总共多少数据
    }
  },
  created () {
    this.$axios.post('/api/web/common/searchAllProvince').then(res => {
      this.provinceList = res.data.returnValue
    }).catch(err => {

    })
    this.searchSchoolList()
  },
  methods: {
    // 查询
    searchSchoolList() {
      this.$axios.post('/api/web/school/searchDriverSchool', this.searchList).then(res => {
        this.schoolList = res.data.list;
        // this.pageNum = res.data.pageNum; // 选中页
        // this.pageSize = res.data.pageSize; // 每页多少行(也可以写死)
        this.total = res.data.total;// 总共多少数据
      }).catch(err => {

      })
    },
    addschool() {
      this.$router.push({path:'/addSchool'})
    },
    // 修改
    updataSchoolRow(index, rows) {
      this.showUpdata = !this.showUpdata
      this.updataSchoolForm = rows[index]
      console.log(rows[index])
    },
    // 修改成功
    updataSchoolSuccess(){
      this.showUpdata = false;
    },
    // 删除
    deleteSchoolRow(index, rows) {
      this.$alert('您确定要删除这行吗？', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$axios.post('/api/web/school/delDriverSchool/'+rows[index].code).then(res => {
            this.$message({type: 'success',message: '删除成功！'});
            this.searchSchoolList() // 删除成功 后 刷新表格
          }).catch(err => {
            this.$message({type: 'error',message: '删除失败！'});
            this.searchSchoolList() // 删除成功后刷新表格
          })
        }
      })
    },
    searchCitysByProvince(){
      this.$axios.post('/api/web/common/searchCitysByProvince', {parentId:this.searchList.provinceCode}).then(res => {
        this.cityList = res.data.returnValue
      }).catch(err => {

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
    bundleProductList(index, rows){
      this.$router.push({name:'bundleProduct', params: { schoolCode: rows[index].code }})
    }
  },
}

</script>

<style scoped>

</style>
