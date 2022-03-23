// serverの作成2-7
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

app.get("/", (req, res) => {
  // __dirnameは今現在のディレクトリーを指す＝server.jsがいるこの階層自体を指す。その階層にhtmlが存在するのでhtmlを呼びたければ以下の書き方となる。
  res.sendFile(__dirname + "/index.html")
});

// app.get("/")のこのディレクトリーに接続するとuserが接続できるという情報を作成。onは受け取るという意味がある。
io.on("connection", (socket) => {
  console.log("User was connected!");

  // index.htmlのemit()で送信したものを受け取っていく処理。onは受け取る。emitは送信。
  socket.on("chat message", (msg) => {
    // console.log("Message:" + msg);

    // serverがclientから受け取ったchat messageを更にまたclientに送信するという処理をする。なぜか？全ユーザーが見れるように。
    io.emit("chat message", msg)
  })
})

// herokuでは3000は使われていないため、デプロイするときは必ずprocess.env.PORT(herokuが既に用意しているport)としなければデプロイできない。
server.listen(process.env.PORT || 3000, () => {
  console.log("listening on 3000")
});