const User = require('./user.model.js');

// 새로운 사용자 만들기
exports.create = (req, res) => {
  const user = new User({ 
    userId: req.body.userId,
    name: req.body.name,
    password:req.body.password
  });
  
  //데이터베이스에 새로운 사용자 저장하기 
  user.save()
  .then(data => { res.send(data); })
  .catch(err => { 
    res.status(500).send({ message: err.message}); 
  });
};

// 로그인
//토큰리스너 만들어주기
exports.login = (req,res)=>{
  console.log(req.body.userId);
  if(req.cookies.auth){
      res.redirect('/');
  }
  User.findOne({userId : req.body.userId, password: req.body.password})
  .then(user => {  // then 옆에 매개변수가 findOne의 리턴값
      if(!user){
          return res.status(404).send({
              message: req.body.userId + "에 해당되는 사용자가 없습니다."});
      }
          //쿠키생성
          res.send(user)
          console.log(user);
  }).catch(err => {
      return res.status(500).send({message: req.body.userId + "로 검색 중 에러 발생"});
  });
};


//모든 사용자 검색
exports.findAll = (req, res) => {
  User.find()
  .then( users => { 
	res.send(users);
	console.log(users)	//test log
	  })
  .catch(err => { 
    res.status(500).send({ message: err.message }); 
  });
};

//특정한 사용자 검색
exports.findOne = (req, res) => {
  User.findOne({userId : req.params.userId})
  .then( user => {
    if(!user){
      return res.status(404).send({
        message: req.params.userId + "에 해당하는 사용자가 없습니다." }); 
    }
    res.send(user);
  }).catch(err => { 
    return res.status(500).send({ message: req.params.userId +" 로 검색 중 에러 발생" });
  });  
};

//업데이트
exports.update = (req, res) => { 
  User.findOneAndUpdate( {userId:req.params.userId}, 
    { userId: req.body.userId, name:req.body.name, password:req.body.name}, 
    {new:true}
  )
  .then(user => { 
    if(!user) {
      return res.status(404).send({ message: req.params.userId +
        "에 해당하는 사용자가 발견되지 않았습니다." })
    }
    res.send(user);
  }).catch(err => { 
    return res.status(500).send({ message: err.message });
  });
};

//삭제
exports.delete = (req, res) => {
  User.findOneAndDelete({userId:req.params.userId})
  .then(user => {
    if(!user) {
      return res.status(404).send({ message: req.params.userId +"에 해당하는 사용자가 없습니다." })
    }
    res.send({ message: "정상적으로 " + req.params.userId + " 사용자가 삭제되었습니다." })
  })
  .catch(err => {
    return res.status(500).send({ message: err.message }); 
  });
};








