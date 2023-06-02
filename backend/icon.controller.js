const Icon = require('./icon.model.js');

// 새로운 이모티콘 만들기
exports.create = (req, res) => {
    const icon = new Icon({ 
        iconId: req.body.iconId,
        title: req.body.title,
        amount: req.body.amount,
        imgUrl : req.body.imgUrl
    });

  //데이터베이스에 새로운 이모티콘 저장하기 
    icon.save()
    .then(data => { res.send(data); })
    .catch(err => { 
        res.status(500).send({ message: err.message}); 
    });
};

//모든 이모티콘 검색
exports.findAll = (req, res) => {
    Icon.find()
    .then( icons => { 
	res.send(icons);
	console.log(icons)	//test log
    })
    .catch(err => { 
    res.status(500).send({ message: err.message }); 
    });
};

//특정한 이모티콘 검색
exports.findOne = (req, res) => {
    Icon.findOne({iconId : req.query.title})
    .then( icon => {
    if(!icon){
        return res.status(404).send({
        message: req.query.title + "에 해당하는 이모티콘이 없습니다." }); 
    }
    res.send(icon);
    }).catch(err => { 
    return res.status(500).send({ message: req.query.title +" 로 검색 중 에러 발생" });
    });  
};

//업데이트
exports.update = (req, res) => { 
    Icon.findOneAndUpdate( {iconId:req.params.iconId}, 
    { iconId: req.body.iconId, 
    amount:req.body.amount,
    title:req.body.title,
    imgUrl : req.body.imgUrl }, 
    {new:true}
    )
    .then(icon => { 
    if(!icon) {
        return res.status(404).send({ message: req.params.iconId +
        "에 해당하는 이모티콘 발견되지 않았습니다." })
    }
    res.send(icon);
    }).catch(err => { 
    return res.status(500).send({ message: err.message });
    });
};

//삭제
exports.delete = (req, res) => {
    Icon.findOneAndDelete({iconId:req.params.iconId})
    .then(icon => {
    if(!icon) {
        return res.status(404).send({ message: req.params.iconId +"에 해당하는 이모티콘이 없습니다." })
    }
    res.send({ message: "정상적으로 " + req.params.iconId + " 이모티콘이 삭제되었습니다." })
    })
    .catch(err => {
    return res.status(500).send({ message: err.message }); 
    });
};








