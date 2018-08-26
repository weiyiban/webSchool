<template>
    <div>
        <public-head/>
        <div class="publicList">
            <div class="adminModule pull-left mt2">
                <p>{{ username }},您好，欢迎使用！</p>
                <div class="adminUser">
                    <img :src="headPortrait" class="pull-left" alt="">
                    <div class="pull-left">
                        {{ username }} <small>（10002.考务处）</small>
                        <p>修改登录密码</p>
                    </div>
                </div>
            </div>
            <div class="pull-right mt2">
                <img :src="culture" alt="">
            </div>
            <div class="clearfix"></div>
            <div class="homePageModule mt2">
                <p>今天是{{ newData }}，{{ week }}，你想做什么呢</p>
                <div class="module-list">
                    <router-link v-for="(item,index) in homePageModule" :key="item.index" class="module-line" :to="{path:item.path}" :class="[{'module-line-other' : index % 3 !== 0}]">
                        <img :src="item.src" class="pull-left" alt="">
                        <div class="module-content pull-left ml2">
                            <h3 class="mt2">{{ item.module }}</h3>
                            <p class="mt2">{{ item.explain }}</p>
                        </div>
                        <div class="clearfix"></div>
                    </router-link>
                    <div class="clearfix"></div>
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
            username:'晓明',
            headPortrait: require('../assets/headPortrait.png'),
            culture: require('../assets/culture.png'),
            newData:'',
            week:'',
            homePageModule:[
                {
                    src:require('../assets/schoolList.png'),
                    module:'驾校管理',
                    explain:'修改管理驾校信息',
                    path:'schoolList'                    
                },
                {
                    src:require('../assets/schoolDynamics.png'),
                    module:'驾校动态',
                    explain:'发布管理驾校动态',
                    path:'schoolDynamics'                   
                },
                {
                    src:require('../assets/studentList.png'),
                    module:'学员管理',
                    explain:'修改管理学员信息',
                    path:'studentList'                   
                },
                {
                    src:require('../assets/complaintList.png'),
                    module:'学员投诉建议',
                    explain:'2个投诉建议需回复',
                    tips:true,
                    path:'complaintList'                   
                },
                {
                    src:require('../assets/dataList.png'),
                    module:'数字字典',
                    explain:'设置修改数字字典',
                    path:'dataList'                   
                },
                {
                    src:require('../assets/userList.png'),
                    module:'用户管理',
                    explain:'已有15个用户',
                    path:'usersList'                   
                },
            ]
        }
    },
    created(){
        var date = new Date();
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day
        }
        this.newData = year + "-" + month + "-" + day
        this.week = weekday[date .getDay()]
        this.$axios.post('/api/web/user/getCurrentUser').then(res => {
            this.username = res.data.returnValue.realname
        }).catch(err => {
            // this.dialogAddForm = false
            // this.getTableData() // 新增成功后刷新表格
        })
    }
}
</script>
<style scoped>
.adminModule{
    background-color: #ffffff;
    padding: 26px 20px;
    width: 460px;
    border-radius: 8px;
}
.adminModule>p{
    font-size: 12px;
    color: #999999;
    padding-bottom: 17px;
    border-bottom: 1px solid #E9E9E9;
}
.adminUser{
    margin-top: 23px;
}
.adminUser img{
    width: 54px;
    height: 54px;
    border-radius: 50%;
    margin-right: 27px;
}
.adminUser div{
    font-size: 16px
}
.adminUser small{
    color: #999999
}
.adminUser p{
    font-size: 12px;
    color: #666666;
    margin-top: 16px;
}
.homePageModule{
    background-color: #ffffff;
    padding: 48px 40px 76px 40px;
    border-radius: 8px;
}
.homePageModule>p{
    font-size: 20px;
    color: #333333;
    padding-bottom: 20px;
    border-bottom: 1px solid #E9E9E9;
}
.module-list{
    padding-left: 30px;
}
.module-content h3{
    font-weight: 400;
    font-size: 18px;
    color: #373D41;
}
.module-content p{
    color: #999999;
}
.module-line{
    margin-top: 90px;
    margin-bottom: 30px;
    float: left;
}
.module-line-other{
    margin-left: 150px;
}
</style>

