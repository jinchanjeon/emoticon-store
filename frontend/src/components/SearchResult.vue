
<template>
    <div id="searchresult">
        <div class="result-title">
            총 {{this.$store.getters.getFilteredProduct(keyword).length }}개의 상품이 검색되었습니다.
        </div>
        <div class="imgdiv">
            <v-app>
                <v-container fluid>
                    <v-row>
                        <div v-for="(icon, index) in this.$store.getters.getFilteredProduct(keyword)" :key="index">
                            <v-col>
                                <div class="column">
                                    <v-img :aspect-ratio="1" v-bind:src="icon.imgUrl" style="display:block; margin: 0">
                                    </v-img>
                                    <!--<img :src="require(`@/assets/images/${icon.name}.jpg`)" alt="image"
                                        style="display:block; margin: auto" />-->
                                    <h2 class="product-title"> {{ icon.title }}</h2>
                                    <span class="price">{{ icon.amount }}원</span>
                                    <button type="button" class="btn-buy" @click="purchase(index)">구매하기</button>
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
    name: "SearchResult",
    props: ['keyword'], //상위 컴포넌트인 SearchPage.vue로부터 데이터 받음  
    data() {
        return {
            urlinfo:'http://localhost:8000/icons',
            //getFilteredProduct:[]
        }
    },

    created(){
    axios.get(this.urlinfo)                          
    .then((res)=>{
        console.log(res.data);
        this.getFilteredProduct= res.data;
        
    })
    },
    methods: {
        purchase(index) {
            
            this.$store.commit('saveiconId', this.items[index].iconId);
            this.$store.commit('saveAmount', this.items[index].amount);
            this.$store.commit('saveImageUrl', this.items[index].imgUrl);
            this.$store.commit('savetitle', this.items[index].title);
            this.$router.push('/Payments');
            
        }
    }
}
</script>

<style>
.imgdiv {
    margin-top: 125px;
    padding: 30px;
    /*border: 1px solid grey;*/
    display: inline-block;
    text-align: center;
    position: relative;
    width: 1000px;
    margin-left: 285px;

    white-space: nowrap;
}

v-img {
    width: 100px;
    height: 100px;
    /*padding: 2px;*/
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
    float: left;

}

.column {
    position: relative;
    width: 105px;
}

.column:hover {
    padding: 3px;
    box-shadow: 1px 1px 20px #ddd;
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

</style>

