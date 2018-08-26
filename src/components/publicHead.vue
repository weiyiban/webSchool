<template>
    <div>
        <div class="backTop">
            <img src="../assets/topLogo.png" class="auto" alt="">
        </div>
        <div style="background-color:#fff;">
            <div class="schoolTop auto">
                <div class="pull-left">
                    <img src="../assets/schoolLogo.png" alt="">
                </div>
                <div class="pull-left ml1 kaola">
                    <span>考啦考啦驾校联盟</span>
                    <h1 class="mt1">系统后台</h1>
                </div>
                <el-input placeholder="查询" class="input-with-select inputRedefinition" size="mini">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <router-link class="pull-right signOut" :to="{path:'/login'}">退出</router-link>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'publicHead',
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.backTop{
    width: 100%;
    background-color:#47B579;
}
.backTop img{
    display: block;
    padding: 8px;
}
.schoolTop{
    width: 1200px;
    padding: 20px 0;
}
.kaola span{
    color: #999999;
}
.kaola h1{
    font-size: 30px;
    color: #666666;
    font-weight: 400;
}
.inputRedefinition{
    width: 220px;
    margin-left: 240px;
    margin-top: 25px;
}
.signOut{
    color: #999999;
    margin-top: 30px;
}
</style>
