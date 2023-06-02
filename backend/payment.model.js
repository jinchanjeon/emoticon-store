const mongoose = require('mongoose');

// 스키마 설정, field 결정
var PaymentsSchema = mongoose.Schema({
    amount: {type: String, require:true},       // 결제 승인된 금액
    iconId: {type:String, require:true},
    title:{type:String, require:true}
});

// 컬렉션 admins 생성
module.exports = mongoose.model('Payment', PaymentsSchema);