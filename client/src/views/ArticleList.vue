<template>
    <div>
        <h1 class="text-primary">Trending</h1>
        <m-article-list
            :articles="articles"
            v-loading="loading"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        ></m-article-list>
    </div>
</template>
<script>
import ArticleList from '../components/ArticleList'
export default {
    components: {
        'm-article-list': ArticleList
    },
    data() {
        return {
            articles: [],
            loading: true
        };
    },
    methods: {
        async fetchArticles() {
            const res = await this.$http
                .get("/rest/article")
                .then(res => {
                    this.loading = false;

                    this.articles = res.data;
                })
                .catch(err => {
                    this.loading = false;
                });

        }
    },
    created() {
        this.fetchArticles();
    }
};
</script>
