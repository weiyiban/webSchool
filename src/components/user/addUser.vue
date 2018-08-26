<template>
    <div>
        <public-head/>
        <div class="publicList">
            <div class="publicBack">
                <router-link class="returnBack" :to="{path:'/usersList'}"><i class="el-icon-arrow-left"></i>返回</router-link>
            </div>
            <div class="publicListData mt1">
                <h2>{{ editType }}</h2>
                <el-form :model="addUsersData" :rules="addUsersRules" ref="addUsersRuleForm" label-width="310px">
                    <el-form-item label="登录账户：" prop="username">
                        <el-input v-model="addUsersData.username" auto-complete="off" style="width:280px;"/>
                    </el-form-item>
                    <el-form-item label="登录密码：" prop="password">
                        <el-input v-model="addUsersData.password" auto-complete="off" style="width:280px;"/>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="realname">
                        <el-input v-model="addUsersData.realname" auto-complete="off" style="width:280px;"/>
                    </el-form-item>
                    <!-- <el-form-item label="归属：">
                        <el-select v-model="addUsersData.schoolName" style="width:280px;">
                            <el-option v-for="item in schoolNameList" :key="item.scid" :label="item.cname" :value="item.scid"/>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="角色：">
                        <el-select v-model="addUsersData.accountType" style="width:280px;">
                            <el-option v-for="item in accountTypeList" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="到期时间：">
                        
                    </el-form-item>
                    <el-form-item label="账号状态：">
                        <el-radio-group v-model="addUsersData.status">
                        <el-radio label="1">正常</el-radio>
                        <el-radio label="0">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addUsers('addUsersRuleForm')">添加</el-button>
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
            editType:'添加用户',
            addUsersData:{
                username:'',
                password:'',
                realname:'',
                schoolName:'',
                accountType:'KAOLA',
                expirationTime:'',
                status:'1'
            },
            accountTypeList:[
                {
                    label:'考啦员工',
                    value:'KAOLA'
                },
                {
                    label:'驾校员工',
                    value:'EMPLOYEE'
                }
            ],
            schoolNameList:[],
            addUsersRules:{
                username: [
                    { 
                        required: true, 
                        message: '请输入登录账户',
                        trigger: 'blur' 
                    }
                ],
                password:[
                    {
                        required: true, 
                        message: '请输入登录密码',
                        trigger: 'blur' 
                    }
                ],
                realname:[
                    {
                        required: true, 
                        message: '请输入姓名',
                        trigger: 'blur' 
                    }
                ]
            }
        }
    },
    methods: {
        addUsers(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/web/user/addUser', this.addUsersData).then(res => {
                        this.$router.push({path:'/usersList'})
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

</style>
