<template>
  <div id="app">
    <head-com />
    <div class="block">
      <el-carousel :interval="5000" height="590px">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <el-row>
            <el-col :span="24"><img ref="imgHeight" :src="item.idView" class="banner_img"/></el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
      <div class="carousel-position">
        <img class="carousel-img" src="../assets/banner01.png" alt="">
        <div class="carousel-login">
          <h4>登录使用</h4>
          <el-input placeholder="用户名" class="carousel-login-input" prefix-icon="el-icon-search" v-model="loginFrom.userName"></el-input>
          <el-input placeholder="密码" class="carousel-login-input" prefix-icon="el-icon-search" v-model="loginFrom.password"></el-input>
          <button type="button" class="carousel-login-button" @click="onLogin">登录</button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <!-- <div class="noticeBulletin">
      <span>通知公告</span>
      <span class="noticeItem" v-for="item in notice" :key="item">[{{ item.releaseTime }}] {{ item.title }}</span>
      <a href="" class="pull-right">更多>></a>
    </div>
    <div>
      <div class="serviceWeb">
        <h1>考啦考啦服务平台</h1>
        <p>为驾校、教练、学员提供服务，集驾考多场景为一体，提升效率，降低成本</p>
        <div class="service">
          <div v-for="item in service" :key="item">
            <img :src='item.url' alt="">
            <p>{{ item.name }}</p>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
 import headCom from '@/components/head'
export default {
  name: 'App',
  components: {
      headCom
    },
  data() {
    return {
      imgList:[
        {
          idView: require('../assets/banner.png')
        },
        {
          idView: require('../assets/banner.png')
        },
        {
          idView: require('../assets/banner.png')
        }
      ],
      notice:[
        {
          title:'单身狗发誓了',
          releaseTime:'08-21'
        },
        {
          title:'单身狗发誓了',
          releaseTime:'08-21'
        },
        {
          titl:'单身狗发誓了',
          releaseTime:'08-21'
        }
      ],
      service:[
        {
          url:require("../assets/01.png"),
          name:'驾校',
          content:'为驾校提供驾校招生、教练管理、考试统计、学员管理、约车系统等多种服务'
        },
        {
          url:require("../assets/02.png"),
          name:'教练',
          content:'文字文字文字文字文字文字文字文字文字文字'
        },
        {
          url:require("../assets/03.png"),
          name:'学员',
          content:'文字文字文字文字文字文字文字文字文字文字'
        }
      ],

      loginFrom:{
      	userName:'',
      	password:''
      }
    }
  },
   methods: {
   	onLogin(){
   		this.$axios.post('/api/web/user/userLogin',this.loginFrom).then(res => {
	     this.$router.push({path:'/schoolList'})
	    }).catch(err => {
	     this.$router.push({path:'/schoolList'})
	    })
   	}
   }
};
</script>
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}

.banner_img{
  width: 100%;
}
.block{
  position: relative;
  min-width: 1200px;
}
.el-carousel__container{
  height: 590px;
}
.carousel-position{
  width: 1200px;
  position: absolute;
  left: 50%;
  margin-left: -600px;
  top: 50%;
  z-index: 111;
  margin-top: -166px;
}
.carousel-img{
  float: left;
}
.carousel-login{
  width: 360px;
  padding: 40px 35px;
  float: right;
  background-color: #fff;
  border-radius: 4px;
  margin-right: 50px;
}
.carousel-login h4{
  margin-bottom: 35px;
  font-size: 18px;
  color: #999999;
}
.carousel-login-input{
  margin-bottom: 35px;
}
.carousel-login-button{
  width: 100%;
  padding: 13px;
  background-color: #47B579;
  border: 1px solid #47B579;
  color: #ffffff;
  font-size: 16px;
}
.noticeBulletin{
  width: 1200px;
  margin: auto;
  padding: 25px 0 21px 0;
}
.noticeBulletin span:first-child{
  padding-right: 15px;
  border-right: 1px solid #F5C3AE;
  color: #EC6E00;
  margin-right: 15px;
}
.noticeItem{
  width: 280px;
  margin-right: 50px;
  display: inline-block;
}
.serviceWeb{

}
</style>
