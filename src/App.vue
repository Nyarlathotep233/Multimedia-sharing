<template>
  <div id="app">
    <el-container>
      <el-header>
        <div id="nav">
          <!-- <router-link to="/">Home</router-link>| -->
          <router-link to="/video" :onclick="'if ('+this.$store.state.webRtcON+') {location.reload();}'">Video</router-link>|
          <router-link to="/music" :onclick="'if ('+this.$store.state.webRtcON+') {location.reload();}'">Music</router-link>|
          <router-link to="/Chat" :onclick="'if ('+this.$store.state.webRtcON+') {location.reload();}'">Chat</router-link>|
          <!-- <router-link :to="videoChatUrl" onclick="location.reload();">Chat</router-link>| -->
          <router-link to="/about" :onclick="'if ('+this.$store.state.webRtcON+') {location.reload();}'">About</router-link>
        </div>
        <div id="update-by-spider">
          <el-tooltip class="item" effect="dark" :content="'上次更新:'+lastUpdate" placement="bottom">
            <el-button type="danger" round @click="updateBySpider">更新爬虫</el-button>
          </el-tooltip>
        </div>
      </el-header>
      <el-main id="maincontainer">
        <transition mode="out-in" :name="this.$store.state.transname">
          <router-view id="routerview" :key="keyNum" />
        </transition>
      </el-main>
      <el-footer>作者:zzc</el-footer>
    </el-container>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        keyNum: 0,
        videoChatUrl: "",
        lastUpdate: null
      };
    },
    provide () {
      return {
        reload: this.reload
      };
    },
    methods: {
      reload () {
        // console.log(this.keyNum++);
      },
      updateBySpider () {
        this.axios.get("/updateBySpider").then(response => {
          let date = new Date(response.data.date)
          this.lastUpdate = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        });
      },
      closeWebRTC () { }
    },
    created () {
      var nowroom = this.$route.query.room;
      this.videoChatUrl = "/bbs?room=" + nowroom;
      if (
        window.location.href
          .substring(window.location.protocol.length)
          .split("#")[1] == "/bbs"
      ) {
        this.videoChatUrl = "/";
      }
      this.axios.get("/lastUpdate").then(response => {
        let date = new Date(response.data.date)
        this.lastUpdate = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
      });
    }
  };
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  #update-by-spider {
    position: absolute;
    right: 20px;
    top: 20px;
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
