const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

app.get("/", (req, res) => {
  // __dirnameは今現在のディレクトリーを指す＝server.jsがいるこの階層自体を指す。その階層にhtmlが存在するのでhtmlを呼びたければ以下の書き方となる。
  res.sendFile(__dirname + "/index.html")
})

server.listen(PORT, () => {
  console.log("listening on 3000")
})