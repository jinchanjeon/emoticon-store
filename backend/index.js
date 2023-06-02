// rest API 시작점
// 미들웨어 설정
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http'); // 네이티브 모듈
const socketio = require('socket.io'); // install
const cookieParser = require('cookie-parser'); // 로그인 쿠키생성하기위함
const bodyparser = require('body-parser');
const router=express.Router();
const Op = require('sequelize').Op;

app.use(cookieParser());
app.use(express.json());
app.use(bodyparser.json()); 
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public')); // public 폴더를 static 폴더로 설정
app.use(cors()); // 모든 url접근 허용,실제 서버에는 특정 행위만 동작하도록 만들어야함, socket.io에서 blocked cors policy 
/*
router.get('/SearchPage',function(req,res){
    console.log("검색어"+ req.query.keyword)
    res.send("keyword:"+req.query.keyword)
})*/


app.get('/', (req, res) => { 
    console.log(req);
    res.json({"message": "여러분들을 환영합니다."}); 
  })

  /*
app.get('/search', function(req,res){
    db.collection('icons').find({title: req.query.title}).toArray(function(err, result){
        res.render('icons',{icons:result});
    })
})
*/
const dbconfig = require("./db.js");
const mongoose = require('mongoose');
const { db } = require('./icon.model.js');

// 데이터베이스 연결 및 상태 로깅
mongoose.connect(dbconfig.url, {
        useNewUrlParser: true
    })
    // error 처리
    .then(() => {
        console.log("정상적으로 MongoDB 서버(mongodb://localhost:27017)에 연결되었습니다.");
    }).catch(err => {
        console.log("MongoDB에 연결되지 않았습니다.", err);
    });

/*app.get('/chat', (req, res) => {
    fs.readFile('chat.vue', (data) => {
        response.send(data.toString());
    });
})
*/
// 라우팅, 포트8000 설정
require('./router.js')(app);
var port = process.env.port || 8000;

// 웹 서버 생성
const httpServer = http.createServer(app); // 크리에이트서버가 동작하면서 http.createServer(실행할함수)app=express를 동작시킨다, app.listen이 아닌 httpServer.listen으로 바뀜


// 소켓 서버를 생성 및 실행합니다. 소켓(서버 사이드에 만들어줘야함.) 
const io = socketio(httpServer, {
    cors: {
        origin: '*', 
        method: ["GET", "PUT", "POST"] // get,post허용
    }
});



// 클라이언트에서 요청하면 connection 이라는 이벤트가 뜸, socket : 커넥션의 결과로 연결된 소켓의 정보를 가진객체, 이걸로 통신하면 됌
io.sockets.on('connection', function (socket) {
    global.$socket = socket;
    socket.on('post', function (data) {
        console.log('chatId:',data.chatId, 'name:',data.name, 'title:',data.title, 'text:',data.text); 
        socket.emit('postres', data);
    });
    socket.on('put', function (data) {
        console.log('chatId:',data.chatId, 'name:',data.name, 'title:',data.title, 'text:',data.text); 
        socket.emit('putres', data);
    });
    socket.on('delete', function (data) {
        console.log('chatId:',data.chatId+'가 삭제되었습니다.')
        socket.emit('deleteres', data);
    });
});


// 클라이언트 요청 대기
httpServer.listen(port, () => {
    console.log("포트 : " + port + "을 열고 서버 동작 중 입니다.")
})