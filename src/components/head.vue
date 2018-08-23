<template>
  <div id="head-nav">
    <img src="../assets/logo.png">
    <ul class="nav-list">
      <li v-for="item in headNav" :key="item">
        <a :href="item.href">{{ item.name }}</a>
      </li>
    </ul>
    <div class="clearfix"></div>
  </div>
</template>
<script>
export default {
  name: 'headNav',
  data() {
    return {
      headNav: [{
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
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
#head-nav{
  width: 1200px;
  margin: auto;
  padding-bottom: 35px;
}
#head-nav img{
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
</style>