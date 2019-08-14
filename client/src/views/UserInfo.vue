<template>
    <div>
        <h1 class="text-center">{{model.username}}</h1>
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
        async fetchUserInfo(){
            const res = await this.$http.get(`/rest/user/${this.id}`)
            this.model = res.data
        }
    },
    created(){
        this.fetchUserInfo()
    }
}
</script>