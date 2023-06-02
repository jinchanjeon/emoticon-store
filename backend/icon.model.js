const mongoose = require('mongoose');

var IconSchema = mongoose.Schema({   //스키마(Schema) 설정
  iconId: {type: Number, require:true},
  amount: {type: Number, require:true},  // 가격,
  title:{type:String, require:true},
  imgUrl : {type: String, require:true},
  // register_date: { type: Date, default:Date.now}
});

module.exports = mongoose.model('Icon', IconSchema); //소문자화 후 복수형으로 바꾸어 icons 컬렉션이 됨
