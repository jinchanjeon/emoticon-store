<template>
    <div id="app">
        <v-data-table :headers="headers" :items="items" class="elevation-1">
            <template v-slot:item="row">
                <tr>
                    <td>{{ row.item.iconId }}</td>
                    <td>{{ row.item.title }}</td>
                    <td>{{ row.item.amount }}</td>
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
            paymentsInfo: {
                amount: null,
                iconId: null,
                title: null
            },
            dialog: false,
            dialogTitle: null,

            headers: [
                { text: '이모티콘아이디', align: 'left', value: 'iconId' },
                { text: '이모티콘이름', align: 'left', value: 'title' },
                { text: '가격', align: 'left', value: 'amount' },

            ],
            items: []
        }
    },
    created() {
        axios.get(this.urlinfo + "/payments") //서버에 요청하기
            .then((res) => {
                console.log(res.data); //성공시
                this.items = res.data;
            })
            .catch((err) => {
                alert('에러 발생: ' + err); //에러 발생
            });
    },
}

</script>
<style scoped>
div {
    margin: 0 5px 0 5px;
}
</style>