<template>
    <div id="app">
        <v-layout row justify-center>
            <v-col>
                <v-btn text color="rgb(224, 98, 119)" v-on:click.native="addchat()">등록</v-btn>
            </v-col>
            <v-dialog v-model="dialog" persistent max-width="500px">

                    <!--
                        <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="문의 아이디" v-model="chatInfo.chatId" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="사용자 이름" v-model="chatInfo.name" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="제목" v-model="chatInfo.title" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="내용" v-model="chatInfo.text" required></v-text-field>
                                </v-flex>

                            </v-layout>
                        </v-container>
                    </v-card-text>
                    -->
                    <v-card class="box mx-auto" max-width="500" outlined>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="text-overline mb-2">
                                    문의하기
                                </div>
                                <div >
                                    <input class="id " type="text" v-model="chatInfo.chatId" placeholder="문의번호"
                                    style="border:0.5px solid lightgrey  " required></input>
                                <input class="name mb-2" type="text" v-model="chatInfo.name" placeholder="사용자이름"
                                    style="border:0.5px solid lightgrey " required></input>
                                </div>
                                <div>
                                    <input class="title mb-3" type="text" v-model="chatInfo.title" placeholder="제목"
                                    style="border:0.5px solid lightgrey " required></input>
                                </div>
                                <div>
                                <input class="content " type="text" v-model="chatInfo.text" placeholder="내용"
                                    style="border:0.5px solid lightgrey" required></input>
                                </div>
                                </v-list-item-content>
                        </v-list-item>

                        <v-card-actions>
                            <v-btn outlined rounded text color="black" @click="btnClick($event)">확인</v-btn>
                            <v-btn outlined rounded text color="black" @click="btnClick($event)">취소</v-btn>
                        </v-card-actions>
                    </v-card>


            </v-dialog>
        </v-layout>


        <v-data-table :headers="headers" :items="items" class="elevation-1">
            <template v-slot:item="row">
                <tr>
                    <td>{{ row.item.chatId }}</td>
                    <td>{{ row.item.name }}</td>
                    <td>{{ row.item.title }}</td>
                    <td>{{ row.item.text }}</td>
                    <td class="text-xs-right">
                        <v-btn small text color="rgb(224, 98, 119)" v-on:click.native="updatechat(row.item)">수정</v-btn>
                        <v-btn small text color="rgb(224, 98, 119)" v-on:click.native="deletechat(row.item)">삭제</v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            urlinfo: 'http://localhost:8000',
            chatInfo: {
                chatId: null,
                name: null,
                title: null,
                text: null
            },
            dialog: false,
            dialogTitle: null,

            headers: [
                { text: '문의번호', align: 'left', value: 'chatId' },
                { text: '이름', align: 'left', value: 'name' },
                { text: '제목', align: 'left', value: 'title' },
                { text: '내용', align: 'left', value: 'text' },
            ],
            items: []
        }
    },
    created() {
        axios.get(this.urlinfo + "/chats") //서버에 요청하기
            .then((res) => {
                console.log(res.data); //성공시
                this.items = res.data;
                this.$socket.on('postres', function (data) {
                    alert("등록되었습니다.");
                });
                this.$socket.on('putres', function (data) {
                    alert("업데이트 되었습니다.");
                });
                this.$socket.on('deleteres', function (data) {
                    alert("삭제되었습니다.");
                });

            })
            .catch((err) => {
                alert('에러 발생: ' + err); //에러 발생
            });
    },
    methods: {
        addchat() {
            this.dialog = true;
            this.dialogTitle = "추가";
        },
        updatechat(data) {
            this.dialog = true;
            this.dialogTitle = "수정";
            this.chatInfo.chatId = data.chatId;
            this.chatInfo.name = data.name;
            this.chatInfo.title = data.title;
            this.chatInfo.text = data.text;
        },
        deletechat(data) {
            this.dialog = true;
            this.dialogTitle = "삭제";
            this.chatInfo.chatId = data.chatId;
            console.log('deleteicon : ' + data);
        },

        btnClick($event) {
            this.dialog = false;
            if ($event.target.innerHTML == "확인") {
                if (this.dialogTitle == "추가") {
                    this.$socket.emit('post', { chatId: this.chatInfo.chatId, name: this.chatInfo.name, title: this.chatInfo.title, text: this.chatInfo.text })
                    axios.post(this.urlinfo + "/" + "chats", {
                        chatId: this.chatInfo.chatId,
                        name: this.chatInfo.name,
                        title: this.chatInfo.title,
                        text: this.chatInfo.text
                    })
                        .then(() => {
                            axios.get(this.urlinfo + "/" + "chats") //서버에 요청하기
                                .then((res) => {
                                    //console.log(res.data); //성공시
                                    this.items = res.data;
                                })
                                .catch((err) => {
                                    alert('에러 발생: ' + err); //에러 발생
                                });

                        })
                        .catch((err) => {
                            alert('에러 발생: ' + err); //에러 발생
                        });
                }
                else if (this.dialogTitle == "수정") {
                    this.$socket.emit('put', { chatId: this.chatInfo.chatId, name: this.chatInfo.name, title: this.chatInfo.title, text: this.chatInfo.text })
                    axios.put(this.urlinfo + "/" + "chats" + "/" + this.chatInfo.chatId, {
                        chatId: this.chatInfo.chatId,
                        name: this.chatInfo.name,
                        title: this.chatInfo.title,
                        text: this.chatInfo.text
                    })
                        .then(() => {
                            axios.get(this.urlinfo + "/" + "chats") //서버에 요청하기
                                .then((res) => {
                                    //console.log(res.data); //성공시
                                    this.items = res.data;

                                })
                                .catch((err) => {
                                    alert('에러 발생: ' + err); //에러 발생
                                });
                        })
                        .catch((err) => {
                            alert('에러 발생: ' + err); //에러 발생
                        });

                }
                else {
                    this.$socket.emit('delete', { chatId: this.chatInfo.chatId })
                    axios.delete(this.urlinfo + "/" + "chats" + "/" + this.chatInfo.chatId, { data: { chatId: this.chatInfo.chatId } })
                        .then((result) => {
                            console.log("삭제 후" + result); //성공시
                            axios.get(this.urlinfo + "/" + "chats") //서버에 요청하기
                                .then((res) => {
                                    this.items = res.data;
                                })
                                .catch((err) => {
                                    alert(' 삭제 후 데이터 가져오는 중 에러 발생: ' + err); //에러 발생
                                });
                        })
                        .catch((err) => { alert('에러 발생: ' + err); });

                }
            }
            this.chatInfo.chatId = null;
            this.chatInfo.name = null;
            this.chatInfo.title = null;
            this.chatInfo.text = null;
        }
    }
}
</script>
<style scoped>
div {
    margin: 0 5px 0 5px;
}
.box{
    height:400px;
  }

  .id{
    display:inline-block;
    height:30px;
    width:180px;
    font-size:small;
    float:left;
  }
  .name{
    display:inline-block;
    height:30px;
    width:180px;
    font-size:small;
    float:right;
    margin-right:50px;
  }
  
  .title{
    display:inline-block;
    height:40px;
    width:400px;
    font-size:small;
  }
  .content{
    height:150px;
    width:400px;
  }
</style>