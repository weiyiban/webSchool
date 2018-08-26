<template>
    <div>
        <div class="publicBack">
            <span class="returnBack" @click="returnBack"><i class="el-icon-arrow-left"></i>返回</span>
        </div>
        <div class="publicListData mt1">
            <h2>编辑套餐</h2>
            <div class="bundleProduct">
                <h3>基本信息</h3>
                <el-form :model="updataBundleProduct" :rules="updataBundleProductRules" ref="updataBundleProductRuleForm" label-width="340px">
                    <el-form-item label="名称：" prop="name">
                        <el-input v-model="updataBundleProduct.name" auto-complete="off" style="width:280px;"/>
                    </el-form-item>
                    <el-form-item label="驾照类型：">
                        <el-select v-model="updataBundleProduct.driverlicenseType" style="width:280px;">
                            <el-option v-for="item in driverlicenseTypeList" :key="item.code" :label="item.name" :value="item.code"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班别：">
                        <el-input v-model="updataBundleProduct.classType" auto-complete="off" style="width:280px;"/>
                    </el-form-item>
                    <el-form-item label="费用（元）：">
                        <el-input v-model="updataBundleProduct.currentPrice" auto-complete="off" style="width:280px;"/>
                    </el-form-item>
                    <h3 class="mt">更多信息</h3>
                    <el-form-item label="培训方式：">
                        <el-input type="textarea" v-model="updataBundleProduct.trainMethod" :rows="4" placeholder="介绍一下培训方式如：一对一训练，不需预约" style="width:360px;"/>
                    </el-form-item>
                    <el-form-item label="套餐特色：">
                        <el-input type="textarea" v-model="updataBundleProduct.classDescription" :rows="4" placeholder="介绍一下套餐特色如：专为上班族打造" style="width:360px;"/>
                    </el-form-item>
                    <el-form-item label="费用说明：">
                        <el-input type="textarea" v-model="updataBundleProduct.feeDescription" :rows="4" placeholder="介绍一下费用具体信息如：包含培训费，补考费" style="width:360px;"/>
                    </el-form-item>
                    <el-form-item label="报名须知：">
                        <el-input type="textarea" v-model="updataBundleProduct.code" :rows="4" placeholder="报名注意事项或须知如：年满18周岁，无色盲等" style="width:360px;"/>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-radio-group v-model="updataBundleProduct.display">
                        <el-radio label="1">正常</el-radio>
                        <el-radio label="0">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updataBundleProductSubmit('updataBundleProductRuleForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'',
    components:{},
    props: {
        row: { // 接收父组件传来的某行数据
        type: Object,
        default: {}
        }
    },
    data(){
        return{
            updataBundleProduct:{
                name:'',
                driverlicenseType:'',
                classType:'',
                currentPrice:'',
                trainMethod:'',
                classDescription:'',
                feeDescription:'',
                // classDescription:'',
                display:''
            },
            driverlicenseTypeList:[],
            updataBundleProductRules:{
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
    created() {
        this.updataBundleProduct = this.row
        this.$axios.post('/api/web/common/searchDictorys', {pCode:'driverLicense'}).then(res => {
            this.driverlicenseTypeList = res.data.returnValue
        }).catch(err => {
            
        })
    },
    methods: {
        updataBundleProductSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/web/product/updateBundleProduct', this.updataBundleProduct).then(res => {
                        this.$router.push({path:'/bundleProduct'})
                        this.$emit("on-update-success")
                    }).catch(err => {
                        
                    })
                }
            })
        },
        returnBack(){
            this.$emit("on-update-success")
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
