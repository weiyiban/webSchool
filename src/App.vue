<template>
  <div id="app">
    <div>
      <div class="head-nav">
        <img src="./assets/logo.png">
        <ul class="nav-list">
          <li v-for="item in headNav" :key="item">
            <a :href="item.href">{{ item.name }}</a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="block">
        <el-carousel :interval="5000" height="590px">
          <el-carousel-item v-for="item in imgList" :key="item.id">
            <el-row>
              <el-col :span="24"><img ref="imgHeight" :src="item.idView" class="banner_img"/></el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
        <div class="carousel-position">
          <img class="carousel-img" src="./assets/banner01.png" alt="">
          <div class="carousel-login">
            <h4>登录使用</h4>
            <el-input placeholder="用户名" class="carousel-login-input" prefix-icon="el-icon-search" v-model="input21"></el-input>
            <el-input placeholder="密码" class="carousel-login-input" prefix-icon="el-icon-search" v-model="input21"></el-input>
            <button type="button" class="carousel-login-button">登录</button>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="noticeBulletin">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      headNav: [
        {
          name: "首页",
          href: "#"
        },
        {
          name: "关于考拉",
          href: "#"
        },
        {
          name: "驾校加盟",
          href: "#"
        },
        {
          name: "APP下载",
          href: "#"
        }
      ],
      imgList:[
        {
          idView: require('./assets/banner.png')
        },
        {
          idView: require('./assets/banner.png')
        },
        {
          idView: require('./assets/banner.png')
        }
      ],
      notice:[
        {
          "title":"单身狗发誓了",
          "releaseTime":"08-21",
        },
        {
          "title":"单身狗发誓了",
          "releaseTime":"08-21",
        },
        {
          "title":"单身狗发誓了",
          "releaseTime":"08-21",
        }
      ],
      service:[
        {
          url:require("./assets/01.png"),
          name:'驾校',
          content:'为驾校提供驾校招生、教练管理、考试统计、学员管理、约车系统等多种服务'
        },
        {
          url:require("./assets/02.png"),
          name:'教练',
          content:'文字文字文字文字文字文字文字文字文字文字'
        },
        {
          url:require("./assets/03.png"),
          name:'学员',
          content:'文字文字文字文字文字文字文字文字文字文字'
        },
      ],
    };
  },
  // mounted(){
  //   this.$http.get('http://192.168.1.199:8088/web/kaola/getKaoLaDynamic') //把url地址换成你的接口地址即可
  //   .then(res => {
  //    this.notice = res; //把取item的数据赋给 item: []中
  //    console.log(res);
  //   })
  //   .catch(err => {
  //    alert('请求失败');
  //   })
  // }
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
.head-nav{
  width: 1200px;
  margin: auto;
  padding-bottom: 35px;
}
.head-nav img{
  float: left;
  margin-top: 24px;
}
.nav-list{
  float: right;
  margin-top: 40px;
}
.nav-list a{
  text-decoration: none;
  padding: 13px 34px;
  color: #5F6367;
  font-size: 18px
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
