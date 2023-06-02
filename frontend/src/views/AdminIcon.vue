<template>
    <div id="app">
        <v-layout row justify-center>
            <v-col>
                <v-btn text color="rgb(224, 98, 119)" v-on:click.native="addIcon()">이모티콘 추가</v-btn>
            </v-col>
            <v-dialog v-model="dialog" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ dialogTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="이모티콘 아이디" v-model="iconInfo.iconId" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="가격" v-model="iconInfo.amount" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="이모티콘 이름" v-model="iconInfo.title" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="이미지 주소" v-model="iconInfo.imgUrl" required></v-text-field>
                                </v-flex>

                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="black" text @click="btnClick($event)">취소</v-btn>
                        <v-btn color="black" text @click="btnClick($event)">확인</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>


        <v-data-table :headers="headers" :items="items" class="elevation-1">
            <template v-slot:item="row">
                <tr>
                    <td>{{ row.item.iconId }}</td>
                    <td>{{ row.item.amount }}</td>
                    <td>{{ row.item.title }}</td>
                    <td>{{ row.item.imgUrl }}</td>
                    <td class="text-xs-right">
                        <v-btn small text color="rgb(224, 98, 119)" v-on:click.native="updateicon(row.item)">수정</v-btn>
                        <v-btn small text color="rgb(224, 98, 119)" v-on:click.native="deleteicon(row.item)">삭제</v-btn>
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
            iconInfo: {
                iconId: null,
                amount: null,
                title:null,
                imgUrl: null
            },
            dialog: false,
            dialogTitle: null,

            headers: [
                { text: '이모티콘 아이디', align: 'left', value: 'iconId' },
                { text: '가격', align: 'left', value: 'amount' },
                { text: '이모티콘 이름', align: 'left', value: 'title' },
                { text: '이미지주소', align: 'left', value: 'imgUrl' },
            ],
            items: []
        }
    },
    created() {
        axios.get(this.urlinfo + "/icons") //서버에 요청하기
            .then((res) => {
                console.log(res.data); //성공시
                this.items = res.data;
            })
            .catch((err) => {
                alert('에러 발생: ' + err); //에러 발생
            });
    },
    methods: {
        addIcon() {
            this.dialog = true;
            this.dialogTitle = "추가";
        },
        updateicon(data) {
            this.dialog = true;
            this.dialogTitle = "수정";
            this.iconInfo.iconId = data.iconId;
            this.iconInfo.amount = data.amount;
            this.iconInfo.title = data.title;
            this.iconInfo.imgUrl = data.imgUrl;
        },
        deleteicon(data) {
            this.dialog = true;
            this.dialogTitle = "삭제";
            this.iconInfo.iconId = data.iconId;
            console.log('deleteicon : ' + data);
        },

        btnClick($event) {
            this.dialog = false;
            if ($event.target.innerHTML == "확인") {
                if (this.dialogTitle == "추가") {
                    axios.post(this.urlinfo + "/" + "icons", {
                        iconId: this.iconInfo.iconId,
                        amount: this.iconInfo.amount,
                        title: this.iconInfo.title,
                        imgUrl: this.iconInfo.imgUrl
                    })
                        .then(() => {
                            axios.get(this.urlinfo + "/" + "icons") //서버에 요청하기
                                .then((res) => {
                                    //console.log(res.data); //성공시
                                    this.items = res.data;
                                    alert("이모티콘이 추가되었습니다.");
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
                    axios.put(this.urlinfo + "/" + "icons" + "/" + this.iconInfo.iconId, {
                        iconId: this.iconInfo.iconId,
                        amount: this.iconInfo.amount,
                        title: this.iconInfo.title,
                        imgUrl: this.iconInfo.imgUrl
                    })
                        .then(() => {
                            axios.get(this.urlinfo + "/" + "icons") //서버에 요청하기
                                .then((res) => {
                                    //console.log(res.data); //성공시
                                    this.items = res.data;
                                    alert("업데이트 성공");
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
                    axios.delete(this.urlinfo + "/" + "icons" + "/" + this.iconInfo.iconId, { data: { iconId: this.iconInfo.iconId } })
                        .then((result) => {
                            console.log("삭제 후" + result); //성공시
                            axios.get(this.urlinfo + "/" + "icons") //서버에 요청하기
                                .then((res) => {
                                    this.items = res.data;
                                    alert("삭제 성공");
                                })
                                .catch((err) => {
                                    alert(' 삭제 후 데이터 가져오는 중 에러 발생: ' + err); //에러 발생
                                });
                        })
                        .catch((err) => { alert('에러 발생: ' + err); });

                }
            }
            this.iconInfo.iconId = null;
            this.iconInfo.amount = null;
            this.iconInfo.title = null;
            this.iconInfo.imgUrl = null;
        }
    }
}
</script>
<style scoped>
div {
    margin: 0 5px 0 5px;
}
</style>