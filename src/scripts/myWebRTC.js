import Vue from "vue";
import {
  Notification,
  MessageBox
} from "element-ui";
import $ from 'jquery'


function myWebRTC(SkyRTC, roomName, bbs) {
  // console.log(bbs)
  // var SkyRTC = SkyRTC
  var rtc = SkyRTC();
  window.onload = function () {
    var videos = document.getElementById("videos");
    var sendBtn = document.getElementById("sendBtn");
    var msgs = document.getElementById("msgs");
    var sendFileBtn = document.getElementById("sendFileBtn");
    var files = document.getElementById("files");
    var msgIpt = document.getElementById("msgIpt");


    /*********************绑定事件******************************/
    if (sendBtn)
      sendBtn.onclick = function (event) {
        var msg = bbs.message;
        //广播消息
        rtc.broadcast(msg);
        bbs.message = "";
        var info, user
        user = 'me'
        info = msg

        bbs.chatRecords.push({
          info,
          user,
          type: 'p'
        })
      };

    if (msgIpt)
      msgIpt.keydown = function (event) {
        if (event.keyCode == 13) {
          var msg = bbs.message
          //广播消息
          rtc.broadcast(msg);
          bbs.message = "";

          var info, user
          user = 'me'
          info = msg

          bbs.chatRecords.push({
            info,
            user,
            type: 'p'
          })
        }
      }

    if (sendFileBtn)
      sendFileBtn.onclick = function (event) {
        //分享文件
        rtc.shareFile("fileIpt");

        let file = document.getElementById("fileIpt").files[0];
        if (file.fileName.endWithImg()) {
          // let img = document.createElement("img");
          // img.file = file
          // msgs.appendChild(img);
          let url = window.URL.createObjectURL(file);
          let img = {
            type: 'img',
            user: 'me',
            info: url
          }
          bbs.chatRecords.push(img)
          window.URL.revokeObjectURL(url);

          // var reader = new FileReader();
          // reader.onload = (function (aImg) {
          //   return function (e) {
          //     let url = e.target.result
          //     // aImg.src = url;
          //     console.log(aImg, '!!!!!!!!!!!')
          //     aImg.info = url(window.URL || window.webkitURL).revokeObjectURL(url);
          //   }
          // })(img);
          // reader.readAsDataURL(file);
        }

      };
    /**********************************************************/



    //对方同意接收文件
    rtc.on("send_file_accepted", function (sendId, socketId, file) {
      var p = document.getElementById("sf-" + sendId);
      // p.innerText = "对方接收" + file.name + "文件，等待发送";
      Notification({
        message: "对方接收" + file.name + "文件，等待发送",
        type: 'info'
      });
    });
    //对方拒绝接收文件
    rtc.on("send_file_refused", function (sendId, socketId, file) {
      var p = document.getElementById("sf-" + sendId);
      Notification({
        title: '错误',
        message: "对方拒绝接收" + file.name + "文件",
        type: 'error'
      });
    });
    //请求发送文件
    rtc.on('send_file', function (sendId, socketId, file) {
      var p = document.createElement("p");
      // p.innerText = "请求发送" + file.name + "文件";
      Notification({
        message: "请求发送" + file.name + "文件",
        type: 'info'
      });
      p.id = "sf-" + sendId;
      files.appendChild(p);
    });
    //文件发送成功
    rtc.on('sended_file', function (sendId, socketId, file) {
      var p = document.getElementById("sf-" + sendId);
      p.parentNode.removeChild(p);
      Notification({
        title: '成功',
        message: "发送文件成功",
        type: 'success'
      });
    });
    //发送文件碎片
    rtc.on('send_file_chunk', function (sendId, socketId, percent, file) {
      var p = document.getElementById("sf-" + sendId);
      // p.innerText = file.name + "文件正在发送: " + Math.ceil(percent) + "%";
      bbs.showProgress(Math.ceil(percent));
      // Notification({

      //     message: file.name + "文件正在发送: " + Math.ceil(percent) + "%",
      //     type: 'info'
      // });
    });
    //接受文件碎片
    rtc.on('receive_file_chunk', function (sendId, socketId, fileName, percent) {

      var p = document.getElementById("rf-" + sendId);
      // p.innerText = "正在接收" + fileName + "文件：" + Math.ceil(percent) + "%";
      bbs.showProgress(Math.ceil(percent));
      // Notification({
      //     message: "正在接收" + fileName + "文件：" + Math.ceil(percent) + "%",
      //     type: 'info'
      // });

    });
    //接收到文件
    rtc.on('receive_file', function (sendId, socketId, name, url) {
      let p = document.getElementById("rf-" + sendId),
        hyperlink = document.createElement("a"),
        mouseEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
      p.parentNode.removeChild(p);
      // console.log(url, '!!!!!!!!!!!!!!!!!!!!!!!!!!')
      if (name.endWith(".jpg") || name.endWith(".png")) {
        var user
        if (socketId.length > 10) {
          user = socketId.slice(0, 5) + "...";
        } else {
          user = socketId;
        }
        let img = {
          type: 'img',
          user,
          info: url
        }
        // msgs.appendChild(img);
        bbs.chatRecords.push(img)
      } else {
        hyperlink.href = url
        hyperlink.target = '_blank';
        // hyperlink.download = fileInfo.name || dataURL;
        hyperlink.download = name;
        hyperlink.dispatchEvent(mouseEvent);
      }
      (window.URL || window.webkitURL).revokeObjectURL(url);
    });
    //发送文件时出现错误
    rtc.on('send_file_error', function (error) {
      console.log(error);
      Notification({
        message: error,
        type: "error"
      });
    });
    //接收文件时出现错误
    rtc.on('receive_file_error', function (error) {
      // console.log(error);
    });
    //接受到文件发送请求
    rtc.on('receive_file_ask', function (sendId, socketId, fileName, fileSize) {
      var p;
      // if (window.confirm(socketId + "用户想要给你传送" + fileName + "文件，大小" + fileSize + "KB,是否接受？")) {
      //   rtc.sendFileAccept(sendId);
      //   p = document.createElement("p");
      //   p.innerText = "准备接收" + fileName + "文件";
      //   p.id = "rf-" + sendId;
      //   files.appendChild(p);
      //   Notification({
      //     message: "准备接收" + fileName + "文件",
      //     type: "warning"
      //   });
      // } else {
      //   rtc.sendFileRefuse(sendId);
      // }
      if (fileName.endWithImg()) {
        rtc.sendFileAccept(sendId);
        p = document.createElement("p");
        p.innerText = "接收" + fileName + "图片";
        p.id = "rf-" + sendId;
        files.appendChild(p);
        Notification({
          message: "接收" + fileName + "图片",
          type: "success"
        });
        return
      }
      MessageBox.confirm(socketId.slice(0, 5) + "...用户想要给你传送" + fileName + "文件，大小" + fileSize + "KB,是否接受？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rtc.sendFileAccept(sendId);
        p = document.createElement("p");
        p.innerText = "准备接收" + fileName + "文件";
        p.id = "rf-" + sendId;
        files.appendChild(p);
        Notification({
          message: "准备接收" + fileName + "文件",
          type: "warning"
        });
      }).catch(() => {
        rtc.sendFileRefuse(sendId);
        p = document.createElement("p");
        p.innerText = "拒绝接收" + fileName + "文件";
        p.id = "rf-" + sendId;
        files.appendChild(p);
        Notification({
          message: "拒绝接收" + fileName + "文件",
          type: "error"
        });
      });
    });
    //成功创建WebSocket连接
    rtc.on("connected", function (socket) {
      //创建本地视频流
      rtc.createStream({
        "video": true,
        "audio": true
      });
    });
    //创建本地视频流成功
    rtc.on("stream_created", function (stream) {
      try {
        document.getElementById('me').src = URL.createObjectURL(stream);
      } catch (e) {
        // console.log(e);
        document.getElementById('me').srcObject = stream;
      }

      document.getElementById('me').play();
      Notification({
        title: "成功",
        message: "您已进入聊天室",
        type: "success"
      });
    });
    //创建本地视频流失败
    rtc.on("stream_create_error", function () {
      // alert("create stream failed!");
      Notification({
        title: "错误",
        message: "create stream failed!",
        type: "error"
      });
    });
    //接收到其他用户的视频流
    rtc.on('pc_add_stream', function (stream, socketId) {
      var newVideo = document.createElement("video"),
        id = "other-" + socketId;
      newVideo.setAttribute("class", "other");
      newVideo.classList.add("videoWindow");
      newVideo.setAttribute("autoplay", "autoplay");
      newVideo.setAttribute("id", id);
      videos.appendChild(newVideo);
      rtc.attachStream(stream, id);

      Notification({
        message: "与用户:ID:" + socketId + "建立连接",
        type: "success"
      });
    });
    //删除其他用户
    rtc.on('remove_peer', function (socketId) {
      var video = document.getElementById('other-' + socketId);
      if (video) {
        video.parentNode.removeChild(video);
      }
      Notification({
        message: "用户:ID:" + socketId + "断开连接",
        type: "info"
      });
    });
    //接收到文字信息
    rtc.on('data_channel_message', function (channel, socketId, message) {
      var info, user
      if (socketId.length > 10) {
        user = socketId.slice(0, 5) + "...";
      } else {
        user = socketId;
      }
      info = message

      bbs.chatRecords.push({
        info,
        user,
        type: 'p'
      })
      Notification({
        message: "收到消息",
        type: "info",
      });
    });
    //连接WebSocket服务器
    // rtc.connect("ws:" + window.location.href.substring(window.location.protocol.length).split('#')[0], window.location.hash.slice(1));
    // rtc.connect("ws:" + window.location.href.substring(window.location.protocol.length).split(':')[0] + ':3000', window.location.hash.slice(1));
    // rtc.connect("wss:" + window.location.href.substring(window.location.protocol.length).split('#')[0], roomName);

    // let wsLink="wss:" +  location.hostname + ':'+location.port
    let wsLink = "wss:zhangzec.vip:8080"
    this.console.log(wsLink, roomName)
    rtc.connect(wsLink, roomName);

    // return rtc;
  }
  return rtc
}
export {
  myWebRTC
}