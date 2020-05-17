<template>
  <div>
    <el-progress :text-inside="true" :stroke-width="4" :percentage="percent" status="success" v-show="progressShow"></el-progress>
    <el-row style="margin-top:5px">
      <el-col :span="8">
        <div id="chat" class="whiteblock message-block" style="height:1000px;padding:10px">
          <div>
            <el-row :gutter="5">
              <h2>{{roomName}}</h2>
            </el-row>
            <div class="msgs" id="msgs">
              <!-- {{chatRecords}} -->
              <div v-for="(record,i) in chatRecords" :key="'record'+i" :class="record.user==='me'?'my-record-box':'record-box'">
                <!-- {{record}} -->
                <div class="type-p" v-if="record.type==='p'">
                  <p class="user-name">{{record.user}}</p>
                  <span>:</span>
                  <p>
                    {{record.info}}
                  </p>
                </div>
                <div class="type-img" v-if="record.type==='img'">
                  <p class="user-name">{{record.user}}</p>
                  <span>:</span>
                  <!-- <img @load="revokeURL(record.info)" :src="record.info" /> -->
                  <img :onload="makeStr(record.info)" :src="record.info" />
                  <!-- 在vue中使用@load而非onload,为什么 -->
                </div>

              </div>
            </div>
          </div>

          <div id="send-message-area">
            <div style="margin-bottom:20px;margin-left:10px;text-align:left">
              <el-upload action="" ref="upload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :before-upload="beforeUpload" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">发送文件</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </div>

            <div style="display: flex;justify-content: space-between;align-items:flex-start">
              <div class="msgIpt">
                <el-input type="text" id="msgIpt" v-model="message"></el-input>
              </div>
              <div class="sendBtn">
                <el-button id="sendBtn">发送</el-button>
              </div>

            </div>
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
  #msgs p {
    text-align: left;
  }
  .sendBtn {
    margin: 0 10px;
    flex-grow: 1;
  }
  .msgIpt {
    margin: 0 10px;
    flex-grow: 1;
  }
  .message-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  .record-box {
    .type-img,
    .type-p {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  .my-record-box {
    .type-img,
    .type-p {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }
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
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', 微软雅黑, Arial, sans-serif;
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
  function filetoDataURL (file, fn) {
    var reader = new FileReader();
    reader.onloadend = function (e) {
      fn(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  function dataURLtoImage (dataurl, fn) {
    var img = new Image();
    img.onload = function () {
      fn(img);
    };
    img.src = dataurl;
  }

  function imagetoCanvas (image) {
    var cvs = document.createElement("canvas");
    var ctx = cvs.getContext('2d');
    cvs.width = image.width;
    cvs.height = image.height;
    ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
    return cvs;
  }

  function canvasResizetoFile (canvas, quality, fn) {
    canvas.toBlob(function (blob) {
      fn(blob);
    }, 'image/jpeg', quality);
  }

  function fileResizetoFile (file, quality, fn) {
    filetoDataURL(file, function (dataurl) {
      dataURLtoImage(dataurl, function (image) {
        canvasResizetoFile(imagetoCanvas(image), quality, fn);
      })
    })
  }



  import { SkyRTC } from "../scripts/SkyRTC-client";
  import { myWebRTC } from "../scripts/myWebRTC";
  // console.log(SkyRTC);
  // console.log(myWebRTC);

  export default {
    inject: ["reload"],
    data () {
      return {
        roomName: "",
        connect: null,
        percent: 0,
        progressShow: false,
        fileList: [],
        // myWebRTC中用到的变量
        chatRecords: [],
        message: "",
      };
    },
    created () {
      this.connect = myWebRTC(SkyRTC, this.$route.query.roomName, this);
      this.roomName = this.$route.query.roomName;
      this.$store.commit("updateWebRtcON", true);
      window.revokeURL = this.revokeURL;
    },
    methods: {
      makeStr (url) {
        return 'revokeURL("' + url + '")'
      },
      revokeURL (url) {
        console.log('!!!!!!!!!', url);
        (window.URL || window.webkitURL).revokeObjectURL(url);
        // return 'revokeIt("' + url + '")'
      },
      refresh () {
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

      displayProgress () {
        setTimeout(() => {
          this.progressShow = false;
        }, 1000);
      },
      submitUpload () {
        this.$refs.upload.submit();
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      beforeUpload (file) {
        console.log("beforeUpload", file);
        var msgs = document.getElementById("msgs");
        var that = this
        var name = file.name

        if (file.name.endWithImg()) {
          fileResizetoFile(file, 0.6, function (blob) {//这里的file是个Blob实例
            let file = new File([blob], name, { type: 'image/jpeg' })
            //拿到file，做下一步操作；
            that.connect.shareFile(file);
            let url = window.URL.createObjectURL(file);
            let img = {
              type: 'img',
              user: 'me',
              info: url
            }
            that.chatRecords.push(img)
          })
        } else {
          this.connect.shareFile(file);
        }
        return false
      },
      // myWebRTC中用到的方法
      showProgress (pct) {
        this.progressShow = true;
        this.percent = pct;
        if (this.percent == 100) {
          setTimeout(() => {
            this.progressShow = false;
          }, 1000);
        }
      },
    }
  };
</script>
