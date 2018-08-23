<template>
    <div>
        <public-head/>
        <div class="publicList">
            <div class="publicBack">
                <span>返回</span>
            </div>
            <div class="publicListData mt1">
                <h2>{{ editType }}</h2>
                <el-form :model="addSchool" label-width="80px">
                    <el-form-item label="驾校名称">
                        <el-input v-model="addSchool.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="驾校编号">
                        <el-input v-model="addSchool.code" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="所在城市">
                        <el-select v-model="addSchool.province" placeholder="">
                            <el-option v-for="item in typeList" :key="item.scid" :label="item.cname" :value="item.scid"></el-option>
                        </el-select>
                        <el-select v-model="addSchool.city" placeholder="">
                            <el-option v-for="item in typeList" :key="item.scid" :label="item.cname" :value="item.scid"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="是否显示">
                        <el-radio-group v-model="addSchool.display">
                        <el-radio label="展示"></el-radio>
                        <el-radio label="不展示"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addschool">添加</el-button>
                    </el-form-item>
                    <!-- <el-form-item label="详细地址" :label-width="formLabelWidth">
                        <el-input v-model="changeForm.trainingMethod" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" :label-width="formLabelWidth">
                        <el-input v-model="changeForm.trainingMethod" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="驾校logo" :label-width="formLabelWidth">
                        <el-input v-model="changeForm.packageFeatures" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐特色" :label-width="formLabelWidth">
                        <el-input v-model="changeForm.expenseDescription" auto-complete="off"></el-input>
                    </el-form-item> -->
                </el-form>
            </div>

            <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="dialogChangeForm = false">取 消</el-button>
                <el-button type="primary" @click="onChangeTableData">确 定</el-button>
            </div> -->
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
            addSchool:{
                name:'',
                code:'',
                province:'',
                city:'',
                display:'',
            }
        }
    },
    methods: {
        addschool() {
        this.$axios.post('/api/web/school/addDriverSchool', this.addSchool).then(res => {
              this.$router.push({path:'/schoolList'})
        }).catch(err => {
            // this.dialogAddForm = false
            // this.getTableData() // 新增成功后刷新表格
        })
    },
    }
    
}
</script>
<style scoped>

</style>
