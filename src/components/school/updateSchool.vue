<template>
    <div>
        <div class="publicBack">
            <span class="returnBack" @click="returnBack"><i class="el-icon-arrow-left"></i>返回</span>
        </div>
        <div class="publicListData mt1">
            <h2>{{ editType }}</h2>
            <el-form :model="updateSchool" :rules="updateSchoolRules" ref="updateSchoolRuleForm" label-width="310px">
                <el-form-item label="驾校名称：" prop="name">
                    <el-input v-model="updateSchool.name" auto-complete="off" style="width:280px;"/>
                </el-form-item>
                <!-- <el-form-item label="驾校编号：">
                    <el-input v-model="updateSchool.code" auto-complete="off" style="width:280px;"/>
                </el-form-item> -->
                <el-form-item label="所在城市：">
                    <el-select v-model="updateSchool.provinceCode" v-on:change="searchCitysByProvince" placeholder="" style="width:138px;">
                        <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select v-model="updateSchool.cityCode" style="width:138px;">
                        <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="详细地址：">
                    <el-input v-model="updateSchool.streetName" auto-complete="off" style="width:280px;"/>
                </el-form-item>
                <el-form-item label="经纬度：">
                    <el-input v-model="updateSchool.longitude" auto-complete="off" style="width:138px;"/>
                    <el-input v-model="updateSchool.latitude" auto-complete="off" style="width:138px;"/>
                </el-form-item>
                <el-form-item label="简介：">
                    <el-input type="textarea" v-model="updateSchool.description" auto-complete="off" :rows="10" style="width:550px;"/>
                </el-form-item>
                <el-form-item label="驾校logo">
                    <span class="uploadExplain">建议：图片高54px及以上</span>
                    <el-upload
                        class="avatar-uploader"
                        action="/api/web/common/uploadImage"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                
                <el-form-item label="驾校图集：">
                    <p class="uploadExplain">建议：图片比例16：9，为保证清晰度建议：宽992px，高558px 以上。</p>
                    <el-upload
                        class="avatar-uploader pull-left"
                        action="/api/web/common/uploadImage"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-upload
                        class="avatar-uploader pull-left ml2"
                        action="/api/web/common/uploadImage"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-upload
                        class="avatar-uploader pull-left ml2"
                        action="/api/web/common/uploadImage"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="驾校服务：">
                    <el-checkbox-group v-model="updateSchool.renderService" size="small">
                        <el-checkbox-button round v-for="item in renderServiceList" :label="item.description" :key="item">{{item.description}}</el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="是否显示：">
                    <el-radio-group v-model="updateSchool.display">
                    <el-radio label="1">展示</el-radio>
                    <el-radio label="0">不展示</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updataschoolSubmit('updateSchoolRuleForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
  name: 'updata-school',
  components: {},
  props: {
    row: { // 接收父组件传来的某行数据
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      editType: '编辑驾校',
      updateSchool: {
        name:'',
        code:'',
        provinceCode:'',
        cityCode:'',
        streetName:'',
        longitude:'',
        latitude:'',
        description:'',
        display:''
      },
      provinceList:[],
      cityList:[],
      updateSchoolRules: {
            name: [
                { 
                    required: true, 
                    message: '请输入驾校名称',
                    trigger: 'blur' 
                }
            ]
        }
    }
  },
  created() {
    this.updateSchool = this.row
    this.$axios.post('/api/web/common/searchAllProvince').then(res => {
      this.provinceList = res.data.returnValue
    }).catch(err => {

    })
    this.searchCitysByProvince()
  },
  methods: {
    updataschoolSubmit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$axios.post('/api/web/school/updateDriverSchoolByCode', this.updateSchool).then(res => {
                    this.$router.push({ path: '/schoolList' })
                    this.$emit("on-update-success")
                }).catch(err => {
                    this.$emit("on-update-error")
                })
            }
        })
    },
    searchCitysByProvince(){
      this.$axios.post('/api/web/common/searchCitysByProvince', {parentId:this.updateSchool.provinceCode}).then(res => {
          this.cityList = res.data.returnValue
      }).catch(err => {

      })
    },
    handleAvatarSuccess(res, file){
      this.imageUrl = res.returnValue
    },
    returnBack(){
        this.$emit("on-update-success")
    }
  }
}

</script>
<style scoped>
.uploadExplain{
    color: #999999;
}
</style>
