<template>
    <div>
        <public-head/>
        <div class="publicList">
            <div class="publicBack">
                <router-link class="returnBack" :to="{path:'/schoolList'}"><i class="el-icon-arrow-left"></i>返回</router-link>
            </div>
            <div class="publicListData mt1">
                <h2>{{ editType }}</h2>
                <el-form :model="addSchoolData" :rules="addSchoolRules" ref="addSchoolRuleForm" label-width="310px">
                    <el-form-item label="驾校名称：" prop="name">
                        <el-input v-model="addSchoolData.name" auto-complete="off" style="width:280px;"/>
                    </el-form-item>
                    <!-- <el-form-item label="驾校编号：" prop="code">
                        <el-input v-model="addSchoolData.code" auto-complete="off" style="width:280px;"/>
                    </el-form-item> -->
                    <el-form-item label="所在城市：">
                        <el-select v-model="addSchoolData.provinceCode" v-on:change="searchCitysByProvince" placeholder="" style="width:138px;">
                            <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <el-select v-model="addSchoolData.cityCode" placeholder="" style="width:138px;">
                            <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="详细地址：">
                        <el-input v-model="addSchoolData.streetName" auto-complete="off" style="width:280px;"/>
                    </el-form-item>
                    <el-form-item label="经纬度：">
                        <el-input v-model="addSchoolData.longitude" auto-complete="off" style="width:138px;"/>
                        <el-input v-model="addSchoolData.latitude" auto-complete="off" style="width:138px;"/>
                    </el-form-item>
                    <el-form-item label="简介：">
                        <el-input type="textarea" v-model="addSchoolData.description" auto-complete="off" :rows="10" style="width:550px;"/>
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
                        <el-checkbox-group v-model="addSchoolData.renderService" size="small">
                            <el-checkbox-button v-for="item in renderServiceList" :label="item.description" :key="item.description">{{item.description}}</el-checkbox-button>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="是否显示：">
                        <el-radio-group v-model="addSchoolData.display">
                        <el-radio label="1">展示</el-radio>
                        <el-radio label="0">不展示</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addschool('addSchoolRuleForm')">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import publicHead from '@/components/publicHead'
export default {
    name:'',
    components:{
        publicHead
    },
    data(){
        return{
            editType:'添加驾校',
            addSchoolData:{
                name:'',
                code:'',
                provinceCode:'',
                cityCode:'',
                streetName:'',
                longitude:'',
                latitude:'',
                description:'',
                logo:'',
                renderService:'',
                display:'1'
            },
            provinceList:[],
            cityList:[],
            imageUrl:'',
            image:'',
            renderServiceList:[],
            addSchoolRules: {
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
    created () {
        this.$axios.post('/api/web/common/searchAllProvince').then(res => {
            this.provinceList = res.data.returnValue
        }).catch(err => {

        })
        this.$axios.post('/api/web/common/searchDictorys',{pCode:'00001'}).then(res => {
            this.renderServiceList = res.data.returnValue
        }).catch(err => {

        })
    },
    methods: {
        addschool(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/web/school/addDriverSchool', this.addSchoolData).then(res => {
                        this.$router.push({path:'/schoolList'})
                    }).catch(err => {
                        // this.dialogAddForm = false
                        // this.getTableData() // 新增成功后刷新表格
                    })
                }
            })
        },
        searchCitysByProvince(){
            this.$axios.post('/api/web/common/searchCitysByProvince', {parentId:this.addSchoolData.provinceCode}).then(res => {
                this.cityList = res.data.returnValue
            }).catch(err => {

            })
        },
        handleAvatarSuccess(res, file){
            this.imageUrl = res.returnValue
            this.addSchoolData.logo = res.returnValue
        }
    }
    
}
</script>
<style scoped>
.uploadExplain{
    color: #999999;
}
</style>
