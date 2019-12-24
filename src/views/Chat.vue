<template>
  <div>
    <h1>Chat</h1>
    <div class="whiteblock">
      <el-row type="flex" justify="center">
        <el-col :span="11">
          <el-input
            v-model="roomName"
            placeholder="请输入房间名"
            type="primary"
            @keyup.enter.native="goRoom"
          ></el-input>
        </el-col>
        <!-- <router-link :to="'/Chat/WebRTC?roomName='+roomName"> -->
        <el-button icon="el-icon-search" type="primary" @click="goRoom"></el-button>
        <!-- </router-link> -->
      </el-row>
    </div>

    <router-view />
  </div>
</template>
<style lang="scss">
</style>
<script>
export default {
  data() {
    return {
      roomName: ""
    };
  },
  methods: {
    goRoom() {
      this.$router.push({
        path: "/Chat/WebRTC",
        query: {
          roomName: this.roomName
        }
      });
      location.reload();
    }
  }
};
</script>
