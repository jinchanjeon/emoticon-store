module.exports = (app) => {
  const users = require('./user.controller.js');
  const icons = require('./icon.controller.js');
  const chats = require('./chat.controller.js');
  const payments = require('./payment.controller.js');

  app.get('/users', users.findAll); 
  app.get('/users/:userId', users.findOne);
  app.post('/users', users.create);   // 회원가입
  app.put('/users/:userId', users.update); //회원정보 수정
  app.delete('/users/:userId', users.delete); //회원정보 삭제

  app.post('/login', users.login);    // 로그인

  
  // 이모티콘 조회,등록,수정,삭제
  app.get('/icons', icons.findAll);
  app.get('/icons/:title', icons.findOne); //쿼리 스트링으로 해 get으로 할거면. 받을때 ?key=value(?title=keyword) 
  app.post('/icons', icons.create);
  app.put('/icons/:iconId', icons.update);
  app.delete('/icons/:iconId', icons.delete);
  
//json으로 넘겨

  
  // 문의내역 조회,등록,수정,삭제
  app.get('/chats', chats.findAll);
  app.get('/chats/:keyword', chats.findOne); 
  app.post('/chats', chats.create);
  app.put('/chats/:chatId', chats.update);
  app.delete('/chats/:chatId', chats.delete);

  // 결제 조회,등록,수정,삭제
  app.get('/payments', payments.findAll);
  app.get('/payments/:iconId', payments.findOne); 
  app.post('/payments', payments.create);
  app.put('/payments/:iconId', payments.update);
  app.delete('/payments/:iconId', payments.delete);
}