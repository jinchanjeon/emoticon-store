<template>

    <v-card class="overflow-hidden">
        <v-carousel v-model="model" height="60px" cycle hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="index in txts" :key="index">
                <v-sheet color="pink lighten-4" height="100%" tile>
                    <v-row class="fill-height" align="center" justify="center">

                        <div class="text-h7">
                            {{ index }}
                        </div>

                    </v-row>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>

        <v-container>
            <v-row>
                <v-col sm="7" cols="1">
                    <v-toolbar-title>
                        <router-link to="/" class="logo"> Emoticon Store</router-link>
                    </v-toolbar-title>

                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="1">
                    <v-btn small text to="/AdminChat">문의</v-btn>
                </v-col>
                <v-col cols="1">
                    <v-btn small text to="/Login">로그인</v-btn>
                </v-col>
                <v-col cols="1">
                    <v-btn small text to="/Join">회원가입</v-btn>
                </v-col>
                <v-col>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn text small color="black" dark v-bind="attrs" v-on="on">마이페이지
                            </v-btn>
                        </template>
                        <v-grid>
                            <v-list-item v-for="(item, index) in category" :key="index">
                                <v-list-item-title @click="btnClick" style="cursor:pointer">{{
                                    item.title
                                }}</v-list-item-title>
                            </v-list-item>
                        </v-grid>
                    </v-menu>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        category: [
            { title: '결제내역' },
            { title: '등록' },
        ],
        txts: ["첫구매시 2개 무료 증정", "회원가입하면 5%할인쿠폰 증정! ", "친구공유하면 10% 할인쿠폰 증정!", "개강 기념 15% 할인 쿠폰!!"],
    }),
    methods: {
        btnClick($event) {
            if ($event.target.innerHTML == "등록") {// eslint-disable-line no-unused-vars
                this.$router.push('/AdminIcon'); // 페이지이동
            }
            else if ($event.target.innerHTML == "결제내역") {// eslint-disable-line no-unused-vars
                this.$router.push('/AdminPayments')
            }
        }
    },
}
</script>

<style scoped>
.logo {
    font-family: 'Oswald', sans-serif;
    font-size: 37px;
    color: rgb(76, 74, 74);
    text-decoration: none;
}

.logo:hover {
    color: rgb(224, 98, 119);

}
</style>