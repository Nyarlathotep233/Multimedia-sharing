<template>
  <div>
    <el-progress
      :text-inside="true"
      :stroke-width="4"
      :percentage="percent"
      status="success"
      v-show="progressShow"
    ></el-progress>
    <el-row style="margin-top:5px">
      <el-col :span="8">
        <div id="chat" class="whiteblock" style="height:1000px;padding:10px">
          <!-- <el-row :gutter="5">
            <el-col :span="16">
              <el-input v-model="room" placeholder="请输入房间号"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button @click="refresh">进入房间</el-button>
            </el-col>
          </el-row>-->
          <el-row :gutter="5">
            <!-- <el-col :span="16">
              <el-input v-model="room" placeholder="请输入房间号"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button @click="refresh">进入房间</el-button>
            </el-col>-->
            <h2>{{roomName}}</h2>
          </el-row>
          <div class="msgs" id="msgs"></div>
          <div id="send-message-area">
            <el-row :gutter="15">
              <el-col :span="16">
                <input type="file" id="fileIpt" class="fileIpt" />
              </el-col>
              <el-col :span="8">
                <el-button id="sendFileBtn">发送文件</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-input type="text" id="msgIpt" v-model="message"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button id="sendBtn" class="sendBtn">发送</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div id="videos">
          <video id="me" class="videoWindow" autoplay></video>
        </div>
        <div id="files"></div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss">
#chat {
  border: solid 1px #42b983;
}
#videos {
  text-align: left;
}
#send-message-area {
  position: absolute;
  bottom: 30px;
  left: 30px;
}
#msgs p {
  text-align: left;
}
.videoWindow {
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0.5px 0.5px 3px 0px #247ba061; //rgba(0, 0, 255, 0.2);
  background: white;
  margin-bottom: 15px;
  // width: 100px;
  height: 230px;
}
.fileIpt {
  background-attachment: scroll;
  background-clip: border-box;
  background-color: rgb(255, 255, 255);
  background-image: none;
  background-origin: padding-box;
  background-position-x: 0%;
  background-position-y: 0%;
  background-size: auto;
  border-bottom-color: rgb(220, 223, 230);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-image-outset: 0px;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-left-color: rgb(220, 223, 230);
  border-left-style: solid;
  border-left-width: 1px;
  border-right-color: rgb(220, 223, 230);
  border-right-style: solid;
  border-right-width: 1px;
  border-top-color: rgb(220, 223, 230);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-top-style: solid;
  border-top-width: 1px;
  box-sizing: border-box;
  color: rgb(96, 98, 102);
  cursor: pointer;
  display: block;
  float: left;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", 微软雅黑, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 49px;
  line-height: 14px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  outline-color: rgb(96, 98, 102);
  outline-style: none;
  outline-width: 0px;
  padding-bottom: 12px;
  padding-left: 2.5px;
  padding-right: 2.5px;
  padding-top: 12px;
  text-align: center;
  transition-delay: 0s;
  transition-duration: 0.1s;
  transition-property: all;
  transition-timing-function: ease;
  user-select: none;
  white-space: nowrap;
  width: 234.656px;
  -webkit-appearance: none;
  -webkit-box-direction: normal;
  -webkit-font-smoothing: antialiased;
}
</style>
<script>
import { SkyRTC } from "../scripts/SkyRTC-client";
import { myWebRTC } from "../scripts/myWebRTC";
// console.log(SkyRTC);
// console.log(myWebRTC);
export default {
  inject: ["reload"],
  data() {
    return {
      roomName: "",
      connect: null,
      percent: 0,
      progressShow: false,
      message: ""
    };
  },
  created() {
    this.connect = myWebRTC(SkyRTC, this.$route.query.roomName, this);
    this.roomName = this.$route.query.roomName;
    this.$store.commit("updateWebRtcON", true);
  },
  methods: {
    refresh() {
      this.$router.push({
        path: "/Chat/WebRTC",
        query: {
          roomName: this.roomName
        }
      });
      location.reload();
      // this.$store.commit("updateWebRTCRoom", this.room);
      // console.log(this.$store.state.webRTCRoom);
      // myWebRTCrealTime(SkyRTC, this.$store.state.webRTCRoom);
      // this.reload();
      // this.$forceUpdate;
      // this.connect.closePeerConnection(
      //   this.connect.peerConnections[data.socketId]
      // );
      // myWebRTC(SkyRTC, this.$store.state.webRTCRoom);
      // location.reload();
    },
    showProgress(pct) {
      this.progressShow = true;
      this.percent = pct;
      if (this.percent == 100) {
        setTimeout(() => {
          this.progressShow = false;
        }, 1000);
      }
    },
    displayProgress() {
      setTimeout(() => {
        this.progressShow = false;
      }, 1000);
    }
  }
};
</script>
