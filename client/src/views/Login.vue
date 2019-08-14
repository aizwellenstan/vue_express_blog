<template>
    <div class="login-container">
        <el-card header="ログイン" class="login-card text-primary fs-xl">
            <el-form @submit.native.prevent="login">
                <el-form-item label="ユーザー名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="パスワード">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="d-flex jc-between">
                        <el-button class="btn" type="primary" native-type="submit">ログイン</el-button>
                        <a href="/register" class="text-primary fs-sm">新規登録</a>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    name: "hello",
    data() {
        return {
            model: {}
        };
    },
    methods: {
        async login() {
            const res = await this.$http.post("login", this.model);
            if (!res) {
                this.$message({
                    type: "success",
                    message: "Server Error"
                });
            } else {
                localStorage.token = res.data.token;
                this.$router.push("/");
                this.$message({
                    type: "success",
                    message: "Log In Success"
                });
            }
        }
    }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.login-card {
    width: 25rem;
    margin: 5rem auto;
}
</style>
