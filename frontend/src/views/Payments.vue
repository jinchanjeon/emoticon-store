<template>
  <section class="test">
    <v-container grid-list-xl mb-10>
    <v-layout row wrap>
        <v-row justify="center">
    <v-card id=iconId>
          <v-card-text>
            <h2><p>주문결제</p></h2>
            <p>최종적으로 주문하실 상품을 확인하고 주문결제를 해주세요.</p>
            <v-divider/><p/>
            <p>가격: {{ amount }}</p>
            <div>이모티콘이름: {{ title }}</div>
          </v-card-text>
        </v-card>
        </v-row>
      
        </v-layout>
        </v-container>
<div>
    <v-btn class="btn" style=" background-color:  #f7a1a1;" v-on:click="PaymentBtn('카드')">카드결제</v-btn>
    <v-btn class="btn" style=" background-color:  #f7a1a1;"  v-on:click="PaymentBtn('가상계좌')">가상계좌</v-btn>
    <v-btn class="btn" style=" background-color:  #f7a1a1;"  v-on:click="PaymentBtn('계좌이체')">계좌이체</v-btn>
    <v-btn class="btn" style=" background-color:  #f7a1a1;"  v-on:click="PaymentBtn('휴대폰')">휴대폰</v-btn>
    <v-btn class="btn" style=" background-color:  #f7a1a1;"  v-on:click="btnpay">결제내역확인</v-btn>
  </div>
  </section>
</template>

<script>

var clientKey = 'test_ck_OyL0qZ4G1VO2j12BBPM3oWb2MQYg'
// eslint-disable-next-line no-unused-vars,no-undef
var tossPayments = TossPayments(clientKey)
import axios from 'axios';

export default {
  name: "test",
  data() {
    return {
      urlinfo:'http://localhost:8000',
      paymentsUrlInfo:'',
    }
  },
  computed: {
    // vuex 변수 가져오기
    iconId() {
      return this.$store.state.iconId;
    },
    amount() {
      return this.$store.state.amount;
    },
    title() {
      return this.$store.state.title;
    },
    imgUrl() {
      return this.$store.state.imgUrl;
    }
  },

  methods: {
    PaymentBtn: function (method) {

      tossPayments.requestPayment(method, {
        amount: this.amount,
        orderId: 'xnDIqpt7Dlfdtd99WwXgu',
        orderName: this.title,
        customerName: '전진찬',
        successUrl: 'http://localhost:8080/Payments',
        failUrl: 'http://localhost:8080/'
      })

    },
    btnpay:function(){
      this.$router.push('/AdminPayments')
        .then(() => {
        axios.post(this.urlinfo+"/"+"payments",{
        iconId: this.$store.state.iconId,
        amount: this.$store.state.amount,
        title:  this.$store.state.title
        })

    })

    .catch((err) => {

      alert('에러 발생: ' + err); //에러 발생

    });  

}
  }
}
</script>


<style scoped>
/*
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input {
  width: 300px;
  border: 0;
  border-bottom: 1px #a8a8a8 solid;
  margin: 0 10px 0;
  padding: 0;
  height: 40px;
  line-height: 40px;
  outline: none;
}
*/

.test {
  display: flex;
  margin-right:100px;
  flex-direction: column;
  /*justify-content: center;*/
  margin-top:100px;
  align-items: center;
  height: 100vh;

}

.btn {
  width: 200px;
  height: 60px;
  border: 1px #f7a1a1 solid;
  color:white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 30px;

}


</style>