<template>
    <div id="searchpage">
        <div id="searchrequire">
            <div class="search-form-input">
                <!--icons.vue에서 라우터를 이용해 보낸 파라미터로부터 데이터 받음-->
                <v-col cols="12" sm="5" class="search" justify="center">
                    <v-text-field v-model="keyword" v-on:input="keywordChanged()"
                        v-on:keyup.enter="searchresultshow(keyword)"  solo
                        prepend-inner-icon="mdi-magnify" clearable> {{keyword}} </v-text-field>
                </v-col>
            </div>
        </div>
        <SearchResult v-if="(isResultShow)" v-bind:keyword="keyword"></SearchResult>

    </div>
</template>
<script>
import SearchResult from "../components/SearchResult.vue"

export default {
    name: "SearchPage",
    components: {
        SearchResult
    },
    data() {
        return {
            isResultShow: true,  //icons.vue에서 라우터를 이용해 보낸 파라미터로부터 데이터 받음 
            keyword: this.$route.query.keyword  //icons.vue에서 라우터를 이용해 보낸 쿼리로부터 데이터 받음 
        }
    },

    
    methods: {
        searchresultshow(keyword) {
            console.log('"', keyword, '"' + ' 검색')
            if (keyword !== '') {
                this.$router.push({
                    name: "SearchPage",
                    query: {
                        keyword: this.keyword
                    },
                }).catch(() => {});
                this.isResultShow = true
            } else {
                alert('검색어를 입력해주세요!')
            }
        },
        keywordChanged() {
            this.isResultShow = false
        }
    }
};
</script>
<style>
.search {
    margin-left: 450px;
    margin-top: 50px;
    position: absolute;
    width: 100%;
}
</style>