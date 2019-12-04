<template>
  <div id="app">
    <el-container>
      <el-header>
        <div id="nav">
          <router-link to="/">Home</router-link>|
          <router-link to="/video">Video</router-link>|
          <router-link to="/music">Music</router-link>|
          <router-link to="/bbs">BBS</router-link>|
          <router-link to="/about">About</router-link>
        </div>
      </el-header>
      <el-main id="maincontainer">
        <transition mode="out-in" :name="this.$store.state.transname">
          <router-view id="routerview" />
        </transition>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  font-weight: bold;
  a {
    font-size: 18px;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #247BA0//teal; //#42b983;
    }
  }
}
main {
  overflow-x: hidden;
  padding-top: 0;
}
#routerview {
  min-height: 600px;
  width: 95%;
  // background: #0000ff57; //测试用
  // border: 1px solid #2c3e50; //测试用
  margin: 0 auto;
}

.right-enter {
  opacity: 0;
  transform: translateX(150px);
}
.right-leave-to {
  opacity: 0;
  transform: translateX(-150px);
}
.right-enter-active,
.right-leave-active {
  transition: all 0.5s ease;
}

.left-enter {
  opacity: 0;
  transform: translateX(-150px);
}
.left-leave-to {
  opacity: 0;
  transform: translateX(150px);
}
.left-enter-active,
.left-leave-active {
  transition: all 0.8s ease;
}
</style>
