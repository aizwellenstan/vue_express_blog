<template>
    <div>
        <h1>{{model.title}}</h1>
        <span class="pr-5 text-dark-1">{{model.author.username}}</span><span class="text-grey">{{model.createdAt}}</span>
        <div v-html="model.body" class="body"></div>
    </div>
    
</template>
<script>
export default {
    props: {
        id: { required: true }
    },
    data() {
        return {
            model:{}
        }
    },
    methods: {
        async fetchArticle(){
            const res = await this.$http.get(`/rest/article/${this.id}`)
            this.model = res.data
            document.title = this.model.title
   
        }
    },
    created(){
        this.fetchArticle()
     }    
}
</script>