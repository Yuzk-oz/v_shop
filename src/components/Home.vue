<template>
  <!-- 头部区域 -->
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="istoggle ? '64px':'200px'">
        <!-- 侧边栏菜单区域 -->
        <div class="toggle" @click="toggle">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff"  unique-opened :collapse='istoggle' :collapse-transition='false' router :default-active='$route.path'>
          <!-- 一级菜单 -->
          <el-submenu :index="'/'+item.path" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id" >
              <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{subitem.authName}}</span>
            </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体区域 -->
      <el-main><router-view/></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return{
      // 左侧数据
      menulist:[],
      iconsObj:{
        '125':'iconfont icon-user',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao'
      },
      istoggle:false,



    }
  },
  methods: {
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },toggle(){
      this.istoggle=!this.istoggle
    },
    // 获取所有的菜单
    async getMenulist(){
      const {data:res}=await this.$http.get('menus')
      // console.log(res);
      if(res.meta.status!==200)return this.$message.error((res.meta.msg));
      this.menulist=res.data

    }
  },
  created(){
      this.getMenulist()


    }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 20px;
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont{
  margin-right: 10px;
}
.toggle{
  background-color: #4a5064;
  text-align: center;
  letter-spacing: 0.2em;
  line-height: 24px;
  color: #fff;
}
</style>
