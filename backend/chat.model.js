const mongoose = require('mongoose');

var ChatSchema = mongoose.Schema({   //스키마(Schema) 설정
  chatId: {type: Number, require:true},
  title:{type:String, require:true},
  name:{type:String, require:true},
  text : {type: String, require:true},
});

module.exports = mongoose.model('Chat', ChatSchema); //소문자화 후 복수형으로 바꾸어 icons 컬렉션이 됨
