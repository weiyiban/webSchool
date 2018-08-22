<template>
    <div>
        <img src="" alt="">
    </div>
    <div>
        <img src="" alt="">
        <div>
            <span>考啦考啦驾校联盟</span>
            <h1>石家庄利安驾校</h1>
        </div>
        <el-input size="mini" placeholder="查询" suffix-icon="el-icon-date" v-model="input9"></el-input>
        <ul class="nav-list">
          <li v-for="item in headNav" :key="item">
            <a :href="item.href">{{ item.name }}</a>
          </li>
        </ul>
    </div>
</template>
