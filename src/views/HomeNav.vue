<template>
    <div class="m-3">
        <div>
            <div class="nav d-flex ai-center pt-5 pb-3 fs-xl border-bottom">
                <img class="logo mr-3" src="../assets/logo.png" alt />
                <div
                    class="nav-item mr-5"
                    v-for="(item, index) in nav"
                    @click="routerLink(index, item.path)"
                    :key="index"
                >
                    <!--  -->
                    <a
                        class="text-grey-1"
                        :class="navIndex === index ? 'active' : 'item-cn'"
                    >{{ item.title }}</a>
                    <!--  -->
                </div>
                <div class="flex-1"></div>
                <div class="fs-lg">
                    <span>Hello,</span>
                    <span>
                        <a
                            href
                            @click="logout"
                            class="text-primary"
                            style="font-weight:bold"
                        >{{model.username}}</a>
                    </span>
                </div>
            </div>
        </div>
        <div class="mt-3">
            <router-view :key="$route.path"></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {},
            nav: [
                { title: "ホーム", path: "/" },
                { title: "New Post", path: "/write-article" },
                { title: "My Post", path: "/manage-articles" }
            ],
            navIndex: 0
        };
    },
    methods: {
        async getUserInfo() {
            const res = await this.$http.get("/userinfo");
            this.$set(this, "model", res.data);
        },
        logout() {
            this.$router.push('/login')
            localStorage.removeItem("token");

        },
        /**
         * Router
         * @param index
         * @param link
         */
        routerLink(index, path) {
            //
            this.navIndex = index;
            //
            this.$router.push(path);
        },

        /**
         * Search current path
         * @param path
         */
        checkRouterLocal(path) {
            //
            this.navIndex = this.nav.findIndex(item => item.path === path);
        }
    },
    created() {
        this.getUserInfo();

        // Get current path
        let path = this.$route.path;
        // Search current path
        this.checkRouterLocal(path);
    },
    watch: {
        $route() {
            // Get current path
            let path = this.$route.path;
            // Search current path
            this.checkRouterLocal(path);
        }
    }
};
</script>
<style lang="scss">
.logo {
    height: 1.5em;
    width: auto;
}
</style>
