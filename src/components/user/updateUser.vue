<template>
    <div>
        <div class="publicBack">
            <span class="returnBack" @click="returnBack"><i class="el-icon-arrow-left"></i>返回</span>
        </div>
        <div class="publicListData mt1">
            <h2>{{ editType }}</h2>
            <el-form :model="updateUsersData" :rules="updateUsersRules" ref="updateUsersRuleForm" label-width="120px">
                <el-form-item label="登录账户：" prop="username">
                    <el-input v-model="updateUsersData.username" auto-complete="off" style="width:280px;"/>
                </el-form-item>
                <el-form-item label="登录密码：" prop="password">
                    <el-input v-model="updateUsersData.password" auto-complete="off" style="width:280px;"/>
                </el-form-item>
                <el-form-item label="姓名：" prop="realname">
                    <el-input v-model="updateUsersData.realname" auto-complete="off" style="width:280px;"/>
                </el-form-item>
                <el-form-item label="归属：">
                    <el-select v-model="updateUsersData.schoolName" style="width:280px;">
                        <el-option v-for="item in schoolNameList" :key="item.scid" :label="item.cname" :value="item.scid"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色：">
                    <el-select v-model="updateUsersData.accountType" style="width:280px;">
                        <el-option v-for="item in accountTypeList" :key="item.scid" :label="item.label" :value="item.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="到期时间：">
                    <el-select v-model="updateUsersData.expirationTime" style="width:280px;">
                        <el-option v-for="item in typeList" :key="item.scid" :label="item.label" :value="item.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号状态：">
                    <el-radio-group v-model="updateUsersData.status">
                    <el-radio label="1">正常</el-radio>
                    <el-radio label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateUsers('updateUsersRuleForm')">确定</el-button>
                </el-form-item>
            </el-form>
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
    props: {
        row: { // 接收父组件传来的某行数据
        type: Object,
        default: {}
        }
    },
    data(){
        return{
            editType:'编辑用户',
            updateUsersData:{
                username:'',
                password:'',
                realname:'',
                schoolName:'',
                accountType:'',
                expirationTime:'',
                status:''
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
            updateUsersRules:{
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
    created() {
        this.updateUsersData = this.row
    },
    methods: {
        updateUsers(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/web/user/updateUser', this.updateUsersData).then(res => {
                        this.$router.push({ path: '/usersList' })
                        this.$emit("on-update-success")
                    }).catch(err => {
                        // this.dialogupdateForm = false
                        // this.getTableData() // 新增成功后刷新表格
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

</style>
