const Payment = require('./payment.model.js');
const secretKey = ""; // 시크릿키 base64로 인코딩한 값
const http = require("https");
// 새로운 결제 내역 db에 저장
// 

exports.create = (req, res) => {
    const payment = new Payment({
        title: req.body.title,
        amount: req.body.amount,
        iconId: req.body.iconId,

    });
    //db에 저장
    payment.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// 모든 결제 검색
exports.findAll = (req, res) => {
    Payment.find()
        .then(payments => {

            res.send(payments);
            console.log(payments)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        });
};

// 특정 결제 검색
exports.findOne = (req, res) => {
    Payment.findOne({
            iconId: req.body.iconId
        })
        .then(payment => {
            if (!payment) {
                return res.status(404).send({
                    message: req.params.iconId + "에 해당되는 결제내역이 없습니다."
                });
            }
            res.send(payment);
        }).catch(err => {
            return res.status(500).send({
                message: req.params.iconId + "로 검색 중 에러 발생"
            });
        });
};

// 결제 업데이트
exports.update = (req, res) => {
    Payment.findOneAndUpdate({
        iconId: req.params.iconId
    }, {
        iconId: req.body.iconId,
        title: req.body.title,
        amount: req.body.amount,

    }, {
        new: true
    }).then(payment => {
        if (!payment) {
            return res.status(404).send({
                message: req.params.iconId + "에 해당하는 결제내역이 발견되지 않았습니다."
            })
        }
        
        res.send(iconId);
    }).catch(err => {
        return res.status(500).send({
            message: err.message
        });
    });
};

// 결제내역 삭제
exports.delete = (req, res) => {
    Payment.findOneAndDelete({
            iconId: req.params.iconId
        })
        .then(payment => {
            if (!payment) {
                return res.status(404).send({
                    message: req.params.iconId + "에 해당하는 결제내역이 없습니다."
                })
            }
            res.send({
                message: "정상적으로" + req.params.iconId + " 결제내역이 삭제되었습니다."
            })
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
};
