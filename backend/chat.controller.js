const Chat = require('./chat.model.js');



// 새로운 문의 만들기
exports.create = (req, res) => {
    const chat = new Chat({ 
        chatId:req.body.chatId,
        name: req.body.name,
        title: req.body.title,
        text : req.body.text
    });

  //데이터베이스에 새로운 문의 저장하기 
    chat.save()
    .then(data => { res.send(data); })
    .catch(err => { 
        res.status(500).send({ message: err.message}); 
    });
};



//모든 문의 검색
exports.findAll = (req, res) => {
    Chat.find()
    .then( chats => { 
	res.send(chats);
	//console.log(chats)	//test log
    })
    .catch(err => { 
    res.status(500).send({ message: err.message }); 
    });
};

//특정한 문의 검색
exports.findOne = (req, res) => {
    Chat.findOne({chatId : req.query.keyword})
    .then( chat => {
    if(!chat){
        return res.status(404).send({
        message: req.query.keyword + "에 해당하는 문의내역이 없습니다." }); 
    }
    res.send(chat);
    }).catch(err => { 
    return res.status(500).send({ message: req.query.keyword +" 로 검색 중 에러 발생" });
    });  
};

//업데이트
exports.update = (req, res) => { 
    Chat.findOneAndUpdate( {chatId:req.params.chatId}, 
    { chatId: req.body.chatId, 
        name:req.body.name,
    title:req.body.title,
    text : req.body.text }, 
    {new:true}
    )
    .then(chat => { 
    if(!chat) {
        return res.status(404).send({ message: req.params.chatId +
        "에 해당하는 문의내역이 발견되지 않았습니다." })
    }
    res.send(chat);
    }).catch(err => { 
    return res.status(500).send({ message: err.message });
    });
};

//삭제
exports.delete = (req, res) => {
    Chat.findOneAndDelete({chatId:req.params.chatId})
    .then(chat => {
    if(!chat) {
        return res.status(404).send({ message: req.params.chatId +"에 해당하는 문의내역이 없습니다." })
    }
    res.send({ message: "정상적으로 " + req.params.chatId + " 문의내역이 삭제되었습니다." })
    })
    .catch(err => {
    return res.status(500).send({ message: err.message }); 
    });
};








