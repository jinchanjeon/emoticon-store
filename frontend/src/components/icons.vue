<template>
    <div id="app">
      
        <v-col cols="12" sm="5" class="search" justify="center">
            <v-text-field v-model="keyword" style="margin-left:250px" @keyup.enter="searchresultshow(keyword)" solo label="search"
                prepend-inner-icon="mdi-magnify" clearable></v-text-field>

        </v-col>
        <div class="imgdiv" style="margin-left:400px;justify-content: center; align-items: center;" >
            <v-app>
                <v-container fluid>
                    <v-row>
                        <div v-for="(icon, index) in items" :key="index">
                            <v-col>
                                <div class="column">
                                    
                                    <v-img :aspect-ratio="1" v-bind:src="icon.imgUrl" style="display:block; margin: 0">
                                    </v-img>
                                    <!--<img :src="require(`@/assets/images/${icon.name}.jpg`)" alt="image"
                                        style="display:block; margin: auto" />-->
                                    <h2 class="product-title"> {{ icon.title }}</h2>
                                    <span class="price">{{ icon.amount }}원</span>
                                    <button class="btn-buy" v-on:click="purchase(index)">구매하기</button>
                                </div>
                            </v-col>
                        </div>
                    </v-row>
                </v-container>
            </v-app>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            urlinfo: 'http://localhost:8000',
            items: [],
            model: 0,
            
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
        searchresultshow(keyword) {
            //window.location.replace(`/seach?title=${keyword}`);
            if (keyword !== '') { //검색어를 입력한 경우
                this.$router.push({ // query 보내기
                    name: "SearchPage",
                    query: {
                        keyword: this.keyword,
                        //isResultShow: true,
                    },
                }).catch(() => {});
                this.isResultShow = true
                this.keyword = ''
                console.log('"', keyword, '"' + ' 검색')
            } else {
                alert('검색어를 입력해주세요!')  //검색어를 입력하지 않은 경우
            }
        },
        purchase(index) {

            this.$store.commit('saveiconId', this.items[index].iconId);
            this.$store.commit('saveAmount', this.items[index].amount);
            this.$store.commit('savetitle', this.items[index].title);
            this.$router.push('/Payments');
        }
    }
}




</script>

<style-scoped>


.search {
    margin-left: 550px;
    margin-top: 50px;
    position: absolute;
    width: 100%;
}

.imgdiv {

flex-wrap: wrap;
margin-left: 400px;
overflow:hidden;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
position: relative; 
/*   
  border:1px solid black;
    margin-top: 125px;
    padding: 30px;
    display: inline-block;
    text-align: center;
    position: relative;
    width: 1000px;
    
    white-space: nowrap;
     */
}

v-img {
    width: 200px;
  height: 200px;
  margin: 20px;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-buy {
    display: flex;
    margin: 0.2rem auto 0 auto;
    padding: 6px 20px;
    border: none;
    background: var(--main-color);
    color: var(--bg-color);
    font-size: 0.7rem;
    font-weight: 500;
    cursor: pointer;
}

.btn-buy:hover {
    background: rgb(228, 142, 156);

}

:root {
    --main-color: #c8bebe;
    --text-color: #171427;
    --bg-color: #fff;
}

.columns {
    float: right;

}

.column {
    position: relative;
    width: 105px;
}

.column:hover {
    padding: 3px;
    box-shadow: 10px 5px 20px rgb(149, 145, 145);
    transition: 0.2s;
    cursor: pointer;

}

.product-title {
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 0px;
    margin-top: 5px;

}

.price {
    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 0px;

}

</style-scoped>
