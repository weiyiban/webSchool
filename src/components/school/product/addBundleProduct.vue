<template>
    <div>
        <public-head/>
        <div class="publicList">
            <div class="publicBack">
                <router-link class="returnBack" :to="{name:'bundleProduct',params:{schoolCode:this.$route.params.schoolCode}}"><i class="el-icon-arrow-left"></i>返回</router-link>
            </div>
            <div class="publicListData mt1">
                <h2>增加套餐</h2>
                <div class="bundleProduct">
                    <h3>基本信息</h3>
                    <el-form :model="addBundleProductData" :rules="addBundleProductRules" ref="addBundleProductRuleForm" label-width="310px">
                        <el-form-item label="名称：" prop="name">
                            <el-input v-model="addBundleProductData.name" auto-complete="off" style="width:280px;"/>
                        </el-form-item>
                        <el-form-item label="驾照类型：">
                            <el-select v-model="addBundleProductData.driverlicenseType" placeholder="" style="width:280px;">
                                <el-option v-for="item in driverlicenseTypeList" :key="item.code" :label="item.name" :value="item.code"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="班别：">
                            <el-input v-model="addBundleProductData.classType" auto-complete="off" style="width:280px;"/>
                        </el-form-item>
                        <el-form-item label="费用（元）：">
                            <el-input v-model="addBundleProductData.currentPrice" auto-complete="off" style="width:280px;"/>
                        </el-form-item>
                        <h3 class="mt">更多信息</h3>
                        <el-form-item label="培训方式：">
                            <el-input type="textarea" v-model="addBundleProductData.trainMethod" :rows="4" placeholder="介绍一下培训方式如：一对一训练，不需预约" style="width:360px;"/>
                        </el-form-item>
                        <el-form-item label="套餐特色：">
                            <el-input type="textarea" v-model="addBundleProductData.classDescription" :rows="4" placeholder="介绍一下套餐特色如：专为上班族打造" style="width:360px;"/>
                        </el-form-item>
                        <el-form-item label="费用说明：">
                            <el-input type="textarea" v-model="addBundleProductData.feeDescription" :rows="4" placeholder="介绍一下费用具体信息如：包含培训费，补考费" style="width:360px;"/>
                        </el-form-item>
                        <el-form-item label="报名须知：">
                            <el-input type="textarea" v-model="addBundleProductData.signNotice" :rows="4" placeholder="报名注意事项或须知如：年满18周岁，无色盲等" style="width:360px;"/>
                        </el-form-item>
                        <el-form-item label="状态：">
                            <el-radio-group v-model="addBundleProductData.display">
                            <el-radio label="1">正常</el-radio>
                            <el-radio label="0">停用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addBundleProduct('addBundleProductRuleForm')">添加</el-button>
                        </el-form-item>
                    </el-form>
                </div>
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
            addBundleProductData:{
                schoolCode:this.$route.params.schoolCode,
                name:'',
                driverlicenseType:'',
                classType:'',
                currentPrice:'',
                trainMethod:'',
                classDescription:'',
                feeDescription:'',
                signNotice:'',
                display:'1'
            },
            driverlicenseTypeList:[],
            addBundleProductRules: {
                name: [
                    { 
                        required: true, 
                        message: '请输入套餐名称',
                        trigger: 'blur' 
                    }
                ]
            }
        }
    },
    created(){
        this.$axios.post('/api/web/common/searchDictorys', {pCode:'driverLicense'}).then(res => {
            this.driverlicenseTypeList = res.data.returnValue
        }).catch(err => {
            
        })
    },
    methods: {
        addBundleProduct(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/web/product/addBundleProduct', this.addBundleProductData).then(res => {
                        this.$router.push({name:'bundleProduct',params:{schoolCode:this.$route.params.schoolCode}})
                    }).catch(err => {
                        // this.dialogAddForm = false
                        // this.getTableData() // 新增成功后刷新表格
                    })
                }
            })
        }
    }
    
}
</script>
<style scoped>
.bundleProduct{
    padding: 70px;
}
.bundleProduct h3{
    font-weight: 400;
    margin-bottom: 56px;
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 10px;
}
</style>
