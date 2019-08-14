<template>
      <div class="register-container">
        <el-card header="Please Register" class="register-card text-primary fs-xl">
            <el-form @submit.native.prevent="register">
                <el-form-item label="User Name">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="model.comfirmPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="d-flex jc-between">
                        <el-button type="primary" native-type="submit" class="btn">注册</el-button>
                        <a href="/login" class="text-primary fs-sm">已有账号，去登录</a>
                    </div>

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
                message: '注册成功，请登录'
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
