import Vue from "vue";
import ElementUI from "element-ui";
import $ from 'jquery'


function myWebRTC(SkyRTC, roomName, bbs) {
    // console.log(bbs)
    // var SkyRTC = SkyRTC
    window.onload = function () {
        var videos = document.getElementById("videos");
        var sendBtn = document.getElementById("sendBtn");
        var msgs = document.getElementById("msgs");
        var sendFileBtn = document.getElementById("sendFileBtn");
        var files = document.getElementById("files");
        var msgIpt = document.getElementById("msgIpt");
        var rtc = SkyRTC();

        /**********************************************************/
        sendBtn.onclick = function (event) {
            var msg = bbs.message,
                p = document.createElement("p");
            p.innerText = "me: " + msg;
            //广播消息
            rtc.broadcast(msg);
            msgIpt.value = "";
            msgs.appendChild(p);
        };
        $('#msgIpt').keydown(function (event) {
            if (event.keyCode == 13) {
                var msg = bbs.message,
                    p = document.createElement("p");
                p.innerText = "me: " + msg;
                //广播消息
                rtc.broadcast(msg);
                msgIpt.value = "";
                msgs.appendChild(p);
            }
        })

        sendFileBtn.onclick = function (event) {
            //分享文件
            rtc.shareFile("fileIpt");
        };
        /**********************************************************/



        //对方同意接收文件
        rtc.on("send_file_accepted", function (sendId, socketId, file) {
            var p = document.getElementById("sf-" + sendId);
            // p.innerText = "对方接收" + file.name + "文件，等待发送";
            ElementUI.Notification({
                message: "对方接收" + file.name + "文件，等待发送",
                type: 'info'
            });
        });
        //对方拒绝接收文件
        rtc.on("send_file_refused", function (sendId, socketId, file) {
            var p = document.getElementById("sf-" + sendId);
            ElementUI.Notification({
                title: '错误',
                message: "对方拒绝接收" + file.name + "文件",
                type: 'error'
            });
        });
        //请求发送文件
        rtc.on('send_file', function (sendId, socketId, file) {
            var p = document.createElement("p");
            // p.innerText = "请求发送" + file.name + "文件";
            ElementUI.Notification({
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
            ElementUI.Notification({
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
            // ElementUI.Notification({

            //     message: file.name + "文件正在发送: " + Math.ceil(percent) + "%",
            //     type: 'info'
            // });
        });
        //接受文件碎片
        rtc.on('receive_file_chunk', function (sendId, socketId, fileName, percent) {
            var p = document.getElementById("rf-" + sendId);
            // p.innerText = "正在接收" + fileName + "文件：" + Math.ceil(percent) + "%";
            bbs.showProgress(Math.ceil(percent));
            // ElementUI.Notification({
            //     message: "正在接收" + fileName + "文件：" + Math.ceil(percent) + "%",
            //     type: 'info'
            // });
        });
        //接收到文件
        rtc.on('receive_file', function (sendId, socketId, name) {
            var p = document.getElementById("rf-" + sendId);
            p.parentNode.removeChild(p);
        });
        //发送文件时出现错误
        rtc.on('send_file_error', function (error) {
            // console.log(error);
        });
        //接收文件时出现错误
        rtc.on('receive_file_error', function (error) {
            // console.log(error);
        });
        //接受到文件发送请求
        rtc.on('receive_file_ask', function (sendId, socketId, fileName, fileSize) {
            var p;
            if (window.confirm(socketId + "用户想要给你传送" + fileName + "文件，大小" + fileSize + "KB,是否接受？")) {
                rtc.sendFileAccept(sendId);
                // p = document.createElement("p");
                // p.innerText = "准备接收" + fileName + "文件";
                // p.id = "rf-" + sendId;
                // files.appendChild(p);
                ElementUI.Notification({
                    message: "准备接收" + fileName + "文件",
                    type: "warning"
                });
            } else {
                rtc.sendFileRefuse(sendId);
            }
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
            ElementUI.Notification({
                title: "成功",
                message: "您已进入聊天室",
                type: "success"
            });
        });
        //创建本地视频流失败
        rtc.on("stream_create_error", function () {
            // alert("create stream failed!");
            ElementUI.Notification({
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

            ElementUI.Notification({
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
            ElementUI.Notification({
                message: "用户:ID:" + socketId + "断开连接",
                type: "info"
            });
        });
        //接收到文字信息
        rtc.on('data_channel_message', function (channel, socketId, message) {
            var p = document.createElement("p");
            if (socketId.length > 10) {
                p.innerText = socketId.slice(0, 5) + "...:" + message;
            } else {
                p.innerText = socketId + ": " + message;
            }

            msgs.appendChild(p);
            ElementUI.Notification({
                message: "收到消息",
                type: "info"
            });
        });
        //连接WebSocket服务器
        // rtc.connect("ws:" + window.location.href.substring(window.location.protocol.length).split('#')[0], window.location.hash.slice(1));
        // rtc.connect("ws:" + window.location.href.substring(window.location.protocol.length).split(':')[0] + ':3000', window.location.hash.slice(1));
        // rtc.connect("wss:" + window.location.href.substring(window.location.protocol.length).split('#')[0], roomName);
        // console.log("wss:" + window.location.href.substring(window.location.protocol.length).split('#')[0])
        rtc.connect("ws:" + window.location.href.substring(window.location.protocol.length).split(':')[0] + ':3000', roomName);
        // console.log("ws:" + window.location.href.substring(window.location.protocol.length).split(':')[0] + ':3000')
        // console.log("hash:" + window.location.hash.slice(1));
        // console.log("roomName:" + roomName)

        return rtc;
    }
}
export {
    myWebRTC
}