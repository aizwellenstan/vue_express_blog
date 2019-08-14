<template>
      <div class="register-container">
        <div style="text-align:center; padding-top:2%">
          <h1>ようこそ!</h1>
          <p>新規登録(無料)して利用を開始しましょう。</p>
        </div>
        <el-card header="" class="register-card text-primary fs-xl">
            <el-form @submit.native.prevent="register">
                <el-form-item label="ユーザ名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="パスワード">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item label="パスワード確認">
                    <el-input type="password" v-model="model.comfirmPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="d-flex jc-between">
                        <el-button type="primary" native-type="submit" class="btn">登録</el-button>
                    </div>
                    <p style="color:#999">もしカウントを持っている場合は<a href="/login" style="color:#337ab7">ログイン</a>から。</p>

                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            model: {}
        };
    },
    methods: {
        async register() {
            await this.$http.post('register', this.model)
            this.$router.push('/login')
            this.$message({
                type: 'success',
                message: '登録成功，ログインして下さい'
            })
        }
    }
};
</script>

<style>
.register-card {
    width: 25rem;
    margin: 5rem auto;
}
</style>
