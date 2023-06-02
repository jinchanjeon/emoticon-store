<template>
  <v-form v-model="valid">
    <v-container >
      <form action="">
      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
        >
            <v-text-field
            v-model="id"
            :rules="idRules"
            :counter="10"
            label="아이디"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            :rules="pwRules"
            :counter="10"
            label="비밀번호"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="passwordShow=!passwordShow"
            :type="passwordShow ? 'text' : 'password'"
            required
          ></v-text-field>

        </v-col>
      </v-row>
      <v-row justify="center">
          <v-col cols="1">
            <v-btn
            text
            small
            @click="btnClick($event)"
            >로그인하기</v-btn>
          </v-col>
      </v-row>
      </form>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'; 
import { getSystemErrorMap } from 'util';
import { computed } from 'vue';

  export default {
    data: () => ({
      valid: false,
      id: '',
      password: '',
      passwordShow:false,
      token:'',
      urlinfo:'http://localhost:8000',
      result:'',
      idRules: [
        v => !!v || '아이디를 입력해주세요',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      pwRules: [
        v => !!v || '비밀번호를 입력해주세요',
        v => v.length >= 8 || '8자리 이상 입력해주세요',
      ],
    }),
    methods:{
      btnClick($event){
        if(this.id.length>0 && this.password.length>0){
        if($event.target.innerHTML == "로그인하기"){
          axios.post(this.urlinfo+"/Login",{
            userId: this.id,
            password: this.password
          })
          .then((res) => {
            alert(res.data.name+"님 환영합니다.");
            this.$router.push('/'); // 페이지이동
          })
          .catch((err) => {
            alert('에러 발생: ' + err);
          });
        }
        }
        this.id='';
        this.password='';
        this.result='';
      },
    },
  }

</script>
